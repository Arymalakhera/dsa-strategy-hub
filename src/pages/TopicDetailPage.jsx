import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPIC_MAP, TOPICS } from '../data/topics';
import { PROBLEMS } from '../data/problems';
import { ProblemCard } from '../components/ProblemCard';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';
import {
  ArrowLeft,
  Sparkles,
  Search,
  Layers,
  ChevronRight,
  Filter,
  Target,
  Star
} from 'lucide-react';

const COMPANIES = ['All', 'Amazon', 'Microsoft', 'Flipkart', 'Adobe', 'TCS', 'Infosys', 'Wipro'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];
const TAGS = ['All', 'Must', 'Good', 'Bonus'];
const STATUSES = ['All', 'not_started', 'solved', 'struggled'];

export const TopicDetailPage = ({
  progressMap = {},
  notesMap = {},
  onOpenHints,
  onOpenNote,
  onMarkStatus
}) => {
  const { topicId } = useParams();
  const topic = TOPIC_MAP[topicId] || TOPICS[0];

  const [mustOnlyMode, setMustOnlyMode] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all problems for this topic
  const topicProblems = useMemo(() => {
    return PROBLEMS.filter((p) => p.topicId === topic.id);
  }, [topic.id]);

  // Compute progress for this topic
  const solvedCount = topicProblems.filter(
    (p) => progressMap[p.id]?.status === 'solved'
  ).length;

  const mustProblems = topicProblems.filter((p) => p.tag === 'Must');
  const mustSolvedCount = mustProblems.filter(
    (p) => progressMap[p.id]?.status === 'solved'
  ).length;

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return topicProblems.filter((p) => {
      // Must-only mode toggle
      if (mustOnlyMode && p.tag !== 'Must') return false;

      // Difficulty filter
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;

      // Tag filter
      if (selectedTag !== 'All' && p.tag !== selectedTag) return false;

      // Company filter
      if (selectedCompany !== 'All' && !p.companyTags?.includes(selectedCompany)) return false;

      // Status filter
      const pStatus = progressMap[p.id]?.status || 'not_started';
      if (selectedStatus !== 'All' && pStatus !== selectedStatus) return false;

      // Search query (title, LC number, pattern)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLc = String(p.lcNumber).includes(q);
        const matchesPattern = p.pattern.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLc && !matchesPattern) return false;
      }

      return true;
    });
  }, [topicProblems, mustOnlyMode, selectedDifficulty, selectedTag, selectedCompany, selectedStatus, searchQuery, progressMap]);

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Back button and breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-zinc-300">
        <Link
          to="/roadmap"
          className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-2.5 py-1 text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} /> Back to Roadmap
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-black dark:text-white font-black">{topic.name}</span>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="neo-pill bg-[#FFDE59] text-black">
                Topic #{topic.order}
              </span>
              <span className={`neo-pill ${
                topic.importance === 'Tier 1'
                  ? 'bg-[#FECDD3] text-black'
                  : topic.importance === 'Tier 2'
                  ? 'bg-[#FEF08A] text-black'
                  : 'bg-[#A7F3D0] text-black'
              }`}>
                {topic.importance}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white">
              {topic.name}
            </h1>
          </div>

          <div className="w-full sm:w-72 bg-[#FAF6EE] dark:bg-zinc-800 p-3.5 rounded-2xl border-2 border-black/80 dark:border-zinc-700">
            <ProgressBar
              completed={solvedCount}
              total={topicProblems.length}
              label="Topic Completion"
              color="mint"
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium leading-relaxed">
          {topic.shortSummary}
        </p>

        {/* Patterns list */}
        <div className="pt-3 border-t border-black/10 dark:border-white/10">
          <span className="text-xs font-black text-black dark:text-white flex items-center gap-1.5 mb-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" strokeWidth={2.5} /> Core Patterns to recognize in {topic.name}:
          </span>
          <div className="flex flex-wrap gap-2">
            {topic.patterns?.map((pattern, idx) => (
              <span
                key={idx}
                className="text-xs font-bold px-3 py-1 rounded-xl bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white border border-black/30 dark:border-zinc-600 flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{pattern}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Toolbar (Clean & Easy to Use) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-700 dark:text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem title, #, or pattern..."
              className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:bg-white"
            />
          </div>

          {/* Must-only mode toggle button */}
          <button
            onClick={() => setMustOnlyMode(!mustOnlyMode)}
            className={`neo-btn px-4 py-2 text-xs font-black transition-all shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] flex items-center gap-1.5 ${
              mustOnlyMode
                ? 'bg-[#FFDE59] text-black'
                : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-black text-black" />
            <span>MUST-Only Mode</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black text-white font-black">
              {mustProblems.length}
            </span>
          </button>
        </div>

        {/* Filter Dropdowns with bold labels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-black/10 dark:border-white/10">
          {/* Difficulty */}
          <div>
            <label className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs font-bold py-1.5 px-2.5 rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Tag */}
          <div>
            <label className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              Tag / Priority
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full text-xs font-bold py-1.5 px-2.5 rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Tags' : t}</option>
              ))}
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              Company Tag
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full text-xs font-bold py-1.5 px-2.5 rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
            >
              {COMPANIES.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Companies' : c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider block mb-1">
              My Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-bold py-1.5 px-2.5 rounded-xl border-2 border-black dark:border-zinc-600 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="solved">Solved</option>
              <option value="struggled">Struggled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problem Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 px-1">
          <span>Showing {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}</span>
          <span>Click "4-Step Hints" for intuition without spoilers</span>
        </div>

        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                progress={progressMap[problem.id]}
                userNote={notesMap[problem.id]}
                onOpenHints={onOpenHints}
                onOpenNote={onOpenNote}
                onMarkStatus={onMarkStatus}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No problems match your filters"
            description="Try changing the difficulty, company tag, or turning off Must-only mode."
            actionLabel="Reset All Filters"
            onAction={() => {
              setMustOnlyMode(false);
              setSelectedDifficulty('All');
              setSelectedTag('All');
              setSelectedCompany('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>
    </div>
  );
};
