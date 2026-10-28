'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Send, Code, Sparkles, X, CheckCircle2, RefreshCw, AlertCircle, ArrowLeft, Search, HelpCircle, Compass, MessageSquareCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SUGGESTED_QUESTIONS, getZeroCreditResponse } from '../services/socraticService';

interface SocraticChatModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
  currentHintStage: number;
  onMarkSolved: (leetcodeId: string, finalStage: number) => void;
  onStageChange?: (leetcodeId: string, newStage: number) => void;
}

export const SocraticChatModal: React.FC<SocraticChatModalProps> = ({
  problem,
  isOpen,
  onClose,
  currentHintStage,
  onMarkSolved,
  onStageChange
}) => {
  const { user, isDemoMode } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userCode, setUserCode] = useState('');
  const [stage, setStage] = useState<number>(currentHintStage || 0);
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (problem && isOpen) {
      const initialStage = typeof currentHintStage === 'number' ? currentHintStage : 0;
      setStage(initialStage);
      setChatError(null);
      setInputMessage('');
      setShowCodeInput(false);

      // 1. Read per-problem code from localStorage first for instant isolation
      const localCodeKey = `dsa_mentor_code_${problem.id}`;
      const localSavedCode = typeof window !== 'undefined' ? localStorage.getItem(localCodeKey) : null;
      if (localSavedCode !== null) {
        setUserCode(localSavedCode);
      } else {
        setUserCode('');
      }

      // 2. Load previous session & user code from Firestore for THIS specific problem ID
      async function loadChatSession() {
        if (user && !isDemoMode) {
          try {
            const docRef = doc(db, 'users', user.uid, 'chatSessions', problem!.id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              if (typeof data.userCode === 'string' && data.userCode.trim()) {
                setUserCode(data.userCode);
                localStorage.setItem(localCodeKey, data.userCode);
              }
              if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
                setMessages(data.messages);
                const savedStage = typeof data.currentStage === 'number' ? data.currentStage : initialStage;
                setStage(savedStage);
                return;
              }
            }
          } catch (e) {
            console.warn('Failed to load chat history from Firestore', e);
          }
        }

        // Default initial welcome message for new/unvisited problem
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: `Welcome to **${problem!.title}**! I am your Socratic AI Mentor. \n\nI won't give you code copy-pastes right away. Instead, I will guide your thinking step-by-step. Let's start with **Stage ${initialStage}: ${STAGE_DESCRIPTIONS[initialStage as SocraticStage]?.title || 'Understanding'}**.\n\n*What inputs, constraints, or edge cases are you considering for this problem?*`,
            stage: initialStage,
            timestamp: new Date().toISOString()
          }
        ]);
      }

      loadChatSession();
    }
  }, [problem?.id, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen || !problem) return null;

  const handleUserCodeChange = (newCode: string) => {
    setUserCode(newCode);
    if (problem) {
      localStorage.setItem(`dsa_mentor_code_${problem.id}`, newCode);
    }
  };

  const handleSendMessage = async (escalateStage = false, overrideStage?: number, customMessage?: string) => {
    setChatError(null);
    const nextStage = typeof overrideStage === 'number'
      ? overrideStage
      : (escalateStage ? Math.min(stage + 1, 4) : stage);
    setStage(nextStage);

    if ((escalateStage || typeof overrideStage === 'number') && onStageChange) {
      onStageChange(problem.id, nextStage);
    }

    const STAGE_LABELS: Record<number, string> = {
      0: 'Stage 0 (Understanding)',
      1: 'Stage 1 (Directional Nudge)',
      2: 'Stage 2 (Brute Force Hint)',
      3: 'Stage 3 (Optimal Strategy Hint)',
      4: 'Stage 4 (Code Debug & Review)'
    };

    const defaultEscalateText = typeof overrideStage === 'number' && overrideStage === 4
      ? `Please review my code implementation for ${problem.title}.`
      : `Please give me ${STAGE_LABELS[nextStage]} guidance for ${problem.title}.`;

    const userText = customMessage || inputMessage.trim() || (escalateStage || typeof overrideStage === 'number' ? defaultEscalateText : '');
    if (!userText && !userCode.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText + (userCode.trim() && !userText.includes(userCode.trim()) ? `\n\n\`\`\`\n${userCode.trim()}\n\`\`\`` : ''),
      stage: nextStage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputMessage('');

    // Zero-Credit Smart Interception: Save user API credits for common questions!
    const zeroCredit = getZeroCreditResponse(problem, userText);
    if (zeroCredit && !userCode.trim()) {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: zeroCredit.reply,
        stage: nextStage,
        timestamp: new Date().toISOString()
      };
      setMessages([...updatedMessages, assistantMsg]);
      return;
    }

    setLoading(true);

    // 15-second AbortController timeout to prevent infinite loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      console.log(`[Socratic AI] Requesting Stage ${nextStage} for "${problem.title}". Code attached:`, Boolean(userCode.trim()));

      const res = await fetch('/api/chat/socratic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          problemTitle: problem.title,
          problemDescription: problem.descriptionSnippet,
          userCode: userCode.trim() || undefined,
          targetStage: nextStage,
          messages: updatedMessages,
          userMessage: userText
        })
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (res.ok && data.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          stage: nextStage,
          timestamp: new Date().toISOString()
        };
        const finalMessages = [...updatedMessages, assistantMsg];
        setMessages(finalMessages);

        // Save session to Firestore if logged in
        if (user && !isDemoMode) {
          try {
            await setDoc(
              doc(db, 'users', user.uid, 'chatSessions', problem.id),
              {
                problemId: problem.id,
                currentStage: nextStage,
                userCode: userCode.trim(),
                messages: finalMessages.slice(-20),
                updatedAt: new Date().toISOString()
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Failed to save chat to Firestore', e);
          }
        }
      } else {
        const errorText = data.error || 'Failed to get response from Socratic AI.';
        setChatError(errorText);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `**AI Mentor Notice**: ${errorText}\n\nPlease click **"Review My Code with AI"** or ask another question to try again.`,
            stage: nextStage,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Chat API Error:', err);
      const isTimeout = err.name === 'AbortError';
      const errorMsg = isTimeout
        ? 'AI Mentor response timed out (15s limit). Please check your connection and click Review again.'
        : (err.message || 'Network error occurred while calling Socratic AI.');

      setChatError(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `**Network Error**: ${errorMsg}`,
          stage: nextStage,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const triggerSolved = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onMarkSolved(problem.id, stage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05222B]/85 backdrop-blur-md p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl h-[90vh] flex flex-col rounded-[2rem] bg-[#EBF7F7] border border-[#70D6D1]/30 shadow-2xl overflow-hidden text-[#072A36] warm-card-glow"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#05222B] via-[#073847] to-[#0B4F6C] p-4 border-b border-[#70D6D1]/20 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#A2D2D2] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[#70D6D1]" /> Dashboard
            </button>
            <div className="h-4 w-px bg-[#70D6D1]/30" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-white">{problem.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  problem.difficulty === 'Easy' ? 'bg-[#E0F4F4] text-[#008080] border border-[#70D6D1]/40' :
                  problem.difficulty === 'Medium' ? 'bg-[#E5F3F4] text-[#0F6B7B] border border-[#0F6B7B]/30' :
                  'bg-[#072A36] text-white border border-[#072A36]'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-xs text-[#C2E8E8]">LeetCode #{problem.id} — Socratic AI Mentor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerSolved}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#00A896]/30 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4 text-white" /> Mark Solved
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#A2D2D2] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stage Progress Bar */}
        <div className="bg-[#062933] px-5 py-2.5 border-b border-[#70D6D1]/20 flex items-center justify-between text-xs font-mono text-white">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#70D6D1]">Current Stage {stage}/4:</span>
            <span className="text-[#C2E8E8] font-medium font-sans">
              {STAGE_DESCRIPTIONS[stage as SocraticStage]?.title || 'Understanding'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full transition-all ${
                  stage >= s ? 'bg-[#70D6D1] shadow-sm' : 'bg-[#094154]'
                }`}
                title={`Stage ${s}`}
              />
            ))}
          </div>
        </div>

        {/* Chat Error Alert */}
        {chatError && (
          <div className="bg-rose-900/90 border-b border-rose-700 p-3 text-xs text-rose-100 flex items-center gap-2 font-semibold">
            <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
            <span className="flex-1">{chatError}</span>
            <button onClick={() => setChatError(null)} className="text-rose-200 hover:text-white p-0.5 rounded cursor-pointer" aria-label="Dismiss error">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#EBF7F7]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-2xl bg-[#00A896]/15 border border-[#00A896]/30 flex items-center justify-center text-[#00A896] shrink-0 mt-1 shadow-sm">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#074554] to-[#0B5C70] text-white font-semibold rounded-tr-none shadow-md'
                    : 'bg-white border border-[#0F7A8D]/15 text-[#072A36] rounded-tl-none shadow-sm font-medium'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#00A896] italic p-2 font-mono font-bold">
              <RefreshCw className="w-4 h-4 animate-spin text-[#00A896]" /> AI Mentor is crafting Stage {stage} guidance...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Code Input Panel */}
        <AnimatePresence>
          {showCodeInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-t border-[#0F7A8D]/15 p-4 space-y-3"
            >
              <div className="flex justify-between items-center text-xs text-[#3B6674]">
                <span className="flex items-center gap-1.5 font-bold text-[#0B4F6C] uppercase tracking-wider font-mono">
                  <Code className="w-4 h-4 text-[#00A896]" /> // Interactive Code Workspace &amp; Stage 4 Review
                </span>
                <button
                  onClick={() => setShowCodeInput(false)}
                  className="text-[#3B6674] hover:text-[#072A36] text-xs font-bold"
                >
                  Hide Editor
                </button>
              </div>

              <p className="text-[11px] text-[#3B6674] leading-relaxed bg-[#EBF7F7] p-3 rounded-xl border border-[#0F7A8D]/15 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                <span><strong>Usage:</strong> Paste your solution code below and select <strong>&quot;Review My Code with AI&quot;</strong> to receive Stage 4 boundary condition validation and line-by-line feedback.</span>
              </p>

              <textarea
                value={userCode}
                onChange={(e) => handleUserCodeChange(e.target.value)}
                placeholder="// Write or paste your code solution implementation here..."
                rows={5}
                className="w-full bg-[#F4FAFA] border border-[#0F7A8D]/25 rounded-xl p-3 font-mono text-xs text-[#072A36] focus:outline-none focus:border-[#00A896]"
              />

              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-2 pt-1">
                <span className="text-[11px] text-[#3B6674] flex items-center gap-1.5">
                  {!userCode.trim() ? (
                    <>
                      <HelpCircle className="w-3.5 h-3.5 text-[#00A896]" />
                      <span>Paste or type your code in the box above to enable AI review.</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">Code ready for Stage 4 AI Review</span>
                    </>
                  )}
                </span>
                <button
                  onClick={() => {
                    if (!userCode.trim()) return;
                    setShowCodeInput(false);
                    handleSendMessage(false, 4);
                  }}
                  disabled={loading || !userCode.trim()}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0 hover:scale-105"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-white animate-spin" /> Reviewing Code...
                    </>
                  ) : (
                    <>
                      <MessageSquareCode className="w-4 h-4 text-white" /> Review My Code with AI (Stage 4)
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#072C37] border-t border-[#70D6D1]/20 space-y-2.5">
          {/* Suggested Question Chips (0 API Credits / Instant Nudges) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#70D6D1] shrink-0 flex items-center gap-1 mr-1">
              <Search className="w-3 h-3 text-[#70D6D1]" /> Suggested:
            </span>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendMessage(false, undefined, q.query)}
                disabled={loading}
                title="Ask instantly (0 API Credits / Instant Response)"
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#00A896]/30 border border-white/20 text-[#C2E8E8] hover:text-white text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer hover:border-[#70D6D1] shrink-0 active:scale-95 flex items-center gap-1.5 shadow-xs"
              >
                <span>{q.label}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">Free</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCodeInput(!showCodeInput)}
              className={`p-2.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all ${
                showCodeInput || userCode
                  ? 'border-[#70D6D1] bg-[#00A896]/20 text-[#70D6D1]'
                  : 'border-white/20 bg-white/10 text-[#C2E8E8] hover:bg-white/20'
              }`}
              title="Attach Code"
            >
              <Code className="w-4 h-4" /> Code
            </button>

            {stage < 4 && (
              <button
                onClick={() => handleSendMessage(true)}
                disabled={loading}
                className="px-4 py-2.5 rounded-full bg-[#00A896]/20 border border-[#00A896]/40 hover:bg-[#00A896]/30 text-[#70D6D1] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                title="Progress to next hint stage"
              >
                <Compass className="w-3.5 h-3.5 text-[#70D6D1]" /> Stage {stage + 1} Hint
              </button>
            )}

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(false)}
              placeholder="Ask a question or explain your approach..."
              className="flex-1 bg-white border border-[#0F7A8D]/25 rounded-full px-5 py-2.5 text-xs sm:text-sm text-[#072A36] placeholder-[#7A9EA6] focus:outline-none focus:border-[#00A896]"
            />

            <button
              onClick={() => handleSendMessage(false)}
              disabled={loading || (!inputMessage.trim() && !userCode.trim())}
              className="p-3 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] disabled:opacity-40 text-white font-bold flex items-center justify-center transition-all shadow-md hover:scale-105"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
