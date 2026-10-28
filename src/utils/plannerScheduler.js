/**
 * Planner Scheduler Logic
 * Pure function that generates an adaptive week-by-week study schedule.
 * Unit-testable without external DOM or storage dependencies.
 */

import { TOPICS } from '../data/topics.js';
import { PROBLEMS } from '../data/problems.js';

/**
 * Base days assigned to topics in a relaxed schedule (Total ~68 study days)
 */
export const BASE_TOPIC_WEIGHTS = {
  'sliding-window': 3,
  'hashing-prefix-sum': 3,
  'strings': 2,
  'binary-search': 5,
  'stack-queue': 4,
  'sorting-intervals': 2,
  'linked-list': 5,
  'recursion-backtracking': 6,
  'trees': 10,
  'heap': 3,
  'greedy': 3,
  'graphs': 10,
  'dynamic-programming': 15,
  'trie-bit-manipulation': 2
};

/**
 * Priority order for cutting topics when study time is compressed.
 * Lower priority topics are cut first. Trees and DP are preserved until last.
 */
export const TOPIC_CUT_PRIORITY = [
  'trie-bit-manipulation', // Cut 1st
  'greedy',                // Cut 2nd
  'sorting-intervals',     // Cut 3rd
  'heap',                  // Cut 4th
  'graphs',                // Cut 5th (can reduce or cut advanced)
  'recursion-backtracking',// Cut 6th
  'linked-list',           // Cut 7th
  'stack-queue',           // Cut 8th
  'binary-search',         // Cut 9th
  'strings',               // Cut 10th
  'sliding-window',        // Cut 11th
  'hashing-prefix-sum',    // Cut 12th
  'trees',                 // Preserved
  'dynamic-programming'    // Preserved
];

/**
 * Generates an adaptive week-by-week study plan
 *
 * @param {Object} params
 * @param {string} params.startDateStr - 'YYYY-MM-DD'
 * @param {string} params.deadlineDateStr - 'YYYY-MM-DD'
 * @param {number} params.hoursPerDay - e.g. 2, 4, 6
 * @param {number} params.daysPerWeek - e.g. 5, 6, 7
 * @param {('service'|'product'|'both')} params.target
 * @param {string[]} params.completedTopicIds - List of topic IDs user already completed
 * @returns {Object} { schedule, warning, cutTopics, totalDays, studyDays, restDays }
 */
