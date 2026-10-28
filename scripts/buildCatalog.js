/**
 * Build Catalog Script
 * Merges original unique problems with batches 1-4 and supplement,
 * applies priority balancing and Easy->Medium->Hard pattern sorting,
 * and writes to src/data/problems.js and src/data/problems.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROBLEMS as ORIGINAL_PROBLEMS } from '../src/data/problems.js';
import { TOPICS } from '../src/data/topics.js';
import { BATCH_1_PROBLEMS } from './batch1_data.js';
import { BATCH_2_PROBLEMS } from './batch2_data.js';
import { BATCH_3_PROBLEMS } from './batch3_data.js';
import { BATCH_4_PROBLEMS } from './batch4_data.js';
import { SUPPLEMENTAL_PROBLEMS } from './batch_supplement_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/['\(\)]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };

// Priority balancing adjustments to hit ~45% Must, ~35% Good, ~20% Bonus
const MUST_TO_GOOD = new Set([
  41, 485, 992, 383, 706, 523, 13, 28, 69, 4,
  1047, 853, 85, 252, 179, 148, 92, 25, 50, 40,
  199, 297, 692, 455, 135, 463, 269
]);

const GOOD_TO_BONUS = new Set([
  905, 16, 713, 187, 541, 1539, 71, 227, 61, 77,
  106, 378, 130, 417
]);

// 1. Deduplicate original problems by id and normalize fields
const seenIds = new Set();
const dedupedOrig = [];

for (const p of ORIGINAL_PROBLEMS) {
  if (!seenIds.has(p.id)) {
    seenIds.add(p.id);
    const prio = p.priority || p.tag || 'Must';
    const lvl =
      p.level ||
      (p.difficulty === 'Easy'
        ? 'Beginner'
        : p.difficulty === 'Medium'
        ? 'Intermediate'
        : 'Advanced');

    dedupedOrig.push({
      ...p,
      level: lvl,
      priority: prio,
      tag: prio,
      link: `https://leetcode.com/problems/${toSlug(p.title)}/`
    });
  }
}

console.log(`Original unique problems: ${dedupedOrig.length}`);

// 2. Process batch problems with priority adjustments
const allBatches = [
  ...BATCH_1_PROBLEMS,
  ...BATCH_2_PROBLEMS,
  ...BATCH_3_PROBLEMS,
  ...BATCH_4_PROBLEMS,
  ...SUPPLEMENTAL_PROBLEMS
];

const processedBatches = allBatches.map((p) => {
  let prio = p.priority || p.tag || 'Good';
  if (MUST_TO_GOOD.has(p.lcNumber)) {
    prio = 'Good';
  } else if (GOOD_TO_BONUS.has(p.lcNumber)) {
    prio = 'Bonus';
  }
  const lvl =
    p.level ||
    (p.difficulty === 'Easy'
      ? 'Beginner'
      : p.difficulty === 'Medium'
      ? 'Intermediate'
      : 'Advanced');

  return {
    ...p,
    level: lvl,
    priority: prio,
    tag: prio,
    link: `https://leetcode.com/problems/${toSlug(p.title)}/`
  };
});

console.log(`New batch problems: ${processedBatches.length}`);

// 3. Combine
const combined = [...dedupedOrig, ...processedBatches];
console.log(`Total combined problems: ${combined.length}`);

// 4. Group by topic (in order of TOPICS), then by pattern, and sort each pattern group Easy -> Medium -> Hard
const topicOrderMap = new Map();
TOPICS.forEach((t, i) => topicOrderMap.set(t.id, i));

// Sort combined list:
// Primary: Topic order as defined in TOPICS
// Secondary: Pattern name
// Tertiary: Difficulty (Easy=1, Medium=2, Hard=3)
// Quaternary: lcNumber
combined.sort((a, b) => {
  const topicRankA = topicOrderMap.has(a.topicId) ? topicOrderMap.get(a.topicId) : 999;
  const topicRankB = topicOrderMap.has(b.topicId) ? topicOrderMap.get(b.topicId) : 999;
  if (topicRankA !== topicRankB) return topicRankA - topicRankB;

  if (a.pattern !== b.pattern) {
    return a.pattern.localeCompare(b.pattern);
  }

  const diffA = diffOrder[a.difficulty] || 2;
  const diffB = diffOrder[b.difficulty] || 2;
  if (diffA !== diffB) return diffA - diffB;

  return a.lcNumber - b.lcNumber;
});

// 5. Generate src/data/problems.js content
const problemsJsPath = path.join(__dirname, '../src/data/problems.js');
const problemsJsonPath = path.join(__dirname, '../src/data/problems.json');

const jsContent = `/**
 * Curated Problem Bank for DSA Strategy Hub
 * Placement & Off-Campus Hiring (India, Java-Focused)
 * Total Problems: ${combined.length}
 */

export const PROBLEMS = ${JSON.stringify(combined, null, 2)};

export const PROBLEM_MAP = Object.fromEntries(PROBLEMS.map((p) => [p.id, p]));
`;

fs.writeFileSync(problemsJsPath, jsContent, 'utf-8');
console.log(`Successfully written: ${problemsJsPath}`);

// 6. Generate src/data/problems.json
fs.writeFileSync(problemsJsonPath, JSON.stringify(combined, null, 2), 'utf-8');
console.log(`Successfully written: ${problemsJsonPath}`);
