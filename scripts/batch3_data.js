/**
 * Batch 3 Problem Definitions
 * Topics: linked-list, recursion-backtracking, trees, heap
 */

export const BATCH_3_PROBLEMS = [
  // ==========================================
  // TOPIC 9: LINKED LIST (ADDITIONS)
  // ==========================================
  {
    id: '876',
    lcNumber: 876,
    title: 'Middle of the Linked List',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'Fast & Slow Pointers (Floyd Cycle Detection & Middle Node)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/middle-of-the-linked-list/',
    hints: {
      hint1: 'Fast and slow runner pointers.',
      hint2: 'Slow advances 1 step; fast advances 2 steps. When fast reaches end, slow is at the middle node.',
      hint3: `// while (fast != null && fast.next != null) {
//     slow = slow.next;
//     fast = fast.next.next;
// }
// return slow;`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
        timeComplexity: 'O(n) - Single pass through list',
        spaceComplexity: 'O(1) - Constant auxiliary pointers',
        explanation: 'Because the fast pointer moves at twice the speed of the slow pointer, slow lands exactly at the midpoint when fast reaches the end.'
      }
    }
  },
  {
    id: '203',
    lcNumber: 203,
    title: 'Remove Linked List Elements',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/remove-linked-list-elements/'
  },
  {
    id: '83',
    lcNumber: 83,
    title: 'Remove Duplicates from Sorted List',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/'
  },
  {
    id: '82',
    lcNumber: 82,
    title: 'Remove Duplicates from Sorted List II',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/'
  },
  {
    id: '19',
    lcNumber: 19,
    title: 'Remove Nth Node From End of List',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointers (Floyd Cycle Detection & Middle Node)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    hints: {
      hint1: 'Two Pointers spaced n steps apart.',
      hint2: 'Advance fast pointer n steps ahead. Then move slow and fast together until fast reaches end. Slow is right before the node to remove.',
      hint3: `// for (i = 0 to n) fast = fast.next;
// while (fast != null) { slow = slow.next; fast = fast.next; }
// slow.next = slow.next.next;`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
        timeComplexity: 'O(n) - Single traversal of the list',
        spaceComplexity: 'O(1) - Constant auxiliary pointers',
        explanation: 'Maintaining a gap of n nodes between fast and slow positions slow precisely before the target node in a single pass.'
      }
    }
  },
  {
    id: '142',
    lcNumber: 142,
    title: 'Linked List Cycle II',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Fast & Slow Pointers (Floyd Cycle Detection & Middle Node)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/linked-list-cycle-ii/',
    hints: {
      hint1: 'Floyd\'s Cycle Finding Algorithm (Tortoise and Hare).',
      hint2: 'When slow and fast meet, reset slow to head. Advance both 1 step at a time; they will intersect at the cycle entrance.',
      hint3: `// while (fast != null && fast.next != null) {
//     slow = slow.next; fast = fast.next.next;
//     if (slow == fast) { slow = head; while (slow != fast) { slow = slow.next; fast = fast.next; } return slow; }
// }`,
      hint4: {
        javaSolution: `public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`,
        timeComplexity: 'O(n) - Cycle detection and entry meeting in linear time',
        spaceComplexity: 'O(1) - In-place pointers without extra memory',
        explanation: 'Mathematical derivation shows distance from head to cycle entrance equals distance from meeting point to cycle entrance modulo cycle length.'
      }
    }
  },
  {
    id: '92',
    lcNumber: 92,
    title: 'Reverse Linked List II',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/reverse-linked-list-ii/',
    hints: {
      hint1: 'In-place sublist reversal with dummy head.',
      hint2: 'Navigate prev to node before left. Repeatedly insert cur.next after prev for right - left times.',
      hint3: `// for (i = 0 to right - left) {
//     then = cur.next;
//     cur.next = then.next;
//     then.next = prev.next;
//     prev.next = then;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 0; i < left - 1; i++) prev = prev.next;
        ListNode cur = prev.next;
        for (int i = 0; i < right - left; i++) {
            ListNode then = cur.next;
            cur.next = then.next;
            then.next = prev.next;
            prev.next = then;
        }
        return dummy.next;
    }
}`,
        timeComplexity: 'O(n) - Single pass reversing designated window',
        spaceComplexity: 'O(1) - Constant pointer manipulation',
        explanation: 'Relinking nodes sequentially into the front of the reversed section achieves in-place reversal in a single pass.'
      }
    }
  },
  {
    id: '61',
    lcNumber: 61,
    title: 'Rotate List',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/rotate-list/'
  },
  {
    id: '24',
    lcNumber: 24,
    title: 'Swap Nodes in Pairs',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/swap-nodes-in-pairs/'
  },
  {
    id: '25',
    lcNumber: 25,
    title: 'Reverse Nodes in k-Group',
    topicId: 'linked-list',
    difficulty: 'Hard',
    pattern: 'In-Place Reversal of Singly Linked List',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
    hints: {
      hint1: 'K-node subsegment reversal with count check.',
      hint2: 'Count if k nodes exist. If so, reverse those k nodes, recursively call for next group, and connect.',
      hint3: `// int count = 0; while (cur != null && count < k) { cur = cur.next; count++; }
// if (count == k) { revHead = reverse(head, k); head.next = reverseKGroup(cur, k); }`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode cur = head;
        int count = 0;
        while (cur != null && count < k) {
            cur = cur.next;
            count++;
        }
        if (count == k) {
            cur = reverseKGroup(cur, k);
            while (count-- > 0) {
                ListNode tmp = head.next;
                head.next = cur;
                cur = head;
                head = tmp;
            }
            head = cur;
        }
        return head;
    }
}`,
        timeComplexity: 'O(n) - Each node visited twice',
        spaceComplexity: 'O(n / k) - Recursion stack frames',
        explanation: 'Checking group availability first guarantees remainder nodes (< k) stay untouched as per problem specifications.'
      }
    }
  },

  // ==========================================
  // TOPIC 10: RECURSION + BACKTRACKING (ADDITIONS)
  // ==========================================
  {
    id: '50',
    lcNumber: 50,
    title: 'Pow(x, n)',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Subsets / Power Set (Include / Exclude choice)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/powx-n/',
    hints: {
      hint1: 'Binary Exponentiation (Fast Power).',
      hint2: 'x^n = (x^2)^(n/2) for even n; x * x^(n-1) for odd n. Handle negative powers by taking 1 / x and long casting for n = -2^31.',
      hint3: `// long N = n; if (N < 0) { x = 1 / x; N = -N; }
