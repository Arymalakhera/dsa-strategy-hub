'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from './AchievementsView';

interface BadgeUnlockModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      // Fire celebratory confetti on badge unlock
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00A896', '#70D6D1', '#0B4F6C', '#028090']
      });
    }
  }, [badge?.id]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05222B]/85 backdrop-blur-md p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="w-full max-w-md bg-[#EBF7F7] border-2 border-[#70D6D1] rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden text-[#072A36] warm-card-glow"
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#70D6D1]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00A896]/20 rounded-full blur-3xl" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#3B6674] hover:text-[#072A36] hover:bg-[#E0F4F4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A896]/15 text-[#008080] border border-[#00A896]/30 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00A896] animate-spin" /> Badge Unlocked!
          </div>

          {/* Animated Badge Icon Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
            className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-[#00A896] via-[#028090] to-[#70D6D1] p-1 shadow-2xl shadow-[#00A896]/30 flex items-center justify-center relative"
          >
            <div className="w-full h-full bg-[#072C37] rounded-[22px] flex items-center justify-center text-[#70D6D1]">
              {badge.icon}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#00A896] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
              <CheckCircle2 className="w-4 h-4 font-bold" />
            </div>
          </motion.div>

          {/* Badge Title & Description */}
          <h2 className="text-2xl font-black text-[#072A36] tracking-tight mb-2">{badge.title}</h2>
          <p className="text-xs text-[#3B6674] leading-relaxed mb-6 px-2">{badge.description}</p>

          {/* Bonus Reward Badge */}
          <div className="bg-white border border-[#70D6D1]/40 rounded-2xl p-3.5 mb-6 flex items-center justify-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-[#00A896]" />
            <span className="text-xs font-bold text-[#008080]">+50 Bonus Achievement Points</span>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#00A896] to-[#028090] hover:from-[#00C9A7] hover:to-[#00A896] text-white font-bold text-sm shadow-xl shadow-[#00A896]/30 transition-all hover:scale-[1.02]"
          >
            Awesome! Continue
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

