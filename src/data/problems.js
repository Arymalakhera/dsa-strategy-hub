/**
 * Curated Problem Bank for DSA Strategy Hub
 * Placement & Off-Campus Hiring (India, Java-Focused)
 */

export const PROBLEMS = [
  // ==========================================
  // 1. SLIDING WINDOW
  // ==========================================
  {
    id: '643',
    lcNumber: 643,
    title: 'Maximum Average Subarray I',
    topicId: 'sliding-window',
    difficulty: 'Easy',
    pattern: 'Fixed Size Sliding Window',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/maximum-average-subarray-i/',
    hints: {
      hint1: 'Fixed Size Sliding Window of size k.',
      hint2: 'Compute the sum of the first k elements, then slide the window by adding nums[i] and subtracting nums[i - k].',
      hint3: `// 1. sum = sum of first k elements
// 2. max = sum
// 3. For i from k to n-1:
//      sum += nums[i] - nums[i - k]
//      max = Math.max(max, sum)
// 4. Return (double) max / k`,
      hint4: {
        javaSolution: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        int maxSum = sum;
        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return (double) maxSum / k;
    }
}`,
        timeComplexity: 'O(n) - Single pass over the array of length n',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'We calculate the initial window sum of size k, then slide the window one element at a time in O(1) per step.'
      }
    }
  },
  {
    id: '3',
    lcNumber: 3,
    title: 'Longest Substring Without Repeating Characters',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable Size Window (Longest)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Infosys'],
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    hints: {
      hint1: 'Variable-size Sliding Window using a Hash Map or integer array for last-seen indices.',
      hint2: 'Expand right pointer; if char was seen inside current window, jump left pointer to lastIndex + 1.',
      hint3: `// Maintain map of char -> index
// left = 0, maxLen = 0
// For right from 0 to n-1:
//   if map has s[right] and map.get(s[right]) >= left:
//     left = map.get(s[right]) + 1
//   map.put(s[right], right)
//   maxLen = max(maxLen, right - left + 1)`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLen = 0;
        int left = 0;
        // Map character to its most recent index
        Map<Character, Integer> lastSeen = new HashMap<>();

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        timeComplexity: 'O(n) - Each character is processed at most twice',
        spaceComplexity: 'O(min(n, m)) where m is charset size (O(1) for standard ASCII)',
        explanation: 'We track the latest index of each character. When a duplicate occurs, we advance the left pointer past the previous occurrence.'
      }
    }
  },
  {
    id: '209',
    lcNumber: 209,
    title: 'Minimum Size Subarray Sum',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable Size Window (Shortest)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Wipro'],
    link: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
    hints: {
      hint1: 'Variable Size Sliding Window (Shortest condition with positive integers).',
      hint2: 'Expand right until sum >= target; then shrink left while sum >= target to minimize window length.',
      hint3: `// sum = 0, left = 0, minLen = INF
// For right from 0 to n-1:
//   sum += nums[right]
//   While sum >= target:
//     minLen = min(minLen, right - left + 1)
//     sum -= nums[left++]`,
      hint4: {
        javaSolution: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
        timeComplexity: 'O(n) - Both left and right move at most n times',
        spaceComplexity: 'O(1) - Auxiliary space',
        explanation: 'We greedily extend the right pointer to reach target, then compress from the left as much as possible while maintaining sum >= target.'
      }
    }
  },
  {
    id: '567',
    lcNumber: 567,
    title: 'Permutation in String',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed Size Sliding Window',
    tag: 'Must',
    companyTags: ['Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/permutation-in-string/',
    hints: {
      hint1: 'Fixed Size Sliding Window with frequency matching (size = s1.length()).',
      hint2: 'Two strings are permutations if and only if their character count arrays of size 26 match.',
      hint3: `// Count freq of s1
// Slide window of length s1.length() across s2
// Update window freq: add right char, remove left char
// Check if freq arrays match`,
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] count1 = new int[26];
        int[] count2 = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            count1[s1.charAt(i) - 'a']++;
            count2[s2.charAt(i) - 'a']++;
        }

        if (Arrays.equals(count1, count2)) return true;

        for (int i = s1.length(); i < s2.length(); i++) {
            count2[s2.charAt(i) - 'a']++;
            count2[s2.charAt(i - s1.length()) - 'a']--;
            if (Arrays.equals(count1, count2)) return true;
        }
        return false;
    }
}`,
        timeComplexity: 'O(n) where n is s2.length()',
        spaceComplexity: 'O(1) - Constant arrays of size 26',
        explanation: 'Maintains character frequency of a window of size s1.length() and compares against s1 frequency table in O(26) = O(1).'
      }
    }
  },
  {
    id: '438',
    lcNumber: 438,
    title: 'Find All Anagrams in a String',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed Size Sliding Window',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Infosys'],
    link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    hints: {
      hint1: 'Fixed Size Sliding Window of size p.length().',
      hint2: 'Track match count of 26 characters as the window slides from index 0 to s.length() - 1.',
      hint3: `// Build freq array for p and first window of s
// If equal, add 0 to result
// Slide window: increment outgoing, decrement incoming, check match`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        if (s.length() < p.length()) return result;

        int[] pCount = new int[26];
        int[] sCount = new int[26];
        for (int i = 0; i < p.length(); i++) {
            pCount[p.charAt(i) - 'a']++;
            sCount[s.charAt(i) - 'a']++;
        }

        if (Arrays.equals(pCount, sCount)) result.add(0);

        for (int i = p.length(); i < s.length(); i++) {
            sCount[s.charAt(i) - 'a']++;
            sCount[s.charAt(i - p.length()) - 'a']--;
            if (Arrays.equals(pCount, sCount)) {
                result.add(i - p.length() + 1);
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(s.length()) - Sliding window with O(26) comparison per shift',
        spaceComplexity: 'O(1) - 26-element frequency arrays',
        explanation: 'Tracks character frequencies in a fixed window and saves starting indices whenever the window is an anagram of p.'
      }
    }
  },
  {
    id: '424',
    lcNumber: 424,
    title: 'Longest Repeating Character Replacement',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable Size Window (Longest)',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    hints: {
      hint1: 'Variable-size Sliding Window with character count.',
      hint2: 'Window is valid if (windowLength - maxFrequencyChar) <= k. Otherwise shrink from left.',
      hint3: `// counts = int[26], maxCount = 0, left = 0, maxLen = 0
// For right = 0 to n-1:
//   counts[s[right]]++
//   maxCount = max(maxCount, counts[s[right]])
//   if (right - left + 1) - maxCount > k:
//     counts[s[left]]--
//     left++
//   maxLen = max(maxLen, right - left + 1)`,
      hint4: {
        javaSolution: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0;
        int maxCount = 0;
        int maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'A']);
            while ((right - left + 1) - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        timeComplexity: 'O(n) - Single pass where left and right advance',
        spaceComplexity: 'O(1) - Array of 26 uppercase letters',
        explanation: 'We maintain the count of the most frequent character in the current window. If non-dominant characters exceed k, we shrink.'
      }
    }
  },
  {
    id: '1004',
    lcNumber: 1004,
    title: 'Max Consecutive Ones III',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable Size Window (Longest)',
    tag: 'Must',
    companyTags: ['Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/max-consecutive-ones-iii/',
    hints: {
      hint1: 'Equivalent to finding longest subarray with at most k zeros.',
      hint2: 'Expand right pointer and count zeros; if zeros > k, advance left until zeros <= k.',
      hint3: `// left = 0, zeros = 0, maxLen = 0
// For right from 0 to n-1:
//   if nums[right] == 0: zeros++
//   while zeros > k:
//     if nums[left] == 0: zeros--
//     left++
//   maxLen = max(maxLen, right - left + 1)`,
      hint4: {
        javaSolution: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeroCount++;
            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        timeComplexity: 'O(n) - Each element added and removed at most once',
        spaceComplexity: 'O(1) - Primitive integers',
        explanation: 'We expand a window counting zeros. Whenever zero count exceeds k, we contract from left.'
      }
    }
  },
  {
    id: '904',
    lcNumber: 904,
    title: 'Fruit Into Baskets',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Variable Size Window (Longest)',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/fruit-into-baskets/',
    hints: {
      hint1: 'Equivalent to Longest Subarray with at most 2 distinct elements.',
      hint2: 'Use a Hash Map of fruit -> count; shrink left pointer when map.size() > 2.',
      hint3: `// Map<Integer, Integer> basket
// left = 0, maxFruits = 0
// For right from 0 to n-1:
//   add fruits[right] to basket
//   while basket.size() > 2:
//     decrement fruits[left], remove if 0, left++
//   maxFruits = max(maxFruits, right - left + 1)`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> basket = new HashMap<>();
        int left = 0;
        int maxFruits = 0;

        for (int right = 0; right < fruits.length; right++) {
            basket.put(fruits[right], basket.getOrDefault(fruits[right], 0) + 1);
            while (basket.size() > 2) {
                basket.put(fruits[left], basket.get(fruits[left]) - 1);
                if (basket.get(fruits[left]) == 0) {
                    basket.remove(fruits[left]);
                }
                left++;
            }
            maxFruits = Math.max(maxFruits, right - left + 1);
        }
        return maxFruits;
    }
}`,
        timeComplexity: 'O(n) - Two pointers across fruits array',
        spaceComplexity: 'O(1) - Map stores at most 3 items at any time',
        explanation: 'Rephrased as finding the longest contiguous subarray containing at most 2 distinct numbers.'
      }
    }
  },
  {
    id: '76',
    lcNumber: 76,
    title: 'Minimum Window Substring',
    topicId: 'sliding-window',
    difficulty: 'Hard',
    pattern: 'Variable Size Window (Shortest)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/minimum-window-substring/',
    hints: {
      hint1: 'Variable-size window with required characters match count.',
      hint2: 'Expand right until all required characters match target frequencies, then shrink left while valid to find minimal substring.',
      hint3: `// 1. Build target map of t
// 2. matched = 0, required = map.size()
// 3. Expand right: if char count matches target count, matched++
// 4. While matched == required: record min window, shrink left, update counts`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        Map<Character, Integer> target = new HashMap<>();
        for (char c : t.toCharArray()) {
            target.put(c, target.getOrDefault(c, 0) + 1);
        }

        Map<Character, Integer> window = new HashMap<>();
        int left = 0, matched = 0;
        int minLen = Integer.MAX_VALUE;
        int startIdx = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.put(c, window.getOrDefault(c, 0) + 1);

            if (target.containsKey(c) && window.get(c).intValue() == target.get(c).intValue()) {
                matched++;
            }

            while (matched == target.size()) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);
                if (target.containsKey(leftChar) && window.get(leftChar) < target.get(leftChar)) {
                    matched--;
                }
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(startIdx, startIdx + minLen);
    }
}`,
        timeComplexity: 'O(|s| + |t|) - Linear scan of both strings',
        spaceComplexity: 'O(|s| + |t|) for character frequency maps',
        explanation: 'We expand right until every character requirement in t is satisfied, then shrink left to find the tightest substring.'
      }
    }
  },
  {
    id: '239',
    lcNumber: 239,
    title: 'Sliding Window Maximum',
    topicId: 'sliding-window',
    difficulty: 'Hard',
    pattern: 'Monotonic Deque Window',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/sliding-window-maximum/',
    hints: {
      hint1: 'Monotonic Decreasing Deque storing array indices.',
      hint2: 'Head of deque always holds index of maximum element in current window; remove expired indices from front and smaller elements from back.',
      hint3: `// Deque<Integer> deque = new ArrayDeque<>()
// For i from 0 to n-1:
//   Remove elements out of window: while (!deque.isEmpty() && deque.peekFirst() <= i - k) deque.pollFirst()
//   Remove smaller elements: while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast()
//   deque.addLast(i)
//   if i >= k - 1: ans[i - k + 1] = nums[deque.peekFirst()]`,
      hint4: {
        javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        // Monotonically decreasing deque storing indices
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove indices falling outside current window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            // 2. Remove smaller elements from back
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            // 3. Add current index
            deque.offerLast(i);

            // 4. Record maximum when first window is formed
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Each element is pushed and popped at most once',
        spaceComplexity: 'O(k) - Deque holds at most k indices',
        explanation: 'A monotonic double-ended queue maintains indices of potential window maximums in decreasing order of value.'
      }
    }
  },
  {
    id: '1456',
    lcNumber: 1456,
    title: 'Maximum Number of Vowels in a Substring of Given Length',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed Size Sliding Window',
    tag: 'Good',
    companyTags: ['Amazon', 'TCS'],
    link: 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/',
    hints: {
      hint1: 'Fixed window of size k.',
      hint2: 'Count vowels in first k chars, then slide window adding right char vowel value and subtracting left char vowel value.',
      hint3: 'Slide window of size k and track max count.',
      hint4: {
        javaSolution: `class Solution {
    public int maxVowels(String s, int k) {
        int count = 0;
        for (int i = 0; i < k; i++) {
            if (isVowel(s.charAt(i))) count++;
        }
        int maxCount = count;
        for (int i = k; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) count++;
            if (isVowel(s.charAt(i - k))) count--;
            maxCount = Math.max(maxCount, count);
        }
        return maxCount;
    }
    private boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        explanation: 'Linear fixed sliding window counting vowels.'
      }
    }
  },
  {
    id: '1423',
    lcNumber: 1423,
    title: 'Maximum Points You Can Obtain from Cards',
    topicId: 'sliding-window',
    difficulty: 'Medium',
    pattern: 'Fixed Size Sliding Window',
    tag: 'Bonus',
    companyTags: ['Microsoft', 'Infosys'],
    link: 'https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/',
    hints: {
      hint1: 'Taking k cards from ends is equivalent to leaving (n - k) contiguous cards in the middle.',
      hint2: 'Find the minimum sum subarray of length (n - k), then subtract it from total card points.',
      hint3: 'Fixed window of size (n - k).',
      hint4: {
        javaSolution: `class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int totalSum = 0;
        for (int pt : cardPoints) totalSum += pt;
        int windowSize = n - k;
        if (windowSize == 0) return totalSum;

        int currentWindow = 0;
        for (int i = 0; i < windowSize; i++) currentWindow += cardPoints[i];
        int minWindow = currentWindow;

        for (int i = windowSize; i < n; i++) {
            currentWindow += cardPoints[i] - cardPoints[i - windowSize];
            minWindow = Math.min(minWindow, currentWindow);
        }
        return totalSum - minWindow;
    }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        explanation: 'Inverse problem solved via fixed sliding window of size n - k.'
      }
    }
  },

  // ==========================================
  // 2. HASHING + PREFIX SUM
  // ==========================================
  {
    id: '1',
    lcNumber: 1,
    title: 'Two Sum',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Easy',
    pattern: 'Hash Table Lookup',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'TCS', 'Infosys', 'Wipro'],
    link: 'https://leetcode.com/problems/two-sum/',
    hints: {
      hint1: 'Hash Table for O(1) complement lookups.',
      hint2: 'As you iterate through nums, check if (target - num) exists in the map. If yes, return their indices; otherwise store num -> index.',
      hint3: `// Map<Integer, Integer> map = new HashMap<>()
// For i from 0 to n-1:
//   complement = target - nums[i]
//   if map contains complement: return [map.get(complement), i]
//   map.put(nums[i], i)`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] { -1, -1 };
    }
}`,
        timeComplexity: 'O(n) - Single pass through the array',
        spaceComplexity: 'O(n) - Hash map storing up to n elements',
        explanation: 'We cache each number and its index in a hash map so we can retrieve the complement in O(1) average time.'
      }
    }
  },
  {
    id: '560',
    lcNumber: 560,
    title: 'Subarray Sum Equals K',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Hash Map',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    hints: {
      hint1: 'Prefix Sum combined with a Frequency Hash Map.',
      hint2: 'If prefixSum[j] - prefixSum[i] = k, then prefixSum[i] = prefixSum[j] - k. Count occurrences of (currentPrefixSum - k).',
      hint3: `// Map<Integer, Integer> prefixCounts = new HashMap<>()
// prefixCounts.put(0, 1) // Base case: prefix sum of 0 appears once
// count = 0, currentSum = 0
// For num in nums:
//   currentSum += num
//   count += prefixCounts.getOrDefault(currentSum - k, 0)
//   prefixCounts.put(currentSum, count + 1)`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1); // Empty subarray has sum 0

        int currentSum = 0;
        int totalSubarrays = 0;

        for (int num : nums) {
            currentSum += num;
            if (prefixCount.containsKey(currentSum - k)) {
                totalSubarrays += prefixCount.get(currentSum - k);
            }
            prefixCount.put(currentSum, prefixCount.getOrDefault(currentSum, 0) + 1);
        }
        return totalSubarrays;
    }
}`,
        timeComplexity: 'O(n) - Single pass over nums',
        spaceComplexity: 'O(n) - Hash map of prefix sums',
        explanation: 'Tracks how many previous prefixes had sum equal to (currentSum - k), which correspond to subarrays ending here with sum k.'
      }
    }
  },
  {
    id: '347',
    lcNumber: 347,
    title: 'Top K Frequent Elements',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Bucket Sort / Frequency Map',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/top-k-frequent-elements/',
    hints: {
      hint1: 'Frequency Map followed by Bucket Sort (or Min-Heap of size k).',
      hint2: 'Count frequencies into a Map; bucket numbers by their frequency (buckets 0 to n) to achieve O(n) runtime.',
      hint3: `// 1. Map freq = num -> count
