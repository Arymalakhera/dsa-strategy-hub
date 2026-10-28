import React, { useState, useEffect, useRef } from 'react';
import { PROBLEMS } from '../data/problems';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Code2 } from 'lucide-react';

export const QuickSearchModal = ({ isOpen, onClose, onSelectProblem }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Esc key and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredProblems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredProblems[selectedIndex]) {
        e.preventDefault();
        onSelectProblem(filteredProblems[selectedIndex]);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const filteredProblems = q
    ? PROBLEMS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          String(p.lcNumber).includes(q) ||
          p.pattern.toLowerCase().includes(q) ||
          p.topicId.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q)
      ).slice(0, 8)
    : PROBLEMS.slice(0, 8);

  const difficultyColors = {
    Easy: 'bg-[#A7F3D0] text-emerald-950 border-emerald-500/40',
    Medium: 'bg-[#FFDE59] text-amber-950 border-amber-500/40',
    Hard: 'bg-[#FECDD3] text-rose-950 border-rose-500/40'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF6EE] dark:bg-[#18181B] border-3 border-black dark:border-zinc-700 rounded-3xl shadow-[0_8px_0_0_#18181B] dark:shadow-[0_8px_0_0_#3F3F46] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-black dark:border-zinc-700 flex items-center gap-3 bg-white dark:bg-[#1C1D22]">
          <Search className="w-5 h-5 text-slate-500 dark:text-zinc-400 shrink-0" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={`Search ${PROBLEMS.length} curated problems by title, # number, pattern, or topic...`}
            className="flex-1 bg-transparent border-none text-sm sm:text-base font-bold text-black dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-black dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-black px-2 py-1 rounded-md bg-[#FAF6EE] dark:bg-zinc-800 border border-black/30 text-slate-700 dark:text-zinc-300">
            ESC to close
          </span>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 space-y-1.5">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((prob, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={prob.id}
                  onClick={() => {
                    onSelectProblem(prob);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#FFDE59] border-black text-black shadow-[0_2.5px_0_0_#18181B] translate-y-[-1px]'
                      : 'bg-white dark:bg-[#1C1D22] border-black/30 dark:border-zinc-700 text-slate-900 dark:text-white hover:border-black'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-black px-2 py-1 rounded-md bg-[#FAF6EE] dark:bg-zinc-800 border border-black/30 shrink-0 text-black dark:text-white">
                      #{prob.lcNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm truncate">{prob.title}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                            difficultyColors[prob.difficulty] || 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium truncate">
                        {prob.pattern} • Tier {prob.tier}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-flex text-[11px] font-bold text-slate-600 dark:text-zinc-400 items-center gap-1">
                      Hints &amp; Code <ArrowRight className="w-3 h-3" />
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-black shrink-0 hidden sm:block" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-zinc-400 font-bold text-xs space-y-1">
              <p>No problems found matching &quot;{query}&quot;.</p>
              <p className="text-[11px] font-normal text-slate-400">
                Try searching by topic (e.g. &quot;sliding window&quot;) or algorithm (e.g. &quot;binary search&quot;).
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-white dark:bg-[#1C1D22] border-t-2 border-black dark:border-zinc-700 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-black dark:text-white" />
            {PROBLEMS.length} Curated Placement Problems
          </span>
          <span className="hidden sm:inline font-mono text-[10px]">
            ↑↓ to navigate • ↵ to select
          </span>
        </div>
      </div>
    </div>
  );
};
