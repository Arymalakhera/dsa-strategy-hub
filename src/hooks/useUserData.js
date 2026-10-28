import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

export function useUserData() {
  const [progressMap, setProgressMap] = useState(() => storageService.getAllProgress());
  const [notesMap, setNotesMap] = useState(() => storageService.getAllNotes());
  const [studyPlan, setStudyPlan] = useState(() => storageService.getStudyPlan());
  const [streakInfo, setStreakInfo] = useState(() => storageService.getStreakInfo());
  const [language, setLanguageState] = useState(() => storageService.getPreferredLanguage());
  const [mockHistory, setMockHistory] = useState(() => storageService.getMockHistory());

  const refreshAll = useCallback(() => {
    setProgressMap(storageService.getAllProgress());
    setNotesMap(storageService.getAllNotes());
    setStudyPlan(storageService.getStudyPlan());
    setStreakInfo(storageService.getStreakInfo());
    setLanguageState(storageService.getPreferredLanguage());
    setMockHistory(storageService.getMockHistory());
  }, []);

  useEffect(() => {
    const handleProgress = () => setProgressMap(storageService.getAllProgress());
    const handleNotes = () => setNotesMap(storageService.getAllNotes());
    const handlePlan = () => setStudyPlan(storageService.getStudyPlan());
    const handleStreak = () => setStreakInfo(storageService.getStreakInfo());
    const handleLanguage = () => setLanguageState(storageService.getPreferredLanguage());
    const handleMock = () => setMockHistory(storageService.getMockHistory());

    window.addEventListener('dsa_progress_updated', handleProgress);
    window.addEventListener('dsa_notes_updated', handleNotes);
    window.addEventListener('dsa_plan_updated', handlePlan);
    window.addEventListener('dsa_streak_updated', handleStreak);
    window.addEventListener('dsa_language_updated', handleLanguage);
    window.addEventListener('dsa_mock_updated', handleMock);

    return () => {
      window.removeEventListener('dsa_progress_updated', handleProgress);
      window.removeEventListener('dsa_notes_updated', handleNotes);
      window.removeEventListener('dsa_plan_updated', handlePlan);
      window.removeEventListener('dsa_streak_updated', handleStreak);
      window.removeEventListener('dsa_language_updated', handleLanguage);
      window.removeEventListener('dsa_mock_updated', handleMock);
    };
  }, []);

  const markProblemStatus = useCallback((problemId, status, reason = null) => {
    return storageService.markProblemStatus(problemId, status, reason);
  }, []);

  const setHintsRevealed = useCallback((problemId, count) => {
    return storageService.setHintsRevealed(problemId, count);
  }, []);

  const resolveRevision = useCallback((problemId, passed) => {
    return storageService.resolveRevision(problemId, passed);
  }, []);

  const saveProblemNote = useCallback((problemId, note) => {
    return storageService.saveProblemNote(problemId, note);
  }, []);

  const saveStudyPlan = useCallback((plan) => {
    return storageService.saveStudyPlan(plan);
  }, []);

  const togglePlanDay = useCallback((dateStr) => {
    return storageService.togglePlanDayCompletion(dateStr);
  }, []);

  const saveMockAssessment = useCallback((assessment) => {
    return storageService.saveMockAssessment(assessment);
  }, []);

  const dueRevisions = storageService.getDueRevisions();
  const allRevisionQueue = storageService.getAllRevisionQueue();
  const weeklyStats = storageService.getWeeklyStats();
  const mistakeStats = storageService.getMistakeStats();

  const setLanguage = useCallback((lang) => {
    storageService.setPreferredLanguage(lang);
    setLanguageState(lang);
  }, []);

  return {
    progressMap,
    notesMap,
    studyPlan,
    streakInfo,
    language,
    mockHistory,
    dueRevisions,
    allRevisionQueue,
    weeklyStats,
    mistakeStats,
    markProblemStatus,
    setHintsRevealed,
    resolveRevision,
    saveProblemNote,
    saveStudyPlan,
    togglePlanDay,
    saveMockAssessment,
    setLanguage,
    refreshAll
  };
}
