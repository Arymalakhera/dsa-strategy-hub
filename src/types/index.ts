export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemStatus = 'unsolved' | 'attempted' | 'solved';

export type UserLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'DSA Grandmaster';

export interface Problem {
  id: string; // LeetCode problem ID (e.g. "1")
  title: string; // e.g. "Two Sum"
  slug: string; // e.g. "two-sum"
  link: string; // e.g. "https://leetcode.com/problems/two-sum/"
  difficulty: Difficulty;
  topics: string[]; // e.g. ["Array", "Hash Table"]
  topicOrder?: number; // Fixed sequence order (1..14)
  companyTags?: string[];
  descriptionSnippet?: string;
  exampleTestCase?: string;
}

export type UserGoal = 'General Interview Prep' | 'Specific Company (FAANG)' | 'Just Learning Concepts';
export type UserTimeline = '1-2 weeks' | '1 month' | '3+ months';

export interface UserPreferences {
  skillLevel: UserLevel;
  weeklyHours: number;
  goal: UserGoal;
  timeline: UserTimeline;
  weakTopics: string[];
  strongTopics: string[];
  targetCompanies?: string[];
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  currentLevel: UserLevel;
  preferences: UserPreferences;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastSolvedDate: string | null; // ISO string YYYY-MM-DD
  currentPhase?: number; // 1..14
  createdAt: string;
}

export interface RoadmapItem {
  leetcodeId: string;
  status: ProblemStatus;
  hintStage: number; // 0..4
  attempts: number;
  solvedAt: string | null;
  lastAttemptedAt: string | null;
  order: number;
  topicOrder?: number; // 1..14
  // Denormalized/joined helper properties for client rendering
  problem?: Problem;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  stage?: number;
  timestamp: string;
}

export interface ChatSession {
  problemId: string;
  currentStage: number; // 0..4
  messages: ChatMessage[];
  updatedAt: string;
}

export interface TopicStat {
  topic: string;
  solved: number;
  total: number;
  avgHintStage: number;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string;
  totalPoints: number;
  problemsSolved: number;
  rankTitle: string;
  currentStreak: number;
}

export type SocraticStage = 0 | 1 | 2 | 3 | 4;

export const STAGE_DESCRIPTIONS: Record<SocraticStage, { title: string; subtitle: string }> = {
  0: { title: 'Stage 0: Problem Understanding', subtitle: 'Clarifying constraints, edge cases & expected inputs/outputs' },
  1: { title: 'Stage 1: Directional Nudge', subtitle: 'Helping you recognize core patterns without revealing the algorithm' },
  2: { title: 'Stage 2: Brute Force Approach', subtitle: 'Analyzing naive solution & baseline time/space complexity' },
  3: { title: 'Stage 3: Optimal Strategy', subtitle: 'Guiding toward optimal data structures & algorithmic techniques' },
  4: { title: 'Stage 4: Code Debug & Review', subtitle: 'Interactive feedback on your code implementation' }
};

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 25,
  Hard: 50
};

export const HINT_MULTIPLIERS: Record<number, number> = {
  0: 1.5, // Solved without hints
  1: 1.2, // Solved with light direction
  2: 1.0, // Solved after brute force hint
  3: 0.7, // Solved with optimal technique hint
  4: 0.4  // Solved after full code review / guided explanation
};
