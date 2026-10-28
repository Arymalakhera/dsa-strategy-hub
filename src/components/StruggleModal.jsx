import React, { useState } from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

const STRUGGLE_REASONS = [
  { id: 'wrong_pattern', label: 'Wrong Pattern Choice', desc: 'Identified the wrong technique (e.g. used DP instead of Greedy)' },
  { id: 'edge_case', label: 'Edge Case Failure', desc: 'Missed empty array, 1-element, duplicates, or negative values' },
  { id: 'time_limit_exceeded', label: 'Time Limit Exceeded (TLE)', desc: 'Solution was too slow; could not optimize complexity' },
  { id: 'did_not_know_concept', label: 'Didn’t Know Concept', desc: 'Unfamiliar with the underlying algorithmic theory or data structure' },
  { id: 'silly_bug', label: 'Silly Bug / Off-By-One', desc: 'Syntax issue, incorrect indexing, or boundary comparison condition' }
];

export const StruggleModal = ({ problem, isOpen, onClose, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState('wrong_pattern');

  if (!isOpen || !problem) return null;

  const handleConfirm = () => {
    onConfirm(problem.id, selectedReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#1C1D22] rounded-3xl border-2 border-black dark:border-zinc-700 shadow-[0_6px_0_0_#18181B] dark:shadow-[0_6px_0_0_#3F3F46] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFDE59] border-2 border-black text-black rounded-xl">
              <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-black dark:text-white text-base">
                Mistake Journal Entry
              </h3>
              <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold">
                LC #{problem.lcNumber} • {problem.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-slate-100 cursor-pointer shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-800 dark:text-zinc-200 font-medium">
          Marking this problem as <strong>Struggled</strong> triggers automated spaced revision at <span className="font-black text-amber-600 dark:text-amber-400">+1 day, +7 days, and +30 days</span>. What tripped you up?
        </p>

        {/* Options */}
        <div className="space-y-2">
          {STRUGGLE_REASONS.map((r) => {
            const isSelected = selectedReason === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReason(r.id)}
                className={`w-full text-left p-3 rounded-2xl border-2 border-black transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFDE59] text-black shadow-[0_2.5px_0_0_#18181B] translate-y-[-1px]'
                    : 'bg-[#FAF6EE] dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:bg-white'
                }`}
              >
                <div className={`w-4 h-4 rounded-full mt-0.5 border-2 border-black flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-black text-white' : 'bg-white'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-black">{r.label}</div>
                  <div className="text-[11px] text-slate-700 dark:text-zinc-300 font-medium mt-0.5">{r.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-3.5 py-2 text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="neo-btn bg-[#FFDE59] text-black px-4 py-2 text-xs font-black"
          >
            Schedule Revision & Save
          </button>
        </div>
      </div>
    </div>
  );
};
