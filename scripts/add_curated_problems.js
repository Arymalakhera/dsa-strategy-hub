import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const problemsFilePath = path.join(__dirname, '../src/data/problems.js');

const NEW_PROBLEMS = [
  // ==========================================
  // 2. HASHING + PREFIX SUM
  // ==========================================
  {
    id: '974',
    lcNumber: 974,
    title: 'Subarray Sums Divisible by K',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Modulo Frequency Map',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
    hints: {
      hint1: 'Prefix Sum combined with Modulo Arithmetic.',
      hint2: 'If two prefix sums have the same remainder when divided by k, the subarray between them is divisible by k.',
      hint3: `// 1. Maintain running sum and remainder count map: count[0] = 1
// 2. For each num:
//      sum += num
//      rem = ((sum % k) + k) % k  (handle negative mod)
//      ans += count[rem]
//      count[rem]++
// 3. Return ans`,
      hint4: {
        javaSolution: `class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int[] modCounts = new int[k];
        modCounts[0] = 1;
        int runningSum = 0;
        int result = 0;

        for (int num : nums) {
            runningSum += num;
            int rem = ((runningSum % k) + k) % k;
            result += modCounts[rem];
            modCounts[rem]++;
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Single pass over array',
        spaceComplexity: 'O(k) - Frequency array of size k',
        explanation: 'Prefix remainder congruence guarantees that equal remainders yield subarrays with a sum divisible by k.'
      }
    }
  },
  {
    id: '525',
    lcNumber: 525,
    title: 'Contiguous Array',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Earliest Index Map',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/contiguous-array/',
    hints: {
      hint1: 'Convert 0 to -1 so the problem becomes finding the longest subarray with sum = 0.',
      hint2: 'Store the earliest occurrence of each prefix sum in a hash map to maximize the subarray length.',
      hint3: `// 1. map[0] = -1
// 2. sum = 0, maxLen = 0
// 3. For i from 0 to n-1:
//      sum += (nums[i] == 1 ? 1 : -1)
//      If sum in map: maxLen = max(maxLen, i - map[sum])
//      Else: map[sum] = i
// 4. Return maxLen`,
      hint4: {
        javaSolution: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0;
        int maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += (nums[i] == 1 ? 1 : -1);
            if (map.containsKey(sum)) {
                maxLen = Math.max(maxLen, i - map.get(sum));
            } else {
                map.put(sum, i);
            }
        }
        return maxLen;
    }
}`,
        timeComplexity: 'O(n) - Single pass through the array',
        spaceComplexity: 'O(n) - Hash map storing prefix sums',
        explanation: 'Treating 0 as -1 maps the balanced 0/1 count to finding the longest subarray with net sum zero.'
      }
    }
  },
  {
    id: '380',
    lcNumber: 380,
    title: 'Insert Delete GetRandom O(1)',
    topicId: 'hashing-prefix-sum',
    difficulty: 'Medium',
    pattern: 'Hash Map + Dynamic Array Swap',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
    hints: {
      hint1: 'Hash map provides O(1) insert and delete; Array provides O(1) random access.',
      hint2: 'To delete in O(1) from an array, swap the element to remove with the last element and pop the end.',
      hint3: `// 1. ArrayList stores values, HashMap stores val -> index
// 2. insert(val): if not present, append to list, put in map
// 3. remove(val): swap list[map[val]] with list.last(), update map, pop last
// 4. getRandom(): return list[rand.nextInt(list.size())]`,
      hint4: {
        javaSolution: `import java.util.*;

class RandomizedSet {
    private List<Integer> list;
    private Map<Integer, Integer> map;
    private Random rand;

    public RandomizedSet() {
        list = new ArrayList<>();
        map = new HashMap<>();
        rand = new Random();
    }
    
    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, list.size());
        list.add(val);
        return true;
    }
    
    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;
        int idx = map.get(val);
        int lastVal = list.get(list.size() - 1);
        list.set(idx, lastVal);
        map.put(lastVal, idx);
        list.remove(list.size() - 1);
        map.remove(val);
        return true;
    }
    
    public int getRandom() {
        return list.get(rand.nextInt(list.size()));
    }
}`,
        timeComplexity: 'O(1) average for insert, remove, and getRandom',
        spaceComplexity: 'O(n) - Storing n unique elements',
        explanation: 'Swapping with the tail allows instant deletion from an array list without shifting elements.'
      }
    }
  },

  // ==========================================
  // 4. BINARY SEARCH
  // ==========================================
  {
    id: '81',
    lcNumber: 81,
    title: 'Search in Rotated Sorted Array II',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Rotated Binary Search with Duplicates',
    tag: 'Good',
    companyTags: ['Microsoft', 'Adobe', 'Amazon'],
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/',
    hints: {
      hint1: 'Rotated sorted array with potential duplicate values.',
      hint2: 'When nums[left] == nums[mid] == nums[right], we cannot determine which half is sorted; increment left and decrement right.',
      hint3: `// While left <= right:
//   If nums[mid] == target: return true
//   If nums[left] == nums[mid] == nums[right]: left++; right--; continue
//   Else check which half is sorted and test if target falls in range`,
      hint4: {
        javaSolution: `class Solution {
    public boolean search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return true;

            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
}`,
        timeComplexity: 'O(log n) average, O(n) worst case with duplicates',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'When endpoints and midpoint match, narrowing boundaries bypasses ambiguity safely.'
      }
    }
  },
  {
    id: '540',
    lcNumber: 540,
    title: 'Single Element in a Sorted Array',
    topicId: 'binary-search',
    difficulty: 'Medium',
    pattern: 'Binary Search on Index Parity',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart', 'Infosys'],
    link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/',
    hints: {
      hint1: 'Every element appears twice except one single unique element.',
      hint2: 'Before the single element, pairs start at even indices (even, odd). After the single element, pairs start at odd indices (odd, even).',
      hint3: `// Binary search on even indices:
//   mid = left + (right - left) / 2
//   if mid is odd: mid--
//   if nums[mid] == nums[mid + 1]: single is to the right -> left = mid + 2
//   else: single is at mid or left -> right = mid`,
      hint4: {
        javaSolution: `class Solution {
    public int singleNonDuplicate(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mid % 2 == 1) mid--;
            if (nums[mid] == nums[mid + 1]) {
                left = mid + 2;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`,
        timeComplexity: 'O(log n) - Binary search halving search space',
        spaceComplexity: 'O(1) - In-place comparison',
        explanation: 'Parity alignment of duplicate pairs dictates which half harbors the disruption.'
      }
    }
  },

  // ==========================================
  // 5. STACK + QUEUE
  // ==========================================
  {
    id: '739',
    lcNumber: 739,
    title: 'Daily Temperatures',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Monotonic Decreasing Stack',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/daily-temperatures/',
    hints: {
      hint1: 'Looking for the next greater element to the right for each day.',
      hint2: 'Maintain a stack of indices with decreasing temperatures. When a warmer day arrives, pop and record day differences.',
      hint3: `// 1. Stack stores indices
// 2. For i from 0 to n-1:
//      while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]):
//          prevIdx = stack.pop()
//          ans[prevIdx] = i - prevIdx
//      stack.push(i)
// 3. Return ans`,
      hint4: {
        javaSolution: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prev = stack.pop();
                ans[prev] = i - prev;
            }
            stack.push(i);
        }
        return ans;
    }
}`,
        timeComplexity: 'O(n) - Each element is pushed and popped at most once',
        spaceComplexity: 'O(n) - Stack for indices',
        explanation: 'The monotonic stack ensures each temperature waits in LIFO order until resolved by the next warmer day.'
      }
    }
  },
  {
    id: '84',
    lcNumber: 84,
    title: 'Largest Rectangle in Histogram',
    topicId: 'stack-queue',
    difficulty: 'Hard',
    pattern: 'Monotonic Stack for Rectangle Area',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Flipkart', 'Microsoft'],
    link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    hints: {
      hint1: 'Each bar can extend left and right until encountering a bar with strictly smaller height.',
      hint2: 'A monotonic increasing stack finds the left and right boundary of every bar in O(n) total time.',
      hint3: `// 1. Monotonic stack of indices with increasing heights
