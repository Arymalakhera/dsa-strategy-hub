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

interface LeaderboardViewProps {
  themeMode?: 'mint' | 'glass';
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ themeMode = 'mint' }) => {
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
      {/* Header Banner */}
      <div
        className={`${
          themeMode === 'glass'
            ? 'dribbble-glass-card bg-[#05222D]/85 text-white border border-cyan-400/30 shadow-2xl'
            : 'oceanic-hero-gradient text-white border border-[#70D6D1]/20 shadow-xl'
        } p-6 rounded-3xl flex items-center justify-between`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-xl">
            <Trophy className="w-6 h-6 animate-bounce text-amber-400" /> Global DSA Mentor Leaderboard
          </div>
          <p className="text-xs text-cyan-100/80">
            Public standings calculated server-side based on solved LeetCode problems &amp; Socratic hint multipliers.
          </p>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div
        className={`${
          themeMode === 'glass'
            ? 'dribbble-glass-card bg-[#051F2A]/90 border border-cyan-400/25 text-white shadow-2xl'
            : 'mint-glass-card border border-[#0F7A8D]/20'
        } rounded-3xl overflow-hidden shadow-2xl`}
      >
        <div className="grid grid-cols-12 bg-[#072C37] p-4 border-b border-[#70D6D1]/20 text-xs font-bold text-[#70D6D1] uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Coder</div>
          <div className="col-span-2 text-center">Rank Title</div>
          <div className="col-span-2 text-center">Solved</div>
          <div className="col-span-2 text-right pr-2">Points</div>
        </div>

        <div className="divide-y divide-[#0F7A8D]/15">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            return (
              <div
                key={entry.uid}
                className={`grid grid-cols-12 p-4 items-center text-xs sm:text-sm transition-colors ${
                  rank === 1
                    ? 'bg-[#00A896]/15 hover:bg-[#00A896]/25'
                    : rank === 2
                    ? 'bg-[#70D6D1]/10 hover:bg-[#70D6D1]/20'
                    : rank === 3
                    ? 'bg-[#0B4F6C]/10 hover:bg-[#0B4F6C]/20'
                    : 'hover:bg-white/60'
                }`}
              >
                {/* Rank number or medal */}
                <div className="col-span-1 flex justify-center font-extrabold">
                  {rank === 1 ? (
                    <Medal className="w-5 h-5 text-[#00A896]" />
                  ) : rank === 2 ? (
                    <Medal className="w-5 h-5 text-[#0F6B7B]" />
                  ) : rank === 3 ? (
                    <Medal className="w-5 h-5 text-[#0B4F6C]" />
                  ) : (
                    <span className="text-[#3B6674] font-mono">#{rank}</span>
                  )}
                </div>

                {/* User avatar & name */}
                <div className="col-span-5 flex items-center gap-3">
                  {entry.photoURL ? (
                    <img
                      src={entry.photoURL}
                      alt={entry.displayName}
                      className="w-8 h-8 rounded-full border-2 border-[#70D6D1] object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#072C37] border border-[#70D6D1]/30 flex items-center justify-center text-white">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-[#072A36] flex items-center gap-1.5">
                      {entry.displayName}
                      {entry.currentStreak > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-[#008080] font-bold bg-[#E0F4F4] px-1.5 py-0.5 rounded-full border border-[#70D6D1]/40">
                          <Flame className="w-3 h-3 text-[#00A896]" /> {entry.currentStreak}d
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
                        ? 'bg-[#072A36] text-white border-[#072A36]'
                        : entry.rankTitle === 'Advanced'
                        ? 'bg-[#00A896] text-white border-[#00A896]'
                        : entry.rankTitle === 'Intermediate'
                        ? 'bg-[#0F6B7B]/20 text-[#0F6B7B] border-[#0F6B7B]/30'
                        : 'bg-white text-[#3B6674] border-[#0F7A8D]/20'
                    }`}
                  >
                    {entry.rankTitle}
                  </span>
                </div>

                {/* Problems Solved */}
                <div className="col-span-2 text-center font-mono font-semibold text-[#072A36]">
                  {entry.problemsSolved}
                </div>

                {/* Points */}
                <div className="col-span-2 text-right font-mono font-black text-[#00A896] pr-2">
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

