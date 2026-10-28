/**
 * Clue Chips and Rule-Based Pattern Matcher
 */

export const CLUE_CHIPS = [
  { id: 'sorted_array', label: 'Sorted Array' },
  { id: 'contiguous', label: 'Contiguous Subarray / Substring' },
  { id: 'longest', label: 'Longest' },
  { id: 'shortest', label: 'Shortest / Minimum' },
  { id: 'count_subarrays', label: 'Count of Subarrays with Condition' },
  { id: 'kth_element', label: 'K-th Largest / Smallest' },
  { id: 'combinations_permutations', label: 'All Combinations / Permutations' },
  { id: 'shortest_path', label: 'Shortest Path / Min Moves' },
  { id: 'connected_components', label: 'Connected Components / Islands' },
  { id: 'dependencies_ordering', label: 'Dependencies / Task Ordering' },
  { id: 'overlapping_intervals', label: 'Overlapping Intervals' },
  { id: 'parentheses_matching', label: 'Parentheses / Nested Matching' },
  { id: 'min_max_search_space', label: 'Minimize the Maximum / Search Space' },
  { id: 'optimal_substructure', label: 'Optimal Substructure / Max Profit' }
];

export const PATTERN_RULES = [
  {
    id: 'sliding-window-rule',
    patternName: 'Sliding Window',
    topicId: 'sliding-window',
    sampleProblemIds: ['3', '209', '424', '76'],
    condition: (clues) =>
      clues.includes('contiguous') &&
      (clues.includes('longest') || clues.includes('shortest') || clues.includes('count_subarrays')),
    score: 10,
    reason: 'When looking for longest or shortest contiguous subarrays/substrings, an expanding and shrinking window computes the optimal solution in O(n).'
  },
  {
    id: 'binary-search-answer-rule',
    patternName: 'Binary Search on Answer Space',
    topicId: 'binary-search',
    sampleProblemIds: ['875', '1011', '410'],
    condition: (clues) =>
      clues.includes('min_max_search_space') ||
      (clues.includes('shortest') && clues.includes('optimal_substructure') && !clues.includes('contiguous')),
    score: 10,
    reason: '"Minimize the maximum" or "allocate resources in minimum days" with a bounded answer range indicates a monotonic feasibility function solved by Binary Search.'
  },
  {
    id: 'heap-topk-rule',
    patternName: 'Heap / Priority Queue (Top-K)',
    topicId: 'heap',
    sampleProblemIds: ['215', '295', '23', '347'],
    condition: (clues) => clues.includes('kth_element'),
    score: 10,
    reason: 'Finding the K-th largest or smallest element dynamically without full sorting is the signature use case for a Min/Max-Heap.'
  },
  {
    id: 'prefix-sum-hash-rule',
    patternName: 'Prefix Sum + Hash Map',
    topicId: 'hashing-prefix-sum',
    sampleProblemIds: ['560', '1', '128'],
    condition: (clues) =>
      clues.includes('count_subarrays') ||
      (clues.includes('contiguous') && clues.includes('count_subarrays')),
    score: 9,
    reason: 'Counting subarrays that equal sum K (especially with negative numbers where sliding window breaks) requires prefix sum counts in a Hash Map.'
  },
  {
    id: 'two-pointers-rule',
    patternName: 'Two Pointers (Inward or Forward)',
    topicId: 'strings',
    sampleProblemIds: ['125', '151', '11'],
    condition: (clues) =>
      clues.includes('sorted_array') &&
      !clues.includes('min_max_search_space') &&
      !clues.includes('contiguous'),
    score: 8,
    reason: 'Searching for pairs, triplets, or symmetrical elements in a sorted array is solved with two converging pointers in O(n).'
  },
  {
    id: 'topological-sort-rule',
    patternName: 'Topological Sort (Kahn\'s BFS / DFS)',
    topicId: 'graphs',
    sampleProblemIds: ['207'],
    condition: (clues) => clues.includes('dependencies_ordering'),
    score: 10,
    reason: 'Task ordering with prerequisite dependencies or cycle detection in directed workflows points directly to Topological Sort.'
  },
  {
    id: 'bfs-shortest-path-rule',
    patternName: 'Breadth-First Search (BFS)',
    topicId: 'graphs',
    sampleProblemIds: ['200', '102'],
    condition: (clues) => clues.includes('shortest_path'),
    score: 9,
    reason: 'Finding the shortest path or minimum transformations in an unweighted graph or grid is the primary guarantee of level-by-level BFS.'
  },
  {
    id: 'connected-components-rule',
    patternName: 'Connected Components (DFS / Union-Find)',
    topicId: 'graphs',
    sampleProblemIds: ['200', '133'],
    condition: (clues) => clues.includes('connected_components'),
    score: 9,
    reason: 'Counting distinct islands, provinces, or grouping connected clusters is resolved using DFS flood-fill or Disjoint Set Union.'
  },
  {
    id: 'interval-scheduling-rule',
    patternName: 'Sorting + Interval Overlap',
    topicId: 'sorting-intervals',
    sampleProblemIds: ['56', '57', '435'],
    condition: (clues) => clues.includes('overlapping_intervals'),
    score: 10,
    reason: 'Problems with start/end time ranges, meeting rooms, or merge collisions require sorting by coordinate and greedy sweep.'
  },
  {
    id: 'monotonic-stack-rule',
    patternName: 'Stack (Parentheses / Monotonic)',
    topicId: 'stack-queue',
    sampleProblemIds: ['20', '155', '739', '84'],
    condition: (clues) =>
      clues.includes('parentheses_matching') ||
      (clues.includes('shortest') && clues.includes('contiguous') && clues.includes('sorted_array')),
    score: 9,
    reason: 'Nested delimiters, parentheses validity, or finding the next greater/smaller element in O(n) requires a Monotonic Stack.'
  },
  {
    id: 'backtracking-rule',
    patternName: 'Recursion + Backtracking',
    topicId: 'recursion-backtracking',
    sampleProblemIds: ['78', '46', '39', '51', '79'],
    condition: (clues) => clues.includes('combinations_permutations'),
    score: 10,
    reason: 'Exhaustively building all possible configurations, combinations, subsets, or satisfying board puzzles requires Backtracking.'
  },
  {
    id: 'dp-rule',
    patternName: 'Dynamic Programming (Memoization / Tabulation)',
    topicId: 'dynamic-programming',
    sampleProblemIds: ['70', '198', '322', '300'],
    condition: (clues) =>
      clues.includes('optimal_substructure') ||
      (clues.includes('longest') && !clues.includes('contiguous')),
    score: 8,
    reason: 'Problems asking for maximum profit, minimum cost, or count of ways with overlapping subproblems rely on Dynamic Programming.'
  }
];