// while (N > 0) { if (N % 2 == 1) res *= x; x *= x; N /= 2; }`,
      hint4: {
        javaSolution: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) { x = 1 / x; N = -N; }
        double res = 1;
        while (N > 0) {
            if ((N & 1) == 1) res *= x;
            x *= x;
            N >>= 1;
        }
        return res;
    }
}`,
        timeComplexity: 'O(log n) - Exponent halved at each iteration',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Binary exponentiation squares the base and halves the exponent, reducing an O(n) loop to O(log n).'
      }
    }
  },
  {
    id: '22',
    lcNumber: 22,
    title: 'Generate Parentheses',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Backtracking with Pruning (N-Queens, Sudoku)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/generate-parentheses/',
    hints: {
      hint1: 'Backtracking with open and close counts.',
      hint2: 'Add \'(\' if open < n. Add \')\' only if close < open to maintain validity.',
      hint3: `// if (open < n) backtrack(s + "(", open + 1, close);
// if (close < open) backtrack(s + ")", open, close + 1);`,
      hint4: {
        javaSolution: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(res, new StringBuilder(), 0, 0, n);
        return res;
    }
    private void backtrack(List<String> res, StringBuilder cur, int open, int close, int max) {
        if (cur.length() == max * 2) {
            res.add(cur.toString());
            return;
        }
        if (open < max) {
            cur.append('(');
            backtrack(res, cur, open + 1, close, max);
            cur.deleteCharAt(cur.length() - 1);
        }
        if (close < open) {
            cur.append(')');
            backtrack(res, cur, open, close + 1, max);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}`,
        timeComplexity: 'O(4^n / sqrt(n)) - n-th Catalan number bound',
        spaceComplexity: 'O(n) - Maximum call stack depth of 2n',
        explanation: 'Only generating valid branching options avoids exploring malformed parentheses combinations.'
      }
    }
  },
  {
    id: '90',
    lcNumber: 90,
    title: 'Subsets II',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Subsets / Power Set (Include / Exclude choice)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/subsets-ii/',
    hints: {
      hint1: 'Sort + Skip adjacent duplicate elements.',
      hint2: 'Sort array. In the loop, if i > start && nums[i] == nums[i - 1], continue to skip identical branches at the same tree depth.',
      hint3: `// Arrays.sort(nums);
// for (int i = start; i < nums.length; i++) {
//     if (i > start && nums[i] == nums[i - 1]) continue;
//     backtrack(i + 1);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), nums, 0);
        return res;
    }
    private void backtrack(List<List<Integer>> res, List<Integer> cur, int[] nums, int start) {
        res.add(new ArrayList<>(cur));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            cur.add(nums[i]);
            backtrack(res, cur, nums, i + 1);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        timeComplexity: 'O(n * 2^n) - Number of subsets with length n construction',
        spaceComplexity: 'O(n) - Recursion stack depth',
        explanation: 'Sorting clusters duplicates, allowing if (i > start && nums[i] == nums[i-1]) continue to prune redundant recursion paths.'
      }
    }
  },
  {
    id: '40',
    lcNumber: 40,
    title: 'Combination Sum II',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinations & Permutations (Handling duplicates)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/combination-sum-ii/',
    hints: {
      hint1: 'Sort + Skip duplicates + Each number used once.',
      hint2: 'Sort array. Advance start to i + 1. If i > start and nums[i] == nums[i - 1], skip duplicate choice.',
      hint3: `// Arrays.sort(candidates);
// for (int i = start; i < candidates.length; i++) {
//     if (i > start && candidates[i] == candidates[i - 1]) continue;
//     if (candidates[i] > remain) break;
//     backtrack(remain - candidates[i], i + 1);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), candidates, target, 0);
        return res;
    }
    private void backtrack(List<List<Integer>> res, List<Integer> cur, int[] cand, int remain, int start) {
        if (remain == 0) { res.add(new ArrayList<>(cur)); return; }
        for (int i = start; i < cand.length; i++) {
            if (i > start && cand[i] == cand[i - 1]) continue;
            if (cand[i] > remain) break;
            cur.add(cand[i]);
            backtrack(res, cur, cand, remain - cand[i], i + 1);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        timeComplexity: 'O(2^n) - Upper bound of subset combinations',
        spaceComplexity: 'O(n) - Recursion call stack',
        explanation: 'Sorting enables early breaking when candidates exceed remaining target, and skipping adjacent duplicates prevents identical sets.'
      }
    }
  },
  {
    id: '216',
    lcNumber: 216,
    title: 'Combination Sum III',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinations & Permutations (Handling duplicates)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/combination-sum-iii/'
  },
  {
    id: '47',
    lcNumber: 47,
    title: 'Permutations II',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinations & Permutations (Handling duplicates)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/permutations-ii/'
  },
  {
    id: '77',
    lcNumber: 77,
    title: 'Combinations',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinations & Permutations (Handling duplicates)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/combinations/'
  },
  {
    id: '93',
    lcNumber: 93,
    title: 'Restore IP Addresses',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Backtracking with Pruning (N-Queens, Sudoku)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/restore-ip-addresses/'
  },
  {
    id: '52',
    lcNumber: 52,
    title: 'N-Queens II',
    topicId: 'recursion-backtracking',
    difficulty: 'Hard',
    pattern: 'Backtracking with Pruning (N-Queens, Sudoku)',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/n-queens-ii/'
  },
  {
    id: '140',
    lcNumber: 140,
    title: 'Word Break II',
    topicId: 'recursion-backtracking',
    difficulty: 'Hard',
    pattern: 'Word Search on Matrix with visited state',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/word-break-ii/'
  },

  // ==========================================
  // TOPIC 11: TREES (ADDITIONS)
  // ==========================================
  {
    id: '100',
    lcNumber: 100,
    title: 'Same Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/same-tree/',
    hints: {
      hint1: 'Simultaneous DFS Traversal.',
      hint2: 'If both p and q are null, return true. If one is null or values differ, return false. Recurse for p.left & q.left, and p.right & q.right.',
      hint3: `// if (p == null && q == null) return true;
// if (p == null || q == null || p.val != q.val) return false;
// return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
        timeComplexity: 'O(n) - Visited each node once',
        spaceComplexity: 'O(h) - Stack space proportional to tree height',
        explanation: 'Synchronous DFS verifies structural identity and value equality simultaneously at every corresponding subtree.'
      }
    }
  },
  {
    id: '101',
    lcNumber: 101,
    title: 'Symmetric Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/symmetric-tree/',
    hints: {
      hint1: 'Mirror DFS comparison.',
      hint2: 'A tree is symmetric if left subtree is a mirror reflection of right subtree: t1.val == t2.val, t1.left matches t2.right, and t1.right matches t2.left.',
      hint3: `// boolean isMirror(t1, t2) {
//   if (t1 == null && t2 == null) return true;
//   if (t1 == null || t2 == null || t1.val != t2.val) return false;
//   return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isMirror(root.left, root.right);
    }
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null || t1.val != t2.val) return false;
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
}`,
        timeComplexity: 'O(n) - Visits every node once',
        spaceComplexity: 'O(h) - Height of tree call stack',
        explanation: 'Comparing opposite branching children (left with right and right with left) validates reflection symmetry across the root.'
      }
    }
  },
  {
    id: '226',
    lcNumber: 226,
    title: 'Invert Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/invert-binary-tree/',
    hints: {
      hint1: 'Post-order / Pre-order Subtree Swapping.',
      hint2: 'Recursively invert left and right children, then swap root.left and root.right.',
      hint3: `// TreeNode left = invertTree(root.left);
// TreeNode right = invertTree(root.right);
// root.left = right; root.right = left; return root;`,
      hint4: {
        javaSolution: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}`,
        timeComplexity: 'O(n) - Visits each node once',
        spaceComplexity: 'O(h) - Tree height recursion stack',
        explanation: 'Swapping left and right child pointers at every subtree level mirrors the entire binary tree.'
      }
    }
  },
  {
    id: '110',
    lcNumber: 110,
    title: 'Balanced Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Lowest Common Ancestor (LCA) & Tree Diameter',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/balanced-binary-tree/',
    hints: {
      hint1: 'Bottom-up height calculation with -1 sentinel.',
      hint2: 'Compute subtree height. If height difference > 1 or child returns -1, return -1 immediately to prune.',
      hint3: `// int left = checkHeight(root.left);
// int right = checkHeight(root.right);
// if (left == -1 || right == -1 || Math.abs(left - right) > 1) return -1;
// return Math.max(left, right) + 1;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
    private int checkHeight(TreeNode node) {
        if (node == null) return 0;
        int l = checkHeight(node.left);
        if (l == -1) return -1;
        int r = checkHeight(node.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return Math.max(l, r) + 1;
    }
}`,
        timeComplexity: 'O(n) - Single bottom-up pass',
        spaceComplexity: 'O(h) - Call stack height',
        explanation: 'Bottom-up checking returns -1 immediately upon detecting an imbalance, avoiding the O(n^2) repeated top-down height computations.'
      }
    }
  },
  {
    id: '112',
    lcNumber: 112,
    title: 'Path Sum',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/path-sum/'
  },
  {
    id: '572',
    lcNumber: 572,
    title: 'Subtree of Another Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/subtree-of-another-tree/'
  },
  {
    id: '108',
    lcNumber: 108,
    title: 'Convert Sorted Array to Binary Search Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Binary Search Tree (BST) validation & properties',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/'
  },
  {
    id: '199',
    lcNumber: 199,
    title: 'Binary Tree Right Side View',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'BFS Level Order Traversal with Queue',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/binary-tree-right-side-view/',
    hints: {
      hint1: 'BFS Level Order queue or reverse DFS (Root -> Right -> Left).',
      hint2: 'In BFS, the last node of each level queue is visible from the right side. In DFS, visit right child first and record when depth == res.size().',
      hint3: `// if (depth == res.size()) res.add(node.val);
// dfs(node.right, depth + 1); dfs(node.left, depth + 1);`,
      hint4: {
        javaSolution: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, 0, res);
        return res;
    }
    private void dfs(TreeNode node, int depth, List<Integer> res) {
        if (node == null) return;
        if (depth == res.size()) res.add(node.val);
        dfs(node.right, depth + 1, res);
        dfs(node.left, depth + 1, res);
    }
}`,
        timeComplexity: 'O(n) - Single DFS traversal',
        spaceComplexity: 'O(h) - Stack space bounded by height',
        explanation: 'Visiting right subtrees before left subtrees guarantees that the first node encountered at each depth level is the rightmost visible node.'
      }
    }
  },
  {
    id: '230',
    lcNumber: 230,
    title: 'Kth Smallest Element in a BST',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'Binary Search Tree (BST) validation & properties',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    hints: {
      hint1: 'In-order traversal yields strictly ascending order.',
      hint2: 'Perform in-order traversal (Left, Root, Right). Decrement k at each visited node; when k reaches 0, you found the k-th smallest element.',
      hint3: `// inorder(node.left);
