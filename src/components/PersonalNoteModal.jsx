import React, { useState, useEffect } from 'react';
import { X, Sparkles, Save, BookOpen } from 'lucide-react';

export const PersonalNoteModal = ({ problem, initialNote = '', isOpen, onClose, onSave }) => {
  const [noteText, setNoteText] = useState(initialNote);

  useEffect(() => {
    setNoteText(initialNote);
  }, [initialNote, isOpen]);

  if (!isOpen || !problem) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave(problem.id, noteText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#1C1D22] rounded-3xl border-2 border-black dark:border-zinc-700 shadow-[0_6px_0_0_#18181B] dark:shadow-[0_6px_0_0_#3F3F46] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FFDE59] border-2 border-black text-black rounded-xl">
              <BookOpen className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-black text-black dark:text-white text-base">
                Personal Notebook Note
              </h3>
              <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold">
                LC #{problem.lcNumber} • {problem.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-slate-100 cursor-pointer shadow-[0_2px_0_0_#18181B] active:translate-y-[1px]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Note format prompt */}
        <div className="p-3.5 bg-[#FEF08A] text-black border-2 border-black rounded-2xl text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-0.5 shrink-0 text-black fill-amber-500" strokeWidth={2} />
          <div>
            <strong className="font-black">Recommended Strategy Format:</strong>
            <p className="mt-0.5 font-bold text-[11px] text-slate-900 leading-snug">
              Problem → Pattern → Trick (e.g. "Longest unique substring → Variable Window → Store lastSeen index in Map to jump left pointer")
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your one-line memory trick or edge-case reminder here..."
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black dark:border-zinc-700 bg-[#FAF6EE] dark:bg-zinc-800 text-black dark:text-white text-xs font-bold focus:outline-none focus:bg-white placeholder:text-slate-500 resize-none"
            autoFocus
          />

          <div className="flex justify-end gap-2 pt-2 border-t-2 border-black/10 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="neo-btn bg-white dark:bg-zinc-800 text-black dark:text-white px-3.5 py-2 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neo-btn bg-[#FFDE59] text-black px-4 py-2 text-xs font-black cursor-pointer"
            >
              <Save className="w-4 h-4" strokeWidth={2.5} /> Save Trick Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
