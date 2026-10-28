import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Sun,
  Moon,
  Download,
  Upload,
  RefreshCw,
  Code2,
  Search,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  Database,
  X
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { PROBLEMS } from '../data/problems';

export const Navbar = ({
  theme,
  onToggleTheme,
  streak = 0,
  dueCount = 0,
  language = 'python',
  onSelectLanguage,
  onOpenSearch
}) => {
  const { user, profile, isDemoMode, signInWithGoogle, enableDemoMode, logout, authError } = useAuth();
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const handleExport = () => {
    const jsonStr = storageService.exportUserData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa_strategy_hub_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = storageService.importUserData(content);
        if (result.success) {
          setImportStatus('Data successfully restored!');
          setTimeout(() => {
            setImportStatus(null);
            setIsBackupOpen(false);
          }, 1500);
        } else {
          setImportStatus(`Import error: ${result.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-zinc-700 bg-[#FAF6EE]/95 dark:bg-[#18181B]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* 1. Left: Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFDE59] border-2 border-black text-black flex items-center justify-center font-black transition-all group-hover:scale-105">
              <Code2 className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-tight text-[#18181B] dark:text-white block leading-tight">
                DSA Strategy Hub
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold block leading-none">
                {PROBLEMS.length}+ Curated Patterns
              </span>
            </div>
          </Link>

          {/* 2. Center: Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex-1 max-w-xs md:max-w-sm flex items-center justify-between px-3 py-1.5 rounded-xl bg-white dark:bg-[#27272A] border-2 border-black dark:border-zinc-600 text-xs font-bold text-slate-700 dark:text-zinc-200 hover:bg-[#FAF6EE] dark:hover:bg-zinc-850 hover:translate-y-[-1px] active:translate-y-[2px] transition-all cursor-pointer min-h-[38px] shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46]"
            title={`Search ${PROBLEMS.length} curated problems (Ctrl+K)`}
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400 shrink-0" />
              <span className="truncate text-slate-500 dark:text-zinc-400 font-medium text-xs">
                Search problems, patterns...
              </span>
            </div>
            <kbd className="hidden sm:inline font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-black/20 text-slate-600 dark:text-zinc-400 shrink-0">
              Ctrl+K
            </kbd>
          </button>

          {/* 3. Right: Unified Study Capsule & Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Unified Study Capsule: Streak & Review Due */}
            <div className="hidden sm:inline-flex items-center rounded-xl border-2 border-black dark:border-zinc-500 bg-white dark:bg-[#27272A] divide-x-2 divide-black dark:divide-zinc-600 text-xs font-black min-h-[38px] overflow-hidden">
              {/* Streak */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-800 dark:text-zinc-200"
                title={`Current streak: ${streak} days`}
              >
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse shrink-0" />
                <span>{streak}d</span>
              </div>

              {/* Review Due */}
              <Link
                to="/revision"
                className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
                  dueCount > 0
                    ? 'bg-[#FEF08A] dark:bg-amber-950/70 text-black dark:text-amber-200 hover:bg-[#FDE047]'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                }`}
                title={`${dueCount} problems due for review today`}
              >
                <RefreshCw className={`w-3 h-3 ${dueCount > 0 ? 'animate-spin' : ''}`} />
                <span>{dueCount} due</span>
              </Link>
            </div>

            {/* Language Selector (Duolingo Style: bottom-press) */}
            <div className="relative flex items-center px-2 py-1 rounded-xl bg-white dark:bg-[#27272A] border-2 border-black dark:border-zinc-500 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] min-h-[38px] transition-all hover:translate-y-[-1px] active:translate-y-[2px]">
              <Code2 className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300 mr-1" />
              <select
                value={language}
                onChange={(e) => onSelectLanguage && onSelectLanguage(e.target.value)}
                className="bg-transparent border-none text-xs font-black text-[#18181B] dark:text-white focus:outline-none cursor-pointer"
                title="Select preferred programming language"
              >
                <option value="python" className="bg-white dark:bg-zinc-900 text-black dark:text-white font-bold">Python</option>
                <option value="java" className="bg-white dark:bg-zinc-900 text-black dark:text-white font-bold">Java</option>
                <option value="cpp" className="bg-white dark:bg-zinc-900 text-black dark:text-white font-bold">C++</option>
                <option value="javascript" className="bg-white dark:bg-zinc-900 text-black dark:text-white font-bold">JS</option>
              </select>
            </div>

            {/* Dark / Light Toggle (Pure Icon with Duolingo bottom press) */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Night Mode'}`}
              className="flex items-center justify-center p-2 rounded-xl border-2 border-black dark:border-zinc-400 bg-[#FFDE59] dark:bg-zinc-800 text-black dark:text-amber-300 font-black text-xs shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all cursor-pointer min-h-[38px] min-w-[38px]"
              aria-label={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Night Mode'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/40" />
              ) : (
                <Moon className="w-4 h-4 text-black fill-black/20" />
              )}
            </button>

            {/* User Profile / Database Dropdown */}
            {user || isDemoMode ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2 rounded-xl border-2 border-black dark:border-zinc-400 bg-white dark:bg-zinc-800 text-black dark:text-white font-black text-xs shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all cursor-pointer min-h-[38px]"
                  title="Profile & Settings"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full border border-black/40 object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#FFDE59] text-black font-black text-xs flex items-center justify-center border border-black">
                      {(profile?.displayName || user?.displayName || 'D')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="hidden xl:inline font-bold text-xs truncate max-w-[80px]">
                    {profile?.displayName || user?.displayName || 'User'}
                  </span>
                </button>

                {/* Profile Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-500 rounded-2xl shadow-[0_6px_0_0_#18181B] dark:shadow-[0_6px_0_0_#3F3F46] p-4 space-y-3 z-50 animate-fade-in text-xs">
                    <div className="flex items-center gap-3 border-b-2 border-black/10 dark:border-white/10 pb-3">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full border-2 border-black"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#FFDE59] text-black font-black text-sm flex items-center justify-center border-2 border-black">
                          {(profile?.displayName || user?.displayName || 'D')[0].toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-black text-sm text-black dark:text-white truncate">
                          {profile?.displayName || user?.displayName || (isDemoMode ? 'Demo User' : 'Learner')}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                          {user?.email || (isDemoMode ? 'demo@dsastrategy.app' : 'Signed In')}
                        </p>
                      </div>
                    </div>

                    {/* Backup & Restore Data Link */}
                    <button
                      onClick={() => {
                        setIsBackupOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 hover:bg-[#FFDE59] dark:hover:bg-zinc-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-3.5 h-3.5" />
                        <span>Backup & Restore</span>
                      </span>
                      <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-white dark:bg-zinc-900 border border-black/20">JSON</span>
                    </button>

                    {/* Database status */}
                    <div className="p-2.5 rounded-xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black/30 dark:border-zinc-700 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-slate-600 dark:text-zinc-400 flex items-center gap-1">
                          <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Cloud Sync
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#A7F3D0] text-emerald-950 font-bold border border-black/20">
                          {isDemoMode ? 'Local Cache' : 'Active'}
                        </span>
                      </div>
                    </div>

                    {/* Sign out */}
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full neo-btn bg-[#FECDD3] text-black py-2 px-3 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-black dark:border-zinc-400 bg-white dark:bg-zinc-800 text-black dark:text-white font-black text-xs shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all cursor-pointer min-h-[38px]"
                title="Sign in with Google to sync progress"
              >
                <LogIn className="w-3.5 h-3.5 text-black dark:text-white" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* JSON Backup / Restore Modal */}
      {isBackupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border-2 border-black dark:border-zinc-700 shadow-[0_8px_0_0_#18181B] dark:shadow-[0_8px_0_0_#3F3F46] p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                📦 Data Backup & Restore
              </h3>
              <button
                onClick={() => setIsBackupOpen(false)}
                className="p-1 text-slate-600 hover:text-black dark:hover:text-white rounded-lg border-2 border-black dark:border-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Your preparation progress, custom study plan, mistake journal, and personal notes are stored locally. Export a JSON file to keep a backup or sync across laptops.
            </p>

            {importStatus && (
              <div className="p-3 bg-[#A7F3D0] border-2 border-black rounded-xl text-xs font-black text-black">
                {importStatus}
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                onClick={handleExport}
                className="w-full py-2.5 px-4 bg-[#FFDE59] text-black rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download JSON Backup
              </button>

              <label className="w-full py-2.5 px-4 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" /> Restore From JSON File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Firebase Database & Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1D22] text-black dark:text-white rounded-3xl border-3 border-black dark:border-zinc-700 shadow-[0_8px_0_0_#18181B] dark:shadow-[0_8px_0_0_#3F3F46] p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="neo-pill bg-[#A7F3D0] text-black text-[10px]">
                  Firebase Cloud Firestore
                </span>
              </div>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="p-1 text-slate-500 hover:text-black dark:hover:text-white rounded-lg border-2 border-black dark:border-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-black text-lg text-black dark:text-white">
                Account &amp; Database Login
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                Connect your account to save your problem solutions, personalized study plan, and spaced revision progress to your cloud database (<strong>chatbot-dsa-5085a</strong>).
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-100 dark:bg-rose-950/70 border-2 border-rose-500 text-rose-900 dark:text-rose-200 text-xs font-bold rounded-xl">
                {authError}
              </div>
            )}

            <div className="space-y-2.5 pt-2">
              <button
                onClick={async () => {
                  try {
                    await signInWithGoogle();
                    setIsAuthModalOpen(false);
                  } catch (e) {
                    console.error('Google Sign In Failed', e);
                  }
                }}
                className="w-full py-2.5 px-4 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* Google "G" Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                onClick={() => {
                  enableDemoMode();
                  setIsAuthModalOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-[#FFDE59] text-black rounded-xl text-xs font-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue as Guest / Demo Mode</span>
              </button>
            </div>

            <div className="pt-2 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure Firebase Auth
              </span>
              <span className="font-mono text-[10px]">Project: chatbot-dsa-5085a</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