// if (--k == 0) { ans = node.val; return; }
// inorder(node.right);`,
      hint4: {
        javaSolution: `class Solution {
    private int count = 0, res = -1;
    public int kthSmallest(TreeNode root, int k) {
        count = k;
        inorder(root);
        return res;
    }
    private void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (--count == 0) { res = node.val; return; }
        inorder(node.right);
    }
}`,
        timeComplexity: 'O(h + k) - Stops immediately upon reaching the k-th node',
        spaceComplexity: 'O(h) - Stack depth',
        explanation: 'BST in-order traversal visits nodes in sorted order, so stopping at the k-th element finds the answer without inspecting the entire tree.'
      }
    }
  },
  {
    id: '235',
    lcNumber: 235,
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'Lowest Common Ancestor (LCA) & Tree Diameter',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    hints: {
      hint1: 'BST Value Splitting Property.',
      hint2: 'If both p and q are less than root.val, go left. If both are greater, go right. The split point where p <= root.val <= q is the LCA.',
      hint3: `// if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);
// else if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);
// else return root;`,
      hint4: {
        javaSolution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) root = root.left;
            else if (p.val > root.val && q.val > root.val) root = root.right;
            else return root;
        }
        return null;
    }
}`,
        timeComplexity: 'O(h) - Walks down a single path in the BST',
        spaceComplexity: 'O(1) - Iterative traversal using constant memory',
        explanation: 'Because values in a BST are strictly partitioned around each node, the first node that separates p and q must be their lowest common ancestor.'
      }
    }
  },
  {
    id: '103',
    lcNumber: 103,
    title: 'Binary Tree Zigzag Level Order Traversal',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'BFS Level Order Traversal with Queue',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/'
  },
  {
    id: '113',
    lcNumber: 113,
    title: 'Path Sum II',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/path-sum-ii/'
  },
  {
    id: '1448',
    lcNumber: 1448,
    title: 'Count Good Nodes in Binary Tree',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'DFS Tree Traversals (Recursive & Iterative)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/'
  },
  {
    id: '297',
    lcNumber: 297,
    title: 'Serialize and Deserialize Binary Tree',
    topicId: 'trees',
    difficulty: 'Hard',
    pattern: 'BFS Level Order Traversal with Queue',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    hints: {
      hint1: 'Pre-order DFS serialization with delimiter.',
      hint2: 'Serialize: Append node.val + \",\" or \"#,\" for null. Deserialize: Split string into Queue, poll elements and recursively construct root, left, right.',
      hint3: `// Serialize: sb.append(node.val).append(\",\"); dfs(node.left); dfs(node.right);
