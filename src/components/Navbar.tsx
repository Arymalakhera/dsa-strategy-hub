'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Flame, Trophy, LogOut, UserCheck, Sparkles, Home, Award, HelpCircle } from 'lucide-react';

export type NavTab = 'roadmap' | 'leaderboard' | 'achievements' | 'about';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenOnboarding: () => void;
  currentStreak?: number;
  themeMode?: 'mint' | 'glass';
  setThemeMode?: (mode: 'mint' | 'glass') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenOnboarding,
  currentStreak = 0,
  themeMode = 'mint',
  setThemeMode
}) => {
  const { user, profile, isDemoMode, signInWithGoogle, enableDemoMode, logout } = useAuth();

  const handleGoHome = () => {
    setActiveTab('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayStreak = currentStreak || profile?.currentStreak || 0;
  const totalPoints = profile?.totalPoints || 0;

  const [pointsPulse, setPointsPulse] = useState(false);
  const [streakPulse, setStreakPulse] = useState(false);

  useEffect(() => {
    if (totalPoints > 0) {
      setPointsPulse(true);
      const timer = setTimeout(() => setPointsPulse(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalPoints]);

  useEffect(() => {
    if (displayStreak > 0) {
      setStreakPulse(true);
      const timer = setTimeout(() => setStreakPulse(false), 400);
      return () => clearTimeout(timer);
    }
  }, [displayStreak]);

  return (
    <nav
      className={`${
        themeMode === 'glass'
          ? 'dribbble-glass-card bg-[#051C24]/85 text-white border-b border-[#70D6D1]/30 shadow-2xl'
          : 'bg-[#072C37]/95 backdrop-blur-xl border-b border-[#70D6D1]/20 shadow-lg shadow-[#062832]/20'
      } sticky top-0 z-40 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand logo & Home action */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleGoHome}>
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-[#00A896] to-[#70D6D1] text-[#062832] shadow-lg shadow-[#00A896]/30 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-5 h-5 text-[#062832]" />
          </div>
          <div>
            <div className="font-black text-lg text-white flex items-center gap-2 tracking-tight">
              DSA Mentor <span className="font-serif-header italic text-[#70D6D1] text-sm">AI</span>
            </div>
            <div className="text-[10px] text-[#A2D2D2] tracking-widest font-bold uppercase hidden sm:block">
              // Socratic LeetCode Mentor
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Floating Rounded-Full Container */}
        <div className="hidden md:flex items-center gap-1 bg-[#05222B]/80 p-1.5 rounded-full border border-[#70D6D1]/25 shadow-inner">
          <button
            onClick={handleGoHome}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md shadow-[#00A896]/30'
                : 'text-[#B2E4E4] hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md shadow-[#00A896]/30'
                : 'text-[#B2E4E4] hover:text-white hover:bg-white/10'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md shadow-[#00A896]/30'
                : 'text-[#B2E4E4] hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Badges
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md shadow-[#00A896]/30'
                : 'text-[#B2E4E4] hover:text-white hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> How It Works
          </button>
        </div>

        {/* Theme Mode Switcher Toggle: Mint Classic vs Blue Glassmorphism */}
        {setThemeMode && (
          <div className="flex items-center bg-[#041A23]/90 p-1 rounded-full border border-[#70D6D1]/35 shadow-inner">
            <button
              onClick={() => setThemeMode('mint')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                themeMode === 'mint'
                  ? 'bg-[#00A896] text-white shadow-md font-extrabold'
                  : 'text-[#A2D2D2] hover:text-white'
              }`}
              title="Previous Mint Classic Theme"
            >
              <span>🌊 Mint</span>
            </button>
            <button
              onClick={() => setThemeMode('glass')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                themeMode === 'glass'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                  : 'text-[#A2D2D2] hover:text-white'
              }`}
              title="Dribbble Blue Glassmorphism Theme"
            >
              <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>💎 Glass</span>
            </button>
          </div>
        )}

        {/* User Stats & Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {profile && (
            <div className="hidden lg:flex items-center gap-2">
              {/* Streak */}
              <motion.div
                animate={streakPulse ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F6C]/40 border border-[#70D6D1]/30 text-[#70D6D1] font-bold text-xs shadow-sm"
              >
                <Flame className="w-3.5 h-3.5 text-[#70D6D1] animate-pulse" />
                <span>{displayStreak}d Streak</span>
              </motion.div>

              {/* Points */}
              <motion.div
                animate={pointsPulse ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A896]/20 border border-[#00A896]/40 text-[#00C9A7] font-bold text-xs shadow-sm"
              >
                <Trophy className="w-3.5 h-3.5 text-[#00C9A7]" />
                <span>{totalPoints} pts</span>
              </motion.div>

              <button
                onClick={onOpenOnboarding}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#E0F4F4] text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Update preferences"
              >
                <Sparkles className="w-3 h-3 text-[#70D6D1]" /> Quiz
              </button>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-1">
                <img
                  src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-[#70D6D1] object-cover"
                />
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-full text-[#A2D2D2] hover:text-white hover:bg-white/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={enableDemoMode}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
              >
                Demo Mode
              </button>
              <button
                onClick={signInWithGoogle}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#00A896]/30 transition-all hover:scale-105"
              >
                <UserCheck className="w-4 h-4 text-white" /> Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