// 2. For each bar i (and trailing 0 sentinel):
//      while (!stack.isEmpty() && heights[i] < heights[stack.peek()]):
//          h = heights[stack.pop()]
//          w = stack.isEmpty() ? i : (i - stack.peek() - 1)
//          maxArea = max(maxArea, h * w)
//      stack.push(i)`,
      hint4: {
        javaSolution: `import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int currentHeight = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int h = heights[stack.pop()];
                int w = stack.isEmpty() ? i : (i - stack.peek() - 1);
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,
        timeComplexity: 'O(n) - Each index is pushed and popped exactly once',
        spaceComplexity: 'O(n) - Stack storage',
        explanation: 'Popping an index reveals both its right boundary (current i) and left boundary (new stack top).'
      }
    }
  },
  {
    id: '150',
    lcNumber: 150,
    title: 'Evaluate Reverse Polish Notation',
    topicId: 'stack-queue',
    difficulty: 'Medium',
    pattern: 'Stack for Postfix Expression',
    tag: 'Good',
    companyTags: ['Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
    hints: {
      hint1: 'Postfix notation processes operands before operators.',
      hint2: 'Push numbers onto stack; when an operator is reached, pop two numbers, apply operation, and push result back.',
      hint3: `// For each token:
//   If operator (+, -, *, /):
//     b = pop(), a = pop()
//     push(applyOp(a, b))
//   Else: push(parseInt(token))
// Return pop()`,
      hint4: {
        javaSolution: `import java.util.Stack;

class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String t : tokens) {
            if (t.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (t.equals("-")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a - b);
            } else if (t.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
        timeComplexity: 'O(n) - Linear pass through all tokens',
        spaceComplexity: 'O(n) - Stack storing operands',
        explanation: 'Stack guarantees the most recent operands are evaluated strictly in postfix priority.'
      }
    }
  },
  {
    id: '232',
    lcNumber: 232,
    title: 'Implement Queue using Stacks',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Two Stacks for FIFO Simulation',
    tag: 'Good',
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Amazon'],
    link: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    hints: {
      hint1: 'Stacks are LIFO; reversing twice yields FIFO.',
      hint2: 'Use an in-stack for pushes and out-stack for pops/peeks. Transfer only when out-stack is empty.',
      hint3: `// push(x): in.push(x)
// pop(): shift(); return out.pop()
// peek(): shift(); return out.peek()
// shift(): if out is empty, pop all from in to out`,
      hint4: {
        javaSolution: `import java.util.Stack;

class MyQueue {
    private Stack<Integer> in;
    private Stack<Integer> out;

    public MyQueue() {
        in = new Stack<>();
        out = new Stack<>();
    }
    
    public void push(int x) {
        in.push(x);
    }
    
    public int pop() {
        shift();
        return out.pop();
    }
    
    public int peek() {
        shift();
        return out.peek();
    }
    
    public boolean empty() {
        return in.isEmpty() && out.isEmpty();
    }

    private void shift() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) {
                out.push(in.pop());
            }
        }
    }
}`,
        timeComplexity: 'Amortized O(1) for each operation',
        spaceComplexity: 'O(n) - Storing n elements across two stacks',
        explanation: 'Each element moves from in-stack to out-stack at most once, yielding amortized O(1) pops and peeks.'
      }
    }
  },
  {
    id: '496',
    lcNumber: 496,
    title: 'Next Greater Element I',
    topicId: 'stack-queue',
    difficulty: 'Easy',
    pattern: 'Monotonic Stack + Hash Map Lookup',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/next-greater-element-i/',
    hints: {
      hint1: 'Find next greater element in nums2 for elements present in nums1.',
      hint2: 'Precompute next greater element for all items in nums2 using a monotonic stack and store answers in a hash map.',
      hint3: `// 1. Stack for nums2 elements
// 2. Map stores num -> nextGreater
// 3. For x in nums2:
//      while (!stack.isEmpty() && x > stack.peek()): map.put(stack.pop(), x)
//      stack.push(x)
// 4. For y in nums1: ans[i] = map.getOrDefault(y, -1)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Stack<Integer> stack = new Stack<>();

        for (int num : nums2) {
            while (!stack.isEmpty() && num > stack.peek()) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }

        int[] ans = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            ans[i] = map.getOrDefault(nums1[i], -1);
        }
        return ans;
    }
}`,
        timeComplexity: 'O(n + m) - Where n and m are lengths of nums1 and nums2',
        spaceComplexity: 'O(m) - Hash map and stack',
        explanation: 'Monotonic stack solves nums2 in O(m); hash map answers nums1 queries in O(1) each.'
      }
    }
  },

  // ==========================================
  // 6. SORTING + INTERVALS
  // ==========================================
  {
    id: '435',
    lcNumber: 435,
    title: 'Non-overlapping Intervals',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Greedy Interval Scheduling by End Time',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/non-overlapping-intervals/',
    hints: {
      hint1: 'Classic interval scheduling: remove minimum intervals to eliminate overlaps.',
      hint2: 'Sort by end times. Always retain the interval that ends earliest to leave the maximum room for remaining intervals.',
      hint3: `// 1. Sort intervals by end time intervals[i][1]
// 2. prevEnd = intervals[0][1], removals = 0
// 3. For i from 1 to n-1:
//      if intervals[i][0] < prevEnd: removals++
//      else: prevEnd = intervals[i][1]
// 4. Return removals`,
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                count++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting intervals by end point',
        spaceComplexity: 'O(1) - Constant auxiliary space',
        explanation: 'Greedy choice property: ending early maximizes the remaining horizon for non-conflicting intervals.'
      }
    }
  },
  {
    id: '452',
    lcNumber: 452,
    title: 'Minimum Number of Arrows to Burst Balloons',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Greedy Overlapping Coordinates',
    tag: 'Good',
    companyTags: ['Flipkart', 'Adobe', 'Amazon'],
    link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
    hints: {
      hint1: 'One arrow can burst all balloons that share overlapping intervals.',
      hint2: 'Sort balloons by end coordinate. Shoot an arrow at the end coordinate of the first unburst balloon.',
      hint3: `// 1. Sort by points[i][1]
// 2. arrows = 1, currentArrowPos = points[0][1]
// 3. For i from 1 to n-1:
//      if points[i][0] > currentArrowPos:
//          arrows++
//          currentArrowPos = points[i][1]
// 4. Return arrows`,
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

        int arrows = 1;
        int arrowPos = points[0][1];

        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > arrowPos) {
                arrows++;
                arrowPos = points[i][1];
            }
        }
        return arrows;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting by upper bound',
        spaceComplexity: 'O(1) - Primitive tracking',
        explanation: 'Firing at the earliest possible exit coordinate bursts the maximum contiguous subset of balloons.'
      }
    }
  },
  {
    id: '75',
    lcNumber: 75,
    title: 'Sort Colors',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Dutch National Flag 3-Way Partition',
    tag: 'Must',
    companyTags: ['Microsoft', 'Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/sort-colors/',
    hints: {
      hint1: 'Sort an array of 0s, 1s, and 2s in-place in a single pass O(n).',
      hint2: 'Maintain 3 pointers: low (next 0 position), mid (current scanning pointer), and high (next 2 position).',
      hint3: `// while mid <= high:
//   if nums[mid] == 0: swap(low, mid); low++; mid++
//   else if nums[mid] == 1: mid++
//   else if nums[mid] == 2: swap(mid, high); high--`,
      hint4: {
        javaSolution: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
        timeComplexity: 'O(n) - Single pass through array',
        spaceComplexity: 'O(1) - Constant in-place swaps',
        explanation: 'Dijkstras Dutch National Flag partitioning sorts 3 keys in-place in O(n) without counting passes.'
      }
    }
  },
  {
    id: '253',
    lcNumber: 253,
    title: 'Meeting Rooms II',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Chronological Point Sweeping',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/meeting-rooms-ii/',
    hints: {
      hint1: 'Find the maximum number of concurrent overlapping meetings.',
      hint2: 'Separate start and end times into two arrays and sort both. Use two pointers to simulate rooms opening and freeing.',
      hint3: `// 1. starts = intervals.map(start), ends = intervals.map(end)
// 2. Sort starts and ends
// 3. For start in starts:
//      if start >= ends[endPtr]: endPtr++
//      else: rooms++
// 4. Return rooms`,
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];

        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Arrays.sort(starts);
        Arrays.sort(ends);

        int rooms = 0;
        int endPtr = 0;

        for (int i = 0; i < n; i++) {
            if (starts[i] < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
        }
        return rooms;
    }
}`,
        timeComplexity: 'O(n log n) - Sorting starts and ends',
        spaceComplexity: 'O(n) - Storing separate start and end arrays',
        explanation: 'Chronological scan simulates rooms: an ongoing meeting either takes an emptied room or requests a new one.'
      }
    }
  },
  {
    id: '347',
    lcNumber: 347,
    title: 'Top K Frequent Elements',
    topicId: 'sorting-intervals',
    difficulty: 'Medium',
    pattern: 'Bucket Sort on Frequency',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe', 'Microsoft'],
    link: 'https://leetcode.com/problems/top-k-frequent-elements/',
    hints: {
      hint1: 'Frequency of any number is bounded by array length n.',
      hint2: 'Count frequencies in a hash map, then bucket numbers by their frequency index for O(n) collection.',
      hint3: `// 1. Count frequencies in HashMap
// 2. Create buckets List<Integer>[] of size n + 1
// 3. Place numbers into buckets[freq]
// 4. Iterate backwards from bucket n to 0, collecting k elements`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
            buckets[freq].add(key);
        }

        int[] result = new int[k];
        int idx = 0;
        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {
            if (buckets[i] != null) {
                for (int val : buckets[i]) {
                    result[idx++] = val;
                    if (idx == k) break;
                }
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Linear time using bucket sort',
        spaceComplexity: 'O(n) - Hash map and bucket array',
        explanation: 'Because frequency cannot exceed array length n, bucket sort avoids the O(n log k) heap overhead.'
      }
    }
  },

  // ==========================================
  // 7. LINKED LIST
  // ==========================================
  {
    id: '138',
    lcNumber: 138,
    title: 'Copy List with Random Pointer',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Interleaved Node Cloning / Hash Map',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
    hints: {
      hint1: 'Cloning a linked list where nodes contain arbitrary random pointers.',
      hint2: 'Interleave cloned nodes directly next to originals: A -> A\' -> B -> B\'. This allows copying random pointers in O(1) extra space.',
      hint3: `// 1. For each node, insert copy node right after it: curr.next = new Node(curr.val, curr.next)
// 2. Set random pointers: curr.next.random = curr.random != null ? curr.random.next : null
// 3. Separate original and cloned lists`,
      hint4: {
        javaSolution: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Step 1: Interleave cloned nodes
        Node curr = head;
        while (curr != null) {
            Node copy = new Node(curr.val);
            copy.next = curr.next;
            curr.next = copy;
            curr = copy.next;
        }

        // Step 2: Assign random pointers
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }

        // Step 3: Unweave the lists
        curr = head;
        Node dummy = new Node(0);
        Node copyCurr = dummy;
        while (curr != null) {
            Node nextOriginal = curr.next.next;
            copyCurr.next = curr.next;
            copyCurr = copyCurr.next;
            curr.next = nextOriginal;
            curr = nextOriginal;
        }
        return dummy.next;
    }
}`,
        timeComplexity: 'O(n) - Three linear passes',
        spaceComplexity: 'O(1) - In-place interleaved pointers',
        explanation: 'Interleaving nodes pairs each cloned node immediately after its source, bypassing hash map memory.'
      }
    }
  },
  {
    id: '234',
    lcNumber: 234,
    title: 'Palindrome Linked List',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'Fast/Slow Pointer + In-Place Reversal',
    tag: 'Must',
    companyTags: ['Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/palindrome-linked-list/',
    hints: {
      hint1: 'Find if a linked list reads the same forward and backwards.',
      hint2: 'Use fast and slow pointers to locate the middle, reverse the second half, and compare values node by node.',
      hint3: `// 1. slow = head, fast = head
