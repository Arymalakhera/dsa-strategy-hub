import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserLevel, UserPreferences, UserGoal, UserTimeline } from '../types';
import { Check, Sparkles, Clock, Target, ArrowRight, BrainCircuit, X, Compass, Calendar } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (preferences: UserPreferences) => void;
  onClose?: () => void;
}

const ALL_TOPICS = [
  'Array',
  'String',
  'Hash Table',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Tree',
  'Graph',
  'Dynamic Programming',
  'Greedy'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [skillLevel, setSkillLevel] = useState<UserLevel>('Beginner');
  const [goal, setGoal] = useState<UserGoal>('General Interview Prep');
  const [timeline, setTimeline] = useState<UserTimeline>('1 month');
  const [weeklyHours, setWeeklyHours] = useState<number>(7);
  const [weakTopics, setWeakTopics] = useState<string[]>(['Dynamic Programming', 'Graph']);
  const [strongTopics, setStrongTopics] = useState<string[]>(['Array', 'String']);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleTopic = (topic: string, type: 'weak' | 'strong') => {
    if (type === 'weak') {
      setWeakTopics((prev) =>
        prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
      );
      setStrongTopics((prev) => prev.filter((t) => t !== topic));
    } else {
      setStrongTopics((prev) =>
        prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
      );
      setWeakTopics((prev) => prev.filter((t) => t !== topic));
    }
  };

  const handleSubmit = () => {
    onComplete({
      skillLevel,
      goal,
      timeline,
      weeklyHours,
      weakTopics,
      strongTopics
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100 relative"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <BrainCircuit className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Personalize Your DSA Roadmap
              </h2>
              <p className="text-xs text-slate-400">Step {step} of 4 — AI Roadmap Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-5 rounded-full transition-colors ${
                    step >= i ? 'bg-indigo-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Back to Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Body content per step */}
        <div className="p-6 space-y-6">
          {/* STEP 1: Experience Level */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                <Target className="w-4 h-4" /> 1. What is your current DSA experience level?
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    level: 'Beginner' as UserLevel,
                    title: 'Beginner (Building Foundations)',
                    desc: 'Starting from scratch. Focus on Arrays, Strings & Hashing first.'
                  },
                  {
                    level: 'Intermediate' as UserLevel,
                    title: 'Intermediate (Problem Solver)',
                    desc: 'Solved 30+ problems. Ready for Two Pointers, Stacks, Trees & Search.'
                  },
                  {
                    level: 'Advanced' as UserLevel,
                    title: 'Advanced (Interview Ready)',
                    desc: 'Solved 100+ problems. Jump straight into Graphs, DP & Hard problems.'
                  }
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setSkillLevel(item.level)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      skillLevel === item.level
                        ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg shadow-indigo-950/50'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      {item.title}
                      {skillLevel === item.level && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                <Compass className="w-4 h-4" /> 2. What is your primary learning goal?
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    val: 'General Interview Prep' as UserGoal,
                    title: 'General Interview Prep',
                    desc: 'Comprehensive coverage of NeetCode 150 & Blind 75 core patterns.'
                  },
                  {
                    val: 'Specific Company (FAANG)' as UserGoal,
                    title: 'Specific Company (FAANG / Big Tech)',
                    desc: 'Prioritize top tagged questions asked by Meta, Amazon, Google & Apple.'
                  },
                  {
                    val: 'Just Learning Concepts' as UserGoal,
                    title: 'Just Learning Concepts & Fundamentals',
                    desc: 'Conceptual progression at a comfortable pace without pressure.'
                  }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setGoal(item.val)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      goal === item.val
                        ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg shadow-indigo-950/50'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      {item.title}
                      {goal === item.val && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Time Commitment / Timeline */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                <Calendar className="w-4 h-4" /> 3. What is your target preparation timeline?
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    val: '1-2 weeks' as UserTimeline,
                    title: '1-2 Weeks (Sprint / Last Minute)',
                    desc: 'High-density focus on 15-20 essential high-yield interview problems.'
                  },
                  {
                    val: '1 month' as UserTimeline,
                    title: '1 Month (Recommended Pace)',
                    desc: 'Balanced 40-50 problems covering core data structures and algorithms.'
                  },
                  {
                    val: '3+ months' as UserTimeline,
                    title: '3+ Months (Complete Mastery)',
                    desc: 'Deep 80-120+ problem roadmap from Easy to Hard for total confidence.'
                  }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setTimeline(item.val)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      timeline === item.val
                        ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg shadow-indigo-950/50'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      {item.title}
                      {timeline === item.val && <Check className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Hours & Weak Topics */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
                  <Clock className="w-4 h-4" /> 4. Weekly hours & weak topic practice
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-center">
                  <div className="text-2xl font-extrabold text-indigo-400">{weeklyHours} hrs / week</div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">
                  Select topics you want extra practice on (Weak topics):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ALL_TOPICS.map((topic) => {
                    const isWeak = weakTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic, isWeak ? 'strong' : 'weak')}
                        className={`p-2 text-xs rounded-lg border font-medium transition-all text-left flex items-center justify-between ${
                          isWeak
                            ? 'border-amber-500/60 bg-amber-950/30 text-amber-300'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{topic}</span>
                        {isWeak && <Check className="w-3 h-3 text-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : onClose ? (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Skip for now
              </button>
            ) : null}
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xl shadow-indigo-500/30"
            >
              Generate AI Roadmap <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
