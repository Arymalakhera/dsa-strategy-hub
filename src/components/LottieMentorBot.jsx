import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_light';
import mentorBotData from '../assets/mentor-bot.json';

export const LottieMentorBot = ({
  size = null,
  className = '',
  showGlow = false,
  badgeText = null,
  onClick
}) => {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      animRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: mentorBotData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          clearCanvas: true
        }
      });
    } catch (e) {
      console.warn('LottieMentorBot failed to initialize:', e);
    }

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  const inlineStyle = size
    ? { width: size, height: Math.round((size * 394) / 500) }
    : { aspectRatio: '500 / 394' };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={inlineStyle}
    >
      {/* Optional subtle ambient pulse if requested */}
      {showGlow && (
        <span
          className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-500/25 blur-sm animate-ping pointer-events-none"
          style={{ animationDuration: '3.5s' }}
        />
      )}

      {/* Pure Lottie SVG Container */}
      <div
        ref={containerRef}
        className="w-full h-full relative z-10 flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)]"
      />

      {/* Optional Badge */}
      {badgeText && (
        <span className="absolute -bottom-1 z-20 px-2 py-0.5 bg-[#FFDE59] text-black border border-black rounded-full text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
          {badgeText}
        </span>
      )}
    </div>
  );
};

