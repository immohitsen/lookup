'use client';

export function PixelHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* 1. Authentic Pixel Art Canvas Wallpaper (Vibrant, Saturated & Bright) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: "url('/hero-pixel-bg.jpg')",
          imageRendering: 'pixelated',
          opacity: 1,
          filter: 'brightness(1.18) saturate(1.15) contrast(1.03)',
        }}
      />

      {/* 2. Soft Gradient Transition (Blends smoothly into #FAF7EE Linen at the bottom) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF7EE]/70" />

      {/* 3. Luminous Radial Glow (Brightens center while keeping typography razor sharp) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 42%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 55%, rgba(250,247,238,0.55) 100%)',
        }}
      />

      {/* 4. Ambient Warm Golden Honey Radiance in Center */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] bg-[#E09F3E]/18 blur-[120px] rounded-full pointer-events-none" />

      {/* 5. Authentic CRT Micro-Pixel Dither Mesh Texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#540B0E 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  );
}
