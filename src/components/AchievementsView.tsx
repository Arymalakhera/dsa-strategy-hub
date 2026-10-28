'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, BrainCircuit, ShieldAlert, Award, CheckCircle2, Lock } from 'lucide-react';
import { RoadmapItem } from '../types';

interface AchievementsViewProps {
  roadmap: RoadmapItem[];
  currentStreak: number;
  themeMode?: 'mint' | 'glass';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number; // 0 to 100
  maxProgress: number;
  currentProgress: number;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ roadmap, currentStreak, themeMode = 'mint' }) => {
  const solvedItems = roadmap.filter((r) => r.status === 'solved');
  const solvedCount = solvedItems.length;

  const hardSolvedCount = solvedItems.filter((r) => r.problem?.difficulty === 'Hard').length;
  const totalAttempts = roadmap.reduce((acc, r) => acc + (r.attempts || 0), 0);

  const badges: Badge[] = [
    {
      id: 'first_step',
      title: 'First Step',
      description: 'Solve your very first DSA problem using Socratic guidance.',
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      unlocked: solvedCount >= 1,
      currentProgress: Math.min(solvedCount, 1),
      maxProgress: 1,
      progress: Math.min(100, Math.round((solvedCount / 1) * 100))
    },
    {
      id: 'streak_3d',
      title: 'Streak Master',
      description: 'Maintain an active problem-solving streak for 3 consecutive days.',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      unlocked: currentStreak >= 3,
      currentProgress: Math.min(currentStreak, 3),
      maxProgress: 3,
      progress: Math.min(100, Math.round((currentStreak / 3) * 100))
    },
    {
      id: 'slayer_10',
      title: 'Problem Slayer',
      description: 'Solve 10 LeetCode problems in your active roadmap.',
      icon: <Target className="w-6 h-6 text-indigo-400" />,
      unlocked: solvedCount >= 10,
      currentProgress: Math.min(solvedCount, 10),
      maxProgress: 10,
      progress: Math.min(100, Math.round((solvedCount / 10) * 100))
    },
    {
      id: 'socratic_thinker',
      title: 'Socratic Thinker',
      description: 'Complete 5 AI Socratic hint stages without asking for direct code copy-pastes.',
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      unlocked: totalAttempts >= 5,
      currentProgress: Math.min(totalAttempts, 5),
      maxProgress: 5,
      progress: Math.min(100, Math.round((totalAttempts / 5) * 100))
    },
    {
      id: 'hard_conqueror',
      title: 'Hard Conqueror',
      description: 'Successfully solve at least 1 Hard level LeetCode problem.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      unlocked: hardSolvedCount >= 1,
      currentProgress: Math.min(hardSolvedCount, 1),
      maxProgress: 1,
      progress: Math.min(100, Math.round((hardSolvedCount / 1) * 100))
    },
    {
      id: 'dsa_grandmaster',
      title: 'DSA Grandmaster',
      description: 'Reach 25 solved problems and master core data structures.',
      icon: <Trophy className="w-6 h-6 text-amber-300" />,
      unlocked: solvedCount >= 25,
      currentProgress: Math.min(solvedCount, 25),
      maxProgress: 25,
      progress: Math.min(100, Math.round((solvedCount / 25) * 100))
    }
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="oceanic-hero-gradient p-6 rounded-3xl border border-[#70D6D1]/20 shadow-xl flex items-center justify-between text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#70D6D1]/15 text-[#70D6D1] border border-[#70D6D1]/30 text-xs font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#70D6D1]" /> Milestones &amp; Badges
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Your Achievements</h1>
          <p className="text-xs text-[#C2E8E8]">
            Earn badges as you solve problems, maintain daily streaks, and master Socratic DSA concepts.
          </p>
        </div>

        <div className="bg-[#052630]/80 px-4 py-3 rounded-2xl border border-[#70D6D1]/30 text-center">
          <div className="text-xl font-black text-[#70D6D1]">
            {unlockedCount} / {badges.length}
          </div>
          <div className="text-[10px] text-[#A2D2D2] uppercase font-semibold">Badges Unlocked</div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
              badge.unlocked
                ? 'mint-glass-card border-[#00A896]/40 shadow-lg'
                : 'bg-white/60 border-[#0F7A8D]/15 opacity-80'
            }`}
          >
            {badge.unlocked && (
              <div className="absolute top-3 right-3 text-[#00A896] bg-[#D2F1F0] p-1 rounded-full border border-[#70D6D1]/40">
                <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
              </div>
            )}

            {!badge.unlocked && (
              <div className="absolute top-3 right-3 text-[#3B6674] bg-[#E0F4F4] p-1 rounded-full border border-[#0F7A8D]/20">
                <Lock className="w-4 h-4" />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl border ${
                    badge.unlocked
                      ? 'bg-[#00A896]/15 border-[#00A896]/30 text-[#00A896]'
                      : 'bg-white border-[#0F7A8D]/20 text-[#3B6674]'
                  }`}
                >
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#072A36]">{badge.title}</h3>
                  <div className="text-[10px] text-[#3B6674] font-mono">
                    Progress: {badge.currentProgress} / {badge.maxProgress}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#3B6674] leading-relaxed">{badge.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="pt-4 space-y-1">
              <div className="w-full h-2 bg-[#E0F4F4] rounded-full overflow-hidden border border-[#0F7A8D]/15">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    badge.unlocked
                      ? 'bg-gradient-to-r from-[#00A896] to-[#028090]'
                      : 'bg-[#0F6B7B]/30'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <div className="text-[10px] text-right font-mono text-[#3B6674]">{badge.progress}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