// 2. Move fast by 2, slow by 1 to reach middle
// 3. Reverse list starting from slow
// 4. Compare first half and reversed second half`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;

        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n) - Linear traversal',
        spaceComplexity: 'O(1) - In-place reversal',
        explanation: 'Reversing only the trailing half allows symmetric palindrome comparison in O(1) memory.'
      }
    }
  },
  {
    id: '160',
    lcNumber: 160,
    title: 'Intersection of Two Linked Lists',
    topicId: 'linked-list',
    difficulty: 'Easy',
    pattern: 'Two Pointers Traversal Balancing',
    tag: 'Good',
    companyTags: ['Amazon', 'Infosys', 'Wipro'],
    link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    hints: {
      hint1: 'Find the node where two singly linked lists merge.',
      hint2: 'When pointer A reaches end, redirect to headB. When pointer B reaches end, redirect to headA. Both travel length(A) + length(B).',
      hint3: `// pA = headA, pB = headB
// while pA != pB:
//   pA = (pA == null) ? headB : pA.next
//   pB = (pB == null) ? headA : pB.next
// return pA`,
      hint4: {
        javaSolution: `public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;
        ListNode pA = headA, pB = headB;

        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }
        return pA;
    }
}`,
        timeComplexity: 'O(m + n) - Each pointer travels at most m + n nodes',
        spaceComplexity: 'O(1) - Constant pointer manipulation',
        explanation: 'Switching heads equalizes the cumulative distance travelled, ensuring collision at the intersection.'
      }
    }
  },
  {
    id: '2',
    lcNumber: 2,
    title: 'Add Two Numbers',
    topicId: 'linked-list',
    difficulty: 'Medium',
    pattern: 'Digit Addition with Carry Chain',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/add-two-numbers/',
    hints: {
      hint1: 'Lists represent reversed numbers; the head is the least significant digit.',
      hint2: 'Traverse both lists simultaneously, computing digit sum + carry, and linking new nodes to a dummy head.',
      hint3: `// dummy = new ListNode(0), curr = dummy, carry = 0
// while l1 != null || l2 != null || carry != 0:
//   sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0)
//   carry = sum / 10
//   curr.next = new ListNode(sum % 10)
//   advance curr, l1, l2`,
      hint4: {
        javaSolution: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            int sum = val1 + val2 + carry;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;

            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`,
        timeComplexity: 'O(max(m, n)) - Traverses the longer list',
        spaceComplexity: 'O(max(m, n)) - Output list storage',
        explanation: 'Reversed representation simplifies column addition with carry propagation from left to right.'
      }
    }
  },

  // ==========================================
  // 8. RECURSION + BACKTRACKING
  // ==========================================
  {
    id: '79',
    lcNumber: 79,
    title: 'Word Search',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: '2D Grid DFS Backtracking',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/word-search/',
    hints: {
      hint1: 'Search for word in 2D character grid moving in 4 directions.',
      hint2: 'DFS from each cell matching word[0]. Mark visited cells in-place with a special char (#) and restore on return.',
      hint3: `// dfs(r, c, idx):
//   if idx == word.length: return true
//   if out of bounds or board[r][c] != word[idx]: return false
//   temp = board[r][c]; board[r][c] = '#'
//   res = dfs in 4 directions for idx + 1
//   board[r][c] = temp
//   return res`,
      hint4: {
        javaSolution: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(board, word, r, c, 0)) return true;
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
        board[r][c] = '#';
        boolean found = dfs(board, word, r + 1, c, idx + 1) ||
                        dfs(board, word, r - 1, c, idx + 1) ||
                        dfs(board, word, r, c + 1, idx + 1) ||
                        dfs(board, word, r, c - 1, idx + 1);
        board[r][c] = temp;
        return found;
    }
}`,
        timeComplexity: 'O(m * n * 3^L) - Where L is word length',
        spaceComplexity: 'O(L) - Recursion call stack depth',
        explanation: 'In-place character modification simulates visited status without extra O(m*n) memory.'
      }
    }
  },
  {
    id: '17',
    lcNumber: 17,
    title: 'Letter Combinations of a Phone Number',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Combinatorial Backtracking on Digits',
    tag: 'Must',
    companyTags: ['Microsoft', 'Adobe', 'Amazon'],
    link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    hints: {
      hint1: 'Telephone keypad mapping digits 2-9 to strings.',
      hint2: 'Standard recursive combination building: explore all letters for digits[index], recurse to index + 1.',
      hint3: `// backtrack(index, currentCombination):
//   if index == digits.length: add to result; return
//   letters = map[digits[index]]
//   for ch in letters:
//     backtrack(index + 1, currentCombination + ch)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    private static final String[] KEYPAD = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits == null || digits.length() == 0) return result;
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(String digits, int idx, StringBuilder current, List<String> result) {
        if (idx == digits.length()) {
            result.add(current.toString());
            return;
        }

        String letters = KEYPAD[digits.charAt(idx) - '0'];
        for (char ch : letters.toCharArray()) {
            current.append(ch);
            backtrack(digits, idx + 1, current, result);
            current.deleteCharAt(current.length() - 1);
        }
    }
}`,
        timeComplexity: 'O(4^n) - Maximum branch factor 4 (digits 7 and 9)',
        spaceComplexity: 'O(n) - Recursion call stack and path builder',
        explanation: 'Exhaustive combination generation via backtracking across keypad mapping branches.'
      }
    }
  },
  {
    id: '131',
    lcNumber: 131,
    title: 'Palindrome Partitioning',
    topicId: 'recursion-backtracking',
    difficulty: 'Medium',
    pattern: 'Partition Backtracking with Validation',
    tag: 'Good',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/palindrome-partitioning/',
    hints: {
      hint1: 'Partition string such that every substring in the partition is a palindrome.',
      hint2: 'At index start, check all substrings s[start..end]. If palindromic, recurse from end + 1.',
      hint3: `// backtrack(start, currentList):