// 2. List<Integer>[] buckets = new List[n + 1]
// 3. For num, count in freq: buckets[count].add(num)
// 4. Iterate buckets from n down to 1 to collect k elements`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        // Bucket sort by frequency: index = frequency
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int num : freqMap.keySet()) {
            int freq = freqMap.get(num);
            if (buckets[freq] == null) {
                buckets[freq] = new ArrayList<>();
            }
            buckets[freq].add(num);
        }

        int[] result = new int[k];
        int idx = 0;
        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {
            if (buckets[i] != null) {
                for (int num : buckets[i]) {
                    result[idx++] = num;
                    if (idx == k) break;
                }
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Frequency counting and bucket sort are strictly linear',
        spaceComplexity: 'O(n) - Buckets and frequency map',
        explanation: 'Bucket sort groups elements by frequency in range [1, n], avoiding O(n log n) sorting.'
      }
    }
  },
  {
    id: '128',
    lcNumber: 128,
    title: 'Longest Consecutive Sequence',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Hash Set Sequence Expansion',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    hints: {
      hint1: 'Hash Set for O(1) containment checks.',
      hint2: 'Only start counting a sequence if (num - 1) is NOT in the set! That proves num is the start of a consecutive sequence.',
      hint3: `// Set<Integer> set = all nums
// maxStreak = 0
// For num in set:
//   if (!set.contains(num - 1)):
//     curr = num, streak = 1
//     while (set.contains(curr + 1)): curr++, streak++
//     maxStreak = max(maxStreak, streak)`,
      hint4: {
        javaSolution: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }

        int longestStreak = 0;

        for (int num : numSet) {
            // Only start count if num is the beginning of a sequence
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }
        return longestStreak;
    }
}`,
        timeComplexity: 'O(n) - Every number is visited at most twice (inner while loop only runs for sequence starters)',
        spaceComplexity: 'O(n) - HashSet storing distinct numbers',
        explanation: 'By checking !set.contains(num - 1), we guarantee that each sequence is traversed only once from its true head.'
      }
    }
  },
  {
    id: '525',
    lcNumber: 525,
    title: 'Contiguous Array',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Hash Map',
    tag: 'Good',
    companyTags: ['Microsoft', 'Infosys'],
    link: 'https://leetcode.com/problems/contiguous-array/',
    hints: {
      hint1: 'Treat 0 as -1 and 1 as +1.',
      hint2: 'If prefix sum repeats at index i and j, subarray nums[i+1...j] has equal zeros and ones.',
      hint3: 'Store first-seen index of each prefix sum.',
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int maxLen = 0, sum = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += (nums[i] == 0 ? -1 : 1);
            if (map.containsKey(sum)) {
                maxLen = Math.max(maxLen, i - map.get(sum));
            } else {
                map.put(sum, i);
            }
        }
        return maxLen;
    }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        explanation: 'Converts 0s to -1s and uses prefix sum repetition to find maximal equal subarrays.'
      }
    }
  },
  {
    id: '974',
    lcNumber: 974,
    title: 'Subarray Sums Divisible by K',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Modulo Map',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
    hints: {
      hint1: 'Prefix sum modulo k.',
      hint2: 'Normalize negative remainders using ((sum % k) + k) % k.',
      hint3: 'If two prefix sums have the same remainder modulo k, their difference is divisible by k.',
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int prefixSum = 0, count = 0;

        for (int num : nums) {
            prefixSum += num;
            int rem = ((prefixSum % k) + k) % k;
            count += map.getOrDefault(rem, 0);
            map.put(rem, map.getOrDefault(rem, 0) + 1);
        }
        return count;
    }
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k)',
        explanation: 'Uses modulo arithmetic on prefix sums to count divisible subarray spans.'
      }
    }
  },

  // ==========================================
  // 3. STRINGS
  // ==========================================
  {
    id: '125',
    lcNumber: 125,
    title: 'Valid Palindrome',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'Two Pointers (Inward)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/valid-palindrome/',
    hints: {
      hint1: 'Two Pointers moving towards center.',
      hint2: 'Skip non-alphanumeric characters using Character.isLetterOrDigit(), and compare characters ignoring case.',
      hint3: `// left = 0, right = s.length() - 1
// While left < right:
//   skip non-alphanumeric at left/right
//   if lower(s[left]) != lower(s[right]): return false
//   left++, right--`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n) - Single pass with two pointers',
        spaceComplexity: 'O(1) - In-place character checking without creating new strings',
        explanation: 'Avoids allocating new strings by skipping non-alphanumeric characters directly using two pointers.'
      }
    }
  },
  {
    id: '242',
    lcNumber: 242,
    title: 'Valid Anagram',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'Frequency Array Count',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/valid-anagram/',
    hints: {
      hint1: 'Character frequency array of size 26.',
      hint2: 'Increment counts for string s, decrement for string t; if any count != 0, they are not anagrams.',
      hint3: `// if s.length != t.length: return false
// int[] count = new int[26]
// For i in 0..s.length: count[s[i] - 'a']++, count[t[i] - 'a']--
// Check if all counts are 0`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];

        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n) where n is length of string',
        spaceComplexity: 'O(1) - Constant array of size 26',
        explanation: 'Tracks balance of characters; two strings are anagrams if and only if net frequencies are all zero.'
      }
    }
  },
  {
    id: '49',
    lcNumber: 49,
    title: 'Group Anagrams',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Categorization by Sorted Key',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Wipro'],
    link: 'https://leetcode.com/problems/group-anagrams/',
    hints: {
      hint1: 'Hash Map grouping by sorted canonical signature.',
      hint2: 'Two strings are anagrams if and only if their sorted character arrays are identical.',
      hint3: `// Map<String, List<String>> map
// For word in strs:
//   char[] arr = word.toCharArray(); Arrays.sort(arr);
//   key = String.valueOf(arr)
//   map.computeIfAbsent(key, k -> new ArrayList<>()).add(word)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String sortedKey = new String(chars);

            if (!map.containsKey(sortedKey)) {
                map.put(sortedKey, new ArrayList<>());
            }
            map.get(sortedKey).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
        timeComplexity: 'O(n * k log k) where n is count of strings and k is max length',
        spaceComplexity: 'O(n * k) for storing strings in hash map',
        explanation: 'Sorts individual string characters to produce a canonical key that groups all mutual anagrams together.'
      }
    }
  },
  {
    id: '5',
    lcNumber: 5,
    title: 'Longest Palindromic Substring',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Expand Around Center',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/longest-palindromic-substring/',
    hints: {
      hint1: 'Expand around center (2n - 1 possible centers).',
      hint2: 'A palindrome expands symmetrically around odd centers (i) and even centers (i, i + 1).',
      hint3: `// For i = 0 to n-1:
//   len1 = expand(s, i, i)     // odd palindrome
//   len2 = expand(s, i, i + 1) // even palindrome
//   Track start and end of maximum length palindrome`,
      hint4: {
        javaSolution: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);     // Odd center
            int len2 = expandAroundCenter(s, i, i + 1); // Even center
            int len = Math.max(len1, len2);

            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`,
        timeComplexity: 'O(n^2) - Expand up to n steps for n centers',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'Avoids O(n^2) DP table space overhead by expanding from centers in O(1) space.'
      }
    }
  },
  {
    id: '14',
    lcNumber: 14,
    title: 'Longest Common Prefix',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'Vertical / Horizontal Scanning',
    tag: 'Must',
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Amazon'],
    link: 'https://leetcode.com/problems/longest-common-prefix/',
    hints: {
      hint1: 'Horizontal or Vertical scanning.',
      hint2: 'Take the first string as prefix; shorten it with prefix = prefix.substring(0, prefix.length() - 1) while current string does not start with prefix.',
      hint3: 'Prefix starts as strs[0], trim while !str.startsWith(prefix).',
      hint4: {
        javaSolution: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];

        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
        timeComplexity: 'O(S) where S is sum of characters in all strings',
        spaceComplexity: 'O(1) - Constant auxiliary storage',
        explanation: 'Iteratively shrinks the candidate prefix until it matches all strings in the array.'
      }
    }
  },
  {
    id: '151',
    lcNumber: 151,
    title: 'Reverse Words in a String',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Two Pointers Tokenization',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/reverse-words-in-a-string/',
    hints: {
      hint1: 'Trim spaces and scan backwards or split with regex "\\s+".',
      hint2: 'Iterating from right to left with two pointers to extract words directly avoids extra splits.',
      hint3: 'Skip spaces, find word boundaries, append to StringBuilder with single space.',
      hint4: {
        javaSolution: `class Solution {
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        int i = s.length() - 1;

        while (i >= 0) {
            // Skip trailing / intermediate spaces
            while (i >= 0 && s.charAt(i) == ' ') i--;
            if (i < 0) break;

            int j = i;
            while (i >= 0 && s.charAt(i) != ' ') i--;

            if (sb.length() > 0) sb.append(' ');
            sb.append(s.substring(i + 1, j + 1));
        }
        return sb.toString();
    }
}`,
        timeComplexity: 'O(n) - Single backwards traversal',
        spaceComplexity: 'O(n) - Output StringBuilder',
        explanation: 'Scans from right to left, isolating each word boundary and writing directly to the result buffer.'
      }
    }
  },
  {
    id: '443',
    lcNumber: 443,
    title: 'String Compression',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Two Pointers In-Place',
    tag: 'Must',
    companyTags: ['Microsoft', 'Amazon'],
    link: 'https://leetcode.com/problems/string-compression/',
    hints: {
      hint1: 'Two Pointers write and read in-place.',
      hint2: 'Count contiguous occurrences of current character; write character, and if count > 1, write digits of count.',
      hint3: 'writeIdx advances only when writing char or digits; readIdx advances to count repeats.',
      hint4: {
        javaSolution: `class Solution {
    public int compress(char[] chars) {
        int write = 0, read = 0;

        while (read < chars.length) {
            char currentChar = chars[read];
            int count = 0;

            while (read < chars.length && chars[read] == currentChar) {
                read++;
                count++;
            }

            chars[write++] = currentChar;
            if (count > 1) {
                for (char c : Integer.toString(count).toCharArray()) {
                    chars[write++] = c;
                }
            }
        }
        return write;
    }
}`,
        timeComplexity: 'O(n) - Single pass in-place read and write',
        spaceComplexity: 'O(1) - Modified in-place',
        explanation: 'Compact run-length compression directly modifying the input array.'
      }
    }
  },
  {
    id: '392',
    lcNumber: 392,
    title: 'Is Subsequence',
    topicId: 'strings',
    difficulty: 'Easy',
    pattern: 'Two Pointers Matching',
    tag: 'Must',
    companyTags: ['TCS', 'Infosys', 'Amazon'],
    link: 'https://leetcode.com/problems/is-subsequence/',
    hints: {
      hint1: 'Two Pointers.',
      hint2: 'Advance pointer i in s when s.charAt(i) == t.charAt(j); always advance pointer j in t.',
      hint3: 'Return i == s.length() at the end.',
      hint4: {
        javaSolution: `class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
}`,
        timeComplexity: 'O(t.length()) - Single pass over target string',
        spaceComplexity: 'O(1) - Constant space',
        explanation: 'Greedily matches characters of s in t sequentially.'
      }
    }
  },
  {
    id: '8',
    lcNumber: 8,
    title: 'String to Integer (atoi)',
    topicId: 'strings',
    difficulty: 'Medium',
    pattern: 'Parsing & Overflow Handling',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg', 'Flipkart'],
    link: 'https://leetcode.com/problems/string-to-integer-atoi/',
    hints: {
      hint1: 'State Machine / Sequential Parsing with strict bounds checking.',
      hint2: 'Handle in 4 steps: (1) skip leading whitespace, (2) read optional sign, (3) convert digits, (4) clamp if overflow/underflow occurs.',
      hint3: `// 1. i = 0, skip s[i] == ' '
// 2. sign = 1; if s[i] == '-' (sign = -1, i++) else if s[i] == '+' (i++)
// 3. while i < n and isDigit(s[i]):
//      if total > MAX/10 or (total == MAX/10 and digit > 7):
//          return sign == 1 ? MAX : MIN
//      total = total * 10 + digit; i++
// 4. return total * sign`,
      hint4: {
        javaSolution: `class Solution {
    public int myAtoi(String s) {
        if (s == null || s.length() == 0) return 0;
        int i = 0, n = s.length();

        // 1. Skip leading whitespaces
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }
        if (i == n) return 0;

        // 2. Check sign
        int sign = 1;
        if (s.charAt(i) == '+' || s.charAt(i) == '-') {
            sign = s.charAt(i) == '-' ? -1 : 1;
            i++;
        }

        // 3. Convert digits and guard against 32-bit overflow
        int total = 0;
        int maxThreshold = Integer.MAX_VALUE / 10;
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';

            if (total > maxThreshold || (total == maxThreshold && digit > Integer.MAX_VALUE % 10)) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }

            total = total * 10 + digit;
            i++;
        }

        return total * sign;
    }
}`,
        timeComplexity: 'O(n) - Single pass over characters',
        spaceComplexity: 'O(1) - Constant auxiliary memory',
        explanation: 'Parses valid integer prefix while checking overflow conditions before multiplying by 10.'
      }
    }
  },

  // ==========================================
  // 4. BINARY SEARCH
  // ==========================================
  {
    id: '704',
    lcNumber: 704,
    title: 'Binary Search',
    topicId: 'binary-search',
    difficulty: 'Easy',
    pattern: 'Classic Binary Search',
    tag: 'Must',
    companyTags: ['TCS', 'Infosys', 'Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/binary-search/',
    hints: {
      hint1: 'Classic Binary Search on sorted array.',
      hint2: 'Compute mid = left + (right - left) / 2 to prevent integer overflow.',
      hint3: `// left = 0, right = n - 1
// While left <= right:
//   mid = left + (right - left) / 2
//   if nums[mid] == target: return mid
//   else if nums[mid] < target: left = mid + 1
//   else right = mid - 1`,
      hint4: {
        javaSolution: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
        timeComplexity: 'O(log n) - Halves the search space each step',
        spaceComplexity: 'O(1) - Constant space',
        explanation: 'Fundamental binary search template with boundary left <= right and mid overflow protection.'
      }
    }
  },
  {
    id: '33',
    lcNumber: 33,
    title: 'Search in Rotated Sorted Array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Rotated Array',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    hints: {
      hint1: 'Binary search with one guaranteed sorted half.',
      hint2: 'At least one half [left..mid] or [mid..right] is always normally sorted! Check if target falls in that sorted half.',
      hint3: `// If nums[left] <= nums[mid]: Left half is sorted
//    Check if target in [nums[left], nums[mid]]: right = mid - 1, else left = mid + 1
// Else: Right half is sorted
//    Check if target in [nums[mid], nums[right]]: left = mid + 1, else right = mid - 1`,
      hint4: {
        javaSolution: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;

            // Check if left half is sorted
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
        timeComplexity: 'O(log n) - Search space halved on each iteration',
        spaceComplexity: 'O(1) - Iterative pointer manipulation',
        explanation: 'In any rotated sorted array, either the left half or right half is strictly sorted, allowing deterministic branching.'
      }
    }
  },
  {
    id: '34',
    lcNumber: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Lower & Upper Bound Search',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
    hints: {
      hint1: 'Run two binary searches: one biased left (first pos) and one biased right (last pos).',
      hint2: 'When nums[mid] == target: to find first, set right = mid - 1; to find last, set left = mid + 1.',
      hint3: 'Binary search helper taking boolean findFirst flag.',
      hint4: {
        javaSolution: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = findBound(nums, target, true);
        if (first == -1) return new int[] { -1, -1 };
        int last = findBound(nums, target, false);
        return new int[] { first, last };
    }

    private int findBound(int[] nums, int target, boolean isFirst) {
        int left = 0, right = nums.length - 1;
        int bound = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                bound = mid;
                if (isFirst) {
                    right = mid - 1; // Seek further left
                } else {
                    left = mid + 1;  // Seek further right
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return bound;
    }
}`,
        timeComplexity: 'O(log n) - Two separate binary search executions',
        spaceComplexity: 'O(1) - In-place binary search',
        explanation: 'Keeps searching in the direction of the boundary even after discovering an instance of target.'
      }
    }
  },
  {
    id: '153',
    lcNumber: 153,
    title: 'Find Minimum in Rotated Sorted Array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Inflection Point',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    hints: {
      hint1: 'Binary search comparing mid against right boundary.',
      hint2: 'If nums[mid] > nums[right], the minimum lies strictly in the right half (left = mid + 1); otherwise right = mid.',
      hint3: `// left = 0, right = n - 1
// While left < right:
//   mid = left + (right - left) / 2
//   if nums[mid] > nums[right]: left = mid + 1
//   else right = mid
// Return nums[left]`,
      hint4: {
        javaSolution: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`,
        timeComplexity: 'O(log n) - Halves the search space per comparison',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Comparing with right boundary detects which portion contains the drop point where the array was rotated.'
      }
    }
  },
  {
    id: '875',
    lcNumber: 875,
    title: 'Koko Eating Bananas',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Answer Space',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart', 'Microsoft'],
    link: 'https://leetcode.com/problems/koko-eating-bananas/',
    hints: {
      hint1: 'Binary Search on Answer (eating speed k).',
      hint2: 'Search space for speed k is [1, max(piles)]. The feasibility function hoursNeeded(k) is monotonic decreasing.',
      hint3: `// left = 1, right = max(piles), ans = right
// While left <= right:
//   mid = speed
//   if canEatAll(piles, mid, h): ans = mid; right = mid - 1
//   else left = mid + 1`,
      hint4: {
        javaSolution: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for (int p : piles) right = Math.max(right, p);

        int bestSpeed = right;
        while (left <= right) {
            int midSpeed = left + (right - left) / 2;
            if (canFinish(piles, midSpeed, h)) {
                bestSpeed = midSpeed;
                right = midSpeed - 1; // Seek smaller valid speed
            } else {
                left = midSpeed + 1;  // Need faster speed
            }
        }
        return bestSpeed;
    }

    private boolean canFinish(int[] piles, int speed, int maxHours) {
        long totalHours = 0;
        for (int p : piles) {
            totalHours += (p + speed - 1) / speed; // Ceiling division
        }
        return totalHours <= maxHours;
    }
}`,
        timeComplexity: 'O(n * log(max(piles))) where n is piles length',
        spaceComplexity: 'O(1) - Constant memory',
        explanation: 'Applies binary search over the monotonic output space of possible speeds [1..maxPile].'
      }
    }
  },
  {
    id: '1011',
    lcNumber: 1011,
    title: 'Capacity To Ship Packages Within D Days',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Answer Space',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
    hints: {
      hint1: 'Binary Search on capacity answer range.',
      hint2: 'Min capacity is max(weights); Max capacity is sum(weights). Check if capacity can ship within days.',
      hint3: 'Greedy verification helper canShip(weights, capacity, days).',
      hint4: {
        javaSolution: `class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int left = 0, right = 0;
        for (int w : weights) {
            left = Math.max(left, w);
            right += w;
        }

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canShip(weights, mid, days)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

    private boolean canShip(int[] weights, int capacity, int maxDays) {
        int daysNeeded = 1;
        int currentWeight = 0;

        for (int w : weights) {
            if (currentWeight + w > capacity) {
                daysNeeded++;
                currentWeight = 0;
            }
            currentWeight += w;
        }
        return daysNeeded <= maxDays;
    }
}`,
        timeComplexity: 'O(n * log(sum(weights)))',
        spaceComplexity: 'O(1)',
        explanation: 'Binary search on monotonic capacity with greedy day simulation.'
      }
    }
  },
  {
    id: '410',
    lcNumber: 410,
    title: 'Split Array Largest Sum',
    topicId: 'binary-search',
    difficulty: 'Hard',
    pattern: 'Binary Search on Answer Space',
    tag: 'Must',
    companyTags: ['Amazon', 'Google', 'Flipkart'],
    link: 'https://leetcode.com/problems/split-array-largest-sum/',
    hints: {
      hint1: 'Binary search on maximum subarray sum answer.',
      hint2: 'Identical to Book Allocation and Ship Packages: search range [max(nums), sum(nums)].',
      hint3: 'Verify if array can be partitioned into <= k segments with each sum <= mid.',
      hint4: {
        javaSolution: `class Solution {
    public int splitArray(int[] nums, int k) {
        int left = 0, right = 0;
        for (int num : nums) {
            left = Math.max(left, num);
            right += num;
        }

        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canSplit(nums, mid, k)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }

    private boolean canSplit(int[] nums, int maxSum, int maxSubarrays) {
        int count = 1;
        int currentSum = 0;

        for (int num : nums) {
            if (currentSum + num > maxSum) {
                count++;
                currentSum = num;
            } else {
                currentSum += num;
            }
        }
        return count <= maxSubarrays;
    }
}`,
        timeComplexity: 'O(n * log(sum - max))',
        spaceComplexity: 'O(1)',
        explanation: 'Minimizes the maximum subarray sum using binary search on answer.'
      }
    }
  },

  // ==========================================
  // 5. STACK + QUEUE
  // ==========================================
  {
    id: '20',
    lcNumber: 20,
    title: 'Valid Parentheses',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Matching Stack',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/valid-parentheses/',
    hints: {
      hint1: 'Stack for matching open and close delimiters.',
      hint2: 'Push matching closing brackets onto the stack when seeing opening brackets; when seeing closing, verify pop matches.',
      hint3: `// Deque<Character> stack = new ArrayDeque<>()
// For char c in s:
//   if c == '(': stack.push(')')
//   else if c == '{': stack.push('}')
//   else if c == '[': stack.push(']')
//   else if stack.isEmpty() || stack.pop() != c: return false
// Return stack.isEmpty()`,
      hint4: {
        javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } else if (stack.isEmpty() || stack.pop() != c) {
                return false;
            }
        }
        return stack.isEmpty();
    }
}`,
        timeComplexity: 'O(n) - Single pass over characters',
        spaceComplexity: 'O(n) - Stack stores unmatched brackets',
        explanation: 'Pushes expected closing parenthesis onto the stack for clean O(1) comparison on closing character encounters.'
      }
    }
  },
  {
    id: '155',
    lcNumber: 155,
    title: 'Min Stack',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Min Stack Design',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/min-stack/',
    hints: {
      hint1: 'Two Stacks or Single Stack with pair (value, currentMin).',
      hint2: 'A secondary stack tracks the minimum value up to the current height.',
      hint3: 'On push: push val to mainStack, push min(val, minStack.peek()) to minStack.',
      hint4: {
        javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

class MinStack {
    private Deque<Integer> stack;
    private Deque<Integer> minStack;

    public MinStack() {
        stack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }
    
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }
    
    public void pop() {
        stack.pop();
        minStack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}`,
        timeComplexity: 'O(1) for all operations (push, pop, top, getMin)',
        spaceComplexity: 'O(n) - Secondary stack tracks minimum state',
        explanation: 'Synchronized secondary stack maintains historical minimum element at each stack depth.'
      }
    }
  },
  {
    id: '739',
    lcNumber: 739,
    title: 'Daily Temperatures',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Decreasing Stack',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/daily-temperatures/',
    hints: {
      hint1: 'Monotonic Decreasing Stack storing day indices.',
      hint2: 'When temperatures[i] exceeds temperatures[stack.peek()], pop and calculate days waited = i - prevIdx.',
      hint3: `// stack stores indices
// For i from 0 to n-1:
//   while (!stack.isEmpty() && temps[i] > temps[stack.peek()]):
//     prev = stack.pop()
//     ans[prev] = i - prev
//   stack.push(i)`,
      hint4: {
        javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevDay = stack.pop();
                answer[prevDay] = i - prevDay;
            }
            stack.push(i);
        }
        return answer;
    }
}`,
        timeComplexity: 'O(n) - Each index pushed and popped at most once',
        spaceComplexity: 'O(n) - Stack for indices',
        explanation: 'Monotonic stack resolves the next warmer day immediately when encountered.'
      }
    }
  },
  {
    id: '84',
    lcNumber: 84,
    title: 'Largest Rectangle in Histogram',
    topicId: 'stack-queue',
    difficulty: 'Hard',
    pattern: 'Monotonic Increasing Stack',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Google'],
    link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    hints: {
      hint1: 'Monotonic Increasing Stack.',
      hint2: 'For each bar, find previous smaller bar and next smaller bar. The area with bar as bottleneck is height * (right - left - 1).',
      hint3: 'Push indices; pop when current height is smaller and compute area for popped bar.',
      hint4: {
        javaSolution: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int currentHeight = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int h = heights[stack.pop()];
                int width = stack.isEmpty() ? i : (i - stack.peek() - 1);
                maxArea = Math.max(maxArea, h * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,
        timeComplexity: 'O(n) - Each bar index pushed and popped once',
        spaceComplexity: 'O(n) - Stack stores indices',
        explanation: 'Uses a dummy bar of height 0 at the end to flush out all remaining bars in the monotonic stack.'
      }
    }
  },

  // ==========================================
  // 6. SORTING + INTERVALS
  // ==========================================
  {
    id: '56',
    lcNumber: 56,
    title: 'Merge Intervals',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Interval Overlap Merge',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/merge-intervals/',
    hints: {
      hint1: 'Sort intervals by starting time a[0].',
      hint2: 'If current interval start <= previous interval end, merge them by extending previous end = max(prevEnd, currEnd).',
      hint3: `// Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]))
