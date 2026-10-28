/**
 * Input Size (N) to Time Complexity & Candidate Patterns Guide
 * Crucial for placement online assessments (OA) and technical interviews
 */

export const CONSTRAINT_RULES = [
  {
    id: 'n-10',
    label: 'n ≤ 10 or 11',
    value: 10,
    targetComplexity: 'O(n!) or O(n^2 * 2^n)',
    maxOperations: '~3.6 × 10^6',
    likelyPatterns: [
      'Generating all permutations (n!)',
      'Traveling Salesperson (Held-Karp Bitmask DP)',
      'Recursive backtracking with state-space exploration (N-Queens, Sudoku)'
    ],
    tips: 'Brute-force permutations or exponential search with heavy pruning will comfortably pass within 1 second.'
  },
  {
    id: 'n-20',
    label: 'n ≤ 20 to 24',
    value: 20,
    targetComplexity: 'O(2^n) or O(n * 2^n)',
    maxOperations: '~10^6 to 2 × 10^7',
    likelyPatterns: [
      'Bitmask Dynamic Programming',
      'Generating all 2^n subsets / Power Set',
      'Meet-in-the-Middle (splits 2^40 into 2 × 2^20)',
      'Inclusion-Exclusion Principle'
    ],
    tips: 'If N is around 20, think of bitmask representation where each integer 0..(1<<n)-1 represents a state.'
  },
  {
    id: 'n-500',
    label: 'n ≤ 400 to 500',
    value: 500,
    targetComplexity: 'O(n^3)',
    maxOperations: '~1.25 × 10^8 (edge of 1s in C++/Java/Python)',
    likelyPatterns: [
      'Floyd-Warshall All-Pairs Shortest Path',
      'Matrix Chain Multiplication / Interval DP',
      'Triangular nested loops (3Sum brute-force with optimization)',
      '3D Dynamic Programming'
    ],
    tips: '10^8 simple operations generally take ~0.3s to 1s. Ensure inner loops have simple arithmetic and avoid unnecessary allocations.'
  },
  {
    id: 'n-10000',
    label: 'n ≤ 10^4 (10,000)',
    value: 10000,
    targetComplexity: 'O(n^2)',
    maxOperations: '~10^8',
    likelyPatterns: [
      '2D Dynamic Programming (LCS, Edit Distance, Knapsack)',
      'Two Pointers on sorted array (3Sum outer loop + inner 2-pointer)',
      'Nested loops (comparing all pairs in an array)',
      'Expand around center (Longest Palindromic Substring)'
    ],
    tips: 'O(n^2) is the expected solution here. An O(n log n) solution is also welcome, but O(n^2) with low constant factor passes.'
  },
  {
    id: 'n-100000',
    label: 'n ≤ 10^5 (100,000)',
    value: 100000,
    targetComplexity: 'O(n log n) or O(n)',
    maxOperations: '~1.7 × 10^6 (n log n) or 10^5 (n)',
    likelyPatterns: [
      'Sorting + Two Pointers or Greedy intervals',
      'Heap / Priority Queue (Top-K, Dijkstra)',
      'Binary Search on sorted array or answer space',
      'Sliding Window & Monotonic Stack / Deque',
      'Segment Tree / Fenwick Tree (Binary Indexed Tree)'
    ],
    tips: 'This is the most common constraint in LeetCode Medium/Hard and FAANG OAs. Any O(n^2) solution will strictly hit Time Limit Exceeded (TLE).'
  },
  {
    id: 'n-1000000',
    label: 'n ≤ 10^6 (1,000,000)',
    value: 1000000,
    targetComplexity: 'O(n) or O(n log n) with very small constant',
    maxOperations: '~10^6 to 2 × 10^7',
    likelyPatterns: [
      'Single-pass linear scan with Hash Map or frequency array',
      'Prefix Sum / Difference Array',
      'Sliding Window with O(1) state transitions',
      'Sieve of Eratosthenes (O(n log log n))',
      'KMP or Z-Algorithm for string matching'
    ],
    tips: 'Avoid boxing/unboxing (e.g. use primitive int[] rather than ArrayList<Integer>) and prefer array indexing over HashMap when keys are dense.'
  },
  {
    id: 'n-1000000000',
    label: 'n ≤ 10^9 or 10^12',
    value: 1000000000,
    targetComplexity: 'O(log n) or O(√n) or O(1)',
    maxOperations: '~30 (log n) or 31,622 (√n)',
    likelyPatterns: [
      'Binary Search on Answer Space (e.g. Koko Eating Bananas)',
      'Square Root Factorization (prime testing, factors of N)',
      'Matrix Exponentiation for linear recurrences (Fibonacci in O(log n))',
      'Math / Bit Manipulation (single bit tricks, Gauss formula)'
    ],
    tips: 'You cannot even allocate an array of size 10^9 in memory. The solution must either simulate in O(1) space or use binary search / math.'
  }
];
