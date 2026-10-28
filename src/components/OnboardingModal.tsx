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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05222B]/85 backdrop-blur-md p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl rounded-[2rem] bg-[#EBF7F7] border border-[#70D6D1]/30 shadow-2xl overflow-hidden text-[#072A36] relative warm-card-glow"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#05222B] via-[#073847] to-[#0B4F6C] p-6 border-b border-[#70D6D1]/20 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00A896]/20 text-[#70D6D1] border border-[#70D6D1]/30">
              <BrainCircuit className="w-6 h-6 animate-pulse text-[#70D6D1]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">
                Personalize Your DSA Roadmap
              </h2>
              <p className="text-xs text-[#C2E8E8]">Step {step} of 4 — AI Roadmap Generator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    step >= i ? 'bg-[#70D6D1]' : 'bg-[#094154]'
                  }`}
                />
              ))}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#A2D2D2] hover:text-white hover:bg-white/10 transition-colors"
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
              <div className="flex items-center gap-2 text-[#0B4F6C] text-sm font-bold uppercase tracking-wider font-mono">
                <Target className="w-4 h-4 text-[#00A896]" /> 1. What is your current DSA experience level?
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
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      skillLevel === item.level
                        ? 'border-[#00A896] bg-[#00A896]/15 text-[#072A36] shadow-md font-bold'
                        : 'border-[#0F7A8D]/20 bg-white text-[#3B6674] hover:border-[#0F7A8D]/40'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between text-[#072A36]">
                      {item.title}
                      {skillLevel === item.level && <Check className="w-4 h-4 text-[#00A896]" />}
                    </div>
                    <div className="text-xs text-[#3B6674] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#0B4F6C] text-sm font-bold uppercase tracking-wider font-mono">
                <Compass className="w-4 h-4 text-[#00A896]" /> 2. What is your primary learning goal?
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
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      goal === item.val
                        ? 'border-[#00A896] bg-[#00A896]/15 text-[#072A36] shadow-md font-bold'
                        : 'border-[#0F7A8D]/20 bg-white text-[#3B6674] hover:border-[#0F7A8D]/40'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between text-[#072A36]">
                      {item.title}
                      {goal === item.val && <Check className="w-4 h-4 text-[#00A896]" />}
                    </div>
                    <div className="text-xs text-[#3B6674] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Time Commitment / Timeline */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#0B4F6C] text-sm font-bold uppercase tracking-wider font-mono">
                <Calendar className="w-4 h-4 text-[#00A896]" /> 3. What is your target preparation timeline?
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
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      timeline === item.val
                        ? 'border-[#00A896] bg-[#00A896]/15 text-[#072A36] shadow-md font-bold'
                        : 'border-[#0F7A8D]/20 bg-white text-[#3B6674] hover:border-[#0F7A8D]/40'
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between text-[#072A36]">
                      {item.title}
                      {timeline === item.val && <Check className="w-4 h-4 text-[#00A896]" />}
                    </div>
                    <div className="text-xs text-[#3B6674] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Hours & Weak Topics */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#0B4F6C] text-sm font-bold uppercase tracking-wider font-mono">
                  <Clock className="w-4 h-4 text-[#00A896]" /> 4. Weekly hours &amp; weak topic practice
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#0F7A8D]/20 space-y-2 text-center shadow-sm">
                  <div className="text-3xl font-black text-[#00A896]">{weeklyHours} hrs / week</div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#E0F4F4] rounded-lg appearance-none cursor-pointer accent-[#00A896]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-[#072A36]">
                  Select topics you want extra practice on (Weak topics):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {ALL_TOPICS.map((topic) => {
                    const isWeak = weakTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic, isWeak ? 'strong' : 'weak')}
                        className={`p-2.5 text-xs rounded-xl border font-semibold transition-all text-left flex items-center justify-between ${
                          isWeak
                            ? 'border-[#00A896] bg-[#00A896]/15 text-[#008080]'
                            : 'border-[#0F7A8D]/20 bg-white text-[#3B6674] hover:border-[#0F7A8D]/40'
                        }`}
                      >
                        <span>{topic}</span>
                        {isWeak && <Check className="w-3.5 h-3.5 text-[#00A896]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-[#072C37] border-t border-[#70D6D1]/20 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 text-xs font-bold text-[#A2D2D2] hover:text-white transition-colors"
              >
                Back
              </button>
            ) : onClose ? (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-[#A2D2D2] hover:text-white transition-colors"
              >
                Skip for now
              </button>
            ) : null}
          </div>

          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
            >
              Next Step <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xl shadow-[#00A896]/30 hover:scale-105"
            >
              Generate AI Roadmap <Sparkles className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
