'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, HelpCircle, CheckCircle2, ShieldCheck, Zap, Lightbulb, Code2 } from 'lucide-react';

interface AboutViewProps {
  themeMode?: 'mint' | 'glass';
}

export const AboutView: React.FC<AboutViewProps> = ({ themeMode = 'mint' }) => {
  const steps = [
    {
      stage: 'Stage 0',
      title: 'Understanding & Constraints',
      description: 'Clarify the problem description, inputs, outputs, negative numbers, empty arrays, and corner cases.',
      color: 'from-[#072A36] to-[#0B4F6C]',
      badge: 'Step 1'
    },
    {
      stage: 'Stage 1',
      title: 'Directional Nudge',
      description: 'Identify structural patterns (e.g., sorted array, cyclic dependencies, subproblem overlap) without spoiling the algorithm.',
      color: 'from-[#0B4F6C] to-[#0F6B7B]',
      badge: 'Step 2'
    },
    {
      stage: 'Stage 2',
      title: 'Brute Force Intuition',
      description: 'Formulate a baseline naive solution first, then analyze its Time and Space complexity.',
      color: 'from-[#0F6B7B] to-[#00A896]',
      badge: 'Step 3'
    },
    {
      stage: 'Stage 3',
      title: 'Optimal Strategy Hint',
      description: 'Discover the optimal data structure or technique (e.g. Two Pointers, Hash Table, Sliding Window, Monotonic Stack).',
      color: 'from-[#00A896] to-[#028090]',
      badge: 'Step 4'
    },
    {
      stage: 'Stage 4',
      title: 'Socratic Code Debugging',
      description: 'Write your code! If your logic hits an edge case failure or off-by-one bug, the AI Mentor points out the failing line.',
      color: 'from-[#028090] to-[#70D6D1]',
      badge: 'Step 5'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="oceanic-hero-gradient p-8 sm:p-10 rounded-3xl border border-[#70D6D1]/20 shadow-2xl text-center space-y-4 text-white">
        <div className="w-14 h-14 rounded-2xl bg-[#00A896]/20 text-[#70D6D1] border border-[#70D6D1]/30 flex items-center justify-center mx-auto shadow-md">
          <BrainCircuit className="w-8 h-8 animate-pulse text-[#70D6D1]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          How DSA Mentor AI Works
        </h1>
        <p className="text-sm text-[#C2E8E8] max-w-2xl mx-auto leading-relaxed">
          Unlike traditional platforms that give you instant code copy-pastes, DSA Mentor AI uses the <strong className="text-[#70D6D1]">Socratic Method</strong> to guide you step-by-step until you discover the solution yourself.
        </p>
      </div>

      {/* 5-Stage Socratic Journey */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#072A36] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00A896]" /> The 5-Stage Socratic Learning Journey
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-6 rounded-3xl mint-glass-card border border-[#0F7A8D]/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#0F7A8D]/40 transition-all shadow-md"
            >
              <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${step.color} text-white font-mono font-bold text-xs shrink-0 shadow-md`}>
                {step.stage}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-base font-bold text-[#072A36] flex items-center gap-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#3B6674] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Socratic Method Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="mint-glass-card p-6 rounded-3xl border border-[#0F7A8D]/20 space-y-2 shadow-md">
          <div className="p-2.5 w-max rounded-2xl bg-[#00A896]/15 text-[#00A896] border border-[#00A896]/30">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#072A36] text-sm">Deep Pattern Retention</h3>
          <p className="text-xs text-[#3B6674]">
            When you solve a problem with guided Socratic hints, you remember the underlying pattern for coding interviews.
          </p>
        </div>

        <div className="mint-glass-card p-6 rounded-3xl border border-[#0F7A8D]/20 space-y-2 shadow-md">
          <div className="p-2.5 w-max rounded-2xl bg-[#0B4F6C]/10 text-[#0B4F6C] border border-[#0B4F6C]/20">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#072A36] text-sm">No Direct Spoilers</h3>
          <p className="text-xs text-[#3B6674]">
            The AI Mentor is strictly forbidden from providing copy-paste solution code until you attempt the logic yourself.
          </p>
        </div>

        <div className="mint-glass-card p-6 rounded-3xl border border-[#0F7A8D]/20 space-y-2 shadow-md">
          <div className="p-2.5 w-max rounded-2xl bg-[#70D6D1]/30 text-[#074D5E] border border-[#70D6D1]/50">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#072A36] text-sm">Curated NeetCode 150</h3>
          <p className="text-xs text-[#3B6674]">
            Covers 161+ official LeetCode questions structured across all major interview topics.
          </p>
        </div>
      </div>
    </div>
  );
};

