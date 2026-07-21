'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Flame, Trophy, LogOut, UserCheck, Sparkles, Home, Award, HelpCircle } from 'lucide-react';

export type NavTab = 'roadmap' | 'leaderboard' | 'achievements' | 'about';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenOnboarding: () => void;
  currentStreak?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenOnboarding, currentStreak = 0 }) => {
  const { user, profile, isDemoMode, signInWithGoogle, enableDemoMode, logout } = useAuth();

  const handleGoHome = () => {
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayStreak = currentStreak || profile?.currentStreak || 0;

  return (
    <nav className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo & Home action */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleGoHome}>
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <div className="font-black text-lg bg-gradient-to-r from-indigo-400 via-purple-300 to-white bg-clip-text text-transparent flex items-center gap-2">
              DSA Mentor AI
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">
              Socratic LeetCode Roadmap
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Home, Leaderboard, Badges, About */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={handleGoHome}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'achievements'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Badges
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'about'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> How It Works
          </button>
        </div>

        {/* User Stats & Auth Controls */}
        <div className="flex items-center gap-3">
          {profile && (
            <div className="hidden sm:flex items-center gap-2">
              {/* Streak */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-400 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{displayStreak}d Streak</span>
              </div>

              {/* Points */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-indigo-300 font-bold text-xs">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span>{profile.totalPoints} pts</span>
              </div>

              <button
                onClick={onOpenOnboarding}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Update preferences"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" /> Quiz
              </button>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-2">
                <img
                  src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-indigo-500/50 object-cover"
                />
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={enableDemoMode}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all border border-slate-700"
              >
                Demo Mode
              </button>
              <button
                onClick={signInWithGoogle}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <UserCheck className="w-4 h-4" /> Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
