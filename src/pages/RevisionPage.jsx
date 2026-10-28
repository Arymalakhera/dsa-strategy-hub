import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROBLEM_MAP } from '../data/problems';
import { ProblemCard } from '../components/ProblemCard';
import { EmptyState } from '../components/EmptyState';
import {
  RefreshCw,
  CheckCircle2,
  RotateCcw,
  Check
} from 'lucide-react';

export const RevisionPage = ({
  dueRevisions = [],
  allRevisionQueue = [],
  progressMap = {},
  notesMap = {},
  onResolveRevision,
  onOpenHints,
  onOpenNote,
  onMarkStatus
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('due'); // 'due' | 'all'

  const stageLabels = {
    1: '1st Revision (+1 Day)',
    2: '2nd Revision (+7 Days)',
    3: 'Final Revision (+30 Days)',
    4: 'Mastered'
  };

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1D22] border-2 border-black dark:border-zinc-700 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="neo-pill bg-[#FECDD3] text-black">
            Automated Neural Retention
          </span>
          <span className="neo-pill bg-[#FEF08A] text-black">
            +1d • +7d • +30d Intervals
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black dark:text-white uppercase">
            Spaced Revision Queue
          </h1>
          <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed">
            Problems you marked as <strong>Struggled</strong> are scheduled at <strong>+1 day</strong>, <strong>+7 days</strong>, and <strong>+30 days</strong>. Passing a revision moves it forward; failing resets the interval back to day 1 to protect your recall.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-black/10 dark:border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('due')}
          className={`neo-btn px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
            activeTab === 'due'
              ? 'bg-[#FFDE59] text-black'
              : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
          }`}
        >
          <span>Due Today</span>
          <span className="px-2 py-0.2 rounded-full text-[10px] bg-black text-white font-black">
            {dueRevisions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`neo-btn px-4 py-2 text-xs font-black transition-all cursor-pointer shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
            activeTab === 'all'
              ? 'bg-[#FFDE59] text-black'
              : 'bg-white dark:bg-zinc-800 text-black dark:text-white'
          }`}
        >
          <span>All Scheduled Queue</span>
          <span className="px-2 py-0.2 rounded-full text-[10px] bg-black text-white font-black">
            {allRevisionQueue.length}
          </span>
        </button>
      </div>

      {/* Tab: Due Today */}
      {activeTab === 'due' && (
        <div className="space-y-4">
          {dueRevisions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {dueRevisions.map((rev) => {
                const problem = PROBLEM_MAP[rev.problemId];
                if (!problem) return null;

                const stage = rev.revision?.stage || 1;

                return (
                  <div
                    key={rev.problemId}
                    className="p-5 rounded-3xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22] space-y-4"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="neo-pill bg-[#FEF08A] text-black text-xs">
                          {stageLabels[stage] || `Stage ${stage}`}
                        </span>
                        {rev.struggleReason && (
                          <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                            Struggle Reason: <strong className="text-black dark:text-white uppercase">{rev.struggleReason.replace(/_/g, ' ')}</strong>
                          </span>
                        )}
                      </div>

                      {/* Revision Result Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onResolveRevision(rev.problemId, true)}
                          className="neo-btn bg-[#34D399] text-black px-3.5 py-1.5 text-xs font-black"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Passed (Move to Next Interval)</span>
                        </button>
                        <button
                          onClick={() => onResolveRevision(rev.problemId, false)}
                          className="neo-btn bg-[#FECDD3] text-black px-3.5 py-1.5 text-xs font-black"
                        >
                          <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                          <span>Failed (Reset +1d)</span>
                        </button>
                      </div>
                    </div>

                    {/* Problem Card inner */}
                    <ProblemCard
                      problem={problem}
                      progress={progressMap[problem.id]}
                      userNote={notesMap[problem.id]}
                      onOpenHints={onOpenHints}
                      onOpenNote={onOpenNote}
                      onMarkStatus={onMarkStatus}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle2}
              title="All Caught Up For Today"
              description="No problems are due for spaced revision right now. You have protected your recall! Choose an action below to keep your streak active."
              actionLabel="Practice Sliding Window (Tier 1)"
              onAction={() => navigate('/topic/sliding-window')}
            />
          )}
        </div>
      )}

      {/* Tab: All Scheduled Queue */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {allRevisionQueue.length > 0 ? (
            <div className="overflow-x-auto rounded-3xl border-2 border-black dark:border-zinc-700 bg-white dark:bg-[#1C1D22]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white font-black uppercase tracking-wider border-b-2 border-black">
                  <tr>
                    <th className="p-3.5 sm:p-4">Problem</th>
                    <th className="p-3.5 sm:p-4">Stage</th>
                    <th className="p-3.5 sm:p-4">Due Date</th>
                    <th className="p-3.5 sm:p-4">Status</th>
                    <th className="p-3.5 sm:p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black/10 text-slate-800 dark:text-zinc-200 font-bold">
                  {allRevisionQueue.map((item) => {
                    const problem = PROBLEM_MAP[item.problemId];
                    if (!problem) return null;
                    const todayStr = new Date().toISOString().split('T')[0];
                    const isOverdue = item.revision?.dueDate && item.revision.dueDate <= todayStr;

                    return (
                      <tr key={item.problemId} className="hover:bg-[#FAF6EE]/50 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="p-3.5 sm:p-4">
                          <div className="font-black text-black dark:text-white">
                            #{problem.lcNumber} {problem.title}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-zinc-400 mt-0.5">
                            {problem.pattern}
                          </div>
                        </td>
                        <td className="p-3.5 sm:p-4 font-black text-purple-700 dark:text-purple-400">
                          {stageLabels[item.revision?.stage] || `Stage ${item.revision?.stage}`}
                        </td>
                        <td className="p-3.5 sm:p-4 font-mono font-bold">
                          {item.revision?.dueDate || 'Mastered'}
                          {isOverdue && (
                            <span className="ml-2 neo-pill bg-[#FECDD3] text-black text-[9px] py-0.2 px-1.5">
                              Due Today
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <span className="capitalize px-2 py-0.5 rounded-full border border-black font-black text-[10px] bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5 sm:p-4 text-right space-x-2">
                          <button
                            onClick={() => onResolveRevision(item.problemId, true)}
                            className="neo-btn bg-[#34D399] text-black px-2.5 py-1 text-xs font-black cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Pass</span>
                          </button>
                          <button
                            onClick={() => onResolveRevision(item.problemId, false)}
                            className="neo-btn bg-[#FECDD3] text-black px-2.5 py-1 text-xs font-black cursor-pointer"
                          >
                            Reset
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No items in revision queue"
              description="Whenever you mark a problem as 'Struggled' on the Roadmap, it automatically joins this spaced repetition system."
            />
          )}
        </div>
      )}
    </div>
  );
};
