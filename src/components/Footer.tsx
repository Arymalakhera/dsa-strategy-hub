'use client';

import { BrainCircuit, Heart, Globe, Share2, Code2 } from 'lucide-react';

interface FooterProps {
  onNavClick?: (tab: 'roadmap' | 'leaderboard' | 'achievements' | 'about') => void;
  themeMode?: 'mint' | 'glass';
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, themeMode = 'mint' }) => {
  return (
    <footer
      className={`w-full ${
        themeMode === 'glass'
          ? 'dribbble-glass-card bg-[#03151D]/90 border-t border-cyan-400/25 shadow-2xl'
          : 'bg-[#05222B] border-t border-[#70D6D1]/20 shadow-2xl'
      } pt-12 pb-8 text-[#A2D2D2] text-xs mt-16`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-gradient-to-tr from-[#00A896] to-[#70D6D1] text-[#05222B] shadow-md">
                <BrainCircuit className="w-5 h-5 text-[#05222B]" />
              </div>
              <span className="font-black text-lg text-white">
                DSA Mentor <span className="font-serif-header italic text-[#70D6D1] text-sm">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#C2E8E8] leading-relaxed max-w-md">
              An intelligent Socratic learning platform for mastering Data Structures and Algorithms. Get guided conceptual direction without copy-pasting code answers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#70D6D1] font-mono">// Platform</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => onNavClick?.('roadmap')}
                  className="hover:text-white transition-colors"
                >
                  Personalized Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('leaderboard')}
                  className="hover:text-white transition-colors"
                >
                  Global Leaderboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('achievements')}
                  className="hover:text-white transition-colors"
                >
                  Achievements &amp; Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick?.('about')}
                  className="hover:text-white transition-colors"
                >
                  Socratic Method &amp; About
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#70D6D1] font-mono">// Connect</h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#073847] border border-[#70D6D1]/25 hover:border-[#00A896] hover:text-white transition-all flex items-center gap-1.5 text-[11px] text-[#C2E8E8]"
                title="GitHub Repository"
              >
                <Code2 className="w-3.5 h-3.5 text-[#70D6D1]" /> GitHub
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#073847] border border-[#70D6D1]/25 hover:border-[#00A896] hover:text-white transition-all flex items-center gap-1.5 text-[11px] text-[#C2E8E8]"
                title="LeetCode Official"
              >
                <Globe className="w-3.5 h-3.5 text-[#70D6D1]" /> LeetCode
              </a>
            </div>
            <div className="pt-1 text-[11px] text-[#86B4B4] space-y-1">
              <div>Privacy Policy • Terms of Service</div>
              <div>Designed for FAANG &amp; High-Yield Interview Prep</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#094154] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#86B4B4]">
          <div>© 2026 DSA Mentor AI. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#00A896] fill-[#00A896]" /> for developers mastering LeetCode.
          </div>
        </div>
      </div>
    </footer>
  );
};
