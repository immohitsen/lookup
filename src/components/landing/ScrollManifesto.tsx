'use client';
import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SparklesIcon } from '@hugeicons/core-free-icons';

// Curated words for the kinetic typography scrub
const MANIFESTO_WORDS = [
  { text: 'Your', breakAfter: false },
  { text: 'creative', breakAfter: false },
  { text: 'work', breakAfter: false },
  { text: 'is', breakAfter: false },
  { text: 'iconic.', breakAfter: true, highlight: true },

  { text: 'Your', breakAfter: false },
  { text: 'bio', breakAfter: false },
  { text: 'link', breakAfter: false },
  { text: "shouldn't", breakAfter: false },
  { text: 'look', breakAfter: false },
  { text: 'like', breakAfter: false },
  { text: 'a', breakAfter: false },
  { text: 'disposable', breakAfter: false },
  { text: 'receipt.', breakAfter: true },

  { text: 'We', breakAfter: false },
  { text: 'built', breakAfter: false },
  { text: 'Lookup', breakAfter: false, highlight: true },
  { text: 'as', breakAfter: false },
  { text: 'an', breakAfter: false },
  { text: 'editorial', breakAfter: false },
  { text: 'canvas.', breakAfter: true, highlight: true },

  { text: 'Spatial', breakAfter: false },
  { text: 'bento', breakAfter: false },
  { text: 'grids.', breakAfter: false },
  { text: 'Sub-second', breakAfter: false },
  { text: 'speed.', breakAfter: false },
  { text: '0%', breakAfter: false, highlight: true },
  { text: 'platform', breakAfter: false },
  { text: 'cuts.', breakAfter: true, highlight: true },
];

export function ScrollManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Progress goes from 0 to 1 as container scrolls through viewport
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableDistance));
      setScrollProgress(progress);
    }

    function scrollLoop() {
      onScroll();
      animationFrameId = requestAnimationFrame(scrollLoop);
    }

    // Run on requestAnimationFrame for silky 60fps tracking on both touch and mouse
    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Kinetic forward-push transformation: subtle scale up + gentle translateY
  // Scale goes from 0.94 to 1.05, giving the sensation of the words moving forward into the room
  const scale = 0.94 + scrollProgress * 0.10;
  const translateY = (1 - scrollProgress) * 16;

  const totalWords = MANIFESTO_WORDS.length;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[260vh] bg-[#FAF7EE] border-b border-[#540B0E]/10"
      aria-label="Lookup Kinetic Manifesto"
    >
      {/* 
        Sticky Viewport Frame:
        Stays locked in place for the full 260vh scroll height.
        Uses 100dvh for mobile viewport stabilization.
      */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col items-center justify-center px-3.5 sm:px-8 lg:px-12 pointer-events-none select-none">
        
        {/* Subtle Ambient Radial Glow that intensifies as text illuminates */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 50% 50%, rgba(224, 159, 62, ${0.05 + scrollProgress * 0.18}) 0%, rgba(250, 247, 238, 0) 70%)`,
          }}
        />

        {/* Top Monospaced Tag */}
        <div className="mb-4 sm:mb-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#540B0E]/12 text-xs font-mono font-bold text-[#540B0E] shadow-xs">
            <HugeiconsIcon icon={SparklesIcon} size={13} className="text-[#E09F3E]" />
            <span className="tracking-wider uppercase text-[10px] sm:text-xs">// 01 THE EDITORIAL STATEMENT</span>
          </div>
        </div>

        {/* 
          Typography Stage:
          Each word begins translucent (opacity: 0.15) and sequentially awakens 
          to full dark bordeaux or honey bronze as scrollProgress moves from 0 to 1.
        */}
        <div
          className="max-w-4xl w-full mx-auto text-center z-10 transition-transform duration-75 will-change-transform px-1"
          style={{
            transform: `scale(${scale}) translateY(${translateY}px)`,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 gap-y-1.5 sm:gap-y-3">
            {MANIFESTO_WORDS.map((item, index) => {
              // Calculate word-level activation threshold
              const wordStart = (index / totalWords) * 0.85;
              const wordEnd = wordStart + 0.08;

              let wordOpacity = 0.15; // Starting translucent ghost
              let wordProgress = 0;

              if (scrollProgress >= wordEnd) {
                wordProgress = 1;
                wordOpacity = 1.0; // Fully dark ink
              } else if (scrollProgress > wordStart) {
                wordProgress = (scrollProgress - wordStart) / (wordEnd - wordStart);
                wordOpacity = 0.15 + wordProgress * 0.85;
              }

              const isIlluminated = wordProgress > 0.45;

              return (
                <span
                  key={index}
                  className={`text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight transition-all duration-150 inline-block ${
                    item.highlight && isIlluminated
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#540B0E] via-[#9E2A2B] to-[#E09F3E]'
                      : isIlluminated
                      ? 'text-[#540B0E]'
                      : 'text-[#540B0E]/20'
                  }`}
                  style={{
                    opacity: wordOpacity,
                    transform: isIlluminated ? 'scale(1.02)' : 'scale(1.0)',
                  }}
                >
                  {item.text}
                  {item.breakAfter && <span className="w-full block h-1 sm:h-2" />}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
