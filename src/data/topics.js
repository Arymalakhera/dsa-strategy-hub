export const TOPICS = [
  {
    id: 'arrays',
    name: 'Arrays',
    order: 1,
    importance: 'Tier 1',
    baseWeightDays: 3,
    shortSummary: 'Array fundamentals, in-place manipulation, prefix products, Kadane\'s algorithm, and Dutch National Flag.',
    patterns: [
      'Basic Traversal & In-Place Manipulation',
      'Kadane\'s Algorithm (Maximum Subarray)',
      'Prefix & Suffix Products without Division',
      'Matrix & 2D Array Transformations'
    ],
    icon: 'Layers'
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    order: 2,
    importance: 'Tier 1',
    baseWeightDays: 3,
    shortSummary: 'Converging pointers on sorted sequences, fast & slow runner pointers, and multi-pointer partitioning techniques.',
    patterns: [
      'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
      'Same Direction / Fast & Slow Runner (In-Place Duplicates)',
      'Three Pointers (3Sum & Sorting Triplets)',
      'Trapping Rain Water & Boundary Two Pointers'
    ],
    icon: 'ArrowDownUp'
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    order: 3,
    importance: 'Tier 1',
    baseWeightDays: 3,
    shortSummary: 'Maintain a window of elements to find optimal contiguous subarrays or substrings in linear time O(n).',
    patterns: [
      'Fixed-Size Sliding Window (max/min/sum of size k)',
      'Variable-Size Window (Longest condition e.g. at most k distinct)',
      'Variable-Size Window (Shortest/Min condition satisfying sum/chars)',
      'Window with Hash Map / Frequency Array'
    ],
    icon: 'Layers'
  },
  {
    id: 'hashing-prefix-sum',
    name: 'Hashing + Prefix Sum',
    order: 4,
    importance: 'Tier 1',
    baseWeightDays: 3,
    shortSummary: 'Use O(1) lookups and cumulative prefix calculations to answer range queries and subarray sum problems instantly.',
    patterns: [
      'Two Sum / Frequency Count Hash Table',
      'Prefix Sum Array for O(1) range queries',
      'Prefix Sum + Hash Map (Subarray sum equals k / divisible by k)',
      'Rolling Hash / Hash Set deduplication'
    ],
    icon: 'Hash'
  },
  {
    id: 'strings',
    name: 'Strings',
    order: 5,
    importance: 'Tier 1',
    baseWeightDays: 2,
    shortSummary: 'Essential character-level operations, palindrome checking, two-pointer parsing, and string transformations.',
    patterns: [
      'Two-Pointer palindrome / reversal',
      'Anagram matching & frequency counting',
      'String parsing & tokenization',
      'Longest common prefix & string compression'
    ],
    icon: 'Type'
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    order: 6,
    importance: 'Tier 1',
    baseWeightDays: 5,
    shortSummary: 'Divide and conquer search spaces in O(log n), applicable to sorted arrays, rotated arrays, and monotonic answer spaces.',
    patterns: [
      'Classic Binary Search on sorted array',
      'Lower Bound & Upper Bound / First & Last Occurrence',
      'Binary Search on Rotated Sorted Array',
      'Binary Search on Answer Space (Predicate/Feasibility function f(mid))'
    ],
    icon: 'Search'
  },
  {
    id: 'stack-queue',
    name: 'Stack + Queue',
    order: 7,
    importance: 'Tier 1',
    baseWeightDays: 4,
    shortSummary: 'LIFO and FIFO data structures, monotonic stacks for nearest smaller/greater elements, and sliding window maximums.',
    patterns: [
      'Parentheses matching & expression evaluation',
      'Monotonic Stack (Next Greater / Previous Smaller Element)',
      'Monotonic Deque (Sliding Window Maximum)',
      'Min/Max Stack design with O(1) operations'
    ],
    icon: 'SquareStack'
  },
  {
    id: 'sorting-intervals',
    name: 'Sorting + Intervals',
    order: 8,
    importance: 'Tier 2',
    baseWeightDays: 2,
    shortSummary: 'Custom comparators, interval overlaps, merging disjoint ranges, and greedy scheduling.',
    patterns: [
      'Merge Overlapping Intervals',
      'Insert Interval & Meeting Rooms',
      'Custom Comparator Sorting',
      'Interval Intersection & Non-overlapping Intervals'
    ],
    icon: 'ArrowDownUp'
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    order: 9,
    importance: 'Tier 1',
    baseWeightDays: 5,
    shortSummary: 'Pointer manipulation, fast & slow runner pointers, in-place reversal, and LRU cache implementations.',
    patterns: [
      'Fast & Slow Pointers (Floyd Cycle Detection & Middle Node)',
      'In-Place Reversal of Singly Linked List',
      'Merge two / k sorted linked lists',
      'Doubly Linked List + Hash Map (LRU Cache)'
    ],
    icon: 'Link'
  },
  {
    id: 'recursion-backtracking',
    name: 'Recursion + Backtracking',
    order: 10,
    importance: 'Tier 1',
    baseWeightDays: 6,
    shortSummary: 'Exhaustive state-space exploration, pruning branches with constraints, permutations, combinations, and grid traversals.',
    patterns: [
      'Subsets / Power Set (Include / Exclude choice)',
      'Combinations & Permutations (Handling duplicates)',
      'Backtracking with Pruning (N-Queens, Sudoku)',
      'Word Search on Matrix with visited state'
    ],
    icon: 'GitFork'
  },
  {
    id: 'trees',
    name: 'Trees',
    order: 11,
    importance: 'Tier 1',
    baseWeightDays: 10,
    shortSummary: 'Hierarchical structures, DFS (pre/in/post), BFS level order, Binary Search Trees, and Lowest Common Ancestor.',
    patterns: [
      'DFS Tree Traversals (Recursive & Iterative)',
      'BFS Level Order Traversal with Queue',
      'Binary Search Tree (BST) validation & properties',
      'Lowest Common Ancestor (LCA) & Tree Diameter'
    ],
    icon: 'GitCommit'
  },
  {
    id: 'heap',
    name: 'Heap',
    order: 12,
    importance: 'Tier 2',
    baseWeightDays: 3,
    shortSummary: 'Efficient retrieval of min/max elements, Top-K problems, two-heap median stream tracking, and k-way merging.',
    patterns: [
      'Top K Elements (Min-Heap of size k for K-th largest)',
      'Two Heaps (Median of a Running Data Stream)',
      'K-way Merge of Sorted Lists',
      'Custom PriorityQueue with comparator'
    ],
    icon: 'Boxes'
  },
  {
    id: 'greedy',
    name: 'Greedy',
    order: 13,
    importance: 'Tier 2',
    baseWeightDays: 3,
    shortSummary: 'Making locally optimal choices at each stage that lead to a globally optimal solution when the greedy-choice property holds.',
    patterns: [
      'Interval Scheduling / Activity Selection',
      'Jump Game & Gas Station greedy reachability',
      'Stock Buy & Sell variants',
      'Two Pointers with Greedy choice'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'graphs',
    name: 'Graphs',
    order: 14,
    importance: 'Tier 1',
    baseWeightDays: 10,
    shortSummary: 'Networks of vertices and edges, DFS/BFS traversals, cycle detection, topological sorting, Dijkstra, and Union-Find.',
    patterns: [
      'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
      'Cycle Detection in Directed & Undirected Graphs',
      'Topological Sort (Kahn\'s BFS In-Degree & DFS Post-Order)',
      'Disjoint Set Union (Union-Find with path compression)',
      'Shortest Path in Weighted Graph (Dijkstra\'s Algorithm)'
    ],
    icon: 'Network'
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    order: 15,
    importance: 'Tier 1',
    baseWeightDays: 15,
    shortSummary: 'Overlapping subproblems and optimal substructure. Memoization (top-down) and Tabulation (bottom-up) with space optimization.',
    patterns: [
      '1D DP (Fibonacci, Climbing Stairs, House Robber)',
      '0/1 Knapsack & Unbounded Knapsack (Coin Change)',
      'Longest Common Subsequence (LCS) & Edit Distance',
      'Longest Increasing Subsequence (LIS) & Binary Search DP',
      'Grid 2D DP (Unique Paths, Minimum Path Sum)'
    ],
    icon: 'Cpu'
  },
  {
    id: 'trie-bit-manipulation',
    name: 'Trie + Bit Manipulation',
    order: 16,
    importance: 'Tier 3',
    baseWeightDays: 2,
    shortSummary: 'Prefix tree for fast string search & autocomplete; bitwise XOR, AND, bit shifts for space-efficient constant-time tricks.',
    patterns: [
      'Trie Insert, Search, and StartsWith implementation',
      'XOR properties (Single Number, Missing Number)',
      'Bitmasking subsets & counting set bits (Brian Kernighan)',
      'Maximum XOR of two numbers in an array'
    ],
    icon: 'Binary'
  }
];

export const TOPIC_MAP = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
