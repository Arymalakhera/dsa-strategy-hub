import React from 'react';

/**
 * Native Animated SVG Mentor Bot Component
 * 60 FPS GPU-accelerated CSS keyframe animations.
 * Features:
 * - Floating hover physics (floatMaster)
 * - Eye blinking (blinkEyes)
 * - Pulsing antenna with emerald glow (pulseAntenna)
 * - Typing hands / paws on keyboard (typeHands)
 * - Glowing scrolling code lines on laptop screen (codeScroll)
 * - Ambient floating complexity particles (O(1), { ; }, </>, O(log n))
 */
export const MentorBotAnimation = ({
  size = 280,
  className = '',
  showParticles = true,
  showBadge = true,
  badgeText = 'DSA MENTOR BOT',
  onClick = null
}) => {
  return (
    <div
      onClick={onClick}
      style={{ width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size }}
      className={`relative inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Background Gradient */}
          <radialGradient id="mentorBgGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#030712" />
          </radialGradient>

          {/* Bot Body Gradient */}
          <linearGradient id="mentorBotBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e1065" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Neon Accents */}
          <linearGradient id="mentorCyanNeon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="mentorEmeraldNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="mentorNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          @keyframes mentorFloatMaster {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(1.2deg); }
          }
          @keyframes mentorBlinkEyes {
            0%, 88%, 100% { transform: scaleY(1); }
            93% { transform: scaleY(0.08); }
          }
          @keyframes mentorCodeScroll {
            0% { opacity: 0.3; transform: translateY(2px); }
            50% { opacity: 1; transform: translateY(-2px); }
            100% { opacity: 0.3; transform: translateY(2px); }
          }
          @keyframes mentorPulseAntenna {
            0%, 100% { fill: #10b981; filter: drop-shadow(0 0 4px #10b981); }
            50% { fill: #34d399; filter: drop-shadow(0 0 12px #34d399); }
          }
          @keyframes mentorTypeHands {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes mentorFloatData {
            0% { transform: translateY(0) scale(0.9); opacity: 0.2; }
            50% { opacity: 0.9; }
            100% { transform: translateY(-24px) scale(1.1); opacity: 0; }
          }

          .bot-anim-group { animation: mentorFloatMaster 3.8s ease-in-out infinite; transform-origin: center; }
          .bot-anim-eyes { animation: mentorBlinkEyes 4s infinite; transform-origin: 250px 220px; }
          .bot-anim-antenna { animation: mentorPulseAntenna 2s ease-in-out infinite; }
          .bot-anim-typing { animation: mentorTypeHands 0.35s ease-in-out infinite alternate; }
          .bot-anim-code-glow { animation: mentorCodeScroll 2.2s ease-in-out infinite; }
          .bot-anim-particle-1 { animation: mentorFloatData 3s ease-out infinite; }
          .bot-anim-particle-2 { animation: mentorFloatData 2.6s ease-out infinite 1.2s; }
          .bot-anim-particle-3 { animation: mentorFloatData 3.2s ease-out infinite 0.6s; }
        `}</style>

        {/* Canvas Background Rounded Card */}
        <rect width="500" height="500" rx="32" fill="url(#mentorBgGlow)" />
        <rect
          width="496"
          height="496"
          x="2"
          y="2"
          rx="30"
          fill="none"
          stroke="#6366f1"
          strokeOpacity="0.35"
          strokeWidth="3"
        />

        {/* Floating Coding Complexity Particles */}
        {showParticles && (
          <g fontFamily="monospace" fontWeight="bold" fontSize="14">
            <text x="75" y="155" fill="#10b981" className="bot-anim-particle-1">O(1)</text>
            <text x="390" y="140" fill="#38bdf8" className="bot-anim-particle-2">&#123; ; &#125;</text>
            <text x="68" y="340" fill="#a855f7" className="bot-anim-particle-3">&lt;/&gt;</text>
            <text x="395" y="325" fill="#ec4899" className="bot-anim-particle-1">O(log n)</text>
          </g>
        )}

        {/* Bot & Laptop Composition */}
        <g className="bot-anim-group">
          {/* Headphones Arc */}
          <path
            d="M165 210 C165 110 335 110 335 210"
            fill="none"
            stroke="#6366f1"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Headphone Earcups */}
          <rect x="150" y="195" width="22" height="48" rx="10" fill="#4338ca" stroke="#818cf8" strokeWidth="2.5" />
          <rect x="328" y="195" width="22" height="48" rx="10" fill="#4338ca" stroke="#818cf8" strokeWidth="2.5" />

          {/* Antenna */}
          <line x1="250" y1="120" x2="250" y2="152" stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="250" cy="112" r="12" className="bot-anim-antenna" />

          {/* Bot Head / Body Frame */}
          <rect x="175" y="148" width="150" height="136" rx="42" fill="url(#mentorBotBody)" stroke="#6366f1" strokeWidth="6" />

          {/* Screen Visor */}
          <rect x="192" y="168" width="116" height="96" rx="26" fill="#030712" stroke="#1e293b" strokeWidth="2.5" />

          {/* Eyes (Animated Blink) */}
          <g className="bot-anim-eyes">
            <ellipse cx="224" cy="212" rx="13" ry="18" fill="#38bdf8" filter="url(#mentorNeonGlow)" />
            <ellipse cx="276" cy="212" rx="13" ry="18" fill="#38bdf8" filter="url(#mentorNeonGlow)" />
            {/* Sparkle Highlights */}
            <circle cx="220" cy="205" r="5" fill="#ffffff" />
            <circle cx="272" cy="205" r="5" fill="#ffffff" />
            <circle cx="228" cy="218" r="2.5" fill="#ffffff" />
            <circle cx="280" cy="218" r="2.5" fill="#ffffff" />
          </g>

          {/* Cheerful Cheeks */}
          <ellipse cx="208" cy="236" rx="8" ry="5" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="292" cy="236" rx="8" ry="5" fill="#f43f5e" opacity="0.6" />

          {/* Friendly Curved Smile */}
          <path d="M242 232 Q250 242 258 232" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

          {/* Mascot Laptop / Desk Area */}
          <g transform="translate(0, 10)">
            {/* Laptop Screen Backing */}
            <rect x="195" y="278" width="110" height="66" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="3" />

            {/* Laptop Screen Display */}
            <rect x="202" y="284" width="96" height="52" rx="6" fill="#020617" />

            {/* Animated Code Lines on Screen */}
            <g className="bot-anim-code-glow" strokeLinecap="round" strokeWidth="3">
              <line x1="212" y1="296" x2="256" y2="296" stroke="#10b981" />
              <line x1="212" y1="306" x2="276" y2="306" stroke="#38bdf8" />
              <line x1="212" y1="316" x2="242" y2="316" stroke="#f59e0b" />
              <line x1="212" y1="324" x2="264" y2="324" stroke="#ec4899" />
            </g>

            {/* Laptop Base & Keyboard Plate */}
            <path d="M174 344 L326 344 L338 358 L162 358 Z" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <line x1="230" y1="352" x2="270" y2="352" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Bouncing Hands / Paws */}
            <g className="bot-anim-typing">
              <circle cx="204" cy="344" r="10" fill="#818cf8" stroke="#312e81" strokeWidth="2.5" />
              <circle cx="296" cy="344" r="10" fill="#818cf8" stroke="#312e81" strokeWidth="2.5" />
            </g>
          </g>
        </g>

        {/* Tag Badge */}
        {showBadge && (
          <g transform="translate(162, 414)">
            <rect width="176" height="34" rx="17" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <circle cx="22" cy="17" r="4.5" fill="#10b981" className="bot-anim-antenna" />
            <text
              x="38"
              y="22"
              fill="#e2e8f0"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontSize="12"
              fontWeight="700"
              letterSpacing="0.8"
            >
              {badgeText}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
