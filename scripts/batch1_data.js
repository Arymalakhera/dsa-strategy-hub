/**
 * Batch 1 Problem Definitions
 * Topics: arrays, two-pointers, sliding-window (additions), hashing-prefix-sum (additions)
 */

export const BATCH_1_PROBLEMS = [
  // ==========================================
  // TOPIC 1: ARRAYS
  // ==========================================
  {
    id: '1929',
    lcNumber: 1929,
    title: 'Concatenation of Array',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/concatenation-of-array/'
  },
  {
    id: '217',
    lcNumber: 217,
    title: 'Contains Duplicate',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/contains-duplicate/',
    hints: {
      hint1: 'Hash Set membership lookup to detect repeated elements.',
      hint2: 'Iterate through the array and insert each element into a HashSet. If an element is already present, return true.',
      hint3: `// Set<Integer> seen = new HashSet<>();
// for (int num : nums) {
//     if (!seen.add(num)) return true;
// }
// return false;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) return true;
        }
        return false;
    }
}`,
        timeComplexity: 'O(n) - Single pass over array',
        spaceComplexity: 'O(n) - Hash set storing up to n unique elements',
        explanation: 'A HashSet provides O(1) average lookup and insertion, allowing detection of duplicates in a single linear pass.'
      }
    }
  },
  {
    id: '26',
    lcNumber: 26,
    title: 'Remove Duplicates from Sorted Array',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
    hints: {
      hint1: 'Two Pointers in-place array overwrite.',
      hint2: 'Maintain write pointer j for unique elements. If nums[i] != nums[j], increment j and assign nums[j] = nums[i].',
      hint3: `// int j = 0;
// for (int i = 1; i < nums.length; i++) {
//     if (nums[i] != nums[j]) nums[++j] = nums[i];
// }
// return j + 1;`,
      hint4: {
        javaSolution: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int write = 0;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write]) {
                nums[++write] = nums[read];
            }
        }
        return write + 1;
    }
}`,
        timeComplexity: 'O(n) - Single pass through the array',
        spaceComplexity: 'O(1) - Constant extra space in-place',
        explanation: 'Because the array is sorted, duplicates are consecutive. Advancing write pointer only on new distinct elements overwrites duplicates in-place.'
      }
    }
  },
  {
    id: '27',
    lcNumber: 27,
    title: 'Remove Element',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/remove-element/'
  },
  {
    id: '1920',
    lcNumber: 1920,
    title: 'Build Array from Permutation',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Infosys'],
    link: 'https://leetcode.com/problems/build-array-from-permutation/'
  },
  {
    id: '169',
    lcNumber: 169,
    title: 'Majority Element',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Flipkart'],
    link: 'https://leetcode.com/problems/majority-element/',
    hints: {
      hint1: 'Boyer-Moore Voting Algorithm.',
      hint2: 'Maintain candidate and count. If count is 0, pick current element. Increment count if same, decrement if different.',
      hint3: `// int count = 0, candidate = 0;