//   if start == s.length: result.add(new ArrayList<>(currentList))
//   for end from start to s.length - 1:
//     if isPalindrome(s, start, end):
//       currentList.add(s.substring(start, end + 1))
//       backtrack(end + 1, currentList)
//       currentList.removeLast()`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(String s, int start, List<String> current, List<List<String>> result) {
        if (start == s.length()) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                current.add(s.substring(start, end + 1));
                backtrack(s, end + 1, current, result);
                current.remove(current.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}`,
        timeComplexity: 'O(n * 2^n) - Up to 2^(n-1) partitions, O(n) palindrome checks',
        spaceComplexity: 'O(n) - Path buffer and recursion stack',
        explanation: 'Prunes invalid non-palindromic prefixes immediately before descending the search tree.'
      }
    }
  },
  {
    id: '37',
    lcNumber: 37,
    title: 'Sudoku Solver',
    topicId: 'recursion-backtracking',
    difficulty: 'Hard',
    pattern: 'Constraint Satisfaction Backtracking',
    tag: 'Bonus',
    companyTags: ['Microsoft', 'Adobe', 'Amazon'],
    link: 'https://leetcode.com/problems/sudoku-solver/',
    hints: {
      hint1: 'Fill 9x9 grid complying with row, column, and 3x3 box uniqueness constraints.',
      hint2: 'Iterate cell by cell. For empty cells, try numbers 1-9; if valid, recurse to next cell; backtrack if dead end.',
      hint3: `// solve():
