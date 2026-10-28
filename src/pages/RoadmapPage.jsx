import React from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../data/topics';
import { PROBLEMS } from '../data/problems';
import { ProgressBar } from '../components/ProgressBar';
import {
  Layers,
  Hash,
  Type,
  Search,
  SquareStack,
  ArrowDownUp,
  Link as LinkIcon,
  GitFork,
  GitCommit,
  Boxes,
  Sparkles,
  Network,
  Cpu,
  Binary,
  ArrowRight,
  Star
} from 'lucide-react';

const ICON_MAP = {
  Layers,
  Hash,
  Type,
  Search,
  SquareStack,
  ArrowDownUp,
  Link: LinkIcon,
  GitFork,
  GitCommit,
  Boxes,
  Sparkles,
  Network,
  Cpu,
  Binary
};

export const RoadmapPage = ({ progressMap = {} }) => {
  // Compute overall stats
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

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#FFDE59] text-black">
            Sequenced Placement Curriculum
          </span>
          <span className="neo-pill bg-[#A7F3D0] text-black">
            {TOPICS.length} Core Topics
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            Curated {TOPICS.length}-Topic DSA Roadmap
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Follow this battle-tested sequence. Master the high-yield <strong>MUST</strong> problems first to lock down core algorithmic intuition before tackling Good and Bonus challenges.
          </p>

          {/* Overall Progress Bars */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FAF6EE] dark:bg-zinc-800 rounded-2xl border-2 border-black/80 dark:border-zinc-700">
              <ProgressBar
                completed={mustSolved}
                total={mustTotal}
                label="MUST Problems (Core Interview Target)"
                color="yellow"
              />
            </div>
            <div className="p-4 bg-[#FAF6EE] dark:bg-zinc-800 rounded-2xl border-2 border-black/80 dark:border-zinc-700">
              <ProgressBar
                completed={totalSolved}
                total={totalProblems}
                label="Overall Problem Bank Completion"
                color="mint"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 16 Topics Ordered Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Sequenced Topic Flow (1 to {TOPICS.length})</span>
          </h2>
          <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 px-3 py-1 rounded-full border-2 border-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Click any card to view problems & 4-step hint ladder</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {TOPICS.map((topic, index) => {
            const Icon = ICON_MAP[topic.icon] || Layers;
            const topicProblems = PROBLEMS.filter((p) => p.topicId === topic.id);
            const topicMustProblems = topicProblems.filter((p) => p.tag === 'Must');

            const solvedInTopic = topicProblems.filter(
              (p) => progressMap[p.id]?.status === 'solved'
            ).length;

            const mustSolvedInTopic = topicMustProblems.filter(
              (p) => progressMap[p.id]?.status === 'solved'
            ).length;

            return (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className="group p-5 rounded-2xl border-2 border-black bg-white dark:bg-[#1C1D22] shadow-[0_3.5px_0_0_#18181B] dark:shadow-[0_3.5px_0_0_#3F3F46] hover:translate-y-[-1px] hover:shadow-[0_5px_0_0_#18181B] dark:hover:shadow-[0_5px_0_0_#52525B] active:translate-y-[2.5px] active:shadow-[0_0.5px_0_0_#18181B] transition-all flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div>
                  {/* Card Header: Sequence Number, Name, Importance */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center font-black text-sm">
                        <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-black dark:text-white bg-[#FAF6EE] dark:bg-zinc-800 px-1.5 py-0.2 rounded border border-black/30">
                            #{index + 1}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border-2 border-black ${
                            topic.importance === 'Tier 1'
                              ? 'bg-[#FECDD3] text-black'
                              : topic.importance === 'Tier 2'
                              ? 'bg-[#FEF08A] text-black'
                              : 'bg-[#A7F3D0] text-black'
                          }`}>
                            {topic.importance}
                          </span>
                        </div>
                        <h3 className="font-black text-slate-900 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {topic.name}
                        </h3>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-black dark:text-white group-hover:translate-x-1 transition-all" strokeWidth={2.5} />
                  </div>

                  <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium leading-relaxed line-clamp-2">
                    {topic.shortSummary}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="pt-3 border-t-2 border-black/10 dark:border-white/10 space-y-2">
                  <ProgressBar
                    completed={solvedInTopic}
                    total={topicProblems.length}
                    label="Problems Solved"
                    size="sm"
                    color="mint"
                  />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
                    <span>Must Done: {mustSolvedInTopic}/{topicMustProblems.length}</span>
                    <span className="neo-pill bg-[#FAF6EE] dark:bg-zinc-800 text-[10px] py-0.5 px-2">
                      {topic.patterns?.length || 0} Patterns
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
