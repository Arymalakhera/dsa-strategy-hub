import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Problem } from '../types';
import { INITIAL_PROBLEM_BANK } from '../data/problemBankSeed';

const CACHE_KEY = 'dsa_mentor_pb_v161_full';
const CACHE_TIMESTAMP_KEY = 'dsa_mentor_pb_ts_v161';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchProblemBank(): Promise<Problem[]> {
  if (typeof window === 'undefined') {
    return INITIAL_PROBLEM_BANK;
  }

  // 1. Check client-side localStorage cache first for instant load (<5ms)
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTs = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (cachedData && cachedTs) {
      const age = Date.now() - parseInt(cachedTs, 10);
      if (age < CACHE_TTL_MS) {
        const parsed = JSON.parse(cachedData) as Problem[];
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PROBLEM_BANK.length) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to read problemBank from localStorage cache', e);
  }

  // If Firebase is unconfigured, return seed dataset immediately
  if (!isFirebaseConfigured) {
    return INITIAL_PROBLEM_BANK;
  }

  // 2. Fetch from Firestore and merge with INITIAL_PROBLEM_BANK by ID
  try {
    const fetchPromise = getDocs(collection(db, 'problemBank'));
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000));

    const result = await Promise.race([fetchPromise, timeoutPromise]);

    const problemMap = new Map<string, Problem>();
    // Seed base first
    INITIAL_PROBLEM_BANK.forEach((p) => problemMap.set(p.id, p));

    // Overwrite/extend with Firestore docs if present
    if (result && 'docs' in result && !result.empty) {
      result.forEach((doc) => {
        const data = doc.data() as Problem;
        if (data && data.id) {
          problemMap.set(data.id, data);
        }
      });
    }

    const mergedProblems = Array.from(problemMap.values());

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mergedProblems));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
      console.warn('Failed to write problemBank to localStorage cache', e);
    }

    return mergedProblems;
  } catch (err) {
    console.warn('Firestore fetch error or timeout; using curated seed dataset', err);
  }

  return INITIAL_PROBLEM_BANK;
}
