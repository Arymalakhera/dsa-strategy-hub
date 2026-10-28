'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Check, ArrowUp, ArrowDown, Calendar, RefreshCw, Sparkles, Layers, Plus, Trash2 } from 'lucide-react';
import { FIXED_TOPIC_SEQUENCE } from '../lib/roadmapGenerator';
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
    initialSelectedTopics.length > 0 ? initialSelectedTopics : FIXED_TOPIC_SEQUENCE.map((c) => c.name)
  );

  const [topicOrder, setTopicOrder] = useState<string[]>(
    initialTopicOrder.length > 0 ? initialTopicOrder : FIXED_TOPIC_SEQUENCE.map((c) => c.name)
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05222B]/85 backdrop-blur-md p-4 overflow-y-auto"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl my-8 rounded-3xl bg-[#EBF7F7] border border-[#70D6D1]/30 shadow-2xl overflow-hidden text-[#072A36] relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#05222B] via-[#073847] to-[#0B4F6C] p-6 border-b border-[#70D6D1]/20 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00A896]/20 text-[#70D6D1] border border-[#70D6D1]/30">
              <Sliders className="w-6 h-6 animate-pulse text-[#70D6D1]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Customize Your Roadmap
              </h2>
              <p className="text-xs text-[#C2E8E8]">Reorder topics, filter difficulty &amp; set daily targets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A2D2D2] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Estimated Completion Date Calculator */}
          <div className="bg-[#072C37] p-5 rounded-2xl border border-[#70D6D1]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-white">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 text-[#70D6D1] text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-[#00A896]" /> Estimated Completion Date
              </div>
              <div className="text-2xl font-black text-white">
                {formattedEstDate} <span className="text-xs text-[#C2E8E8] font-normal">({daysNeeded} days)</span>
              </div>
              <div className="text-xs text-[#C2E8E8]">
                {unsolvedCount} unsolved problems left at your target pace.
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#05222B] px-4 py-2.5 rounded-2xl border border-[#70D6D1]/20 shrink-0">
              <span className="text-xs text-[#C2E8E8] font-bold">Daily Goal:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setDailyTarget(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all ${
                      dailyTarget === num
                        ? 'bg-[#00A896] text-white border border-[#70D6D1]'
                        : 'bg-white/10 border border-white/20 text-[#A2D2D2] hover:text-white'
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
            <div className="text-xs font-bold text-[#072A36] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00A896]" /> Difficulty Mix
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => toggleDifficulty(diff)}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    difficultyMix[diff]
                      ? diff === 'Easy'
                        ? 'bg-[#00A896] border-[#00A896] text-white shadow-md'
                        : diff === 'Medium'
                        ? 'bg-[#0F6B7B] border-[#0F6B7B] text-white shadow-md'
                        : 'bg-[#072A36] border-[#072A36] text-white shadow-md'
                      : 'bg-white border-[#0F7A8D]/20 text-[#3B6674] opacity-60'
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
              <span className="text-xs font-bold text-[#072A36] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00A896]" /> Active Topics &amp; Progression Order
              </span>
              <span className="text-xs text-[#3B6674]">
                {selectedTopics.length} of {FIXED_TOPIC_SEQUENCE.length} Topics Active
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {topicOrder.map((clusterName, idx) => {
                const isSelected = selectedTopics.includes(clusterName);
                return (
                  <div
                    key={clusterName}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-white border-[#00A896]/40 shadow-sm'
                        : 'bg-white/60 border-[#0F7A8D]/15 text-[#7A9EA6]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTopic(clusterName)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#00A896] border-[#00A896] text-white'
                            : 'bg-white border-[#0F7A8D]/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <span className={`text-xs font-bold ${isSelected ? 'text-[#072A36]' : 'text-[#7A9EA6]'}`}>
                        {clusterName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveTopic(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded-lg text-[#3B6674] hover:text-[#072A36] hover:bg-[#E0F4F4] disabled:opacity-30"
                        title="Move Up Priority"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveTopic(idx, 'down')}
                        disabled={idx === topicOrder.length - 1}
                        className="p-1 rounded-lg text-[#3B6674] hover:text-[#072A36] hover:bg-[#E0F4F4] disabled:opacity-30"
                        title="Move Down Priority"
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
        <div className="p-4 bg-[#072C37] border-t border-[#70D6D1]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-white">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#A2D2D2] hover:text-white font-semibold text-xs transition-colors border border-white/20"
          >
            Cancel
          </button>

          <button
            onClick={() => handleSave(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#00A896]/30 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-white" /> Save &amp; Reshuffle Unsolved
          </button>
        </div>
      </motion.div>
    </div>
  );
};
