import React, { useState } from 'react';
import { LottieMentorBot } from './LottieMentorBot';
import { PROBLEMS, PROBLEM_MAP } from '../data/problems';
import { TOPICS } from '../data/topics';
import { SUGGESTED_QUESTIONS, getZeroCreditResponse } from '../services/socraticService';
import {
  X,
  Search,
  ArrowRight,
  Compass,
  Key,
  ShieldCheck,
  Minimize2,
  Code2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const FloatingMentorBot = ({ onOpenProblemHints, activeProblem = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState('sliding-window');
  const [selectedProblemId, setSelectedProblemId] = useState(
    activeProblem ? activeProblem.id : 'longest-substring-without-repeating-characters'
  );
  const [quickQuestionReply, setQuickQuestionReply] = useState(null);
  const [activeQuestionLabel, setActiveQuestionLabel] = useState(null);

  // Sync active problem if passed from context
  React.useEffect(() => {
    if (activeProblem) {
      setSelectedProblemId(activeProblem.id);
      setSelectedTopicId(activeProblem.topicId);
    }
  }, [activeProblem]);

  const currentProblem = PROBLEM_MAP[selectedProblemId] || PROBLEMS[0];
  const topicProblems = PROBLEMS.filter((p) => p.topicId === selectedTopicId);

  const handleQuickQuestion = (q) => {
    setActiveQuestionLabel(q.label);
    const cachedResponse = getZeroCreditResponse(currentProblem, q.query);
    if (cachedResponse) {
      setQuickQuestionReply(cachedResponse.reply);
    } else {
      setQuickQuestionReply(
        `For **${currentProblem.title}**, consider the core constraints first. Try identifying whether a Hash Map or Two Pointers can reduce redundant sub-computations!`
      );
    }
  };

  const handleOpenFullDrawer = () => {
    if (onOpenProblemHints) {
      onOpenProblemHints(currentProblem);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-20 sm:bottom-4 right-2 sm:right-4 z-40 flex flex-col items-end pointer-events-none">
        {/* Hover / Welcome Speech Bubble Tooltip */}
        {!isOpen && !hasDismissedTooltip && (
          <div className="mb-1 mr-3 animate-bounce-subtle bg-white dark:bg-[#1C1D22] text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-2xl px-3.5 py-1.5 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] text-xs font-bold flex items-center gap-2 max-w-[260px] pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Need a hint? Click me!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasDismissedTooltip(true);
              }}
              className="text-slate-400 hover:text-black dark:hover:text-white text-xs ml-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasDismissedTooltip(true);
          }}
          className="relative group transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer flex items-center justify-center p-0 border-none bg-transparent outline-none focus:outline-none pointer-events-auto"
          title="Open DSA Mentor AI Bot"
          aria-label="Open DSA Mentor AI Bot"
        >
          {/* Large Standalone Animated Lottie Robot */}
          <LottieMentorBot
            className="w-36 sm:w-48 md:w-52 drop-shadow-[0_8px_20px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_8px_25px_rgba(255,255,255,0.18)]"
            showGlow={false}
          />

          {/* Micro label */}
          <span className="sr-only">DSA Mentor Bot</span>
        </button>
      </div>

      {/* Expanded Quick Mentor Dialog Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="w-full sm:max-w-xl max-h-[88vh] sm:max-h-[82vh] bg-[#FAF6EE] dark:bg-[#121316] text-[#18181B] dark:text-[#F4F4F5] border-3 border-black dark:border-zinc-700 rounded-3xl shadow-[0_8px_0_0_#18181B] dark:shadow-[0_8px_0_0_#3F3F46] flex flex-col overflow-hidden relative"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#030712] via-[#0F172A] to-[#1E1B4B] text-white border-b-3 border-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-10 flex items-center justify-center shrink-0">
                  <LottieMentorBot size={44} showGlow={false} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-sm sm:text-base tracking-wide text-white">
                      DSA Mentor Bot
                    </h2>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      0 Credits • 100% Free
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Socratic hints, intuition & instant zero-cost answers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              {/* Problem Selector Bar */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-black text-xs uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-black dark:text-amber-400" /> Currently Inspecting:
                  </span>
                  <div className="flex gap-1.5">
                    <select
                      value={selectedTopicId}
                      onChange={(e) => {
                        const newT = e.target.value;
                        setSelectedTopicId(newT);
                        const firstProb = PROBLEMS.find((p) => p.topicId === newT);
                        if (firstProb) setSelectedProblemId(firstProb.id);
                        setQuickQuestionReply(null);
                        setActiveQuestionLabel(null);
                      }}
                      className="text-xs font-bold px-2 py-1 rounded-lg border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedProblemId}
                      onChange={(e) => {
                        setSelectedProblemId(e.target.value);
                        setQuickQuestionReply(null);
                        setActiveQuestionLabel(null);
                      }}
                      className="text-xs font-bold px-2 py-1 rounded-lg border-2 border-black bg-[#FFDE59] text-black cursor-pointer max-w-[160px] sm:max-w-[200px] truncate"
                    >
                      {topicProblems.map((p) => (
                        <option key={p.id} value={p.id}>
                          #{p.lcNumber} {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-black text-sm text-black dark:text-white">
                      #{currentProblem.lcNumber} {currentProblem.title}
                    </h3>
                    <span className="text-[11px] text-slate-600 dark:text-zinc-400">
                      Tier {currentProblem.tier} • {currentProblem.difficulty} • {currentProblem.pattern}
                    </span>
                  </div>

                  <button
                    onClick={handleOpenFullDrawer}
                    className="neo-btn bg-[#A7F3D0] hover:bg-[#86efac] text-black px-3 py-1.5 text-xs font-black cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <span>Open 4-Stage Hints</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Quick Questions (Instant Fast-Path Answers) */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1">
                  <Search className="w-3 h-3" /> Quick Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeQuestionLabel === q.label
                          ? 'bg-[#FFDE59] text-black shadow-[0_1px_0_0_#18181B] translate-y-[2px]'
                          : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-[#FAF6EE] shadow-[0_3px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[2px]'
                      }`}
                    >
                      <span>{q.label}</span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                        Instant
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mentor Bot Output Card (Clean flat card, no hard shadow) */}
              {quickQuestionReply ? (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-600 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-2">
                    <span className="font-black text-xs uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-500" /> {activeQuestionLabel || 'Mentor Response'}:
                    </span>
                    <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Instant AI Response
                    </span>
                  </div>

                  <div className="text-xs leading-relaxed text-slate-800 dark:text-zinc-200 whitespace-pre-wrap font-sans">
                    {quickQuestionReply}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleOpenFullDrawer}
                      className="neo-btn bg-[#C4B5FD] text-black px-3.5 py-1.5 text-xs font-black cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Continue in Full Socratic Chat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Default Bot Hero Display (Clean flat card) */
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-600 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="shrink-0 flex items-center justify-center p-2">
                    <LottieMentorBot size={135} showGlow={false} badgeText="DSA Mentor" />
                  </div>
                  <div className="space-y-1.5">
                    <span className="neo-pill bg-[#C4B5FD] text-black text-[10px]">
                      Your AI Problem Guide
                    </span>
                    <h4 className="font-black text-sm sm:text-base text-black dark:text-white">
                      Never Get Stuck On A Problem
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Select any question above to get instant intuition, key edge cases, or step-by-step logic.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer bar */}
            <div className="p-3 bg-[#FAF6EE] dark:bg-[#18191E] border-t-2 border-black dark:border-zinc-700 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-zinc-400 font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Socratic AI Active
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="neo-btn bg-[#FECDD3] text-black px-3.5 py-1 text-xs font-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
