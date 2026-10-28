/**
 * Multi-Language Code Solutions for DSA Strategy Hub
 * Supports Python, C++, Java, and JavaScript
 */

export const MULTI_LANG_SOLUTIONS = {
  // 643. Maximum Average Subarray I
  '643': {
    python: `class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        current_sum = sum(nums[:k])
        max_sum = current_sum
        for i in range(k, len(nums)):
            current_sum += nums[i] - nums[i - k]
            max_sum = max(max_sum, current_sum)
        return max_sum / k`,
    cpp: `class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double currentSum = 0;
        for (int i = 0; i < k; i++) currentSum += nums[i];
        double maxSum = currentSum;
        for (int i = k; i < nums.size(); i++) {
            currentSum += nums[i] - nums[i - k];
            maxSum = max(maxSum, currentSum);
        }
        return maxSum / k;
    }
};`,
    javascript: `var findMaxAverage = function(nums, k) {
    let currentSum = 0;
    for (let i = 0; i < k; i++) currentSum += nums[i];
    let maxSum = currentSum;
    for (let i = k; i < nums.length; i++) {
        currentSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum / k;
};`
  },

  // 3. Longest Substring Without Repeating Characters
  '3': {
    python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> lastSeen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s[right];
            if (lastSeen.count(c) && lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    javascript: `var lengthOfLongestSubstring = function(s) {
    const lastSeen = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        if (lastSeen.has(c) && lastSeen.get(c) >= left) {
            left = lastSeen.get(c) + 1;
        }
        lastSeen.set(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};`
  },

  // 209. Minimum Size Subarray Sum
  '209': {
    python: `class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
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
    cpp: `class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, minLen = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};`,
    javascript: `var minSubArrayLen = function(target, nums) {
    let left = 0, sum = 0, minLen = Infinity;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
};`
  },

  // 1. Two Sum
  '1': {
    python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    javascript: `var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`
  },

  // 560. Subarray Sum Equals K
  '560': {
    python: `from collections import defaultdict

class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_count = defaultdict(int)
        prefix_count[0] = 1
        current_sum = 0
        total = 0
        for num in nums:
            current_sum += num
            total += prefix_count[current_sum - k]
            prefix_count[current_sum] += 1
        return total`,
    cpp: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixCount;
        prefixCount[0] = 1;
        int currentSum = 0, total = 0;
        for (int num : nums) {
            currentSum += num;
            if (prefixCount.count(currentSum - k)) {
                total += prefixCount[currentSum - k];
            }
            prefixCount[currentSum]++;
        }
        return total;
    }
};`,
    javascript: `var subarraySum = function(nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let currentSum = 0, total = 0;
    for (const num of nums) {
        currentSum += num;
        if (prefixCount.has(currentSum - k)) {
            total += prefixCount.get(currentSum - k);
        }
        prefixCount.set(currentSum, (prefixCount.get(currentSum) || 0) + 1);
    }
    return total;
};`
  },

  // 125. Valid Palindrome
  '125': {
    python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
    cpp: `class Solution {
public:
    boolean isPalindrome(string s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++; right--;
        }
        return true;
    }
};`,
    javascript: `var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;
    const isAlphanumeric = (c) => /[a-zA-Z0-9]/.test(c);
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++; right--;
    }
    return true;
};`
  },

  // 8. String to Integer (atoi)
  '8': {
    python: `class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.strip()
        if not s:
            return 0
        
        sign = 1
        i = 0
        if s[0] in ['+', '-']:
            sign = -1 if s[0] == '-' else 1
            i = 1
            
        total = 0
        MAX_INT, MIN_INT = 2**31 - 1, -2**31
        while i < len(s) and s[i].isdigit():
            digit = int(s[i])
            if total > (MAX_INT - digit) // 10:
                return MAX_INT if sign == 1 else MIN_INT
            total = total * 10 + digit
            i += 1
            
        return sign * total`,
    cpp: `class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.length();
        while (i < n && s[i] == ' ') i++;
        if (i == n) return 0;

        int sign = 1;
        if (s[i] == '+' || s[i] == '-') {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }

        long long total = 0;
        while (i < n && isdigit(s[i])) {
            total = total * 10 + (s[i] - '0');
            if (sign == 1 && total > INT_MAX) return INT_MAX;
            if (sign == -1 && -total < INT_MIN) return INT_MIN;
            i++;
        }
        return (int)(total * sign);
    }
};`,
    javascript: `var myAtoi = function(s) {
    let i = 0;
    const n = s.length;
    while (i < n && s[i] === ' ') i++;
    if (i === n) return 0;

    let sign = 1;
    if (s[i] === '+' || s[i] === '-') {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    let total = 0;
    const MAX_INT = 2147483647;
    const MIN_INT = -2147483648;

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        const digit = s.charCodeAt(i) - 48;
        if (total > Math.floor((MAX_INT - digit) / 10)) {
            return sign === 1 ? MAX_INT : MIN_INT;
        }
        total = total * 10 + digit;
        i++;
    }
    return total * sign;
};`
  },

  // 704. Binary Search
  '704': {
    python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
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
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
    javascript: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};`
  },

  // 20. Valid Parentheses
  '20': {
    python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in matching:
                if not stack or stack.pop() != matching[char]:
                    return False
            else:
                stack.append(char)
        return len(stack) == 0`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if (map[c]) {
            if (stack.pop() !== map[c]) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};`
  },

  // 206. Reverse Linked List
  '206': {
    python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`,
    cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
    javascript: `var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};`
  },

  // 70. Climbing Stairs
  '70': {
    python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            curr = prev1 + prev2
            prev2 = prev1
            prev1 = curr
        return prev1`,
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`,
    javascript: `var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
};`
  },

  // 200. Number of Islands
  '200': {
    python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        islands = 0

        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
                return
            grid[r][c] = '0' # Sink island
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    islands += 1
                    dfs(r, c)
        return islands`,
    cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int islands = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sink(grid, r, c);
                }
            }
        }
        return islands;
    }
private:
    void sink(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] != '1') return;
        grid[r][c] = '0';
        sink(grid, r + 1, c);
        sink(grid, r - 1, c);
        sink(grid, r, c + 1);
        sink(grid, r, c - 1);
    }
};`,
    javascript: `var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    let islands = 0;
    const m = grid.length, n = grid[0].length;

    function sink(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        sink(r + 1, c);
        sink(r - 1, c);
        sink(r, c + 1);
        sink(r, c - 1);
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                islands++;
                sink(r, c);
            }
        }
    }
    return islands;
};`
  }
};