//   Find next empty cell (r, c)
//   If none empty: return true
//   For char '1' to '9':
//     if isValid(r, c, ch):
//       board[r][c] = ch
//       if solve(): return true
//       board[r][c] = '.'
//   return false`,
      hint4: {
        javaSolution: `class Solution {
    public void solveSudoku(char[][] board) {
        solve(board);
    }

    private boolean solve(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char ch = '1'; ch <= '9'; ch++) {
                        if (isValid(board, r, c, ch)) {
                            board[r][c] = ch;
                            if (solve(board)) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isValid(char[][] board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch) return false;
            if (board[i][c] == ch) return false;
            int boxR = 3 * (r / 3) + i / 3;
            int boxC = 3 * (c / 3) + i % 3;
            if (board[boxR][boxC] == ch) return false;
        }
        return true;
    }
}`,
        timeComplexity: 'O(9^(empty cells)) - Exponential bounded search',
        spaceComplexity: 'O(1) auxiliary - Board is modified in-place with O(81) call stack depth',
        explanation: 'Constraint propagation checks rows, columns, and 3x3 blocks simultaneously before trial placement.'
      }
    }
  },

  // ==========================================
  // 9. TREES
  // ==========================================
  {
    id: '124',
    lcNumber: 124,
    title: 'Binary Tree Maximum Path Sum',
    topicId: 'trees',
    difficulty: 'Hard',
    pattern: 'Post-Order DFS Contribution',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    hints: {
      hint1: 'A path can go up and down through any node, but cannot branch.',
      hint2: 'Post-order DFS: for each node, compute max gain from left and right children (ignoring negative gains with Math.max(0, gain)).',
      hint3: `// dfs(node):
//   leftGain = max(0, dfs(node.left))
//   rightGain = max(0, dfs(node.right))
//   maxPath = max(maxPath, node.val + leftGain + rightGain)
//   return node.val + max(leftGain, rightGain)`,
      hint4: {
        javaSolution: `class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }

    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(0, dfs(node.left));
        int rightGain = Math.max(0, dfs(node.right));

        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
        timeComplexity: 'O(n) - Single post-order traversal',
        spaceComplexity: 'O(h) - Where h is tree height',
        explanation: 'At each node, combining left + right gains evaluates an arch path, while returning the single best branch upwards.'
      }
    }
  },
  {
    id: '105',
    lcNumber: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    topicId: 'trees',
    difficulty: 'Medium',
    pattern: 'Recursive Traversal Boundary Partitioning',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    hints: {
      hint1: 'Preorder root is always at index 0. Inorder root splits into left and right subtrees.',
      hint2: 'Use a hash map to look up root indices in inorder in O(1) time.',
      hint3: `// root = new TreeNode(preorder[preStart])
// inIndex = map.get(root.val)
// leftTreeSize = inIndex - inStart
// root.left = build(preStart + 1, inStart, inIndex - 1)
// root.right = build(preStart + leftTreeSize + 1, inIndex + 1, inEnd)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    private Map<Integer, Integer> inMap = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(preorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }

    private TreeNode build(int[] pre, int preL, int preR, int inL, int inR) {
        if (preL > preR || inL > inR) return null;

        int rootVal = pre[preL];
        TreeNode root = new TreeNode(rootVal);
        int inRootIdx = inMap.get(rootVal);
        int leftSubtreeSize = inRootIdx - inL;

        root.left = build(pre, preL + 1, preL + leftSubtreeSize, inL, inRootIdx - 1);
        root.right = build(pre, preL + leftSubtreeSize + 1, preR, inRootIdx + 1, inR);
        return root;
    }
}`,
        timeComplexity: 'O(n) - Constructing n nodes with O(1) index lookups',
        spaceComplexity: 'O(n) - Hash map and recursion stack',
        explanation: 'Inorder index reveals exact left/right subtree counts to slice preorder segments cleanly.'
      }
    }
  },
  {
    id: '543',
    lcNumber: 543,
    title: 'Diameter of Binary Tree',
    topicId: 'trees',
    difficulty: 'Easy',
    pattern: 'Post-Order Depth Calculation with Global Max',
    tag: 'Must',
    companyTags: ['Amazon', 'Flipkart', 'TCS'],
    link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    hints: {
      hint1: 'Diameter is the length of the longest path between any two nodes in a tree.',
      hint2: 'The longest path through any node is leftDepth + rightDepth. Track the max diameter globally during a standard height DFS.',
      hint3: `// dfs(node):
//   if node == null: return 0
//   l = dfs(node.left)
//   r = dfs(node.right)
//   maxDiameter = max(maxDiameter, l + r)
//   return 1 + max(l, r)`,
      hint4: {
        javaSolution: `class Solution {
    private int maxDiameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        depth(root);
        return maxDiameter;
    }

    private int depth(TreeNode node) {
        if (node == null) return 0;
        int left = depth(node.left);
        int right = depth(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return 1 + Math.max(left, right);
    }
}`,
        timeComplexity: 'O(n) - Visits every node once',
        spaceComplexity: 'O(h) - Recursion stack equal to tree height',
        explanation: 'Computes maximum node-to-node distance by combining subtree heights during a standard bottom-up pass.'
      }
    }
  },

  // ==========================================
  // 10. HEAP
  // ==========================================
  {
    id: '295',
    lcNumber: 295,
    title: 'Find Median from Data Stream',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'Two Heaps (Max-Heap + Min-Heap)',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/find-median-from-data-stream/',
    hints: {
      hint1: 'Continuous stream of numbers; need O(1) or O(log n) median access.',
      hint2: 'Split data into lower half (Max-Heap) and upper half (Min-Heap). Keep heap sizes balanced within 1 element.',
      hint3: `// 1. addNum(num):
//      maxHeap.add(num)
//      minHeap.add(maxHeap.poll())
//      if (minHeap.size() > maxHeap.size()): maxHeap.add(minHeap.poll())
// 2. findMedian():
//      return maxHeap.size() > minHeap.size() ? maxHeap.peek() : (maxHeap.peek() + minHeap.peek()) / 2.0`,
      hint4: {
        javaSolution: `import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // stores lower half
    private PriorityQueue<Integer> minHeap; // stores upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.add(num);
        minHeap.add(maxHeap.poll());
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.add(minHeap.poll());
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
        spaceComplexity: 'O(n) - Storing numbers across two heaps',
        explanation: 'Two heaps maintain a partition barrier, placing the exact median candidates at the heap tops.'
      }
    }
  },
  {
    id: '23',
    lcNumber: 23,
    title: 'Merge k Sorted Lists',
    topicId: 'heap',
    difficulty: 'Hard',
    pattern: 'K-Way Min-Heap Merge',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    hints: {
      hint1: 'K sorted linked lists to be merged into one single sorted list.',
      hint2: 'A min-heap of size k stores the heads of all non-empty lists. Pop the minimum, link it, and push its next node.',
      hint3: `// 1. MinHeap compares ListNode.val
// 2. Push all non-null list heads into heap
// 3. while (!heap.isEmpty()):
//      curr = heap.poll()
//      tail.next = curr; tail = tail.next
//      if (curr.next != null) heap.add(curr.next)`,
      hint4: {
        javaSolution: `import java.util.PriorityQueue;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));

        for (ListNode node : lists) {
            if (node != null) minHeap.add(node);
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (!minHeap.isEmpty()) {
            ListNode smallest = minHeap.poll();
            tail.next = smallest;
            tail = tail.next;
            if (smallest.next != null) {
                minHeap.add(smallest.next);
            }
        }
        return dummy.next;
    }
}`,
        timeComplexity: 'O(N log k) - Where N is total nodes and k is number of lists',
        spaceComplexity: 'O(k) - Min-heap holding at most k heads',
        explanation: 'Min-heap maintains the current frontier across all k lists in logarithmic insertion time.'
      }
    }
  },
  {
    id: '621',
    lcNumber: 621,
    title: 'Task Scheduler',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Max-Heap Frequency Greediness',
    tag: 'Good',
    companyTags: ['Microsoft', 'Adobe', 'Amazon'],
    link: 'https://leetcode.com/problems/task-scheduler/',
    hints: {
      hint1: 'Identical tasks must have cooldown n between executions.',
      hint2: 'Always execute the task with the highest remaining frequency first using a max-heap.',
      hint3: `// Mathematical or Heap approach:
// Count max frequency maxFreq
// Count how many tasks have frequency == maxFreq (numMaxFreq)
// Intervals = (maxFreq - 1) * (n + 1) + numMaxFreq
// Return Math.max(tasks.length, Intervals)`,
      hint4: {
        javaSolution: `import java.util.Arrays;

class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char t : tasks) freq[t - 'A']++;
        Arrays.sort(freq);

        int maxFreq = freq[25];
        int numMaxFreq = 0;
        for (int i = 25; i >= 0 && freq[i] == maxFreq; i--) {
            numMaxFreq++;
        }

        int emptySlots = (maxFreq - 1) * (n + 1) + numMaxFreq;
        return Math.max(tasks.length, emptySlots);
    }
}`,
        timeComplexity: 'O(tasks.length) - Linear frequency counting',
        spaceComplexity: 'O(1) - Constant 26-size alphabet array',
        explanation: 'The most frequent tasks dictate the cooldown framework; remaining tasks slot into intermediate idle gaps.'
      }
    }
  },
  {
    id: '767',
    lcNumber: 767,
    title: 'Reorganize String',
    topicId: 'heap',
    difficulty: 'Medium',
    pattern: 'Max-Heap Alternating Pair Placement',
    tag: 'Good',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/reorganize-string/',
    hints: {
      hint1: 'Rearrange string so that no two adjacent characters are identical.',
      hint2: 'Max-heap of characters by frequency. Pick the two most frequent characters at each step and place them adjacently.',
      hint3: `// 1. If any char freq > (n + 1) / 2: return ""
// 2. MaxHeap of char frequencies
// 3. while (heap.size() >= 2):
//      pop first, second; append to result; decrement freqs; re-add if > 0
// 4. If 1 char left, append`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public String reorganizeString(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[1], a[1]));
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                if (count[i] > (s.length() + 1) / 2) return "";
                maxHeap.add(new int[]{i, count[i]});
            }
        }

        StringBuilder sb = new StringBuilder();
        while (maxHeap.size() >= 2) {
            int[] first = maxHeap.poll();
            int[] second = maxHeap.poll();
            sb.append((char) ('a' + first[0]));
            sb.append((char) ('a' + second[0]));
            if (--first[1] > 0) maxHeap.add(first);
            if (--second[1] > 0) maxHeap.add(second);
        }

        if (!maxHeap.isEmpty()) {
            sb.append((char) ('a' + maxHeap.poll()[0]));
        }
        return sb.toString();
    }
}`,
        timeComplexity: 'O(n log 26) = O(n) - Heap operations bounded by alphabet size',
        spaceComplexity: 'O(26) = O(1) - Constant alphabet size storage',
        explanation: 'Always interleaving the top two dominant characters prevents any character from clustering consecutively.'
      }
    }
  },
  {
    id: '1046',
    lcNumber: 1046,
    title: 'Last Stone Weight',
    topicId: 'heap',
    difficulty: 'Easy',
    pattern: 'Max-Heap Collision Simulation',
    tag: 'Bonus',
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Amazon'],
    link: 'https://leetcode.com/problems/last-stone-weight/',
    hints: {
      hint1: 'Smash the two heaviest stones together at each step.',
      hint2: 'Max-heap gives instantaneous access to the two heaviest stones in O(log n).',
      hint3: `// 1. Put all stones in MaxHeap
