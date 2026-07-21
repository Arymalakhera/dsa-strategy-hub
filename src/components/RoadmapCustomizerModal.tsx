'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Check, ArrowUp, ArrowDown, Calendar, RefreshCw, Sparkles, Layers, Plus, Trash2 } from 'lucide-react';
import { TOPIC_CLUSTERS, TopicCluster } from '../lib/roadmapGenerator';
import { Difficulty, Problem, RoadmapItem } from '../types';

interface RoadmapCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTopics: string[];
  topicOrder: string[];
  difficultyMix: Record<Difficulty, boolean>;
  dailyTarget: number;
  roadmap: RoadmapItem[];
  allProblems: Problem[];
  onSaveCustomization: (params: {
    selectedTopics: string[];
    topicOrder: string[];
    difficultyMix: Record<Difficulty, boolean>;
    dailyTarget: number;
    regenerateUnsolved: boolean;
  }) => void;
}

export const RoadmapCustomizerModal: React.FC<RoadmapCustomizerModalProps> = ({
  isOpen,
  onClose,
  selectedTopics: initialSelectedTopics,
  topicOrder: initialTopicOrder,
  difficultyMix: initialDifficultyMix,
  dailyTarget: initialDailyTarget,
  roadmap,
  allProblems,
  onSaveCustomization
}) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    initialSelectedTopics.length > 0 ? initialSelectedTopics : TOPIC_CLUSTERS.map((c) => c.name)
  );

  const [topicOrder, setTopicOrder] = useState<string[]>(
    initialTopicOrder.length > 0 ? initialTopicOrder : TOPIC_CLUSTERS.map((c) => c.name)
  );

  const [difficultyMix, setDifficultyMix] = useState<Record<Difficulty, boolean>>(
    initialDifficultyMix || { Easy: true, Medium: true, Hard: true }
  );

  const [dailyTarget, setDailyTarget] = useState<number>(initialDailyTarget || 2);

  if (!isOpen) return null;

  // Calculate remaining unsolved problems & estimated completion date
  const unsolvedCount = roadmap.filter((r) => r.status !== 'solved').length;
  const daysNeeded = Math.ceil(unsolvedCount / Math.max(1, dailyTarget));
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + daysNeeded);

  const formattedEstDate = estimatedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const toggleTopic = (clusterName: string) => {
    setSelectedTopics((prev) =>
      prev.includes(clusterName)
        ? prev.filter((t) => t !== clusterName)
        : [...prev, clusterName]
    );
  };

  const moveTopic = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= topicOrder.length) return;

    const newOrder = [...topicOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);
    setTopicOrder(newOrder);
  };

  const toggleDifficulty = (diff: Difficulty) => {
    setDifficultyMix((prev) => {
      const next = { ...prev, [diff]: !prev[diff] };
      // Prevent unselecting all difficulties
      if (!next.Easy && !next.Medium && !next.Hard) return prev;
      return next;
    });
  };

  const handleSave = (regenerateUnsolved: boolean) => {
    onSaveCustomization({
      selectedTopics,
      topicOrder,
      difficultyMix,
      dailyTarget,
      regenerateUnsolved
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl my-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100 relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <Sliders className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Customize Your Roadmap
              </h2>
              <p className="text-xs text-slate-400">Reorder topics, filter difficulty & set daily targets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Estimated Completion Date Calculator */}
          <div className="bg-gradient-to-r from-slate-950 to-indigo-950/60 p-5 rounded-2xl border border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4" /> Estimated Completion Date
              </div>
              <div className="text-2xl font-black text-white">
                {formattedEstDate} <span className="text-xs text-slate-400 font-normal">({daysNeeded} days)</span>
              </div>
              <div className="text-xs text-slate-400">
                {unsolvedCount} unsolved problems left at your target pace.
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800 shrink-0">
              <span className="text-xs text-slate-300 font-bold">Daily Goal:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDailyTarget(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                      dailyTarget === num
                        ? 'bg-indigo-600 text-white border border-indigo-500'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty Mix Selector */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Difficulty Mix
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => toggleDifficulty(diff)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    difficultyMix[diff]
                      ? diff === 'Easy'
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-950'
                        : diff === 'Medium'
                        ? 'bg-amber-950/60 border-amber-500/60 text-amber-300 shadow-md shadow-amber-950'
                        : 'bg-rose-950/60 border-rose-500/60 text-rose-300 shadow-md shadow-rose-950'
                      : 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  {difficultyMix[diff] && <Check className="w-3.5 h-3.5" />}
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selection & Drag/Drop Order */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Active Topics & Progression Order
              </span>
              <span className="text-xs text-slate-400">
                {selectedTopics.length} of {TOPIC_CLUSTERS.length} Topics Active
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {topicOrder.map((clusterName, idx) => {
                const isSelected = selectedTopics.includes(clusterName);
                return (
                  <div
                    key={clusterName}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500/40 text-slate-100'
                        : 'bg-slate-950 border-slate-800/80 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTopic(clusterName)}
                        className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-950 cursor-pointer"
                      />
                      <span className="text-xs font-bold font-mono text-indigo-400 w-5">{idx + 1}.</span>
                      <span className="text-xs font-semibold">{clusterName}</span>
                    </div>

                    {/* Up / Down Order Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveTopic(idx, 'up')}
                        className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        disabled={idx === topicOrder.length - 1}
                        onClick={() => moveTopic(idx, 'down')}
                        className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => handleSave(false)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700"
          >
            Save Preferences Only
          </button>

          <button
            onClick={() => handleSave(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
          >
            <RefreshCw className="w-4 h-4" /> Save & Reshuffle Unsolved
          </button>
        </div>
      </motion.div>
    </div>
  );
};
