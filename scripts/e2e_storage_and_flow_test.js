import assert from 'assert';

// Polyfill localStorage and window for Node environment simulation
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
global.window = {
  dispatchEvent: () => {},
  matchMedia: () => ({ matches: false })
};
global.document = {
  documentElement: {
    classList: {
      add: () => {},
      remove: () => {}
    }
  }
};

import { storageService } from '../src/services/storageService.js';
import { generateStudyPlan } from '../src/utils/plannerScheduler.js';
import { matchPatternsFromClues } from '../src/utils/patternMatcher.js';
import { PROBLEMS, PROBLEM_MAP } from '../src/data/problems.js';
import { TOPICS } from '../src/data/topics.js';

console.log('==============================================');
console.log('🧪 RUNNING FULL E2E USER FLOW SIMULATION');
console.log('==============================================');

// Test 1: Problem Bank & Topics Integrity
console.log('\n[1] Verifying Data Bank & Topics...');
assert.strictEqual(TOPICS.length, 14, 'Must have exactly 14 topics in order');
assert.strictEqual(TOPICS[0].id, 'sliding-window', 'First topic must be Sliding Window');
assert.strictEqual(TOPICS[13].id, 'trie-bit-manipulation', 'Last topic must be Trie + Bit Manipulation');

const mustProblems = PROBLEMS.filter(p => p.tag === 'Must');
console.log(`✓ Total problems: ${PROBLEMS.length}`);
console.log(`✓ Must problems: ${mustProblems.length}`);

// Verify every Must problem has all 4 hints and a Java solution
for (const p of mustProblems) {
  assert(p.hints.hint1, `Problem #${p.lcNumber} missing hint 1`);
  assert(p.hints.hint2, `Problem #${p.lcNumber} missing hint 2`);
  assert(p.hints.hint3, `Problem #${p.lcNumber} missing hint 3`);
  assert(p.hints.hint4?.javaSolution, `Problem #${p.lcNumber} missing hint 4 Java code`);
  assert(p.hints.hint4?.timeComplexity, `Problem #${p.lcNumber} missing hint 4 time complexity`);
  assert(p.hints.hint4?.spaceComplexity, `Problem #${p.lcNumber} missing hint 4 space complexity`);
}
console.log('✓ All Must problems contain full 4-stage hints and complete Java solutions!');

// Test 2: User solves a problem without struggle
console.log('\n[2] Flow: Solving Problem #643 (Easy Sliding Window)...');
storageService.markProblemStatus('643', 'solved');
const prog643 = storageService.getProblemProgress('643');
assert.strictEqual(prog643.status, 'solved');
assert(prog643.solvedAt !== null);
console.log('✓ Problem #643 recorded as solved.');

// Test 3: User marks a problem as Struggled (Needed Hints)
console.log('\n[3] Flow: Marking Problem #3 (Medium Longest Substring) as Struggled...');
storageService.setHintsRevealed('3', 4);
storageService.markProblemStatus('3', 'struggled', 'wrong_pattern');
const prog3 = storageService.getProblemProgress('3');
assert.strictEqual(prog3.status, 'struggled');
assert.strictEqual(prog3.struggleReason, 'wrong_pattern');
assert.strictEqual(prog3.revision.stage, 1, 'Stage 1 (+1 day) must be scheduled');
assert(prog3.revision.dueDate !== null, 'Due date must be set');
console.log(`✓ Problem #3 scheduled for revision at ${prog3.revision.dueDate} with reason: ${prog3.struggleReason}`);

// Test 4: Spaced Revision Queue & Advancing
console.log('\n[4] Flow: Spaced Revision Queue Inspection & Progression...');
const queue = storageService.getAllRevisionQueue();
assert(queue.some(q => q.problemId === '3'), 'Problem #3 must be in the revision queue');

