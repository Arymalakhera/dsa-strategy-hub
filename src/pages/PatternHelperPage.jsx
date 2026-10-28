import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLUE_CHIPS } from '../data/patternHelperRules';
import { matchPatternsFromClues } from '../utils/patternMatcher';
import {
  HelpCircle,
  Key,
  CheckCircle2,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const PatternHelperPage = () => {
  const [selectedClues, setSelectedClues] = useState([]);

  const toggleClue = (clueId) => {
    if (selectedClues.includes(clueId)) {
      setSelectedClues(selectedClues.filter((id) => id !== clueId));
    } else {
      setSelectedClues([...selectedClues, clueId]);
    }
  };

  const clearClues = () => setSelectedClues([]);

  // Match suggestions using pure function
  const matchedPatterns = matchPatternsFromClues(selectedClues);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#C4B5FD] text-black">
            Pattern Detection Engine
          </span>
          <span className="neo-pill bg-[#A7F3D0] text-black">
            Rule-Based Inference
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            "Which Pattern Is This?" Helper
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Stuck trying to model a question? Select the keywords, signals, and constraints mentioned in the problem prompt. Our inference engine identifies the algorithmic technique and links directly to canonical practice problems.
          </p>
        </div>
      </div>

      {/* Clue Chips Selection Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3 flex-wrap gap-2">
          <div>
            <h2 className="font-black text-black dark:text-white text-base">
              Select Problem Clues & Signal Words
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
              Click keywords that match what the problem is asking or constraint scale.
            </p>
          </div>

          {selectedClues.length > 0 && (
            <button
              onClick={clearClues}
              className="neo-btn bg-[#FECDD3] text-black px-3 py-1.5 text-xs font-black cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} /> Clear ({selectedClues.length})
            </button>
          )}
        </div>

        {/* Chips grid */}
        <div className="flex flex-wrap gap-2 pt-1">
          {CLUE_CHIPS.map((chip) => {
            const isSelected = selectedClues.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => toggleClue(chip.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 border-2 border-black cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
                  isSelected
                    ? 'bg-[#FFDE59] text-black'
                    : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Patterns Output */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Candidate Patterns</span>
            {matchedPatterns.length > 0 && (
              <span className="neo-pill bg-[#A7F3D0] text-black text-xs py-0.5 px-2">
                {matchedPatterns.length} Identified
              </span>
            )}
          </h2>
          <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
            Ranked by signal match confidence
          </span>
        </div>

        {matchedPatterns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matchedPatterns.map((match, idx) => (
              <div
                key={match.id}
                className="p-5 rounded-3xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="neo-pill bg-[#FFDE59] text-black text-[10px] py-0.5 px-2">
                      Rank #{idx + 1}
                    </span>
                    <span className="neo-pill bg-[#A7F3D0] text-black text-[10px] py-0.5 px-2">
                      {match.score * 10}% Confidence
                    </span>
                  </div>

                  <h3 className="font-black text-black dark:text-white text-base">
                    {match.patternName}
                  </h3>

                  <p className="text-xs text-slate-800 dark:text-zinc-200 font-medium mt-2 leading-relaxed flex items-start gap-1.5">
                    <Key className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span><strong>Rationale:</strong> {match.reason}</span>
                  </p>
                </div>

                {/* Related Problems in App */}
                {match.relatedProblems?.length > 0 && (
                  <div className="pt-3 border-t-2 border-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider block text-slate-600 dark:text-zinc-400">
                      Canonical Practice Problems:
                    </span>
                    <div className="space-y-1">
                      {match.relatedProblems.map((prob) => (
                        <Link
                          key={prob.id}
                          to={`/topic/${prob.topicId}`}
                          className="flex items-center justify-between text-xs font-bold text-black dark:text-white p-2 rounded-xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black shadow-[0_2px_0_0_#18181B] active:translate-y-[1px] hover:bg-[#FFDE59] hover:text-black transition-colors"
                        >
                          <span className="truncate">#{prob.lcNumber} {prob.title}</span>
                          <ArrowRight className="w-3 h-3 shrink-0" strokeWidth={2.5} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-2">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              {selectedClues.length === 0
                ? 'Select one or more clues above (e.g. "Contiguous" + "Longest" or "K-th Largest") to view matched patterns.'
                : 'No strict rule matched this combination. Try selecting fundamental characteristics like "Contiguous", "Sorted Array", or "Dependencies".'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