// For interval in intervals:
//   if merged.isEmpty() || curr[0] > merged.last()[1]: merged.add(curr)
//   else: merged.last()[1] = max(merged.last()[1], curr[1])`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();

        int[] currentInterval = intervals[0];
        merged.add(currentInterval);

        for (int i = 1; i < intervals.length; i++) {
            int currentEnd = currentInterval[1];
            int nextStart = intervals[i][0];
            int nextEnd = intervals[i][1];

            if (nextStart <= currentEnd) {
                // Overlap: extend current end
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                // Disjoint: start new interval
                currentInterval = intervals[i];
                merged.add(currentInterval);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
        timeComplexity: 'O(n log n) - Sorting dominant',
        spaceComplexity: 'O(n) - Output list storage',
        explanation: 'Sorting by start point aligns overlapping intervals sequentially for a single-pass merge.'
      }
    }
  },
  {
    id: '57',
    lcNumber: 57,
    title: 'Insert Interval',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Interval Merge',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/insert-interval/',
    hints: {
      hint1: 'Three phases: Left non-overlapping intervals, merged overlapping interval, Right non-overlapping intervals.',
      hint2: 'Add all intervals ending before newInterval starts; then merge all overlapping intervals; finally add remaining.',
      hint3: 'While intervals[i][1] < newInterval[0]: add. While intervals[i][0] <= newInterval[1]: merge. Add rest.',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        // 1. Add all intervals ending before newInterval begins
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i++]);
        }

        // 2. Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // 3. Add remaining intervals
        while (i < n) {
            result.add(intervals[i++]);
        }
        return result.toArray(new int[result.size()][]);
    }
}`,
        timeComplexity: 'O(n) - Single linear scan of pre-sorted intervals',
        spaceComplexity: 'O(n) - Output array',
        explanation: 'Exploits the pre-sorted input to perform a 3-phase partition in O(n) without sorting.'
      }
    }
  },
  {
    id: '435',
    lcNumber: 435,
    title: 'Non-overlapping Intervals',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Greedy Interval Scheduling',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/non-overlapping-intervals/',
    hints: {
      hint1: 'Greedy Interval Scheduling: sort by end time.',
      hint2: 'Always keep the interval that finishes earliest to leave maximum room for future intervals.',
      hint3: 'Sort by interval[1]; if curr[0] < prevEnd: removals++, else prevEnd = curr[1].',
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int end = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                count++; // Overlapping: remove current interval
            } else {
                end = intervals[i][1]; // No overlap: update finish boundary
            }
        }
        return count;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting by finish time',
        spaceComplexity: 'O(1) - In-place sort',
        explanation: 'Classic greedy activity selection: selecting earliest finish times maximizes non-overlapping selections.'
      }
    }
  },

  // ==========================================
  // 7. LINKED LIST
  // ==========================================
  {
    id: '206',
    lcNumber: 206,
    title: 'Reverse Linked List',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'In-Place Pointer Reversal',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/reverse-linked-list/',
    hints: {
      hint1: 'Three pointer iteration: prev, curr, next.',
      hint2: 'Save next node before rewiring curr.next = prev, then slide prev and curr forward.',
      hint3: `// prev = null, curr = head