export function generateStudyPlan({
  startDateStr,
  deadlineDateStr,
  hoursPerDay = 3,
  daysPerWeek = 6,
  target = 'both',
  completedTopicIds = []
}) {
  const start = new Date(startDateStr);
  const deadline = new Date(deadlineDateStr);

  // Calculate total calendar days available
  const diffTime = deadline.getTime() - start.getTime();
  const totalCalendarDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

  // Group problems by topic for assignment
  const mustProblemsByTopic = {};
  for (const topic of TOPICS) {
    mustProblemsByTopic[topic.id] = PROBLEMS.filter(
      (p) => p.topicId === topic.id && p.tag === 'Must'
    );
  }

  // Filter topics not yet completed
  let activeTopics = TOPICS.filter((t) => !completedTopicIds.includes(t.id));

  // If target is 'service', prioritize Tier 1 and cut non-service topics (e.g. Trie/Bit)
  if (target === 'service') {
    activeTopics = activeTopics.filter((t) => t.importance !== 'Tier 3');
  }

  // Calculate available study days (excluding 1 rest/buffer day per week if daysPerWeek < 7)
  const totalWeeks = Math.ceil(totalCalendarDays / 7);
  let availableStudySlots = 0;

  // Track calendar days
  const calendarDates = [];
  for (let i = 0; i < totalCalendarDays; i++) {
    const curDate = new Date(start);
    curDate.setDate(curDate.getDate() + i);
    const dayOfWeek = curDate.getDay(); // 0 is Sunday, 6 is Saturday
    calendarDates.push({
      dateStr: curDate.toISOString().split('T')[0],
      dayOfWeekName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek],
      dayIndex: i,
      dayOfWeek
    });
  }

  // Reserve final days for Revision & Mock Interviews
  // For plans > 21 days: reserve 3 days; for > 14 days: reserve 2 days; else 1 day
  const reservedMockDays = totalCalendarDays >= 28 ? 4 : totalCalendarDays >= 14 ? 2 : 1;
  const rawUsableDays = Math.max(1, totalCalendarDays - reservedMockDays);

  // Effective study days considering daysPerWeek
  const effectiveStudyDays = Math.floor(rawUsableDays * (daysPerWeek / 7));

  // Calculate ideal total base days for active topics
  let currentWeights = {};
  for (const t of activeTopics) {
    currentWeights[t.id] = BASE_TOPIC_WEIGHTS[t.id] || 3;
    // If service target, reduce heavy topics like Graphs and DP weight
    if (target === 'service') {
      if (t.id === 'dynamic-programming') currentWeights[t.id] = 5;
      if (t.id === 'graphs') currentWeights[t.id] = 4;
    }
  }

  let totalWeight = Object.values(currentWeights).reduce((a, b) => a + b, 0);

  // If time is very short, cut lowest-priority topics iteratively
  const cutTopics = [];
  let warning = null;

  if (effectiveStudyDays < totalWeight * 0.4 && activeTopics.length > 3) {
    // We must prune topics
    for (const cutCandidateId of TOPIC_CUT_PRIORITY) {
      if (currentWeights[cutCandidateId] && activeTopics.length > 3) {
        cutTopics.push(cutCandidateId);
        delete currentWeights[cutCandidateId];
        activeTopics = activeTopics.filter((t) => t.id !== cutCandidateId);
        totalWeight = Object.values(currentWeights).reduce((a, b) => a + b, 0);

        if (effectiveStudyDays >= totalWeight * 0.45) {
          break;
        }
      }
    }
  }

  if (effectiveStudyDays < 14 && activeTopics.length > 5) {
    warning = `Tight Deadline Warning: Only ${totalCalendarDays} days available. Focus strictly on Must problems in core Tier 1 topics. ${cutTopics.length > 0 ? `Cut ${cutTopics.length} low-yield topics.` : ''}`;
  } else if (cutTopics.length > 0) {
    const cutNames = cutTopics.map((id) => TOPICS.find((t) => t.id === id)?.name || id).join(', ');
    warning = `Notice: To fit your target deadline of ${deadlineDateStr}, we cut or deferred lower-yield topics (${cutNames}) to ensure deep coverage of Trees and DP.`;
  }

  // Allocate actual study days per topic in proportion to weights
  const allocatedDays = {};
  let daysAllocatedSum = 0;

  for (const t of activeTopics) {
    const weight = currentWeights[t.id];
    // Proportional scaling
    const days = Math.max(1, Math.round((weight / (totalWeight || 1)) * effectiveStudyDays));
    allocatedDays[t.id] = days;
    daysAllocatedSum += days;
  }

  // Distribute into calendar days
  // 1 study topic queue
  const dayAssignmentQueue = [];
  for (const t of activeTopics) {
    const topicDays = allocatedDays[t.id] || 1;
    const topicMustProblems = mustProblemsByTopic[t.id] || [];

    for (let d = 0; d < topicDays; d++) {
      // Pick subset of problems for this day
      const problemsPerDay = Math.ceil(topicMustProblems.length / topicDays);
      const startP = d * problemsPerDay;
      const dayProbs = topicMustProblems.slice(startP, startP + problemsPerDay);

      dayAssignmentQueue.push({
        topicId: t.id,
        topicName: t.name,
        mustProblems: dayProbs,
        dayNumInTopic: d + 1,
        totalDaysInTopic: topicDays
      });
    }
  }

  // Build weekly schedule grid
  const schedule = [];
  let queueIndex = 0;
  let currentWeek = { weekNumber: 1, days: [] };

  for (let i = 0; i < calendarDates.length; i++) {
    const cDay = calendarDates[i];
    const isEndMockBlock = i >= calendarDates.length - reservedMockDays;
    const isWeeklyRevisionDay = (i + 1) % 7 === 0;

    let dayData = {
      date: cDay.dateStr,
      dayOfWeek: cDay.dayOfWeekName,
      type: 'study',
      topicId: null,
      topicName: '',
      mustProblems: [],
      isCompleted: false,
      notes: ''
    };

    if (isEndMockBlock) {
      dayData.type = 'mock';
      dayData.topicName = 'Grand Revision & Timed Mock OA';
      dayData.notes = 'Solve 2 problems under 40-min timer and revise Struggled notebook.';
    } else if (isWeeklyRevisionDay) {
      dayData.type = 'revision';
      dayData.topicName = 'Weekly Spaced Revision';
      dayData.notes = 'Review this week\'s difficult problems and clear overdue revision queue.';
    } else if (queueIndex < dayAssignmentQueue.length) {
      const assignment = dayAssignmentQueue[queueIndex++];
      dayData.type = 'study';
      dayData.topicId = assignment.topicId;
      dayData.topicName = `${assignment.topicName} (Day ${assignment.dayNumInTopic}/${assignment.totalDaysInTopic})`;
      dayData.mustProblems = assignment.mustProblems;
    } else {
      // Queue exhausted: extra practice / revision
      dayData.type = 'revision';
      dayData.topicName = 'Problem Buffer & Consolidation';
      dayData.notes = 'Deep dive into Good / Bonus problems or re-solve previous tricky questions.';
    }

    currentWeek.days.push(dayData);

    if (currentWeek.days.length === 7 || i === calendarDates.length - 1) {
      schedule.push(currentWeek);
      currentWeek = { weekNumber: schedule.length + 1, days: [] };
    }
  }

  return {
    startDate: startDateStr,
    deadlineDate: deadlineDateStr,
    hoursPerDay,
    daysPerWeek,
    target,
    completedTopics: completedTopicIds,
    totalCalendarDays,
    effectiveStudyDays,
    schedule,
    warning,
    cutTopics
  };
}
