import React from 'react';
import { Link } from 'react-router-dom';
import { PROBLEMS } from '../data/problems';
import {
  Flame,
  Target,
  RefreshCw,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  Code2,
  Timer,
  Video
} from 'lucide-react';

export const DashboardPage = ({
  progressMap = {},
  dueRevisions = [],
  weeklyStats = { solvedThisWeek: 0, weeklyGoal: 10 },
  mistakeStats = {},
  streakInfo = { currentStreak: 0, longestStreak: 0 },
  studyPlan = null,
  onToggleDay
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Calculate totals
  const totalProblems = PROBLEMS.length;
  let totalSolved = 0;
  let mustSolved = 0;
  const mustTotal = PROBLEMS.filter((p) => p.tag === 'Must').length;

  for (const p of PROBLEMS) {
    const prog = progressMap[p.id];
    if (prog?.status === 'solved') {
      totalSolved++;
      if (p.tag === 'Must') mustSolved++;
    }
  }

  // Find today's tasks from study plan if exists
  let todayPlanDay = null;
  if (studyPlan?.schedule) {
    for (const week of studyPlan.schedule) {
      for (const d of week.days) {
        if (d.date === todayStr) {
          todayPlanDay = d;
          break;
        }
      }
      if (todayPlanDay) break;
    }
  }

  // Mistake reasons chart data
  const reasonLabels = {
    wrong_pattern: 'Wrong Pattern Choice',
    edge_case: 'Edge Case Failure',
    time_limit_exceeded: 'Time Limit (TLE)',
    did_not_know_concept: 'Unknown Theory/Concept',
    silly_bug: 'Silly Bug / Off-By-One'
  };

  const totalMistakes = Object.values(mistakeStats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Clean Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        {/* Playful Decorative Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#A7F3D0] text-black">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
            Interview Preparation
          </span>
          <span className="neo-pill bg-[#C4B5FD] text-black">
            14 Core Problem Patterns
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#18181B] dark:text-white uppercase">
            Master DSA Patterns Without The Confusion
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Stop blindly grinding random LeetCode problems. Follow a structured 14-topic roadmap, use step-by-step hints when stuck, and retain everything through automated daily reviews.
          </p>
        </div>

        {/* 3-Step Clear Path Visualizer (Clean flat boxes, no diagonal shadow) */}
        <div className="mt-6 pt-5 border-t-2 border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-[#FAF6EE] dark:bg-zinc-800/80 rounded-2xl border-2 border-black dark:border-zinc-700">
            <div className="flex items-center gap-2 font-black text-xs text-black dark:text-white">
              <span className="w-5 h-5 rounded-full bg-[#FFDE59] text-black border border-black flex items-center justify-center text-[11px] font-black">1</span>
              <span>Pick a Roadmap Topic</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-1 font-medium">
              Start with Sliding Window or Hashing. Solve MUST problems first.
            </p>
          </div>

          <div className="p-3 bg-[#FAF6EE] dark:bg-zinc-800/80 rounded-2xl border-2 border-black dark:border-zinc-700">
            <div className="flex items-center gap-2 font-black text-xs text-black dark:text-white">
              <span className="w-5 h-5 rounded-full bg-[#BAE6FD] text-black border border-black flex items-center justify-center text-[11px] font-black">2</span>
              <span>Stuck? Step-by-Step Hints</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-1 font-medium">
              Reveal Pattern → Idea → Pseudo-code without spoiling full solutions.
            </p>
          </div>

          <div className="p-3 bg-[#FAF6EE] dark:bg-zinc-800/80 rounded-2xl border-2 border-black dark:border-zinc-700">
            <div className="flex items-center gap-2 font-black text-xs text-black dark:text-white">
              <span className="w-5 h-5 rounded-full bg-[#FECDD3] text-black border border-black flex items-center justify-center text-[11px] font-black">3</span>
              <span>Mark Struggled → Daily Review</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-zinc-300 mt-1 font-medium">
              We automatically queue spaced reviews in +1d, +7d, +30d.
            </p>
          </div>
        </div>

        {/* Quick CTA Actions */}
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <Link
            to="/topic/sliding-window"
            className="neo-btn bg-[#FFDE59] text-black px-4 py-2.5"
          >
            <span>Start Topic 1: Sliding Window</span>
            <ArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
          </Link>
          <Link
            to="/roadmap"
            className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-4 py-2.5"
          >
            <span>Browse Full Roadmap (14 Topics)</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Streak (Static) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FECDD3] dark:bg-rose-950/40 border-2 border-black flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white text-rose-600 border-2 border-black flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-rose-600" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-black dark:text-white">
              {streakInfo.currentStreak} <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">days</span>
            </div>
            <div className="text-xs text-slate-800 dark:text-zinc-200 font-bold">
              Active Daily Streak
            </div>
          </div>
        </div>

        {/* Weekly Goal Progress (Static) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FEF08A] dark:bg-amber-950/40 border-2 border-black flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white text-amber-700 border-2 border-black flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xl sm:text-2xl font-black text-black dark:text-white">
              {weeklyStats.solvedThisWeek}/{weeklyStats.weeklyGoal}
            </div>
            <div className="text-xs text-slate-800 dark:text-zinc-200 font-bold truncate">
              Solved This Week
            </div>
          </div>
        </div>

        {/* Due Revisions (Clickable: Duolingo Tactile Bottom Shadow) */}
        <Link
          to="/revision"
          className="p-4 sm:p-5 rounded-2xl bg-[#C4B5FD] dark:bg-purple-950/40 border-2 border-black shadow-[0_4px_0_0_#18181B] dark:shadow-[0_4px_0_0_#fff] hover:translate-y-[-1.5px] active:translate-y-[2px] transition-all flex items-center gap-3 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-white text-purple-700 border-2 border-black flex items-center justify-center shrink-0">
            <RefreshCw className={`w-6 h-6 ${dueRevisions.length > 0 ? 'animate-spin' : ''}`} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-black dark:text-white">
              {dueRevisions.length}
            </div>
            <div className="text-xs text-slate-800 dark:text-zinc-200 font-bold">
              Reviews Due Today →
            </div>
          </div>
        </Link>

        {/* Must Problems Solved (Static) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#A7F3D0] dark:bg-teal-950/40 border-2 border-black flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white text-emerald-700 border-2 border-black flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-black dark:text-white">
              {mustSolved}/{mustTotal}
            </div>
            <div className="text-xs text-slate-800 dark:text-zinc-200 font-bold">
              Must Problems Done
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Today's Tasks + Fast Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks (2 columns) - Flat clean container */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#FFDE59] border-2 border-black text-black">
                <Calendar className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <h2 className="font-black text-slate-900 dark:text-white text-base">
                Today's Target Tasks
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-zinc-800 border border-black/30">
              {todayStr}
            </span>
          </div>

          {/* If there's an active study plan with tasks for today */}
          {todayPlanDay ? (
            <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800/60 border-2 border-black dark:border-zinc-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FFDE59] text-black border-2 border-black">
                    Scheduled Focus
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                    {todayPlanDay.topicName}
                  </h3>
                </div>
                <button
                  onClick={() => onToggleDay(todayPlanDay.date)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] hover:translate-y-[-1px] active:translate-y-[2px] ${
                    todayPlanDay.isCompleted
                      ? 'bg-[#34D399] text-black'
                      : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-white hover:bg-[#D1FAE5]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  <span>{todayPlanDay.isCompleted ? 'Done ✓' : 'Mark Day Complete'}</span>
                </button>
              </div>

              {todayPlanDay.mustProblems?.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-black text-slate-700 dark:text-zinc-200">
                    Must-Solve Problems for Today:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {todayPlanDay.mustProblems.map((prob) => (
                      <div
                        key={prob.id}
                        className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border-2 border-black dark:border-zinc-700 text-xs flex items-center justify-between"
                      >
                        <span className="font-bold text-slate-900 dark:text-zinc-100 truncate">
                          #{prob.lcNumber} {prob.title}
                        </span>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#FAF6EE] dark:bg-zinc-800 border border-black/30">
                          {prob.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800/40 border-2 border-black dark:border-zinc-700 text-center space-y-3">
              <div className="text-2xl">🗓️</div>
              <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold">
                Have a target interview deadline? Generate an adaptive schedule tailored to your available hours per week!
              </p>
              <Link
                to="/planner"
                className="neo-btn bg-[#FFDE59] text-black px-4 py-2 text-xs"
              >
                <span>Generate Adaptive Study Plan</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          )}

          {/* Due revisions callout */}
          {dueRevisions.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FEF08A] dark:bg-amber-950/40 border-2 border-black dark:border-zinc-700 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="font-black text-xs text-black dark:text-amber-200">
                  🔔 {dueRevisions.length} Daily Reviews Due Today!
                </h4>
                <p className="text-[11px] text-slate-800 dark:text-amber-300 font-medium mt-0.5">
                  Review previously struggled problems to retain algorithms permanently.
                </p>
              </div>
              <Link
                to="/revision"
                className="neo-btn bg-black text-white dark:bg-white dark:text-black px-3.5 py-1.5 text-xs font-black"
              >
                Start Revision Now
              </Link>
            </div>
          )}
        </div>

        {/* Quick Tools & Shortcuts (1 column) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-3">
          <h2 className="font-black text-slate-900 dark:text-white text-base border-b-2 border-black/10 dark:border-white/10 pb-3">
            Strategy Toolset
          </h2>

          <Link
            to="/roadmap"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black">
                <Layers className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  14-Topic Roadmap
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">Curated sequence & filters</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>

          <Link
            to="/mock"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF70A6] text-black border-2 border-black flex items-center justify-center font-black">
                <Timer className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Timed Mock Practice
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">40-minute simulated OA round</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>

          <Link
            to="/pattern-helper"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#BAE6FD] text-black border-2 border-black flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Pattern Helper
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">Match clues to 14 patterns</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>

          <Link
            to="/complexity-guide"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#A7F3D0] text-black border-2 border-black flex items-center justify-center font-black">
                <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  Constraint Guide
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">N ≤ 10^5 → Target Complexity</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>

          <Link
            to="/templates"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C4B5FD] text-black border-2 border-black flex items-center justify-center font-black">
                <BookOpen className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  Code Cheat Sheets
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">9 pattern templates + notebook</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>

          <Link
            to="/resources"
            className="p-3 rounded-2xl border-2 border-black bg-[#FAF6EE] dark:bg-zinc-800 shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#3F3F46] hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF4B4B] text-white border-2 border-black flex items-center justify-center font-black">
                <Video className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-xs text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Top DSA Channels
                </div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium">Striver, NeetCode, Abdul Bari & more</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      {/* Mistake Journal Insights Card (Clean flat container) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 dark:border-white/10 pb-3 flex-wrap gap-2">
          <div>
            <h2 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Mistake Journal Insights
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
              Breakdown of why you struggled on problems. Target your top mistake category to stop repeating errors!
            </p>
          </div>
          <span className="neo-pill bg-[#FEF08A] text-black">
            {totalMistakes} Incidents Recorded
          </span>
        </div>

        {totalMistakes > 0 ? (
          <div className="space-y-3">
            {Object.entries(reasonLabels).map(([key, label]) => {
              const count = mistakeStats[key] || 0;
              const pct = totalMistakes > 0 ? Math.round((count / totalMistakes) * 100) : 0;

              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800 dark:text-zinc-200">{label}</span>
                    <span className="font-mono text-slate-700 dark:text-zinc-300">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF6EE] dark:bg-zinc-800 rounded-full h-3 border-2 border-black overflow-hidden">
                    <div
                      className="h-full bg-[#FF70A6] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-600 dark:text-zinc-400 font-medium bg-[#FAF6EE] dark:bg-zinc-800/40 rounded-2xl border-2 border-dashed border-black/30">
            No mistakes recorded yet. When you hit a roadblock on any problem, mark it as <strong>Struggled</strong> and tag the reason (e.g., Wrong Pattern, Edge Case) to build self-awareness!
          </div>
        )}
      </div>
    </div>
  );
};
