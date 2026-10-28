import React, { useState, useMemo, useEffect } from 'react';
import { PROBLEMS } from '../data/problems';
import { TOPICS } from '../data/topics';
import { SUGGESTED_QUESTIONS, getZeroCreditResponse } from '../services/socraticService';
import {
  X,
  Search,
  ArrowRight,
  Compass,
  Key,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const FloatingMentorBot = ({ onOpenProblemHints, activeProblem = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);

  // Default to activeProblem or first topic ('arrays')
  const initialTopic = activeProblem ? activeProblem.topicId : TOPICS[0]?.id || 'arrays';
  const initialProblems = PROBLEMS.filter((p) => p.topicId === initialTopic);
  const initialProblemId = activeProblem ? activeProblem.id : initialProblems[0]?.id || PROBLEMS[0]?.id || '26';

  const [selectedTopicId, setSelectedTopicId] = useState(initialTopic);
  const [selectedProblemId, setSelectedProblemId] = useState(initialProblemId);
  const [quickQuestionReply, setQuickQuestionReply] = useState(null);
  const [activeQuestionLabel, setActiveQuestionLabel] = useState(null);

  // Sync active problem if passed or changed from parent
  useEffect(() => {
    if (activeProblem) {
      setSelectedProblemId(activeProblem.id);
      setSelectedTopicId(activeProblem.topicId);
      setQuickQuestionReply(null);
      setActiveQuestionLabel(null);
    }
  }, [activeProblem]);

  // Problems for the currently chosen topic
  const topicProblems = useMemo(() => {
    const list = PROBLEMS.filter((p) => p.topicId === selectedTopicId);
    return list.length > 0 ? list : PROBLEMS;
  }, [selectedTopicId]);

  // Guaranteed synchronization between topic, problem dropdown, and displayed problem card
  const currentProblem = useMemo(() => {
    const found = topicProblems.find((p) => p.id === selectedProblemId);
    if (found) return found;
    return topicProblems[0] || PROBLEMS[0];
  }, [topicProblems, selectedProblemId]);

  const handleQuickQuestion = (q) => {
    setActiveQuestionLabel(q.label);
    const cachedResponse = getZeroCreditResponse(currentProblem, q.query);
    if (cachedResponse) {
      setQuickQuestionReply(cachedResponse.reply);
    } else {
      setQuickQuestionReply(
        `For **${currentProblem.title}**, consider the core constraints first. Try identifying whether a Hash Map, Two Pointers, or Frequency Counting can eliminate redundant passes!`
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
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
        {/* Welcome Tooltip */}
        {!isOpen && !hasDismissedTooltip && (
          <div className="mb-2 mr-1 bg-white dark:bg-[#1C1D22] text-black dark:text-white border-2 border-black dark:border-zinc-700 rounded-2xl px-3 py-1.5 shadow-[0_3px_0_0_#18181B] text-xs font-black flex items-center gap-2 pointer-events-auto animate-bounce-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Need Socratic hints? Click here</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasDismissedTooltip(true);
              }}
              className="text-slate-400 hover:text-black dark:hover:text-white text-xs ml-1 cursor-pointer p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasDismissedTooltip(true);
          }}
          className="group relative px-3.5 sm:px-4 py-2.5 rounded-2xl bg-[#FFDE59] hover:bg-[#FDE047] text-black border-2 border-black shadow-[0_4px_0_0_#18181B] hover:translate-y-[-2px] active:translate-y-[2px] transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 pointer-events-auto font-black text-xs"
          title="Open Socratic Mentor Guide"
          aria-label="Open Socratic Mentor Guide"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-black flex items-center justify-center shrink-0">
            <BrainCircuit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
          </div>
          <span className="hidden sm:inline">Socratic Mentor</span>
          <span className="px-1.5 py-0.5 rounded-md bg-[#34D399] border border-black text-[9px] font-mono font-black uppercase">
            Helper
          </span>
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
            {/* Header: Clean Neo-Brutalist styling consistent with the website */}
            <div className="p-4 sm:p-5 bg-[#FAF6EE] dark:bg-[#18191E] text-[#18181B] dark:text-[#F4F4F5] border-b-2 border-black dark:border-zinc-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFDE59] border-2 border-black flex items-center justify-center shrink-0 shadow-[0_2.5px_0_0_#18181B]">
                  <BrainCircuit className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-black text-sm sm:text-base tracking-tight text-black dark:text-white">
                      Socratic Mentor Guide
                    </h2>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#A7F3D0] text-black border-2 border-black shadow-[0_1.5px_0_0_#18181B]">
                      Intuition Helper
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                    Targeted pattern breakdowns, complexity checks & edge cases
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[0_2.5px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer"
                title="Close"
                aria-label="Close mentor modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
              {/* Problem Selector Bar */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 shadow-[0_2.5px_0_0_#18181B] space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-black text-xs uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-black dark:text-amber-400" /> Currently Inspecting:
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
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
                      className="text-xs font-bold px-2.5 py-1.5 rounded-xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer shadow-[0_1.5px_0_0_#18181B]"
                    >
                      {TOPICS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={currentProblem.id}
                      onChange={(e) => {
                        setSelectedProblemId(e.target.value);
                        setQuickQuestionReply(null);
                        setActiveQuestionLabel(null);
                      }}
                      className="text-xs font-bold px-2.5 py-1.5 rounded-xl border-2 border-black bg-[#FFDE59] text-black cursor-pointer max-w-[170px] sm:max-w-[220px] truncate shadow-[0_1.5px_0_0_#18181B]"
                    >
                      {topicProblems.map((p) => (
                        <option key={p.id} value={p.id}>
                          #{p.lcNumber} {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10 flex-wrap gap-2">
                  <div>
                    <h3 className="font-black text-sm text-black dark:text-white">
                      #{currentProblem.lcNumber} {currentProblem.title}
                    </h3>
                    <span className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
                      Tier {currentProblem.tier} • {currentProblem.difficulty} • {currentProblem.pattern}
                    </span>
                  </div>

                  <button
                    onClick={handleOpenFullDrawer}
                    className="neo-btn bg-[#A7F3D0] hover:bg-[#86efac] text-black px-3 py-1.5 text-xs font-black cursor-pointer flex items-center gap-1.5 shrink-0 border-2 border-black shadow-[0_2px_0_0_#18181B]"
                  >
                    <span>Open 4-Stage Hints</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quick Intuition Prompts */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-400" /> Socratic Prompt Chips:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                        activeQuestionLabel === q.label
                          ? 'bg-[#FFDE59] text-black shadow-[0_1px_0_0_#18181B] translate-y-[1.5px]'
                          : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-[#FAF6EE] shadow-[0_2.5px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[1.5px]'
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guidance Output Card */}
              {quickQuestionReply ? (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 shadow-[0_2.5px_0_0_#18181B] space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-2">
                    <span className="font-black text-xs uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-amber-500" /> {activeQuestionLabel || 'Mentor Response'}:
                    </span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 border border-emerald-500/20">
                      Active Hint
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-zinc-200 whitespace-pre-wrap font-sans">
                    {quickQuestionReply}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleOpenFullDrawer}
                      className="neo-btn bg-[#C4B5FD] text-black px-3.5 py-1.5 text-xs font-black cursor-pointer flex items-center gap-1.5 border-2 border-black shadow-[0_2px_0_0_#18181B]"
                    >
                      <span>Open in 4-Stage Hint Ladder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 shadow-[0_2.5px_0_0_#18181B] flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-[#BAE6FD] border-2 border-black flex items-center justify-center shrink-0 shadow-[0_2px_0_0_#18181B]">
                    <Lightbulb className="w-6 h-6 text-black" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h4 className="font-black text-sm text-black dark:text-white">
                        Socratic Intuition Coach
                      </h4>
                      <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-[#FFDE59] text-black border border-black">
                        Self-Paced
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium leading-relaxed">
                      Click any prompt above to explore step-by-step intuition, complexity bounds, or edge cases without seeing the full solution right away.
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
                className="neo-btn bg-[#FECDD3] text-black px-4 py-1 text-xs font-black border-2 border-black shadow-[0_2px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
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