// Pass revision -> Should move to stage 2 (+7 days)
console.log('Simulating revision PASS...');
storageService.resolveRevision('3', true);
const prog3Stage2 = storageService.getProblemProgress('3');
assert.strictEqual(prog3Stage2.revision.stage, 2, 'Stage must advance to 2 (+7 days)');
console.log(`✓ Advanced to Stage 2 with new due date: ${prog3Stage2.revision.dueDate}`);

// Fail revision -> Should reset back to stage 1 (+1 day)
console.log('Simulating revision FAIL (Reset)...');
storageService.resolveRevision('3', false);
const prog3Reset = storageService.getProblemProgress('3');
assert.strictEqual(prog3Reset.revision.stage, 1, 'Stage must reset back to 1');
console.log(`✓ Reset back to Stage 1 with new due date: ${prog3Reset.revision.dueDate}`);

// Test 5: Personal Notebook Note
console.log('\n[5] Flow: Saving Problem -> Pattern -> Trick note...');
const testNote = 'Longest Substring Without Repeating -> Variable Window -> Store lastSeen index in Map to jump left pointer';
storageService.saveProblemNote('3', testNote);
const retrievedNote = storageService.getProblemNote('3');
assert.strictEqual(retrievedNote, testNote);
console.log('✓ User note saved and retrieved successfully.');

// Test 6: Study Planner Generation with Tight Dec 31 Deadline
console.log('\n[6] Flow: Generating Study Plan with Dec 31 Deadline...');
const planDec31 = generateStudyPlan({
  startDateStr: '2026-12-15',
  deadlineDateStr: '2026-12-31',
  hoursPerDay: 4,
  daysPerWeek: 6,
  target: 'both',
  completedTopicIds: []
});

assert(planDec31.warning !== null, 'Must show schedule compression warning');
assert(planDec31.cutTopics.length > 0, 'Must cut lowest-priority topics');
assert(!planDec31.cutTopics.includes('trees'), 'Trees must be preserved');
assert(!planDec31.cutTopics.includes('dynamic-programming'), 'DP must be preserved');
console.log(`✓ Plan generated with ${planDec31.schedule.length} weeks.`);
console.log(`✓ Cut topics: ${planDec31.cutTopics.join(', ')}`);
console.log(`✓ Compression warning: ${planDec31.warning}`);

// Save and toggle completion
storageService.saveStudyPlan(planDec31);
const firstDayDate = planDec31.schedule[0].days[0].date;
storageService.togglePlanDayCompletion(firstDayDate);
const updatedPlan = storageService.getStudyPlan();
assert.strictEqual(updatedPlan.schedule[0].days[0].isCompleted, true, 'First day must be marked completed');
console.log(`✓ Toggled day completion for date ${firstDayDate}.`);

// Test 7: Clue Chips Pattern Inference
console.log('\n[7] Flow: Testing Clue Chip Pattern Suggestions...');
const testClues = ['contiguous', 'shortest'];
const matched = matchPatternsFromClues(testClues);
assert(matched.length > 0);
assert.strictEqual(matched[0].patternName, 'Sliding Window');
console.log(`✓ Clues ['contiguous', 'shortest'] correctly suggested: ${matched[0].patternName}`);

// Test 8: Export and Import Data
console.log('\n[8] Flow: JSON Export & Import Verification...');
const exportJson = storageService.exportUserData();
assert(exportJson.includes('Longest Substring Without Repeating'));
assert(exportJson.includes('wrong_pattern'));

// Clear storage and import
localStorage.clear();
assert.strictEqual(Object.keys(storageService.getAllProgress()).length, 0);

const importResult = storageService.importUserData(exportJson);
assert.strictEqual(importResult.success, true);
assert.strictEqual(storageService.getProblemNote('3'), testNote);
assert.strictEqual(storageService.getProblemProgress('3').status, 'struggled');
console.log('✓ Export and Import roundtrip verified without data loss!');

console.log('\n==============================================');
console.log('🎉 ALL USER FLOW TESTS PASSED COMPLETELY!');
console.log('==============================================');
