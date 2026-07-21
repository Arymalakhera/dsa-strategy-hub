'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LeaderboardEntry } from '../types';
import { Trophy, Medal, Flame, CheckCircle2, Shield, User as UserIcon } from 'lucide-react';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    uid: 'leader-1',
    displayName: 'Sarah Chen',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    totalPoints: 1420,
    problemsSolved: 48,
    rankTitle: 'DSA Grandmaster',
    currentStreak: 14
  },
  {
    uid: 'leader-2',
    displayName: 'Devon Vance',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    totalPoints: 980,
    problemsSolved: 35,
    rankTitle: 'Advanced',
    currentStreak: 9
  },
  {
    uid: 'leader-3',
    displayName: 'Aarav Patel',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    totalPoints: 750,
    problemsSolved: 28,
    rankTitle: 'Advanced',
    currentStreak: 6
  },
  {
    uid: 'demo-user-123',
    displayName: 'Alex Rivers (You)',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    totalPoints: 245,
    problemsSolved: 11,
    rankTitle: 'Intermediate',
    currentStreak: 4
  }
];

export const LeaderboardView: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const q = query(collection(db, 'leaderboard'), orderBy('totalPoints', 'desc'), limit(25));
        const snap = await getDocs(q);

        if (!snap.empty) {
          const list: LeaderboardEntry[] = [];
          snap.forEach((doc) => {
            list.push(doc.data() as LeaderboardEntry);
          });
          setLeaderboard(list);
        }
      } catch (err) {
        console.warn('Firestore leaderboard query failed; using mock leaderboard fallback', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xl">
            <Trophy className="w-6 h-6 animate-bounce" /> Global DSA Mentor Leaderboard
          </div>
          <p className="text-xs text-slate-400">
            Public read-only standings calculated server-side based on solved LeetCode problems & hint multipliers.
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 bg-slate-950 p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Coder</div>
          <div className="col-span-2 text-center">Rank Title</div>
          <div className="col-span-2 text-center">Solved</div>
          <div className="col-span-2 text-right pr-2">Points</div>
        </div>

        <div className="divide-y divide-slate-800/60">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            return (
              <div
                key={entry.uid}
                className={`grid grid-cols-12 p-4 items-center text-xs sm:text-sm transition-colors ${
                  rank === 1
                    ? 'bg-amber-950/20 hover:bg-amber-950/30'
                    : rank === 2
                    ? 'bg-slate-800/30 hover:bg-slate-800/50'
                    : rank === 3
                    ? 'bg-amber-900/10 hover:bg-amber-900/20'
                    : 'hover:bg-slate-800/20'
                }`}
              >
                {/* Rank number or medal */}
                <div className="col-span-1 flex justify-center font-extrabold">
                  {rank === 1 ? (
                    <Medal className="w-5 h-5 text-amber-400" />
                  ) : rank === 2 ? (
                    <Medal className="w-5 h-5 text-slate-300" />
                  ) : rank === 3 ? (
                    <Medal className="w-5 h-5 text-amber-600" />
                  ) : (
                    <span className="text-slate-500 font-mono">#{rank}</span>
                  )}
                </div>

                {/* User avatar & name */}
                <div className="col-span-5 flex items-center gap-3">
                  {entry.photoURL ? (
                    <img
                      src={entry.photoURL}
                      alt={entry.displayName}
                      className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      {entry.displayName}
                      {entry.currentStreak > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800">
                          <Flame className="w-3 h-3" /> {entry.currentStreak}d
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rank Title badge */}
                <div className="col-span-2 text-center">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      entry.rankTitle === 'DSA Grandmaster'
                        ? 'bg-purple-950/60 text-purple-400 border-purple-800'
                        : entry.rankTitle === 'Advanced'
                        ? 'bg-indigo-950/60 text-indigo-400 border-indigo-800'
                        : entry.rankTitle === 'Intermediate'
                        ? 'bg-blue-950/60 text-blue-400 border-blue-800'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {entry.rankTitle}
                  </span>
                </div>

                {/* Problems Solved */}
                <div className="col-span-2 text-center font-mono font-semibold text-slate-300">
                  {entry.problemsSolved}
                </div>

                {/* Points */}
                <div className="col-span-2 text-right font-mono font-black text-indigo-400 pr-2">
                  {entry.totalPoints} pts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
