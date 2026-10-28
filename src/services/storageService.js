/**
 * Storage Service Layer for DSA Strategy Hub
 * Encapsulates all persistence behind a clean API so a backend can be plugged in seamlessly.
 */

import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

function syncToCloud(collectionName, data) {
  try {
    const user = auth.currentUser;
    if (user && db) {
      setDoc(doc(db, 'users', user.uid, 'userData', collectionName), {
        data,
        updatedAt: new Date().toISOString()
      }, { merge: true }).catch((err) => {
        console.warn(`[Firestore Sync] Failed for ${collectionName}:`, err);
      });
    }
  } catch (e) {}
}

const STORAGE_KEYS = {
  PROBLEMS_PROGRESS: 'dsa_hub_problems_progress_v1',
  USER_NOTES: 'dsa_hub_user_notes_v1',
  STUDY_PLAN: 'dsa_hub_study_plan_v1',
  THEME: 'dsa_hub_theme_v1',
  STREAK_INFO: 'dsa_hub_streak_v1',
  PREFERRED_LANGUAGE: 'dsa_hub_preferred_language_v1',
  MOCK_HISTORY: 'dsa_hub_mock_history_v1'
};

// In-memory hot cache for instant database lookups without disk parsing
const memoryCache = {
  progress: null,
  notes: null,
  plan: null,
  streak: null,
  mock: null,
  language: null,
  theme: null
};

