'use client';

interface PixelCatProps {
  className?: string;
  isPurring?: boolean;
}

export function PixelCat({ className = '', isPurring = false }: PixelCatProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      className={`w-full h-full select-none ${className}`}
      aria-label="Lookup Pixel Cat Mascot"
    >
      <defs>
        <filter id="pixelShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="0.5" floodColor="#540B0E" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter="url(#pixelShadow)" className={isPurring ? 'animate-cat-purr' : ''}>
        {/* ── TAIL (Wagging Animation) ── */}
        <g className="pixel-cat-tail" style={{ transformOrigin: '27px 24px' }}>
          {/* Tail Outline */}
          <rect x="26" y="17" width="3" height="2" fill="#380608" />
          <rect x="28" y="18" width="2" height="5" fill="#380608" />
          <rect x="26" y="22" width="3" height="3" fill="#380608" />
          {/* Tail Fur & Honey Tip */}
          <rect x="27" y="18" width="1" height="1" fill="#FFF3B0" />
          <rect x="27" y="19" width="1" height="3" fill="#E09F3E" />
          <rect x="26" y="21" width="1" height="2" fill="#E09F3E" />
        </g>

        {/* ── BODY ── */}
        {/* Body Outline */}
        <rect x="6" y="20" width="20" height="9" fill="#380608" />
        {/* Body Fur */}
        <rect x="7" y="21" width="18" height="7" fill="#FFF6E0" />
        {/* Shading */}
        <rect x="7" y="26" width="18" height="2" fill="#EEDFBD" />

        {/* ── COLLAR & BELL ── */}
        {/* Bordeaux Collar */}
        <rect x="8" y="20" width="16" height="2" fill="#540B0E" />
        <rect x="9" y="20" width="14" height="1" fill="#9E2A2B" />
        {/* Golden Bell */}
        <g className="pixel-cat-bell" style={{ transformOrigin: '16px 22px' }}>
          <rect x="14" y="21" width="4" height="4" fill="#380608" />
          <rect x="15" y="21" width="2" height="3" fill="#E09F3E" />
          <rect x="15" y="21" width="1" height="1" fill="#FFF3B0" />
          <rect x="15" y="23" width="2" height="1" fill="#380608" />
        </g>

        {/* ── HEAD & EARS ── */}
        {/* Head Outline */}
        <rect x="3" y="10" width="26" height="11" fill="#380608" />
        <rect x="4" y="8" width="24" height="3" fill="#380608" />
        
        {/* Left Ear */}
        <g className="pixel-cat-ear-l" style={{ transformOrigin: '7px 7px' }}>
          <rect x="5" y="4" width="4" height="5" fill="#380608" />
          <rect x="4" y="6" width="2" height="4" fill="#380608" />
          <rect x="6" y="5" width="2" height="3" fill="#FFF6E0" />
          {/* Inner Pink Ear */}
          <rect x="6" y="6" width="2" height="3" fill="#FF8EB5" />
          <rect x="5" y="7" width="1" height="2" fill="#FF8EB5" />
        </g>

        {/* Right Ear (With Honey Tabby Patch) */}
        <g className="pixel-cat-ear-r" style={{ transformOrigin: '24px 7px' }}>
          <rect x="23" y="4" width="4" height="5" fill="#380608" />
          <rect x="26" y="6" width="2" height="4" fill="#380608" />
          <rect x="24" y="5" width="2" height="3" fill="#E09F3E" />
          {/* Inner Pink Ear */}
          <rect x="24" y="6" width="2" height="3" fill="#FF8EB5" />
          <rect x="26" y="7" width="1" height="2" fill="#FF8EB5" />
        </g>

        {/* Head Main Fur */}
        <rect x="4" y="11" width="24" height="9" fill="#FFF6E0" />
        <rect x="5" y="9" width="22" height="3" fill="#FFF6E0" />

        {/* Calico Honey Patch on Forehead / Right Side */}
        <rect x="20" y="8" width="6" height="5" fill="#E09F3E" />
        <rect x="22" y="12" width="5" height="4" fill="#E09F3E" />
        <rect x="21" y="9" width="4" height="2" fill="#F5B74F" />

        {/* ── BLINKING ANIME EYES ── */}
        <g className="pixel-cat-eyes" style={{ transformOrigin: '16px 14px' }}>
          {/* Left Eye */}
          <rect x="8" y="12" width="4" height="4" fill="#380608" />
          <rect x="8" y="12" width="2" height="2" fill="#FFFFFF" />
          <rect x="10" y="13" width="2" height="2" fill="#E09F3E" />
          <rect x="9" y="15" width="2" height="1" fill="#1E0B0D" />

          {/* Right Eye */}
          <rect x="20" y="12" width="4" height="4" fill="#380608" />
          <rect x="20" y="12" width="2" height="2" fill="#FFFFFF" />
          <rect x="22" y="13" width="2" height="2" fill="#E09F3E" />
          <rect x="21" y="15" width="2" height="1" fill="#1E0B0D" />
        </g>

        {/* Blushing Cheeks */}
        <rect x="5" y="16" width="3" height="1" fill="#FF8EB5" />
        <rect x="6" y="17" width="2" height="1" fill="#FF8EB5" />
        <rect x="24" y="16" width="3" height="1" fill="#FF8EB5" />
        <rect x="24" y="17" width="2" height="1" fill="#FF8EB5" />

        {/* Nose & Cute Cat Smile :3 */}
        <rect x="15" y="15" width="2" height="1" fill="#FF8EB5" />
        <rect x="14" y="17" width="4" height="1" fill="#380608" />
        <rect x="14" y="16" width="1" height="1" fill="#380608" />
        <rect x="17" y="16" width="1" height="1" fill="#380608" />
        <rect x="15" y="18" width="2" height="1" fill="#380608" />

        {/* Whiskers */}
        <rect x="1" y="15" width="3" height="1" fill="#FFFFFF" />
        <rect x="1" y="17" width="3" height="1" fill="#FFFFFF" />
        <rect x="28" y="15" width="3" height="1" fill="#FFFFFF" />
        <rect x="28" y="17" width="3" height="1" fill="#FFFFFF" />

        {/* ── PEAKING PAWS ── */}
        {/* Left Paw */}
        <rect x="7" y="27" width="5" height="4" fill="#380608" />
        <rect x="8" y="27" width="3" height="3" fill="#FFFFFF" />
        <rect x="8" y="29" width="1" height="1" fill="#EEDFBD" />
        <rect x="10" y="29" width="1" height="1" fill="#EEDFBD" />

        {/* Right Paw */}
        <rect x="20" y="27" width="5" height="4" fill="#380608" />
        <rect x="21" y="27" width="3" height="3" fill="#FFFFFF" />
        <rect x="21" y="29" width="1" height="1" fill="#EEDFBD" />
        <rect x="23" y="29" width="1" height="1" fill="#EEDFBD" />
      </g>

      {/* Embedded CSS Animations */}
      <style>{`
        .pixel-cat-tail {
          animation: cat-wag 2.4s ease-in-out infinite;
        }
        .pixel-cat-ear-l {
          animation: cat-twitch-l 4s ease-in-out infinite;
        }
        .pixel-cat-ear-r {
          animation: cat-twitch-r 4s ease-in-out infinite 0.25s;
        }
        .pixel-cat-eyes {
          animation: cat-blink 4.2s ease-in-out infinite;
        }
        .pixel-cat-bell {
          animation: cat-bell 3s ease-in-out infinite;
        }

        @keyframes cat-wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
        }
        @keyframes cat-twitch-l {
          0%, 88%, 100% { transform: rotate(0deg); }
          92% { transform: rotate(-7deg); }
          96% { transform: rotate(3deg); }
        }
        @keyframes cat-twitch-r {
          0%, 88%, 100% { transform: rotate(0deg); }
          92% { transform: rotate(7deg); }
          96% { transform: rotate(-3deg); }
        }
        @keyframes cat-blink {
          0%, 44%, 50%, 100% { transform: scaleY(1); }
          47% { transform: scaleY(0.1); }
        }
        @keyframes cat-bell {
          0%, 100% { transform: rotate(0deg); }
          48% { transform: rotate(-10deg); }
          52% { transform: rotate(10deg); }
          56% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pixel-cat-tail, .pixel-cat-ear-l, .pixel-cat-ear-r, .pixel-cat-eyes, .pixel-cat-bell {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