// 2. while (heap.size() > 1):
//      y = heap.poll(), x = heap.poll()
//      if (y != x) heap.add(y - x)
// 3. Return heap.isEmpty() ? 0 : heap.peek()`,
      hint4: {
        javaSolution: `import java.util.Collections;
import java.util.PriorityQueue;

class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) maxHeap.add(s);

        while (maxHeap.size() > 1) {
            int y = maxHeap.poll();
            int x = maxHeap.poll();
            if (y != x) {
                maxHeap.add(y - x);
            }
        }
        return maxHeap.isEmpty() ? 0 : maxHeap.peek();
    }
}`,
        timeComplexity: 'O(n log n) - Heapify and collision removals',
        spaceComplexity: 'O(n) - Max heap storage',
        explanation: 'Max-heap dynamically reorders weights after each smash in O(log n).'
      }
    }
  },

  // ==========================================
  // 11. GREEDY
  // ==========================================
  {
    id: '134',
    lcNumber: 134,
    title: 'Gas Station',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Circular Route Deficit Accumulator',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/gas-station/',
    hints: {
      hint1: 'If total gas < total cost, completing the circuit is impossible.',
      hint2: 'If running tank dips below 0 at station i, no station from start to i can be the starting point. Reset start to i + 1.',
      hint3: `// totalTank = 0, currTank = 0, start = 0
// For i from 0 to n-1:
//   diff = gas[i] - cost[i]
//   totalTank += diff; currTank += diff
//   if currTank < 0: start = i + 1; currTank = 0
// return totalTank >= 0 ? start : -1`,
      hint4: {
        javaSolution: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int tank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return (totalGas >= totalCost) ? start : -1;
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Net positive total surplus guarantees a solution exists, and resetting start skips failed prefixes in linear time.'
      }
    }
  },
  {
    id: '763',
    lcNumber: 763,
    title: 'Partition Labels',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Greedy Interval Expansion by Last Occurrence',
    tag: 'Must',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/partition-labels/',
    hints: {
      hint1: 'Each letter must appear in at most one part.',
      hint2: 'Precompute the last occurrence index of each character. Traverse string expanding the current partition boundary to max(last[ch]).',
      hint3: `// 1. last[c] = last index of character c in s
// 2. start = 0, end = 0
// 3. For i from 0 to n-1:
//      end = max(end, last[s[i]])
//      if i == end: add (end - start + 1) to result; start = i + 1`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }

        List<Integer> result = new ArrayList<>();
        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                result.add(end - start + 1);
                start = i + 1;
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(n) - Two linear scans of the string',
        spaceComplexity: 'O(1) - 26-element array for alphabet last seen',
        explanation: 'Greedy partition boundary expansion guarantees every letter in the partition terminates inside it.'
      }
    }
  },
  {
    id: '846',
    lcNumber: 846,
    title: 'Hand of Straights',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'TreeMap / Frequency Map Consecutive Grouping',
    tag: 'Good',
    companyTags: ['Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/hand-of-straights/',
    hints: {
      hint1: 'Rearrange cards into groups of size groupSize with consecutive values.',
      hint2: 'Use a TreeMap to keep cards sorted. Always begin a new group with the smallest available card and verify groupSize consecutive keys.',
      hint3: `// if hand.length % groupSize != 0: return false
// TreeMap stores count of each card
// For key in map.keySet():
//   count = map.get(key)
//   if count > 0:
//     for i from 0 to groupSize - 1:
//       if map.getOrDefault(key + i, 0) < count: return false
//       map.put(key + i, map.get(key + i) - count)`,
      hint4: {
        javaSolution: `import java.util.TreeMap;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;
        TreeMap<Integer, Integer> map = new TreeMap<>();
        for (int card : hand) {
            map.put(card, map.getOrDefault(card, 0) + 1);
        }

        for (int card : map.keySet()) {
            int count = map.get(card);
            if (count > 0) {
                for (int i = 0; i < groupSize; i++) {
                    int nextCard = card + i;
                    if (map.getOrDefault(nextCard, 0) < count) return false;
                    map.put(nextCard, map.get(nextCard) - count);
                }
            }
        }
        return true;
    }
}`,
        timeComplexity: 'O(n log n) - TreeMap ordering and updates',
        spaceComplexity: 'O(n) - Frequency map',
        explanation: 'Starting greedily with the lowest card eliminates choice ambiguity for straight formation.'
      }
    }
  },
  {
    id: '53',
    lcNumber: 53,
    title: 'Maximum Subarray',
    topicId: 'greedy',
    difficulty: 'Medium',
    pattern: 'Kadane Algorithm Local vs Global Max',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/maximum-subarray/',
    hints: {
      hint1: 'Find the contiguous subarray with the largest sum.',
      hint2: 'At each position, decide whether to add nums[i] to the existing running sum or restart a fresh subarray at nums[i].',
      hint3: `// maxEndingHere = nums[0], maxSoFar = nums[0]
// For i from 1 to n-1:
//   maxEndingHere = max(nums[i], maxEndingHere + nums[i])
//   maxSoFar = max(maxSoFar, maxEndingHere)
// Return maxSoFar`,
      hint4: {
        javaSolution: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxEndingHere = nums[0];
        int maxSoFar = nums[0];

        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`,
        timeComplexity: 'O(n) - Single linear pass',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Kadanes algorithm drops negative prefix baggage greedily when it harms future subarray potential.'
      }
    }
  },
  {
    id: '860',
    lcNumber: 860,
    title: 'Lemonade Change',
    topicId: 'greedy',
    difficulty: 'Easy',
    pattern: 'Greedy Bill Denomination Change',
    tag: 'Good',
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Amazon'],
    link: 'https://leetcode.com/problems/lemonade-change/',
    hints: {
      hint1: 'Each customer buys a $5 lemonade with a $5, $10, or $20 bill.',
      hint2: 'When giving $15 change for a $20 bill, greedily prefer returning one $10 and one $5 over three $5 bills, because $5 bills are more versatile.',
      hint3: `// For bill in bills:
//   if bill == 5: five++
//   else if bill == 10: if (five == 0) return false; five--; ten++
//   else: (bill == 20):
//     if (ten > 0 && five > 0) { ten--; five--; }
//     else if (five >= 3) { five -= 3; }
//     else return false`,
      hint4: {
        javaSolution: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}`,
        timeComplexity: 'O(n) - Single pass through customers',
        spaceComplexity: 'O(1) - Two integer counters',
        explanation: 'Preserving $5 bills greedily ensures future $10 customer transactions will not stall.'
      }
    }
  },

  // ==========================================
  // 12. GRAPHS
  // ==========================================
  {
    id: '210',
    lcNumber: 210,
    title: 'Course Schedule II',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Kahns Topological Sort BFS Order',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/course-schedule-ii/',
    hints: {
      hint1: 'Find a valid topological course order given prerequisites.',
      hint2: 'Kahns BFS algorithm: compute in-degrees. Seed queue with in-degree 0 courses; process node, record in order array, and decrement neighbors.',
      hint3: `// 1. inDegree array and adjacency list
// 2. Queue contains all nodes with inDegree == 0
// 3. while (!queue.isEmpty()):
//      curr = queue.poll(); order[idx++] = curr
//      for neighbor in adj[curr]:
//        if (--inDegree[neighbor] == 0) queue.add(neighbor)
// 4. Return idx == numCourses ? order : new int[0]`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<Integer>[] adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        int[] inDegree = new int[numCourses];

        for (int[] p : prerequisites) {
            adj[p[1]].add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }

        int[] order = new int[numCourses];
        int idx = 0;

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            order[idx++] = curr;

            for (int neighbor : adj[curr]) {
                if (--inDegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }

        return (idx == numCourses) ? order : new int[0];
    }
}`,
        timeComplexity: 'O(V + E) - Visits all vertices and edges',
        spaceComplexity: 'O(V + E) - Adjacency list and queue',
        explanation: 'In-degree queue tracking topologically orders dependencies and signals cycles when unprocessed nodes remain.'
      }
    }
  },
  {
    id: '743',
    lcNumber: 743,
    title: 'Network Delay Time',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Dijkstras Shortest Path Min-Heap',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'Adobe'],
    link: 'https://leetcode.com/problems/network-delay-time/',
    hints: {
      hint1: 'Find time for all nodes to receive a signal from source node k in a directed weighted graph.',
      hint2: 'Dijkstras algorithm with a min-heap finds the shortest path distance to all nodes. Answer is the maximum distance.',
      hint3: `// 1. dist array initialized to infinity; dist[k] = 0
// 2. MinHeap stores [time, node]
// 3. while (!heap.isEmpty()):
//      [d, u] = heap.poll()
//      if d > dist[u]: continue
//      for [v, weight] in adj[u]:
//        if d + weight < dist[v]: dist[v] = d + weight; heap.add([dist[v], v])
// 4. Return max in dist array (or -1 if any node unreached)`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int[] t : times) {
            adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
        }

        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;

        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        minHeap.add(new int[]{0, k});

        while (!minHeap.isEmpty()) {
            int[] curr = minHeap.poll();
            int d = curr[0], u = curr[1];
            if (d > dist[u]) continue;

            if (adj.containsKey(u)) {
                for (int[] edge : adj.get(u)) {
                    int v = edge[0], weight = edge[1];
                    if (d + weight < dist[v]) {
                        dist[v] = d + weight;
                        minHeap.add(new int[]{dist[v], v});
                    }
                }
            }
        }

        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxTime = Math.max(maxTime, dist[i]);
        }
        return maxTime;
    }
}`,
        timeComplexity: 'O(E log V) - Min-heap Dijkstra standard complexity',
        spaceComplexity: 'O(V + E) - Graph representation and distance array',
        explanation: 'Min-heap relaxation greedily explores closest unvisited nodes first in positive-weight networks.'
      }
    }
  },
  {
    id: '127',
    lcNumber: 127,
    title: 'Word Ladder',
    topicId: 'graphs',
    difficulty: 'Hard',
    pattern: 'Shortest Path BFS on Word Graph',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/word-ladder/',
    hints: {
      hint1: 'Transform beginWord to endWord altering 1 character at a time, each intermediate word in wordList.',
      hint2: 'Standard unweighted shortest path problem: Level-order BFS guarantees the shortest transformation sequence.',
      hint3: `// 1. Put wordList into HashSet for O(1) lookups
