'use client';

import { BrainCircuit, Heart, Globe, Share2, Code2 } from 'lucide-react';

interface FooterProps {
  onNavClick?: (tab: 'roadmap' | 'leaderboard' | 'achievements' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-10 pb-8 text-slate-400 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DSA Mentor AI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              An intelligent Socratic learning platform for mastering Data Structures and Algorithms. Get guided conceptual direction without copy-pasting code answers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => onNavClick?.('roadmap')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Personalized Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('leaderboard')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Global Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('achievements')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Achievements &amp; Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('about')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Socratic Method &amp; About
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">Connect &amp; Social</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                title="GitHub Repository"
              >
                <Code2 className="w-4 h-4 text-indigo-400" /> GitHub
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                title="LeetCode Official"
              >
                <Globe className="w-4 h-4 text-amber-400" /> LeetCode
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                title="Community"
              >
                <Share2 className="w-4 h-4 text-purple-400" /> Share
              </a>
            </div>
            <div className="pt-1 text-[11px] text-slate-500 space-y-1">
              <div>Privacy Policy • Terms of Service</div>
              <div>Designed for FAANG &amp; High-Yield Interview Prep</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© 2026 DSA Mentor AI. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for developers mastering LeetCode.
          </div>
        </div>
      </div>
    </footer>
  );
};
