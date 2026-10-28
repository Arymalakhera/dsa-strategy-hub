/**
 * Batch 2 Problem Definitions
 * Topics: strings, binary-search, stack-queue, sorting-intervals
 */

export const BATCH_2_PROBLEMS = [
  // ==========================================
  // TOPIC 5: STRINGS (ADDITIONS)
  // ==========================================
  {
    id: '13',
    lcNumber: 13,
    title: 'Roman to Integer',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'String parsing & tokenization',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/roman-to-integer/',
    hints: {
      hint1: 'Lookahead comparison or right-to-left scan.',
      hint2: 'If current numeral value is less than the next numeral value, subtract it; otherwise add it.',
      hint3: `// for (int i = 0; i < s.length(); i++) {
//     if (i + 1 < s.length() && val(s[i]) < val(s[i+1])) res -= val(s[i]);
//     else res += val(s[i]);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int romanToInt(String s) {
        int res = 0, prev = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            int cur = value(s.charAt(i));
            if (cur < prev) res -= cur;
            else res += cur;
            prev = cur;
        }
        return res;
    }
    private int value(char c) {
        switch (c) {
            case 'I': return 1; case 'V': return 5;
            case 'X': return 10; case 'L': return 50;
            case 'C': return 100; case 'D': return 500;
            case 'M': return 1000; default: return 0;
        }
    }
}`,
        timeComplexity: 'O(n) - Single pass through string',
        spaceComplexity: 'O(1) - Constant auxiliary lookup',
        explanation: 'Iterating right-to-left simplifies parsing because subtractive pairs are recognized immediately whenever a smaller value appears before a larger one.'
      }
    }
  },
  {
    id: '387',
    lcNumber: 387,
    title: 'First Unique Character in a String',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'Anagram matching & frequency counting',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/first-unique-character-in-a-string/',
    hints: {
      hint1: 'Two-pass frequency array of size 26.',
      hint2: 'First pass counts character frequencies. Second pass returns the first index with frequency == 1.',
      hint3: `// int[] count = new int[26];
// for (char c : s.toCharArray()) count[c - 'a']++;
// for (int i = 0; i < s.length(); i++) if (count[s.charAt(i) - 'a'] == 1) return i;`,
      hint4: {
        javaSolution: `class Solution {
    public int firstUniqChar(String s) {
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) count[s.charAt(i) - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (count[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}`,
        timeComplexity: 'O(n) - Two linear passes',
        spaceComplexity: 'O(1) - Fixed 26-element array',
        explanation: 'Counting character frequencies in a fixed array provides instant lookups to identify the first unique character.'
      }
    }
  },
  {
    id: '28',
    lcNumber: 28,
    title: 'Find the Index of the First Occurrence in a String',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'String parsing & tokenization',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
    hints: {
      hint1: 'Sliding window substring matching.',
      hint2: 'Check if needle matches the window of length needle.length() starting at index i in haystack.',
      hint3: `// for (int i = 0; i <= h - n; i++) {
//     if (haystack.substring(i, i + n).equals(needle)) return i;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int strStr(String haystack, String needle) {
        int h = haystack.length(), n = needle.length();
        for (int i = 0; i <= h - n; i++) {
            if (haystack.substring(i, i + n).equals(needle)) return i;
        }
        return -1;
    }
}`,
        timeComplexity: 'O((h - n + 1) * n) - Substring match at each position',
        spaceComplexity: 'O(1) - In-place comparison',
        explanation: 'Scanning valid start positions and verifying character matches finds the first occurrence without external memory.'
      }
    }
  },
  {
    id: '58',
    lcNumber: 58,
    title: 'Length of Last Word',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'String parsing & tokenization',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/length-of-last-word/'
  },
  {
    id: '647',
    lcNumber: 647,
    title: 'Palindromic Substrings',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Two-Pointer palindrome / reversal',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/palindromic-substrings/',
    hints: {
      hint1: 'Expand Around Center.',
      hint2: 'Every palindrome centers at either a single character or between two characters. Expand outwards while matching.',
      hint3: `// for (int i = 0; i < n; i++) {
//     ans += countFromCenter(s, i, i);
//     ans += countFromCenter(s, i, i + 1);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += expand(s, i, i);
            count += expand(s, i, i + 1);
        }
        return count;
    }
    private int expand(String s, int l, int r) {
        int cnt = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            cnt++; l--; r++;
        }
        return cnt;
    }
}`,
        timeComplexity: 'O(n^2) - 2n - 1 center expansions taking up to O(n) each',
        spaceComplexity: 'O(1) - Constant auxiliary memory',
        explanation: 'Expanding around 2n - 1 potential centers identifies all palindrome substrings without allocating a 2D DP matrix.'
      }
    }
  },
  {
    id: '43',
    lcNumber: 43,
    title: 'Multiply Strings',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'String parsing & tokenization',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/multiply-strings/'
  },
  {
    id: '165',
    lcNumber: 165,
    title: 'Compare Version Numbers',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'String parsing & tokenization',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/compare-version-numbers/'
  },
  {
    id: '12',
    lcNumber: 12,
    title: 'Integer to Roman',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'String parsing & tokenization',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/integer-to-roman/'
  },
  {
    id: '68',
    lcNumber: 68,
    title: 'Text Justification',
    topicId: 'strings',
    difficulty: 'Hard',
    pattern: 'String parsing & tokenization',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/text-justification/'
  },

  // ==========================================
  // TOPIC 6: BINARY SEARCH (ADDITIONS)
  // ==========================================
  {
    id: '35',
    lcNumber: 35,
    title: 'Search Insert Position',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Classic Binary Search on sorted array',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/search-insert-position/',
    hints: {
      hint1: 'Binary Search lower bound.',
      hint2: 'Standard binary search. If target not found, left pointer points to insertion index.',
      hint3: `// while (l <= r) {
//     int m = l + (r - l) / 2;
//     if (nums[m] == target) return m;
//     else if (nums[m] < target) l = m + 1;
//     else r = m - 1;
// }
// return l;`,
      hint4: {
        javaSolution: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) return m;
            if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return l;
    }
}`,
        timeComplexity: 'O(log n) - Halves search interval at each step',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'When l crosses r, l points precisely to the smallest index where nums[l] >= target, which is the correct insertion index.'
      }
    }
  },
  {
    id: '278',
    lcNumber: 278,
    title: 'First Bad Version',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Lower Bound & Upper Bound / First & Last Occurrence',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/first-bad-version/',
    hints: {
      hint1: 'Binary search on monotonic boolean predicate.',
      hint2: 'If isBadVersion(mid) is true, first bad version is <= mid (r = mid). Otherwise it is > mid (l = mid + 1).',
      hint3: `// while (l < r) {
