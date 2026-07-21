'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Problem, ChatMessage, SocraticStage, STAGE_DESCRIPTIONS } from '../types';
import { BrainCircuit, Send, Code, Sparkles, X, CheckCircle2, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SocraticChatModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
  currentHintStage: number;
  onMarkSolved: (leetcodeId: string, finalStage: number) => void;
}

export const SocraticChatModal: React.FC<SocraticChatModalProps> = ({
  problem,
  isOpen,
  onClose,
  currentHintStage,
  onMarkSolved
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

      // Load previous session from Firestore or set initial stage 0 message
      async function loadChatSession() {
        if (user && !isDemoMode) {
          try {
            const docRef = doc(db, 'users', user.uid, 'chatSessions', problem!.id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
                setMessages(data.messages);
                if (typeof data.currentStage === 'number') setStage(data.currentStage);
                return;
              }
            }
          } catch (e) {
            console.warn('Failed to load chat history from Firestore', e);
          }
        }

        // Default initial welcome message
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
  }, [problem, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen || !problem) return null;

  const handleSendMessage = async (escalateStage = false) => {
    setChatError(null);
    const nextStage = escalateStage ? Math.min(stage + 1, 4) : stage;
    setStage(nextStage);

    const STAGE_LABELS: Record<number, string> = {
      0: 'Stage 0 (Understanding)',
      1: 'Stage 1 (Directional Nudge)',
      2: 'Stage 2 (Brute Force Hint)',
      3: 'Stage 3 (Optimal Strategy Hint)',
      4: 'Stage 4 (Code Debug & Review)'
    };

    const defaultEscalateText = `Please give me ${STAGE_LABELS[nextStage]} guidance for ${problem.title}.`;
    const userText = inputMessage.trim() || (escalateStage ? defaultEscalateText : '');
    if (!userText && !userCode.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText + (userCode.trim() ? `\n\n\`\`\`\n${userCode.trim()}\n\`\`\`` : ''),
      stage: nextStage,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat/socratic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: problem.title,
          problemDescription: problem.descriptionSnippet,
          userCode: userCode.trim() || undefined,
          targetStage: nextStage,
          messages: updatedMessages,
          userMessage: userText
        })
      });

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
                messages: finalMessages.slice(-20),
                updatedAt: new Date().toISOString()
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Failed to save chat to Firestore', e);
          }
        }
      } else if (data.error) {
        setChatError(data.error);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setChatError(err.message || 'Network error occurred while calling Socratic AI.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{problem.title}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  problem.difficulty === 'Easy' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                  problem.difficulty === 'Medium' ? 'bg-amber-950/60 text-amber-400 border border-amber-800' :
                  'bg-rose-950/60 text-rose-400 border border-rose-800'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400">LeetCode #{problem.id} — Socratic AI Mentor</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerSolved}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Solved
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stage Progress Bar */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-indigo-400">Current Stage {stage}/4:</span>
            <span className="text-slate-300 font-medium">
              {STAGE_DESCRIPTIONS[stage as SocraticStage]?.title || 'Understanding'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full transition-all ${
                  stage >= s ? 'bg-indigo-500 shadow-sm shadow-indigo-500' : 'bg-slate-800'
                }`}
                title={`Stage ${s}`}
              />
            ))}
          </div>
        </div>

        {/* Chat Error Alert */}
        {chatError && (
          <div className="bg-rose-950/80 border-b border-rose-800 p-3 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="flex-1">{chatError}</span>
            <button onClick={() => setChatError(null)} className="text-rose-400 hover:text-white font-bold">✕</button>
          </div>
        )}

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                    : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-bl-none shadow-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 italic p-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> AI Mentor is crafting Stage {stage} guidance...
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
              className="bg-slate-950 border-t border-slate-800 p-3 space-y-2"
            >
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-indigo-400">
                  <Code className="w-3.5 h-3.5" /> Paste Your Code Solution for Stage 4 Review
                </span>
                <button
                  onClick={() => setShowCodeInput(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  Hide Editor
                </button>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="// Paste your code implementation here..."
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowCodeInput(!showCodeInput)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                showCodeInput || userCode
                  ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
              }`}
              title="Attach Code"
            >
              <Code className="w-4 h-4" /> Code
            </button>

            {stage < 4 && (
              <button
                onClick={() => handleSendMessage(true)}
                disabled={loading}
                className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-700 hover:bg-purple-900/80 text-purple-200 text-xs font-bold flex items-center gap-1 transition-all shadow-md shadow-purple-950/50"
                title="Progress to next hint stage"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Need Stage {stage + 1} Hint
              </button>
            )}

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(false)}
              placeholder="Ask a question or explain your approach..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={() => handleSendMessage(false)}
              disabled={loading || (!inputMessage.trim() && !userCode.trim())}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold flex items-center justify-center transition-all shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