// for (int num : nums) {
//     if (count == 0) candidate = num;
//     count += (num == candidate) ? 1 : -1;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant auxiliary variables',
        explanation: 'Since the majority element occurs more than n/2 times, its count will always cancel out all minority votes and prevail.'
      }
    }
  },
  {
    id: '118',
    lcNumber: 118,
    title: "Pascal's Triangle",
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/pascals-triangle/'
  },
  {
    id: '448',
    lcNumber: 448,
    title: 'Find All Numbers Disappeared in an Array',
    topicId: 'arrays',
    difficulty: 'Easy',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/'
  },
  {
    id: '238',
    lcNumber: 238,
    title: 'Product of Array Except Self',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Prefix & Suffix Products without Division',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/product-of-array-except-self/',
    hints: {
      hint1: 'Prefix and Suffix Cumulative Products without division.',
      hint2: 'First pass computes prefix products into output array. Second pass multiplies running suffix product backwards.',
      hint3: `// res[0] = 1; for (i = 1 to n-1) res[i] = res[i-1] * nums[i-1];
// int suffix = 1; for (i = n-1 down to 0) { res[i] *= suffix; suffix *= nums[i]; }`,
      hint4: {
        javaSolution: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
}`,
        timeComplexity: 'O(n) - Two linear scans',
        spaceComplexity: 'O(1) - Constant auxiliary space excluding output array',
        explanation: 'Each element res[i] equals the product of everything to its left multiplied by everything to its right.'
      }
    }
  },
  {
    id: '189',
    lcNumber: 189,
    title: 'Rotate Array',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/rotate-array/',
    hints: {
      hint1: 'Three-step Array Reversal.',
      hint2: 'Reverse entire array, reverse first k elements, then reverse remaining n - k elements.',
      hint3: `// k %= n;
// reverse(nums, 0, n - 1);
// reverse(nums, 0, k - 1);
// reverse(nums, k, n - 1);`,
      hint4: {
        javaSolution: `class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int t = nums[l]; nums[l++] = nums[r]; nums[r--] = t;
        }
    }
}`,
        timeComplexity: 'O(n) - Three linear reversal passes',
        spaceComplexity: 'O(1) - In-place pointer swaps',
        explanation: 'Reversing shifts elements across the boundary; reversing the two segments restores their original relative ordering.'
      }
    }
  },
  {
    id: '48',
    lcNumber: 48,
    title: 'Rotate Image',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Matrix & 2D Array Transformations',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/rotate-image/',
    hints: {
      hint1: 'Matrix Transpose followed by Horizontal Reflection.',
      hint2: 'Transpose matrix along main diagonal (swap matrix[i][j] with matrix[j][i]), then reverse each row.',
      hint3: `// for (i < n) for (j < i) swap(matrix[i][j], matrix[j][i]);
// for (row : matrix) reverse(row);`,
      hint4: {
        javaSolution: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t;
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int t = matrix[i][j]; matrix[i][j] = matrix[i][n - 1 - j]; matrix[i][n - 1 - j] = t;
            }
        }
    }
}`,
        timeComplexity: 'O(n^2) - Every cell visited twice',
        spaceComplexity: 'O(1) - In-place matrix modification',
        explanation: 'A 90-degree clockwise rotation is geometrically identical to transposing the matrix across its diagonal and flipping each row horizontally.'
      }
    }
  },
  {
    id: '54',
    lcNumber: 54,
    title: 'Spiral Matrix',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Matrix & 2D Array Transformations',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/spiral-matrix/',
    hints: {
      hint1: 'Boundary Simulation with four pointers.',
      hint2: 'Maintain top, bottom, left, right bounds. Traverse top row, right col, bottom row, left col, shrinking bounds inward.',
      hint3: `// while (top <= bottom && left <= right) {
//     traverse top row; top++;
//     traverse right col; right--;
//     if (top <= bottom) { traverse bottom row; bottom--; }
//     if (left <= right) { traverse left col; left++; }
// }`,
      hint4: {
        javaSolution: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res.add(matrix[top][j]);
            top++;
            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.add(matrix[bottom][j]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
}`,
        timeComplexity: 'O(m * n) - Every cell processed exactly once',
        spaceComplexity: 'O(1) - Excluding output list',
        explanation: 'Contracting boundary pointers after traversing each edge guarantees clockwise spiral visitation without visited sets.'
      }
    }
  },
  {
    id: '73',
    lcNumber: 73,
    title: 'Set Matrix Zeroes',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Matrix & 2D Array Transformations',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/set-matrix-zeroes/',
    hints: {
      hint1: 'First Row and Column as In-Place Markers.',
      hint2: 'Use matrix[i][0] and matrix[0][j] as flag indicators. Track if first row and first column themselves need zeroes using two boolean flags.',
      hint3: `// 1. Check if firstRow/firstCol have 0
// 2. Mark markers in row 0 & col 0
// 3. Fill inner matrix from markers
// 4. Zero firstRow/firstCol if needed`,
      hint4: {
        javaSolution: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean firstCol = false, firstRow = false;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
        }
        if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
        if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
}`,
        timeComplexity: 'O(m * n) - Two passes over matrix',
        spaceComplexity: 'O(1) - Constant auxiliary variables in-place',
        explanation: 'Using the matrix outer boundary itself as status storage avoids allocating O(m + n) external boolean arrays.'
      }
    }
  },
  {
    id: '36',
    lcNumber: 36,
    title: 'Valid Sudoku',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Matrix & 2D Array Transformations',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/valid-sudoku/'
  },
  {
    id: '59',
    lcNumber: 59,
    title: 'Spiral Matrix II',
    topicId: 'arrays',
    difficulty: 'Medium',
    pattern: 'Matrix & 2D Array Transformations',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/spiral-matrix-ii/'
  },
  {
    id: '41',
    lcNumber: 41,
    title: 'First Missing Positive',
    topicId: 'arrays',
    difficulty: 'Hard',
    pattern: 'Basic Traversal & In-Place Manipulation',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/first-missing-positive/',
    hints: {
      hint1: 'Index as Hash Key (Cyclic Sort).',
      hint2: 'Place every positive number x in the range [1, n] at index x - 1 using swaps. Then find the first index i where nums[i] != i + 1.',
      hint3: `// while (nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {
