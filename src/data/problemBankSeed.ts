import { Problem } from '../types';
import rawProblems from './leetcode-problems.json';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const INITIAL_PROBLEM_BANK: Problem[] = rawProblems as Problem[];

/**
 * Pushes all problems from leetcode-problems.json into Firestore problemBank collection.
 * Uses document ID matching (setDoc with merge: true) to prevent duplicate copies.
 */
export async function seedProblemsToFirestore(): Promise<{ added: number; total: number }> {
  let added = 0;
  for (const problem of INITIAL_PROBLEM_BANK) {
    try {
      const docRef = doc(db, 'problemBank', problem.id);
      await setDoc(docRef, problem, { merge: true });
      added++;
    } catch (err) {
      console.warn(`Failed to seed problem #${problem.id} (${problem.title}):`, err);
    }
  }
  return { added, total: INITIAL_PROBLEM_BANK.length };
}