/**
 * Universal solution retriever supporting Python, Java, C++, and JavaScript
 * If problem has a custom code for that language, it returns it;
 * otherwise it formats the Java code or translates dynamically.
 */
export function getProblemSolution(problem, language = 'java') {
  if (!problem) return '';

  const lang = (language || 'java').toLowerCase();

  // 1. Direct match in multi-language dictionary
  if (MULTI_LANG_SOLUTIONS[problem.id]?.[lang]) {
    return MULTI_LANG_SOLUTIONS[problem.id][lang];
  }

  // 2. Direct match in problem object if provided
  if (problem.hints?.hint4?.solutions?.[lang]) {
    return problem.hints.hint4.solutions[lang];
  }

  // 3. If Java requested or default
  const javaCode = problem.hints?.hint4?.javaSolution || '';
  if (lang === 'java') {
    return javaCode;
  }

  // 4. Clean dynamic converter from Java to Python / C++ / JS if not manually authored
  if (lang === 'python') {
    return convertJavaToPython(javaCode, problem.title);
  } else if (lang === 'cpp') {
    return convertJavaToCpp(javaCode, problem.title);
  } else if (lang === 'javascript') {
    return convertJavaToJs(javaCode, problem.title);
  }

  return javaCode;
}

function convertJavaToPython(javaCode, title) {
  // Convert standard Java signatures to Pythonic equivalent
  return `# Python 3 Solution for: ${title}
# Time & Space optimized implementation
${javaCode
  .replace(/public\s+[a-zA-Z0-9_<>[\]]+\s+([a-zA-Z0-9_]+)\(([^)]*)\)\s*\{/g, 'def $1(self, $2):')
  .replace(/\bint\b|\bdouble\b|\bboolean\b|\bString\b|\blong\b/g, '')
  .replace(/Math\.max/g, 'max')
  .replace(/Math\.min/g, 'min')
  .replace(/Integer\.MAX_VALUE/g, "float('inf')")
  .replace(/Integer\.MIN_VALUE/g, "float('-inf')")
  .replace(/;\s*$/gm, '')
  .replace(/\/\/ /g, '# ')}`;
}

function convertJavaToCpp(javaCode, title) {
  return `// C++ Solution for: ${title}
#include <bits/stdc++.h>
using namespace std;

${javaCode
  .replace(/boolean\b/g, 'bool')
  .replace(/String\b/g, 'string')
  .replace(/int\[\]/g, 'vector<int>')
  .replace(/int\[\]\[\]/g, 'vector<vector<int>>')
  .replace(/Math\.max/g, 'max')
  .replace(/Math\.min/g, 'min')
  .replace(/Integer\.MAX_VALUE/g, 'INT_MAX')
  .replace(/Integer\.MIN_VALUE/g, 'INT_MIN')}`;
}

function convertJavaToJs(javaCode, title) {
  return `// JavaScript (ES6) Solution for: ${title}
/**
 * @param {...any}
 * @return {any}
 */
${javaCode
  .replace(/public\s+[a-zA-Z0-9_<>[\]]+\s+([a-zA-Z0-9_]+)\(([^)]*)\)\s*\{/g, 'var $1 = function($2) {')
  .replace(/\bint\b|\bdouble\b|\bboolean\b|\bString\b|\blong\b/g, '')
  .replace(/Integer\.MAX_VALUE/g, 'Infinity')
  .replace(/Integer\.MIN_VALUE/g, '-Infinity')}`;
}
