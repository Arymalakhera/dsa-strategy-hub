import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

const SYSTEM_STAGE_PROMPTS: Record<number, string> = {
  0: `You are an expert Socratic Data Structures & Algorithms Mentor. 
The user is at STAGE 0: UNDERSTANDING.
Your goal is to guide the user to clarify the problem statement, constraints, input/output formats, and edge cases.
CRITICAL RULES:
1. NEVER reveal any algorithmic solution, pseudocode, or direct code.
2. Ask 1-2 sharp guiding questions about constraints, inputs, or edge cases (e.g., negative numbers, empty arrays, duplicate values).
3. Be encouraging, concise, and professional.`,

  1: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 1: DIRECTIONAL NUDGE.
Your goal is to help the user identify key patterns or structural properties of the problem.
CRITICAL RULES:
1. Do NOT reveal the specific data structure or optimal code yet.
2. Nudge the user's thinking toward general concepts (e.g., "Is the input sorted?", "How can we avoid redundant work?").
3. Ask the user what approach they are currently considering.`,

  2: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 2: BRUTE FORCE HINT.
Your goal is to guide the user to formulate a naive/brute-force approach and analyze its complexity.
CRITICAL RULES:
1. Explain the baseline brute-force logic conceptually.
2. Ask the user to estimate the Time and Space Complexity of this brute force approach.
3. Do NOT provide optimal code yet.`,

  3: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 3: OPTIMAL STRATEGY HINT.
Your goal is to guide the user toward the optimal data structure or technique (e.g., Two Pointers, Hash Table, Dynamic Programming, Fast & Slow Pointers).
CRITICAL RULES:
1. Explain the intuition behind the optimal technique.
2. Ask the user how they would implement this strategy step-by-step.
3. Do NOT write full executable code solution yet — let them try writing code first.`,

  4: `You are an expert Socratic Data Structures & Algorithms Mentor.
The user is at STAGE 4: CODE DEBUG & REVIEW.
The user has written or attempted code.
Your goal is to review their logic, identify syntax/logic bugs, off-by-one errors, or boundary failures.
CRITICAL RULES:
1. Point out the exact line or condition that might fail.
2. Ask them a targeted question to fix it themselves rather than just rewriting the code for them unless explicitly requested.`
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

    const currentSystemPrompt = `${SYSTEM_STAGE_PROMPTS[stageNum]}

PROBLEM METADATA:
Title: ${problemTitle || 'DSA Problem'}
Description/Snippet: ${problemDescription || 'LeetCode problem'}
User Code snippet (if provided): ${userCode ? `\`\`\`\n${userCode}\n\`\`\`` : 'None'}`;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // 1. Attempt Gemini if key is present
    if (geminiKey && geminiKey !== 'mock-key' && geminiKey !== 'your_gemini_api_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          systemInstruction: currentSystemPrompt,
        });

        // Clean & format conversation history to guarantee strict alternating roles (user -> model)
        const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
        const rawMessages = Array.isArray(messages) ? messages.slice(-10) : [];

        for (const m of rawMessages) {
          if (!m.content) continue;
          const targetRole = m.role === 'assistant' ? 'model' : 'user';
          const text = String(m.content);

          if (contents.length > 0 && contents[contents.length - 1].role === targetRole) {
            // Merge consecutive same-role text into single turn to satisfy Gemini API constraints
            contents[contents.length - 1].parts[0].text += `\n\n${text}`;
          } else {
            contents.push({
              role: targetRole,
              parts: [{ text }]
            });
          }
        }

        // If userMessage was passed separately and wasn't at the end of messages, append it cleanly
        if (userMessage) {
          const lastTurn = contents.length > 0 ? contents[contents.length - 1] : null;
          if (!lastTurn || !lastTurn.parts[0].text.includes(userMessage)) {
            if (lastTurn && lastTurn.role === 'user') {
              lastTurn.parts[0].text += `\n\n${userMessage}`;
            } else {
              contents.push({
                role: 'user',
                parts: [{ text: userMessage }]
              });
            }
          }
        }

        // Gemini API requires first content turn to be 'user'. Prepend initial prompt instead of discarding greeting.
        if (contents.length > 0 && contents[0].role === 'model') {
          contents.unshift({
            role: 'user',
            parts: [{ text: `Hello mentor, I am working on ${problemTitle || 'this problem'}.` }]
          });
        }

        if (contents.length === 0) {
          contents.push({
            role: 'user',
            parts: [{ text: userMessage || 'Hello mentor, please give me a Socratic hint.' }]
          });
        }

        const result = await model.generateContent({ contents });
        const reply = result.response.text();

        return NextResponse.json({
          reply,
          stage: stageNum,
          source: 'gemini'
        });
      } catch (geminiError: any) {
        console.error('Gemini API Failure:', geminiError);
        return NextResponse.json(
          { error: `Gemini API Error: ${geminiError.message || 'Call failed'}` },
          { status: 400 }
        );
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