//     int m = l + (r - l) / 2;
//     if (isBadVersion(m)) r = m;
//     else l = m + 1;
// }`,
      hint4: {
        javaSolution: `/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */
public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int l = 1, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (isBadVersion(m)) r = m;
            else l = m + 1;
        }
        return l;
    }
}`,
        timeComplexity: 'O(log n) - Logarithmic search on versions',
        spaceComplexity: 'O(1) - Constant space',
        explanation: 'Because every version following a bad version is also bad, the condition is monotonic, allowing lower-bound binary search.'
      }
    }
  },
  {
    id: '69',
    lcNumber: 69,
    title: 'Sqrt(x)',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Binary Search on Answer Space (Predicate/Feasibility function f(mid))',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/sqrtx/',
    hints: {
      hint1: 'Binary search on integer range [1, x].',
      hint2: 'Find largest integer m such that m <= x / m to prevent 32-bit overflow.',
      hint3: `// while (l <= r) {
//     int m = l + (r - l) / 2;
//     if (m <= x / m) { ans = m; l = m + 1; }
//     else r = m - 1;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int mySqrt(int x) {
        if (x < 2) return x;
        int l = 1, r = x / 2, ans = 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (m <= x / m) {
                ans = m;
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return ans;
    }
}`,
        timeComplexity: 'O(log x) - Search range halved each iteration',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Integer division m <= x / m avoids 32-bit integer overflow and binary searches for the largest integer whose square is <= x.'
      }
    }
  },
  {
    id: '367',
    lcNumber: 367,
    title: 'Valid Perfect Square',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Binary Search on Answer Space (Predicate/Feasibility function f(mid))',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/valid-perfect-square/'
  },
  {
    id: '74',
    lcNumber: 74,
    title: 'Search a 2D Matrix',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Classic Binary Search on sorted array',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/search-a-2d-matrix/',
    hints: {
      hint1: 'Virtual 1D array binary search.',
      hint2: 'Map index mid to matrix[mid / n][mid % n] and perform standard binary search over range [0, m * n - 1].',
      hint3: `// int m = l + (r - l) / 2;
// int val = matrix[m / n][m % n];
// if (val == target) return true;
// else if (val < target) l = m + 1; else r = m - 1;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int l = 0, r = m * n - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            if (val < target) l = mid + 1;
            else r = mid - 1;
        }
        return false;
    }
}`,
        timeComplexity: 'O(log(m * n)) - Standard binary search on flattened size',
        spaceComplexity: 'O(1) - Constant coordinate mapping math',
        explanation: 'Because every row is sorted and strictly greater than the preceding row, mapping 1D index mid to 2D coordinates provides logarithmic search.'
      }
    }
  },
  {
    id: '240',
    lcNumber: 240,
    title: 'Search a 2D Matrix II',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Classic Binary Search on sorted array',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/search-a-2d-matrix-ii/'
  },
  {
    id: '162',
    lcNumber: 162,
    title: 'Find Peak Element',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Rotated Sorted Array',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/find-peak-element/',
    hints: {
      hint1: 'Binary search following upward gradient slope.',
      hint2: 'If nums[mid] < nums[mid + 1], a peak must lie to the right (l = mid + 1). Otherwise, mid or an element to the left is a peak (r = mid).',
      hint3: `// while (l < r) {
//     int m = l + (r - l) / 2;
//     if (nums[m] < nums[m + 1]) l = m + 1;
//     else r = m;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] < nums[m + 1]) l = m + 1;
            else r = m;
        }
        return l;
    }
}`,
        timeComplexity: 'O(log n) - Search space halved at each step',
        spaceComplexity: 'O(1) - Constant space',
        explanation: 'Moving in the direction of the strictly larger neighbor guarantees arriving at a local peak because out-of-bounds ends are negative infinity.'
      }
    }
  },
  {
    id: '154',
    lcNumber: 154,
    title: 'Find Minimum in Rotated Sorted Array II',
    topicId: 'binary-search',
    difficulty: 'Hard',
    pattern: 'Binary Search on Rotated Sorted Array',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/'
  },
  {
    id: '4',
    lcNumber: 4,
    title: 'Median of Two Sorted Arrays',
    topicId: 'binary-search',
    difficulty: 'Hard',
    pattern: 'Binary Search on Answer Space (Predicate/Feasibility function f(mid))',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    hints: {
      hint1: 'Binary search on partition boundary of smaller array.',
      hint2: 'Partition nums1 and nums2 such that left partition has (m + n + 1) / 2 elements. Ensure maxLeft1 <= minRight2 and maxLeft2 <= minRight1.',
      hint3: `// Binary search partition cut i in nums1 [0, m], cut j = (m + n + 1) / 2 - i;
// Adjust i left or right until cross-boundary conditions hold.`,
      hint4: {
        javaSolution: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int l = 0, r = m;
        while (l <= r) {
            int i = l + (r - l) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
                } else {
                    return Math.max(maxLeft1, maxLeft2);
                }
            } else if (maxLeft1 > minRight2) r = i - 1;
            else l = i + 1;
        }
        return 0.0;
    }
}`,
        timeComplexity: 'O(log(min(m, n))) - Binary search on smaller array',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'Partitioning both arrays such that left halves equal total elements / 2 allows finding the median in logarithmic time without merging.'
      }
    }
  },

  // ==========================================
  // TOPIC 7: STACK + QUEUE (ADDITIONS)
  // ==========================================
  {
    id: '225',
    lcNumber: 225,
    title: 'Implement Stack using Queues',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Min/Max Stack design with O(1) operations',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/implement-stack-using-queues/'
  },
  {
    id: '1047',
    lcNumber: 1047,
    title: 'Remove All Adjacent Duplicates In String',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/',
    hints: {
      hint1: 'Stack or StringBuilder as character accumulator.',
      hint2: 'Iterate over string. If top of stack matches current character, pop; otherwise push. Remaining characters form the answer.',
      hint3: `// StringBuilder sb = new StringBuilder();
