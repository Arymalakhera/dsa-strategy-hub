/**
 * Pattern Matcher Pure Function
 * Evaluates active clue chips against curated pattern rules and returns up to 3 suggested patterns with justification.
 */

import { PATTERN_RULES } from '../data/patternHelperRules.js';
import { PROBLEMS } from '../data/problems.js';

/**
 * Matches candidate algorithmic patterns based on selected clues.
 *
 * @param {string[]} selectedClueIds - Array of selected clue chip IDs
 * @returns {Array} Array of up to 3 matched patterns with reason and linked problems
 */
export function matchPatternsFromClues(selectedClueIds) {
  if (!selectedClueIds || selectedClueIds.length === 0) {
    return [];
  }

  const matches = [];

  for (const rule of PATTERN_RULES) {
    if (rule.condition(selectedClueIds)) {
      // Find full problem objects for linked sample problems
      const relatedProblems = rule.sampleProblemIds
        .map((pId) => PROBLEMS.find((p) => p.id === pId))
        .filter(Boolean);

      matches.push({
        id: rule.id,
        patternName: rule.patternName,
        topicId: rule.topicId,
        score: rule.score,
        reason: rule.reason,
        relatedProblems
      });
    }
  }

  // Sort by score descending and take up to 3
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 3);
}
