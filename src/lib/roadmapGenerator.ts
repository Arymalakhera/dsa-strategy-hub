import { Problem, UserPreferences, RoadmapItem, Difficulty } from '../types';

export interface TopicCluster {
  name: string;
  tags: string[];
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: 'Arrays & Strings', tags: ['Array', 'String', 'Prefix Sum', 'Matrix'] },
  { name: 'Hashing', tags: ['Hash Table'] },
  { name: 'Two Pointers', tags: ['Two Pointers'] },
  { name: 'Sliding Window', tags: ['Sliding Window'] },
  { name: 'Stacks & Queues', tags: ['Stack', 'Monotonic Stack', 'Monotonic Queue'] },
  { name: 'Linked Lists', tags: ['Linked List'] },
  { name: 'Trees & BST', tags: ['Tree', 'Binary Tree', 'Binary Search Tree', 'Trie'] },
  { name: 'Binary Search', tags: ['Binary Search'] },
  { name: 'Graphs', tags: ['Graph', 'BFS', 'DFS', 'Topological Sort', 'Union Find'] },
  { name: 'Dynamic Programming', tags: ['Dynamic Programming', 'Memoization'] },
  { name: 'Greedy', tags: ['Greedy'] },
  { name: 'Backtracking', tags: ['Backtracking'] }
];

const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

export function generatePersonalizedRoadmap(
  allProblems: Problem[],
  preferences: UserPreferences
): RoadmapItem[] {
  const { skillLevel, timeline, goal, weakTopics, targetCompanies } = preferences;

  // 1. Determine Starting Topic Cluster Index based on Experience Level
  let startClusterIndex = 0;
  if (skillLevel === 'Intermediate') {
    startClusterIndex = 2; // Start at Two Pointers & Sliding Window
  } else if (skillLevel === 'Advanced' || skillLevel === 'DSA Grandmaster') {
    startClusterIndex = 6; // Start at Trees, Binary Search & Graphs
  }

  // Active clusters starting from user's level up to DP/Backtracking, wrapped logically
  const activeClusters = [
    ...TOPIC_CLUSTERS.slice(startClusterIndex),
    ...TOPIC_CLUSTERS.slice(0, startClusterIndex)
  ];

  // 2. Determine Target Problem Count based on Timeline & Goal
  let targetTotalProblems = 20;
  if (timeline === '1-2 weeks') {
    targetTotalProblems = Math.min(20, Math.max(15, (preferences.weeklyHours || 5) * 2));
  } else if (timeline === '1 month') {
    targetTotalProblems = Math.min(50, Math.max(35, (preferences.weeklyHours || 7) * 5));
  } else if (timeline === '3+ months') {
    targetTotalProblems = Math.min(120, Math.max(75, (preferences.weeklyHours || 10) * 10));
  }

  const selectedProblems: Problem[] = [];
  const selectedIds = new Set<string>();

  const matchesCluster = (p: Problem, cluster: TopicCluster): boolean => {
    return p.topics.some((t) => cluster.tags.includes(t));
  };

  // 3. Iterate through topic clusters in fixed logical progression order
  for (const cluster of activeClusters) {
    if (selectedProblems.length >= targetTotalProblems) break;

    // Filter problems belonging to this cluster that haven't been picked yet
    let clusterProblems = allProblems.filter(
      (p) => !selectedIds.has(p.id) && matchesCluster(p, cluster)
    );

    // Goal-based boosting & difficulty sorting
    clusterProblems.sort((a, b) => {
      let aBoost = 0;
      let bBoost = 0;

      // FAANG company tag boost
      if (goal === 'Specific Company (FAANG)') {
        if (a.companyTags && a.companyTags.length > 0) aBoost += 5;
        if (b.companyTags && b.companyTags.length > 0) bBoost += 5;

        if (targetCompanies && targetCompanies.length > 0) {
          if (a.companyTags?.some((c) => targetCompanies.includes(c))) aBoost += 10;
          if (b.companyTags?.some((c) => targetCompanies.includes(c))) bBoost += 10;
        }
      }

      // Weak topics practice boost
      if (weakTopics && weakTopics.length > 0) {
        if (a.topics.some((t) => weakTopics.includes(t))) aBoost += 4;
        if (b.topics.some((t) => weakTopics.includes(t))) bBoost += 4;
      }

      // Primary sort: Difficulty Easy -> Medium -> Hard
      const diffDiff = DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty];
      if (diffDiff !== 0) return diffDiff;

      // Secondary sort: Score boost descending
      return bBoost - aBoost;
    });

    // Select quota per cluster (2 to 5 problems per topic)
    const clusterQuota = Math.max(2, Math.ceil(targetTotalProblems / activeClusters.length));
    const toPick = clusterProblems.slice(0, clusterQuota);

    for (const p of toPick) {
      if (selectedProblems.length < targetTotalProblems && !selectedIds.has(p.id)) {
        selectedProblems.push(p);
        selectedIds.add(p.id);
      }
    }
  }

  // 4. Fill remaining slots if targetTotalProblems quota has room
  if (selectedProblems.length < targetTotalProblems) {
    const remaining = allProblems
      .filter((p) => !selectedIds.has(p.id))
      .sort((a, b) => DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty]);

    for (const p of remaining) {
      if (selectedProblems.length >= targetTotalProblems) break;
      selectedProblems.push(p);
      selectedIds.add(p.id);
    }
  }

  // 5. Map to RoadmapItem objects preserving logical cluster order
  return selectedProblems.map((problem, index) => ({
    leetcodeId: problem.id,
    status: 'unsolved',
    hintStage: 0,
    attempts: 0,
    solvedAt: null,
    lastAttemptedAt: null,
    order: index,
    problem
  }));
}
