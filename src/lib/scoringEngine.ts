import { Difficulty, UserLevel, DIFFICULTY_POINTS, HINT_MULTIPLIERS } from '../types';

export function calculatePoints(difficulty: Difficulty, hintStage: number): number {
  const basePoints = DIFFICULTY_POINTS[difficulty] || 10;
  const multiplier = HINT_MULTIPLIERS[hintStage] ?? 1.0;
  return Math.round(basePoints * multiplier);
}

export function determineUserRank(totalPoints: number): UserLevel {
  if (totalPoints >= 1000) return 'DSA Grandmaster';
  if (totalPoints >= 500) return 'Advanced';
  if (totalPoints >= 200) return 'Intermediate';
  return 'Beginner';
}

export function updateStreakStats(
  currentStreak: number,
  longestStreak: number,
  lastSolvedDate: string | null
): { newCurrentStreak: number; newLongestStreak: number; todayIso: string } {
  const today = new Date();
  const todayIso = today.toISOString().split('T')[0];

  if (!lastSolvedDate) {
    return {
      newCurrentStreak: 1,
      newLongestStreak: Math.max(1, longestStreak),
      todayIso
    };
  }

  const lastDate = new Date(lastSolvedDate);
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) {
    // Already solved a problem today, streak stays same
    return {
      newCurrentStreak: currentStreak,
      newLongestStreak: longestStreak,
      todayIso
    };
  } else if (diffDays === 1) {
    // Solved on consecutive day
    const updatedCurrent = currentStreak + 1;
    return {
      newCurrentStreak: updatedCurrent,
      newLongestStreak: Math.max(updatedCurrent, longestStreak),
      todayIso
    };
  } else {
    // Missed 1+ days, reset streak to 1
    return {
      newCurrentStreak: 1,
      newLongestStreak: longestStreak,
      todayIso
    };
  }
}