export const storageService = {
  // ----------------------------------------------------
  // Problems Progress & History
  // ----------------------------------------------------
  getAllProgress() {
    if (memoryCache.progress !== null) {
      return memoryCache.progress;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROBLEMS_PROGRESS);
      memoryCache.progress = data ? JSON.parse(data) : {};
      return memoryCache.progress;
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
      return {};
    }
  },

  getProblemProgress(problemId) {
    const all = this.getAllProgress();
    return all[problemId] || {
      status: 'not_started',
      hintsRevealed: 0,
      solvedAt: null,
      struggledAt: null,
      struggleReason: null,
      revision: {
        stage: 0,
        dueDate: null,
        history: []
      }
    };
  },

  updateProblemProgress(problemId, updates) {
    try {
      const all = this.getAllProgress();
      const current = all[problemId] || {
        status: 'not_started',
        hintsRevealed: 0,
        solvedAt: null,
        struggledAt: null,
        struggleReason: null,
        revision: {
          stage: 0,
          dueDate: null,
          history: []
        }
      };

      const updated = {
        ...current,
        ...updates
      };

      all[problemId] = updated;
      memoryCache.progress = all;
      localStorage.setItem(STORAGE_KEYS.PROBLEMS_PROGRESS, JSON.stringify(all));

      // Update streaks if problem was just marked solved or struggled
      if (updates.status === 'solved' || updates.status === 'struggled') {
        this.recordActivityToday();
      }

      syncToCloud('problemsProgress', all);
      window.dispatchEvent(new Event('dsa_progress_updated'));
      return updated;
    } catch (e) {
      console.error('Failed to save problem progress:', e);
      return null;
    }
  },

  markProblemStatus(problemId, status, reason = null) {
    const todayStr = new Date().toISOString().split('T')[0];
    const updates = {
      status,
      lastUpdatedAt: new Date().toISOString()
    };

    if (status === 'solved') {
      updates.solvedAt = todayStr;
      // If was previously in revision, keep or advance; otherwise unaffected
    } else if (status === 'struggled') {
      updates.struggledAt = todayStr;
      if (reason) updates.struggleReason = reason;

      // Schedule first revision for tomorrow (+1 day)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];

      const current = this.getProblemProgress(problemId);
      updates.revision = {
        stage: 1, // stage 1: +1 day
        dueDate: tomorrowStr,
        history: [
          ...(current.revision?.history || []),
          { date: todayStr, action: 'marked_struggled', reason: reason || 'unspecified' }
        ]
      };
    } else if (status === 'not_started') {
      updates.solvedAt = null;
      updates.struggledAt = null;
      updates.hintsRevealed = 0;
      updates.revision = { stage: 0, dueDate: null, history: [] };
    }

    return this.updateProblemProgress(problemId, updates);
  },

  setHintsRevealed(problemId, count) {
    const current = this.getProblemProgress(problemId);
    const newCount = Math.max(current.hintsRevealed || 0, count);
    return this.updateProblemProgress(problemId, { hintsRevealed: newCount });
  },

  // ----------------------------------------------------
  // Spaced Revision Logic (+1, +7, +30 days)
  // ----------------------------------------------------
  getDueRevisions() {
    const all = this.getAllProgress();
    const todayStr = new Date().toISOString().split('T')[0];
    const dueList = [];

    for (const [pId, prog] of Object.entries(all)) {
      if (prog.revision && prog.revision.dueDate && prog.revision.stage > 0 && prog.revision.stage <= 3) {
        // Due if dueDate <= todayStr
        if (prog.revision.dueDate <= todayStr) {
          dueList.push({
            problemId: pId,
            ...prog
          });
        }
      }
    }
    return dueList;
  },

  getAllRevisionQueue() {
    const all = this.getAllProgress();
    const queue = [];
    for (const [pId, prog] of Object.entries(all)) {
      if (prog.revision && prog.revision.stage > 0) {
        queue.push({
          problemId: pId,
          ...prog
        });
      }
    }
    return queue;
  },

  resolveRevision(problemId, passed) {
    const current = this.getProblemProgress(problemId);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const currentStage = current.revision?.stage || 1;
    let nextStage = currentStage;
    let nextDueDate = null;

    if (passed) {
      if (currentStage === 1) {
        // Advance to +7 days
        nextStage = 2;
        const d = new Date();
        d.setDate(d.getDate() + 7);
        nextDueDate = d.toISOString().split('T')[0];
      } else if (currentStage === 2) {
        // Advance to +30 days
        nextStage = 3;
        const d = new Date();
        d.setDate(d.getDate() + 30);
        nextDueDate = d.toISOString().split('T')[0];
      } else {
        // Mastered!
        nextStage = 4;
        nextDueDate = null;
      }
    } else {
      // Failed! Reset schedule back to +1 day
      nextStage = 1;
      const d = new Date();
      d.setDate(d.getDate() + 1);
      nextDueDate = d.toISOString().split('T')[0];
    }

    const historyEntry = {
      date: todayStr,
      action: passed ? 'passed' : 'failed',
      stageFrom: currentStage,
      stageTo: nextStage
    };

    const updates = {
      revision: {
        stage: nextStage,
        dueDate: nextDueDate,
        history: [...(current.revision?.history || []), historyEntry]
      }
    };

    if (passed && current.status === 'struggled' && nextStage >= 3) {
      updates.status = 'solved';
    }

    return this.updateProblemProgress(problemId, updates);
  },

  // ----------------------------------------------------
  // Personal Notebook (Problem -> Pattern -> Trick)
  // ----------------------------------------------------
  getAllNotes() {
    if (memoryCache.notes !== null) {
      return memoryCache.notes;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
      memoryCache.notes = data ? JSON.parse(data) : {};
      return memoryCache.notes;
    } catch (e) {
      console.error('Failed to load user notes:', e);
      return {};
    }
  },

  getProblemNote(problemId) {
    const all = this.getAllNotes();
    return all[problemId] || '';
  },

  saveProblemNote(problemId, noteText) {
    try {
      const all = this.getAllNotes();
      all[problemId] = noteText.trim();
      memoryCache.notes = all;
      localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(all));
      syncToCloud('userNotes', all);
      window.dispatchEvent(new Event('dsa_notes_updated'));
      return true;
    } catch (e) {
      console.error('Failed to save problem note:', e);
      return false;
    }
  },

  // ----------------------------------------------------
  // Study Planner Persistence
  // ----------------------------------------------------
  getStudyPlan() {
    if (memoryCache.plan !== null) {
      return memoryCache.plan;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
      memoryCache.plan = data ? JSON.parse(data) : null;
      return memoryCache.plan;
    } catch (e) {
      console.error('Failed to load study plan:', e);
      return null;
    }
  },

  saveStudyPlan(plan) {
    try {
      memoryCache.plan = plan;
      localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(plan));
      syncToCloud('studyPlan', plan);
      window.dispatchEvent(new Event('dsa_plan_updated'));
      return true;
    } catch (e) {
      console.error('Failed to save study plan:', e);
      return false;
    }
  },

  togglePlanDayCompletion(dateStr) {
    try {
      const plan = this.getStudyPlan();
      if (!plan || !plan.schedule) return null;

      let found = false;
      for (const week of plan.schedule) {
        for (const day of week.days) {
          if (day.date === dateStr) {
            day.isCompleted = !day.isCompleted;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      this.saveStudyPlan(plan);
      return plan;
    } catch (e) {
      console.error('Failed to toggle plan day:', e);
      return null;
    }
  },

  // ----------------------------------------------------
  // Streaks and Daily Activity
  // ----------------------------------------------------
  getStreakInfo() {
    if (memoryCache.streak !== null) {
      return memoryCache.streak;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK_INFO);
      const todayStr = new Date().toISOString().split('T')[0];
      const defaultStreak = {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        activeDays: []
      };

      if (!data) {
        memoryCache.streak = defaultStreak;
        return defaultStreak;
      }
      const parsed = JSON.parse(data);

      // Verify if streak is broken (lastActive was before yesterday)
      if (parsed.lastActiveDate) {
        const last = new Date(parsed.lastActiveDate);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
          parsed.currentStreak = 0;
        }
      }
      memoryCache.streak = parsed;
      return parsed;
    } catch (e) {
      return { currentStreak: 0, longestStreak: 0, lastActiveDate: null, activeDays: [] };
    }
  },

  recordActivityToday() {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const streak = this.getStreakInfo();

      if (streak.lastActiveDate === todayStr) {
        return streak; // Already recorded today
      }

      let currentStreak = streak.currentStreak;
      if (!streak.lastActiveDate) {
        currentStreak = 1;
      } else {
        const last = new Date(streak.lastActiveDate);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      }

      const activeDays = Array.from(new Set([...(streak.activeDays || []), todayStr]));
      const longestStreak = Math.max(streak.longestStreak || 0, currentStreak);

      const updated = {
        currentStreak,
        longestStreak,
        lastActiveDate: todayStr,
        activeDays
      };

      memoryCache.streak = updated;
      localStorage.setItem(STORAGE_KEYS.STREAK_INFO, JSON.stringify(updated));
      syncToCloud('streakInfo', updated);
      window.dispatchEvent(new Event('dsa_streak_updated'));
      return updated;
    } catch (e) {
      console.error('Failed to update streak:', e);
      return null;
    }
  },

  // ----------------------------------------------------
  // Statistics & Mistake Journal
  // ----------------------------------------------------
  getMistakeStats() {
    const all = this.getAllProgress();
    const counts = {
      wrong_pattern: 0,
      edge_case: 0,
      time_limit_exceeded: 0,
      did_not_know_concept: 0,
      silly_bug: 0,
      unspecified: 0
    };

    for (const prog of Object.values(all)) {
      if (prog.status === 'struggled' && prog.struggleReason) {
        counts[prog.struggleReason] = (counts[prog.struggleReason] || 0) + 1;
      }
    }
    return counts;
  },

  getWeeklyStats() {
    const all = this.getAllProgress();
    const now = new Date();
    // Get start of this week (Monday)
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    let solvedThisWeek = 0;
    for (const prog of Object.values(all)) {
      if (prog.solvedAt) {
        const solvedDate = new Date(prog.solvedAt);
        if (solvedDate >= monday) {
          solvedThisWeek++;
        }
      }
    }
    return {
      solvedThisWeek,
      weeklyGoal: 10 // default 10 problems per week
    };
  },

  // ----------------------------------------------------
  // JSON Export & Import
  // ----------------------------------------------------
  exportUserData() {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      problemsProgress: this.getAllProgress(),
      userNotes: this.getAllNotes(),
      studyPlan: this.getStudyPlan(),
      streakInfo: this.getStreakInfo(),
      mockHistory: this.getMockHistory()
    };
    return JSON.stringify(data, null, 2);
  },

  importUserData(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.problemsProgress) {
        localStorage.setItem(STORAGE_KEYS.PROBLEMS_PROGRESS, JSON.stringify(parsed.problemsProgress));
      }
      if (parsed.userNotes) {
        localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(parsed.userNotes));
      }
      if (parsed.studyPlan) {
        localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(parsed.studyPlan));
      }
      if (parsed.streakInfo) {
        localStorage.setItem(STORAGE_KEYS.STREAK_INFO, JSON.stringify(parsed.streakInfo));
      }
      if (parsed.mockHistory) {
        localStorage.setItem(STORAGE_KEYS.MOCK_HISTORY, JSON.stringify(parsed.mockHistory));
      }

      // Invalidate memory hot caches on import
      memoryCache.progress = null;
      memoryCache.notes = null;
      memoryCache.plan = null;
      memoryCache.streak = null;
      memoryCache.mock = null;
      memoryCache.language = null;
      memoryCache.theme = null;

      window.dispatchEvent(new Event('dsa_progress_updated'));
      window.dispatchEvent(new Event('dsa_notes_updated'));
      window.dispatchEvent(new Event('dsa_plan_updated'));
      window.dispatchEvent(new Event('dsa_streak_updated'));
      window.dispatchEvent(new Event('dsa_mock_updated'));
      return { success: true };
    } catch (e) {
      console.error('Import failed:', e);
      return { success: false, error: e.message };
    }
  },

  // ----------------------------------------------------
  // Theme (Dark / Light)
  // ----------------------------------------------------
  getTheme() {
    if (memoryCache.theme !== null) {
      return memoryCache.theme;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      memoryCache.theme = saved || 'light';
      return memoryCache.theme;
    } catch (e) {
      return 'light';
    }
  },

  setTheme(theme) {
    try {
      memoryCache.theme = theme;
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new Event('dsa_theme_updated'));
    } catch (e) {
      console.error('Failed to save theme:', e);
    }
  },

  // ----------------------------------------------------
  // Preferred Programming Language (Python, Java, C++, JavaScript)
  // ----------------------------------------------------
  getPreferredLanguage() {
    if (memoryCache.language !== null) {
      return memoryCache.language;
    }
    try {
      const lang = localStorage.getItem(STORAGE_KEYS.PREFERRED_LANGUAGE) || 'python';
      memoryCache.language = lang;
      return lang;
    } catch (e) {
      return 'python';
    }
  },

  setPreferredLanguage(lang) {
    try {
      const normalized = lang.toLowerCase();
      memoryCache.language = normalized;
      localStorage.setItem(STORAGE_KEYS.PREFERRED_LANGUAGE, normalized);
      window.dispatchEvent(new Event('dsa_language_updated'));
    } catch (e) {
      console.error('Failed to save preferred language:', e);
    }
  },

  // ----------------------------------------------------
  // Mock OA Assessments History
  // ----------------------------------------------------
  getMockHistory() {
    if (memoryCache.mock !== null) {
      return memoryCache.mock;
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOCK_HISTORY);
      memoryCache.mock = data ? JSON.parse(data) : [];
      return memoryCache.mock;
    } catch (e) {
      return [];
    }
  },

  saveMockAssessment(assessment) {
    try {
      const history = this.getMockHistory();
      const updated = [assessment, ...history].slice(0, 50);
      memoryCache.mock = updated;
      localStorage.setItem(STORAGE_KEYS.MOCK_HISTORY, JSON.stringify(updated));
      syncToCloud('mockHistory', updated);
      window.dispatchEvent(new Event('dsa_mock_updated'));
      return updated;
    } catch (e) {
      console.error('Failed to save mock assessment:', e);
      return [];
    }
  }
};
