/**
 * Socratic AI Mentor Service with Zero-Credit In-Memory & Storage Caching
 * Protects user API limits while providing instant responses.
 */

export const SUGGESTED_QUESTIONS = [
  {
    id: 'explain_simpler',
    label: 'Explain Intuition',
    query: 'Can you explain the core intuition more simply in plain English?',
    category: 'intuition'
  },
  {
    id: 'use_hashmap',
    label: 'Hash Table Feasibility',
    query: 'Can we use a HashMap or Hash Table to solve this? Why or why not?',
    category: 'pattern'
  },
  {
    id: 'complexity',
    label: 'Target Complexity',
    query: 'What is the optimal Time and Space complexity I should aim for?',
    category: 'complexity'
  },
  {
    id: 'edge_cases',
    label: 'Corner & Edge Cases',
    query: 'What tricky edge cases should I consider before writing code?',
    category: 'edge_cases'
  },
  {
    id: 'code_hint',
    label: 'Pseudocode Skeleton',
    query: 'Can you show a 3-4 line pseudocode hint for the main loop structure?',
    category: 'code'
  },
  {
    id: 'two_pointers_sliding',
    label: 'Two Pointers / Window',
    query: 'Can this problem be optimized using Two Pointers or Sliding Window?',
    category: 'pattern'
  },
  {
    id: 'dry_run',
    label: 'Trace Walkthrough',
    query: 'Can you walk through a small dry-run example step-by-step?',
    category: 'intuition'
  }
];

const STORAGE_CACHE_KEY = 'dsa_hub_ai_chat_cache_v1';

// In-memory hot cache for instant zero-latency lookups
let inMemoryHotCache = null;

function getLocalCache() {
  if (inMemoryHotCache !== null) {
    return inMemoryHotCache;
  }
  try {
    const raw = localStorage.getItem(STORAGE_CACHE_KEY);
    inMemoryHotCache = raw ? JSON.parse(raw) : {};
    return inMemoryHotCache;
  } catch (e) {
    inMemoryHotCache = {};
    return inMemoryHotCache;
  }
}

function saveToLocalCache(key, entry) {
  try {
    const cache = getLocalCache();
    cache[key] = {
      ...entry,
      cachedAt: Date.now()
    };
    // Keep max 300 entries to prevent localStorage bloat
    const keys = Object.keys(cache);
    if (keys.length > 300) {
      delete cache[keys[0]];
    }
    inMemoryHotCache = cache;
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to save to AI local cache:', e);
  }
}

/**
 * Generate zero-cost instant response from curated problem metadata
 */