// Deserialize: poll from Queue, if \"#\" return null; create TreeNode and recurse.`,
      hint4: {
        javaSolution: `public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }
    private void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("#,"); return; }
        sb.append(node.val).append(",");
        buildString(node.left, sb);
        buildString(node.right, sb);
    }
    public TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(nodes);
    }
    private TreeNode buildTree(Queue<String> nodes) {
        String val = nodes.poll();
        if (val == null || val.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }
}`,
        timeComplexity: 'O(n) - Linear pass for serialization and deserialization',
        spaceComplexity: 'O(n) - String builder and token queue',
        explanation: 'Pre-order DFS recording null markers preserves unambiguous tree structure and enables recursive reconstruction.'
      }
    }
  },

  // ==========================================
  // TOPIC 12: HEAP (ADDITIONS)
  // ==========================================
  {
    id: '703',
    lcNumber: 703,
    title: 'Kth Largest Element in a Stream',
    topicId: 'heap',
    difficulty: 'Easy',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
    hints: {
      hint1: 'Min-Heap of capacity k.',
      hint2: 'Maintain PriorityQueue of size k. Add elements; if size > k, poll minimum. The top element is always the k-th largest.',
      hint3: `// pq.offer(val);
// if (pq.size() > k) pq.poll();
// return pq.peek();`,
      hint4: {
        javaSolution: `class KthLargest {
    private final PriorityQueue<Integer> pq = new PriorityQueue<>();
    private final int k;
    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int n : nums) add(n);
    }
    public int add(int val) {
        pq.offer(val);
        if (pq.size() > k) pq.poll();
        return pq.peek();
    }
}`,
        timeComplexity: 'O(log k) per add operation',
        spaceComplexity: 'O(k) - Min-heap storing only k items',
        explanation: 'Retaining the top k elements in a min-heap guarantees that the minimum in the heap is the k-th largest element seen so far.'
      }
    }
  },
  {
    id: '1337',
    lcNumber: 1337,
    title: 'The K Weakest Rows in a Matrix',
    topicId: 'heap',
    difficulty: 'Easy',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/'
  },
  {
    id: '973',
    lcNumber: 973,
    title: 'K Closest Points to Origin',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/k-closest-points-to-origin/',
    hints: {
      hint1: 'Max-Heap of size k storing squared Euclidean distances.',
      hint2: 'Maintain a max-heap of capacity k based on dist = x^2 + y^2. If heap exceeds k, poll the furthest point.',
      hint3: `// PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));
// for (p : points) { maxHeap.offer(p); if (maxHeap.size() > k) maxHeap.poll(); }`,
      hint4: {
        javaSolution: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])
        );
        for (int[] p : points) {
            maxHeap.offer(p);
            if (maxHeap.size() > k) maxHeap.poll();
        }
        int[][] res = new int[k][2];
        for (int i = 0; i < k; i++) res[i] = maxHeap.poll();
        return res;
    }
}`,
        timeComplexity: 'O(n log k) - Inserting n elements into heap of size k',
        spaceComplexity: 'O(k) - Max-heap storing k points',
        explanation: 'Maintaining a max-heap of size k continuously ejects points that are further away, leaving only the k closest points.'
      }
    }
  },
  {
    id: '378',
    lcNumber: 378,
    title: 'Kth Smallest Element in a Sorted Matrix',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'K-way Merge of Sorted Lists',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/'
  },
  {
    id: '373',
    lcNumber: 373,
    title: 'Find K Pairs with Smallest Sums',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'K-way Merge of Sorted Lists',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/'
  },
  {
    id: '1642',
    lcNumber: 1642,
    title: 'Furthest Building You Can Reach',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Custom PriorityQueue with comparator',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/furthest-building-you-can-reach/'
  },
  {
    id: '1834',
    lcNumber: 1834,
    title: 'Single-Threaded CPU',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Custom PriorityQueue with comparator',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/single-threaded-cpu/'
  },
  {
    id: '692',
    lcNumber: 692,
    title: 'Top K Frequent Words',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/top-k-frequent-words/',
    hints: {
      hint1: 'Frequency Map + Min-Heap with custom tiebreaker comparator.',
      hint2: 'Build word count map. Use a min-heap of size k where lesser frequencies are polled first, and alphabetical ties are reversed.',
      hint3: `// PriorityQueue<String> pq = new PriorityQueue<>((a, b) ->
