import React from 'react';
import { Lightbulb, BookOpen, CheckCircle2, AlertTriangle, ArrowUpRight, Target, Clock, Star } from 'lucide-react';

export const ProblemCard = ({
  problem,
  progress = {},
  userNote = '',
  onOpenHints,
  onOpenNote,
  onMarkStatus
}) => {
  const status = progress.status || 'not_started';
  const hintsRevealed = progress.hintsRevealed || 0;

  const difficultyColors = {
    Easy: 'bg-[#D1FAE5] text-emerald-950 border-2 border-black font-black',
    Medium: 'bg-[#FED7AA] text-amber-950 border-2 border-black font-black',
    Hard: 'bg-[#FECDD3] text-rose-950 border-2 border-black font-black'
  };

  const tagStyles = {
    Must: 'bg-[#FFDE59] text-black border-2 border-black font-black',
    Good: 'bg-[#A7F3D0] text-black border-2 border-black font-bold',
    Bonus: 'bg-[#DDD6FE] text-black border-2 border-black font-bold'
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-150 ${
      status === 'solved'
        ? 'bg-[#F0FDF4] dark:bg-emerald-950/25 border-emerald-600 dark:border-emerald-500'
        : status === 'struggled'
        ? 'bg-[#FFFBEB] dark:bg-amber-950/25 border-amber-500 dark:border-amber-400'
        : 'bg-white dark:bg-[#1C1D22] border-black dark:border-zinc-700'
    }`}>
      {/* Top Row: LC Number, Tag, Difficulty, Status Action Buttons */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black text-slate-700 dark:text-zinc-300 bg-[#FAF6EE] dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-black/30">
            #{problem.lcNumber}
          </span>
          <span className={`text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${tagStyles[problem.tag]}`}>
            {problem.tag === 'Must' ? (
              <>
                <Star className="w-2.5 h-2.5 fill-black text-black shrink-0" />
                <span>MUST</span>
              </>
            ) : (
              problem.tag
            )}
          </span>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Status Dropdown / Action Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onMarkStatus(problem.id, status === 'solved' ? 'not_started' : 'solved')}
            title="Mark as Solved"
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 border-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
              status === 'solved'
                ? 'bg-[#34D399] text-black'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-[#D1FAE5] hover:text-black'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Solved</span>
          </button>

          <button
            onClick={() => onMarkStatus(problem.id, status === 'struggled' ? 'not_started' : 'struggled')}
            title="Mark as Struggled (Queues Spaced Revision in 1, 7, 30 days)"
            className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 border-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
              status === 'struggled'
                ? 'bg-[#FFDE59] text-black'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-[#FEF08A] hover:text-black'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Struggled</span>
          </button>
        </div>
      </div>

      {/* Middle: Title & Pattern */}
      <div className="mb-3">
        <h3 className="font-black text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-amber-400 transition-colors inline-flex items-center gap-1.5">
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1.5"
          >
            {problem.title}
            <ArrowUpRight className="w-4 h-4 text-black dark:text-white inline" strokeWidth={2.5} />
          </a>
        </h3>
        <div className="mt-1 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 inline-flex items-center gap-1.5 bg-[#FAF6EE] dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-black/20">
            <Target className="w-3.5 h-3.5 text-black dark:text-amber-400 shrink-0" />
            <span className="text-black dark:text-white font-extrabold">{problem.pattern}</span>
          </span>
          {status === 'struggled' && (
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>Auto revision queued (+1 day)</span>
            </span>
          )}
        </div>
      </div>

      {/* User Note Snippet if present */}
      {userNote && (
        <div className="mb-3 p-2.5 bg-[#FAF6EE] dark:bg-zinc-800/80 rounded-xl border border-black/20 dark:border-zinc-700 text-xs text-slate-800 dark:text-zinc-200 flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" strokeWidth={2.5} />
          <span className="font-mono text-xs font-bold truncate">Trick: {userNote}</span>
        </div>
      )}

      {/* Bottom Row: Company Tags + Action Buttons (Hints & Note) */}
      <div className="flex items-center justify-between pt-2.5 border-t border-black/10 dark:border-white/10 flex-wrap gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {problem.companyTags?.map((company) => (
            <span
              key={company}
              className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-black/30 dark:border-zinc-500"
            >
              {company}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Note button */}
          <button
            onClick={() => onOpenNote(problem)}
            title="Add or view personal trick note"
            className={`p-1.5 rounded-xl border-2 border-black text-xs font-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] ${
              userNote
                ? 'bg-[#C4B5FD] text-black'
                : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* Hint Ladder Drawer Button */}
          <button
            onClick={() => onOpenHints(problem)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#BAE6FD] hover:bg-[#93C5FD] text-black border-2 border-black shadow-[0_3px_0_0_#18181B] active:shadow-[0_0.5px_0_0_#18181B] active:translate-y-[2px] transition-all cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-black fill-amber-300" strokeWidth={2} />
            <span>4-Step Hints</span>
            {hintsRevealed > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">
                {hintsRevealed}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
