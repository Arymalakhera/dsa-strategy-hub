import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = 'No items found',
  description = 'Try adjusting your filters or search keywords.',
  actionLabel = null,
  onAction = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border-2 border-dashed border-black/40 dark:border-zinc-700 bg-white dark:bg-[#1C1D22] space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-[#FFDE59] text-black border-2 border-black flex items-center justify-center">
        <Icon className="w-6 h-6 text-black" strokeWidth={2.5} />
      </div>
      <h3 className="text-base font-black text-black dark:text-white">
        {title}
      </h3>
      <p className="text-xs font-medium text-slate-700 dark:text-zinc-300 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="neo-btn bg-[#FFDE59] text-black px-4 py-2 text-xs font-black cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