//   map.get(a).equals(map.get(b)) ? b.compareTo(a) : map.get(a) - map.get(b));`,
      hint4: {
        javaSolution: `class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> count = new HashMap<>();
        for (String w : words) count.put(w, count.getOrDefault(w, 0) + 1);
        PriorityQueue<String> pq = new PriorityQueue<>(
            (a, b) -> count.get(a).equals(count.get(b)) ? b.compareTo(a) : count.get(a) - count.get(b)
        );
        for (String w : count.keySet()) {
            pq.offer(w);
            if (pq.size() > k) pq.poll();
        }
        List<String> res = new ArrayList<>();
        while (!pq.isEmpty()) res.add(pq.poll());
        Collections.reverse(res);
        return res;
    }
}`,
        timeComplexity: 'O(n log k) - Maintaining heap of size k across n words',
        spaceComplexity: 'O(n) - Frequency map and heap storage',
        explanation: 'Min-heap retains the top k frequent words while the tiebreaker comparator maintains alphabetical order for words with identical counts.'
      }
    }
  },
  {
    id: '1985',
    lcNumber: 1985,
    title: 'Find the Kth Largest Integer in the Array',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Top K Elements (Min-Heap of size k for K-th largest)',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/'
  },
  {
    id: '502',
    lcNumber: 502,
    title: 'IPO',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'Two Heaps (Median of a Running Data Stream)',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/ipo/'
  },
  {
    id: '218',
    lcNumber: 218,
    title: 'The Skyline Problem',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'Custom PriorityQueue with comparator',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/the-skyline-problem/'
  }
];
