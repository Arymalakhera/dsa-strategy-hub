import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Problem, RoadmapItem, ProblemStatus } from '../types';
import { ExternalLink, BrainCircuit, CheckCircle2, Circle, Clock, Plus, Filter, Search, Sparkles, RefreshCw, Trophy, Flame, ChevronLeft, ChevronRight, Sliders, Trash2, Code, Building2, Compass, Layers } from 'lucide-react';

interface RoadmapViewProps {
  roadmap: RoadmapItem[];
  allProblems: Problem[];
  onStatusChange: (leetcodeId: string, newStatus: ProblemStatus, hintStage?: number) => void;
  onOpenSocraticChat: (problem: Problem, currentHintStage: number) => void;
  onResyncRoadmap: () => Promise<void>;
  onOpenOnboarding: () => void;
  onOpenCustomizer: () => void;
  onToggleRoadmapProblem: (leetcodeId: string) => void;
  isSyncing: boolean;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  allProblems,
  onStatusChange,
  onOpenSocraticChat,
  onResyncRoadmap,
  onOpenOnboarding,
  onOpenCustomizer,
  onToggleRoadmapProblem,
  isSyncing
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Extract all unique topics across all database problems
  const availableTopics = ['All', ...Array.from(new Set(allProblems.flatMap((p) => p.topics)))];
  const availableCompanies = ['All', 'Amazon', 'Meta', 'Google', 'Apple', 'Microsoft'];

  // Map existing roadmap status and hintStage by problem ID
  const roadmapMap = new Map<string, RoadmapItem>();
  roadmap.forEach((r) => roadmapMap.set(r.leetcodeId, r));

  // Construct full item list from allProblems, preserving roadmap status
  const fullList: RoadmapItem[] = allProblems.map((p, idx) => {
    const existing = roadmapMap.get(p.id);
    if (existing) return existing;

    return {
      leetcodeId: p.id,
      status: 'unsolved',
      hintStage: 0,
      attempts: 0,
      solvedAt: null,
      lastAttemptedAt: null,
      order: idx + 1000,
      problem: p
    };
  });

  // Filter and sort items across the complete problem bank
  const cleanQuery = searchQuery.trim().toLowerCase();
  const filteredItems = fullList.filter((item) => {
    const p = item.problem;
    if (!p) return false;

    const matchesCompany =
      selectedCompany === 'All' ||
      (p.companyTags && p.companyTags.some((c) => c.toLowerCase() === selectedCompany.toLowerCase()));

    // When searching, search across ALL problems in the database
    if (cleanQuery) {
      const matchesSearch =
        p.id.toLowerCase() === cleanQuery ||
        p.id.toLowerCase().includes(cleanQuery) ||
        p.title.toLowerCase().includes(cleanQuery) ||
        (p.slug && p.slug.toLowerCase().includes(cleanQuery)) ||
        p.topics.some((t) => t.toLowerCase().includes(cleanQuery)) ||
        (p.companyTags && p.companyTags.some((c) => c.toLowerCase().includes(cleanQuery)));

      const matchesTopic = selectedTopic === 'All' || p.topics.includes(selectedTopic);
      const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

      return matchesSearch && matchesTopic && matchesDiff && matchesCompany;
    }

    // When not searching, display the personalized roadmap items
    const isInPersonalizedRoadmap = roadmapMap.has(p.id);
    const matchesTopic = selectedTopic === 'All' || p.topics.includes(selectedTopic);
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    return isInPersonalizedRoadmap && matchesTopic && matchesDiff && matchesCompany;
  });

