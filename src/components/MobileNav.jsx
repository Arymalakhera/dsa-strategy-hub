import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  CalendarDays,
  RefreshCw,
  HelpCircle,
  Code2,
  Timer,
  Sun,
  Moon
} from 'lucide-react';

export const MobileNav = ({ dueCount = 0, theme = 'light', onToggleTheme }) => {
  const items = [
    { path: '/', label: 'Home', icon: LayoutDashboard },
    { path: '/roadmap', label: 'Roadmap', icon: Map },
    { path: '/planner', label: 'Plan', icon: CalendarDays },
    { path: '/mock', label: 'Mock', icon: Timer },
    { path: '/revision', label: 'Revise', icon: RefreshCw, badge: dueCount },
    { path: '/templates', label: 'Cheats', icon: Code2 }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EE] dark:bg-[#18181B] border-t-2 border-black dark:border-zinc-700 px-2 py-1.5 flex items-center justify-around shadow-[0px_-2px_0px_#18181B]">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative min-h-[44px] min-w-[44px] ${
                isActive
                  ? 'bg-[#FFDE59] text-black border-2 border-black shadow-[0_2px_0_0_#18181B] font-black'
                  : 'text-slate-700 dark:text-zinc-300 font-bold hover:text-black dark:hover:text-white'
              }`
            }
          >
            <div className="relative">
              <Icon className="w-4 h-4" strokeWidth={2.5} />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 bg-[#FF70A6] text-black border-2 border-black rounded-full text-[9px] font-black">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </NavLink>
        );
      })}

      {/* 1-Tap Mobile Night/Light Mode Toggle */}
      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Night'} Mode`}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative min-h-[44px] min-w-[44px] text-slate-700 dark:text-amber-400 font-bold hover:text-black dark:hover:text-white cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30" />
          ) : (
            <Moon className="w-4 h-4 text-black" />
          )}
          <span className="text-[10px] mt-0.5">{theme === 'dark' ? 'Light' : 'Night'}</span>
        </button>
      )}
    </nav>
  );
};