//     swap(nums, i, nums[i] - 1);
// }
// Scan for first i where nums[i] != i + 1.`,
      hint4: {
        javaSolution: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int target = nums[i] - 1;
                int t = nums[i]; nums[i] = nums[target]; nums[target] = t;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
}`,
        timeComplexity: 'O(n) - Each element is placed in its target spot at most once',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'The first missing positive must lie in [1, n + 1]. Treating indices 0..n-1 as hash buckets for 1..n achieves O(1) space.'
      }
    }
  },

  // ==========================================
  // TOPIC 2: TWO POINTERS
  // ==========================================
  {
    id: '344',
    lcNumber: 344,
    title: 'Reverse String',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/reverse-string/',
    hints: {
      hint1: 'Two Pointers converging from left and right.',
      hint2: 'Initialize left = 0, right = s.length - 1. Swap characters while left < right.',
      hint3: `// while (left < right) {
//     char t = s[left]; s[left++] = s[right]; s[right--] = t;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char t = s[left];
            s[left++] = s[right];
            s[right--] = t;
        }
    }
}`,
        timeComplexity: 'O(n) - N/2 character swaps',
        spaceComplexity: 'O(1) - Constant auxiliary memory in-place',
        explanation: 'Two pointers meet at the center, swapping opposite characters until the entire sequence is inverted.'
      }
    }
  },
  {
    id: '345',
    lcNumber: 345,
    title: 'Reverse Vowels of a String',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/reverse-vowels-of-a-string/'
  },
  {
    id: '977',
    lcNumber: 977,
    title: 'Squares of a Sorted Array',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/squares-of-a-sorted-array/',
    hints: {
      hint1: 'Two Pointers comparing extremes.',
      hint2: 'Largest squares come from the greatest negative or greatest positive numbers. Fill output backwards from right to left.',
      hint3: `// while (left <= right) {
//     if (Math.abs(nums[left]) > Math.abs(nums[right])) res[p--] = nums[left] * nums[left++];
//     else res[p--] = nums[right] * nums[right--];
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int left = 0, right = n - 1, p = n - 1;
        while (left <= right) {
            int lVal = nums[left] * nums[left];
            int rVal = nums[right] * nums[right];
            if (lVal > rVal) {
                res[p--] = lVal;
                left++;
            } else {
                res[p--] = rVal;
                right--;
            }
        }
        return res;
    }
}`,
        timeComplexity: 'O(n) - Single pass filling result backwards',
        spaceComplexity: 'O(1) - Auxiliary space excluding output array',
        explanation: 'Because the original array is sorted, the largest squares are at the boundaries. Two pointers compare extremities and build the sorted result in linear time.'
      }
    }
  },
  {
    id: '283',
    lcNumber: 283,
    title: 'Move Zeroes',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Same Direction / Fast & Slow Runner (In-Place Duplicates)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/move-zeroes/',
    hints: {
      hint1: 'Fast and Slow Pointer in-place partitioning.',
      hint2: 'Fast pointer scans non-zero elements; slow pointer writes them forward. Fill remaining positions with zero.',
      hint3: `// int slow = 0;
