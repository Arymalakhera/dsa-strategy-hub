import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { gemini25CircuitBreaker } from '@/lib/circuitBreaker';

const COMMON_SOCRATIC_FORMAT_INSTRUCTIONS = `
MANDATORY CODE & FORMAT INSTRUCTIONS:
1. WHENEVER the user asks for code, hints, examples, or syntax (e.g. "gimme code hint", "code", "syntax", "example", "code dikhao"), YOU MUST INCLUDE A 3-6 LINE CODE BLOCK IN MARKDOWN \`\`\`python ... \`\`\` or \`\`\`cpp ... \`\`\`.
2. STRUCTURE EVERY RESPONSE INTO 3 MANDATORY SECTIONS:
   - **Core Insight & Intuition**: 2-3 sentences explaining the core logic or pattern.
   - **Code & Pseudocode Snippet**: A 3-6 line code block snippet demonstrating the key loop structure, data structure initialization, or pointer logic (e.g. \`seen = {}\` -> \`if num in seen: return True\`). DO NOT write the 100% full solution, but ALWAYS show the 3-6 line core code snippet!
   - **Socratic Next Step**: End with 1 sharp question asking how they will complete or apply this.
3. NEVER reply with text only when the user requests a code hint or example. ALWAYS include the \`\`\`python ... \`\`\` code block snippet!`;

const SYSTEM_STAGE_PROMPTS: Record<number, string> = {
  0: `You are an expert Socratic Data Structures & Algorithms Mentor. 
The user is at STAGE 0: UNDERSTANDING.
Your goal is to guide the user to clarify the problem statement, constraints, input/output formats, and edge cases.
${COMMON_SOCRATIC_FORMAT_INSTRUCTIONS}
CRITICAL STAGE RULES:
- Focus on constraints (e.g. array length, negative numbers, duplicates).
- Show a 2-line code snippet showing constraint validation if requested.`,

  1: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 1: DIRECTIONAL NUDGE.
Your goal is to help the user identify key patterns or structural properties of the problem.
${COMMON_SOCRATIC_FORMAT_INSTRUCTIONS}
CRITICAL STAGE RULES:
- Nudge toward optimal patterns (e.g., sorted arrays, sliding window, frequency map, hash set).
- Show a 3-4 line generic code snippet demonstrating the pattern syntax.`,

  2: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 2: BRUTE FORCE HINT.
Your goal is to guide the user to formulate a naive/brute-force approach and analyze its complexity.
${COMMON_SOCRATIC_FORMAT_INSTRUCTIONS}
CRITICAL STAGE RULES:
- Explain baseline brute-force logic.
- Show nested loop pseudocode (\`for i in range(n): for j in range(i+1, n):\`).
- Ask the user to estimate Time (O(N^2)) and Space Complexity.`,

  3: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 3: OPTIMAL STRATEGY HINT.
Your goal is to guide the user toward the optimal data structure or technique (e.g., Hash Table, Two Pointers, Fast & Slow Pointers, Monotonic Stack).
${COMMON_SOCRATIC_FORMAT_INSTRUCTIONS}
CRITICAL STAGE RULES:
- Explain optimal pattern's core trick.
- Provide a 4-5 line partial pseudocode code block (\`seen = set()\` -> \`for num in nums: if num in seen: ...\`).
- Ask the user to fill in the final line.`,

  4: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 4: CODE DEBUG & REVIEW.
The user has provided their code solution attempt for review.
YOUR TASK:
1. Review the user's code snippet for syntax errors, missing variable declarations, boundary bugs (off-by-one), or logic gaps.
2. In Section Core Insight & Intuition: Explain what part of their code logic is sound and what key boundary/condition is missing.
3. In Section Code & Pseudocode Snippet: Provide a 3-5 line code snippet demonstrating the corrected loop setup, pointer update, or missing declaration in markdown \`\`\`python ... \`\`\`.
4. In Section Socratic Next Step: Ask them 1 question about how fixing this condition completes their solution.
${COMMON_SOCRATIC_FORMAT_INSTRUCTIONS}`
};

// In-memory rate limiting map: ip -> timestamps array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12; // max 12 requests per min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter out timestamps older than 1 minute
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// In-memory LRU Response Cache to avoid redundant API calls and deliver instant answers
interface CacheEntry {
  reply: string;
  stage: number;
  source: string;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_MAX_ENTRIES = 500;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24-hour cache

function createCacheKey(problemTitle: string, targetStage: number, userMessage: string, userCode: string): string {
  const normTitle = (problemTitle || '').trim().toLowerCase();
  const normMsg = (userMessage || '').trim().toLowerCase();
  const normCode = (userCode || '').trim();
  return `${normTitle}__stage_${targetStage}__${normMsg}__${normCode.slice(0, 100)}`;
}

function getFromCache(key: string): CacheEntry | null {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }
  // Refresh order for LRU behavior
  responseCache.delete(key);
  responseCache.set(key, entry);
  return entry;
}

function setToCache(key: string, entry: Omit<CacheEntry, 'timestamp'>) {
  if (responseCache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) responseCache.delete(oldestKey);
  }
  responseCache.set(key, { ...entry, timestamp: Date.now() });
}

