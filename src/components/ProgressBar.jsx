import React from 'react';

export const ProgressBar = ({
  completed = 0,
  total = 0,
  label = '',
  size = 'md',
  color = 'yellow',
  showCount = true
}) => {
  const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5'
  };

  const colorFills = {
    yellow: 'bg-[#FFDE59]',
    indigo: 'bg-[#FFDE59]',
    emerald: 'bg-[#34D399]',
    mint: 'bg-[#34D399]',
    amber: 'bg-[#FB923C]',
    rose: 'bg-[#FF70A6]',
    purple: 'bg-[#C4B5FD]'
  };

  return (
    <div className="w-full">
      {(label || showCount) && (
        <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-slate-800 dark:text-zinc-200">
          {label && <span>{label}</span>}
          {showCount && (
            <span className="font-mono text-black dark:text-white font-black">
              {completed}/{total} <span className="text-[#8B5CF6] dark:text-[#A78BFA]">({percentage}%)</span>
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-black rounded-full overflow-hidden ${heightClasses[size] || heightClasses.md}`}>
        <div
          className={`h-full ${colorFills[color] || colorFills.yellow} border-r-2 border-black transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