// 2. Queue with beginWord, level = 1
// 3. while (!queue.isEmpty()):
//      for each word at current level:
//        try replacing each char with 'a'-'z'
//        if candidate == endWord: return level + 1
//        if candidate in wordSet: remove from set; queue.add(candidate)
//      level++`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                char[] chars = curr.toCharArray();

                for (int j = 0; j < chars.length; j++) {
                    char orig = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[j] = c;
                        String next = new String(chars);
                        if (next.equals(endWord)) return level + 1;
                        if (wordSet.contains(next)) {
                            wordSet.remove(next);
                            queue.add(next);
                        }
                    }
                    chars[j] = orig;
                }
            }
            level++;
        }
        return 0;
    }
}`,
        timeComplexity: 'O(M^2 * N) - Where M is word length and N is wordList size',
        spaceComplexity: 'O(M * N) - Word set and BFS queue',
        explanation: 'BFS explores one edit-distance away at each step, naturally securing minimum transformation length.'
      }
    }
  },
  {
    id: '684',
    lcNumber: 684,
    title: 'Redundant Connection',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Disjoint Set Union (Union-Find)',
    tag: 'Good',
    companyTags: ['Amazon', 'Adobe'],
    link: 'https://leetcode.com/problems/redundant-connection/',
    hints: {
      hint1: 'Find the edge that creates a cycle in an undirected graph that was originally a tree.',
      hint2: 'Union-Find / Disjoint Set Union: for each edge (u, v), if find(u) == find(v), they are already connected, so this edge is the redundant cycle edge.',
      hint3: `// 1. Parent array parent[i] = i
// 2. For each [u, v] in edges:
//      rootU = find(u), rootV = find(v)
//      if rootU == rootV: return [u, v]
//      parent[rootU] = rootV`,
      hint4: {
        javaSolution: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] parent = new int[n + 1];
        for (int i = 1; i <= n; i++) parent[i] = i;

        for (int[] edge : edges) {
            int rootU = find(parent, edge[0]);
            int rootV = find(parent, edge[1]);
            if (rootU == rootV) return edge;
            parent[rootU] = rootV;
        }
        return new int[0];
    }

    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`,
        timeComplexity: 'O(n * alpha(n)) ≈ O(n) - Near-linear Union-Find with path compression',
        spaceComplexity: 'O(n) - Parent array',
        explanation: 'Connecting two vertices already sharing the same root exposes the extraneous cycle edge.'
      }
    }
  },
  {
    id: '547',
    lcNumber: 547,
    title: 'Number of Provinces',
    topicId: 'graphs',
    difficulty: 'Medium',
    pattern: 'Connected Components via DFS',
    tag: 'Must',
    companyTags: ['Microsoft', 'Flipkart', 'TCS'],
    link: 'https://leetcode.com/problems/number-of-provinces/',
    hints: {
      hint1: 'Count isolated groups of connected cities in an adjacency matrix.',
      hint2: 'Maintain visited boolean array. For each unvisited city, initiate DFS to mark its entire connected province and increment province count.',
      hint3: `// provinces = 0
// For i from 0 to n-1:
//   if (!visited[i]):
//     dfs(i, isConnected, visited)
//     provinces++
// Return provinces`,
      hint4: {
        javaSolution: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, visited, i);
                count++;
            }
        }
        return count;
    }

    private void dfs(int[][] isConnected, boolean[] visited, int i) {
        visited[i] = true;
        for (int j = 0; j < isConnected.length; j++) {
            if (isConnected[i][j] == 1 && !visited[j]) {
                dfs(isConnected, visited, j);
            }
        }
    }
}`,
        timeComplexity: 'O(n^2) - Traverses n x n adjacency matrix',
        spaceComplexity: 'O(n) - Visited array and DFS call stack',
        explanation: 'Each top-level unvisited DFS launch marks an entire independent connected component.'
      }
    }
  },

  // ==========================================
  // 14. TRIE + BIT MANIPULATION
  // ==========================================
  {
    id: '212',
    lcNumber: 212,
    title: 'Word Search II',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Hard',
    pattern: 'Trie-Guided Backtracking on Board',
    tag: 'Bonus',
    companyTags: ['Amazon', 'Microsoft', 'Flipkart'],
    link: 'https://leetcode.com/problems/word-search-ii/',
    hints: {
      hint1: 'Search for multiple words from dictionary on 2D character grid simultaneously.',
      hint2: 'Build a Trie from all words in wordList. Guide the board DFS using Trie nodes to prune invalid prefixes immediately.',
      hint3: `// 1. Build Trie where leaf nodes store word string
