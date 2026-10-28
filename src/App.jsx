import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useUserData } from './hooks/useUserData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { HintLadderDrawer } from './components/HintLadderDrawer';
import { StruggleModal } from './components/StruggleModal';
import { PersonalNoteModal } from './components/PersonalNoteModal';
import { FloatingMentorBot } from './components/FloatingMentorBot';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { RevisionPage } from './pages/RevisionPage';
import { PatternHelperPage } from './pages/PatternHelperPage';
import { ComplexityGuidePage } from './pages/ComplexityGuidePage';
import { TemplatesPage } from './pages/TemplatesPage';
import { MockOAPage } from './pages/MockOAPage';
import { ResourcesPage } from './pages/ResourcesPage';

import { PROBLEM_MAP } from './data/problems';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    progressMap,
    notesMap,
    studyPlan,
    streakInfo,
    dueRevisions,
    allRevisionQueue,
    weeklyStats,
    mistakeStats,
    mockHistory,
    markProblemStatus,
    setHintsRevealed,
    resolveRevision,
    saveProblemNote,
    saveStudyPlan,
    togglePlanDay,
    saveMockAssessment,
    language,
    setLanguage
  } = useUserData();

  // Global Modal States
  const [activeHintProblem, setActiveHintProblem] = useState(null);
  const [activeStruggleProblem, setActiveStruggleProblem] = useState(null);
  const [activeNoteProblem, setActiveNoteProblem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard Shortcuts (Ctrl+K for search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (activeHintProblem) setActiveHintProblem(null);
        else if (activeStruggleProblem) setActiveStruggleProblem(null);
        else if (activeNoteProblem) setActiveNoteProblem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, activeHintProblem, activeStruggleProblem, activeNoteProblem]);

  const handleOpenHints = (problem) => {
    setActiveHintProblem(problem);
  };

  const handleCloseHints = () => {
    setActiveHintProblem(null);
  };

  const handleOpenNote = (problem) => {
    setActiveNoteProblem(problem);
  };

  const handleCloseNote = () => {
    setActiveNoteProblem(null);
  };

  const handleStatusChange = (problemId, status) => {
    if (status === 'struggled') {
      const p = PROBLEM_MAP[problemId];
      if (p) setActiveStruggleProblem(p);
    } else {
      markProblemStatus(problemId, status);
    }
  };

  const handleStruggleConfirm = (problemId, reason) => {
    markProblemStatus(problemId, 'struggled', reason);
    setActiveStruggleProblem(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] dark:bg-[#121316] text-[#18181B] dark:text-[#F4F4F5] transition-colors">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        streak={streakInfo.currentStreak}
        dueCount={dueRevisions.length}
        language={language}
        onSelectLanguage={setLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar dueCount={dueRevisions.length} />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-full overflow-x-hidden">
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardPage
                    progressMap={progressMap}
                    dueRevisions={dueRevisions}
                    weeklyStats={weeklyStats}
                    mistakeStats={mistakeStats}
                    streakInfo={streakInfo}
                    studyPlan={studyPlan}
                    onToggleDay={togglePlanDay}
                  />
                }
              />
              <Route
                path="/roadmap"
                element={<RoadmapPage progressMap={progressMap} />}
              />
              <Route
                path="/topic/:topicId"
                element={
                  <TopicDetailPage
                    progressMap={progressMap}
                    notesMap={notesMap}
                    onOpenHints={handleOpenHints}
                    onOpenNote={handleOpenNote}
                    onMarkStatus={handleStatusChange}
                  />
                }
              />
              <Route
                path="/planner"
                element={
                  <StudyPlannerPage
                    studyPlan={studyPlan}
                    onSavePlan={saveStudyPlan}
                    onToggleDay={togglePlanDay}
                  />
                }
              />
              <Route
                path="/revision"
                element={
                  <RevisionPage
                    dueRevisions={dueRevisions}
                    allRevisionQueue={allRevisionQueue}
                    progressMap={progressMap}
                    notesMap={notesMap}
                    onResolveRevision={resolveRevision}
                    onOpenHints={handleOpenHints}
                    onOpenNote={handleOpenNote}
                    onMarkStatus={handleStatusChange}
                  />
                }
              />
              <Route
                path="/pattern-helper"
                element={<PatternHelperPage />}
              />
              <Route
                path="/complexity-guide"
                element={<ComplexityGuidePage />}
              />
              <Route
                path="/templates"
                element={
                  <TemplatesPage
                    notesMap={notesMap}
                    preferredLanguage={language}
                    onSelectLanguage={setLanguage}
                  />
                }
              />
              <Route
                path="/mock"
                element={
                  <MockOAPage
                    mockHistory={mockHistory}
                    onSaveAssessment={saveMockAssessment}
                    preferredLanguage={language}
                    onMarkStatus={handleStatusChange}
                  />
                }
              />
              <Route
                path="/resources"
                element={<ResourcesPage />}
              />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        dueCount={dueRevisions.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Hint Ladder Drawer Modal */}
      {activeHintProblem && (
        <HintLadderDrawer
          problem={activeHintProblem}
          isOpen={Boolean(activeHintProblem)}
          onClose={handleCloseHints}
          currentHintsCount={progressMap[activeHintProblem.id]?.hintsRevealed || 0}
          onHintRevealed={setHintsRevealed}
          status={progressMap[activeHintProblem.id]?.status || 'not_started'}
          onMarkStatus={handleStatusChange}
          onOpenNote={handleOpenNote}
          preferredLanguage={language}
        />
      )}

      {/* Mistake Journal Reason Modal */}
      {activeStruggleProblem && (
        <StruggleModal
          problem={activeStruggleProblem}
          isOpen={Boolean(activeStruggleProblem)}
          onClose={() => setActiveStruggleProblem(null)}
          onConfirm={handleStruggleConfirm}
        />
      )}

      {/* Personal Note Modal */}
      {activeNoteProblem && (
        <PersonalNoteModal
          problem={activeNoteProblem}
          initialNote={notesMap[activeNoteProblem.id] || ''}
          isOpen={Boolean(activeNoteProblem)}
          onClose={handleCloseNote}
          onSave={saveProblemNote}
        />
      )}

      {/* Global Floating Animated Socratic Mentor Bot (Option 3) */}
      <FloatingMentorBot
        onOpenProblemHints={handleOpenHints}
        activeProblem={activeHintProblem}
      />

      {/* Global Quick Problem Search Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProblem={handleOpenHints}
      />
    </div>
  );
}