// for (int num : nums) if (num != 0) nums[slow++] = num;
// while (slow < nums.length) nums[slow++] = 0;`,
      hint4: {
        javaSolution: `class Solution {
    public void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int t = nums[slow]; nums[slow] = nums[fast]; nums[fast] = t;
                slow++;
            }
        }
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant auxiliary memory in-place',
        explanation: 'Swapping non-zero elements into the slow pointer index preserves relative order of elements while shifting all zeroes to the end.'
      }
    }
  },
  {
    id: '88',
    lcNumber: 88,
    title: 'Merge Sorted Array',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/merge-sorted-array/',
    hints: {
      hint1: 'Three Pointers merging backwards from the end of nums1.',
      hint2: 'Start p1 at m - 1, p2 at n - 1, and p at m + n - 1. Place the larger of nums1[p1] and nums2[p2] at nums1[p].',
      hint3: `// while (p2 >= 0) {
//     if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
//     else nums1[p--] = nums2[p2--];
// }`,
      hint4: {
        javaSolution: `class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p--] = nums1[p1--];
            } else {
                nums1[p--] = nums2[p2--];
            }
        }
    }
}`,
        timeComplexity: 'O(m + n) - Linear pass through both arrays',
        spaceComplexity: 'O(1) - In-place using unused trailing capacity in nums1',
        explanation: 'Merging backwards into nums1 empty space prevents overwriting elements before they are compared.'
      }
    }
  },
  {
    id: '680',
    lcNumber: 680,
    title: 'Valid Palindrome II',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/valid-palindrome-ii/'
  },
  {
    id: '844',
    lcNumber: 844,
    title: 'Backspace String Compare',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/backspace-string-compare/'
  },
  {
    id: '1768',
    lcNumber: 1768,
    title: 'Merge Strings Alternately',
    topicId: 'two-pointers',
    difficulty: 'Easy',
    pattern: 'Same Direction / Fast & Slow Runner (In-Place Duplicates)',
    level: 'Beginner',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/merge-strings-alternately/'
  },
  {
    id: '167',
    lcNumber: 167,
    title: 'Two Sum II - Input Array Is Sorted',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    hints: {
      hint1: 'Converging Two Pointers on sorted array.',
      hint2: 'If sum < target, advance left. If sum > target, decrement right. Stop when sum == target.',
      hint3: `// while (left < right) {
//     int sum = numbers[left] + numbers[right];
//     if (sum == target) return new int[]{left + 1, right + 1};
//     else if (sum < target) left++;
//     else right--;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
        timeComplexity: 'O(n) - Single scan where pointers meet in <= n steps',
        spaceComplexity: 'O(1) - Constant auxiliary memory',
        explanation: 'Sorted order guarantees monotonicity: moving left increases sum; moving right decreases sum.'
      }
    }
  },
  {
    id: '15',
    lcNumber: 15,
    title: '3Sum',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Three Pointers (3Sum & Sorting Triplets)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/3sum/',
    hints: {
      hint1: 'Sort Array + Two Pointers for each fixed element.',
      hint2: 'Sort array. For each i, run Two Sum II on the suffix with target = -nums[i]. Skip duplicates for both fixed index and pointers.',
      hint3: `// Arrays.sort(nums);
// for (i = 0; i < n - 2; i++) {
//     if (i > 0 && nums[i] == nums[i-1]) continue;
//     twoPointers(nums, i + 1, -nums[i]);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1, target = -nums[i];
            while (left < right) {
                int sum = nums[left] + nums[right];
                if (sum == target) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < target) left++;
                else right--;
            }
        }
        return res;
    }
}`,
        timeComplexity: 'O(n^2) - O(n log n) sorting plus O(n) two-pointer pass per element',
        spaceComplexity: 'O(1) - Excluding result list',
        explanation: 'Fixing one number reduces the problem to sorted Two Sum. Skipping equal adjacent values ensures unique triplets without a HashSet.'
      }
    }
  },
  {
    id: '16',
    lcNumber: 16,
    title: '3Sum Closest',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Three Pointers (3Sum & Sorting Triplets)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/3sum-closest/'
  },
  {
    id: '18',
    lcNumber: 18,
    title: '4Sum',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Three Pointers (3Sum & Sorting Triplets)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/4sum/'
  },
  {
    id: '11',
    lcNumber: 11,
    title: 'Container With Most Water',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Trapping Rain Water & Boundary Two Pointers',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/container-with-most-water/',
    hints: {
      hint1: 'Greedy Two Pointers moving the shorter wall.',
      hint2: 'Area is width * min(height[left], height[right]). Moving the taller wall inward can only decrease area; always move the shorter pointer.',
      hint3: `// while (left < right) {
