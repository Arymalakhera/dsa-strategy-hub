import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Problem, RoadmapItem, ProblemStatus } from '../types';
import { FIXED_TOPIC_SEQUENCE } from '../lib/roadmapGenerator';
import { ExternalLink, BrainCircuit, CheckCircle2, Circle, Clock, Plus, Filter, Search, Sparkles, RefreshCw, Trophy, Flame, ChevronLeft, ChevronRight, Sliders, Trash2, Code, Building2, Compass, Layers, Undo2 } from 'lucide-react';

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
  themeMode?: 'mint' | 'glass';
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
  isSyncing,
  themeMode = 'mint'
}) => {
  const [viewMode, setViewMode] = useState<'roadmap' | 'all'>('roadmap');
  const [selectedPhase, setSelectedPhase] = useState<number | 'All'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [removedItem, setRemovedItem] = useState<{ id: string; title: string } | null>(null);
  const [undoTimerProgress, setUndoTimerProgress] = useState<number>(100);
  const [justSolvedId, setJustSolvedId] = useState<string | null>(null);
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const undoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleRemoveProblemWithUndo = (problemId: string, title: string) => {
    onToggleRoadmapProblem(problemId);
    setConfirmDeleteId(null);

    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);

    setRemovedItem({ id: problemId, title });
    setUndoTimerProgress(100);

    const startTime = Date.now();
    const duration = 3000;

    undoIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setUndoTimerProgress(remaining);
    }, 50);

    undoTimeoutRef.current = setTimeout(() => {
      setRemovedItem(null);
      if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    }, duration);
  };

  const handleUndoRemove = () => {
    if (removedItem) {
      onToggleRoadmapProblem(removedItem.id);
      setRemovedItem(null);
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
      if (undoIntervalRef.current) clearInterval(undoIntervalRef.current);
    }
  };

  const handleStatusChangeWithFeedback = (leetcodeId: string, newStatus: ProblemStatus, hintStage: number = 0) => {
    if (newStatus === 'solved') {
      setJustSolvedId(leetcodeId);
      setTimeout(() => setJustSolvedId(null), 2000);
    }
    onStatusChange(leetcodeId, newStatus, hintStage);
  };

  const problemSectionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll and show toast notification when roadmap changes or generates
  useEffect(() => {
    if (roadmap.length > 0) {
      setToastMessage(`Roadmap Updated! ${roadmap.length} Tailored Problems Recommended.`);

      if (window.scrollY > 250) {
        problemSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [roadmap]);

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
      topicOrder: p.topicOrder || 1,
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

    const matchesPhase = selectedPhase === 'All' || p.topicOrder === selectedPhase;
    const matchesTopic = selectedTopic === 'All' || p.topics.includes(selectedTopic);
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    // When searching, search across ALL problems in database
    if (cleanQuery) {
      const matchesSearch =
        p.id.toLowerCase() === cleanQuery ||
        p.id.toLowerCase().includes(cleanQuery) ||
        p.title.toLowerCase().includes(cleanQuery) ||
        (p.slug && p.slug.toLowerCase().includes(cleanQuery)) ||
        p.topics.some((t) => t.toLowerCase().includes(cleanQuery)) ||
        (p.companyTags && p.companyTags.some((c) => c.toLowerCase().includes(cleanQuery)));

      return matchesSearch && matchesPhase && matchesTopic && matchesDiff && matchesCompany;
    }

    // View Mode filtering
    const inRoadmap = viewMode === 'all' || roadmapMap.has(p.id);
    return inRoadmap && matchesPhase && matchesTopic && matchesDiff && matchesCompany;
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

  // Reset to page 1 whenever search query, view mode, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, viewMode, selectedPhase, selectedTopic, selectedDifficulty]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const solvedCount = roadmap.filter((r) => r.status === 'solved').length;
  const progressPercent = roadmap.length > 0 ? Math.round((solvedCount / roadmap.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Home Hero Banner - Conditional Rendering based on themeMode */}
      {themeMode === 'glass' ? (
        <div className="dribbble-glass-card p-6 sm:p-10 rounded-[2.5rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden text-white dribbble-glow-border">
          {/* Left Hero Content inspired by "Nature's Perfect Hideaways" image */}
          <div className="space-y-5 z-10 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> WoodNest // Socratic AI Mentor
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Nature&apos;s Perfect <br />
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Socratic Algorithmic Mastery
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed max-w-lg">
              Discover handpicked LeetCode patterns in breathtaking topics. Unplug from brute-force copy-pasting, unwind, and reconnect with core Socratic intuition.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Star Rating Badge (matching image: ★ 4.7 from 1,800+ stays) */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#062936]/80 border border-cyan-400/30 backdrop-blur-md">
                <span className="text-amber-400 font-bold text-sm">★ 4.9</span>
                <span className="text-xs text-cyan-100/80 font-medium">from 1,800+ Socratic Solved Problems</span>
              </div>

              <button
                onClick={onOpenOnboarding}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/20 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-slate-950" /> Personalize Roadmap
              </button>
            </div>
          </div>

          {/* Right Glass Widget Card (inspired directly by the "Evergreen Pine Family Lodge" glass card in the reference image!) */}
          <div className="w-full lg:w-[340px] z-10 shrink-0">
            <div className="dribbble-glass-card bg-[#051F2A]/90 p-6 rounded-3xl border border-cyan-400/35 shadow-2xl space-y-4 relative">
              <div className="flex items-center justify-between border-b border-cyan-400/20 pb-3">
                <div>
                  <div className="text-[10px] text-cyan-300/80 font-mono font-bold uppercase tracking-wider">// Active Lodge</div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Evergreen Socratic Roadmap
                  </h3>
                </div>
                <button onClick={onOpenCustomizer} className="p-1.5 rounded-full bg-white/10 text-cyan-300 hover:bg-white/20">
                  <Sliders className="w-4 h-4" />
                </button>
              </div>

              {/* Date & Check-in Parameters (matching image Feb 11 - Mar 25 layout!) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-[#03151D]/80 border border-cyan-400/20 space-y-1">
                  <div className="text-[10px] text-cyan-300/70 font-mono">Target Range</div>
                  <div className="font-bold text-white">Feb 11 – Mar 25</div>
                </div>
                <div className="p-3 rounded-2xl bg-[#03151D]/80 border border-cyan-400/20 space-y-1">
                  <div className="text-[10px] text-cyan-300/70 font-mono">Daily Target</div>
                  <div className="font-bold text-white">2 Problems / Day</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-cyan-200/80">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  Check-in: <strong className="text-white">After Hint 1</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  Check-out: <strong className="text-white font-mono">O(N) Optimal</strong>
                </div>
              </div>

              {/* Price & Solvers Tag ($359/night in image -> 250 pts / Hard Problem badge) */}
              <div className="flex items-center justify-between pt-2 border-t border-cyan-400/20">
                <div>
                  <span className="text-xl font-black text-white">$250</span>
                  <span className="text-xs text-cyan-300/80 font-medium"> pts/Hard</span>
                  <div className="text-[10px] text-cyan-300/60">2-6 topic clusters</div>
                </div>

                <button
                  onClick={() => {
                    problemSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-slate-950 font-extrabold text-xs hover:bg-cyan-100 transition-all shadow-lg hover:scale-105"
                >
                  Reserve &amp; Solve
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="oceanic-hero-gradient p-6 sm:p-10 rounded-[2.5rem] border border-[#70D6D1]/20 shadow-2xl warm-card-glow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden text-white">
          <div className="space-y-5 z-10 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-[#70D6D1]/15 text-[#70D6D1] border border-[#70D6D1]/30 text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#70D6D1] animate-pulse" /> // SOCRATIC AI &amp; PERSONALIZED ROADMAP
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Master DSA Patterns <br className="hidden sm:inline" />
              <span className="font-serif-header italic font-normal text-[#70D6D1]">
                Through Guided Socratic Intuition.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#C2E8E8] leading-relaxed max-w-lg">
              Practice 161+ curated NeetCode &amp; Blind 75 problems. Learn to reason through optimal data structures step-by-step without copy-pasting solution code.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenOnboarding}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center gap-2.5 transition-all shadow-xl shadow-[#00A896]/30 hover:scale-[1.03]"
              >
                <Sparkles className="w-4 h-4 text-white" /> Personalize My Roadmap
              </button>

              <button
                onClick={() => {
                  setViewMode('all');
                  problemSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all border border-white/20"
              >
                <Code className="w-4 h-4 text-[#70D6D1]" /> Explore 161 Problems
              </button>
            </div>
          </div>

          {/* Hero Right Graphic Card & Progress Gauge */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-4 w-full lg:w-auto z-10 shrink-0">
            {/* Progress Gauge */}
            <div className="bg-[#052630]/80 p-6 rounded-3xl border border-[#70D6D1]/20 flex items-center gap-6 min-w-[260px] shadow-xl backdrop-blur-md">
              <div className="space-y-1">
                <div className="text-[10px] text-[#A2D2D2] font-bold uppercase tracking-widest">// Roadmap Progress</div>
                <div className="text-4xl font-black text-white">{progressPercent}%</div>
                <div className="text-[11px] text-[#C2E8E8] font-medium">{solvedCount} of {roadmap.length} Solved</div>
              </div>
              <div className="flex-1 bg-[#094154] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#70D6D1]/30">
                <div
                  className="bg-gradient-to-r from-[#00A896] via-[#70D6D1] to-[#00C9A7] h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="relative hidden sm:flex flex-col justify-between p-5 rounded-3xl bg-[#052630]/80 border border-[#70D6D1]/20 shadow-2xl backdrop-blur-md overflow-hidden min-w-[260px]">
              <div className="flex items-center justify-between border-b border-[#70D6D1]/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A896]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#70D6D1]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#028090]" />
                </div>
                <span className="text-[10px] font-mono text-[#70D6D1] font-bold bg-[#073A47] px-2.5 py-0.5 rounded-full border border-[#70D6D1]/30">
                  Socratic AI Stage 3
                </span>
              </div>

              <div className="bg-[#E6F4F5] text-[#072A36] rounded-2xl p-4 my-3 flex items-center justify-between shadow-lg border border-[#70D6D1]/30">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#3B6674]">Next Recommendation</div>
                  <div className="text-xs font-black text-[#072A36] line-clamp-1">Personalized Socratic Guidance</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] text-white flex items-center justify-center shrink-0 shadow-md">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#A2D2D2] font-mono">
                <span>Mode: Guided Hints</span>
                <span className="text-[#70D6D1] font-bold">Copy-Paste Safe</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="mint-glass-card rounded-3xl p-6 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-[#0F7A8D]/30 transition-all">
          <div className="p-3.5 rounded-2xl bg-[#D2F1F0] text-[#074554] border border-[#70D6D1]/40 shrink-0">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#072A36]">{allProblems.length}+</div>
            <div className="text-xs text-[#3B6674] font-medium">LeetCode Problems Available</div>
          </div>
        </div>

        <div className="mint-glass-card rounded-3xl p-6 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-[#0F7A8D]/30 transition-all">
          <div className="p-3.5 rounded-2xl bg-[#0B4F6C]/10 text-[#0B4F6C] border border-[#0B4F6C]/20 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#072A36]">14 Phases</div>
            <div className="text-xs text-[#3B6674] font-medium">Fixed Progression Sequence</div>
          </div>
        </div>

        <div className="mint-glass-card rounded-3xl p-6 text-center sm:text-left flex items-center gap-4 shadow-lg hover:border-[#0F7A8D]/30 transition-all">
          <div className="p-3.5 rounded-2xl bg-[#00A896]/15 text-[#00A896] border border-[#00A896]/30 shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#072A36]">5 FAANG</div>
            <div className="text-xs text-[#3B6674] font-medium">Companies Tagged (Amazon, Meta, Google)</div>
          </div>
        </div>
      </div>

      {/* 4 Feature Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mint-glass-card rounded-3xl p-6 space-y-3 hover:border-[#0F7A8D]/40 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-3 rounded-2xl bg-[#D2F1F0] text-[#074554] border border-[#70D6D1]/40 w-max">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#072A36]">Socratic AI Mentor</h3>
          <p className="text-xs text-[#3B6674] leading-relaxed">
            5-stage guided hints to build deep algorithmic intuition without spoiling code answers.
          </p>
        </div>

        <div className="mint-glass-card rounded-3xl p-6 space-y-3 hover:border-[#0F7A8D]/40 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-3 rounded-2xl bg-[#0B4F6C]/10 text-[#0B4F6C] border border-[#0B4F6C]/20 w-max">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#072A36]">FAANG Company Prep</h3>
          <p className="text-xs text-[#3B6674] leading-relaxed">
            Filter questions asked by Meta, Amazon, Google, Apple &amp; Microsoft.
          </p>
        </div>

        <div className="mint-glass-card rounded-3xl p-6 space-y-3 hover:border-[#0F7A8D]/40 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-3 rounded-2xl bg-[#00A896]/15 text-[#00A896] border border-[#00A896]/30 w-max">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#072A36]">Personalized Roadmap</h3>
          <p className="text-xs text-[#3B6674] leading-relaxed">
            Customized topic order, difficulty mix, and completion date calculator.
          </p>
        </div>

        <div className="mint-glass-card rounded-3xl p-6 space-y-3 hover:border-[#0F7A8D]/40 hover:scale-[1.02] transition-all shadow-md">
          <div className="p-3 rounded-2xl bg-[#70D6D1]/30 text-[#074D5E] border border-[#70D6D1]/50 w-max">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#072A36]">Streaks &amp; Badges</h3>
          <p className="text-xs text-[#3B6674] leading-relaxed">
            Earn points, unlock milestones, and build daily problem-solving habits.
          </p>
        </div>
      </div>

      {/* View Mode Switcher Tabs & Topic Phase Sequence Navigator */}
      <div ref={problemSectionRef} id="problem-section" className="space-y-4 scroll-mt-6">
        {/* Primary View Switcher: Personalized Roadmap vs Browse All Problems */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mint-glass-card p-3 rounded-full shadow-xl">
          <div className="flex items-center gap-2 bg-[#E0F4F4]/80 p-1.5 rounded-full border border-[#0F7A8D]/20">
            <button
              onClick={() => {
                setViewMode('roadmap');
                setSelectedPhase('All');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                viewMode === 'roadmap'
                  ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md font-bold'
                  : 'text-[#3B6674] hover:text-[#072A36] hover:bg-white/60'
              }`}
            >
              <Compass className="w-4 h-4 text-white" />
              <span>My Personalized Roadmap</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#072A36] text-[10px] font-mono font-bold text-[#70D6D1]">
                {roadmap.length}
              </span>
            </button>

            <button
              onClick={() => {
                setViewMode('all');
                setSelectedPhase('All');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                viewMode === 'all'
                  ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md font-bold'
                  : 'text-[#3B6674] hover:text-[#072A36] hover:bg-white/60'
              }`}
            >
              <Code className="w-4 h-4 text-white" />
              <span>Browse All Problems</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#072A36] text-[10px] font-mono font-bold text-[#70D6D1]">
                {allProblems.length}
              </span>
            </button>
          </div>

          {/* Title & Description Status Tag */}
          <div className="px-4 py-1 flex items-center gap-2 text-xs font-semibold text-[#3B6674]">
            {viewMode === 'roadmap' ? (
              <span className="text-[#00A896] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Customized for your quiz answers &amp; timeline
              </span>
            ) : (
              <span className="text-[#0B4F6C] font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" /> Full 161 LeetCode Database Bank
              </span>
            )}
          </div>
        </div>

        {/* 14-Topic Sequence Phase Navigator Pills */}
        <div className="mint-glass-card p-4 rounded-3xl space-y-3 shadow-md">
          <div className="flex items-center justify-between text-[11px] text-[#3B6674] font-bold px-1">
            <span className="flex items-center gap-2 text-[#0B4F6C] uppercase tracking-widest font-mono">
              <Layers className="w-4 h-4" /> // TOPIC SEQUENCE BACKBONE (PHASES 1 – 14)
            </span>
            <span className="text-[#3B6674] font-normal italic">Easy → Medium → Hard within each phase</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedPhase('All')}
              className={`px-4 py-2 rounded-full border text-xs font-bold shrink-0 transition-all ${
                selectedPhase === 'All'
                  ? 'bg-[#072A36] text-white border-[#072A36] shadow-md'
                  : 'bg-white/80 border-[#0F7A8D]/20 text-[#3B6674] hover:text-[#072A36] hover:bg-white'
              }`}
            >
              All 14 Phases
            </button>

            {FIXED_TOPIC_SEQUENCE.map((seq) => (
              <button
                key={seq.topicOrder}
                onClick={() => setSelectedPhase(seq.topicOrder)}
                className={`px-4 py-2 rounded-full border text-xs font-semibold shrink-0 flex items-center gap-2 transition-all ${
                  selectedPhase === seq.topicOrder
                    ? 'bg-[#072A36] text-white border-[#072A36] shadow-md font-bold'
                    : 'bg-white/80 border-[#0F7A8D]/20 text-[#3B6674] hover:text-[#072A36] hover:bg-white'
                }`}
              >
                <span className="w-4.5 h-4.5 rounded-full bg-[#E0F4F4] text-[10px] font-mono font-bold flex items-center justify-center text-[#074554]">
                  {seq.topicOrder}
                </span>
                <span>{seq.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mint-glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#3B6674]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, LeetCode #, topic, or company..."
              className="w-full bg-white border border-[#0F7A8D]/25 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#072A36] placeholder-[#7A9EA6] focus:outline-none focus:border-[#00A896] shadow-sm"
            />
          </div>

          {/* Topic, Difficulty & Company Selectors */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-white border border-[#0F7A8D]/25 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B4F6C] focus:outline-none focus:border-[#00A896] shadow-sm"
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
              className="bg-white border border-[#0F7A8D]/25 rounded-xl px-3 py-2 text-xs text-[#072A36] focus:outline-none focus:border-[#00A896] shadow-sm"
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
              className="bg-white border border-[#0F7A8D]/25 rounded-xl px-3 py-2 text-xs text-[#072A36] focus:outline-none focus:border-[#00A896] shadow-sm"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Customize Roadmap Button */}
            <button
              onClick={onOpenCustomizer}
              className="px-4 py-2 rounded-xl bg-[#00A896]/15 hover:bg-[#00A896]/25 border border-[#00A896]/30 text-[#008080] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Customize topic order, difficulty mix, and daily targets"
            >
              <Sliders className="w-3.5 h-3.5 text-[#008080]" /> Customize
            </button>

            {/* Re-sync Button */}
            <button
              onClick={onResyncRoadmap}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-[#0B4F6C]/10 hover:bg-[#0B4F6C]/20 border border-[#0B4F6C]/20 text-[#0B4F6C] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
              title="Re-fetch user roadmap status from Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#0B4F6C] ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Re-sync'}
            </button>
          </div>
        </div>
      </div>

      {/* Problem List Cards / Empty State / Skeleton Loaders */}
      <div className="grid grid-cols-1 gap-3">
        {isSyncing ? (
          // Skeleton Loader Cards during Syncing/Loading
          [1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-[#0F7A8D]/20 bg-white/70 animate-pulse flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-10 bg-slate-200 rounded" />
                  <div className="h-5 w-48 bg-slate-300 rounded" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
                <div className="h-3 w-3/4 bg-slate-200 rounded" />
              </div>
              <div className="h-8 w-28 bg-slate-300 rounded-xl" />
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          // Friendly Glassmorphism Empty Search State
          <div className="mint-glass-card rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#00A896]/20 text-[#00A896] border border-[#00A896]/30 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#072A36]">
                {searchQuery ? `No problems match "${searchQuery}"` : 'No problems found'}
              </h3>
              <p className="text-xs text-[#3B6674] max-w-md mx-auto">
                Try searching by LeetCode number (e.g. <span className="text-[#00A896] font-mono font-bold">1</span>, <span className="text-[#00A896] font-mono font-bold">48</span>, <span className="text-[#00A896] font-mono font-bold">146</span>), or browse popular topics below:
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
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#E0F4F4] border border-[#0F7A8D]/20 text-xs font-semibold text-[#072A36] transition-all"
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
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00A896] to-[#028090] text-white text-xs font-bold transition-all shadow-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {paginatedItems.map((item, idx) => {
              const p = item.problem!;
              const isJustSolved = justSolvedId === p.id;

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.015 }}
                  className={`p-5 pl-6 rounded-2xl border border-l-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative overflow-hidden ${
                    p.difficulty === 'Easy'
                      ? 'border-l-[#00A896]'
                      : p.difficulty === 'Medium'
                      ? 'border-l-[#0F6B7B]'
                      : 'border-l-[#072A36]'
                  } ${
                    item.status === 'solved'
                      ? 'bg-[#EBF7F7]/95 border-[#70D6D1]/40 shadow-sm'
                      : item.status === 'attempted'
                      ? 'bg-[#F4FAFA] border-[#0F7A8D]/25 shadow-sm'
                      : 'bg-white border-[#0F7A8D]/15 hover:border-[#0F7A8D]/35 hover:shadow-md'
                  }`}
                >
                  {/* Instant Solved Feedback Pop Badge */}
                  <AnimatePresence>
                    {isJustSolved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -10 }}
                        animate={{ opacity: 1, scale: 1.1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        className="absolute top-2 right-2 bg-gradient-to-r from-[#00A896] to-[#028090] text-white px-3 py-1 rounded-full font-black text-xs shadow-lg flex items-center gap-1 z-20"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Solved! +{p.difficulty === 'Easy' ? 10 : p.difficulty === 'Medium' ? 20 : 35} PTS
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Problem Meta */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#3B6674]">#{p.id}</span>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base text-[#072A36] hover:text-[#00A896] flex items-center gap-1.5 transition-colors"
                      >
                        {p.title}
                        <ExternalLink className="w-3.5 h-3.5 text-[#3B6674] hover:text-[#00A896]" />
                      </a>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.difficulty === 'Easy'
                            ? 'bg-[#E0F4F4] text-[#008080] border border-[#70D6D1]/40'
                            : p.difficulty === 'Medium'
                            ? 'bg-[#E5F3F4] text-[#0F6B7B] border border-[#0F6B7B]/30'
                            : 'bg-[#072A36] text-white border border-[#072A36]'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-[#3B6674] line-clamp-1">{p.descriptionSnippet}</p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {p.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-0.5 rounded-full bg-[#EBF7F7] border border-[#70D6D1]/30 text-[10px] font-medium text-[#074554]"
                        >
                          {topic}
                        </span>
                      ))}

                      {p.companyTags && p.companyTags.map((comp) => (
                        <span
                          key={comp}
                          className="px-2.5 py-0.5 rounded-full bg-[#00A896]/15 border border-[#00A896]/30 text-[10px] font-bold text-[#008080] flex items-center gap-1"
                        >
                          🏢 {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Controls & AI Mentor Action */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-[#0F7A8D]/15 pt-2 sm:pt-0">
                    {/* Single Status Dropdown Pill */}
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChangeWithFeedback(p.id, e.target.value as ProblemStatus, item.hintStage)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all outline-none cursor-pointer border ${
                        item.status === 'solved'
                          ? 'bg-[#00A896] border-[#00A896] text-white'
                          : item.status === 'attempted'
                          ? 'bg-[#0F6B7B]/15 border-[#0F6B7B]/30 text-[#0F6B7B]'
                          : 'bg-white border-[#0F7A8D]/25 text-[#3B6674] hover:text-[#072A36]'
                      }`}
                    >
                      <option value="unsolved" className="bg-white text-[#3B6674] font-bold uppercase">⚪ Unsolved</option>
                      <option value="attempted" className="bg-white text-[#0F6B7B] font-bold uppercase">🟡 Attempted</option>
                      <option value="solved" className="bg-white text-[#00A896] font-bold uppercase">🟢 Solved</option>
                    </select>

                    {/* Add / Remove from Roadmap */}
                    {roadmapMap.has(p.id) ? (
                      confirmDeleteId === p.id ? (
                        <div className="flex items-center gap-1 bg-white border border-rose-300 p-1 rounded-full shadow-sm">
                          <span className="text-[10px] text-rose-600 font-bold px-1.5">Remove?</span>
                          <button
                            onClick={() => handleRemoveProblemWithUndo(p.id, p.title)}
                            className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] transition-colors"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove from my roadmap"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => onToggleRoadmapProblem(p.id)}
                        className="px-3 py-1.5 rounded-full bg-[#00A896]/15 hover:bg-[#00A896]/25 border border-[#00A896]/30 text-[#008080] text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
                        title="Add this problem to my personalized roadmap"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#008080]" /> + Add
                      </button>
                    )}

                    {/* Socratic AI Mentor Pill Button */}
                    <button
                      onClick={() => onOpenSocraticChat(p, item.hintStage)}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#00A896]/20 hover:scale-105"
                    >
                      <BrainCircuit className="w-4 h-4 text-white" /> AI Mentor
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination Controls Bar */}
      {filteredItems.length > 0 && (
        <div className="mint-glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-xs text-[#3B6674] font-mono">
            Showing <span className="text-[#00A896] font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> –{' '}
            <span className="text-[#00A896] font-bold">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of{' '}
            <span className="text-[#072A36] font-bold">{filteredItems.length}</span> problems
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => Math.max(1, prev - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-1.5 rounded-full bg-white border border-[#0F7A8D]/20 hover:bg-[#E0F4F4] text-xs text-[#072A36] font-bold disabled:opacity-40 flex items-center gap-1 transition-all shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => {
                      setCurrentPage(pg);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-7 h-7 rounded-full text-xs font-bold font-mono transition-all ${
                      currentPage === pg
                        ? 'bg-gradient-to-r from-[#00A896] to-[#028090] text-white shadow-md'
                        : 'bg-white border border-[#0F7A8D]/20 text-[#3B6674] hover:text-[#072A36]'
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
                className="px-4 py-1.5 rounded-full bg-white border border-[#0F7A8D]/20 hover:bg-[#E0F4F4] text-xs text-[#072A36] font-bold disabled:opacity-40 flex items-center gap-1 transition-all shadow-sm"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3-Second Floating Undo Toast Banner */}
      <AnimatePresence>
        {removedItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#072A36] text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-2.5 min-w-[300px] border border-[#70D6D1]/30"
          >
            <div className="flex items-center justify-between gap-3 text-xs font-semibold">
              <span className="text-[#C2E8E8] line-clamp-1">Removed <strong className="text-white">&quot;{removedItem.title}&quot;</strong></span>
              <button
                onClick={handleUndoRemove}
                className="px-3.5 py-1.5 bg-[#00A896] hover:bg-[#00C9A7] text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
              >
                <Undo2 className="w-3.5 h-3.5 text-white" /> Undo
              </button>
            </div>
            {/* 3-Second Shrinking Progress Bar */}
            <div className="w-full bg-[#094154] h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#00A896] to-[#70D6D1] h-full transition-all duration-75"
                style={{ width: `${undoTimerProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Floating Toast Banner when Roadmap updates */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#072A36] text-white border border-[#70D6D1]/40 px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-4 text-xs font-bold warm-pill-glow"
          >
            <Sparkles className="w-4 h-4 text-[#70D6D1] animate-pulse shrink-0" />
            <span className="font-extrabold text-white">{toastMessage}</span>
            <button
              onClick={() => problemSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="px-4 py-1.5 bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] text-white rounded-full text-[11px] font-bold transition-all shadow-md shrink-0 hover:scale-105"
            >
              View Problems ↓
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