// for (char c : s.toCharArray()) {
//     int len = sb.length();
//     if (len > 0 && sb.charAt(len - 1) == c) sb.deleteCharAt(len - 1);
//     else sb.append(c);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public String removeDuplicates(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = sb.length();
            if (len > 0 && sb.charAt(len - 1) == c) {
                sb.deleteCharAt(len - 1);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}`,
        timeComplexity: 'O(n) - Single pass over string',
        spaceComplexity: 'O(n) - Output string builder',
        explanation: 'Using a StringBuilder as a LIFO stack cancels out matching adjacent pairs in linear time.'
      }
    }
  },
  {
    id: '71',
    lcNumber: 71,
    title: 'Simplify Path',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/simplify-path/'
  },
  {
    id: '394',
    lcNumber: 394,
    title: 'Decode String',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/decode-string/',
    hints: {
      hint1: 'Two Stacks for nested repeats.',
      hint2: 'Push repeat count to countStack and running string to strStack on \'[\'. On \']\', pop multiplier and append repeated substring to previous string.',
      hint3: `// on '[': countStack.push(k); strStack.push(curStr);
// on ']': curStr = strStack.pop() + curStr.repeat(countStack.pop());`,
      hint4: {
        javaSolution: `class Solution {
    public String decodeString(String s) {
        Stack<Integer> countStack = new Stack<>();
        Stack<StringBuilder> strStack = new Stack<>();
        StringBuilder cur = new StringBuilder();
        int k = 0;
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                k = k * 10 + (c - '0');
            } else if (c == '[') {
                countStack.push(k);
                strStack.push(cur);
                cur = new StringBuilder();
                k = 0;
            } else if (c == ']') {
                StringBuilder decoded = strStack.pop();
                int repeat = countStack.pop();
                for (int i = 0; i < repeat; i++) decoded.append(cur);
                cur = decoded;
            } else {
                cur.append(c);
            }
        }
        return cur.toString();
    }
}`,
        timeComplexity: 'O(maxK * n) - Proportional to length of decoded string',
        spaceComplexity: 'O(n) - Stack depth proportional to bracket nesting',
        explanation: 'Stacking intermediate strings and multipliers preserves context across nested brackets.'
      }
    }
  },
  {
    id: '503',
    lcNumber: 503,
    title: 'Next Greater Element II',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack (Next Greater / Previous Smaller Element)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/next-greater-element-ii/'
  },
  {
    id: '901',
    lcNumber: 901,
    title: 'Online Stock Span',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack (Next Greater / Previous Smaller Element)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/online-stock-span/',
    hints: {
      hint1: 'Monotonic Decreasing Stack storing [price, span].',
      hint2: 'When next(price) is called, pop all entries <= price and sum their spans. Push [price, combinedSpan].',
      hint3: `// int span = 1;
// while (!st.isEmpty() && st.peek()[0] <= price) span += st.pop()[1];
// st.push(new int[]{price, span});
// return span;`,
      hint4: {
        javaSolution: `class StockSpanner {
    private final Stack<int[]> stack = new Stack<>();
    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[]{price, span});
        return span;
    }
}`,
        timeComplexity: 'O(1) amortized per call - Each element pushed and popped at most once',
        spaceComplexity: 'O(n) - Monotonic stack of price-span pairs',
        explanation: 'Collapsing smaller historical prices into accumulated span counters guarantees each price is popped at most once.'
      }
    }
  },
  {
    id: '853',
    lcNumber: 853,
    title: 'Car Fleet',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/car-fleet/',
    hints: {
      hint1: 'Sort by position descending + Monotonic arrival times.',
      hint2: 'Compute time to destination = (target - position) / speed. A trailing car with <= arrival time catches up and merges into the fleet ahead.',
      hint3: `// Sort cars by position descending.
// If time > prevFleetTime, new fleet forms and prevFleetTime = time;`,
      hint4: {
        javaSolution: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        double[][] cars = new double[n][2];
        for (int i = 0; i < n; i++) {
            cars[i][0] = position[i];
            cars[i][1] = (double)(target - position[i]) / speed[i];
        }
        Arrays.sort(cars, (a, b) -> Double.compare(b[0], a[0]));
        int fleets = 0;
        double maxTime = 0.0;
        for (int i = 0; i < n; i++) {
            if (cars[i][1] > maxTime) {
                fleets++;
                maxTime = cars[i][1];
            }
        }
        return fleets;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting cars by position',
        spaceComplexity: 'O(n) - Auxiliary array for car states',
        explanation: 'Processing cars from closest to destination backwards determines whether subsequent cars merge into the slower leader ahead.'
      }
    }
  },
  {
    id: '227',
    lcNumber: 227,
    title: 'Basic Calculator II',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/basic-calculator-ii/'
  },
  {
    id: '402',
    lcNumber: 402,
    title: 'Remove K Digits',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Stack (Next Greater / Previous Smaller Element)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/remove-k-digits/'
  },
  {
    id: '85',
    lcNumber: 85,
    title: 'Maximal Rectangle',
    topicId: 'stack-queue',
    difficulty: 'Hard',
    pattern: 'Monotonic Stack (Next Greater / Previous Smaller Element)',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/maximal-rectangle/',
    hints: {
      hint1: 'Row-wise Histogram Reduction + Monotonic Stack.',
      hint2: 'Accumulate consecutive \'1\'s as heights across each row. On each row, call Largest Rectangle in Histogram.',
      hint3: `// for (row : matrix) {
//     update heights[j] = (row[j] == '1') ? heights[j] + 1 : 0;
//     maxArea = Math.max(maxArea, largestRectangleArea(heights));
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int m = matrix.length, n = matrix[0].length;
        int[] heights = new int[n];
        int maxArea = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                heights[j] = (matrix[i][j] == '1') ? heights[j] + 1 : 0;
            }
            maxArea = Math.max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }
    private int largestRectangleArea(int[] heights) {
        Stack<Integer> st = new Stack<>();
        int max = 0, n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.isEmpty() && h < heights[st.peek()]) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                max = Math.max(max, height * width);
            }
            st.push(i);
        }
        return max;
    }
}`,
        timeComplexity: 'O(m * n) - Evaluates n-width histogram for each of m rows',
        spaceComplexity: 'O(n) - Heights array and monotonic stack',
        explanation: 'Treating each matrix row as the base of a histogram turns the 2D problem into m single-pass monotonic stack evaluations.'
      }
    }
  },
  {
    id: '224',
    lcNumber: 224,
    title: 'Basic Calculator',
    topicId: 'stack-queue',
    difficulty: 'Hard',
    pattern: 'Parentheses matching & expression evaluation',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/basic-calculator/'
  },

  // ==========================================
  // TOPIC 8: SORTING + INTERVALS (ADDITIONS)
  // ==========================================
  {
    id: '905',
    lcNumber: 905,
    title: 'Sort Array By Parity',
    topicId: 'sorting-intervals',
    difficulty: 'Easy',
    pattern: 'Custom Comparator Sorting',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/sort-array-by-parity/'
  },
  {
    id: '922',
    lcNumber: 922,
    title: 'Sort Array By Parity II',
    topicId: 'sorting-intervals',
    difficulty: 'Easy',
    pattern: 'Custom Comparator Sorting',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/sort-array-by-parity-ii/'
  },
  {
    id: '252',
    lcNumber: 252,
    title: 'Meeting Rooms',
    topicId: 'sorting-intervals',
    difficulty: 'Easy',
    pattern: 'Insert Interval & Meeting Rooms',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/meeting-rooms/',
    hints: {
      hint1: 'Sort intervals by start time.',
      hint2: 'Sort by start time, then verify if intervals[i][0] < intervals[i - 1][1]. Any overlap means a person cannot attend all meetings.',
      hint3: `// Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
// for (int i = 1; i < intervals.length; i++) {
//     if (intervals[i][0] < intervals[i - 1][1]) return false;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting intervals by start time',
        spaceComplexity: 'O(1) - In-place comparison after sort',
        explanation: 'Sorting by start time ensures any overlapping meetings will be adjacent in the sorted array.'
      }
    }
  },
  {
    id: '912',
    lcNumber: 912,
    title: 'Sort an Array',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparator Sorting',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/sort-an-array/',
    hints: {
      hint1: 'Divide and Conquer with Merge Sort.',
      hint2: 'Recursively divide array in half, sort both halves, and merge sorted halves with two pointers.',
      hint3: `// mergeSort(nums, l, m); mergeSort(nums, m + 1, r); merge(nums, l, m, r);`,
      hint4: {
        javaSolution: `class Solution {
    public int[] sortArray(int[] nums) {
        mergeSort(nums, 0, nums.length - 1, new int[nums.length]);
        return nums;
    }
    private void mergeSort(int[] nums, int l, int r, int[] temp) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(nums, l, m, temp);
        mergeSort(nums, m + 1, r, temp);
        merge(nums, l, m, r, temp);
    }
    private void merge(int[] nums, int l, int m, int r, int[] temp) {
        int i = l, j = m + 1, k = l;
        while (i <= m && j <= r) {
            if (nums[i] <= nums[j]) temp[k++] = nums[i++];
            else temp[k++] = nums[j++];
        }
        while (i <= m) temp[k++] = nums[i++];
        while (j <= r) temp[k++] = nums[j++];
        for (i = l; i <= r; i++) nums[i] = temp[i];
    }
}`,
        timeComplexity: 'O(n log n) - Stable divide and conquer',
        spaceComplexity: 'O(n) - Temporary buffer for merging',
        explanation: 'Merge sort guarantees O(n log n) worst-case time without risk of O(n^2) degradation on adversarial test cases.'
      }
    }
  },
  {
    id: '179',
    lcNumber: 179,
    title: 'Largest Number',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparator Sorting',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/largest-number/',
    hints: {
      hint1: 'Custom String Concatenation Comparator.',
      hint2: 'Convert numbers to strings. Sort using (b + a).compareTo(a + b). If highest element is "0", return "0".',
      hint3: `// Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
// if (strs[0].equals("0")) return "0";`,
      hint4: {
        javaSolution: `class Solution {
    public String largestNumber(int[] nums) {
        String[] strs = new String[nums.length];
        for (int i = 0; i < nums.length; i++) strs[i] = String.valueOf(nums[i]);
        Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));
        if (strs[0].equals("0")) return "0";
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s);
        return sb.toString();
    }
}`,
        timeComplexity: 'O(n log n * k) - Sorting n strings of length k',
        spaceComplexity: 'O(n) - String representations of numbers',
        explanation: 'Sorting strings based on which concatenated pair (b+a vs a+b) is numerically greater establishes a total ordering that produces the maximum number.'
      }
    }
  },
  {
    id: '148',
    lcNumber: 148,
    title: 'Sort List',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparator Sorting',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/sort-list/',
    hints: {
      hint1: 'Merge Sort on Linked List using Fast & Slow pointers.',
      hint2: 'Split list into two halves with runner pointers. Recursively sort each half and merge sorted lists.',
      hint3: `// ListNode mid = getMid(head);
// ListNode right = sortList(mid.next);
// mid.next = null;
// ListNode left = sortList(head);
// return merge(left, right);`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode prev = null, slow = head, fast = head;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null;
        ListNode left = sortList(head);
        ListNode right = sortList(slow);
        return merge(left, right);
    }
    private ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0), cur = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }
            else { cur.next = l2; l2 = l2.next; }
            cur = cur.next;
        }
        if (l1 != null) cur.next = l1;
        if (l2 != null) cur.next = l2;
        return dummy.next;
    }
}`,
        timeComplexity: 'O(n log n) - Recursive halving and merging',
        spaceComplexity: 'O(log n) - Stack depth for recursive calls',
        explanation: 'Merge sort is optimal for linked lists because merging two sorted linked lists requires O(1) auxiliary pointer operations.'
      }
    }
  },
  {
    id: '1288',
    lcNumber: 1288,
    title: 'Remove Covered Intervals',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Merge Overlapping Intervals',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/remove-covered-intervals/'
  },
  {
    id: '274',
    lcNumber: 274,
    title: 'H-Index',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Custom Comparator Sorting',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/h-index/'
  },
  {
    id: '493',
    lcNumber: 493,
    title: 'Reverse Pairs',
    topicId: 'sorting-intervals',
    difficulty: 'Hard',
    pattern: 'Custom Comparator Sorting',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/reverse-pairs/'
  },
  {
    id: '315',
    lcNumber: 315,
    title: 'Count of Smaller Numbers After Self',
    topicId: 'sorting-intervals',
    difficulty: 'Hard',
    pattern: 'Custom Comparator Sorting',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/'
  }
];
