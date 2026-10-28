import React, { useState, useEffect, useMemo } from 'react';
import { PROBLEMS } from '../data/problems';
import { getProblemSolution } from '../data/multiLanguageSolutions';
import {
  Timer,
  Award,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code2,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  Trophy,
  Target,
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';

const COMPANIES = [
  'All Companies',
  'Amazon',
  'Microsoft',
  'Flipkart',
  'Adobe',
  'TCS',
  'Infosys',
  'Wipro'
];

const LANGUAGES = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'javascript', label: 'JavaScript' }
];

export const MockOAPage = ({
  mockHistory = [],
  onSaveAssessment,
  preferredLanguage = 'python',
  onMarkStatus
}) => {
  // Session Configuration State
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [oaProfile, setOaProfile] = useState('balanced'); // 'balanced' | 'product_hard'
  const [activeSession, setActiveSession] = useState(null); // { problems, startTime, secondsLeft, hintUsage, problemStatuses, notes }
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState(preferredLanguage || 'python');
  const [copied, setCopied] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (activeSession && activeSession.secondsLeft > 0 && !activeSession.isFinished) {
      interval = setInterval(() => {
        setActiveSession((prev) => {
          if (!prev || prev.isFinished) return prev;
          if (prev.secondsLeft <= 1) {
            handleFinishMock(0);
            return { ...prev, secondsLeft: 0, isFinished: true };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession?.secondsLeft, activeSession?.isFinished]);

  // Start new mock session
  const handleStartMock = () => {
    let pool = PROBLEMS;
    if (selectedCompany !== 'All Companies') {
      const companyFiltered = pool.filter((p) =>
        p.companyTags?.some((c) => c.toLowerCase() === selectedCompany.toLowerCase())
      );
      if (companyFiltered.length >= 2) {
        pool = companyFiltered;
      }
    }

    let p1, p2;
    if (oaProfile === 'balanced') {
      const easyPool = pool.filter((p) => p.difficulty === 'Easy');
      const medPool = pool.filter((p) => p.difficulty === 'Medium');
      p1 = easyPool.length > 0 ? easyPool[Math.floor(Math.random() * easyPool.length)] : pool[0];
      const remaining = pool.filter((p) => p.id !== p1?.id);
      p2 = medPool.length > 0 ? medPool[Math.floor(Math.random() * medPool.length)] : remaining[1] || remaining[0];
    } else {
      const medHardPool = pool.filter((p) => p.difficulty === 'Medium' || p.difficulty === 'Hard');
      const shuffled = [...medHardPool].sort(() => 0.5 - Math.random());
      p1 = shuffled[0] || pool[0];
      p2 = shuffled[1] || pool[1];
    }

    // Defensive fallback
    p1 = p1 || PROBLEMS[0];
    p2 = p2 || PROBLEMS[1] || PROBLEMS[0];

    const newSession = {
      id: 'mock_' + Date.now(),
      company: selectedCompany,
      profile: oaProfile,
      problems: [p1, p2],
      secondsLeft: 40 * 60, // 40 minutes
      totalSeconds: 40 * 60,
      hintUsage: { [p1.id]: 0, [p2.id]: 0 },
      problemStatuses: { [p1.id]: 'unsolved', [p2.id]: 'unsolved' },
      scratchpad: { [p1.id]: '', [p2.id]: '' },
      isFinished: false
    };

    setActiveSession(newSession);
    setCurrentProblemIndex(0);
  };

  // Reveal hint in mock
  const handleRevealHint = (problemId, stage) => {
    if (!activeSession) return;
    setActiveSession((prev) => ({
      ...prev,
      hintUsage: {
        ...prev.hintUsage,
        [problemId]: Math.max(prev.hintUsage[problemId] || 0, stage)
      }
    }));
  };

  // Mark Problem in Mock
  const handleSetProblemStatus = (problemId, status) => {
    if (!activeSession) return;
    setActiveSession((prev) => ({
      ...prev,
      problemStatuses: {
        ...prev.problemStatuses,
        [problemId]: status
      }
    }));
    if (onMarkStatus && (status === 'solved' || status === 'struggled')) {
      onMarkStatus(problemId, status);
    }
  };

  // Calculate live score
  const calculateScore = (session) => {
    if (!session) return 100;
    let score = 100;
    for (const prob of session.problems) {
      const hints = session.hintUsage[prob.id] || 0;
      if (hints === 1) score -= 5;
      else if (hints === 2) score -= 15;
      else if (hints === 3) score -= 30;
      else if (hints >= 4) score -= 45;

      const status = session.problemStatuses[prob.id];
      if (status === 'unsolved') score -= 25;
    }
    return Math.max(0, score);
  };

  // Conclude mock
  const handleFinishMock = (forceSeconds = null) => {
    if (!activeSession) return;
    const finalSecondsLeft = forceSeconds !== null ? forceSeconds : activeSession.secondsLeft;
    const timeSpentSec = activeSession.totalSeconds - finalSecondsLeft;
    const finalScore = calculateScore(activeSession);

    const record = {
      id: activeSession.id,
      date: new Date().toISOString(),
      company: activeSession.company,
      profile: activeSession.profile,
      timeSpentMinutes: Math.round(timeSpentSec / 60),
      score: finalScore,
      problem1: {
        id: activeSession.problems[0]?.id,
        title: activeSession.problems[0]?.title,
        status: activeSession.problemStatuses[activeSession.problems[0]?.id] || 'unsolved',
        hints: activeSession.hintUsage[activeSession.problems[0]?.id] || 0
      },
      problem2: {
        id: activeSession.problems[1]?.id,
        title: activeSession.problems[1]?.title,
        status: activeSession.problemStatuses[activeSession.problems[1]?.id] || 'unsolved',
        hints: activeSession.hintUsage[activeSession.problems[1]?.id] || 0
      }
    };

    if (onSaveAssessment) {
      onSaveAssessment(record);
    }

    setLastResult(record);
    setShowResultModal(true);
    setActiveSession(null);
  };

  const currentProb = activeSession?.problems[currentProblemIndex];
  const currentHintsRevealed = currentProb ? (activeSession?.hintUsage[currentProb.id] || 0) : 0;
  const currentStatus = currentProb ? (activeSession?.problemStatuses[currentProb.id] || 'unsolved') : 'unsolved';
  const liveScore = calculateScore(activeSession);

  // Minutes and seconds for display
  const minsLeft = Math.floor((activeSession?.secondsLeft || 0) / 60);
  const secsLeft = (activeSession?.secondsLeft || 0) % 60;
  const isUrgent = (activeSession?.secondsLeft || 0) < 300;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="neo-pill bg-[#FFDE59] text-black flex items-center gap-1 font-mono">
            <Timer className="w-3.5 h-3.5" /> Timed Assessment Arena
          </span>
          <span className="text-xs text-slate-600 dark:text-zinc-400 font-bold">
            Simulated Online Assessment
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight">
          40-Minute Mock Interview Simulator
        </h1>
        <p className="text-sm text-slate-700 dark:text-zinc-300 font-medium max-w-2xl mt-1">
          Prepare for real campus and off-campus test pressure. Test your algorithm instincts under strict countdown constraints with dynamic scoring.
        </p>
      </div>

      {/* Mode 1: Configuration & Launch Arena (When not in active session) */}
      {!activeSession ? (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#BAE6FD] text-black border-2 border-black flex items-center justify-center font-black">
                  <Timer className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-black dark:text-white">
                    Setup Your Timed Assessment
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                    2 problems • 40 minutes • 100 maximum scoring points
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex neo-pill bg-[#A7F3D0] text-black">
                Exam Mode Active
              </span>
            </div>

            {/* Config Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Company Filter */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  Target Company Pool:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMPANIES.map((company) => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                        selectedCompany === company
                          ? 'bg-[#FFDE59] text-black shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1.5px]'
                          : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>

              {/* OA Profile Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  Difficulty Profile:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOaProfile('balanced')}
                    className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                      oaProfile === 'balanced'
                        ? 'bg-[#FED7AA] text-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]'
                        : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]'
                    }`}
                  >
                    <div className="font-black text-xs">Standard OA</div>
                    <div className="text-[11px] font-medium opacity-80 mt-0.5">1 Easy + 1 Medium</div>
                  </button>

                  <button
                    onClick={() => setOaProfile('product_hard')}
                    className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                      oaProfile === 'product_hard'
                        ? 'bg-[#FECDD3] text-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]'
                        : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]'
                    }`}
                  >
                    <div className="font-black text-xs">FAANG / Product</div>
                    <div className="text-[11px] font-medium opacity-80 mt-0.5">2 Medium / Hard</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Scoring & Rules Callout */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800/60 border-2 border-black dark:border-zinc-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-black dark:text-white">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Assessment Scoring System (100 Max Points):
              </div>
              <ul className="text-xs text-slate-700 dark:text-zinc-300 space-y-1 list-disc pl-5 font-medium">
                <li>Both problems solved cleanly without hints = <strong>100/100 (FAANG Ready)</strong>.</li>
                <li>Revealing Hint 1 costs <strong>5 pts</strong>; Hint 2 costs <strong>10 pts</strong>; Hint 3 costs <strong>15 pts</strong>; Full Code costs <strong>25 pts</strong>.</li>
                <li>Leaving a problem unsolved deducts <strong>25 pts</strong>.</li>
              </ul>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleStartMock}
              className="w-full neo-btn bg-[#34D399] text-black py-3.5 text-base font-black shadow-[0_4px_0_0_#18181B] active:shadow-[0_1px_0_0_#18181B] active:translate-y-[3px] hover:bg-[#10B981] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" /> Launch 40-Minute Assessment
            </button>
          </div>

          {/* Past Assessment History */}
          {mockHistory.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
                <h3 className="font-black text-base text-black dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" /> Past Mock Assessment History
                </h3>
                <span className="neo-pill bg-[#FEF08A] text-black">
                  {mockHistory.length} Recorded Tests
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-medium">
                  <thead>
                    <tr className="border-b-2 border-black/20 text-slate-600 dark:text-zinc-400 font-black">
                      <th className="py-2">Date</th>
                      <th className="py-2">Target</th>
                      <th className="py-2">Score</th>
                      <th className="py-2">Problems</th>
                      <th className="py-2">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {mockHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF6EE] dark:hover:bg-zinc-800/40">
                        <td className="py-2.5 font-mono text-slate-700 dark:text-zinc-300">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="py-2.5 font-bold text-black dark:text-white">
                          {item.company} ({item.profile})
                        </td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-black border-2 border-black ${
                            item.score >= 80
                              ? 'bg-[#A7F3D0] text-black'
                              : item.score >= 60
                              ? 'bg-[#FEF08A] text-black'
                              : 'bg-[#FECDD3] text-black'
                          }`}>
                            {item.score} / 100
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-800 dark:text-zinc-200">
                          {item.problem1?.title} • {item.problem2?.title}
                        </td>
                        <td className="py-2.5 font-mono text-slate-600 dark:text-zinc-400">
                          {item.timeSpentMinutes}m
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Mode 2: Live Assessment Environment */
        <div className="space-y-4">
          {/* Sticky Assessment Top Bar */}
          <div className="sticky top-16 z-30 p-4 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black shadow-[0_3px_0_0_#18181B] flex flex-wrap items-center justify-between gap-3">
            {/* Timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black font-mono font-black text-sm ${
              isUrgent ? 'bg-[#FECDD3] text-rose-950 animate-pulse' : 'bg-[#FFDE59] text-black'
            }`}>
              <Timer className="w-4 h-4" />
              <span>
                {String(minsLeft).padStart(2, '0')}:{String(secsLeft).padStart(2, '0')}
              </span>
            </div>

            {/* Problem Tab Switcher */}
            <div className="flex items-center gap-2">
              {activeSession.problems.map((p, idx) => {
                const status = activeSession.problemStatuses[p.id];
                const isSelected = idx === currentProblemIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrentProblemIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1px]'
                        : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>Question {idx + 1}</span>
                    {status === 'solved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {status === 'struggled' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            {/* Live Score & Submit */}
            <div className="flex items-center gap-2">
              <span className="neo-pill bg-[#BAE6FD] text-black text-xs font-mono font-black">
                Score: {liveScore}/100
              </span>
              <button
                onClick={() => handleFinishMock()}
                className="neo-btn bg-[#34D399] text-black px-3.5 py-1.5 text-xs font-black shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]"
              >
                Conclude OA
              </button>
            </div>
          </div>

          {/* Problem Workspace Grid */}
          {currentProb && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Problem Details & Socratic Hints */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-black text-black dark:text-white bg-[#FAF6EE] dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-black/30">
                      #{currentProb.lcNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border-2 border-black ${
                      currentProb.difficulty === 'Easy'
                        ? 'bg-[#D1FAE5] text-emerald-950'
                        : currentProb.difficulty === 'Medium'
                        ? 'bg-[#FED7AA] text-amber-950'
                        : 'bg-[#FECDD3] text-rose-950'
                    }`}>
                      {currentProb.difficulty}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-zinc-300 font-bold">
                      • {currentProb.pattern}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-black dark:text-white">
                    {currentProb.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentProb.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white px-3 py-1.5 text-xs flex items-center gap-1.5 shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1.5px]"
                  >
                    Solve on LeetCode <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Status Marking Selector */}
                <div className="p-3.5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800/60 border-2 border-black dark:border-zinc-700 space-y-2">
                  <label className="text-[11px] font-black uppercase text-black dark:text-white">
                    Self Evaluation:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSetProblemStatus(currentProb.id, 'solved')}
                      className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        currentStatus === 'solved'
                          ? 'bg-[#34D399] text-black shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1.5px]'
                          : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Solved Cleanly</span>
                    </button>
                    <button
                      onClick={() => handleSetProblemStatus(currentProb.id, 'struggled')}
                      className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        currentStatus === 'struggled'
                          ? 'bg-[#FFDE59] text-black shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1.5px]'
                          : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Needed Hints / Struggled</span>
                    </button>
                    <button
                      onClick={() => handleSetProblemStatus(currentProb.id, 'unsolved')}
                      className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        currentStatus === 'unsolved'
                          ? 'bg-[#FECDD3] text-black shadow-[0_2.5px_0_0_#18181B] active:translate-y-[1.5px]'
                          : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Unsolved</span>
                    </button>
                  </div>
                </div>

                {/* Socratic Hint Ladder in Mock */}
                <div className="space-y-3 pt-2 border-t-2 border-black/10 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xs uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      <span>Socratic Hints (Penalty Warning)</span>
                    </h3>
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-zinc-400">
                      Hints Revealed: {currentHintsRevealed}/4
                    </span>
                  </div>

                  {/* Hint 1 */}
                  <div className="p-3 rounded-xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-black dark:text-white">Hint 1: Core Pattern (-5 pts)</span>
                      {currentHintsRevealed < 1 && (
                        <button
                          onClick={() => handleRevealHint(currentProb.id, 1)}
                          className="px-2 py-0.5 rounded-md bg-[#FFDE59] text-black text-[10px] font-black border border-black cursor-pointer hover:bg-amber-400"
                        >
                          Unlock (-5 pts)
                        </button>
                      )}
                    </div>
                    {currentHintsRevealed >= 1 ? (
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentProb.hints.hint1}</p>
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">Locked to preserve score.</p>
                    )}
                  </div>

                  {/* Hint 2 */}
                  <div className="p-3 rounded-xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-black dark:text-white">Hint 2: Key Idea (-10 pts)</span>
                      {currentHintsRevealed < 2 && (
                        <button
                          onClick={() => handleRevealHint(currentProb.id, 2)}
                          className="px-2 py-0.5 rounded-md bg-[#BAE6FD] text-black text-[10px] font-black border border-black cursor-pointer hover:bg-blue-300"
                        >
                          Unlock (-10 pts)
                        </button>
                      )}
                    </div>
                    {currentHintsRevealed >= 2 ? (
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentProb.hints.hint2}</p>
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">Locked to preserve score.</p>
                    )}
                  </div>

                  {/* Hint 3 */}
                  <div className="p-3 rounded-xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-black dark:text-white">Hint 3: Pseudocode Skeleton (-15 pts)</span>
                      {currentHintsRevealed < 3 && (
                        <button
                          onClick={() => handleRevealHint(currentProb.id, 3)}
                          className="px-2 py-0.5 rounded-md bg-[#FED7AA] text-black text-[10px] font-black border border-black cursor-pointer hover:bg-orange-300"
                        >
                          Unlock (-15 pts)
                        </button>
                      )}
                    </div>
                    {currentHintsRevealed >= 3 ? (
                      <pre className="text-[11px] font-mono bg-white dark:bg-zinc-900 p-2 rounded-lg border border-black/30 whitespace-pre-wrap">
                        {currentProb.hints.hint3}
                      </pre>
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">Locked to preserve score.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Code Scratchpad & Templates */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4 flex flex-col">
                <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-black text-sm text-black dark:text-white">
                      Code Scratchpad & Solution
                    </h3>
                  </div>

                  {/* Language Selector */}
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="text-xs font-black border-2 border-black rounded-xl px-2.5 py-1 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>

                {/* Scratchpad Textarea */}
                <div className="flex-1 min-h-[220px] flex flex-col space-y-2">
                  <label className="text-[11px] font-black uppercase text-slate-600 dark:text-zinc-400">
                    Write or paste your logic / draft code:
                  </label>
                  <textarea
                    value={activeSession.scratchpad[currentProb.id] || ''}
                    onChange={(e) => {
                      const text = e.target.value;
                      setActiveSession((prev) => ({
                        ...prev,
                        scratchpad: {
                          ...prev.scratchpad,
                          [currentProb.id]: text
                        }
                      }));
                    }}
                    placeholder={`// Draft your ${selectedLang} solution here before submitting on LeetCode...`}
                    className="w-full flex-1 p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-900 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white resize-y"
                    rows={10}
                  />
                </div>

                {/* Solution Reveal Option (Hint 4) */}
                <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-black dark:text-white">
                      Official Complete Solution (Hint 4, -25 pts)
                    </span>
                    {currentHintsRevealed < 4 ? (
                      <button
                        onClick={() => handleRevealHint(currentProb.id, 4)}
                        className="px-2.5 py-1 rounded-lg bg-[#FECDD3] text-black text-xs font-black border-2 border-black cursor-pointer hover:bg-rose-300 shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]"
                      >
                        Reveal Full Code (-25 pts)
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const sol = getProblemSolution(currentProb, selectedLang);
                          if (sol) {
                            navigator.clipboard.writeText(sol);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-700 text-black dark:text-white text-xs font-black border border-black flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    )}
                  </div>

                  {currentHintsRevealed >= 4 ? (
                    <pre className="p-3 bg-zinc-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-56">
                      {getProblemSolution(currentProb, selectedLang)}
                    </pre>
                  ) : (
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 italic">
                      Solution hidden. Solve independently to score maximum points.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Modal */}
      {showResultModal && lastResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1D22] rounded-3xl border-2 border-black p-6 sm:p-8 shadow-[0_6px_0_0_#18181B] space-y-5">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center mx-auto">
                {lastResult.score >= 80 ? (
                  <Trophy className="w-8 h-8 text-black" />
                ) : lastResult.score >= 60 ? (
                  <Award className="w-8 h-8 text-black" />
                ) : (
                  <Target className="w-8 h-8 text-black" />
                )}
              </div>
              <h2 className="text-2xl font-black text-black dark:text-white">
                Assessment Complete!
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
                {lastResult.score >= 80
                  ? 'FAANG Ready Performance! Outstanding problem-solving speed.'
                  : lastResult.score >= 60
                  ? 'Solid performance. Revise your hints to optimize execution speed.'
                  : 'Keep grinding! Analyze why hints were needed in your mistake journal.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black space-y-2 text-center">
              <div className="text-xs font-black uppercase text-slate-500">Your Final Score</div>
              <div className="text-4xl font-black text-black dark:text-white">
                {lastResult.score} <span className="text-lg text-slate-500">/ 100</span>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-zinc-400 font-bold">
                Time Taken: {lastResult.timeSpentMinutes} mins • Target: {lastResult.company}
              </div>
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-800 dark:text-zinc-200">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border">
                <span>1. {lastResult.problem1?.title}</span>
                <span className="capitalize">{lastResult.problem1?.status}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border">
                <span>2. {lastResult.problem2?.title}</span>
                <span className="capitalize">{lastResult.problem2?.status}</span>
              </div>
            </div>

            <button
              onClick={() => setShowResultModal(false)}
              className="w-full neo-btn bg-[#FFDE59] text-black py-3 font-black text-sm"
            >
              Close & View History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
