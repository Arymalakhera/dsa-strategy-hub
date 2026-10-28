/**
 * Multi-Language Pattern Skeletons & Boilerplate
 * Supports Python, Java, C++, and JavaScript
 */

export const PATTERN_TEMPLATES = [
  {
    id: 'fixed-sliding-window',
    title: 'Fixed Size Sliding Window',
    category: 'Sliding Window',
    difficulty: 'Easy / Medium',
    description: 'Computes metrics (sum, max, match count) for all contiguous subarrays/substrings of exact length k.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: {
      python: `def fixed_sliding_window(nums: list[int], k: int) -> int:
    current_sum = sum(nums[:k])
    best = current_sum

    for i in range(k, len(nums)):
        current_sum += nums[i] - nums[i - k]  # Add incoming, subtract outgoing
        best = max(best, current_sum)

    return best`,
      java: `public int fixedSlidingWindow(int[] nums, int k) {
    int currentSum = 0;
    for (int i = 0; i < k; i++) currentSum += nums[i];
    int best = currentSum;

    for (int i = k; i < nums.length; i++) {
        currentSum += nums[i] - nums[i - k]; // Add incoming, drop outgoing
        best = Math.max(best, currentSum);
    }
    return best;
}`,
      cpp: `int fixedSlidingWindow(vector<int>& nums, int k) {
    int currentSum = 0;
    for (int i = 0; i < k; i++) currentSum += nums[i];
    int best = currentSum;

    for (int i = k; i < nums.size(); i++) {
        currentSum += nums[i] - nums[i - k];
        best = max(best, currentSum);
    }
    return best;
}`,
      javascript: `function fixedSlidingWindow(nums, k) {
    let currentSum = 0;
    for (let i = 0; i < k; i++) currentSum += nums[i];
    let best = currentSum;

    for (let i = k; i < nums.length; i++) {
        currentSum += nums[i] - nums[i - k];
        best = Math.max(best, currentSum);
    }
    return best;
}`
    }
  },
  {
    id: 'variable-sliding-window-longest',
    title: 'Variable Sliding Window (Longest)',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Finds the longest contiguous subarray or substring satisfying a monotonic condition.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) or O(charset)',
    code: {
      python: `def longest_window(s: str, k: int) -> int:
    left = 0
    max_len = 0
    violations = 0

    for right in range(len(s)):
        # 1. Expand right and update state
        # violations += ...

        # 2. Contract left while invalid
        while violations > k:
            # violations -= ...
            left += 1

        # 3. Valid window candidate
        max_len = max(max_len, right - left + 1)

    return max_len`,
      java: `public int longestWindow(String s, int k) {
    int left = 0, maxLen = 0, violations = 0;

    for (int right = 0; right < s.length(); right++) {
        // Expand right...
        while (violations > k) {
            // Contract left...
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      cpp: `int longestWindow(string s, int k) {
    int left = 0, maxLen = 0, violations = 0;
    for (int right = 0; right < s.length(); right++) {
        // Expand right...
        while (violations > k) {
            // Contract left...
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      javascript: `function longestWindow(s, k) {
    let left = 0, maxLen = 0, violations = 0;
    for (let right = 0; right < s.length; right++) {
        // Expand right...
        while (violations > k) {
            // Contract left...
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
    }
  },
  {
    id: 'variable-sliding-window-shortest',
    title: 'Variable Sliding Window (Shortest)',
    category: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Finds the shortest contiguous subarray meeting or exceeding a target sum or constraint.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: {
      python: `def shortest_window(nums: list[int], target: int) -> int:
    left = 0
    current_sum = 0
    min_len = float('inf')

    for right in range(len(nums)):
        current_sum += nums[right]
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1

    return 0 if min_len == float('inf') else min_len`,
      java: `public int shortestWindow(int[] nums, int target) {
    int left = 0, currentSum = 0;
    int minLen = Integer.MAX_VALUE;

    for (int right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`,
      cpp: `int shortestWindow(vector<int>& nums, int target) {
    int left = 0, currentSum = 0, minLen = INT_MAX;
    for (int right = 0; right < nums.size(); right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen == INT_MAX ? 0 : minLen;
}`,
      javascript: `function shortestWindow(nums, target) {
    let left = 0, currentSum = 0, minLen = Infinity;
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}`
    }
  },
  {
    id: 'binary-search-classic',
    title: 'Classic Binary Search (Sorted Array)',
    category: 'Binary Search',
    difficulty: 'Easy',
    description: 'Searches for an exact target in a sorted array in logarithmic time.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    code: {
      python: `def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      java: `public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      cpp: `int binarySearch(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      javascript: `function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    }
  },
  {
    id: 'binary-search-on-answer',
    title: 'Binary Search on Answer Space',
    category: 'Binary Search',
    difficulty: 'Medium / Hard',
    description: 'Finds minimal or maximal parameter satisfying a monotonic boolean condition is_feasible(mid).',
    timeComplexity: 'O(n * log(range))',
    spaceComplexity: 'O(1)',
    code: {
      python: `def binary_search_on_answer(items: list[int], constraint: int) -> int:
    left, right = 1, 10**9
    optimal_ans = right

    def is_feasible(candidate: int) -> bool:
        # Greedily simulate condition
        return True

    while left <= right:
        mid = left + (right - left) // 2
        if is_feasible(mid):
            optimal_ans = mid
            right = mid - 1  # If minimizing, try smaller
        else:
            left = mid + 1

    return optimal_ans`,
      java: `public int binarySearchOnAnswer(int[] items, int constraint) {
    int left = 1, right = 1_000_000_000;
    int optimalAns = right;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (isFeasible(items, mid, constraint)) {
            optimalAns = mid;
            right = mid - 1; // Seek lower
        } else {
            left = mid + 1;
        }
    }
    return optimalAns;
}`,
      cpp: `int binarySearchOnAnswer(vector<int>& items, int constraint) {
    long long left = 1, right = 1e9;
    long long optimalAns = right;
    while (left <= right) {
        long long mid = left + (right - left) / 2;
        if (isFeasible(items, mid, constraint)) {
            optimalAns = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return optimalAns;
}`,
      javascript: `function binarySearchOnAnswer(items, constraint) {
    let left = 1, right = 1e9;
    let optimalAns = right;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (isFeasible(items, mid, constraint)) {
            optimalAns = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return optimalAns;
}`
    }
  },
  {
    id: 'bfs-graph-matrix',
    title: 'BFS (Shortest Path / Level-Order)',
    category: 'Graphs / Trees',
    difficulty: 'Medium',
    description: 'Explores unweighted graphs or matrices layer-by-layer to guarantee shortest path.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    code: {
      python: `from collections import deque

def bfs_shortest_path(grid: list[list[int]], start_r: int, start_c: int) -> int:
    m, n = len(grid), len(grid[0])
    queue = deque([(start_r, start_c)])
    visited = {(start_r, start_c)}
    steps = 0

    while queue:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            # If target reached: return steps
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    queue.append((nr, nc))
        steps += 1
    return -1`,
      java: `public int bfsShortestPath(int[][] grid, int startR, int startC) {
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
}`,
      cpp: `int bfsShortestPath(vector<vector<int>>& grid, int startR, int startC) {
    int m = grid.size(), n = grid[0].size();
    vector<pair<int,int>> dirs = {{0,1},{1,0},{0,-1},{-1,0}};
    queue<pair<int,int>> q;
    vector<vector<bool>> visited(m, vector<bool>(n, false));
    q.push({startR, startC});
    visited[startR][startC] = true;
    int steps = 0;

    while (!q.empty()) {
        int sz = q.size();
        while (sz--) {
            auto [r, c] = q.front(); q.pop();
            for (auto& [dr, dc] : dirs) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    q.push({nr, nc});
                }
            }
        }
        steps++;
    }
    return -1;
}`,
      javascript: `function bfsShortestPath(grid, startR, startC) {
    const m = grid.length, n = grid[0].length;
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    const queue = [[startR, startC]];
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    visited[startR][startC] = true;
    let steps = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of directions) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
        steps++;
    }
    return -1;
}`
    }
  },
  {
    id: 'dfs-backtracking-skeleton',
    title: 'Backtracking Skeleton (Combinations/Permutations)',
    category: 'Recursion / Backtracking',
    difficulty: 'Medium',
    description: 'Exhaustive exploration pattern with make-choice -> recurse -> undo-choice (backtrack).',
    timeComplexity: 'O(2^n) or O(n!)',
    spaceComplexity: 'O(n)',
    code: {
      python: `def backtrack(candidates: list[int], start: int, path: list[int], result: list[list[int]]):
    # 1. Base case / valid goal
    result.append(list(path))

    # 2. Iterate candidates
    for i in range(start, len(candidates)):
        path.append(candidates[i])        # Make choice
        backtrack(candidates, i + 1, path, result) # Recurse
        path.pop()                        # Backtrack`,
      java: `public void backtrack(int[] candidates, int start, List<Integer> path, List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < candidates.length; i++) {
        path.add(candidates[i]);
        backtrack(candidates, i + 1, path, result);
        path.remove(path.size() - 1); // Backtrack
    }
}`,
      cpp: `void backtrack(vector<int>& candidates, int start, vector<int>& path, vector<vector<int>>& result) {
    result.push_back(path);
    for (int i = start; i < candidates.size(); i++) {
        path.push_back(candidates[i]);
        backtrack(candidates, i + 1, path, result);
        path.pop_back(); // Backtrack
    }
}`,
      javascript: `function backtrack(candidates, start, path, result) {
    result.push([...path]);
    for (let i = start; i < candidates.length; i++) {
        path.push(candidates[i]);
        backtrack(candidates, i + 1, path, result);
        path.pop(); // Backtrack
    }
}`
    }
  },
  {
    id: 'union-find-disjoint-set',
    title: 'Disjoint Set Union (Union-Find)',
    category: 'Graphs',
    difficulty: 'Medium',
    description: 'Tracks partition of elements into disjoint sets with path compression and union by rank.',
    timeComplexity: 'O(α(n)) ≈ O(1) amortized',
    spaceComplexity: 'O(n)',
    code: {
      python: `class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, i: int) -> int:
        if self.parent[i] != i:
            self.parent[i] = self.find(self.parent[i]) # Path compression
        return self.parent[i]

    def union(self, i: int, j: int) -> bool:
        root_i, root_j = self.find(i), self.find(j)
        if root_i == root_j:
            return False
        if self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        elif self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        else:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        return True`,
      java: `public class UnionFind {
    private int[] parent, rank;
    public UnionFind(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    public int find(int i) {
        if (parent[i] != i) parent[i] = find(parent[i]);
        return parent[i];
    }
    public boolean union(int i, int j) {
        int rI = find(i), rJ = find(j);
        if (rI == rJ) return false;
        if (rank[rI] < rank[rJ]) parent[rI] = rJ;
        else if (rank[rI] > rank[rJ]) parent[rJ] = rI;
        else { parent[rJ] = rI; rank[rI]++; }
        return true;
    }
}`,
      cpp: `class UnionFind {
    vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        return parent[i] == i ? i : parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rI = find(i), rJ = find(j);
        if (rI == rJ) return false;
        if (rank[rI] < rank[rJ]) parent[rI] = rJ;
        else if (rank[rI] > rank[rJ]) parent[rJ] = rI;
        else { parent[rJ] = rI; rank[rI]++; }
        return true;
    }
};`,
      javascript: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }
    find(i) {
        if (this.parent[i] !== i) this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }
    union(i, j) {
        const rI = this.find(i), rJ = this.find(j);
        if (rI === rJ) return false;
        if (this.rank[rI] < this.rank[rJ]) this.parent[rI] = rJ;
        else if (this.rank[rI] > this.rank[rJ]) this.parent[rJ] = rI;
        else { this.parent[rJ] = rI; this.rank[rI]++; }
        return true;
    }
}`
    }
  },
  {
    id: 'monotonic-stack-skeleton',
    title: 'Monotonic Stack (Next Greater Element)',
    category: 'Stack',
    difficulty: 'Medium',
    description: 'Finds the nearest greater or smaller element to the right/left in linear time.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    code: {
      python: `def next_greater_element(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [-1] * n
    stack = []  # Stores indices

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            prev_idx = stack.pop()
            result[prev_idx] = nums[i]
        stack.append(i)

    return result`,
      java: `public int[] nextGreaterElement(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`,
      cpp: `vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, -1);
    stack<int> st;

    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            result[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return result;
}`,
      javascript: `function nextGreaterElement(nums) {
    const n = nums.length;
    const result = Array(n).fill(-1);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const prevIdx = stack.pop();
            result[prevIdx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`
    }
  },
  {
    id: 'one-dimensional-dp',
    title: '1D Dynamic Programming (Rolling Variables)',
    category: 'Dynamic Programming',
    difficulty: 'Easy / Medium',
    description: 'Optimizes state transitions where dp[i] depends only on the last 1 or 2 states.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    code: {
      python: `def rob_or_climb(nums: list[int]) -> int:
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    return prev1`,
      java: `public int robOrClimb(int[] nums) {
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      cpp: `int robOrClimb(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      javascript: `function robOrClimb(nums) {
    let prev2 = 0, prev1 = 0;
    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
    }
  }
];

// Backwards-compatible export
export const JAVA_TEMPLATES = PATTERN_TEMPLATES.map((t) => ({
  ...t,
  code: typeof t.code === 'object' ? t.code.java : t.code
}));
