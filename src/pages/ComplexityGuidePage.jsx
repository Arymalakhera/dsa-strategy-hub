import React, { useState } from 'react';
import { CONSTRAINT_RULES } from '../data/complexityRules';
import {
  Gauge,
  Zap
} from 'lucide-react';

export const ComplexityGuidePage = () => {
  const [selectedRuleId, setSelectedRuleId] = useState('n-100000'); // default n <= 10^5

  const activeRule = CONSTRAINT_RULES.find((r) => r.id === selectedRuleId) || CONSTRAINT_RULES[4];

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#A7F3D0] text-black">
            OA & Interview Cheat Sheet
          </span>
          <span className="neo-pill bg-[#FFDE59] text-black">
            Constraint Inference
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            Constraint → Complexity Guide
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            In technical online assessments (OAs), the input size <strong>N</strong> almost always reveals the intended time complexity before you write a single line of code. Select your constraint below to see target Big-O limits and expected algorithmic patterns!
          </p>
        </div>
      </div>

      {/* Constraint Selection Pills */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div>
          <h2 className="font-black text-black dark:text-white text-base">
            Choose Constraint Scale (N)
          </h2>
          <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
            Check the "Constraints" section at the bottom of any LeetCode problem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CONSTRAINT_RULES.map((rule) => {
            const isSelected = selectedRuleId === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 border-black cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
                  isSelected
                    ? 'bg-[#FFDE59] text-black'
                    : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                }`}
              >
                {rule.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Constraint Deep Dive Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black/10 dark:border-white/10 pb-4">
          <div>
            <span className="neo-pill bg-[#A7F3D0] text-black text-xs">
              Selected Constraint: {activeRule.label}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white mt-2">
              Target Complexity: <span className="font-mono text-purple-700 dark:text-purple-400">{activeRule.targetComplexity}</span>
            </h3>
          </div>

          <div className="p-3.5 bg-[#FAF6EE] dark:bg-zinc-800 rounded-2xl border-2 border-black/80 dark:border-zinc-700 text-xs">
            <div className="text-slate-600 dark:text-zinc-400 font-bold">1-Second Operation Budget:</div>
            <div className="font-mono font-black text-black dark:text-white mt-0.5">
              {activeRule.maxOperations}
            </div>
          </div>
        </div>

        {/* Likely Patterns Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
            Expected Algorithmic Patterns:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeRule.likelyPatterns.map((pat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black/80 dark:border-zinc-700 text-xs font-bold text-black dark:text-white flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{pat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips & Gotchas */}
        <div className="p-4 rounded-2xl bg-[#FEF08A] text-black border-2 border-black flex items-start gap-3">
          <Zap className="w-5 h-5 text-black shrink-0 mt-0.5 fill-amber-500" strokeWidth={2.5} />
          <div className="text-xs space-y-1">
            <span className="font-black text-black">
              Placement Online Assessment (OA) Pro-Tip:
            </span>
            <p className="text-slate-900 font-medium leading-relaxed">
              {activeRule.tips}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Reference Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-white text-base">
          Full Constraints Reference Matrix (Universal Standards)
        </h3>
        <div className="overflow-x-auto rounded-2xl border-2 border-black">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white font-black uppercase tracking-wider border-b-2 border-black">
              <tr>
                <th className="p-3">Constraint (N)</th>
                <th className="p-3">Max Allowed Complexity</th>
                <th className="p-3">Primary Candidate Patterns</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/10 text-slate-800 dark:text-zinc-200 font-bold">
              {CONSTRAINT_RULES.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelectedRuleId(r.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedRuleId === r.id
                      ? 'bg-[#FFDE59] text-black'
                      : 'hover:bg-[#FAF6EE] dark:hover:bg-zinc-800'
                  }`}
                >
                  <td className="p-3 font-mono font-black">{r.label}</td>
                  <td className="p-3 font-mono font-black">{r.targetComplexity}</td>
                  <td className="p-3 text-xs">{r.likelyPatterns[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