  // Prioritize exact numeric ID matches at the top of search results
  if (cleanQuery) {
    filteredItems.sort((a, b) => {
      const aExact = a.leetcodeId === cleanQuery ? -1 : 1;
      const bExact = b.leetcodeId === cleanQuery ? -1 : 1;
      return aExact - bExact;
    });
  }
  // Pagination state (20 problems per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Reset to page 1 whenever search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTopic, selectedDifficulty]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const solvedCount = roadmap.filter((r) => r.status === 'solved').length;
  const progressPercent = roadmap.length > 0 ? Math.round((solvedCount / roadmap.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Home Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-4 z-10 max-w-xl text-left">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Socratic AI LeetCode Mentor
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Master DSA Patterns <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
              With Socratic AI Hints
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practice 134+ NeetCode &amp; Blind 75 problems. Get guided Socratic direction without copy-pasting solution code.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenOnboarding}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/30 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" /> Personalize My Roadmap (Take Quiz)
            </button>
          </div>
        </div>

        {/* Hero Right Graphic Card & Progress Gauge */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 w-full lg:w-auto z-10 shrink-0">
          {/* Progress Gauge */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex items-center gap-6 min-w-[240px] shadow-lg backdrop-blur-md">
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Roadmap Progress</div>
              <div className="text-3xl font-black text-indigo-400">{progressPercent}%</div>
              <div className="text-[10px] text-slate-500">{solvedCount} of {roadmap.length} Solved</div>
            </div>
            <div className="flex-1 bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Graphic Card */}
          <div className="relative hidden sm:flex flex-col justify-between p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 shadow-xl backdrop-blur-md overflow-hidden min-w-[240px] h-28">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] font-mono text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                Socratic AI Mode
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-300 space-y-0.5 my-1">
              <div className="text-purple-400 font-bold text-[10px]">// Stage 3: Optimal Intuition</div>
              <div className="text-slate-400 truncate">&gt; &quot;Use Two Pointers to shrink window...&quot;</div>
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800/80 pt-1 font-mono">
              <span>Status: Guided Hints</span>
              <span className="text-emerald-400 font-bold">Copy-Paste Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 shrink-0">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">134+</div>
            <div className="text-xs text-slate-400 font-medium">LeetCode Problems Available</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-800/60 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">12 Clusters</div>
            <div className="text-xs text-slate-400 font-medium">Core DSA Topics Covered</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-indigo-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-800/60 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">5 FAANG</div>
            <div className="text-xs text-slate-400 font-medium">Companies Tagged (Amazon, Meta, Google)</div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-indigo-500/50 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-2.5 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 w-max">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-100">Socratic AI Mentor</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            5-stage guided hints to build deep algorithmic intuition without spoiling code answers.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-indigo-500/50 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-2.5 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/60 w-max">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-100">FAANG Company Prep</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Filter questions asked by Meta, Amazon, Google, Apple &amp; Microsoft.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-indigo-500/50 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60 w-max">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-100">Personalized Roadmap</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Customized topic order, difficulty mix, and completion date calculator.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-indigo-500/50 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 w-max">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-100">Streaks &amp; Badges</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Earn points, unlock milestones, and build daily problem-solving habits.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, LeetCode #, topic, or company (Amazon, Meta, Google)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Topic, Difficulty & Company Selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="bg-slate-950 border border-indigo-900/60 rounded-xl px-3 py-2 text-xs font-semibold text-indigo-300 focus:outline-none focus:border-indigo-500"
          >
            {availableCompanies.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'Company: All (FAANG)' : `FAANG: ${c}`}
              </option>
            ))}
          </select>

          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                Topic: {t}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Customize Roadmap Button */}
          <button
            onClick={onOpenCustomizer}
            className="px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-purple-950"
            title="Customize topic order, difficulty mix, and daily targets"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" /> Customize
          </button>

          {/* Re-sync Button with active spinning state */}
          <button
            onClick={onResyncRoadmap}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-800 text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-950 disabled:opacity-50"
            title="Re-fetch user roadmap status from Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Re-sync'}
          </button>
        </div>
      </div>

      {/* Problem List Cards / Empty State / Skeleton Loaders */}
      <div className="grid grid-cols-1 gap-3">
        {isSyncing ? (
          // Skeleton Loader Cards during Syncing/Loading
          [1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 animate-pulse flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-10 bg-slate-800 rounded" />
                  <div className="h-5 w-48 bg-slate-800 rounded" />
                  <div className="h-4 w-12 bg-slate-800 rounded" />
                </div>
                <div className="h-3 w-3/4 bg-slate-800/80 rounded" />
                <div className="flex gap-2 pt-1">
                  <div className="h-3 w-16 bg-slate-800/60 rounded" />
                  <div className="h-3 w-16 bg-slate-800/60 rounded" />
                </div>
              </div>
              <div className="h-8 w-28 bg-slate-800 rounded-xl" />
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          // Friendly Glassmorphism Empty Search State
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100">
                {searchQuery ? `No problems match "${searchQuery}"` : 'No problems found'}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try searching by LeetCode number (e.g. <span className="text-indigo-400 font-mono font-bold">1</span>, <span className="text-indigo-400 font-mono font-bold">48</span>, <span className="text-indigo-400 font-mono font-bold">146</span>), or browse popular topics below:
              </p>
            </div>

            {/* Quick Topic Shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-lg mx-auto">
              {['Array', 'String', 'Tree', 'Graph', 'Dynamic Programming', 'Two Pointers'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTopic(topic);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-700 text-xs font-semibold text-slate-300 hover:text-indigo-300 transition-all"
                >
                  Topic: {topic}
                </button>
              ))}

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTopic('All');
                  setSelectedDifficulty('All');
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/40 text-xs font-bold text-indigo-300 transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          paginatedItems.map((item, idx) => {
            const p = item.problem!;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`p-4 pl-5 rounded-xl border border-l-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden ${
                  p.difficulty === 'Easy'
                    ? 'border-l-emerald-500'
                    : p.difficulty === 'Medium'
                    ? 'border-l-amber-500'
                    : 'border-l-rose-500'
                } ${
                  item.status === 'solved'
                    ? 'bg-slate-900/40 border-emerald-900/40 opacity-90'
                    : item.status === 'attempted'
                    ? 'bg-slate-900 border-amber-900/50 shadow-md shadow-amber-950/20'
                    : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Problem Meta */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">#{p.id}</span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-slate-100 hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                    >
                      {p.title}
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400" />
                    </a>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.difficulty === 'Easy'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/60'
                          : p.difficulty === 'Medium'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-900/60'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-900/60'
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">{p.descriptionSnippet}</p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {p.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}

                    {p.companyTags && p.companyTags.map((comp) => (
                      <span
                        key={comp}
                        className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/60 text-[10px] font-bold text-purple-300 flex items-center gap-1"
                      >
                        🏢 {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Controls & AI Mentor Action */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
                  {/* Single Status Dropdown Pill */}
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(p.id, e.target.value as ProblemStatus, item.hintStage)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all outline-none cursor-pointer border ${
                      item.status === 'solved'
                        ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-950'
                        : item.status === 'attempted'
                        ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-md shadow-amber-950'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <option value="unsolved" className="bg-slate-900 text-slate-300 font-bold uppercase">⚪ Unsolved</option>
                    <option value="attempted" className="bg-slate-900 text-amber-400 font-bold uppercase">🟡 Attempted</option>
                    <option value="solved" className="bg-slate-900 text-emerald-400 font-bold uppercase">🟢 Solved</option>
                  </select>

                  {/* Add / Remove from Roadmap (Trash icon with confirmation popup) */}
                  {roadmapMap.has(p.id) ? (
                    confirmDeleteId === p.id ? (
                      <div className="flex items-center gap-1 bg-slate-950 border border-rose-800/80 p-1 rounded-xl">
                        <span className="text-[10px] text-rose-300 font-bold px-1">Remove?</span>
                        <button
                          onClick={() => {
                            onToggleRoadmapProblem(p.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition-colors"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(p.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
                        title="Remove from my roadmap"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => onToggleRoadmapProblem(p.id)}
                      className="px-2.5 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-all shadow-sm shadow-emerald-950"
                      title="Add this problem to my personalized roadmap"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-400" /> + Add to Roadmap
                    </button>
                  )}

                  {/* Socratic AI Mentor Button */}
                  <button
                    onClick={() => onOpenSocraticChat(p, item.hintStage)}
                    className="px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-950"
                  >
                    <BrainCircuit className="w-4 h-4 text-indigo-400 animate-pulse" /> AI Mentor
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Pagination Controls Bar */}
      {filteredItems.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-indigo-400 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> –{' '}
            <span className="text-indigo-400 font-bold">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of{' '}
            <span className="text-slate-200 font-bold">{filteredItems.length}</span> problems
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 disabled:opacity-40 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => {
                      setCurrentPage(pg);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                      currentPage === pg
                        ? 'bg-indigo-600 text-white border border-indigo-500'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 disabled:opacity-40 flex items-center gap-1 transition-all"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
