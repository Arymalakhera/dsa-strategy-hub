'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, HelpCircle, CheckCircle2, ShieldCheck, Zap, Lightbulb, Code2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const steps = [
    {
      stage: 'Stage 0',
      title: 'Understanding & Constraints',
      description: 'Clarify the problem description, inputs, outputs, negative numbers, empty arrays, and corner cases.',
      color: 'from-blue-600 to-cyan-600',
      badge: 'Step 1'
    },
    {
      stage: 'Stage 1',
      title: 'Directional Nudge',
      description: 'Identify structural patterns (e.g., sorted array, cyclic dependencies, subproblem overlap) without spoiling the algorithm.',
      color: 'from-cyan-600 to-teal-600',
      badge: 'Step 2'
    },
    {
      stage: 'Stage 2',
      title: 'Brute Force Intuition',
      description: 'Formulate a baseline naive solution first, then analyze its Time and Space complexity.',
      color: 'from-amber-600 to-orange-600',
      badge: 'Step 3'
    },
    {
      stage: 'Stage 3',
      title: 'Optimal Strategy Hint',
      description: 'Discover the optimal data structure or technique (e.g. Two Pointers, Hash Table, Sliding Window, Monotonic Stack).',
      color: 'from-indigo-600 to-purple-600',
      badge: 'Step 4'
    },
    {
      stage: 'Stage 4',
      title: 'Socratic Code Debugging',
      description: 'Write your code! If your logic hits an edge case failure or off-by-one bug, the AI Mentor points out the failing line.',
      color: 'from-emerald-600 to-green-600',
      badge: 'Step 5'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
          <BrainCircuit className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How DSA Mentor AI Works
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Unlike traditional platforms that give you instant code copy-pastes, DSA Mentor AI uses the <strong className="text-indigo-400">Socratic Method</strong> to guide you step-by-step until you discover the solution yourself.
        </p>
      </div>

      {/* 5-Stage Socratic Journey */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" /> The 5-Stage Socratic Learning Journey
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-slate-700 transition-all shadow-md"
            >
              <div className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${step.color} text-white font-mono font-bold text-xs shrink-0 shadow-md`}>
                {step.stage}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Socratic Method Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="p-2.5 w-max rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">Deep Pattern Retention</h3>
          <p className="text-xs text-slate-400">
            When you solve a problem with guided Socratic hints, you remember the underlying pattern for coding interviews.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="p-2.5 w-max rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">No Direct Spoilers</h3>
          <p className="text-xs text-slate-400">
            The AI Mentor is strictly forbidden from providing copy-paste solution code until you attempt the logic yourself.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="p-2.5 w-max rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">Curated NeetCode 150</h3>
          <p className="text-xs text-slate-400">
            Covers 134+ official LeetCode questions structured across all major interview topics.
          </p>
        </div>
      </div>
    </div>
  );
};