export function getZeroCreditResponse(problem, query) {
  if (!problem) return null;
  const q = (query || '').toLowerCase();
  const title = problem.title;
  const pattern = problem.pattern || 'Algorithmic Pattern';
  const hints = problem.hints || {};

  // 1. Explain simpler
  if (q.includes('simpler') || q.includes('plain english') || q.includes('concept') || q.includes('intuition')) {
    return {
      reply: `### Core Intuition
For **${title}**, think of it this way:

${hints.hint2 || hints.hint1 || 'Focus on breaking down the problem into sub-problems.'}

The high-level pattern to apply is **${pattern}**. Instead of brute-forcing all possibilities, we observe that the solution satisfies a monotonic or structured property.

### Next Step
*What is the simplest input you can test to verify this behavior by hand?*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  // 2. HashMap feasibility
  if (q.includes('hashmap') || q.includes('hash table') || q.includes('frequency map')) {
    const usesHash = pattern.toLowerCase().includes('hash') ||
                     (hints.hint1 && hints.hint1.toLowerCase().includes('hash')) ||
                     (hints.hint2 && hints.hint2.toLowerCase().includes('hash'));

    if (usesHash) {
      return {
        reply: `### Hash Table Feasibility
A Hash Map is the optimal data structure for **${title}**.

- **Why it works**: It allows you to store elements or prefix sums as keys and their indices/frequencies as values, giving you **O(1) average lookup** time.
- **Key Invariant**: ${hints.hint2 || 'Store previous items so you can query complements in O(1).'}

### Next Step
*What should the Map keys represent (values, frequencies, or prefix sums), and what should the values store?*`,
        source: 'Cached (Zero API Cost)',
        isZeroCredit: true
      };
    } else {
      return {
        reply: `### Hash Table Feasibility & Trade-Offs
While you could store elements in a HashMap for **${title}**, the optimal approach is **${pattern}**.

- **Trade-off**: A Hash Map incurs extra $O(N)$ space overhead and hashing overhead.
- **Better approach**: ${hints.hint1 || 'A two-pointer or sliding window pass is more space-efficient.'}

### Next Step
*Can we take advantage of order or two converging pointers to avoid the $O(N)$ space overhead of a HashMap?*`,
        source: 'Cached (Zero API Cost)',
        isZeroCredit: true
      };
    }
  }

  // 3. Time & Space Complexity
  if (q.includes('complexity') || q.includes('time complexity') || q.includes('space complexity')) {
    const time = hints.hint4?.timeComplexity || 'O(n)';
    const space = hints.hint4?.spaceComplexity || 'O(1)';
    return {
      reply: `### Target Complexity Target
For **${title}**, top technical interview assessments expect:

- **Time Complexity:** \`${time}\`
- **Space Complexity:** \`${space}\`

### Efficiency Requirement
Any solution with higher complexity (e.g. $O(N^2)$ when $O(N)$ is expected) will hit **Time Limit Exceeded (TLE)** on typical input constraints.

### Next Step
*How many passes over the data does your current logic require to achieve this bound?*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  // 4. Edge cases
  if (q.includes('edge case') || q.includes('edge cases') || q.includes('corner case')) {
    let edgeCases = [
      'Empty or single-element inputs (`nums.length <= 1` or empty string `""`)',
      'Inputs containing duplicate values or all identical elements',
      'Negative numbers or zeros (if checking sums or products)'
    ];

    if (pattern.toLowerCase().includes('window') || pattern.toLowerCase().includes('pointer')) {
      edgeCases.push('Window size `k` larger than the array length');
      edgeCases.push('Strings with no matching characters or all matching characters');
    } else if (pattern.toLowerCase().includes('binary search')) {
      edgeCases.push('Target not present in array (returns -1 or insertion point)');
      edgeCases.push('Array where all elements are greater than or smaller than target');
    } else if (pattern.toLowerCase().includes('linked list')) {
      edgeCases.push('Null head or single-node list (`head.next == null`)');
      edgeCases.push('Even vs. odd length list parity');
    }

    return {
      reply: `### Critical Edge Cases for ${title}
Make sure your algorithm handles these boundary conditions cleanly:

1. **${edgeCases[0]}**
2. **${edgeCases[1]}**
3. **${edgeCases[2]}**
${edgeCases[3] ? `4. **${edgeCases[3]}**` : ''}

### Next Step
*Does your loop initialization or pointer condition terminate safely on these boundaries without throwing an exception or looping infinitely?*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  // 5. Code hint (pseudocode)
  if (q.includes('code hint') || q.includes('3-line') || q.includes('pseudocode') || q.includes('loop')) {
    return {
      reply: `### Key Loop Structure & Pseudocode
Here is the core logic skeleton for **${title}**:

\`\`\`
${hints.hint3 || '// 1. Initialize pointers/state\n// 2. Loop while condition holds\n// 3. Update answer dynamically'}
\`\`\`

### Strategy Invariant
${hints.hint2 || 'Maintain invariant state as you iterate.'}

### Next Step
*Can you translate this skeleton into your preferred language (Python/Java/C++/JS)?*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  // 6. Two Pointers / Sliding Window check
  if (q.includes('two pointers') || q.includes('sliding window')) {
    const isPointersOrWindow = pattern.toLowerCase().includes('pointer') || pattern.toLowerCase().includes('window');
    return {
      reply: `### Two Pointers & Sliding Window Analysis
For **${title}**:
${isPointersOrWindow
  ? `**Yes.** The optimal strategy is **${pattern}**. By expanding a right pointer and contracting a left pointer, you inspect every element at most twice, achieving $O(N)$ runtime.`
  : `**Not directly applicable.** This problem relies on **${pattern}**. Two pointers or sliding window typically require a sorted structure or contiguous contiguous constraint.`}

### Next Step
*${isPointersOrWindow ? 'What exact condition tells you when to advance the left pointer?' : 'What other data structure preserves the required state?'}*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  // 7. Dry run
  if (q.includes('dry run') || q.includes('example')) {
    return {
      reply: `### Step-by-Step Trace Walkthrough
To trace **${title}**:
1. Take a minimal input of size 3 or 4.
2. Initialize your state: ${hints.hint1 || 'pointers or counter'}.
3. Step through each iteration and verify how the candidate answer updates:
   - **Step 1:** ${hints.hint2 || 'Compute first state'}
   - **Step 2:** Slide/advance to next element
   - **Step 3:** Check if valid and update answer

### Next Step
*What is the output of your logic on a 2-element test case?*`,
      source: 'Cached (Zero API Cost)',
      isZeroCredit: true
    };
  }

  return null;
}

/**
 * Main mentor query dispatcher with multi-tier in-memory and persistent caching
 */
export async function askSocraticMentor({
  problem,
  userMessage,
  userCode,
  messages = [],
  targetStage = 1
}) {
  const normQuery = (userMessage || '').trim();
  const cacheKey = `${problem.id}__stage_${targetStage}__${normQuery.toLowerCase()}__${(userCode || '').slice(0, 80)}`;

  // Tier 1: Check in-memory and localStorage cache (0 credits, instant 0ms response)
  const localCache = getLocalCache();
  if (localCache[cacheKey]) {
    return {
      reply: localCache[cacheKey].reply,
      stage: targetStage,
      source: 'Cached (Zero API Cost)',
      isCached: true
    };
  }

  // Tier 2: Check zero-credit instant knowledge for standard questions
  const zeroCreditResp = getZeroCreditResponse(problem, normQuery);
  if (zeroCreditResp) {
    saveToLocalCache(cacheKey, {
      reply: zeroCreditResp.reply,
      stage: targetStage,
      source: zeroCreditResp.source
    });
    return {
      reply: zeroCreditResp.reply,
      stage: targetStage,
      source: zeroCreditResp.source,
      isZeroCredit: true
    };
  }

  // Tier 3: Call live AI Socratic API (hits server LRU cache first)
  try {
    const res = await fetch('/api/chat/socratic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemTitle: problem.title,
        problemDescription: problem.descriptionSnippet || problem.hints?.hint1 || '',
        userCode: userCode || undefined,
        targetStage,
        messages,
        userMessage: normQuery
      })
    });

    const data = await res.json();
    if (res.ok && data.reply) {
      saveToLocalCache(cacheKey, {
        reply: data.reply,
        stage: targetStage,
        source: data.source || 'AI Mentor'
      });
      return {
        reply: data.reply,
        stage: targetStage,
        source: data.source || 'Socratic Mentor'
      };
    } else {
      const fallback = `### Socratic Guidance for ${problem.title}\n\n${problem.hints?.hint2 || problem.hints?.hint1 || 'Focus on the core pattern.'}\n\n*Pattern:* **${problem.pattern}**\n\n### Approach Structure\n\`\`\`\n${problem.hints?.hint3 || '// Pseudocode'}\n\`\`\``;
      return {
        reply: fallback,
        stage: targetStage,
        source: 'Cached (Zero API Cost)'
      };
    }
  } catch (e) {
    console.warn('Live AI Socratic call failed, using offline fallback:', e);
    const fallback = `### Socratic Guidance for ${problem.title}\n\n${problem.hints?.hint2 || problem.hints?.hint1 || 'Focus on the core pattern.'}\n\n*Pattern:* **${problem.pattern}**\n\n### Core Invariant\n\`\`\`\n${problem.hints?.hint3 || '// Loop structure'}\n\`\`\``;
    return {
      reply: fallback,
      stage: targetStage,
      source: 'Cached (Zero API Cost)'
    };
  }
}
