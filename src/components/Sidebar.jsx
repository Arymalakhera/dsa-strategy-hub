import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  RefreshCw,
  HelpCircle,
  Gauge,
  Code2,
  Timer,
  Compass,
  Video
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/roadmap', label: '16-Topic Roadmap', icon: Map },
  { path: '/planner', label: 'Study Planner', icon: CalendarDays },
  { path: '/mock', label: 'Timed Assessment', icon: Timer },
  { path: '/revision', label: 'Revise Today', icon: RefreshCw },
  { path: '/pattern-helper', label: 'Pattern Finder', icon: HelpCircle },
  { path: '/complexity-guide', label: 'Constraint Guide', icon: Gauge },
  { path: '/templates', label: 'Code Cheat Sheets', icon: Code2 },
  { path: '/resources', label: 'Top DSA Channels', icon: Video }
];

export const Sidebar = ({ dueCount = 0 }) => {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-[#18181B] p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1.5">
        <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Preparation Modules
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isRevision = item.path === '/revision';

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[0_3px_0_0_#18181B] dark:shadow-[0_3px_0_0_#fff] translate-y-[-1px]'
                    : 'text-slate-800 dark:text-zinc-300 border-2 border-transparent hover:border-black dark:hover:border-zinc-500 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-[0_2px_0_0_#18181B] dark:hover:shadow-[0_2px_0_0_#fff] hover:translate-y-[-1px]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" strokeWidth={2.5} />
                <span>{item.label}</span>
              </div>
              {isRevision && dueCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FF70A6] text-black border-2 border-black">
                  {dueCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Placement tip card (Clean flat container, no hard shadow) */}
      <div className="mt-auto p-4 bg-[#A7F3D0]/80 dark:bg-teal-950/40 border-2 border-black dark:border-zinc-600 rounded-2xl text-xs space-y-1.5 text-black dark:text-emerald-100">
        <div className="font-black text-black dark:text-emerald-300 flex items-center gap-1.5 text-xs">
          <Compass className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-300" />
          <span>Strategy Guidance</span>
        </div>
        <p className="text-[11px] text-slate-800 dark:text-emerald-100 font-medium leading-relaxed">
          Stuck for &gt; 25 mins? Reveal Hint 1 (Pattern). If still stuck, inspect Hint 2 and schedule review!
        </p>
      </div>
    </aside>
  );
};