// While curr != null:
//   next = curr.next
//   curr.next = prev
//   prev = curr
//   curr = next
// Return prev`,
      hint4: {
        javaSolution: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        timeComplexity: 'O(n) - Single traversal of the list',
        spaceComplexity: 'O(1) - Constant pointer manipulation',
        explanation: 'In-place pointer reversal preserving memory overhead.'
      }
    }
  },
  {
    id: '141',
    lcNumber: 141,
    title: 'Linked List Cycle',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'Floyd Cycle Detection',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'TCS'],
    link: 'https://leetcode.com/problems/linked-list-cycle/',
    hints: {
      hint1: 'Floyd\'s Tortoise and Hare (Fast & Slow Pointers).',
      hint2: 'Slow moves 1 step, Fast moves 2 steps; if there is a cycle, Fast will catch up to Slow.',
      hint3: `// slow = head, fast = head
// While fast != null && fast.next != null:
//   slow = slow.next
//   fast = fast.next.next
//   if slow == fast: return true
// Return false`,
      hint4: {
        javaSolution: `public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}`,
        timeComplexity: 'O(n) - Linear cycle detection',
        spaceComplexity: 'O(1) - Two pointer variables',
        explanation: 'Floyd\'s algorithm detects cyclic loops without allocating hash sets for visited nodes.'
      }
    }
  },
  {
    id: '21',
    lcNumber: 21,
    title: 'Merge Two Sorted Lists',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'Dummy Head Pointer Merge',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'Infosys'],
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    hints: {
      hint1: 'Dummy head node with two pointers.',
      hint2: 'Compare heads of l1 and l2, attach the smaller one to tail.next, advance tail and list pointer.',
      hint3: 'Attach remaining list once one becomes null.',
      hint4: {
        javaSolution: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
        timeComplexity: 'O(n + m) - Each node inspected once',
        spaceComplexity: 'O(1) - Spliced in-place using existing nodes',
        explanation: 'A dummy node simplifies head initialization edge cases.'
      }
    }
  },
  {
    id: '143',
    lcNumber: 143,
    title: 'Reorder List',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Find Middle + Reverse + Interleave',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/reorder-list/',
    hints: {
      hint1: '3 Steps: 1) Find middle with slow/fast, 2) Reverse second half, 3) Merge/Interleave both halves.',
      hint2: 'Cut list at middle into two distinct halves before reversing.',
      hint3: 'Interleave l1 and l2 one node at a time.',
      hint4: {
        javaSolution: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        // 1. Find middle
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 2. Reverse second half
        ListNode second = reverse(slow.next);
        slow.next = null; // Disconnect first half

        // 3. Interleave two halves
        ListNode first = head;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }

    private ListNode reverse(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
}`,
        timeComplexity: 'O(n) - Linear multi-step traversal',
        spaceComplexity: 'O(1) - In-place node relinking',
        explanation: 'Combines slow-fast middle discovery, linked list reversal, and two-pointer interleaving.'
      }
    }
  },
  {
    id: '146',
    lcNumber: 146,
    title: 'LRU Cache',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Hash Map + Doubly Linked List',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'Google'],
    link: 'https://leetcode.com/problems/lru-cache/',
    hints: {
      hint1: 'Doubly Linked List + Hash Map.',
      hint2: 'Doubly Linked List allows O(1) node deletion and insertion at head; Map provides O(1) key-to-node lookup.',
      hint3: 'Use dummy head and dummy tail to avoid null checks on edge nodes.',
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        addFirst(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            remove(node);
            addFirst(node);
        } else {
            if (map.size() == capacity) {
                Node lru = tail.prev;
                remove(lru);
                map.remove(lru.key);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addFirst(newNode);
        }
    }

    private void addFirst(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}`,
        timeComplexity: 'O(1) for both get and put',
        spaceComplexity: 'O(capacity) for map and doubly linked nodes',
        explanation: 'Standard interview design problem combining O(1) hash lookups with O(1) doubly linked list reordering.'
      }
    }
  },

  // ==========================================
  // 8. RECURSION + BACKTRACKING
  // ==========================================
  {
    id: '78',
    lcNumber: 78,
    title: 'Subsets',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Include / Exclude Choice',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/subsets/',
    hints: {
      hint1: 'Backtracking or Cascading iteration.',
      hint2: 'At each index, decide whether to include nums[i] or iterate over candidates to build combinations.',
      hint3: `// backtrack(start, currentList):
//   result.add(new ArrayList<>(currentList))
//   For i from start to n-1:
//     currentList.add(nums[i])
//     backtrack(i + 1, currentList)
//     currentList.remove(currentList.size() - 1)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1); // Backtrack
        }
    }
}`,
        timeComplexity: 'O(n * 2^n) - 2^n total subsets copied',
        spaceComplexity: 'O(n) - Recursion call stack depth',
        explanation: 'Standard backtracking generation for the power set.'
      }
    }
  },
  {
    id: '46',
    lcNumber: 46,
    title: 'Permutations',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Permutations with Visited State',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/permutations/',
    hints: {
      hint1: 'Backtracking with boolean visited array.',
      hint2: 'Build ordered permutations by choosing any unvisited element at each step.',
      hint3: 'Add to path, mark visited[i] = true, recurse, then unmark and remove.',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, used, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, used, path, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`,
        timeComplexity: 'O(n * n!) - n! leaf states',
        spaceComplexity: 'O(n) - Recursion depth and used array',
        explanation: 'Tracks used array to prevent reusing elements in the current permutation branch.'
      }
    }
  },
  {
    id: '39',
    lcNumber: 39,
    title: 'Combination Sum',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Unbounded Choice Backtracking',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart', 'Infosys'],
    link: 'https://leetcode.com/problems/combination-sum/',
    hints: {
      hint1: 'Backtracking with element reuse.',
      hint2: 'Allow repeating current element by passing i instead of i + 1 into recursive call.',
      hint3: 'Base cases: remain == 0 (save combination), remain < 0 (prune branch).',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) break; // Pruning
            path.add(candidates[i]);
            backtrack(candidates, remain - candidates[i], i, path, result); // Reuse allowed: i
            path.remove(path.size() - 1);
        }
    }
}`,
        timeComplexity: 'O(2^target)',
        spaceComplexity: 'O(target / min_candidate)',
        explanation: 'Sorts array for early pruning when candidate exceeds remaining sum.'
      }
    }
  },
  {
    id: '51',
    lcNumber: 51,
    title: 'N-Queens',
    topicId: 'recursion-backtracking',
    difficulty: 'Hard',
    pattern: 'Constraint Satisfaction Backtracking',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/n-queens/',
    hints: {
      hint1: 'Place queens row by row.',
      hint2: 'Track attacked columns, positive diagonals (row + col), and negative diagonals (row - col).',
      hint3: 'Use 3 HashSets or boolean arrays for cols, diag1, and diag2.',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> results = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');

        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n]; // row + col
        boolean[] diag2 = new boolean[2 * n]; // row - col + n

        backtrack(0, n, board, cols, diag1, diag2, results);
        return results;
    }

    private void backtrack(int row, int n, char[][] board, boolean[] cols, boolean[] diag1, boolean[] diag2, List<List<String>> res) {
        if (row == n) {
            List<String> list = new ArrayList<>();
            for (char[] r : board) list.add(new String(r));
            res.add(list);
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row + col;
            int d2 = row - col + n;
            if (cols[col] || diag1[d1] || diag2[d2]) continue;

            board[row][col] = 'Q';
            cols[col] = diag1[d1] = diag2[d2] = true;

            backtrack(row + 1, n, board, cols, diag1, diag2, res);

            board[row][col] = '.';
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }
}`,
        timeComplexity: 'O(N!) - Highly pruned state-space search',
        spaceComplexity: 'O(N^2) for chessboard board representation',
        explanation: 'Monitors attacked column and diagonal trajectories with O(1) lookup arrays.'
      }
    }
  },
  {
    id: '79',
    lcNumber: 79,
    title: 'Word Search',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Grid DFS with Visited State',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Bloomberg'],
    link: 'https://leetcode.com/problems/word-search/',
    hints: {
      hint1: '2D Grid DFS backtracking.',
      hint2: 'Mark visited cells in-place with a special character (e.g. \'#\') and restore afterwards.',
      hint3: 'Check boundary and word.charAt(index) match before exploring 4 neighbors.',
      hint4: {
        javaSolution: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) {
            return false;
        }

        char temp = board[r][c];
        board[r][c] = '#'; // Mark visited

        boolean found = dfs(board, word, r + 1, c, idx + 1) ||
                        dfs(board, word, r - 1, c, idx + 1) ||
                        dfs(board, word, r, c + 1, idx + 1) ||
                        dfs(board, word, r, c - 1, idx + 1);

        board[r][c] = temp; // Backtrack
        return found;
    }
}`,
        timeComplexity: 'O(m * n * 3^L) where L is word length',
        spaceComplexity: 'O(L) - Recursion stack depth',
        explanation: 'In-place character masking avoids allocating extra boolean matrices.'
      }
    }
  },

  // ==========================================
  // 9. TREES
  // ==========================================
  {
    id: '94',
    lcNumber: 94,
    title: 'Binary Tree Inorder Traversal',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Inorder DFS Traversal',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS'],
    link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    hints: {
      hint1: 'Left -> Root -> Right traversal.',
      hint2: 'Can be solved recursively or iteratively using an explicit stack.',
      hint3: 'Stack approach: push all left nodes; pop, record value, and move to node.right.',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            result.add(curr.val);
            curr = curr.right;
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Every node processed once',
        spaceComplexity: 'O(h) where h is tree height',
        explanation: 'Iterative stack simulation of inorder traversal.'
      }
    }
  },
  {
    id: '104',
    lcNumber: 104,
    title: 'Maximum Depth of Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Recursive Post-Order DFS',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    hints: {
      hint1: 'DFS post-order recursion.',
      hint2: 'Max depth of root = 1 + max(maxDepth(left), maxDepth(right)).',
      hint3: 'Base case: if root == null return 0.',
      hint4: {
        javaSolution: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
        timeComplexity: 'O(n) - Visits all nodes',
        spaceComplexity: 'O(h) - Call stack height',
        explanation: 'Classic recursive post-order tree depth calculation.'
      }
    }
  },
  {
    id: '102',
    lcNumber: 102,
    title: 'Binary Tree Level Order Traversal',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'BFS with Queue',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    hints: {
      hint1: 'BFS queue level-by-level.',
      hint2: 'Measure queue.size() at start of each while loop to process all nodes of current level together.',
      hint3: 'For i = 0 to size: pop node, add val, push children.',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Every node enqueued and dequeued once',
        spaceComplexity: 'O(n) - Max width of tree in queue',
        explanation: 'BFS queue-size technique isolates levels neatly.'
      }
    }
  },
  {
    id: '236',
    lcNumber: 236,
    title: 'Lowest Common Ancestor of a Binary Tree',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'Bottom-Up Post-Order DFS',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    hints: {
      hint1: 'Recursive bottom-up traversal.',
      hint2: 'If root is p or q, return root. If both left and right return non-null, root is LCA.',
      hint3: 'If only one side returns non-null, pass that result upward.',
      hint4: {
        javaSolution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) return root; // Split point is LCA
        return (left != null) ? left : right;
    }
}`,
        timeComplexity: 'O(n) - Visits all nodes in worst case',
        spaceComplexity: 'O(h) - Recursion stack height',
        explanation: 'The node where search paths for p and q diverge or terminate is their lowest common ancestor.'
      }
    }
  },
  {
    id: '98',
    lcNumber: 98,
    title: 'Validate Binary Search Tree',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'BST Invariant Range Validation',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Bloomberg'],
    link: 'https://leetcode.com/problems/validate-binary-search-tree/',
    hints: {
      hint1: 'Pass valid range (min, max) down recursively.',
      hint2: 'Use Long.MIN_VALUE and Long.MAX_VALUE boundaries so Integer.MIN_VALUE/MAX_VALUE don\'t overflow.',
      hint3: 'Every left child must be < root.val; right child must be > root.val.',
      hint4: {
        javaSolution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if (low != null && node.val <= low) return false;
        if (high != null && node.val >= high) return false;

        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
}`,
        timeComplexity: 'O(n) - Visits each node once',
        spaceComplexity: 'O(h) - Stack depth',
        explanation: 'Propagates strict bounds down the tree hierarchy.'
      }
    }
  },
  {
    id: '543',
    lcNumber: 543,
    title: 'Diameter of Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Post-Order DFS Diameter',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    hints: {
      hint1: 'Longest path passing through node is leftHeight + rightHeight.',
      hint2: 'Compute height recursively; update global diameter at each node.',
      hint3: 'Helper returns height; maxDiameter = max(maxDiameter, leftH + rightH).',
      hint4: {
        javaSolution: `class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        height(root);
        return maxDiameter;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int leftH = height(node.left);
        int rightH = height(node.right);
        maxDiameter = Math.max(maxDiameter, leftH + rightH);
        return 1 + Math.max(leftH, rightH);
    }
}`,
        timeComplexity: 'O(n) - Traverses tree once',
        spaceComplexity: 'O(h) - Call stack',
        explanation: 'Calculates node diameter simultaneously while computing tree heights.'
      }
    }
  },

  // ==========================================
  // 10. HEAP / PRIORITY QUEUE
  // ==========================================
  {
    id: '215',
    lcNumber: 215,
    title: 'Kth Largest Element in an Array',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Min-Heap of Size K',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    hints: {
      hint1: 'Min-Heap of fixed size k (or QuickSelect).',
      hint2: 'Keep smallest of top k elements at the head of a min-heap; when size exceeds k, poll the smallest.',
      hint3: `// PriorityQueue<Integer> minHeap = new PriorityQueue<>()
// For num in nums:
//   minHeap.offer(num)
//   if minHeap.size() > k: minHeap.poll()
// Return minHeap.peek()`,
      hint4: {
        javaSolution: `import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);

        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`,
        timeComplexity: 'O(n log k) - Maintaining heap of size k',
        spaceComplexity: 'O(k) - Storage for heap',
        explanation: 'Min-heap of size k retains the largest k elements, with top element being the k-th largest.'
      }
    }
  },
  {
    id: '295',
    lcNumber: 295,
    title: 'Find Median from Data Stream',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'Two Heaps (Max-Heap + Min-Heap)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/find-median-from-data-stream/',
    hints: {
      hint1: 'Two Heaps: Max-Heap for lower half, Min-Heap for upper half.',
      hint2: 'Balance heaps such that maxHeap has equal or 1 more element than minHeap.',
      hint3: 'Median is either maxHeap.peek() or average of both peeks.',
      hint4: {
        javaSolution: `import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Lower half
    private PriorityQueue<Integer> minHeap; // Upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());

        // Balance sizes: maxHeap can have at most 1 more element
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
        timeComplexity: 'O(log n) for addNum, O(1) for findMedian',
        spaceComplexity: 'O(n) - Store stream elements',
        explanation: 'Two opposing heaps split numbers dynamically across the median boundary.'
      }
    }
  },
  {
    id: '23',
    lcNumber: 23,
    title: 'Merge k Sorted Lists',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'K-Way Merge with Min-Heap',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    hints: {
      hint1: 'Min-Heap holding head node of each linked list.',
      hint2: 'Poll smallest node, add to merged list, and push its next node into heap if non-null.',
      hint3: 'PriorityQueue<ListNode> sorted by node.val.',
      hint4: {
        javaSolution: `import java.util.PriorityQueue;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        for (ListNode node : lists) {
            if (node != null) minHeap.offer(node);
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (!minHeap.isEmpty()) {
            ListNode smallest = minHeap.poll();
            tail.next = smallest;
            tail = tail.next;

            if (smallest.next != null) {
                minHeap.offer(smallest.next);
            }
        }
        return dummy.next;
    }
}`,
        timeComplexity: 'O(N log k) where N is total nodes and k is number of lists',
        spaceComplexity: 'O(k) - Heap size bounded by k',
        explanation: 'Always retrieves the globally minimum next element in O(log k).'
      }
    }
  },

  // ==========================================
  // 11. GREEDY
  // ==========================================
  {
    id: '55',
    lcNumber: 55,
    title: 'Jump Game',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Max Reachable Index',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/jump-game/',
    hints: {
      hint1: 'Greedy maximum reach tracking.',
      hint2: 'Maintain maxReach index. If current index i > maxReach, destination is unreachable.',
      hint3: 'maxReach = max(maxReach, i + nums[i]); return maxReach >= n - 1.',
      hint4: {
        javaSolution: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n) - Single forward pass',
        spaceComplexity: 'O(1) - Single variable tracking reach',
        explanation: 'Greedily updates the farthest index reachable at every step.'
      }
    }
  },
  {
    id: '121',
    lcNumber: 121,
    title: 'Best Time to Buy and Sell Stock',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'One-Pass Min Price Tracker',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    hints: {
      hint1: 'Track minimum buying price seen so far.',
      hint2: 'At each price, calculate profit = price - minPrice; update maxProfit.',
      hint3: 'minPrice = min(minPrice, p), maxProfit = max(maxProfit, p - minPrice).',
      hint4: {
        javaSolution: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`,
        timeComplexity: 'O(n) - Single pass',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Keeps track of lowest historical price to calculate optimal sell profit.'
      }
    }
  },
  {
    id: '134',
    lcNumber: 134,
    title: 'Gas Station',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Cumulative Balance Reset',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft'],
    link: 'https://leetcode.com/problems/gas-station/',
    hints: {
      hint1: 'If total gas < total cost, complete circuit is impossible.',
      hint2: 'If running tank < 0 when traveling from start to i, no station between start and i can be the start station. Reset start = i + 1.',
      hint3: 'track totalSurplus and currentTank.',
      hint4: {
        javaSolution: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalSurplus = 0;
        int currentTank = 0;
        int startStation = 0;

        for (int i = 0; i < gas.length; i++) {
            int net = gas[i] - cost[i];
            totalSurplus += net;
            currentTank += net;

            if (currentTank < 0) {
                startStation = i + 1;
                currentTank = 0;
            }
        }
        return totalSurplus >= 0 ? startStation : -1;
    }
}`,
        timeComplexity: 'O(n) - Single linear sweep',
        spaceComplexity: 'O(1) - Constant tracking variables',
        explanation: 'Any sub-journey dropping balance below zero cannot start from any intermediate point.'
      }
    }
  },

  // ==========================================
  // 12. GRAPHS
  // ==========================================
  {
    id: '200',
    lcNumber: 200,
    title: 'Number of Islands',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Matrix Connected Components (DFS/BFS)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/number-of-islands/',
    hints: {
      hint1: 'DFS / BFS connected component traversal on 2D matrix.',
      hint2: 'When visiting \'1\', increment island count and sink the island by mutating connected \'1\'s into \'0\'s.',
      hint3: 'Explore 4 directions: up, down, left, right.',
      hint4: {
        javaSolution: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int islands = 0;

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    sink(grid, r, c);
                }
            }
        }
        return islands;
    }

    private void sink(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') {
            return;
        }
        grid[r][c] = '0'; // Sink cell
        sink(grid, r + 1, c);
        sink(grid, r - 1, c);
        sink(grid, r, c + 1);
        sink(grid, r, c - 1);
    }
}`,
        timeComplexity: 'O(m * n) - Each cell visited once',
        spaceComplexity: 'O(m * n) - Call stack in worst-case land grid',
        explanation: 'Connected components identified via recursive DFS sink pattern.'
      }
    }
  },
  {
    id: '207',
    lcNumber: 207,
    title: 'Course Schedule',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Topological Sort / Cycle Detection',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/course-schedule/',
    hints: {
      hint1: 'Kahn\'s BFS algorithm (In-Degree) or 3-color DFS.',
      hint2: 'Build adjacency list and in-degree array; push nodes with inDegree == 0 into queue.',
      hint3: 'If total nodes popped from queue == numCourses, topological ordering exists (no cycle).',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int completed = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            completed++;
            for (int neighbor : adj.get(course)) {
                if (--inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return completed == numCourses;
    }
}`,
        timeComplexity: 'O(V + E) - Visits all vertices and edges',
        spaceComplexity: 'O(V + E) - Adjacency graph and in-degree array',
        explanation: 'Kahn\'s algorithm detects dependency cycles using BFS and in-degrees.'
      }
    }
  },
  {
    id: '133',
    lcNumber: 133,
    title: 'Clone Graph',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'DFS / BFS Graph Hash Map Clone',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/clone-graph/',
    hints: {
      hint1: 'DFS with Hash Map oldNode -> clonedNode.',
      hint2: 'Before cloning neighbors, register cloned node into map to prevent infinite cycles.',
      hint3: 'If map.containsKey(node), return map.get(node).',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    private Map<Node, Node> visited = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (visited.containsKey(node)) return visited.get(node);

        Node clone = new Node(node.val);
        visited.put(node, clone);

        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }
}`,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V) for visited clone mapping',
        explanation: 'Memoized DFS graph cloning preserving vertex references.'
      }
    }
  },
  {
    id: '743',
    lcNumber: 743,
    title: 'Network Delay Time',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Dijkstra Shortest Path',
    tag: 'Must',
    companyTags: ['Amazon', 'Google'],
    link: 'https://leetcode.com/problems/network-delay-time/',
    hints: {
      hint1: 'Dijkstra\'s Algorithm for single-source shortest path with positive weights.',
      hint2: 'Use PriorityQueue<(node, dist)> to greedily settle nearest nodes first.',
      hint3: 'Track distTo[] initialized to infinity; answer is max(distTo[1..n]).',
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] t : times) {
            graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[] { t[1], t[2] });
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        pq.offer(new int[] { k, 0 });

        Map<Integer, Integer> dist = new HashMap<>();

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int node = curr[0], d = curr[1];
            if (dist.containsKey(node)) continue;
            dist.put(node, d);

            if (graph.containsKey(node)) {
                for (int[] next : graph.get(node)) {
                    int neighbor = next[0], weight = next[1];
                    if (!dist.containsKey(neighbor)) {
                        pq.offer(new int[] { neighbor, d + weight });
                    }
                }
            }
        }

        if (dist.size() != n) return -1;
        int maxDist = 0;
        for (int d : dist.values()) maxDist = Math.max(maxDist, d);
        return maxDist;
    }
}`,
        timeComplexity: 'O(E log V) - Priority queue Dijkstra',
        spaceComplexity: 'O(V + E) - Graph representation',
        explanation: 'Standard Dijkstra on weighted network graph to determine maximal shortest transmission latency.'
      }
    }
  },

  // ==========================================
  // 13. DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: '70',
    lcNumber: 70,
    title: 'Climbing Stairs',
    topicId: 'dynamic-programming',
    difficulty: 'Easy',
    pattern: '1D DP (Fibonacci recurrence)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/climbing-stairs/',
    hints: {
      hint1: 'dp[i] = dp[i - 1] + dp[i - 2].',
      hint2: 'You can reach step i from either step (i - 1) or step (i - 2).',
      hint3: 'Only need previous two values (prev1, prev2) for O(1) space.',
      hint4: {
        javaSolution: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;

        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
        timeComplexity: 'O(n) - Single linear iteration',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Classic state transition reducing space from O(n) array to O(1) registers.'
      }
    }
  },
  {
    id: '198',
    lcNumber: 198,
    title: 'House Robber',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '1D DP (Skip or Take)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/house-robber/',
    hints: {
      hint1: 'Decision at house i: rob current (nums[i] + rob[i-2]) OR skip (rob[i-1]).',
      hint2: 'dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]).',
      hint3: 'Store prev1 and prev2 for O(1) space.',
      hint4: {
        javaSolution: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0; // max profit excluding adjacent
        int prev1 = 0; // max profit up to previous house

        for (int num : nums) {
            int current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
}`,
        timeComplexity: 'O(n) - Single pass through nums',
        spaceComplexity: 'O(1) - Memory-optimized DP',
        explanation: 'Computes maximal loot dynamically respecting non-adjacent robbery constraints.'
      }
    }
  },
  {
    id: '62',
    lcNumber: 62,
    title: 'Unique Paths',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '2D Grid DP',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/unique-paths/',
    hints: {
      hint1: 'dp[r][c] = dp[r - 1][c] + dp[r][c - 1].',
      hint2: 'Paths to cell (r, c) equals sum of paths from above and left.',
      hint3: 'Can compress to 1D array of size n.',
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                dp[c] += dp[c - 1];
            }
        }
        return dp[n - 1];
    }
}`,
        timeComplexity: 'O(m * n) - Grid traversal',
        spaceComplexity: 'O(n) - Row array space compression',
        explanation: 'Cumulative path combinatorics compressed into 1D rolling array.'
      }
    }
  },
  {
    id: '322',
    lcNumber: 322,
    title: 'Coin Change',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Unbounded Knapsack DP',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Adobe'],
    link: 'https://leetcode.com/problems/coin-change/',
    hints: {
      hint1: 'Unbounded Knapsack bottom-up DP.',
      hint2: 'dp[i] = min coins to make amount i. For coin c: dp[i] = min(dp[i], 1 + dp[i - c]).',
      hint3: 'Initialize dp array with amount + 1; dp[0] = 0.',
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        timeComplexity: 'O(amount * coins.length)',
        spaceComplexity: 'O(amount) for DP table',
        explanation: 'Iteratively establishes the optimal sub-solutions for every amount from 1 to target.'
      }
    }
  },
  {
    id: '300',
    lcNumber: 300,
    title: 'Longest Increasing Subsequence',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: 'Patience Sorting / Binary Search DP',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    hints: {
      hint1: 'O(n log n) with Patience Sorting / Binary Search (tails array).',
      hint2: 'tails[i] stores smallest tail of all increasing subsequences of length i + 1. Binary search for num in tails.',
      hint3: 'If num > all tails: append; else replace first element in tails >= num.',
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;

        for (int num : nums) {
            int left = 0, right = size;
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            tails[left] = num;
            if (left == size) size++;
        }
        return size;
    }
}`,
        timeComplexity: 'O(n log n) - Binary search for each element',
        spaceComplexity: 'O(n) - Tails array',
        explanation: 'Patience sorting finds LIS in O(n log n) by maintaining minimal tail candidates.'
      }
    }
  },
  {
    id: '1143',
    lcNumber: 1143,
    title: 'Longest Common Subsequence',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '2D String Matching DP',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/longest-common-subsequence/',
    hints: {
      hint1: '2D DP grid comparing prefixes of s1 and s2.',
      hint2: 'If chars match: dp[i][j] = 1 + dp[i-1][j-1]. If mismatch: max(dp[i-1][j], dp[i][j-1]).',
      hint3: 'dp[text1.length + 1][text2.length + 1].',
      hint4: {
        javaSolution: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
        explanation: 'Standard dynamic programming state table for character sequence alignment.'
      }
    }
  },
  {
    id: '72',
    lcNumber: 72,
    title: 'Edit Distance',
    topicId: 'dynamic-programming',
    difficulty: 'Hard',
    pattern: '2D Transformation DP',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    link: 'https://leetcode.com/problems/edit-distance/',
    hints: {
      hint1: 'Levenshtein Distance 2D DP.',
      hint2: 'Operations: Insert (dp[i][j-1]), Delete (dp[i-1][j]), Replace (dp[i-1][j-1]).',
      hint3: 'Take 1 + min of the three operations when characters differ.',
      hint4: {
        javaSolution: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], // Replace
                                   Math.min(dp[i - 1][j],     // Delete
                                            dp[i][j - 1]));   // Insert
                }
            }
        }
        return dp[m][n];
    }
}`,
        timeComplexity: 'O(m * n)',
        spaceComplexity: 'O(m * n)',
        explanation: 'Optimal character alignment considering insert, delete, and replace operations.'
      }
    }
  },
  {
    id: '416',
    lcNumber: 416,
    title: 'Partition Equal Subset Sum',
    topicId: 'dynamic-programming',
    difficulty: 'Medium',
    pattern: '0/1 Knapsack Subset Sum',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    hints: {
      hint1: 'Reduce to 0/1 Knapsack: find subset with sum = totalSum / 2.',
      hint2: 'If totalSum is odd, return false immediately.',
      hint3: '1D boolean dp array traversed in reverse from target down to num.',
      hint4: {
        javaSolution: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int num : nums) sum += num;
        if (sum % 2 != 0) return false;

        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }
}`,
        timeComplexity: 'O(n * target)',
        spaceComplexity: 'O(target) - 1D reverse boolean array',
        explanation: '0/1 Knapsack decision table solved backwards to reuse array in-place.'
      }
    }
  },

  // ==========================================
  // 14. TRIE + BIT MANIPULATION
  // ==========================================
  {
    id: '208',
    lcNumber: 208,
    title: 'Implement Trie (Prefix Tree)',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Prefix Tree Node Structure',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'Google'],
    link: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    hints: {
      hint1: 'TrieNode containing TrieNode[26] children and boolean isEnd.',
      hint2: 'For each character c: child = node.children[c - \'a\']; if null, create new TrieNode.',
      hint3: 'Search checks isEnd == true; startsWith only requires path existence.',
      hint4: {
        javaSolution: `class Trie {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = findPrefix(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return findPrefix(prefix) != null;
    }

    private TrieNode findPrefix(String str) {
        TrieNode curr = root;
        for (char c : str.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return null;
            curr = curr.children[idx];
        }
        return curr;
    }
}`,
        timeComplexity: 'O(L) for insert, search, and startsWith where L is word length',
        spaceComplexity: 'O(total characters in words * 26)',
        explanation: 'Standard prefix tree enabling O(length) search and prefix autocomplete.'
      }
    }
  },
  {
    id: '136',
    lcNumber: 136,
    title: 'Single Number',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitwise XOR Cancellation',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/single-number/',
    hints: {
      hint1: 'Bitwise XOR properties: x ^ x = 0, x ^ 0 = x.',
      hint2: 'XOR all numbers in the array. All duplicates cancel out, leaving only the unique element.',
      hint3: 'result ^= num for each num.',
      hint4: {
        javaSolution: `class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Single pass',
        spaceComplexity: 'O(1) - Constant memory',
        explanation: 'XOR cancellation property eliminates pairs without auxiliary storage.'
      }
    }
  },
  {
    id: '191',
    lcNumber: 191,
    title: 'Number of 1 Bits',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Brian Kernighan\'s Bit Trick',
    tag: 'Must',
    companyTags: ['Microsoft', 'Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/number-of-1-bits/',
    hints: {
      hint1: 'Brian Kernighan\'s trick: n & (n - 1) flips the lowest set bit to 0.',
      hint2: 'Loop while n != 0: n = n & (n - 1); increment count.',
      hint3: 'Runs in O(number of set bits), not 32 iterations.',
      hint4: {
        javaSolution: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // Clears the lowest set bit
            count++;
        }
        return count;
    }
}`,
        timeComplexity: 'O(k) where k is number of 1-bits (at most 32)',
        spaceComplexity: 'O(1) - Constant',
        explanation: 'Brian Kernighan algorithm skips over zero bits entirely.'
      }
    }
  },
  {
    id: '268',
    lcNumber: 268,
    title: 'Missing Number',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitwise XOR / Gauss Sum',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS'],
    link: 'https://leetcode.com/problems/missing-number/',
    hints: {
      hint1: 'XOR all indices 0..n with all array numbers, or use Gauss sum n*(n+1)/2.',
      hint2: 'xorSum = n; For i in 0..n-1: xorSum ^= i ^ nums[i].',
      hint3: 'All present numbers cancel out with their indices, leaving the missing number.',
      hint4: {
        javaSolution: `class Solution {
    public int missingNumber(int[] nums) {
        int xor = nums.length;
        for (int i = 0; i < nums.length; i++) {
            xor ^= i ^ nums[i];
        }
        return xor;
    }
}`,
        timeComplexity: 'O(n) - Single pass',
        spaceComplexity: 'O(1) - Bitwise accumulator',
        explanation: 'XOR cancels matching indices and values, revealing the unmatched missing index.'
      }
    }
  },
  {
    id: '338',
    lcNumber: 338,
    title: 'Counting Bits',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bit DP Transition',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/counting-bits/',
    hints: {
      hint1: 'DP with right shift: ans[i] = ans[i >> 1] + (i & 1).',
      hint2: 'Number of set bits in i equals bits in (i / 2) plus lowest bit (i % 2).',
      hint3: 'Single linear loop from 1 to n.',
      hint4: {
        javaSolution: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
}`,
        timeComplexity: 'O(n) - Linear DP',
        spaceComplexity: 'O(n) - Output array',
        explanation: 'Reuses previous bit counts via bitwise right shift.'
      }
    }
  },
  {
    id: '974',
    lcNumber: 974,
    title: "Subarray Sums Divisible by K",
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: "Prefix Sum + Modulo Frequency Map",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
    hints: {
      hint1: "Prefix Sum combined with Modulo Arithmetic.",
      hint2: "If two prefix sums have the same remainder when divided by k, the subarray between them is divisible by k.",
      hint3: "// 1. Maintain running sum and remainder count map: count[0] = 1\n// 2. For each num:\n//      sum += num\n//      rem = ((sum % k) + k) % k  (handle negative mod)\n//      ans += count[rem]\n//      count[rem]++\n// 3. Return ans",
      hint4: {
        javaSolution: "class Solution {\n    public int subarraysDivByK(int[] nums, int k) {\n        int[] modCounts = new int[k];\n        modCounts[0] = 1;\n        int runningSum = 0;\n        int result = 0;\n\n        for (int num : nums) {\n            runningSum += num;\n            int rem = ((runningSum % k) + k) % k;\n            result += modCounts[rem];\n            modCounts[rem]++;\n        }\n        return result;\n    }\n}",
        timeComplexity: "O(n) - Single pass over array",
        spaceComplexity: "O(k) - Frequency array of size k",
        explanation: "Prefix remainder congruence guarantees that equal remainders yield subarrays with a sum divisible by k."
      }
    }
  },
  {
    id: '525',
    lcNumber: 525,
    title: "Contiguous Array",
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: "Prefix Sum + Earliest Index Map",
    tag: 'Good',
    companyTags: ["Amazon","Adobe","TCS"],
    link: 'https://leetcode.com/problems/contiguous-array/',
    hints: {
      hint1: "Convert 0 to -1 so the problem becomes finding the longest subarray with sum = 0.",
      hint2: "Store the earliest occurrence of each prefix sum in a hash map to maximize the subarray length.",
      hint3: "// 1. map[0] = -1\n// 2. sum = 0, maxLen = 0\n// 3. For i from 0 to n-1:\n//      sum += (nums[i] == 1 ? 1 : -1)\n//      If sum in map: maxLen = max(maxLen, i - map[sum])\n//      Else: map[sum] = i\n// 4. Return maxLen",
      hint4: {
        javaSolution: "import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int findMaxLength(int[] nums) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, -1);\n        int sum = 0;\n        int maxLen = 0;\n\n        for (int i = 0; i < nums.length; i++) {\n            sum += (nums[i] == 1 ? 1 : -1);\n            if (map.containsKey(sum)) {\n                maxLen = Math.max(maxLen, i - map.get(sum));\n            } else {\n                map.put(sum, i);\n            }\n        }\n        return maxLen;\n    }\n}",
        timeComplexity: "O(n) - Single pass through the array",
        spaceComplexity: "O(n) - Hash map storing prefix sums",
        explanation: "Treating 0 as -1 maps the balanced 0/1 count to finding the longest subarray with net sum zero."
      }
    }
  },
  {
    id: '380',
    lcNumber: 380,
    title: "Insert Delete GetRandom O(1)",
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: "Hash Map + Dynamic Array Swap",
    tag: 'Bonus',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
    hints: {
      hint1: "Hash map provides O(1) insert and delete; Array provides O(1) random access.",
      hint2: "To delete in O(1) from an array, swap the element to remove with the last element and pop the end.",
      hint3: "// 1. ArrayList stores values, HashMap stores val -> index\n// 2. insert(val): if not present, append to list, put in map\n// 3. remove(val): swap list[map[val]] with list.last(), update map, pop last\n// 4. getRandom(): return list[rand.nextInt(list.size())]",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass RandomizedSet {\n    private List<Integer> list;\n    private Map<Integer, Integer> map;\n    private Random rand;\n\n    public RandomizedSet() {\n        list = new ArrayList<>();\n        map = new HashMap<>();\n        rand = new Random();\n    }\n    \n    public boolean insert(int val) {\n        if (map.containsKey(val)) return false;\n        map.put(val, list.size());\n        list.add(val);\n        return true;\n    }\n    \n    public boolean remove(int val) {\n        if (!map.containsKey(val)) return false;\n        int idx = map.get(val);\n        int lastVal = list.get(list.size() - 1);\n        list.set(idx, lastVal);\n        map.put(lastVal, idx);\n        list.remove(list.size() - 1);\n        map.remove(val);\n        return true;\n    }\n    \n    public int getRandom() {\n        return list.get(rand.nextInt(list.size()));\n    }\n}",
        timeComplexity: "O(1) average for insert, remove, and getRandom",
        spaceComplexity: "O(n) - Storing n unique elements",
        explanation: "Swapping with the tail allows instant deletion from an array list without shifting elements."
      }
    }
  },
  {
    id: '81',
    lcNumber: 81,
    title: "Search in Rotated Sorted Array II",
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: "Rotated Binary Search with Duplicates",
    tag: 'Good',
    companyTags: ["Microsoft","Adobe","Amazon"],
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/',
    hints: {
      hint1: "Rotated sorted array with potential duplicate values.",
      hint2: "When nums[left] == nums[mid] == nums[right], we cannot determine which half is sorted; increment left and decrement right.",
      hint3: "// While left <= right:\n//   If nums[mid] == target: return true\n//   If nums[left] == nums[mid] == nums[right]: left++; right--; continue\n//   Else check which half is sorted and test if target falls in range",
      hint4: {
        javaSolution: "class Solution {\n    public boolean search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return true;\n\n            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {\n                left++;\n                right--;\n            } else if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        return false;\n    }\n}",
        timeComplexity: "O(log n) average, O(n) worst case with duplicates",
        spaceComplexity: "O(1) - Constant auxiliary space",
        explanation: "When endpoints and midpoint match, narrowing boundaries bypasses ambiguity safely."
      }
    }
  },
  {
    id: '540',
    lcNumber: 540,
    title: "Single Element in a Sorted Array",
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: "Binary Search on Index Parity",
    tag: 'Must',
    companyTags: ["Amazon","Flipkart","Infosys"],
    link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/',
    hints: {
      hint1: "Every element appears twice except one single unique element.",
      hint2: "Before the single element, pairs start at even indices (even, odd). After the single element, pairs start at odd indices (odd, even).",
      hint3: "// Binary search on even indices:\n//   mid = left + (right - left) / 2\n//   if mid is odd: mid--\n//   if nums[mid] == nums[mid + 1]: single is to the right -> left = mid + 2\n//   else: single is at mid or left -> right = mid",
      hint4: {
        javaSolution: "class Solution {\n    public int singleNonDuplicate(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (mid % 2 == 1) mid--;\n            if (nums[mid] == nums[mid + 1]) {\n                left = mid + 2;\n            } else {\n                right = mid;\n            }\n        }\n        return nums[left];\n    }\n}",
        timeComplexity: "O(log n) - Binary search halving search space",
        spaceComplexity: "O(1) - In-place comparison",
        explanation: "Parity alignment of duplicate pairs dictates which half harbors the disruption."
      }
    }
  },
  {
    id: '739',
    lcNumber: 739,
    title: "Daily Temperatures",
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: "Monotonic Decreasing Stack",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Adobe"],
    link: 'https://leetcode.com/problems/daily-temperatures/',
    hints: {
      hint1: "Looking for the next greater element to the right for each day.",
      hint2: "Maintain a stack of indices with decreasing temperatures. When a warmer day arrives, pop and record day differences.",
      hint3: "// 1. Stack stores indices\n// 2. For i from 0 to n-1:\n//      while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]):\n//          prevIdx = stack.pop()\n//          ans[prevIdx] = i - prevIdx\n//      stack.push(i)\n// 3. Return ans",
      hint4: {
        javaSolution: "import java.util.Stack;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] ans = new int[n];\n        Stack<Integer> stack = new Stack<>();\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prev = stack.pop();\n                ans[prev] = i - prev;\n            }\n            stack.push(i);\n        }\n        return ans;\n    }\n}",
        timeComplexity: "O(n) - Each element is pushed and popped at most once",
        spaceComplexity: "O(n) - Stack for indices",
        explanation: "The monotonic stack ensures each temperature waits in LIFO order until resolved by the next warmer day."
      }
    }
  },
  {
    id: '84',
    lcNumber: 84,
    title: "Largest Rectangle in Histogram",
    topicId: 'stack-queue',
    difficulty: 'Hard',
    pattern: "Monotonic Stack for Rectangle Area",
    tag: 'Bonus',
    companyTags: ["Amazon","Flipkart","Microsoft"],
    link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    hints: {
      hint1: "Each bar can extend left and right until encountering a bar with strictly smaller height.",
      hint2: "A monotonic increasing stack finds the left and right boundary of every bar in O(n) total time.",
      hint3: "// 1. Monotonic stack of indices with increasing heights\n// 2. For each bar i (and trailing 0 sentinel):\n//      while (!stack.isEmpty() && heights[i] < heights[stack.peek()]):\n//          h = heights[stack.pop()]\n//          w = stack.isEmpty() ? i : (i - stack.peek() - 1)\n//          maxArea = max(maxArea, h * w)\n//      stack.push(i)",
      hint4: {
        javaSolution: "import java.util.Stack;\n\nclass Solution {\n    public int largestRectangleArea(int[] heights) {\n        int n = heights.length;\n        Stack<Integer> stack = new Stack<>();\n        int maxArea = 0;\n\n        for (int i = 0; i <= n; i++) {\n            int currentHeight = (i == n) ? 0 : heights[i];\n            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n                int h = heights[stack.pop()];\n                int w = stack.isEmpty() ? i : (i - stack.peek() - 1);\n                maxArea = Math.max(maxArea, h * w);\n            }\n            stack.push(i);\n        }\n        return maxArea;\n    }\n}",
        timeComplexity: "O(n) - Each index is pushed and popped exactly once",
        spaceComplexity: "O(n) - Stack storage",
        explanation: "Popping an index reveals both its right boundary (current i) and left boundary (new stack top)."
      }
    }
  },
  {
    id: '150',
    lcNumber: 150,
    title: "Evaluate Reverse Polish Notation",
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: "Stack for Postfix Expression",
    tag: 'Good',
    companyTags: ["Microsoft","Adobe","TCS"],
    link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
    hints: {
      hint1: "Postfix notation processes operands before operators.",
      hint2: "Push numbers onto stack; when an operator is reached, pop two numbers, apply operation, and push result back.",
      hint3: "// For each token:\n//   If operator (+, -, *, /):\n//     b = pop(), a = pop()\n//     push(applyOp(a, b))\n//   Else: push(parseInt(token))\n// Return pop()",
      hint4: {
        javaSolution: "import java.util.Stack;\n\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> stack = new Stack<>();\n        for (String t : tokens) {\n            if (t.equals(\"+\")) {\n                stack.push(stack.pop() + stack.pop());\n            } else if (t.equals(\"-\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a - b);\n            } else if (t.equals(\"*\")) {\n                stack.push(stack.pop() * stack.pop());\n            } else if (t.equals(\"/\")) {\n                int b = stack.pop();\n                int a = stack.pop();\n                stack.push(a / b);\n            } else {\n                stack.push(Integer.parseInt(t));\n            }\n        }\n        return stack.pop();\n    }\n}",
        timeComplexity: "O(n) - Linear pass through all tokens",
        spaceComplexity: "O(n) - Stack storing operands",
        explanation: "Stack guarantees the most recent operands are evaluated strictly in postfix priority."
      }
    }
  },
  {
    id: '232',
    lcNumber: 232,
    title: "Implement Queue using Stacks",
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: "Two Stacks for FIFO Simulation",
    tag: 'Good',
    companyTags: ["TCS","Infosys","Wipro","Amazon"],
    link: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    hints: {
      hint1: "Stacks are LIFO; reversing twice yields FIFO.",
      hint2: "Use an in-stack for pushes and out-stack for pops/peeks. Transfer only when out-stack is empty.",
      hint3: "// push(x): in.push(x)\n// pop(): shift(); return out.pop()\n// peek(): shift(); return out.peek()\n// shift(): if out is empty, pop all from in to out",
      hint4: {
        javaSolution: "import java.util.Stack;\n\nclass MyQueue {\n    private Stack<Integer> in;\n    private Stack<Integer> out;\n\n    public MyQueue() {\n        in = new Stack<>();\n        out = new Stack<>();\n    }\n    \n    public void push(int x) {\n        in.push(x);\n    }\n    \n    public int pop() {\n        shift();\n        return out.pop();\n    }\n    \n    public int peek() {\n        shift();\n        return out.peek();\n    }\n    \n    public boolean empty() {\n        return in.isEmpty() && out.isEmpty();\n    }\n\n    private void shift() {\n        if (out.isEmpty()) {\n            while (!in.isEmpty()) {\n                out.push(in.pop());\n            }\n        }\n    }\n}",
        timeComplexity: "Amortized O(1) for each operation",
        spaceComplexity: "O(n) - Storing n elements across two stacks",
        explanation: "Each element moves from in-stack to out-stack at most once, yielding amortized O(1) pops and peeks."
      }
    }
  },
  {
    id: '496',
    lcNumber: 496,
    title: "Next Greater Element I",
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: "Monotonic Stack + Hash Map Lookup",
    tag: 'Must',
    companyTags: ["Amazon","Adobe","TCS"],
    link: 'https://leetcode.com/problems/next-greater-element-i/',
    hints: {
      hint1: "Find next greater element in nums2 for elements present in nums1.",
      hint2: "Precompute next greater element for all items in nums2 using a monotonic stack and store answers in a hash map.",
      hint3: "// 1. Stack for nums2 elements\n// 2. Map stores num -> nextGreater\n// 3. For x in nums2:\n//      while (!stack.isEmpty() && x > stack.peek()): map.put(stack.pop(), x)\n//      stack.push(x)\n// 4. For y in nums1: ans[i] = map.getOrDefault(y, -1)",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        Stack<Integer> stack = new Stack<>();\n\n        for (int num : nums2) {\n            while (!stack.isEmpty() && num > stack.peek()) {\n                map.put(stack.pop(), num);\n            }\n            stack.push(num);\n        }\n\n        int[] ans = new int[nums1.length];\n        for (int i = 0; i < nums1.length; i++) {\n            ans[i] = map.getOrDefault(nums1[i], -1);\n        }\n        return ans;\n    }\n}",
        timeComplexity: "O(n + m) - Where n and m are lengths of nums1 and nums2",
        spaceComplexity: "O(m) - Hash map and stack",
        explanation: "Monotonic stack solves nums2 in O(m); hash map answers nums1 queries in O(1) each."
      }
    }
  },
  {
    id: '435',
    lcNumber: 435,
    title: "Non-overlapping Intervals",
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: "Greedy Interval Scheduling by End Time",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/non-overlapping-intervals/',
    hints: {
      hint1: "Classic interval scheduling: remove minimum intervals to eliminate overlaps.",
      hint2: "Sort by end times. Always retain the interval that ends earliest to leave the maximum room for remaining intervals.",
      hint3: "// 1. Sort intervals by end time intervals[i][1]\n// 2. prevEnd = intervals[0][1], removals = 0\n// 3. For i from 1 to n-1:\n//      if intervals[i][0] < prevEnd: removals++\n//      else: prevEnd = intervals[i][1]\n// 4. Return removals",
      hint4: {
        javaSolution: "import java.util.Arrays;\n\nclass Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n\n        int count = 0;\n        int prevEnd = intervals[0][1];\n\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < prevEnd) {\n                count++;\n            } else {\n                prevEnd = intervals[i][1];\n            }\n        }\n        return count;\n    }\n}",
        timeComplexity: "O(n log n) - Sorting intervals by end point",
        spaceComplexity: "O(1) - Constant auxiliary space",
        explanation: "Greedy choice property: ending early maximizes the remaining horizon for non-conflicting intervals."
      }
    }
  },
  {
    id: '452',
    lcNumber: 452,
    title: "Minimum Number of Arrows to Burst Balloons",
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: "Greedy Overlapping Coordinates",
    tag: 'Good',
    companyTags: ["Flipkart","Adobe","Amazon"],
    link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
    hints: {
      hint1: "One arrow can burst all balloons that share overlapping intervals.",
      hint2: "Sort balloons by end coordinate. Shoot an arrow at the end coordinate of the first unburst balloon.",
      hint3: "// 1. Sort by points[i][1]\n// 2. arrows = 1, currentArrowPos = points[0][1]\n// 3. For i from 1 to n-1:\n//      if points[i][0] > currentArrowPos:\n//          arrows++\n//          currentArrowPos = points[i][1]\n// 4. Return arrows",
      hint4: {
        javaSolution: "import java.util.Arrays;\n\nclass Solution {\n    public int findMinArrowShots(int[][] points) {\n        if (points.length == 0) return 0;\n        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n\n        int arrows = 1;\n        int arrowPos = points[0][1];\n\n        for (int i = 1; i < points.length; i++) {\n            if (points[i][0] > arrowPos) {\n                arrows++;\n                arrowPos = points[i][1];\n            }\n        }\n        return arrows;\n    }\n}",
        timeComplexity: "O(n log n) - Sorting by upper bound",
        spaceComplexity: "O(1) - Primitive tracking",
        explanation: "Firing at the earliest possible exit coordinate bursts the maximum contiguous subset of balloons."
      }
    }
  },
  {
    id: '75',
    lcNumber: 75,
    title: "Sort Colors",
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: "Dutch National Flag 3-Way Partition",
    tag: 'Must',
    companyTags: ["Microsoft","Amazon","Flipkart"],
    link: 'https://leetcode.com/problems/sort-colors/',
    hints: {
      hint1: "Sort an array of 0s, 1s, and 2s in-place in a single pass O(n).",
      hint2: "Maintain 3 pointers: low (next 0 position), mid (current scanning pointer), and high (next 2 position).",
      hint3: "// while mid <= high:\n//   if nums[mid] == 0: swap(low, mid); low++; mid++\n//   else if nums[mid] == 1: mid++\n//   else if nums[mid] == 2: swap(mid, high); high--",
      hint4: {
        javaSolution: "class Solution {\n    public void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                swap(nums, low++, mid++);\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                swap(nums, mid, high--);\n            }\n        }\n    }\n\n    private void swap(int[] nums, int i, int j) {\n        int temp = nums[i];\n        nums[i] = nums[j];\n        nums[j] = temp;\n    }\n}",
        timeComplexity: "O(n) - Single pass through array",
        spaceComplexity: "O(1) - Constant in-place swaps",
        explanation: "Dijkstras Dutch National Flag partitioning sorts 3 keys in-place in O(n) without counting passes."
      }
    }
  },
  {
    id: '253',
    lcNumber: 253,
    title: "Meeting Rooms II",
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: "Chronological Point Sweeping",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/meeting-rooms-ii/',
    hints: {
      hint1: "Find the maximum number of concurrent overlapping meetings.",
      hint2: "Separate start and end times into two arrays and sort both. Use two pointers to simulate rooms opening and freeing.",
      hint3: "// 1. starts = intervals.map(start), ends = intervals.map(end)\n// 2. Sort starts and ends\n// 3. For start in starts:\n//      if start >= ends[endPtr]: endPtr++\n//      else: rooms++\n// 4. Return rooms",
      hint4: {
        javaSolution: "import java.util.Arrays;\n\nclass Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        int n = intervals.length;\n        int[] starts = new int[n];\n        int[] ends = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            starts[i] = intervals[i][0];\n            ends[i] = intervals[i][1];\n        }\n\n        Arrays.sort(starts);\n        Arrays.sort(ends);\n\n        int rooms = 0;\n        int endPtr = 0;\n\n        for (int i = 0; i < n; i++) {\n            if (starts[i] < ends[endPtr]) {\n                rooms++;\n            } else {\n                endPtr++;\n            }\n        }\n        return rooms;\n    }\n}",
        timeComplexity: "O(n log n) - Sorting starts and ends",
        spaceComplexity: "O(n) - Storing separate start and end arrays",
        explanation: "Chronological scan simulates rooms: an ongoing meeting either takes an emptied room or requests a new one."
      }
    }
  },
  {
    id: '347',
    lcNumber: 347,
    title: "Top K Frequent Elements",
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: "Bucket Sort on Frequency",
    tag: 'Good',
    companyTags: ["Amazon","Adobe","Microsoft"],
    link: 'https://leetcode.com/problems/top-k-frequent-elements/',
    hints: {
      hint1: "Frequency of any number is bounded by array length n.",
      hint2: "Count frequencies in a hash map, then bucket numbers by their frequency index for O(n) collection.",
      hint3: "// 1. Count frequencies in HashMap\n// 2. Create buckets List<Integer>[] of size n + 1\n// 3. Place numbers into buckets[freq]\n// 4. Iterate backwards from bucket n to 0, collecting k elements",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int num : nums) {\n            count.put(num, count.getOrDefault(num, 0) + 1);\n        }\n\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int key : count.keySet()) {\n            int freq = count.get(key);\n            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();\n            buckets[freq].add(key);\n        }\n\n        int[] result = new int[k];\n        int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {\n            if (buckets[i] != null) {\n                for (int val : buckets[i]) {\n                    result[idx++] = val;\n                    if (idx == k) break;\n                }\n            }\n        }\n        return result;\n    }\n}",
        timeComplexity: "O(n) - Linear time using bucket sort",
        spaceComplexity: "O(n) - Hash map and bucket array",
        explanation: "Because frequency cannot exceed array length n, bucket sort avoids the O(n log k) heap overhead."
      }
    }
  },
  {
    id: '138',
    lcNumber: 138,
    title: "Copy List with Random Pointer",
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: "Interleaved Node Cloning / Hash Map",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    hints: {
      hint1: "Cloning a linked list where nodes contain arbitrary random pointers.",
      hint2: "Interleave cloned nodes directly next to originals: A -> A' -> B -> B'. This allows copying random pointers in O(1) extra space.",
      hint3: "// 1. For each node, insert copy node right after it: curr.next = new Node(curr.val, curr.next)\n// 2. Set random pointers: curr.next.random = curr.random != null ? curr.random.next : null\n// 3. Separate original and cloned lists",
      hint4: {
        javaSolution: "class Solution {\n    public Node copyRandomList(Node head) {\n        if (head == null) return null;\n\n        // Step 1: Interleave cloned nodes\n        Node curr = head;\n        while (curr != null) {\n            Node copy = new Node(curr.val);\n            copy.next = curr.next;\n            curr.next = copy;\n            curr = copy.next;\n        }\n\n        // Step 2: Assign random pointers\n        curr = head;\n        while (curr != null) {\n            if (curr.random != null) {\n                curr.next.random = curr.random.next;\n            }\n            curr = curr.next.next;\n        }\n\n        // Step 3: Unweave the lists\n        curr = head;\n        Node dummy = new Node(0);\n        Node copyCurr = dummy;\n        while (curr != null) {\n            Node nextOriginal = curr.next.next;\n            copyCurr.next = curr.next;\n            copyCurr = copyCurr.next;\n            curr.next = nextOriginal;\n            curr = nextOriginal;\n        }\n        return dummy.next;\n    }\n}",
        timeComplexity: "O(n) - Three linear passes",
        spaceComplexity: "O(1) - In-place interleaved pointers",
        explanation: "Interleaving nodes pairs each cloned node immediately after its source, bypassing hash map memory."
      }
    }
  },
  {
    id: '234',
    lcNumber: 234,
    title: "Palindrome Linked List",
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: "Fast/Slow Pointer + In-Place Reversal",
    tag: 'Must',
    companyTags: ["Microsoft","Adobe","TCS"],
    link: 'https://leetcode.com/problems/palindrome-linked-list/',
    hints: {
      hint1: "Find if a linked list reads the same forward and backwards.",
      hint2: "Use fast and slow pointers to locate the middle, reverse the second half, and compare values node by node.",
      hint3: "// 1. slow = head, fast = head\n// 2. Move fast by 2, slow by 1 to reach middle\n// 3. Reverse list starting from slow\n// 4. Compare first half and reversed second half",
      hint4: {
        javaSolution: "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        if (head == null || head.next == null) return true;\n\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n\n        ListNode prev = null, curr = slow;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n\n        ListNode left = head, right = prev;\n        while (right != null) {\n            if (left.val != right.val) return false;\n            left = left.next;\n            right = right.next;\n        }\n        return true;\n    }\n}",
        timeComplexity: "O(n) - Linear traversal",
        spaceComplexity: "O(1) - In-place reversal",
        explanation: "Reversing only the trailing half allows symmetric palindrome comparison in O(1) memory."
      }
    }
  },
  {
    id: '160',
    lcNumber: 160,
    title: "Intersection of Two Linked Lists",
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: "Two Pointers Traversal Balancing",
    tag: 'Good',
    companyTags: ["Amazon","Infosys","Wipro"],
    link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    hints: {
      hint1: "Find the node where two singly linked lists merge.",
      hint2: "When pointer A reaches end, redirect to headB. When pointer B reaches end, redirect to headA. Both travel length(A) + length(B).",
      hint3: "// pA = headA, pB = headB\n// while pA != pB:\n//   pA = (pA == null) ? headB : pA.next\n//   pB = (pB == null) ? headA : pB.next\n// return pA",
      hint4: {
        javaSolution: "public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        if (headA == null || headB == null) return null;\n        ListNode pA = headA, pB = headB;\n\n        while (pA != pB) {\n            pA = (pA == null) ? headB : pA.next;\n            pB = (pB == null) ? headA : pB.next;\n        }\n        return pA;\n    }\n}",
        timeComplexity: "O(m + n) - Each pointer travels at most m + n nodes",
        spaceComplexity: "O(1) - Constant pointer manipulation",
        explanation: "Switching heads equalizes the cumulative distance travelled, ensuring collision at the intersection."
      }
    }
  },
  {
    id: '2',
    lcNumber: 2,
    title: "Add Two Numbers",
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: "Digit Addition with Carry Chain",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/add-two-numbers/',
    hints: {
      hint1: "Lists represent reversed numbers; the head is the least significant digit.",
      hint2: "Traverse both lists simultaneously, computing digit sum + carry, and linking new nodes to a dummy head.",
      hint3: "// dummy = new ListNode(0), curr = dummy, carry = 0\n// while l1 != null || l2 != null || carry != 0:\n//   sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0)\n//   carry = sum / 10\n//   curr.next = new ListNode(sum % 10)\n//   advance curr, l1, l2",
      hint4: {
        javaSolution: "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n\n        while (l1 != null || l2 != null || carry != 0) {\n            int val1 = (l1 != null) ? l1.val : 0;\n            int val2 = (l2 != null) ? l2.val : 0;\n            int sum = val1 + val2 + carry;\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n\n            if (l1 != null) l1 = l1.next;\n            if (l2 != null) l2 = l2.next;\n        }\n        return dummy.next;\n    }\n}",
        timeComplexity: "O(max(m, n)) - Traverses the longer list",
        spaceComplexity: "O(max(m, n)) - Output list storage",
        explanation: "Reversed representation simplifies column addition with carry propagation from left to right."
      }
    }
  },
  {
    id: '79',
    lcNumber: 79,
    title: "Word Search",
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: "2D Grid DFS Backtracking",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/word-search/',
    hints: {
      hint1: "Search for word in 2D character grid moving in 4 directions.",
      hint2: "DFS from each cell matching word[0]. Mark visited cells in-place with a special char (#) and restore on return.",
      hint3: "// dfs(r, c, idx):\n//   if idx == word.length: return true\n//   if out of bounds or board[r][c] != word[idx]: return false\n//   temp = board[r][c]; board[r][c] = '#'\n//   res = dfs in 4 directions for idx + 1\n//   board[r][c] = temp\n//   return res",
      hint4: {
        javaSolution: "class Solution {\n    public boolean exist(char[][] board, String word) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (dfs(board, word, r, c, 0)) return true;\n            }\n        }\n        return false;\n    }\n\n    private boolean dfs(char[][] board, String word, int r, int c, int idx) {\n        if (idx == word.length()) return true;\n        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) {\n            return false;\n        }\n\n        char temp = board[r][c];\n        board[r][c] = '#';\n        boolean found = dfs(board, word, r + 1, c, idx + 1) ||\n                        dfs(board, word, r - 1, c, idx + 1) ||\n                        dfs(board, word, r, c + 1, idx + 1) ||\n                        dfs(board, word, r, c - 1, idx + 1);\n        board[r][c] = temp;\n        return found;\n    }\n}",
        timeComplexity: "O(m * n * 3^L) - Where L is word length",
        spaceComplexity: "O(L) - Recursion call stack depth",
        explanation: "In-place character modification simulates visited status without extra O(m*n) memory."
      }
    }
  },
  {
    id: '17',
    lcNumber: 17,
    title: "Letter Combinations of a Phone Number",
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: "Combinatorial Backtracking on Digits",
    tag: 'Must',
    companyTags: ["Microsoft","Adobe","Amazon"],
    link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    hints: {
      hint1: "Telephone keypad mapping digits 2-9 to strings.",
      hint2: "Standard recursive combination building: explore all letters for digits[index], recurse to index + 1.",
      hint3: "// backtrack(index, currentCombination):\n//   if index == digits.length: add to result; return\n//   letters = map[digits[index]]\n//   for ch in letters:\n//     backtrack(index + 1, currentCombination + ch)",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    private static final String[] KEYPAD = {\n        \"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"\n    };\n\n    public List<String> letterCombinations(String digits) {\n        List<String> result = new ArrayList<>();\n        if (digits == null || digits.length() == 0) return result;\n        backtrack(digits, 0, new StringBuilder(), result);\n        return result;\n    }\n\n    private void backtrack(String digits, int idx, StringBuilder current, List<String> result) {\n        if (idx == digits.length()) {\n            result.add(current.toString());\n            return;\n        }\n\n        String letters = KEYPAD[digits.charAt(idx) - '0'];\n        for (char ch : letters.toCharArray()) {\n            current.append(ch);\n            backtrack(digits, idx + 1, current, result);\n            current.deleteCharAt(current.length() - 1);\n        }\n    }\n}",
        timeComplexity: "O(4^n) - Maximum branch factor 4 (digits 7 and 9)",
        spaceComplexity: "O(n) - Recursion call stack and path builder",
        explanation: "Exhaustive combination generation via backtracking across keypad mapping branches."
      }
    }
  },
  {
    id: '131',
    lcNumber: 131,
    title: "Palindrome Partitioning",
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: "Partition Backtracking with Validation",
    tag: 'Good',
    companyTags: ["Amazon","Flipkart"],
    link: 'https://leetcode.com/problems/palindrome-partitioning/',
    hints: {
      hint1: "Partition string such that every substring in the partition is a palindrome.",
      hint2: "At index start, check all substrings s[start..end]. If palindromic, recurse from end + 1.",
      hint3: "// backtrack(start, currentList):\n//   if start == s.length: result.add(new ArrayList<>(currentList))\n//   for end from start to s.length - 1:\n//     if isPalindrome(s, start, end):\n//       currentList.add(s.substring(start, end + 1))\n//       backtrack(end + 1, currentList)\n//       currentList.removeLast()",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public List<List<String>> partition(String s) {\n        List<List<String>> result = new ArrayList<>();\n        backtrack(s, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private void backtrack(String s, int start, List<String> current, List<List<String>> result) {\n        if (start == s.length()) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n\n        for (int end = start; end < s.length(); end++) {\n            if (isPalindrome(s, start, end)) {\n                current.add(s.substring(start, end + 1));\n                backtrack(s, end + 1, current, result);\n                current.remove(current.size() - 1);\n            }\n        }\n    }\n\n    private boolean isPalindrome(String s, int l, int r) {\n        while (l < r) {\n            if (s.charAt(l++) != s.charAt(r--)) return false;\n        }\n        return true;\n    }\n}",
        timeComplexity: "O(n * 2^n) - Up to 2^(n-1) partitions, O(n) palindrome checks",
        spaceComplexity: "O(n) - Path buffer and recursion stack",
        explanation: "Prunes invalid non-palindromic prefixes immediately before descending the search tree."
      }
    }
  },
  {
    id: '37',
    lcNumber: 37,
    title: "Sudoku Solver",
    topicId: 'recursion-backtracking',
    difficulty: 'Hard',
    pattern: "Constraint Satisfaction Backtracking",
    tag: 'Bonus',
    companyTags: ["Microsoft","Adobe","Amazon"],
    link: 'https://leetcode.com/problems/sudoku-solver/',
    hints: {
      hint1: "Fill 9x9 grid complying with row, column, and 3x3 box uniqueness constraints.",
      hint2: "Iterate cell by cell. For empty cells, try numbers 1-9; if valid, recurse to next cell; backtrack if dead end.",
      hint3: "// solve():\n//   Find next empty cell (r, c)\n//   If none empty: return true\n//   For char '1' to '9':\n//     if isValid(r, c, ch):\n//       board[r][c] = ch\n//       if solve(): return true\n//       board[r][c] = '.'\n//   return false",
      hint4: {
        javaSolution: "class Solution {\n    public void solveSudoku(char[][] board) {\n        solve(board);\n    }\n\n    private boolean solve(char[][] board) {\n        for (int r = 0; r < 9; r++) {\n            for (int c = 0; c < 9; c++) {\n                if (board[r][c] == '.') {\n                    for (char ch = '1'; ch <= '9'; ch++) {\n                        if (isValid(board, r, c, ch)) {\n                            board[r][c] = ch;\n                            if (solve(board)) return true;\n                            board[r][c] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    private boolean isValid(char[][] board, int r, int c, char ch) {\n        for (int i = 0; i < 9; i++) {\n            if (board[r][i] == ch) return false;\n            if (board[i][c] == ch) return false;\n            int boxR = 3 * (r / 3) + i / 3;\n            int boxC = 3 * (c / 3) + i % 3;\n            if (board[boxR][boxC] == ch) return false;\n        }\n        return true;\n    }\n}",
        timeComplexity: "O(9^(empty cells)) - Exponential bounded search",
        spaceComplexity: "O(1) auxiliary - Board is modified in-place with O(81) call stack depth",
        explanation: "Constraint propagation checks rows, columns, and 3x3 blocks simultaneously before trial placement."
      }
    }
  },
  {
    id: '124',
    lcNumber: 124,
    title: "Binary Tree Maximum Path Sum",
    topicId: 'trees',
    difficulty: 'Hard',
    pattern: "Post-Order DFS Contribution",
    tag: 'Bonus',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    hints: {
      hint1: "A path can go up and down through any node, but cannot branch.",
      hint2: "Post-order DFS: for each node, compute max gain from left and right children (ignoring negative gains with Math.max(0, gain)).",
      hint3: "// dfs(node):\n//   leftGain = max(0, dfs(node.left))\n//   rightGain = max(0, dfs(node.right))\n//   maxPath = max(maxPath, node.val + leftGain + rightGain)\n//   return node.val + max(leftGain, rightGain)",
      hint4: {
        javaSolution: "class Solution {\n    private int maxSum = Integer.MIN_VALUE;\n\n    public int maxPathSum(TreeNode root) {\n        dfs(root);\n        return maxSum;\n    }\n\n    private int dfs(TreeNode node) {\n        if (node == null) return 0;\n        int leftGain = Math.max(0, dfs(node.left));\n        int rightGain = Math.max(0, dfs(node.right));\n\n        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);\n        return node.val + Math.max(leftGain, rightGain);\n    }\n}",
        timeComplexity: "O(n) - Single post-order traversal",
        spaceComplexity: "O(h) - Where h is tree height",
        explanation: "At each node, combining left + right gains evaluates an arch path, while returning the single best branch upwards."
      }
    }
  },
  {
    id: '105',
    lcNumber: 105,
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: "Recursive Traversal Boundary Partitioning",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Adobe"],
    link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    hints: {
      hint1: "Preorder root is always at index 0. Inorder root splits into left and right subtrees.",
      hint2: "Use a hash map to look up root indices in inorder in O(1) time.",
      hint3: "// root = new TreeNode(preorder[preStart])\n// inIndex = map.get(root.val)\n// leftTreeSize = inIndex - inStart\n// root.left = build(preStart + 1, inStart, inIndex - 1)\n// root.right = build(preStart + leftTreeSize + 1, inIndex + 1, inEnd)",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    private Map<Integer, Integer> inMap = new HashMap<>();\n\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        for (int i = 0; i < inorder.length; i++) {\n            inMap.put(inorder[i], i);\n        }\n        return build(preorder, 0, preorder.length - 1, 0, inorder.length - 1);\n    }\n\n    private TreeNode build(int[] pre, int preL, int preR, int inL, int inR) {\n        if (preL > preR || inL > inR) return null;\n\n        int rootVal = pre[preL];\n        TreeNode root = new TreeNode(rootVal);\n        int inRootIdx = inMap.get(rootVal);\n        int leftSubtreeSize = inRootIdx - inL;\n\n        root.left = build(pre, preL + 1, preL + leftSubtreeSize, inL, inRootIdx - 1);\n        root.right = build(pre, preL + leftSubtreeSize + 1, preR, inRootIdx + 1, inR);\n        return root;\n    }\n}",
        timeComplexity: "O(n) - Constructing n nodes with O(1) index lookups",
        spaceComplexity: "O(n) - Hash map and recursion stack",
        explanation: "Inorder index reveals exact left/right subtree counts to slice preorder segments cleanly."
      }
    }
  },
  {
    id: '543',
    lcNumber: 543,
    title: "Diameter of Binary Tree",
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: "Post-Order Depth Calculation with Global Max",
    tag: 'Must',
    companyTags: ["Amazon","Flipkart","TCS"],
    link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    hints: {
      hint1: "Diameter is the length of the longest path between any two nodes in a tree.",
      hint2: "The longest path through any node is leftDepth + rightDepth. Track the max diameter globally during a standard height DFS.",
      hint3: "// dfs(node):\n//   if node == null: return 0\n//   l = dfs(node.left)\n//   r = dfs(node.right)\n//   maxDiameter = max(maxDiameter, l + r)\n//   return 1 + max(l, r)",
      hint4: {
        javaSolution: "class Solution {\n    private int maxDiameter = 0;\n\n    public int diameterOfBinaryTree(TreeNode root) {\n        depth(root);\n        return maxDiameter;\n    }\n\n    private int depth(TreeNode node) {\n        if (node == null) return 0;\n        int left = depth(node.left);\n        int right = depth(node.right);\n        maxDiameter = Math.max(maxDiameter, left + right);\n        return 1 + Math.max(left, right);\n    }\n}",
        timeComplexity: "O(n) - Visits every node once",
        spaceComplexity: "O(h) - Recursion stack equal to tree height",
        explanation: "Computes maximum node-to-node distance by combining subtree heights during a standard bottom-up pass."
      }
    }
  },
  {
    id: '295',
    lcNumber: 295,
    title: "Find Median from Data Stream",
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: "Two Heaps (Max-Heap + Min-Heap)",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/find-median-from-data-stream/',
    hints: {
      hint1: "Continuous stream of numbers; need O(1) or O(log n) median access.",
      hint2: "Split data into lower half (Max-Heap) and upper half (Min-Heap). Keep heap sizes balanced within 1 element.",
      hint3: "// 1. addNum(num):\n//      maxHeap.add(num)\n//      minHeap.add(maxHeap.poll())\n//      if (minHeap.size() > maxHeap.size()): maxHeap.add(minHeap.poll())\n// 2. findMedian():\n//      return maxHeap.size() > minHeap.size() ? maxHeap.peek() : (maxHeap.peek() + minHeap.peek()) / 2.0",
      hint4: {
        javaSolution: "import java.util.Collections;\nimport java.util.PriorityQueue;\n\nclass MedianFinder {\n    private PriorityQueue<Integer> maxHeap; // stores lower half\n    private PriorityQueue<Integer> minHeap; // stores upper half\n\n    public MedianFinder() {\n        maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n        minHeap = new PriorityQueue<>();\n    }\n    \n    public void addNum(int num) {\n        maxHeap.add(num);\n        minHeap.add(maxHeap.poll());\n        if (maxHeap.size() < minHeap.size()) {\n            maxHeap.add(minHeap.poll());\n        }\n    }\n    \n    public double findMedian() {\n        if (maxHeap.size() > minHeap.size()) {\n            return maxHeap.peek();\n        }\n        return (maxHeap.peek() + minHeap.peek()) / 2.0;\n    }\n}",
        timeComplexity: "O(log n) for addNum, O(1) for findMedian",
        spaceComplexity: "O(n) - Storing numbers across two heaps",
        explanation: "Two heaps maintain a partition barrier, placing the exact median candidates at the heap tops."
      }
    }
  },
  {
    id: '23',
    lcNumber: 23,
    title: "Merge k Sorted Lists",
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: "K-Way Min-Heap Merge",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    hints: {
      hint1: "K sorted linked lists to be merged into one single sorted list.",
      hint2: "A min-heap of size k stores the heads of all non-empty lists. Pop the minimum, link it, and push its next node.",
      hint3: "// 1. MinHeap compares ListNode.val\n// 2. Push all non-null list heads into heap\n// 3. while (!heap.isEmpty()):\n//      curr = heap.poll()\n//      tail.next = curr; tail = tail.next\n//      if (curr.next != null) heap.add(curr.next)",
      hint4: {
        javaSolution: "import java.util.PriorityQueue;\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));\n\n        for (ListNode node : lists) {\n            if (node != null) minHeap.add(node);\n        }\n\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n\n        while (!minHeap.isEmpty()) {\n            ListNode smallest = minHeap.poll();\n            tail.next = smallest;\n            tail = tail.next;\n            if (smallest.next != null) {\n                minHeap.add(smallest.next);\n            }\n        }\n        return dummy.next;\n    }\n}",
        timeComplexity: "O(N log k) - Where N is total nodes and k is number of lists",
        spaceComplexity: "O(k) - Min-heap holding at most k heads",
        explanation: "Min-heap maintains the current frontier across all k lists in logarithmic insertion time."
      }
    }
  },
  {
    id: '621',
    lcNumber: 621,
    title: "Task Scheduler",
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: "Max-Heap Frequency Greediness",
    tag: 'Good',
    companyTags: ["Microsoft","Adobe","Amazon"],
    link: 'https://leetcode.com/problems/task-scheduler/',
    hints: {
      hint1: "Identical tasks must have cooldown n between executions.",
      hint2: "Always execute the task with the highest remaining frequency first using a max-heap.",
      hint3: "// Mathematical or Heap approach:\n// Count max frequency maxFreq\n// Count how many tasks have frequency == maxFreq (numMaxFreq)\n// Intervals = (maxFreq - 1) * (n + 1) + numMaxFreq\n// Return Math.max(tasks.length, Intervals)",
      hint4: {
        javaSolution: "import java.util.Arrays;\n\nclass Solution {\n    public int leastInterval(char[] tasks, int n) {\n        int[] freq = new int[26];\n        for (char t : tasks) freq[t - 'A']++;\n        Arrays.sort(freq);\n\n        int maxFreq = freq[25];\n        int numMaxFreq = 0;\n        for (int i = 25; i >= 0 && freq[i] == maxFreq; i--) {\n            numMaxFreq++;\n        }\n\n        int emptySlots = (maxFreq - 1) * (n + 1) + numMaxFreq;\n        return Math.max(tasks.length, emptySlots);\n    }\n}",
        timeComplexity: "O(tasks.length) - Linear frequency counting",
        spaceComplexity: "O(1) - Constant 26-size alphabet array",
        explanation: "The most frequent tasks dictate the cooldown framework; remaining tasks slot into intermediate idle gaps."
      }
    }
  },
  {
    id: '767',
    lcNumber: 767,
    title: "Reorganize String",
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: "Max-Heap Alternating Pair Placement",
    tag: 'Good',
    companyTags: ["Amazon","Flipkart"],
    link: 'https://leetcode.com/problems/reorganize-string/',
    hints: {
      hint1: "Rearrange string so that no two adjacent characters are identical.",
      hint2: "Max-heap of characters by frequency. Pick the two most frequent characters at each step and place them adjacently.",
      hint3: "// 1. If any char freq > (n + 1) / 2: return \"\"\n// 2. MaxHeap of char frequencies\n// 3. while (heap.size() >= 2):\n//      pop first, second; append to result; decrement freqs; re-add if > 0\n// 4. If 1 char left, append",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public String reorganizeString(String s) {\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n\n        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[1], a[1]));\n        for (int i = 0; i < 26; i++) {\n            if (count[i] > 0) {\n                if (count[i] > (s.length() + 1) / 2) return \"\";\n                maxHeap.add(new int[]{i, count[i]});\n            }\n        }\n\n        StringBuilder sb = new StringBuilder();\n        while (maxHeap.size() >= 2) {\n            int[] first = maxHeap.poll();\n            int[] second = maxHeap.poll();\n            sb.append((char) ('a' + first[0]));\n            sb.append((char) ('a' + second[0]));\n            if (--first[1] > 0) maxHeap.add(first);\n            if (--second[1] > 0) maxHeap.add(second);\n        }\n\n        if (!maxHeap.isEmpty()) {\n            sb.append((char) ('a' + maxHeap.poll()[0]));\n        }\n        return sb.toString();\n    }\n}",
        timeComplexity: "O(n log 26) = O(n) - Heap operations bounded by alphabet size",
        spaceComplexity: "O(26) = O(1) - Constant alphabet size storage",
        explanation: "Always interleaving the top two dominant characters prevents any character from clustering consecutively."
      }
    }
  },
  {
    id: '1046',
    lcNumber: 1046,
    title: "Last Stone Weight",
    topicId: 'heap',
    difficulty: 'Easy',
    pattern: "Max-Heap Collision Simulation",
    tag: 'Bonus',
    companyTags: ["TCS","Infosys","Wipro","Amazon"],
    link: 'https://leetcode.com/problems/last-stone-weight/',
    hints: {
      hint1: "Smash the two heaviest stones together at each step.",
      hint2: "Max-heap gives instantaneous access to the two heaviest stones in O(log n).",
      hint3: "// 1. Put all stones in MaxHeap\n// 2. while (heap.size() > 1):\n//      y = heap.poll(), x = heap.poll()\n//      if (y != x) heap.add(y - x)\n// 3. Return heap.isEmpty() ? 0 : heap.peek()",
      hint4: {
        javaSolution: "import java.util.Collections;\nimport java.util.PriorityQueue;\n\nclass Solution {\n    public int lastStoneWeight(int[] stones) {\n        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n        for (int s : stones) maxHeap.add(s);\n\n        while (maxHeap.size() > 1) {\n            int y = maxHeap.poll();\n            int x = maxHeap.poll();\n            if (y != x) {\n                maxHeap.add(y - x);\n            }\n        }\n        return maxHeap.isEmpty() ? 0 : maxHeap.peek();\n    }\n}",
        timeComplexity: "O(n log n) - Heapify and collision removals",
        spaceComplexity: "O(n) - Max heap storage",
        explanation: "Max-heap dynamically reorders weights after each smash in O(log n)."
      }
    }
  },
  {
    id: '134',
    lcNumber: 134,
    title: "Gas Station",
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: "Circular Route Deficit Accumulator",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/gas-station/',
    hints: {
      hint1: "If total gas < total cost, completing the circuit is impossible.",
      hint2: "If running tank dips below 0 at station i, no station from start to i can be the starting point. Reset start to i + 1.",
      hint3: "// totalTank = 0, currTank = 0, start = 0\n// For i from 0 to n-1:\n//   diff = gas[i] - cost[i]\n//   totalTank += diff; currTank += diff\n//   if currTank < 0: start = i + 1; currTank = 0\n// return totalTank >= 0 ? start : -1",
      hint4: {
        javaSolution: "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = 0, totalCost = 0;\n        int tank = 0, start = 0;\n\n        for (int i = 0; i < gas.length; i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n            tank += gas[i] - cost[i];\n            if (tank < 0) {\n                start = i + 1;\n                tank = 0;\n            }\n        }\n        return (totalGas >= totalCost) ? start : -1;\n    }\n}",
        timeComplexity: "O(n) - Single linear pass",
        spaceComplexity: "O(1) - Constant variables",
        explanation: "Net positive total surplus guarantees a solution exists, and resetting start skips failed prefixes in linear time."
      }
    }
  },
  {
    id: '763',
    lcNumber: 763,
    title: "Partition Labels",
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: "Greedy Interval Expansion by Last Occurrence",
    tag: 'Must',
    companyTags: ["Amazon","Adobe"],
    link: 'https://leetcode.com/problems/partition-labels/',
    hints: {
      hint1: "Each letter must appear in at most one part.",
      hint2: "Precompute the last occurrence index of each character. Traverse string expanding the current partition boundary to max(last[ch]).",
      hint3: "// 1. last[c] = last index of character c in s\n// 2. start = 0, end = 0\n// 3. For i from 0 to n-1:\n//      end = max(end, last[s[i]])\n//      if i == end: add (end - start + 1) to result; start = i + 1",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public List<Integer> partitionLabels(String s) {\n        int[] last = new int[26];\n        for (int i = 0; i < s.length(); i++) {\n            last[s.charAt(i) - 'a'] = i;\n        }\n\n        List<Integer> result = new ArrayList<>();\n        int start = 0, end = 0;\n\n        for (int i = 0; i < s.length(); i++) {\n            end = Math.max(end, last[s.charAt(i) - 'a']);\n            if (i == end) {\n                result.add(end - start + 1);\n                start = i + 1;\n            }\n        }\n        return result;\n    }\n}",
        timeComplexity: "O(n) - Two linear scans of the string",
        spaceComplexity: "O(1) - 26-element array for alphabet last seen",
        explanation: "Greedy partition boundary expansion guarantees every letter in the partition terminates inside it."
      }
    }
  },
  {
    id: '846',
    lcNumber: 846,
    title: "Hand of Straights",
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: "TreeMap / Frequency Map Consecutive Grouping",
    tag: 'Good',
    companyTags: ["Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/hand-of-straights/',
    hints: {
      hint1: "Rearrange cards into groups of size groupSize with consecutive values.",
      hint2: "Use a TreeMap to keep cards sorted. Always begin a new group with the smallest available card and verify groupSize consecutive keys.",
      hint3: "// if hand.length % groupSize != 0: return false\n// TreeMap stores count of each card\n// For key in map.keySet():\n//   count = map.get(key)\n//   if count > 0:\n//     for i from 0 to groupSize - 1:\n//       if map.getOrDefault(key + i, 0) < count: return false\n//       map.put(key + i, map.get(key + i) - count)",
      hint4: {
        javaSolution: "import java.util.TreeMap;\n\nclass Solution {\n    public boolean isNStraightHand(int[] hand, int groupSize) {\n        if (hand.length % groupSize != 0) return false;\n        TreeMap<Integer, Integer> map = new TreeMap<>();\n        for (int card : hand) {\n            map.put(card, map.getOrDefault(card, 0) + 1);\n        }\n\n        for (int card : map.keySet()) {\n            int count = map.get(card);\n            if (count > 0) {\n                for (int i = 0; i < groupSize; i++) {\n                    int nextCard = card + i;\n                    if (map.getOrDefault(nextCard, 0) < count) return false;\n                    map.put(nextCard, map.get(nextCard) - count);\n                }\n            }\n        }\n        return true;\n    }\n}",
        timeComplexity: "O(n log n) - TreeMap ordering and updates",
        spaceComplexity: "O(n) - Frequency map",
        explanation: "Starting greedily with the lowest card eliminates choice ambiguity for straight formation."
      }
    }
  },
  {
    id: '53',
    lcNumber: 53,
    title: "Maximum Subarray",
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: "Kadane Algorithm Local vs Global Max",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart","TCS","Infosys"],
    link: 'https://leetcode.com/problems/maximum-subarray/',
    hints: {
      hint1: "Find the contiguous subarray with the largest sum.",
      hint2: "At each position, decide whether to add nums[i] to the existing running sum or restart a fresh subarray at nums[i].",
      hint3: "// maxEndingHere = nums[0], maxSoFar = nums[0]\n// For i from 1 to n-1:\n//   maxEndingHere = max(nums[i], maxEndingHere + nums[i])\n//   maxSoFar = max(maxSoFar, maxEndingHere)\n// Return maxSoFar",
      hint4: {
        javaSolution: "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxEndingHere = nums[0];\n        int maxSoFar = nums[0];\n\n        for (int i = 1; i < nums.length; i++) {\n            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n            maxSoFar = Math.max(maxSoFar, maxEndingHere);\n        }\n        return maxSoFar;\n    }\n}",
        timeComplexity: "O(n) - Single linear pass",
        spaceComplexity: "O(1) - Constant variables",
        explanation: "Kadanes algorithm drops negative prefix baggage greedily when it harms future subarray potential."
      }
    }
  },
  {
    id: '860',
    lcNumber: 860,
    title: "Lemonade Change",
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: "Greedy Bill Denomination Change",
    tag: 'Good',
    companyTags: ["TCS","Infosys","Wipro","Amazon"],
    link: 'https://leetcode.com/problems/lemonade-change/',
    hints: {
      hint1: "Each customer buys a $5 lemonade with a $5, $10, or $20 bill.",
      hint2: "When giving $15 change for a $20 bill, greedily prefer returning one $10 and one $5 over three $5 bills, because $5 bills are more versatile.",
      hint3: "// For bill in bills:\n//   if bill == 5: five++\n//   else if bill == 10: if (five == 0) return false; five--; ten++\n//   else: (bill == 20):\n//     if (ten > 0 && five > 0) { ten--; five--; }\n//     else if (five >= 3) { five -= 3; }\n//     else return false",
      hint4: {
        javaSolution: "class Solution {\n    public boolean lemonadeChange(int[] bills) {\n        int five = 0, ten = 0;\n        for (int bill : bills) {\n            if (bill == 5) {\n                five++;\n            } else if (bill == 10) {\n                if (five == 0) return false;\n                five--;\n                ten++;\n            } else {\n                if (ten > 0 && five > 0) {\n                    ten--;\n                    five--;\n                } else if (five >= 3) {\n                    five -= 3;\n                } else {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n}",
        timeComplexity: "O(n) - Single pass through customers",
        spaceComplexity: "O(1) - Two integer counters",
        explanation: "Preserving $5 bills greedily ensures future $10 customer transactions will not stall."
      }
    }
  },
  {
    id: '210',
    lcNumber: 210,
    title: "Course Schedule II",
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: "Kahns Topological Sort BFS Order",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/course-schedule-ii/',
    hints: {
      hint1: "Find a valid topological course order given prerequisites.",
      hint2: "Kahns BFS algorithm: compute in-degrees. Seed queue with in-degree 0 courses; process node, record in order array, and decrement neighbors.",
      hint3: "// 1. inDegree array and adjacency list\n// 2. Queue contains all nodes with inDegree == 0\n// 3. while (!queue.isEmpty()):\n//      curr = queue.poll(); order[idx++] = curr\n//      for neighbor in adj[curr]:\n//        if (--inDegree[neighbor] == 0) queue.add(neighbor)\n// 4. Return idx == numCourses ? order : new int[0]",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        List<Integer>[] adj = new ArrayList[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        int[] inDegree = new int[numCourses];\n\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.add(i);\n        }\n\n        int[] order = new int[numCourses];\n        int idx = 0;\n\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            order[idx++] = curr;\n\n            for (int neighbor : adj[curr]) {\n                if (--inDegree[neighbor] == 0) {\n                    queue.add(neighbor);\n                }\n            }\n        }\n\n        return (idx == numCourses) ? order : new int[0];\n    }\n}",
        timeComplexity: "O(V + E) - Visits all vertices and edges",
        spaceComplexity: "O(V + E) - Adjacency list and queue",
        explanation: "In-degree queue tracking topologically orders dependencies and signals cycles when unprocessed nodes remain."
      }
    }
  },
  {
    id: '743',
    lcNumber: 743,
    title: "Network Delay Time",
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: "Dijkstras Shortest Path Min-Heap",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","Adobe"],
    link: 'https://leetcode.com/problems/network-delay-time/',
    hints: {
      hint1: "Find time for all nodes to receive a signal from source node k in a directed weighted graph.",
      hint2: "Dijkstras algorithm with a min-heap finds the shortest path distance to all nodes. Answer is the maximum distance.",
      hint3: "// 1. dist array initialized to infinity; dist[k] = 0\n// 2. MinHeap stores [time, node]\n// 3. while (!heap.isEmpty()):\n//      [d, u] = heap.poll()\n//      if d > dist[u]: continue\n//      for [v, weight] in adj[u]:\n//        if d + weight < dist[v]: dist[v] = d + weight; heap.add([dist[v], v])\n// 4. Return max in dist array (or -1 if any node unreached)",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        Map<Integer, List<int[]>> adj = new HashMap<>();\n        for (int[] t : times) {\n            adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});\n        }\n\n        int[] dist = new int[n + 1];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[k] = 0;\n\n        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));\n        minHeap.add(new int[]{0, k});\n\n        while (!minHeap.isEmpty()) {\n            int[] curr = minHeap.poll();\n            int d = curr[0], u = curr[1];\n            if (d > dist[u]) continue;\n\n            if (adj.containsKey(u)) {\n                for (int[] edge : adj.get(u)) {\n                    int v = edge[0], weight = edge[1];\n                    if (d + weight < dist[v]) {\n                        dist[v] = d + weight;\n                        minHeap.add(new int[]{dist[v], v});\n                    }\n                }\n            }\n        }\n\n        int maxTime = 0;\n        for (int i = 1; i <= n; i++) {\n            if (dist[i] == Integer.MAX_VALUE) return -1;\n            maxTime = Math.max(maxTime, dist[i]);\n        }\n        return maxTime;\n    }\n}",
        timeComplexity: "O(E log V) - Min-heap Dijkstra standard complexity",
        spaceComplexity: "O(V + E) - Graph representation and distance array",
        explanation: "Min-heap relaxation greedily explores closest unvisited nodes first in positive-weight networks."
      }
    }
  },
  {
    id: '127',
    lcNumber: 127,
    title: "Word Ladder",
    topicId: 'graphs',
    difficulty: 'Hard',
    pattern: "Shortest Path BFS on Word Graph",
    tag: 'Bonus',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/word-ladder/',
    hints: {
      hint1: "Transform beginWord to endWord altering 1 character at a time, each intermediate word in wordList.",
      hint2: "Standard unweighted shortest path problem: Level-order BFS guarantees the shortest transformation sequence.",
      hint3: "// 1. Put wordList into HashSet for O(1) lookups\n// 2. Queue with beginWord, level = 1\n// 3. while (!queue.isEmpty()):\n//      for each word at current level:\n//        try replacing each char with 'a'-'z'\n//        if candidate == endWord: return level + 1\n//        if candidate in wordSet: remove from set; queue.add(candidate)\n//      level++",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        Set<String> wordSet = new HashSet<>(wordList);\n        if (!wordSet.contains(endWord)) return 0;\n\n        Queue<String> queue = new LinkedList<>();\n        queue.add(beginWord);\n        int level = 1;\n\n        while (!queue.isEmpty()) {\n            int size = queue.size();\n            for (int i = 0; i < size; i++) {\n                String curr = queue.poll();\n                char[] chars = curr.toCharArray();\n\n                for (int j = 0; j < chars.length; j++) {\n                    char orig = chars[j];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        chars[j] = c;\n                        String next = new String(chars);\n                        if (next.equals(endWord)) return level + 1;\n                        if (wordSet.contains(next)) {\n                            wordSet.remove(next);\n                            queue.add(next);\n                        }\n                    }\n                    chars[j] = orig;\n                }\n            }\n            level++;\n        }\n        return 0;\n    }\n}",
        timeComplexity: "O(M^2 * N) - Where M is word length and N is wordList size",
        spaceComplexity: "O(M * N) - Word set and BFS queue",
        explanation: "BFS explores one edit-distance away at each step, naturally securing minimum transformation length."
      }
    }
  },
  {
    id: '684',
    lcNumber: 684,
    title: "Redundant Connection",
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: "Disjoint Set Union (Union-Find)",
    tag: 'Good',
    companyTags: ["Amazon","Adobe"],
    link: 'https://leetcode.com/problems/redundant-connection/',
    hints: {
      hint1: "Find the edge that creates a cycle in an undirected graph that was originally a tree.",
      hint2: "Union-Find / Disjoint Set Union: for each edge (u, v), if find(u) == find(v), they are already connected, so this edge is the redundant cycle edge.",
      hint3: "// 1. Parent array parent[i] = i\n// 2. For each [u, v] in edges:\n//      rootU = find(u), rootV = find(v)\n//      if rootU == rootV: return [u, v]\n//      parent[rootU] = rootV",
      hint4: {
        javaSolution: "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        int n = edges.length;\n        int[] parent = new int[n + 1];\n        for (int i = 1; i <= n; i++) parent[i] = i;\n\n        for (int[] edge : edges) {\n            int rootU = find(parent, edge[0]);\n            int rootV = find(parent, edge[1]);\n            if (rootU == rootV) return edge;\n            parent[rootU] = rootV;\n        }\n        return new int[0];\n    }\n\n    private int find(int[] parent, int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent, parent[i]);\n    }\n}",
        timeComplexity: "O(n * alpha(n)) ≈ O(n) - Near-linear Union-Find with path compression",
        spaceComplexity: "O(n) - Parent array",
        explanation: "Connecting two vertices already sharing the same root exposes the extraneous cycle edge."
      }
    }
  },
  {
    id: '547',
    lcNumber: 547,
    title: "Number of Provinces",
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: "Connected Components via DFS",
    tag: 'Must',
    companyTags: ["Microsoft","Flipkart","TCS"],
    link: 'https://leetcode.com/problems/number-of-provinces/',
    hints: {
      hint1: "Count isolated groups of connected cities in an adjacency matrix.",
      hint2: "Maintain visited boolean array. For each unvisited city, initiate DFS to mark its entire connected province and increment province count.",
      hint3: "// provinces = 0\n// For i from 0 to n-1:\n//   if (!visited[i]):\n//     dfs(i, isConnected, visited)\n//     provinces++\n// Return provinces",
      hint4: {
        javaSolution: "class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        int n = isConnected.length;\n        boolean[] visited = new boolean[n];\n        int count = 0;\n\n        for (int i = 0; i < n; i++) {\n            if (!visited[i]) {\n                dfs(isConnected, visited, i);\n                count++;\n            }\n        }\n        return count;\n    }\n\n    private void dfs(int[][] isConnected, boolean[] visited, int i) {\n        visited[i] = true;\n        for (int j = 0; j < isConnected.length; j++) {\n            if (isConnected[i][j] == 1 && !visited[j]) {\n                dfs(isConnected, visited, j);\n            }\n        }\n    }\n}",
        timeComplexity: "O(n^2) - Traverses n x n adjacency matrix",
        spaceComplexity: "O(n) - Visited array and DFS call stack",
        explanation: "Each top-level unvisited DFS launch marks an entire independent connected component."
      }
    }
  },
  {
    id: '212',
    lcNumber: 212,
    title: "Word Search II",
    topicId: 'trie-bit-manipulation',
    difficulty: 'Hard',
    pattern: "Trie-Guided Backtracking on Board",
    tag: 'Bonus',
    companyTags: ["Amazon","Microsoft","Flipkart"],
    link: 'https://leetcode.com/problems/word-search-ii/',
    hints: {
      hint1: "Search for multiple words from dictionary on 2D character grid simultaneously.",
      hint2: "Build a Trie from all words in wordList. Guide the board DFS using Trie nodes to prune invalid prefixes immediately.",
      hint3: "// 1. Build Trie where leaf nodes store word string\n// 2. For each cell (r, c):\n//      dfs(board, r, c, trieRoot, result)\n// 3. Mark visited cell with '#' and restore on return",
      hint4: {
        javaSolution: "import java.util.*;\n\nclass Solution {\n    class TrieNode {\n        TrieNode[] children = new TrieNode[26];\n        String word;\n    }\n\n    public List<String> findWords(char[][] board, String[] words) {\n        TrieNode root = new TrieNode();\n        for (String w : words) {\n            TrieNode node = root;\n            for (char c : w.toCharArray()) {\n                int idx = c - 'a';\n                if (node.children[idx] == null) node.children[idx] = new TrieNode();\n                node = node.children[idx];\n            }\n            node.word = w;\n        }\n\n        List<String> result = new ArrayList<>();\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                dfs(board, r, c, root, result);\n            }\n        }\n        return result;\n    }\n\n    private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {\n        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;\n        char ch = board[r][c];\n        if (ch == '#' || node.children[ch - 'a'] == null) return;\n\n        node = node.children[ch - 'a'];\n        if (node.word != null) {\n            result.add(node.word);\n            node.word = null; // de-duplicate\n        }\n\n        board[r][c] = '#';\n        dfs(board, r + 1, c, node, result);\n        dfs(board, r - 1, c, node, result);\n        dfs(board, r, c + 1, node, result);\n        dfs(board, r, c - 1, node, result);\n        board[r][c] = ch;\n    }\n}",
        timeComplexity: "O(m * n * 4 * 3^(L - 1)) - Bounded by longest word length L",
        spaceComplexity: "O(total characters in words) - Trie storage",
        explanation: "Trie allows testing hundreds of words concurrently in one traversal by terminating branches with absent children."
      }
    }
  },
  {
    id: '190',
    lcNumber: 190,
    title: "Reverse Bits",
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: "Bit Manipulation with 32-Bit Reversal",
    tag: 'Good',
    companyTags: ["Microsoft","Adobe","TCS"],
    link: 'https://leetcode.com/problems/reverse-bits/',
    hints: {
      hint1: "Reverse the 32 bits of a given unsigned integer.",
      hint2: "Iterate 32 times: shift result left by 1, bitwise OR with (n & 1), then right shift n by 1.",
      hint3: "// result = 0\n// For i from 0 to 31:\n//   result = (result << 1) | (n & 1)\n//   n >>>= 1  (unsigned right shift)\n// Return result",
      hint4: {
        javaSolution: "public class Solution {\n    public int reverseBits(int n) {\n        int result = 0;\n        for (int i = 0; i < 32; i++) {\n            result = (result << 1) | (n & 1);\n            n >>>= 1;\n        }\n        return result;\n    }\n}",
        timeComplexity: "O(1) - Exactly 32 bitwise operations",
        spaceComplexity: "O(1) - Constant integer accumulator",
        explanation: "Extracting lowest bits and appending to result shifted left reverses bit sequence in constant steps."
      }
    }
  },
  {
    id: '137',
    lcNumber: 137,
    title: "Single Number II",
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: "Bitwise Modulo 3 Accumulator",
    tag: 'Good',
    companyTags: ["Amazon","Flipkart"],
    link: 'https://leetcode.com/problems/single-number-ii/',
    hints: {
      hint1: "Every element appears 3 times except one element that appears exactly once.",
      hint2: "Sum bits at each position 0 to 31 across all numbers. Bits belonging to triplets will be multiples of 3.",
      hint3: "// ans = 0\n// For bit from 0 to 31:\n//   sum = 0\n//   for num in nums: sum += (num >> bit) & 1\n//   if sum % 3 != 0: ans |= (1 << bit)\n// return ans",
      hint4: {
        javaSolution: "class Solution {\n    public int singleNumber(int[] nums) {\n        int result = 0;\n        for (int bit = 0; bit < 32; bit++) {\n            int count = 0;\n            for (int num : nums) {\n                count += (num >> bit) & 1;\n            }\n            if (count % 3 != 0) {\n                result |= (1 << bit);\n            }\n        }\n        return result;\n    }\n}",
        timeComplexity: "O(32 * n) = O(n) - 32 passes over array",
        spaceComplexity: "O(1) - Constant variables",
        explanation: "Bit counts modulo 3 cancel out numbers occurring three times, isolating the single element bits."
      }
    }
  },
  {
    id: '231',
    lcNumber: 231,
    title: "Power of Two",
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: "Bitwise Brian Kernighan Elimination",
    tag: 'Must',
    companyTags: ["Amazon","Microsoft","TCS","Infosys"],
    link: 'https://leetcode.com/problems/power-of-two/',
    hints: {
      hint1: "Powers of two have exactly one bit set in their binary representation.",
      hint2: "Brian Kernighans bit operation n & (n - 1) turns off the lowest set bit. A power of two leaves zero.",
      hint3: "// return n > 0 && (n & (n - 1)) == 0",
      hint4: {
        javaSolution: "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n}",
        timeComplexity: "O(1) - Single bitwise operation",
        spaceComplexity: "O(1) - In-place comparison",
        explanation: "Subtracting 1 flips all bits after the lowest 1 bit; bitwise AND clears it completely."
      }
    }
  }
];

export const PROBLEM_MAP = Object.fromEntries(PROBLEMS.map((p) => [p.id, p]));
