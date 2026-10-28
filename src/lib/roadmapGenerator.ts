import { Problem, UserPreferences, RoadmapItem, Difficulty } from '../types';

export interface TopicSequenceItem {
  topicOrder: number;
  name: string;
  tags: string[];
}

export const FIXED_TOPIC_SEQUENCE: TopicSequenceItem[] = [
  { topicOrder: 1, name: 'Arrays & Strings', tags: ['Array', 'String', 'Prefix Sum', 'Matrix'] },
  { topicOrder: 2, name: 'Hashing (HashMap/HashSet)', tags: ['Hash Table'] },
  { topicOrder: 3, name: 'Two Pointers', tags: ['Two Pointers'] },
  { topicOrder: 4, name: 'Sliding Window', tags: ['Sliding Window'] },
  { topicOrder: 5, name: 'Linked Lists', tags: ['Linked List'] },
  { topicOrder: 6, name: 'Stacks & Queues', tags: ['Stack', 'Monotonic Stack', 'Monotonic Queue'] },
  { topicOrder: 7, name: 'Binary Search', tags: ['Binary Search'] },
  { topicOrder: 8, name: 'Recursion & Backtracking', tags: ['Backtracking', 'Recursion'] },
  { topicOrder: 9, name: 'Binary Trees', tags: ['Tree', 'Binary Tree', 'Binary Search Tree'] },
  { topicOrder: 10, name: 'Graphs (BFS/DFS)', tags: ['Graph', 'BFS', 'DFS', 'Topological Sort'] },
  { topicOrder: 11, name: 'Heaps/Priority Queue', tags: ['Heap', 'Data Stream'] },
  { topicOrder: 12, name: 'Dynamic Programming', tags: ['Dynamic Programming', 'Memoization'] },
  { topicOrder: 13, name: 'Greedy', tags: ['Greedy'] },
  { topicOrder: 14, name: 'Trie/Union-Find/Advanced Graph', tags: ['Trie', 'Union Find', 'Dijkstra', 'Minimum Spanning Tree', 'Shortest Path', 'Bit Manipulation', 'Math', 'Geometry'] }
];

const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

/**
 * Returns the recommended starting topic order (1..14) based on user skill level.
 * Beginner -> 1 (Arrays & Strings)
 * Intermediate -> 5 (Linked Lists)
 * Advanced -> 9 (Binary Trees)
 */
export function getRecommendedStartingPhase(skillLevel: string): number {
  if (skillLevel === 'Intermediate') return 5;
  if (skillLevel === 'Advanced' || skillLevel === 'DSA Grandmaster') return 9;
  return 1;
}

export function generatePersonalizedRoadmap(
  allProblems: Problem[],
  preferences: UserPreferences
): RoadmapItem[] {
  const { skillLevel, timeline, goal, weakTopics, targetCompanies } = preferences;

  // 1. Determine Target Problem Count based on Timeline & Weekly Hours
  let targetTotalProblems = 35;
  if (timeline === '1-2 weeks') {
    targetTotalProblems = Math.min(25, Math.max(15, (preferences.weeklyHours || 5) * 2));
  } else if (timeline === '1 month') {
    targetTotalProblems = Math.min(60, Math.max(35, (preferences.weeklyHours || 7) * 5));
  } else if (timeline === '3+ months') {
    targetTotalProblems = Math.min(160, Math.max(75, (preferences.weeklyHours || 10) * 10));
  }

  const selectedProblems: Problem[] = [];
  const selectedIds = new Set<string>();

  // 2. Iterate through FIXED_TOPIC_SEQUENCE (topicOrder 1 to 14)
  for (const topicSeq of FIXED_TOPIC_SEQUENCE) {
    if (selectedProblems.length >= targetTotalProblems) break;

    // Filter problems belonging to this topicOrder
    let topicProblems = allProblems.filter((p) => {
      if (selectedIds.has(p.id)) return false;
      if (p.topicOrder) return p.topicOrder === topicSeq.topicOrder;
      return p.topics.some((t) => topicSeq.tags.includes(t));
    });

    // RULE: Within each topic, sort strictly Easy -> Medium -> Hard (never random)
    topicProblems.sort((a, b) => {
      const diffComp = DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
      if (diffComp !== 0) return diffComp;

      // Secondary score boost: Weak topics & Target Company tags
      let aScore = 0;
      let bScore = 0;

      if (weakTopics && weakTopics.length > 0) {
        if (a.topics.some((t) => weakTopics.includes(t))) aScore += 5;
        if (b.topics.some((t) => weakTopics.includes(t))) bScore += 5;
      }

      if (goal === 'Specific Company (FAANG)' && targetCompanies) {
        if (a.companyTags?.some((c) => targetCompanies.includes(c))) aScore += 5;
        if (b.companyTags?.some((c) => targetCompanies.includes(c))) bScore += 5;
      }

      return bScore - aScore;
    });

    // Quota per topic bucket (min 2, max 4 per topic to maintain coverage)
    const quotaPerTopic = Math.max(2, Math.ceil(targetTotalProblems / 14));
    const toPick = topicProblems.slice(0, quotaPerTopic);

    for (const p of toPick) {
      if (selectedProblems.length < targetTotalProblems && !selectedIds.has(p.id)) {
        selectedProblems.push(p);
        selectedIds.add(p.id);
      }
    }
  }

  // 3. Fill remaining quota if needed while maintaining Easy -> Medium -> Hard & topicOrder order
  if (selectedProblems.length < targetTotalProblems) {
    const remaining = allProblems
      .filter((p) => !selectedIds.has(p.id))
      .sort((a, b) => {
        const tDiff = (a.topicOrder || 1) - (b.topicOrder || 1);
        if (tDiff !== 0) return tDiff;
        return DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
      });

    for (const p of remaining) {
      if (selectedProblems.length >= targetTotalProblems) break;
      selectedProblems.push(p);
      selectedIds.add(p.id);
    }
  }

  // 4. Final sort across roadmap: topicOrder 1..14, then Easy -> Medium -> Hard
  selectedProblems.sort((a, b) => {
    const tDiff = (a.topicOrder || 1) - (b.topicOrder || 1);
    if (tDiff !== 0) return tDiff;
    return DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
  });

  // 5. Return mapped RoadmapItems preserving strict topicOrder and difficulty sequence
  return selectedProblems.map((problem, index) => ({
    leetcodeId: problem.id,
    status: 'unsolved',
    hintStage: 0,
    attempts: 0,
    solvedAt: null,
    lastAttemptedAt: null,
    order: index,
    topicOrder: problem.topicOrder || 1,
    problem
  }));
}
