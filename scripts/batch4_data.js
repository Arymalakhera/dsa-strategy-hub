/**
 * Batch 4 Problem Definitions
 * Topics: greedy, graphs, dynamic-programming, trie-bit-manipulation
 */

export const BATCH_4_PROBLEMS = [
  // ==========================================
  // TOPIC 13: GREEDY (ADDITIONS)
  // ==========================================
  {
    id: '455',
    lcNumber: 455,
    title: 'Assign Cookies',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'Interval Scheduling / Activity Selection',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/assign-cookies/',
    hints: {
      hint1: 'Greedy sorting with two pointers.',
      hint2: 'Sort children greed and cookie sizes. Greedily satisfy the child with the smallest greed using the smallest possible cookie.',
      hint3: `// Arrays.sort(g); Arrays.sort(s);
// while (child < g.length && cookie < s.length) {
//     if (s[cookie] >= g[child]) child++;
//     cookie++;
// }
// return child;`,
      hint4: {
        javaSolution: `class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        int child = 0, cookie = 0;
        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) child++;
            cookie++;
        }
        return child;
    }
}`,
        timeComplexity: 'O(n log n + m log m) - Sorting both arrays',
        spaceComplexity: 'O(1) - Two pointer scan in-place',
        explanation: 'Assigning the smallest adequate cookie to the least greedy child preserves larger cookies for greedier children.'
      }
    }
  },
  {
    id: '605',
    lcNumber: 605,
    title: 'Can Place Flowers',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'Interval Scheduling / Activity Selection',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/can-place-flowers/'
  },
  {
    id: '561',
    lcNumber: 561,
    title: 'Array Partition',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'Two Pointers with Greedy choice',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/array-partition/'
  },
  {
    id: '45',
    lcNumber: 45,
    title: 'Jump Game II',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Jump Game & Gas Station greedy reachability',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/jump-game-ii/',
    hints: {
      hint1: 'Greedy BFS Level Window.',
      hint2: 'Maintain current jump boundary (curEnd) and furthest reachable index (curFarthest). When i hits curEnd, increment jumps and update curEnd.',
      hint3: `// for (i = 0 to n - 2) {
//     curFarthest = max(curFarthest, i + nums[i]);
//     if (i == curEnd) { jumps++; curEnd = curFarthest; }
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, curFarthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            curFarthest = Math.max(curFarthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = curFarthest;
            }
        }
        return jumps;
    }
}`,
        timeComplexity: 'O(n) - Single pass through array',
        spaceComplexity: 'O(1) - Constant tracking variables',
        explanation: 'Treating each jump as a BFS layer and expanding to the furthest reachable index guarantees finding the minimum jumps in linear time.'
      }
    }
  },
  {
    id: '122',
    lcNumber: 122,
    title: 'Best Time to Buy and Sell Stock II',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Stock Buy & Sell variants',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
    hints: {
      hint1: 'Accumulate all positive consecutive price differences.',
      hint2: 'Whenever prices[i] > prices[i - 1], capture that profit: profit += prices[i] - prices[i - 1].',
      hint3: `// for (int i = 1; i < prices.length; i++) {
//     if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant auxiliary memory',
        explanation: 'Summing every upward price slope captures the maximum possible cumulative profit across unlimited transactions.'
      }
    }
  },
  {
    id: '406',
    lcNumber: 406,
    title: 'Queue Reconstruction by Height',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Two Pointers with Greedy choice',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/queue-reconstruction-by-height/'
  },
  {
    id: '678',
    lcNumber: 678,
    title: 'Valid Parenthesis String',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Interval Scheduling / Activity Selection',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/valid-parenthesis-string/'
  },
  {
    id: '1029',
    lcNumber: 1029,
    title: 'Two City Scheduling',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Two Pointers with Greedy choice',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/two-city-scheduling/'
  },
  {
    id: '1899',
    lcNumber: 1899,
    title: 'Merge Triplets to Form Target Triplet',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Interval Scheduling / Activity Selection',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/'
  },
  {
    id: '135',
    lcNumber: 135,
    title: 'Candy',
    topicId: 'greedy',
    difficulty: 'Hard',
    pattern: 'Two Pointers with Greedy choice',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/candy/',
    hints: {
      hint1: 'Two-Pass Greedy (Left to Right, then Right to Left).',
      hint2: 'Initialize candies to 1. Forward pass: if ratings[i] > ratings[i-1], candies[i] = candies[i-1] + 1. Backward pass: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1] + 1).',
      hint3: `// 1. left-to-right pass satisfying left neighbors
// 2. right-to-left pass taking max satisfying right neighbors`,
      hint4: {
        javaSolution: `class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1);
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }
}`,
        timeComplexity: 'O(n) - Two passes over array',
        spaceComplexity: 'O(n) - Candies distribution array',
        explanation: 'Separating left-neighbor and right-neighbor constraints into two independent passes guarantees minimum total candies while satisfying both conditions.'
      }
    }
  },
  {
    id: '871',
    lcNumber: 871,
    title: 'Minimum Number of Refueling Stops',
    topicId: 'greedy',
    difficulty: 'Hard',
    pattern: 'Jump Game & Gas Station greedy reachability',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/minimum-number-of-refueling-stops/'
  },

  // ==========================================
  // TOPIC 14: GRAPHS (ADDITIONS)
  // ==========================================
  {
    id: '733',
    lcNumber: 733,
    title: 'Flood Fill',
    topicId: 'graphs',
    difficulty: 'Easy',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/flood-fill/',
    hints: {
      hint1: 'DFS / BFS pixel traversal.',
      hint2: 'Record original color. If original color == newColor, return image. Otherwise recursively recolor 4 adjacent neighbors with original color.',
      hint3: `// dfs(image, r, c, originalColor, newColor);
// check bounds and image[r][c] == originalColor before recursing.`,
      hint4: {
        javaSolution: `class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int oldColor = image[sr][sc];
        if (oldColor != color) dfs(image, sr, sc, oldColor, color);
        return image;
    }
    private void dfs(int[][] img, int r, int c, int oldColor, int newColor) {
        if (r < 0 || r >= img.length || c < 0 || c >= img[0].length || img[r][c] != oldColor) return;
        img[r][c] = newColor;
        dfs(img, r + 1, c, oldColor, newColor);
        dfs(img, r - 1, c, oldColor, newColor);
        dfs(img, r, c + 1, oldColor, newColor);
        dfs(img, r, c - 1, oldColor, newColor);
    }
}`,
        timeComplexity: 'O(m * n) - Visited each connected pixel once',
        spaceComplexity: 'O(m * n) - Recursion stack in worst case',
        explanation: 'Checking oldColor != newColor prevents infinite recursion and recolors all connected pixels in a single DFS pass.'
      }
    }
  },
  {
    id: '463',
    lcNumber: 463,
    title: 'Island Perimeter',
    topicId: 'graphs',
    difficulty: 'Easy',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/island-perimeter/',
    hints: {
      hint1: 'Count land cells and subtract shared adjacent edges.',
      hint2: 'Each land cell adds 4 sides. If right neighbor is land, subtract 2. If bottom neighbor is land, subtract 2.',
      hint3: `// if (grid[i][j] == 1) {
//     perimeter += 4;
//     if (i > 0 && grid[i-1][j] == 1) perimeter -= 2;
//     if (j > 0 && grid[i][j-1] == 1) perimeter -= 2;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int islandPerimeter(int[][] grid) {
        int perimeter = 0;
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    perimeter += 4;
                    if (i > 0 && grid[i - 1][j] == 1) perimeter -= 2;
                    if (j > 0 && grid[i][j - 1] == 1) perimeter -= 2;
                }
            }
        }
        return perimeter;
    }
}`,
        timeComplexity: 'O(m * n) - Single pass over matrix',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'Every shared edge between two adjacent land squares eliminates 2 exposed boundaries from the perimeter.'
      }
    }
  },
  {
    id: '695',
    lcNumber: 695,
    title: 'Max Area of Island',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/max-area-of-island/',
    hints: {
      hint1: 'DFS Component Area Summation with in-place sinking.',
      hint2: 'On encountering 1, sink it to 0 and recursively sum 1 + area of 4 neighbors. Track global maximum.',
      hint3: `// int dfs(r, c) {
//   if (out of bounds || grid[r][c] == 0) return 0;
//   grid[r][c] = 0;
//   return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int max = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    max = Math.max(max, dfs(grid, i, j));
                }
            }
        }
        return max;
    }
    private int dfs(int[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(grid, r + 1, c) + dfs(grid, r - 1, c) + dfs(grid, r, c + 1) + dfs(grid, r, c - 1);
    }
}`,
        timeComplexity: 'O(m * n) - Each cell visited at most a constant number of times',
        spaceComplexity: 'O(m * n) - Call stack for worst-case snake island',
        explanation: 'Overwriting visited land cells to 0 prevents repeated exploration and calculates component sizes in linear time.'
      }
    }
  },
  {
    id: '994',
    lcNumber: 994,
    title: 'Rotting Oranges',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/rotting-oranges/',
    hints: {
      hint1: 'Multi-source BFS using Queue.',
      hint2: 'Enqueue all initially rotten oranges (val 2) and count fresh oranges (val 1). Process queue level by level, decrementing fresh count and incrementing minutes.',
      hint3: `// Queue<int[]> q = initial rotten oranges;
// while (!q.isEmpty() && fresh > 0) {
//     level-by-level BFS rotting adjacent fresh oranges;
//     minutes++;
// }
// return fresh == 0 ? minutes : -1;`,
      hint4: {
        javaSolution: `class Solution {
    public int orangesRotting(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0, m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int r = cur[0] + d[0], c = cur[1] + d[1];
                    if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] == 1) {
                        grid[r][c] = 2;
                        fresh--;
                        q.offer(new int[]{r, c});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
        timeComplexity: 'O(m * n) - Each orange enqueued once',
        spaceComplexity: 'O(m * n) - Queue capacity',
        explanation: 'Simultaneous multi-source BFS models real-time virus/rot diffusion in exact step increments.'
      }
    }
  },
  {
    id: '130',
    lcNumber: 130,
    title: 'Surrounded Regions',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/surrounded-regions/'
  },
  {
    id: '417',
    lcNumber: 417,
    title: 'Pacific Atlantic Water Flow',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/'
  },
  {
    id: '785',
    lcNumber: 785,
    title: 'Is Graph Bipartite?',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/is-graph-bipartite/',
    hints: {
      hint1: '2-Coloring BFS / DFS.',
      hint2: 'Color unvisited nodes with 1 and -1. If neighbor has the same color as current node, the graph cannot be bipartite.',
      hint3: `// int[] colors = new int[n];
// for (i = 0 to n - 1) if (colors[i] == 0 && !bfs(i, colors)) return false;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            Queue<Integer> q = new LinkedList<>();
            q.offer(i);
            color[i] = 1;
            while (!q.isEmpty()) {
                int node = q.poll();
                for (int next : graph[node]) {
                    if (color[next] == 0) {
                        color[next] = -color[node];
                        q.offer(next);
                    } else if (color[next] == color[node]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}`,
        timeComplexity: 'O(V + E) - Standard BFS traversal',
        spaceComplexity: 'O(V) - Color array and queue',
        explanation: 'A graph is bipartite if and only if it does not contain an odd-length cycle; 2-coloring detects odd cycles immediately.'
      }
    }
  },
  {
    id: '787',
    lcNumber: 787,
    title: 'Cheapest Flights Within K Stops',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Shortest Path in Weighted Graph (Dijkstra\'s Algorithm)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/'
  },
  {
    id: '1584',
    lcNumber: 1584,
    title: 'Min Cost to Connect All Points',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Shortest Path in Weighted Graph (Dijkstra\'s Algorithm)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/'
  },
  {
    id: '802',
    lcNumber: 802,
    title: 'Find Eventual Safe States',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Cycle Detection in Directed & Undirected Graphs',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/find-eventual-safe-states/'
  },
  {
    id: '261',
    lcNumber: 261,
    title: 'Graph Valid Tree',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Cycle Detection in Directed & Undirected Graphs',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/graph-valid-tree/',
    hints: {
      hint1: 'Edges == n - 1 AND Connected without cycles.',
      hint2: 'A valid tree must have exactly n - 1 edges and no cycles (verified with Union-Find or BFS).',
      hint3: `// if (edges.length != n - 1) return false;
// UnionFind uf = new UnionFind(n);
// for (edge : edges) if (!uf.union(edge[0], edge[1])) return false;
// return true;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] e : edges) {
            int root1 = find(parent, e[0]), root2 = find(parent, e[1]);
            if (root1 == root2) return false;
            parent[root1] = root2;
        }
        return true;
    }
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
        timeComplexity: 'O(E * alpha(V)) - Disjoint set union with path compression',
        spaceComplexity: 'O(V) - Parent pointer array',
        explanation: 'A tree on n vertices has exactly n - 1 edges and is fully connected with no cycles. Disjoint Set Union validates both properties.'
      }
    }
  },
  {
    id: '323',
    lcNumber: 323,
    title: 'Number of Connected Components in an Undirected Graph',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Disjoint Set Union (Union-Find with path compression)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/'
  },
  {
    id: '269',
    lcNumber: 269,
    title: 'Alien Dictionary',
    topicId: 'graphs',
    difficulty: 'Hard',
    pattern: 'Topological Sort (Kahn\'s BFS In-Degree & DFS Post-Order)',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/alien-dictionary/',
    hints: {
      hint1: 'Kahn\'s Algorithm Topological Sort on character precedence graph.',
      hint2: 'Compare adjacent words to find the first differing character: edge w1[i] -> w2[i]. In-degree 0 characters enter BFS queue.',
      hint3: `// 1. Build adjacency list and in-degrees from adjacent word comparisons.
// 2. Queue in-degree 0 characters. If output length != unique chars, a cycle exists.`,
      hint4: {
        javaSolution: `class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> inDegree = new HashMap<>();
        for (String w : words) for (char c : w.toCharArray()) inDegree.put(c, 0);
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
            for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
                char c1 = w1.charAt(j), c2 = w2.charAt(j);
                if (c1 != c2) {
                    adj.putIfAbsent(c1, new HashSet<>());
                    if (adj.get(c1).add(c2)) inDegree.put(c2, inDegree.get(c2) + 1);
                    break;
                }
            }
        }
        Queue<Character> q = new LinkedList<>();
        for (char c : inDegree.keySet()) if (inDegree.get(c) == 0) q.offer(c);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            char c = q.poll();
            sb.append(c);
            if (adj.containsKey(c)) {
                for (char next : adj.get(c)) {
                    inDegree.put(next, inDegree.get(next) - 1);
                    if (inDegree.get(next) == 0) q.offer(next);
                }
            }
        }
        return sb.length() == inDegree.size() ? sb.toString() : "";
    }
}`,
        timeComplexity: 'O(C) - Total characters in all words',
        spaceComplexity: 'O(U + min(U^2, N)) - Unique characters and adjacency edges',
        explanation: 'Comparing consecutive words extracts pairwise ordering constraints, and topological sort orders the characters while detecting invalid cyclical alphabets.'
      }
    }
  },
  {
    id: '126',
    lcNumber: 126,
    title: 'Word Ladder II',
    topicId: 'graphs',
    difficulty: 'Hard',
    pattern: 'BFS / DFS on Matrix (Number of Islands, Flood Fill)',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/word-ladder-ii/'
  },

  // ==========================================
  // TOPIC 15: DYNAMIC PROGRAMMING (ADDITIONS)
  // ==========================================
  {
    id: '746',
    lcNumber: 746,
    title: 'Min Cost Climbing Stairs',
    topicId: 'dynamic-programming',
    difficulty: 'Easy',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
    hints: {
      hint1: 'Bottom-up transition dp[i] = cost[i] + min(dp[i-1], dp[i-2]).',
      hint2: 'Maintain two variables for the cost of previous 2 steps. The cost to reach current step is current cost + minimum of previous two.',
      hint3: `// int prev1 = cost[1], prev2 = cost[0];
// for (i = 2 to n - 1) { cur = cost[i] + min(prev1, prev2); prev2 = prev1; prev1 = cur; }
// return min(prev1, prev2);`,
      hint4: {
        javaSolution: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int prev2 = cost[0], prev1 = cost[1];
        for (int i = 2; i < cost.length; i++) {
            int cur = cost[i] + Math.min(prev1, prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        return Math.min(prev1, prev2);
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant variables in-place',
        explanation: 'At each stair, you arrive from either 1 or 2 steps below. Retaining only the last two values minimizes space to O(1).'
      }
    }
  },
  {
    id: '213',
    lcNumber: 213,
    title: 'House Robber II',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/house-robber-ii/',
    hints: {
      hint1: 'Circular array reduction into two linear subproblems.',
      hint2: 'Because houses 0 and n-1 are adjacent, you cannot rob both. Return max(robLinear(0, n-2), robLinear(1, n-1)).',
      hint3: `// return max(rob(nums, 0, n - 2), rob(nums, 1, n - 1));`,
      hint4: {
        javaSolution: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robLinear(nums, 0, nums.length - 2), robLinear(nums, 1, nums.length - 1));
    }
    private int robLinear(int[] nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int cur = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`,
        timeComplexity: 'O(n) - Two linear DP passes',
        spaceComplexity: 'O(1) - Constant auxiliary variables',
        explanation: 'Breaking the circular dependency into two independent linear segments (excluding first house vs excluding last house) resolves the adjacency constraint.'
      }
    }
  },
  {
    id: '64',
    lcNumber: 64,
    title: 'Minimum Path Sum',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Grid 2D DP (Unique Paths, Minimum Path Sum)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/minimum-path-sum/',
    hints: {
      hint1: 'Grid DP: grid[i][j] += min(grid[i-1][j], grid[i][j-1]).',
      hint2: 'You can only arrive from top or left. Accumulate minimum path cost in-place.',
      hint3: `// for (i < m) for (j < n) {
//   if (i == 0 && j == 0) continue;
//   grid[i][j] += min(fromTop, fromLeft);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 0) grid[i][j] += grid[i][j - 1];
                else if (j == 0) grid[i][j] += grid[i - 1][j];
                else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
}`,
        timeComplexity: 'O(m * n) - Visits each cell once',
        spaceComplexity: 'O(1) - In-place accumulation',
        explanation: 'Since moves are restricted to right and down, the optimal cost to reach (i, j) is the minimum of the optimal costs to reach its top and left neighbors plus its own value.'
      }
    }
  },
  {
    id: '63',
    lcNumber: 63,
    title: 'Unique Paths II',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Grid 2D DP (Unique Paths, Minimum Path Sum)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/unique-paths-ii/'
  },
  {
    id: '518',
    lcNumber: 518,
    title: 'Coin Change II',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '0/1 Knapsack & Unbounded Knapsack (Coin Change)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/coin-change-ii/'
  },
  {
    id: '139',
    lcNumber: 139,
    title: 'Word Break',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/word-break/',
    hints: {
      hint1: '1D boolean DP dp[i] where dp[i] is true if s[0..i] can be segmented.',
      hint2: 'dp[i] is true if there exists j < i such that dp[j] is true and wordDict contains s.substring(j, i).',
      hint3: `// dp[0] = true;
// for (i = 1 to n) for (j = 0 to i-1) if (dp[j] && dict.contains(s.substring(j, i))) { dp[i] = true; break; }`,
      hint4: {
        javaSolution: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}`,
        timeComplexity: 'O(n^2 * k) - Substring lookups in hash set',
        spaceComplexity: 'O(n) - 1D boolean DP array',
        explanation: 'Decomposing prefix validity into valid prefixes plus dictionary words models the problem as linear dynamic programming.'
      }
    }
  },
  {
    id: '91',
    lcNumber: 91,
    title: 'Decode Ways',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/decode-ways/',
    hints: {
      hint1: '1D DP with single-digit and two-digit transitions.',
      hint2: 'Add dp[i-1] if single digit s[i-1] != \'0\'. Add dp[i-2] if two digits s[i-2..i-1] lie in 10..26.',
      hint3: `// if (s[i-1] != '0') dp[i] += dp[i-1];
// int twoDigit = Integer.parseInt(s.substring(i-2, i));
// if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i-2];`,
      hint4: {
        javaSolution: `class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;
        int n = s.length();
        int prev2 = 1, prev1 = 1;
        for (int i = 1; i < n; i++) {
            int cur = 0;
            int single = s.charAt(i) - '0';
            int doubleDigit = (s.charAt(i - 1) - '0') * 10 + single;
            if (single != 0) cur += prev1;
            if (doubleDigit >= 10 && doubleDigit <= 26) cur += prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`,
        timeComplexity: 'O(n) - Single pass over digits',
        spaceComplexity: 'O(1) - Constant variables for the two previous states',
        explanation: 'Each position can be formed by parsing a single valid digit or two valid digits, mirroring Fibonacci-style state transitions with zero handling.'
      }
    }
  },
  {
    id: '494',
    lcNumber: 494,
    title: 'Target Sum',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '0/1 Knapsack & Unbounded Knapsack (Coin Change)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/target-sum/'
  },
  {
    id: '309',
    lcNumber: 309,
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '1D DP (Fibonacci, Climbing Stairs, House Robber)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/'
  },
  {
    id: '516',
    lcNumber: 516,
    title: 'Longest Palindromic Subsequence',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Longest Common Subsequence (LCS) & Edit Distance',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/longest-palindromic-subsequence/'
  },
  {
    id: '120',
    lcNumber: 120,
    title: 'Triangle',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Grid 2D DP (Unique Paths, Minimum Path Sum)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/triangle/'
  },
  {
    id: '329',
    lcNumber: 329,
    title: 'Longest Increasing Path in a Matrix',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: 'Longest Increasing Subsequence (LIS) & Binary Search DP',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/',
    hints: {
      hint1: 'DFS with Memoization on DAG of increasing values.',
      hint2: 'Because values must strictly increase, paths cannot contain cycles. Memoize memo[r][c] = max path starting from (r, c).',
      hint3: `// int max = 1;
// for (dir : dirs) if (matrix[nr][nc] > matrix[r][c]) max = Math.max(max, 1 + dfs(nr, nc));
// return memo[r][c] = max;`,
      hint4: {
        javaSolution: `class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length, max = 0;
        int[][] memo = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                max = Math.max(max, dfs(matrix, i, j, memo));
            }
        }
        return max;
    }
    private int dfs(int[][] mat, int r, int c, int[][] memo) {
        if (memo[r][c] != 0) return memo[r][c];
        int max = 1;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < mat.length && nc >= 0 && nc < mat[0].length && mat[nr][nc] > mat[r][c]) {
                max = Math.max(max, 1 + dfs(mat, nr, nc, memo));
            }
        }
        return memo[r][c] = max;
    }
}`,
        timeComplexity: 'O(m * n) - Each cell computed exactly once and cached',
        spaceComplexity: 'O(m * n) - Memoization table and call stack',
        explanation: 'Strictly increasing paths form a Directed Acyclic Graph (DAG), enabling DFS with memoization without visited sets.'
      }
    }
  },
  {
    id: '312',
    lcNumber: 312,
    title: 'Burst Balloons',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: '0/1 Knapsack & Unbounded Knapsack (Coin Change)',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/burst-balloons/'
  },
  {
    id: '115',
    lcNumber: 115,
    title: 'Distinct Subsequences',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: 'Longest Common Subsequence (LCS) & Edit Distance',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/distinct-subsequences/'
  },
  {
    id: '10',
    lcNumber: 10,
    title: 'Regular Expression Matching',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: 'Longest Common Subsequence (LCS) & Edit Distance',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/regular-expression-matching/'
  },
  {
    id: '44',
    lcNumber: 44,
    title: 'Wildcard Matching',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: 'Longest Common Subsequence (LCS) & Edit Distance',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/wildcard-matching/'
  },

  // ==========================================
  // TOPIC 16: TRIE + BIT MANIPULATION (ADDITIONS)
  // ==========================================
  {
    id: '461',
    lcNumber: 461,
    title: 'Hamming Distance',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitmasking subsets & counting set bits (Brian Kernighan)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/hamming-distance/',
    hints: {
      hint1: 'XOR to find differing bits + count set bits.',
      hint2: 'x ^ y leaves 1 at every bit position where x and y differ. Count set bits with Integer.bitCount(x ^ y) or Brian Kernighan.',
      hint3: `// int xor = x ^ y, dist = 0;
// while (xor > 0) { xor &= (xor - 1); dist++; }
// return dist;`,
      hint4: {
        javaSolution: `class Solution {
    public int hammingDistance(int x, int y) {
        int xor = x ^ y, dist = 0;
        while (xor > 0) {
            xor &= (xor - 1);
            dist++;
        }
        return dist;
    }
}`,
        timeComplexity: 'O(1) - Loop runs at most 32 times for 32-bit integers',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Bitwise XOR isolates different bits, and Brian Kernighan\'s operation xor &= (xor - 1) counts 1s in operations equal to the number of set bits.'
      }
    }
  },
  {
    id: '476',
    lcNumber: 476,
    title: 'Number Complement',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'XOR properties (Single Number, Missing Number)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/number-complement/'
  },
  {
    id: '1342',
    lcNumber: 1342,
    title: 'Number of Steps to Reduce a Number to Zero',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitmasking subsets & counting set bits (Brian Kernighan)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/'
  },
  {
    id: '211',
    lcNumber: 211,
    title: 'Design Add and Search Words Data Structure',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Trie Insert, Search, and StartsWith implementation',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    hints: {
      hint1: 'Trie with DFS branching on wildcard \'.\'.',
      hint2: 'Standard TrieNode children array. When searching, if character is \'.\', recursively search all 26 non-null children.',
      hint3: `// if (c == '.') { for (child : node.children) if (child != null && search(child, word, idx + 1)) return true; }
// else { return node.children[c - 'a'] != null && search(node.children[c - 'a'], word, idx + 1); }`,
      hint4: {
        javaSolution: `class WordDictionary {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }
    private final Node root = new Node();

    public void addWord(String word) {
        Node cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) cur.children[idx] = new Node();
            cur = cur.children[idx];
        }
        cur.isEnd = true;
    }

    public boolean search(String word) {
        return searchNode(word, 0, root);
    }

    private boolean searchNode(String word, int idx, Node node) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;
        char c = word.charAt(idx);
        if (c == '.') {
            for (Node child : node.children) {
                if (child != null && searchNode(word, idx + 1, child)) return true;
            }
            return false;
        } else {
            return searchNode(word, idx + 1, node.children[c - 'a']);
        }
    }
}`,
        timeComplexity: 'O(m) for addWord; O(26^m) worst-case for search with wildcards',
        spaceComplexity: 'O(total characters inserted) - Prefix tree nodes',
        explanation: 'A Trie organizes prefixes, and recursive backtracking checks all branching paths whenever the dot wildcard appears.'
      }
    }
  },
  {
    id: '677',
    lcNumber: 677,
    title: 'Map Sum Pairs',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Trie Insert, Search, and StartsWith implementation',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/map-sum-pairs/'
  },
  {
    id: '421',
    lcNumber: 421,
    title: 'Maximum XOR of Two Numbers in an Array',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Maximum XOR of two numbers in an array',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
    hints: {
      hint1: 'Binary Bit Trie (0 and 1 branches) from MSB (bit 30) down to LSB.',
      hint2: 'Insert binary representations into Trie. For each number, greedily traverse the opposite bit branch to maximize XOR at each power of two.',
      hint3: `// for bit 30 down to 0:
// targetBit = 1 - curBit;
// if (node.has(targetBit)) { curXor |= (1 << bit); node = node.get(targetBit); }
// else node = node.get(curBit);`,
      hint4: {
        javaSolution: `class Solution {
    private static class TrieNode {
        TrieNode[] next = new TrieNode[2];
    }
    public int findMaximumXOR(int[] nums) {
        TrieNode root = new TrieNode();
        for (int num : nums) {
            TrieNode cur = root;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >>> i) & 1;
                if (cur.next[bit] == null) cur.next[bit] = new TrieNode();
                cur = cur.next[bit];
            }
        }
        int maxXor = 0;
        for (int num : nums) {
            TrieNode cur = root;
            int curXor = 0;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >>> i) & 1;
                int opposite = 1 - bit;
                if (cur.next[opposite] != null) {
                    curXor |= (1 << i);
                    cur = cur.next[opposite];
                } else {
                    cur = cur.next[bit];
                }
            }
            maxXor = Math.max(maxXor, curXor);
        }
        return maxXor;
    }
}`,
        timeComplexity: 'O(32 * n) - Linear in input size with 32-bit depth',
        spaceComplexity: 'O(32 * n) - Binary trie nodes',
        explanation: 'Greedily matching opposite bits from MSB to LSB guarantees picking the number that yields the highest numerical bitwise XOR.'
      }
    }
  },
  {
    id: '371',
    lcNumber: 371,
    title: 'Sum of Two Integers',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'XOR properties (Single Number, Missing Number)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/sum-of-two-integers/',
    hints: {
      hint1: 'Bitwise XOR for addition without carry; AND shifted left for carry.',
      hint2: 'Sum without carry is a ^ b. Carry is (a & b) << 1. Repeat until carry becomes 0.',
      hint3: `// while (b != 0) {
//     int carry = (a & b) << 1;
//     a = a ^ b;
//     b = carry;
// }
// return a;`,
      hint4: {
        javaSolution: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
        timeComplexity: 'O(1) - Loop runs at most 32 times for 32-bit integers',
        spaceComplexity: 'O(1) - In-place bit arithmetic',
        explanation: 'XOR replicates binary half-adder addition while AND shifted left handles carry propagation without using arithmetic operators.'
      }
    }
  },
  {
    id: '7',
    lcNumber: 7,
    title: 'Reverse Integer',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Bitmasking subsets & counting set bits (Brian Kernighan)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/reverse-integer/'
  },
  {
    id: '260',
    lcNumber: 260,
    title: 'Single Number III',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'XOR properties (Single Number, Missing Number)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/single-number-iii/'
  },
  {
    id: '89',
    lcNumber: 89,
    title: 'Gray Code',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Bitmasking subsets & counting set bits (Brian Kernighan)',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/gray-code/'
  }
];
