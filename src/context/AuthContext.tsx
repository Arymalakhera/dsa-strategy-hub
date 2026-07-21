'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from '../lib/firebase';
import { UserProfile, UserPreferences } from '../types';

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  enableDemoMode: () => void;
  logout: () => Promise<void>;
  savePreferencesAndInitializeRoadmap: (preferences: UserPreferences) => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearAuthError: () => void;
}

const DEFAULT_DEMO_PROFILE: UserProfile = {
  uid: 'demo-user-123',
  displayName: 'Alex Rivers (Demo)',
  email: 'alex.demo@dsamentor.app',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  currentLevel: 'Intermediate',
  preferences: {
    skillLevel: 'Intermediate',
    weeklyHours: 7,
    goal: 'General Interview Prep',
    timeline: '1 month',
    weakTopics: ['Dynamic Programming', 'Graph', 'Tree'],
    strongTopics: ['Array', 'Two Pointers', 'Hash Table']
  },
  totalPoints: 245,
  currentStreak: 4,
  longestStreak: 7,
  lastSolvedDate: new Date().toISOString().split('T')[0],
  createdAt: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !isDemoMode) {
        setUser(firebaseUser);
        await fetchOrCreateProfile(firebaseUser);
      } else if (!isDemoMode) {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const fetchOrCreateProfile = async (fbUser: FirebaseUser) => {
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      const getDocPromise = getDoc(userRef);
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1200));

      const snap = await Promise.race([getDocPromise, timeoutPromise]);

      if (snap && 'exists' in snap && snap.exists()) {
        setProfile(snap.data() as UserProfile);
      } else {
        const newProf: UserProfile = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'DSA Explorer',
          email: fbUser.email,
          photoURL: fbUser.photoURL,
          currentLevel: 'Beginner',
          preferences: {
            skillLevel: 'Beginner',
            weeklyHours: 5,
            goal: 'General Interview Prep',
            timeline: '1 month',
            weakTopics: [],
            strongTopics: []
          },
          totalPoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastSolvedDate: null,
          createdAt: new Date().toISOString()
        };
        setDoc(userRef, newProf, { merge: true }).catch(() => {});
        setProfile(newProf);
      }
    } catch (e: any) {
      console.warn('Firestore profile fetch failed or timed out:', e);
    }
  };

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      if (!isFirebaseConfigured) {
        setAuthError('Firebase API keys not configured in .env.local. Please check your config.');
        return;
      }
      setIsDemoMode(false);
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setUser(result.user);
        await fetchOrCreateProfile(result.user);
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      const message = error.message || 'Google Sign-In failed. Please try again.';
      setAuthError(message);
    }
  };

  const enableDemoMode = () => {
    setAuthError(null);
    setIsDemoMode(true);
    setUser({
      uid: DEFAULT_DEMO_PROFILE.uid,
      displayName: DEFAULT_DEMO_PROFILE.displayName,
      email: DEFAULT_DEMO_PROFILE.email,
      photoURL: DEFAULT_DEMO_PROFILE.photoURL,
      emailVerified: true,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'demo-token',
      getIdTokenResult: async () => ({} as any),
      reload: async () => {},
      toJSON: () => ({}),
      phoneNumber: null,
      providerId: 'google.com'
    } as FirebaseUser);
    setProfile(DEFAULT_DEMO_PROFILE);
    setLoading(false);
  };

  const logout = async () => {
    setAuthError(null);
    if (isDemoMode) {
      setIsDemoMode(false);
      setUser(null);
      setProfile(null);
    } else {
      await signOut(auth);
    }
  };

  const savePreferencesAndInitializeRoadmap = async (prefs: UserPreferences) => {
    if (!profile && !user) return;
    const uid = profile?.uid || user?.uid || 'demo-user-123';

    const updatedProfile: UserProfile = {
      ...(profile || DEFAULT_DEMO_PROFILE),
      currentLevel: prefs.skillLevel,
      preferences: prefs
    };

    setProfile(updatedProfile);

    if (!isDemoMode) {
      try {
        await setDoc(doc(db, 'users', uid), updatedProfile, { merge: true });
      } catch (e) {
        console.warn('Failed to save preferences to Firestore', e);
      }
    }
  };

  const refreshProfile = async () => {
    if (user && !isDemoMode) {
      await fetchOrCreateProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemoMode,
        authError,
        signInWithGoogle,
        enableDemoMode,
        logout,
        savePreferencesAndInitializeRoadmap,
        refreshProfile,
        clearAuthError: () => setAuthError(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