export async function POST(req: Request) {
  try {
    // Extract client IP address for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded: Maximum 12 AI hint requests per minute allowed. Please wait 60 seconds.' },
        { status: 429 }
      );
    }
    const body = await req.json();
    const { problemTitle, problemDescription, userCode, messages, targetStage, userMessage } = body;

    const stageNum = typeof targetStage === 'number' ? Math.min(Math.max(targetStage, 0), 4) : 0;

    // Fast-path: Check response cache for duplicate query
    const cacheKey = createCacheKey(problemTitle, stageNum, userMessage || '', userCode || '');
    const cached = getFromCache(cacheKey);
    if (cached) {
      return NextResponse.json({
        reply: cached.reply,
        stage: cached.stage,
        source: `${cached.source} (cached)`
      });
    }

    const currentSystemPrompt = `${SYSTEM_STAGE_PROMPTS[stageNum]}

PROBLEM METADATA:
Title: ${problemTitle || 'DSA Problem'}
Description/Snippet: ${problemDescription || 'LeetCode problem'}
User Code snippet (if provided): ${userCode ? `\`\`\`\n${userCode}\n\`\`\`` : 'None'}`;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // 1. Attempt Gemini if key is present
    if (geminiKey && geminiKey !== 'mock-key' && geminiKey !== 'your_gemini_api_key_here') {
      const genAI = new GoogleGenerativeAI(geminiKey);

      // Clean & format conversation history to guarantee strict alternating roles starting & ending with 'user'
      const rawMessages = Array.isArray(messages) ? messages.slice(-10) : [];
      const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

      for (const m of rawMessages) {
        if (!m.content) continue;
        const targetRole = m.role === 'assistant' ? 'model' : 'user';
        const text = String(m.content);

        if (contents.length > 0 && contents[contents.length - 1].role === targetRole) {
          contents[contents.length - 1].parts[0].text += `\n\n${text}`;
        } else {
          contents.push({
            role: targetRole,
            parts: [{ text }]
          });
        }
      }

      // Rule A: First turn MUST be 'user'
      if (contents.length === 0 || contents[0].role === 'model') {
        contents.unshift({
          role: 'user',
          parts: [{ text: `Hello mentor, I am working on "${problemTitle || 'this problem'}".` }]
        });
      }

      // Rule B: Last turn MUST be 'user'
      if (contents[contents.length - 1].role === 'model') {
        const promptText = userMessage || (userCode ? `Please review my code implementation:\n\`\`\`python\n${userCode}\n\`\`\`` : 'Please give me a hint for this step.');
        contents.push({
          role: 'user',
          parts: [{ text: promptText }]
        });
      }

      const isPrimaryAllowed = gemini25CircuitBreaker.canExecutePrimary();
      let modelCandidates: string[];

      if (isPrimaryAllowed) {
        modelCandidates = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest'];
      } else {
        console.warn(
          `[CircuitBreaker] Primary model gemini-2.5-flash is OPEN (unhealthy). Bypassing directly to fallback gemini-2.0-flash.`
        );
        modelCandidates = ['gemini-2.0-flash', 'gemini-1.5-flash-latest'];
      }

      let lastGeminiError = '';

      for (const modelName of modelCandidates) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: currentSystemPrompt,
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.4
            }
          });

          const result = await model.generateContent({ contents });
          const reply = result.response.text();

          if (reply) {
            // Record success for primary model if it executed
            if (modelName === 'gemini-2.5-flash') {
              gemini25CircuitBreaker.recordSuccess();
            }

            const sourceStr = `gemini (${modelName})${!isPrimaryAllowed ? ' [circuit-breaker-bypass]' : ''}`;
            setToCache(cacheKey, { reply, stage: stageNum, source: sourceStr });

            return NextResponse.json({
              reply,
              stage: stageNum,
              source: sourceStr
            });
          }
        } catch (geminiError: any) {
          console.warn(`Gemini Model ${modelName} failed/503:`, geminiError.message);
          lastGeminiError = geminiError.message || 'Call failed';

          // Record failure for primary model if it failed
          if (modelName === 'gemini-2.5-flash') {
            gemini25CircuitBreaker.recordFailure(geminiError);
          }
        }
      }

      // If all Gemini models are 503 or 429 rate limited, return fallback Socratic guidance card
      if (lastGeminiError) {
        console.error('All Gemini models failed, serving offline Socratic template');
        const fallbackReply = `### **💡 Concept & Intuition**\nFor **${problemTitle}**, focus on identifying the core pattern (e.g. Hash Map, Two Pointers, or Frequency Counting) to solve this efficiently.\n\n### **💻 Code & Pseudocode Snippet**\n\`\`\`python\n# Step 1: Initialize data structure\nseen = {}\nfor val in items:\n    # Step 2: Check matching condition\n    if condition(val):\n        return result\n\`\`\`\n\n### **❓ Guiding Next Step**\n*What data structure would allow you to check if an item exists in O(1) time?*`;

        setToCache(cacheKey, { reply: fallbackReply, stage: stageNum, source: 'socratic-fallback-template' });

        return NextResponse.json({
          reply: fallbackReply,
          stage: stageNum,
          source: 'socratic-fallback-template'
        });
      }
    }

    // 2. Fallback to OpenAI if key present
    if (openaiKey && openaiKey !== 'mock-key' && openaiKey.startsWith('sk-')) {
      try {
        const rawMessages = Array.isArray(messages) ? messages.slice(-8) : [];
        const formattedMessages = [
          { role: 'system' as const, content: currentSystemPrompt },
          ...rawMessages.map((m: any) => ({
            role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: String(m.content || '')
          }))
        ];

        const openai = new OpenAI({ apiKey: openaiKey });
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: formattedMessages,
          temperature: 0.5,
          max_tokens: 450
        });

        const reply = response.choices[0]?.message?.content || 'No response generated.';

        setToCache(cacheKey, { reply, stage: stageNum, source: 'openai' });

        return NextResponse.json({
          reply,
          stage: stageNum,
          source: 'openai'
        });
      } catch (openAiError: any) {
        console.error('OpenAI API Failure:', openAiError);
        return NextResponse.json(
          { error: `OpenAI API Error: ${openAiError.message}` },
          { status: 400 }
        );
      }
    }

    // 3. If no key is set in .env.local
    return NextResponse.json(
      { error: 'No valid AI API Key (GEMINI_API_KEY) found in .env.local. Please add your key.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Socratic Chatbot Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process Socratic mentor response.' },
      { status: 500 }
    );
  }
}


