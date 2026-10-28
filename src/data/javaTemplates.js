/**
 * Standard Java Pattern Templates with High-Reusability Skeletal Implementations
 */

export const JAVA_TEMPLATES = [
  {
    id: 'fixed-sliding-window',
    title: 'Fixed Size Sliding Window',
    category: 'Sliding Window',
    difficulty: 'Easy / Medium',
    description: 'Computes metrics (sum, max, vowel count, match) for all contiguous subarrays/substrings of exact length k.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int fixedSlidingWindow(int[] nums, int k) {
    int currentSum = 0;
    // 1. Initialize first window of size k
    for (int i = 0; i < k; i++) {
        currentSum += nums[i];
    }
    int best = currentSum;

    // 2. Slide the window one element at a time
    for (int i = k; i < nums.length; i++) {
        currentSum += nums[i];     // Add incoming right element
        currentSum -= nums[i - k]; // Drop outgoing left element
        best = Math.max(best, currentSum);
    }
    return best;
}`
  },
  {
    id: 'variable-sliding-window-longest',
    title: 'Variable Sliding Window (Longest)',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Finds the longest contiguous subarray or substring satisfying a monotonic condition (e.g. at most k distinct, at most k zeros).',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) or O(charset)',
    code: `public int longestWindow(String s, int k) {
    int left = 0;
    int maxLen = 0;
    int conditionViolations = 0;

    for (int right = 0; right < s.length(); right++) {
        // 1. Expand right and update window state
        char incoming = s.charAt(right);
        // update conditionViolations...

        // 2. Contract left while invalid
        while (conditionViolations > k) {
            char outgoing = s.charAt(left);
            // decrement conditionViolations...
            left++;
        }

        // 3. Update answer for valid window
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
  },
  {
    id: 'variable-sliding-window-shortest',
    title: 'Variable Sliding Window (Shortest)',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Finds the shortest contiguous subarray meeting or exceeding a target sum or constraint.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int shortestWindow(int[] nums, int target) {
    int left = 0;
    int currentSum = 0;
    int minLen = Integer.MAX_VALUE;

    for (int right = 0; right < nums.length; right++) {
        currentSum += nums[right];

        // While condition is satisfied, minimize window from left
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`
  },
  {
    id: 'binary-search-classic',
    title: 'Classic Binary Search (Sorted Array)',
    category: 'Binary Search',
    difficulty: 'Easy',
    description: 'Searches for an exact target in a sorted array in logarithmic time.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: `public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents 32-bit overflow
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}`
  },
  {
    id: 'binary-search-on-answer',
    title: 'Binary Search on Answer Space',
    category: 'Binary Search',
    difficulty: 'Medium / Hard',
    description: 'Finds minimal or maximal parameter satisfying a monotonic boolean condition isValid(mid).',
    timeComplexity: 'O(n * log(range))',
    spaceComplexity: 'O(1)',
    code: `public int binarySearchOnAnswer(int[] items, int constraint) {
    int left = 1; // Minimum possible answer
    int right = 1_000_000_000; // Maximum possible answer
    int optimalAns = right;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (isFeasible(items, mid, constraint)) {
            optimalAns = mid;  // Valid! Try to optimize further
            right = mid - 1;   // If minimizing, search lower
        } else {
            left = mid + 1;    // Infeasible: increase candidate
        }
    }
    return optimalAns;
}

private boolean isFeasible(int[] items, int candidate, int constraint) {
    // Greedily simulate condition with parameter 'candidate'
    return true;
}`
  },
  {
    id: 'bfs-graph-matrix',
    title: 'BFS (Shortest Path / Level-Order)',
    category: 'Graphs / Trees',
    difficulty: 'Medium',
    description: 'Explores unweighted graphs or matrices layer-by-layer to guarantee shortest path.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    code: `public int bfsShortestPath(int[][] grid, int startR, int startC) {
    int m = grid.length, n = grid[0].length;
    int[][] directions = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    Queue<int[]> queue = new ArrayDeque<>();
    boolean[][] visited = new boolean[m][n];

    queue.offer(new int[]{startR, startC});
    visited[startR][startC] = true;
    int steps = 0;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            int[] curr = queue.poll();
            int r = curr[0], c = curr[1];

            // If reached destination, return steps

            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }
        steps++;
    }
    return -1;
}`
  },
  {
    id: 'dfs-backtracking-skeleton',
    title: 'Backtracking Skeleton (Combinations/Permutations)',
    category: 'Recursion / Backtracking',
    difficulty: 'Medium',
    description: 'Exhaustive exploration pattern with make-choice -> recurse -> undo-choice (backtrack).',
    timeComplexity: 'O(2^n) or O(n!)',
    spaceComplexity: 'O(n)',
    code: `public void backtrack(int[] candidates, int start, List<Integer> currentPath, List<List<Integer>> result) {
    // 1. Base case / Goal reached
    if (isValidSolution(currentPath)) {
        result.add(new ArrayList<>(currentPath));
        // return if exact length reached
    }

    // 2. Iterate candidates
    for (int i = start; i < candidates.length; i++) {
        // Pruning / constraint check
        if (shouldPrune(candidates[i])) continue;

        // Make choice
        currentPath.add(candidates[i]);

        // Recurse (use i + 1 for unique elements, i for reuse)
        backtrack(candidates, i + 1, currentPath, result);

        // Undo choice (Backtrack)
        currentPath.remove(currentPath.size() - 1);
    }
}`
  },
  {
    id: 'union-find-disjoint-set',
    title: 'Disjoint Set Union (Union-Find)',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Tracks partition of elements into disjoint sets with path compression and union by rank.',
    timeComplexity: 'O(α(n)) ≈ O(1) amortized',
    spaceComplexity: 'O(n)',
    code: `public class UnionFind {
    private int[] parent;
    private int[] rank;
    private int components;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int i) {
        if (parent[i] != i) {
            parent[i] = find(parent[i]); // Path compression
        }
        return parent[i];
    }

    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false; // Cycle detected

        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        components--;
        return true;
    }

    public int getComponents() { return components; }
}`
  },
  {
    id: 'monotonic-stack-skeleton',
    title: 'Monotonic Stack (Next Greater Element)',
    category: 'Stack',
    difficulty: 'Medium',
    description: 'Finds the nearest greater or smaller element to the right/left in linear time.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: `public int[] nextGreaterElement(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Stores indices

    for (int i = 0; i < n; i++) {
        // While current element is greater, resolve previous elements
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            int prevIdx = stack.pop();
            result[prevIdx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`
  },
  {
    id: 'one-dimensional-dp',
    title: '1D Dynamic Programming (Rolling Variables)',
    category: 'Dynamic Programming',
    difficulty: 'Easy / Medium',
    description: 'Optimizes state transitions where dp[i] depends only on the last 1 or 2 states.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: `public int robOrClimb(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];

    int prev2 = 0; // Represents dp[i - 2]
    int prev1 = 0; // Represents dp[i - 1]

    for (int num : nums) {
        // Transition: choose max of skipping or taking current + prev2
        int current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`
  }
];
