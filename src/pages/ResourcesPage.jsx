import React, { useState, useMemo } from 'react';
import {
  DSA_CHANNELS,
  CHANNEL_CATEGORIES,
  LANGUAGE_FILTERS
} from '../data/dsaChannels';
import {
  ExternalLink,
  Search,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Filter,
  Play,
  Award,
  Layers,
  Compass,
  ArrowRight,
  Video
} from 'lucide-react';

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recommenderGoal, setRecommenderGoal] = useState(null);

  // Recommender profiles for quick guidance
  const GOALS = [
    {
      id: 'placement_sde',
      title: '🎯 Crack SDE Placement',
      desc: 'Rigorous SDE sheet & problem-first optimal solutions',
      matchId: 'takeuforward'
    },
    {
      id: 'leetcode_patterns',
      title: '🚀 Visual LeetCode Patterns',
      desc: 'Whiteboard diagrams in Python without fluff',
      matchId: 'neetcode'
    },
    {
      id: 'theory_proofs',
      title: '🧠 Core Theory & Proofs',
      desc: 'Mathematical intuition on paper for college exams',
      matchId: 'abdul_bari'
    },
    {
      id: 'beginner_hindi',
      title: '🌱 Absolute Beginner in Hindi',
      desc: 'Friendly handholding starting from programming zero',
      matchId: 'love_babbar'
    },
    {
      id: 'java_dsa',
      title: '☕ Dedicated Java Track',
      desc: 'Complete Java + DSA with open-source assignments',
      matchId: 'kunal_kushwaha'
    },
    {
      id: 'graph_advanced',
      title: '🕸️ Advanced Graph & Trees',
      desc: 'Stunning visual algorithmic animations & flow algorithms',
      matchId: 'william_fiset'
    }
  ];

  const filteredChannels = useMemo(() => {
    return DSA_CHANNELS.filter((ch) => {
      // Recommender filter if active
      if (recommenderGoal) {
        if (ch.id !== recommenderGoal.matchId) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && ch.category !== selectedCategory) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'All') {
        const matchesPrimary = ch.primaryLanguage === selectedLanguage;
        const matchesCoding = ch.supportedCodingLanguages.includes(selectedLanguage);
        if (!matchesPrimary && !matchesCoding) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ch.name.toLowerCase().includes(q);
        const matchesCreator = ch.creator.toLowerCase().includes(q);
        const matchesTagline = ch.tagline.toLowerCase().includes(q);
        const matchesPlaylists = ch.signatureOfferings.some(
          (p) => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCreator && !matchesTagline && !matchesPlaylists) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedLanguage, searchQuery, recommenderGoal]);

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#FFDE59] text-black">
            👑 Handpicked Community Leaders
          </span>
          <span className="neo-pill bg-[#A7F3D0] text-black">
            Free Video Courses & SDE Sheets
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase flex items-center gap-3">
            <span>Curated DSA Channels & Resources</span>
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Stop wasting hours hopping between random playlists. We researched and curated the top 9 most authoritative DSA creators globally. Find the exact channel tailored to your learning style, programming language, and placement goal.
          </p>
        </div>
      </div>

      {/* Interactive Channel Matcher Quiz / Fast Recommender */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b-2 border-black/10 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
            <h2 className="font-black text-sm sm:text-base text-black dark:text-white">
              Instant Channel Recommender: What is your primary focus?
            </h2>
          </div>
          {recommenderGoal && (
            <button
              onClick={() => setRecommenderGoal(null)}
              className="neo-btn bg-[#FECDD3] text-black px-3 py-1 text-xs font-black cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px]"
            >
              Clear Goal Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {GOALS.map((goal) => {
            const isSelected = recommenderGoal?.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setRecommenderGoal(isSelected ? null : goal)}
                className={`p-3.5 rounded-2xl border-2 border-black text-left transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
                  isSelected
                    ? 'bg-[#FFDE59] text-black'
                    : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                }`}
              >
                <div className="font-black text-xs">{goal.title}</div>
                <div className="text-[11px] font-medium opacity-80 mt-1 leading-snug">
                  {goal.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-700 dark:text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creator (Striver, NeetCode), playlist, or topic..."
              className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:bg-white"
            />
          </div>

          {/* Quick Language Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black uppercase text-slate-500 mr-1">Language:</span>
            {LANGUAGE_FILTERS.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer shadow-[0_2px_0_0_#18181B] active:translate-y-[1px] ${
                  selectedLanguage === lang
                    ? 'bg-[#FFDE59] text-black'
                    : 'bg-[#FAF6EE] dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-black/10 dark:border-white/10 pb-1">
          {CHANNEL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-black whitespace-nowrap transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
                selectedCategory === cat
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-[#FAF6EE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Channels Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 px-1">
          <span>Showing {filteredChannels.length} authoritative channel{filteredChannels.length !== 1 ? 's' : ''}</span>
          <span>Click any playlist to jump directly to official videos</span>
        </div>

        {filteredChannels.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Avatar, Name, Badge, YouTube Button */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-13 h-13 rounded-2xl border-2 border-black flex items-center justify-center font-black text-xl text-black"
                        style={{ backgroundColor: channel.avatarBg }}
                      >
                        {channel.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-lg text-black dark:text-white">
                            {channel.name}
                          </h3>
                          <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-zinc-800 border border-black/30">
                            {channel.subscribers}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">
                          {channel.creator} • {channel.primaryLanguage}
                        </p>
                      </div>
                    </div>

                    <a
                      href={channel.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn bg-[#FECDD3] text-black px-3 py-1.5 text-xs font-black flex items-center gap-1.5 shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] cursor-pointer"
                    >
                      <YoutubeIcon className="w-4 h-4 text-red-600" />
                      <span>YouTube Channel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Badge & Coding Languages */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="neo-pill bg-[#FFDE59] text-black text-[10px]">
                      {channel.badge}
                    </span>
                    {channel.supportedCodingLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white border border-black/30"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium mt-2.5 leading-relaxed">
                    {channel.tagline}
                  </p>

                  {/* Recommended For Callout */}
                  <div className="mt-3 p-3 bg-[#FAF6EE] dark:bg-zinc-800/80 rounded-2xl border border-black/20 dark:border-zinc-700 text-xs">
                    <span className="font-black text-black dark:text-white block mb-0.5">
                      💡 Ideal Match:
                    </span>
                    <p className="text-slate-800 dark:text-zinc-300 font-medium">
                      {channel.recommendedFor}
                    </p>
                  </div>

                  {/* Strengths List */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-zinc-400 block">
                      Core Strengths:
                    </span>
                    {channel.strengths.map((str, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-xs font-medium text-slate-700 dark:text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature Playlists / Offerings */}
                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-black dark:text-white block">
                    Must-Watch Playlists & Sheets:
                  </span>
                  <div className="space-y-1.5">
                    {channel.signatureOfferings.map((offering, idx) => (
                      <a
                        key={idx}
                        href={offering.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-2.5 rounded-xl border border-black/30 dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800/60 hover:bg-[#FFDE59] dark:hover:bg-amber-400 hover:text-black transition-all flex items-center justify-between gap-2 shadow-[0_2px_0_0_#18181B] active:translate-y-[1px] cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="font-black text-xs text-black dark:text-white group-hover:text-black flex items-center gap-1.5">
                            <Play className="w-3 h-3 fill-current shrink-0" />
                            <span className="truncate">{offering.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-zinc-400 group-hover:text-black font-medium truncate mt-0.5">
                            {offering.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-black dark:text-white group-hover:text-black shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              No channels match your current search or filters. Try clicking "Clear Goal Filter" or searching for "Striver" or "NeetCode".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
