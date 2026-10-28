'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Navbar, NavTab } from '../components/Navbar';
import { OnboardingModal } from '../components/OnboardingModal';
import { RoadmapView } from '../components/RoadmapView';
import { LeaderboardView } from '../components/LeaderboardView';
import { AchievementsView } from '../components/AchievementsView';
import { AboutView } from '../components/AboutView';
import { RoadmapCustomizerModal } from '../components/RoadmapCustomizerModal';
import { Footer } from '../components/Footer';
import { SocraticChatModal } from '../components/SocraticChatModal';
import { BadgeUnlockModal } from '../components/BadgeUnlockModal';
import { Badge } from '../components/AchievementsView';
import { Problem, RoadmapItem, ProblemStatus, UserPreferences, Difficulty } from '../types';
import { fetchProblemBank } from '../lib/problemBankCache';
import { generatePersonalizedRoadmap } from '../lib/roadmapGenerator';
import { calculatePoints, updateStreakStats, determineUserRank } from '../lib/scoringEngine';
import { doc, getDocs, collection, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AlertCircle, X, Award, Flame, Target, BrainCircuit, ShieldAlert, Trophy } from 'lucide-react';

function MainDashboard() {
  const { user, profile, savePreferencesAndInitializeRoadmap, isDemoMode, authError, clearAuthError } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>('roadmap');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [activeSocraticProblem, setActiveSocraticProblem] = useState<Problem | null>(null);
  const [activeHintStage, setActiveHintStage] = useState<number>(0);
  const [isSocraticOpen, setIsSocraticOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicOrder, setTopicOrder] = useState<string[]>([]);
  const [difficultyMix, setDifficultyMix] = useState<Record<Difficulty, boolean>>({
    Easy: true,
    Medium: true,
    Hard: true
  });
  const [dailyTarget, setDailyTarget] = useState<number>(2);
  const [themeMode, setThemeMode] = useState<'mint' | 'glass'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dsa_theme_mode');
        return (saved as 'mint' | 'glass') || 'mint';
      } catch (e) {
        return 'mint';
      }
    }
    return 'mint';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('dsa_theme_mode', themeMode);
      } catch (e) {
        console.warn('Failed to save themeMode preference:', e);
      }
    }
  }, [themeMode]);

  const [unlockedBadgeModal, setUnlockedBadgeModal] = useState<Badge | null>(null);
  const [seenBadgeIds, setSeenBadgeIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dsa_unlocked_badges');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Load problem bank and user's roadmap fast without blocking
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      // 1. Instant load from local cache/seed (<5ms)
      const problems = await fetchProblemBank();
      if (!isMounted) return;

      setAllProblems(problems);

      const prefs: UserPreferences = profile?.preferences || {
        skillLevel: 'Intermediate',
        weeklyHours: 7,
        goal: 'General Interview Prep',
        timeline: '1 month',
        weakTopics: ['Array', 'Dynamic Programming', 'Graph'],
        strongTopics: ['String', 'Two Pointers']
      };

      const generated = generatePersonalizedRoadmap(problems, prefs);
      setRoadmap(generated);

      // Stop full screen spinner IMMEDIATELY
      setLoading(false);

      // 2. Load saved roadmap from Firestore if authenticated
      if (user && !isDemoMode) {
        try {
          const snap = await getDocs(collection(db, 'users', user.uid, 'roadmap'));
          if (snap && !snap.empty && isMounted) {
            const statusMap = new Map<string, { status: ProblemStatus; hintStage: number; order?: number }>();
            snap.forEach((d) => {
              const data = d.data();
              statusMap.set(d.id, { status: data.status, hintStage: data.hintStage || 0, order: data.order });
            });

            setRoadmap((prev) =>
              prev.map((item) => {
                const stored = statusMap.get(item.leetcodeId);
                return stored
                  ? { ...item, status: stored.status, hintStage: stored.hintStage, order: stored.order ?? item.order }
                  : item;
              })
            );
          }
        } catch (e) {
          console.warn('Background user roadmap sync skipped or timed out:', e);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [profile?.preferences, user?.uid, isDemoMode]);

  const handleOnboardingComplete = async (prefs: UserPreferences) => {
    setIsOnboardingOpen(false);
    await savePreferencesAndInitializeRoadmap(prefs);
    if (allProblems.length > 0) {
      const updatedRoadmap = generatePersonalizedRoadmap(allProblems, prefs);
      setRoadmap(updatedRoadmap);

      // Persist generated roadmap structure per-user in Firestore
      if (user && !isDemoMode) {
        try {
          for (const item of updatedRoadmap) {
            await setDoc(
              doc(db, 'users', user.uid, 'roadmap', item.leetcodeId),
              {
                leetcodeId: item.leetcodeId,
                status: item.status,
                hintStage: item.hintStage,
                order: item.order,
                updatedAt: new Date().toISOString()
              },
              { merge: true }
            );
          }
        } catch (e) {
          console.warn('Failed to persist generated roadmap to Firestore:', e);
        }
      }
    }
  };

  const handleToggleRoadmapProblem = async (leetcodeId: string) => {
    setRoadmap((prev) => {
      const exists = prev.some((r) => r.leetcodeId === leetcodeId);
      let updated: RoadmapItem[];

      if (exists) {
        updated = prev.filter((r) => r.leetcodeId !== leetcodeId);
      } else {
        const prob = allProblems.find((p) => p.id === leetcodeId);
        if (!prob) return prev;

        const newItem: RoadmapItem = {
          leetcodeId,
          status: 'unsolved',
          hintStage: 0,
          attempts: 0,
          solvedAt: null,
          lastAttemptedAt: null,
          order: prev.length,
          problem: prob
        };
        updated = [...prev, newItem];
      }

      if (user && !isDemoMode) {
        setDoc(
          doc(db, 'userRoadmaps', user.uid),
          {
            userId: user.uid,
            roadmapIds: updated.map((r) => r.leetcodeId),
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        ).catch((e) => console.warn('Failed to sync userRoadmaps:', e));
      }

      return updated;
    });
  };

  const handleSaveCustomization = async (params: {
    selectedTopics: string[];
    topicOrder: string[];
    difficultyMix: Record<Difficulty, boolean>;
    dailyTarget: number;
    regenerateUnsolved: boolean;
  }) => {
    setSelectedTopics(params.selectedTopics);
    setTopicOrder(params.topicOrder);
    setDifficultyMix(params.difficultyMix);
    setDailyTarget(params.dailyTarget);

    if (params.regenerateUnsolved && allProblems.length > 0) {
      // Preserve already solved problems
      const solvedItems = roadmap.filter((r) => r.status === 'solved');
      const solvedIds = new Set(solvedItems.map((r) => r.leetcodeId));

      // Filter unsolved problems according to selected topics and difficulty mix
      const unsolvedProblems = allProblems.filter((p) => {
        if (solvedIds.has(p.id)) return false;
        if (!params.difficultyMix[p.difficulty]) return false;
        if (params.selectedTopics.length > 0) {
          const matchesAnyTopic = p.topics.some((t) =>
            params.selectedTopics.some((st) => t.toLowerCase().includes(st.toLowerCase()))
          );
          if (!matchesAnyTopic) return false;
        }
        return true;
      });

      // Sort unsolved problems by user's topicOrder priority
      unsolvedProblems.sort((a, b) => {
        const getClusterIndex = (prob: Problem) => {
          for (let i = 0; i < params.topicOrder.length; i++) {
            const cluster = params.topicOrder[i];
            if (prob.topics.some((t) => t.toLowerCase().includes(cluster.toLowerCase()))) return i;
          }
          return 999;
        };
        return getClusterIndex(a) - getClusterIndex(b);
      });

      const newUnsolvedItems: RoadmapItem[] = unsolvedProblems.map((p, idx) => ({
        leetcodeId: p.id,
        status: 'unsolved',
        hintStage: 0,
        attempts: 0,
        solvedAt: null,
        lastAttemptedAt: null,
        order: solvedItems.length + idx,
        problem: p
      }));

      const finalRoadmap = [...solvedItems, ...newUnsolvedItems];
      setRoadmap(finalRoadmap);

      // Persist in Firestore userRoadmaps collection
      if (user && !isDemoMode) {
        try {
          await setDoc(
            doc(db, 'userRoadmaps', user.uid),
            {
              userId: user.uid,
              selectedTopics: params.selectedTopics,
              topicOrder: params.topicOrder,
              difficultyMix: params.difficultyMix,
              dailyTarget: params.dailyTarget,
              roadmapIds: finalRoadmap.map((r) => r.leetcodeId),
              updatedAt: new Date().toISOString()
            },
            { merge: true }
          );
        } catch (e) {
          console.warn('Failed to save userRoadmaps to Firestore:', e);
        }
      }
    }
  };

  const handleStatusChange = async (leetcodeId: string, newStatus: ProblemStatus, hintStage: number = 0) => {
    setRoadmap((prev) =>
      prev.map((item) =>
        item.leetcodeId === leetcodeId ? { ...item, status: newStatus, hintStage } : item
      )
    );

    // Sync to Firestore if authenticated
    if (user && !isDemoMode) {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'roadmap', leetcodeId),
          { status: newStatus, hintStage, lastAttemptedAt: new Date().toISOString() },
          { merge: true }
        );
      } catch (e) {
        console.warn('Failed to save problem status to Firestore:', e);
      }
    }

    // If marked solved, calculate points & update streak
    if (newStatus === 'solved' && profile) {
      const problem = allProblems.find((p) => p.id === leetcodeId);
      if (problem) {
        const earned = calculatePoints(problem.difficulty, hintStage);
        const { newCurrentStreak, newLongestStreak, todayIso } = updateStreakStats(
          profile.currentStreak,
          profile.longestStreak,
          profile.lastSolvedDate
        );

        const newTotalPoints = profile.totalPoints + earned;
        const newRank = determineUserRank(newTotalPoints);

        const updatedProfile = {
          ...profile,
          totalPoints: newTotalPoints,
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastSolvedDate: todayIso,
          currentLevel: newRank
        };

        if (user && !isDemoMode) {
          try {
            await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
            // Write to public leaderboard collection
            await setDoc(
              doc(db, 'leaderboard', user.uid),
              {
                uid: user.uid,
                displayName: user.displayName || profile.displayName || 'DSA Solver',
                photoURL: user.photoURL || profile.photoURL || '',
                totalPoints: newTotalPoints,
                problemsSolved: roadmap.filter((r) => r.status === 'solved').length + 1,
                rankTitle: newRank,
                currentStreak: newCurrentStreak
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Firestore sync failed:', e);
          }
        }

        // Check for new badge unlocks
        const updatedRoadmap = roadmap.map((item) =>
          item.leetcodeId === leetcodeId ? { ...item, status: newStatus, hintStage } : item
        );
        const solvedCount = updatedRoadmap.filter((r) => r.status === 'solved').length;
        const hardSolvedCount = updatedRoadmap.filter((r) => r.status === 'solved' && r.problem?.difficulty === 'Hard').length;

        const badgeDefinitions: { id: string; badge: Badge }[] = [
          {
            id: 'first_step',
            badge: {
              id: 'first_step',
              title: 'First Step',
              description: 'Solved your very first DSA problem using Socratic guidance.',
              icon: <Award className="w-8 h-8 text-emerald-400" />,
              unlocked: true,
              progress: 100,
              maxProgress: 1,
              currentProgress: 1
            }
          },
          {
            id: 'streak_3d',
            badge: {
              id: 'streak_3d',
              title: 'Streak Master',
              description: 'Maintained an active problem-solving streak for 3 consecutive days.',
              icon: <Flame className="w-8 h-8 text-amber-400" />,
              unlocked: true,
              progress: 100,
              maxProgress: 3,
              currentProgress: 3
            }
          },
          {
            id: 'slayer_10',
            badge: {
              id: 'slayer_10',
              title: 'Problem Slayer',
              description: 'Solved 10 LeetCode problems in your active roadmap.',
              icon: <Target className="w-8 h-8 text-indigo-400" />,
              unlocked: true,
              progress: 100,
              maxProgress: 10,
              currentProgress: 10
            }
          },
          {
            id: 'hard_conqueror',
            badge: {
              id: 'hard_conqueror',
              title: 'Hard Conqueror',
              description: 'Successfully solved at least 1 Hard level LeetCode problem.',
              icon: <ShieldAlert className="w-8 h-8 text-rose-400" />,
              unlocked: true,
              progress: 100,
              maxProgress: 1,
              currentProgress: 1
            }
          }
        ];

        for (const def of badgeDefinitions) {
          let conditionMet = false;
          if (def.id === 'first_step' && solvedCount >= 1) conditionMet = true;
          if (def.id === 'streak_3d' && newCurrentStreak >= 3) conditionMet = true;
          if (def.id === 'slayer_10' && solvedCount >= 10) conditionMet = true;
          if (def.id === 'hard_conqueror' && hardSolvedCount >= 1) conditionMet = true;

          if (conditionMet && !seenBadgeIds.includes(def.id)) {
            setSeenBadgeIds((prev) => {
              const updated = [...prev, def.id];
              localStorage.setItem('dsa_unlocked_badges', JSON.stringify(updated));
              return updated;
            });
            setUnlockedBadgeModal(def.badge);
            break;
          }
        }
      }
    }
  };

  const handleOpenSocraticChat = (problem: Problem, stage: number) => {
    setActiveSocraticProblem(problem);
    setActiveHintStage(stage);
    setIsSocraticOpen(true);
  };

  const handleResyncRoadmap = async () => {
    setIsSyncing(true);
    try {
      const problems = await fetchProblemBank();
      setAllProblems(problems);

      if (profile?.preferences) {
        const refreshed = generatePersonalizedRoadmap(problems, profile.preferences);

        if (user && !isDemoMode) {
          const snap = await getDocs(collection(db, 'users', user.uid, 'roadmap'));
          if (!snap.empty) {
            const statusMap = new Map<string, { status: ProblemStatus; hintStage: number }>();
            snap.forEach((d) => {
              const data = d.data();
              statusMap.set(d.id, { status: data.status, hintStage: data.hintStage || 0 });
            });

            setRoadmap(
              refreshed.map((item) => {
                const stored = statusMap.get(item.leetcodeId);
                return stored ? { ...item, status: stored.status, hintStage: stored.hintStage } : item;
              })
            );
          } else {
            setRoadmap(refreshed);
          }
        } else {
          setRoadmap(refreshed);
        }
      }
    } catch (e) {
      console.warn('Failed to re-sync roadmap:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        themeMode === 'glass'
          ? 'glass-theme-bg'
          : 'bg-[#EBF7F7] bg-warm-radial text-[#072A36]'
      } flex flex-col font-sans transition-colors duration-500 selection:bg-[#00A896] selection:text-white`}
    >
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSocraticOpen(false);
        }}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        currentStreak={
          roadmap.filter((r) => r.status === 'solved').length > 0
            ? Math.max(profile?.currentStreak || 1, Math.min(roadmap.filter((r) => r.status === 'solved').length, 7))
            : 0
        }
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      {/* Global Connection / API Error Alert Banner */}
      {globalError && (
        <div className="bg-rose-950/90 border-b border-rose-800 px-4 py-3 text-xs text-rose-200 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
            <span>{globalError}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setGlobalError(null);
                setLoading(true);
                handleResyncRoadmap();
              }}
              className="px-3 py-1 bg-rose-900 hover:bg-rose-800 border border-rose-700 text-white rounded-lg text-xs font-bold transition-all"
            >
              Retry
            </button>
            <button onClick={() => setGlobalError(null)} className="p-1 text-rose-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Auth Alert Banner */}
      {authError && (
        <div className="bg-amber-950/80 border-b border-amber-800 px-4 py-3 text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Authentication Info:</strong> {authError}</span>
          </div>
          <button onClick={clearAuthError} className="p-1 text-amber-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="bg-slate-900/60 h-44 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
              <div className="h-6 w-1/3 bg-slate-800 rounded" />
              <div className="h-4 w-2/3 bg-slate-800/80 rounded" />
              <div className="h-10 w-48 bg-slate-800 rounded-xl" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-slate-900/40 rounded-xl border border-slate-800/60 p-4 flex items-center justify-between">
                  <div className="space-y-2 w-1/2">
                    <div className="h-4 w-40 bg-slate-800 rounded" />
                    <div className="h-3 w-64 bg-slate-800/60 rounded" />
                  </div>
                  <div className="h-8 w-24 bg-slate-800 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'roadmap' ? (
          <RoadmapView
            roadmap={roadmap}
            allProblems={allProblems}
            onStatusChange={handleStatusChange}
            onOpenSocraticChat={handleOpenSocraticChat}
            onResyncRoadmap={handleResyncRoadmap}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onToggleRoadmapProblem={handleToggleRoadmapProblem}
            isSyncing={isSyncing}
            themeMode={themeMode}
          />
        ) : activeTab === 'leaderboard' ? (
          <LeaderboardView themeMode={themeMode} />
        ) : activeTab === 'achievements' ? (
          <AchievementsView
            roadmap={roadmap}
            currentStreak={
              roadmap.filter((r) => r.status === 'solved').length > 0
                ? Math.max(profile?.currentStreak || 1, Math.min(roadmap.filter((r) => r.status === 'solved').length, 7))
                : 0
            }
            themeMode={themeMode}
          />
        ) : (
          <AboutView themeMode={themeMode} />
        )}
      </main>

      <Footer onNavClick={(tab) => setActiveTab(tab)} themeMode={themeMode} />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        onClose={() => setIsOnboardingOpen(false)}
      />

      <RoadmapCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        selectedTopics={selectedTopics}
        topicOrder={topicOrder}
        difficultyMix={difficultyMix}
        dailyTarget={dailyTarget}
        roadmap={roadmap}
        allProblems={allProblems}
        onSaveCustomization={handleSaveCustomization}
      />

      <SocraticChatModal
        problem={activeSocraticProblem}
        isOpen={isSocraticOpen}
        onClose={() => setIsSocraticOpen(false)}
        currentHintStage={activeHintStage}
        onStageChange={(id, newStage) => {
          setActiveHintStage(newStage);
          handleStatusChange(id, 'attempted', newStage);
        }}
        onMarkSolved={(id, stage) => handleStatusChange(id, 'solved', stage)}
      />

      <BadgeUnlockModal
        badge={unlockedBadgeModal}
        onClose={() => setUnlockedBadgeModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainDashboard />
    </AuthProvider>
  );
}
