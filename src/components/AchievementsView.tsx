'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, BrainCircuit, ShieldAlert, Award, CheckCircle2, Lock } from 'lucide-react';
import { RoadmapItem } from '../types';

interface AchievementsViewProps {
  roadmap: RoadmapItem[];
  currentStreak: number;
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

export const AchievementsView: React.FC<AchievementsViewProps> = ({ roadmap, currentStreak }) => {
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Milestones & Badges
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Your Achievements</h1>
          <p className="text-xs text-slate-300">
            Earn badges as you solve problems, maintain daily streaks, and master Socratic DSA concepts.
          </p>
        </div>

        <div className="bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800 text-center">
          <div className="text-xl font-black text-amber-400">
            {unlockedCount} / {badges.length}
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Badges Unlocked</div>
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
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${
              badge.unlocked
                ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-950/40'
                : 'bg-slate-900/40 border-slate-800/80 opacity-75'
            }`}
          >
            {badge.unlocked && (
              <div className="absolute top-3 right-3 text-emerald-400 bg-emerald-950/60 p-1 rounded-full border border-emerald-800/60">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}

            {!badge.unlocked && (
              <div className="absolute top-3 right-3 text-slate-500 bg-slate-950 p-1 rounded-full border border-slate-800">
                <Lock className="w-4 h-4" />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl border ${
                    badge.unlocked
                      ? 'bg-indigo-950/80 border-indigo-700/60 shadow-md shadow-indigo-950'
                      : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{badge.title}</h3>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Progress: {badge.currentProgress} / {badge.maxProgress}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
            </div>

            {/* Progress Bar */}
            <div className="pt-4 space-y-1">
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    badge.unlocked
                      ? 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                      : 'bg-indigo-600/50'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <div className="text-[10px] text-right font-mono text-slate-500">{badge.progress}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
