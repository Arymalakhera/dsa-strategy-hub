/**
 * Catalog Validator Script for DSA Strategy Hub
 * Run with: node scripts/validateCatalog.js
 */

import { PROBLEMS } from '../src/data/problems.js';
import { TOPICS } from '../src/data/topics.js';

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/['\(\)]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const validTopicIds = new Set(TOPICS.map((t) => t.id));
const validDifficulties = new Set(['Easy', 'Medium', 'Hard']);
const validLevels = new Set(['Beginner', 'Intermediate', 'Advanced']);
const validPriorities = new Set(['Must', 'Good', 'Bonus']);

const errors = [];
const seenIds = new Set();
const seenLcNumbers = new Set();
const topicCounts = {};
const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
const levelCounts = { Beginner: 0, Intermediate: 0, Advanced: 0 };
const priorityCounts = { Must: 0, Good: 0, Bonus: 0 };

TOPICS.forEach((t) => {
  topicCounts[t.id] = 0;
});

PROBLEMS.forEach((p, idx) => {
  const prefix = `Problem #${idx + 1} (${p.title || 'Untitled'}, LC #${p.lcNumber}): `;

  // 1. Unique ID
  if (!p.id || typeof p.id !== 'string') {
    errors.push(prefix + 'Missing or invalid string id');
  } else if (seenIds.has(p.id)) {
    errors.push(prefix + `Duplicate ID '${p.id}'`);
  }
  seenIds.add(p.id);

  // 2. Unique LC Number
  if (!p.lcNumber || typeof p.lcNumber !== 'number' || p.lcNumber <= 0) {
    errors.push(prefix + 'Missing or invalid positive integer lcNumber');
  } else if (seenLcNumbers.has(p.lcNumber)) {
    errors.push(prefix + `Duplicate lcNumber ${p.lcNumber}`);
  }
  seenLcNumbers.add(p.lcNumber);

  // 3. Valid topic
  if (!p.topicId || !validTopicIds.has(p.topicId)) {
    errors.push(prefix + `Invalid topicId '${p.topicId}'. Must be one of: ${[...validTopicIds].join(', ')}`);
  } else {
    topicCounts[p.topicId] = (topicCounts[p.topicId] || 0) + 1;
  }

  // 4. Valid difficulty
  if (!p.difficulty || !validDifficulties.has(p.difficulty)) {
    errors.push(prefix + `Invalid difficulty '${p.difficulty}'. Must be Easy, Medium, or Hard`);
  } else {
    diffCounts[p.difficulty] = (diffCounts[p.difficulty] || 0) + 1;
  }

  // 5. Valid level
  if (!p.level || !validLevels.has(p.level)) {
    errors.push(prefix + `Invalid level '${p.level}'. Must be Beginner, Intermediate, or Advanced`);
  } else {
    levelCounts[p.level] = (levelCounts[p.level] || 0) + 1;
  }

  // 6. Valid priority
  const prio = p.priority || p.tag;
  if (!prio || !validPriorities.has(prio)) {
    errors.push(prefix + `Invalid priority/tag '${prio}'. Must be Must, Good, or Bonus`);
  } else {
    priorityCounts[prio] = (priorityCounts[prio] || 0) + 1;
  }

  // 7. Pattern
  if (!p.pattern || typeof p.pattern !== 'string' || !p.pattern.trim()) {
    errors.push(prefix + 'Missing pattern');
  }

  // 8. Link slug check
  const expectedLink = `https://leetcode.com/problems/${toSlug(p.title)}/`;
  if (!p.link || typeof p.link !== 'string') {
    errors.push(prefix + 'Missing link');
  } else if (p.link !== expectedLink) {
    errors.push(prefix + `Link mismatch. Got '${p.link}', expected '${expectedLink}'`);
  }

  // 9. Hints check for Must problems
  if (prio === 'Must') {
    if (!p.hints) {
      errors.push(prefix + 'Must problem missing hints object');
    } else {
      if (!p.hints.hint1) errors.push(prefix + 'Must problem missing hints.hint1 (pattern name)');
      if (!p.hints.hint2) errors.push(prefix + 'Must problem missing hints.hint2 (key idea)');
      const hasComplexity =
        (p.hints.hint4 && p.hints.hint4.timeComplexity) ||
        (p.hints.complexity && p.hints.complexity.time);
      if (!hasComplexity) {
        errors.push(prefix + 'Must problem missing complexity notes');
      }
    }
  }
});

// Check topic minimums (each topic >= 10 problems)
for (const [tId, count] of Object.entries(topicCounts)) {
  if (count < 10) {
    errors.push(`Topic '${tId}' has only ${count} problems (minimum required: 10)`);
  }
}

console.log('====================================================');
console.log('          DSA CATALOG VALIDATION REPORT             ');
console.log('====================================================');

if (errors.length > 0) {
  console.error(`\n❌ FOUND ${errors.length} VALIDATION ERROR(S):\n`);
  errors.slice(0, 30).forEach((err, i) => console.error(`${i + 1}. ${err}`));
  if (errors.length > 30) {
    console.error(`...and ${errors.length - 30} more errors.`);
  }
} else {
  console.log('\n✅ ALL VALIDATION CHECKS PASSED WITH 0 ERRORS!\n');
}

const total = PROBLEMS.length;
console.log(`Total Problems in Catalog: ${total}\n`);

console.log('--- Breakdown by Topic ---');
console.table(
  TOPICS.map((t) => ({
    Topic: t.name,
    ID: t.id,
    Count: topicCounts[t.id] || 0,
    Status: (topicCounts[t.id] || 0) >= 10 ? '✅ Pass' : '❌ Needs >= 10'
  }))
);

console.log('\n--- Breakdown by Difficulty ---');
console.table(
  Object.entries(diffCounts).map(([diff, count]) => ({
    Difficulty: diff,
    Count: count,
    Percentage: `${((count / total) * 100).toFixed(1)}%`
  }))
);

console.log('\n--- Breakdown by Level ---');
console.table(
  Object.entries(levelCounts).map(([lvl, count]) => ({
    Level: lvl,
    Count: count,
    Percentage: `${((count / total) * 100).toFixed(1)}%`
  }))
);

console.log('\n--- Breakdown by Priority ---');
console.table(
  Object.entries(priorityCounts).map(([prio, count]) => ({
    Priority: prio,
    Count: count,
    Percentage: `${((count / total) * 100).toFixed(1)}%`
  }))
);

// Produce 15 randomly chosen new problems (with lcNumber not in original 125 list)
const originalLcNumbers = new Set([
  643, 3, 209, 567, 438, 424, 1004, 904, 76, 239, 1456, 1423,
  1, 560, 347, 128, 525, 974, 380,
  125, 242, 49, 5, 14, 151, 443, 392, 8,
  704, 33, 34, 153, 875, 1011, 410, 81, 540,
  20, 155, 739, 84, 150, 232, 496,
  56, 57, 435, 452, 75, 253,
  206, 141, 21, 143, 146, 138, 234, 160, 2,
  78, 46, 39, 51, 79, 17, 131, 37,
  94, 104, 102, 236, 98, 543, 124, 105,
  215, 295, 23, 621, 767, 1046,
  55, 121, 134, 763, 846, 53, 860,
  200, 207, 133, 743, 210, 127, 684, 547,
  70, 198, 62, 322, 300, 1143, 72, 416,
  208, 136, 191, 268, 338, 212, 190, 137, 231
]);

const newProblems = PROBLEMS.filter((p) => !originalLcNumbers.has(p.lcNumber));
if (newProblems.length > 0) {
  console.log('\n--- 15 Randomly Selected New Problems for Manual Verification ---');
  // Deterministic seed-based shuffle or sample
  const step = Math.max(1, Math.floor(newProblems.length / 15));
  const sample = [];
  for (let i = 0; i < newProblems.length && sample.length < 15; i += step) {
    sample.push(newProblems[i]);
  }
  console.table(
    sample.map((p) => ({
      LC_Number: p.lcNumber,
      Title: p.title,
      Topic: p.topicId,
      Difficulty: p.difficulty,
      Priority: p.priority || p.tag,
      Pattern: p.pattern
    }))
  );
}

if (errors.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