// 2. For each cell (r, c):
//      dfs(board, r, c, trieRoot, result)
// 3. Mark visited cell with '#' and restore on return`,
      hint4: {
        javaSolution: `import java.util.*;

class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word;
    }

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode node = root;
            for (char c : w.toCharArray()) {
                int idx = c - 'a';
                if (node.children[idx] == null) node.children[idx] = new TrieNode();
                node = node.children[idx];
            }
            node.word = w;
        }

        List<String> result = new ArrayList<>();
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                dfs(board, r, c, root, result);
            }
        }
        return result;
    }

    private void dfs(char[][] board, int r, int c, TrieNode node, List<String> result) {
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return;
        char ch = board[r][c];
        if (ch == '#' || node.children[ch - 'a'] == null) return;

        node = node.children[ch - 'a'];
        if (node.word != null) {
            result.add(node.word);
            node.word = null; // de-duplicate
        }

        board[r][c] = '#';
        dfs(board, r + 1, c, node, result);
        dfs(board, r - 1, c, node, result);
        dfs(board, r, c + 1, node, result);
        dfs(board, r, c - 1, node, result);
        board[r][c] = ch;
    }
}`,
        timeComplexity: 'O(m * n * 4 * 3^(L - 1)) - Bounded by longest word length L',
        spaceComplexity: 'O(total characters in words) - Trie storage',
        explanation: 'Trie allows testing hundreds of words concurrently in one traversal by terminating branches with absent children.'
      }
    }
  },
  {
    id: '190',
    lcNumber: 190,
    title: 'Reverse Bits',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bit Manipulation with 32-Bit Reversal',
    tag: 'Good',
    companyTags: ['Microsoft', 'Adobe', 'TCS'],
    link: 'https://leetcode.com/problems/reverse-bits/',
    hints: {
      hint1: 'Reverse the 32 bits of a given unsigned integer.',
      hint2: 'Iterate 32 times: shift result left by 1, bitwise OR with (n & 1), then right shift n by 1.',
      hint3: `// result = 0
// For i from 0 to 31:
//   result = (result << 1) | (n & 1)
//   n >>>= 1  (unsigned right shift)
// Return result`,
      hint4: {
        javaSolution: `public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }
}`,
        timeComplexity: 'O(1) - Exactly 32 bitwise operations',
        spaceComplexity: 'O(1) - Constant integer accumulator',
        explanation: 'Extracting lowest bits and appending to result shifted left reverses bit sequence in constant steps.'
      }
    }
  },
  {
    id: '137',
    lcNumber: 137,
    title: 'Single Number II',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Medium',
    pattern: 'Bitwise Modulo 3 Accumulator',
    tag: 'Good',
    companyTags: ['Amazon', 'Flipkart'],
    link: 'https://leetcode.com/problems/single-number-ii/',
    hints: {
      hint1: 'Every element appears 3 times except one element that appears exactly once.',
      hint2: 'Sum bits at each position 0 to 31 across all numbers. Bits belonging to triplets will be multiples of 3.',
      hint3: `// ans = 0
// For bit from 0 to 31:
//   sum = 0
//   for num in nums: sum += (num >> bit) & 1
//   if sum % 3 != 0: ans |= (1 << bit)
// return ans`,
      hint4: {
        javaSolution: `class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int bit = 0; bit < 32; bit++) {
            int count = 0;
            for (int num : nums) {
                count += (num >> bit) & 1;
            }
            if (count % 3 != 0) {
                result |= (1 << bit);
            }
        }
        return result;
    }
}`,
        timeComplexity: 'O(32 * n) = O(n) - 32 passes over array',
        spaceComplexity: 'O(1) - Constant variables',
        explanation: 'Bit counts modulo 3 cancel out numbers occurring three times, isolating the single element bits.'
      }
    }
  },
  {
    id: '231',
    lcNumber: 231,
    title: 'Power of Two',
    topicId: 'trie-bit-manipulation',
    difficulty: 'Easy',
    pattern: 'Bitwise Brian Kernighan Elimination',
    tag: 'Must',
    companyTags: ['Amazon', 'Microsoft', 'TCS', 'Infosys'],
    link: 'https://leetcode.com/problems/power-of-two/',
    hints: {
      hint1: 'Powers of two have exactly one bit set in their binary representation.',
      hint2: 'Brian Kernighans bit operation n & (n - 1) turns off the lowest set bit. A power of two leaves zero.',
      hint3: `// return n > 0 && (n & (n - 1)) == 0`,
      hint4: {
        javaSolution: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
        timeComplexity: 'O(1) - Single bitwise operation',
        spaceComplexity: 'O(1) - In-place comparison',
        explanation: 'Subtracting 1 flips all bits after the lowest 1 bit; bitwise AND clears it completely.'
      }
    }
  }
];

// Append NEW_PROBLEMS into src/data/problems.js
let content = fs.readFileSync(problemsFilePath, 'utf8');

// Find export const PROBLEMS = [ ... ];
const exportIndex = content.lastIndexOf('export const PROBLEM_MAP');
if (exportIndex === -1) {
  console.error('Could not find export const PROBLEM_MAP');
  process.exit(1);
}

// Slice before export const PROBLEM_MAP and insert new problems
const beforeExport = content.slice(0, exportIndex).trim();
// Find the last closing bracket before export
const lastBracket = beforeExport.lastIndexOf('];');
if (lastBracket === -1) {
  console.error('Could not find closing bracket ];');
  process.exit(1);
}

const beforeArrayEnd = beforeExport.slice(0, lastBracket).trim();
const afterArrayEnd = content.slice(exportIndex);

// Convert NEW_PROBLEMS to string entries
const newProblemsStr = NEW_PROBLEMS.map((p) => {
  return `  {\n    id: '${p.id}',\n    lcNumber: ${p.lcNumber},\n    title: ${JSON.stringify(p.title)},\n    topicId: '${p.topicId}',\n    difficulty: '${p.difficulty}',\n    pattern: ${JSON.stringify(p.pattern)},\n    tag: '${p.tag}',\n    companyTags: ${JSON.stringify(p.companyTags)},\n    link: '${p.link}',\n    hints: {\n      hint1: ${JSON.stringify(p.hints.hint1)},\n      hint2: ${JSON.stringify(p.hints.hint2)},\n      hint3: ${JSON.stringify(p.hints.hint3)},\n      hint4: {\n        javaSolution: ${JSON.stringify(p.hints.hint4.javaSolution)},\n        timeComplexity: ${JSON.stringify(p.hints.hint4.timeComplexity)},\n        spaceComplexity: ${JSON.stringify(p.hints.hint4.spaceComplexity)},\n        explanation: ${JSON.stringify(p.hints.hint4.explanation)}\n      }\n    }\n  }`;
}).join(',\n');

const updatedContent = `${beforeArrayEnd},\n${newProblemsStr}\n];\n\n${afterArrayEnd}`;
fs.writeFileSync(problemsFilePath, updatedContent, 'utf8');
console.log(`Successfully added ${NEW_PROBLEMS.length} curated problems!`);
