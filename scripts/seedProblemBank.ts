import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { INITIAL_PROBLEM_BANK } from '../src/data/problemBankSeed';

async function seed() {
  console.log('🌱 Seeding Problem Bank into Firestore...');

  if (!getApps().length) {
    // If service account key is available, use it; otherwise initialize with default application credentials
    initializeApp();
  }

  const db = getFirestore();
  const batch = db.batch();

  for (const problem of INITIAL_PROBLEM_BANK) {
    const docRef = db.collection('problemBank').doc(problem.id);
    batch.set(docRef, problem, { merge: true });
  }

  await batch.commit();
  console.log(`✅ Successfully seeded ${INITIAL_PROBLEM_BANK.length} problems into /problemBank.`);
}

seed().catch((err) => {
  console.error('❌ Error seeding Problem Bank:', err);
  process.exit(1);
});
