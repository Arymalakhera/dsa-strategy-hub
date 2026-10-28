/**
 * Supplemental Problem Definitions to reach exactly 320 problems
 * Balance: Easy, Medium, Hard and Must, Good, Bonus
 */

export const SUPPLEMENTAL_PROBLEMS = [
  // Arrays
  {
    id: '219',
    lcNumber: 219,
    title: 'Contains Duplicate II',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/contains-duplicate-ii/'
  },
  {
    id: '414',
    lcNumber: 414,
    title: 'Third Maximum Number',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/third-maximum-number/'
  },

  // Two Pointers
  {
    id: '925',
    lcNumber: 925,
    title: 'Long Pressed Name',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Same Direction / Fast & Slow Runner (In-Place Duplicates)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/long-pressed-name/'
  },

  // Strings
  {
    id: '1071',
    lcNumber: 1071,
    title: 'Greatest Common Divisor of Strings',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'String parsing & tokenization',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/greatest-common-divisor-of-strings/'
  },

  // Binary Search
  {
    id: '374',
    lcNumber: 374,
    title: 'Guess Number Higher or Lower',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Classic Binary Search on sorted array',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/guess-number-higher-or-lower/'
  },
  {
    id: '852',
    lcNumber: 852,
    title: 'Peak Index in a Mountain Array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Rotated Sorted Array',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/'
  },

  // Stack + Queue
  {
    id: '682',
    lcNumber: 682,
    title: 'Baseball Game',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/baseball-game/'
  },
  {
    id: '735',
    lcNumber: 735,
    title: 'Asteroid Collision',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack (Next Greater / Previous Smaller Element)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/asteroid-collision/'
  },

  // Sorting + Intervals
  {
    id: '1051',
    lcNumber: 1051,
    title: 'Height Checker',
    topicId: 'sorting-intervals',
    difficulty: 'Easy',
    pattern: 'Custom Comparator Sorting',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/height-checker/'
  },
  {
    id: '581',
    lcNumber: 581,
    title: 'Shortest Unsorted Continuous Subarray',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparator Sorting',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/'
  },

  // Linked List
  {
    id: '1290',
    lcNumber: 1290,
    title: 'Convert Binary Number in a Linked List to Integer',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/'
  },
  {
    id: '147',
    lcNumber: 147,
    title: 'Insertion Sort List',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/insertion-sort-list/'
  },

  // Recursion + Backtracking
  {
    id: '1863',
    lcNumber: 1863,
    title: 'Sum of All Subset XOR Totals',
    topicId: 'recursion-backtracking',
    difficulty: 'Easy',
    pattern: 'Subsets / Power Set (Include / Exclude choice)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/sum-of-all-subset-xor-totals/'
  },
  {
    id: '473',
    lcNumber: 473,
    title: 'Matchsticks to Square',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinations & Permutations (Handling duplicates)',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/matchsticks-to-square/'
  },

  // Trees
  {
    id: '965',
    lcNumber: 965,
    title: 'Univalued Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/univalued-binary-tree/'
  },
  {
    id: '404',
    lcNumber: 404,
    title: 'Sum of Left Leaves',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/sum-of-left-leaves/'
  },
  {
    id: '987',
    lcNumber: 987,
    title: 'Vertical Order Traversal of a Binary Tree',
    topicId: 'trees',
    difficulty: 'Hard',
    pattern: 'BFS Level Order Traversal with Queue',
    level: 'Advanced',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/'
  },

  // Heap
  {
    id: '506',
    lcNumber: 506,
    title: 'Relative Ranks',
    topicId: 'heap',
    difficulty: 'Easy',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/relative-ranks/'
  },
  {
    id: '778',
    lcNumber: 778,
    title: 'Swim in Rising Water',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'Custom PriorityQueue with comparator',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/swim-in-rising-water/'
  },

  // Greedy
  {
    id: '942',
    lcNumber: 942,
    title: 'DI String Match',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'Two Pointers with Greedy choice',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/di-string-match/'
  },
  {
    id: '630',
    lcNumber: 630,
    title: 'Course Schedule III',
    topicId: 'greedy',
    difficulty: 'Hard',
    pattern: 'Interval Scheduling / Activity Selection',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/course-schedule-iii/'
  },

  // Graphs
  {
    id: '1971',
    lcNumber: 1971,
    title: 'Find if Path Exists in Graph',
    topicId: 'graphs',
    difficulty: 'Easy',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/find-if-path-exists-in-graph/'
  },
  {
    id: '1192',
    lcNumber: 1192,
    title: 'Critical Connections in a Network',
    topicId: 'graphs',
    difficulty: 'Hard',
    pattern: 'Cycle Detection in Directed & Undirected Graphs',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/critical-connections-in-a-network/'
  },

  // Dynamic Programming
  {
    id: '1137',
    lcNumber: 1137,
    title: 'N-th Tribonacci Number',
    topicId: 'dynamic-programming',
    difficulty: 'Easy',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/n-th-tribonacci-number/'
  },
  {
    id: '509',
    lcNumber: 509,
    title: 'Fibonacci Number',
    topicId: 'dynamic-programming',
    difficulty: 'Easy',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/fibonacci-number/'
  },
  {
    id: '887',
    lcNumber: 887,
    title: 'Super Egg Drop',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: 'Longest Increasing Subsequence (LIS) & Binary Search DP',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/super-egg-drop/'
  },

  // Trie & Bit Manipulation
  {
    id: '342',
    lcNumber: 342,
    title: 'Power of Four',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitmasking subsets & counting set bits (Brian Kernighan)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/power-of-four/'
  },
  {
    id: '2429',
    lcNumber: 2429,
    title: 'Minimize XOR',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'XOR properties (Single Number, Missing Number)',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/minimize-xor/'
  }
];