//     maxArea = Math.max(maxArea, (right - left) * Math.min(height[left], height[right]));
//     if (height[left] < height[right]) left++; else right--;
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, max = 0;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            max = Math.max(max, h * (right - left));
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max;
    }
}`,
        timeComplexity: 'O(n) - Single pass with two converging pointers',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'Because width strictly decreases at every step, the only way to find a greater area is to seek a taller wall by advancing the shorter side.'
      }
    }
  },
  {
    id: '986',
    lcNumber: 986,
    title: 'Interval List Intersections',
    topicId: 'two-pointers',
    difficulty: 'Medium',
    pattern: 'Opposite Direction (Converging Pointers for Two Sum & Palindromes)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/interval-list-intersections/'
  },
  {
    id: '42',
    lcNumber: 42,
    title: 'Trapping Rain Water',
    topicId: 'two-pointers',
    difficulty: 'Hard',
    pattern: 'Trapping Rain Water & Boundary Two Pointers',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/trapping-rain-water/',
    hints: {
      hint1: 'Two Pointers tracking leftMax and rightMax boundaries.',
      hint2: 'Water trapped at i is bounded by min(leftMax, rightMax) - height[i]. Advance the pointer with the smaller max boundary.',
      hint3: `// while (left < right) {
//     if (leftMax < rightMax) { leftMax = max(leftMax, h[left]); water += leftMax - h[left++]; }
//     else { rightMax = max(rightMax, h[right]); water += rightMax - h[right--]; }
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
        timeComplexity: 'O(n) - Single pass from both ends',
        spaceComplexity: 'O(1) - Constant space without auxiliary arrays',
        explanation: 'Water level is constrained by the shorter boundary wall. Advancing the smaller side allows computing trapped water instantly without precomputing prefix arrays.'
      }
    }
  },

  // ==========================================
  // TOPIC 3: SLIDING WINDOW (ADDITIONS)
  // ==========================================
  {
    id: '485',
    lcNumber: 485,
    title: 'Max Consecutive Ones',
    topicId: 'sliding-window',
    difficulty: 'Easy',
    pattern: 'Variable-Size Window (Longest condition e.g. at most k distinct)',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/max-consecutive-ones/',
    hints: {
      hint1: 'Running counter or variable-size window.',
      hint2: 'Increment count when nums[i] == 1, reset to 0 when nums[i] == 0. Track max count.',
      hint3: `// for (int num : nums) {
//     count = (num == 1) ? count + 1 : 0;
//     maxCount = Math.max(maxCount, count);
// }`,
      hint4: {
        javaSolution: `class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int count = 0, maxCount = 0;
        for (int num : nums) {
            count = (num == 1) ? count + 1 : 0;
            maxCount = Math.max(maxCount, count);
        }
        return maxCount;
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant auxiliary variables',
        explanation: 'Counting consecutive 1s in a single pass and resetting on zeroes finds the longest streak in O(n) time.'
      }
    }
  },
  {
    id: '187',
    lcNumber: 187,
    title: 'Repeated DNA Sequences',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed-Size Sliding Window (max/min/sum of size k)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/repeated-dna-sequences/'
  },
  {
    id: '1343',
    lcNumber: 1343,
    title: 'Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed-Size Sliding Window (max/min/sum of size k)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/'
  },
  {
    id: '395',
    lcNumber: 395,
    title: 'Longest Substring with At Least K Repeating Characters',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable-Size Window (Longest condition e.g. at most k distinct)',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/'
  },
  {
    id: '1838',
    lcNumber: 1838,
    title: 'Frequency of the Most Frequent Element',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable-Size Window (Longest condition e.g. at most k distinct)',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/frequency-of-the-most-frequent-element/'
  },
  {
    id: '992',
    lcNumber: 992,
    title: 'Subarrays with K Different Integers',
    topicId: 'sliding-window',
    difficulty: 'Hard',
    pattern: 'Variable-Size Window (Shortest/Min condition satisfying sum/chars)',
    level: 'Advanced',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/subarrays-with-k-different-integers/',
    hints: {
      hint1: 'At Most K trick: exact(K) = atMost(K) - atMost(K - 1).',
      hint2: 'A standard sliding window can count subarrays with at most K distinct elements in O(n). Subtracting atMost(K - 1) yields exact K.',
      hint3: `// return atMost(nums, k) - atMost(nums, k - 1);`,
      hint4: {
        javaSolution: `class Solution {
    public int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }
    private int atMost(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);
            while (count.size() > k) {
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) count.remove(nums[left]);
                left++;
            }
            res += right - left + 1;
        }
        return res;
    }
}`,
        timeComplexity: 'O(n) - Two sliding window passes',
        spaceComplexity: 'O(k) - Frequency hash map of size up to k',
        explanation: 'Counting exact distinct numbers directly with dynamic windows is difficult, but atMost(k) is monotonic and straightforward to solve.'
      }
    }
  },

  // ==========================================
  // TOPIC 4: HASHING + PREFIX SUM (ADDITIONS)
  // ==========================================
  {
    id: '383',
    lcNumber: 383,
    title: 'Ransom Note',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/ransom-note/',
    hints: {
      hint1: 'Character Frequency Array.',
      hint2: 'Count character frequencies in magazine with an integer array of size 26. Decrement for ransomNote characters. If count < 0, return false.',
      hint3: `// int[] count = new int[26];
// for (char c : magazine.toCharArray()) count[c - 'a']++;
// for (char c : ransomNote.toCharArray()) if (--count[c - 'a'] < 0) return false;
// return true;`,
      hint4: {
        javaSolution: `class Solution {
    public boolean canConstruct(String ransomNote, String magazine) {
        int[] count = new int[26];
        for (char c : magazine.toCharArray()) count[c - 'a']++;
        for (char c : ransomNote.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
        timeComplexity: 'O(m + n) - Single pass over both strings',
        spaceComplexity: 'O(1) - Constant size 26 array',
        explanation: 'An integer array of size 26 provides instantaneous O(1) frequency lookups and decrement validation.'
      }
    }
  },
  {
    id: '205',
    lcNumber: 205,
    title: 'Isomorphic Strings',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/isomorphic-strings/'
  },
  {
    id: '290',
    lcNumber: 290,
    title: 'Word Pattern',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/word-pattern/'
  },
  {
    id: '705',
    lcNumber: 705,
    title: 'Design HashSet',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Rolling Hash / Hash Set deduplication',
    level: 'Beginner',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/design-hashset/'
  },
  {
    id: '706',
    lcNumber: 706,
    title: 'Design HashMap',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Rolling Hash / Hash Set deduplication',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/design-hashmap/',
    hints: {
      hint1: 'Array of Buckets with Chaining.',
      hint2: 'Create an array of linked lists. Hash key with key % capacity to find bucket, then traverse list to insert, update, or remove.',
      hint3: `// Node[] buckets = new Node[10000];
// int idx = key % 10000;
// find node in buckets[idx] and get/put/remove`,
      hint4: {
        javaSolution: `class MyHashMap {
    private static class Node {
        int key, val;
        Node next;
        Node(int k, int v) { key = k; val = v; }
    }
    private final Node[] buckets = new Node[10000];

    public void put(int key, int value) {
        int idx = key % buckets.length;
        if (buckets[idx] == null) {
            buckets[idx] = new Node(-1, -1);
        }
        Node prev = find(buckets[idx], key);
        if (prev.next == null) prev.next = new Node(key, value);
        else prev.next.val = value;
    }

    public int get(int key) {
        int idx = key % buckets.length;
        if (buckets[idx] == null) return -1;
        Node prev = find(buckets[idx], key);
        return prev.next == null ? -1 : prev.next.val;
    }

    public void remove(int key) {
        int idx = key % buckets.length;
        if (buckets[idx] == null) return;
        Node prev = find(buckets[idx], key);
        if (prev.next != null) prev.next = prev.next.next;
    }

    private Node find(Node head, int key) {
        Node curr = head, prev = null;
        while (curr != null && curr.key != key) {
            prev = curr;
            curr = curr.next;
        }
        return prev;
    }
}`,
        timeComplexity: 'O(1) average per operation',
        spaceComplexity: 'O(N + K) - Number of elements and bucket heads',
        explanation: 'Separate chaining resolves hash collisions and ensures standard O(1) expected time for put, get, and remove operations.'
      }
    }
  },
  {
    id: '303',
    lcNumber: 303,
    title: 'Range Sum Query - Immutable',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Prefix Sum Array for O(1) range queries',
    level: 'Beginner',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/range-sum-query-immutable/',
    hints: {
      hint1: '1D Prefix Sum Precomputation.',
      hint2: 'Precompute prefix[i] = prefix[i-1] + nums[i-1]. Range sum between left and right is prefix[right + 1] - prefix[left].',
      hint3: `// prefix[i + 1] = prefix[i] + nums[i];
// sumRange(l, r) => prefix[r + 1] - prefix[l];`,
      hint4: {
        javaSolution: `class NumArray {
    private final int[] prefix;
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
        timeComplexity: 'O(1) per query, O(n) precomputation',
        spaceComplexity: 'O(n) - Prefix sum array',
        explanation: 'Precomputing prefix sums turns any range sum query into a single constant-time subtraction.'
      }
    }
  },
  {
    id: '523',
    lcNumber: 523,
    title: 'Continuous Subarray Sum',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Hash Map (Subarray sum equals k / divisible by k)',
    level: 'Intermediate',
    priority: 'Must',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/continuous-subarray-sum/',
    hints: {
      hint1: 'Prefix Sum Modulo K with Hash Map.',
      hint2: 'If (prefixSum[j] % k) == (prefixSum[i] % k), the subarray between i and j has sum divisible by k. Store earliest index of each remainder in a map.',
      hint3: `// rem = (sum % k + k) % k;
// if (map.containsKey(rem)) { if (i - map.get(rem) >= 2) return true; }
// else map.put(rem, i);`,
      hint4: {
        javaSolution: `class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            int rem = k != 0 ? sum % k : sum;
            if (map.containsKey(rem)) {
                if (i - map.get(rem) >= 2) return true;
            } else {
                map.put(rem, i);
            }
        }
        return false;
    }
}`,
        timeComplexity: 'O(n) - Single pass over array',
        spaceComplexity: 'O(min(n, k)) - Unique remainders in map',
        explanation: 'By the modulo remainder theorem, matching remainders indicate a difference that is a multiple of k.'
      }
    }
  },
  {
    id: '304',
    lcNumber: 304,
    title: 'Range Sum Query 2D - Immutable',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum Array for O(1) range queries',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/range-sum-query-2d-immutable/'
  },
  {
    id: '454',
    lcNumber: 454,
    title: '4Sum II',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Intermediate',
    priority: 'Good',
    tag: 'Good',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/4sum-ii/'
  },
  {
    id: '166',
    lcNumber: 166,
    title: 'Fraction to Recurring Decimal',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Intermediate',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/fraction-to-recurring-decimal/'
  },
  {
    id: '149',
    lcNumber: 149,
    title: 'Max Points on a Line',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Hard',
    pattern: 'Two Sum / Frequency Count Hash Table',
    level: 'Advanced',
    priority: 'Bonus',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/max-points-on-a-line/'
  }
];
