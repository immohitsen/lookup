'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CAT_QUIPS = [
  'meow! welcome to your spatial canvas 🐾',
  'purrr... standard link trees look like scratch posts 😼',
  '0% cuts, 100% treats for creators 🐟',
  'schedule your drops so you can sleep in 😴',
  'vector QR codes are print-ready for merch & flyers 🎨',
  'sub-second 0.78s edge speed. fast like 3am zoomies ⚡',
  'look at you, being an iconic creator today 💅',
  'your links deserve a royal cat palace, not a squished list 🏰',
  'tap me again for purrs & good fortune 🍀',
  'paws off middleman fees! 100% creator owned 🐾',
  'curate your world instead of cluttering it 🌾',
  'meow~ sending good vibes to your bio page! ✨',
  'psst... you’re doing amazing. keep creating! 💛',
  'first-party analytics with zero tracker cookies 🔒',
];

interface SparkleParticle {
  id: number;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function CuteMascot() {
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  // 3D Spatial Physics States (rendered via ref for 120fps fluid performance)
  const mascotRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  // Mouse & Pounce Physics Variables
  const mousePos = useRef({ x: 0, y: 0, active: false });
  const pouncePhase = useRef(0); // 0 = idle, 1 = windup, 2 = leap, 3 = land

  // Continuous 3D spatial state
  const state3D = useRef({
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    roll: 0,
  });

  // 3D Animation & Physics Loop (Runs on requestAnimationFrame)
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    function onPointerMove(e: PointerEvent) {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      mousePos.current.active = true;
    }

    function onPointerLeave() {
      mousePos.current.active = false;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    function physicsLoop(now: number) {
      const elapsed = (now - startTime) / 1000;

      // 1. Natural 3D Harmonic Levitation (X, Y, Z orbital breathing)
      const idleFloatX = Math.sin(elapsed * 1.1) * 4;
      const idleFloatY = Math.sin(elapsed * 1.8) * 8;
      const idleFloatZ = Math.sin(elapsed * 1.3) * 14;
      const idleYaw = Math.cos(elapsed * 0.9) * 4.5;
      const idlePitch = Math.sin(elapsed * 1.5) * 3.5;
      const idleRoll = Math.sin(elapsed * 1.1) * 3;

      // 2. Cursor 3D Look-At & Depth Tracking
      let targetYaw = 0;
      let targetPitch = 0;
      let targetRoll = 0;
      let targetZ = 0;

      if (mascotRef.current && mousePos.current.active) {
        const rect = mascotRef.current.getBoundingClientRect();
        const catCenterX = rect.left + rect.width / 2;
        const catCenterY = rect.top + rect.height / 2;

        const deltaX = mousePos.current.x - catCenterX;
        const deltaY = mousePos.current.y - catCenterY;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Turn head and body in 3D towards cursor
        // Looking left (negative deltaX) turns cat yaw up to -32deg
        targetYaw = Math.max(-32, Math.min(18, (deltaX / window.innerWidth) * 48));
        targetPitch = Math.max(-22, Math.min(16, (deltaY / window.innerHeight) * 40));
        targetRoll = (deltaX / window.innerWidth) * -7;

        // When mouse approaches mascot, cat leans forward into 3D space
        const proximity = Math.max(0, 1 - dist / 700);
        targetZ = proximity * 28;
      }

      // 3. Pounce Physics Dynamics (On-Click 3D Leap)
      let pounceY = 0;
      let pounceZ = 0;
      let pouncePitch = 0;
      let pounceScale = 1;

      if (pouncePhase.current > 0) {
        const pounceAge = (now - pouncePhase.current) / 1000;
        if (pounceAge < 0.12) {
          // Phase 1: Crouch & wind up back into screen
          const t = pounceAge / 0.12;
          pounceY = t * 10;
          pounceZ = -t * 28;
          pouncePitch = t * 16;
          pounceScale = 1 - t * 0.08;
        } else if (pounceAge < 0.38) {
          // Phase 2: Pounce forward toward the camera!
          const t = (pounceAge - 0.12) / 0.26;
          pounceY = 10 - t * 38;
          pounceZ = -28 + t * 75; // leaps forward +47px in Z!
          pouncePitch = 16 - t * 28;
          pounceScale = 0.92 + t * 0.22;
        } else if (pounceAge < 0.7) {
          // Phase 3: Land softly and settle
          const t = (pounceAge - 0.38) / 0.32;
          const settle = Math.sin(t * Math.PI) * Math.exp(-t * 3);
          pounceY = -28 * (1 - t) + settle * 6;
          pounceZ = 47 * (1 - t);
          pouncePitch = -12 * (1 - t);
          pounceScale = 1.14 - t * 0.14;
        } else {
          pouncePhase.current = 0;
        }
      }

      // 4. Smooth Damped LERP Integration (Zero jitter, high-framerate fluid motion)
      const current = state3D.current;
      current.x += (idleFloatX - current.x) * 0.08;
      current.y += (idleFloatY + pounceY - current.y) * 0.1;
      current.z += (idleFloatZ + targetZ + pounceZ - current.z) * 0.08;
      current.yaw += (idleYaw + targetYaw - current.yaw) * 0.08;
      current.pitch += (idlePitch + targetPitch + pouncePitch - current.pitch) * 0.08;
      current.roll += (idleRoll + targetRoll - current.roll) * 0.08;

      // 5. Apply True 3D CSS Transform Matrix to Mascot
      if (mascotRef.current) {
        mascotRef.current.style.transform = `
          translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, ${current.z.toFixed(1)}px)
          rotateY(${current.yaw.toFixed(1)}deg)
          rotateX(${-current.pitch.toFixed(1)}deg)
          rotateZ(${current.roll.toFixed(1)}deg)
          scale(${pounceScale.toFixed(2)})
        `;
      }

      // 6. Apply Reactive 3D Ground Shadow (scales, blurs, and shifts with altitude & depth)
      if (shadowRef.current) {
        // Shadow contracts & blurs as cat floats higher or leaps forward
        const heightFactor = Math.max(0, (current.y + 16) / 36);
        const depthFactor = (current.z + 20) / 60;
        const shadowScaleX = Math.max(0.65, Math.min(1.2, 1 - heightFactor * 0.3 + depthFactor * 0.15));
        const shadowScaleY = Math.max(0.55, Math.min(1.1, 0.9 - heightFactor * 0.35));
        const shadowOpacity = Math.max(0.12, Math.min(0.32, 0.26 - heightFactor * 0.15));
        const shadowShiftX = current.x * 0.4 - current.yaw * 0.3;

        shadowRef.current.style.transform = `translateX(${shadowShiftX.toFixed(1)}px) scale(${shadowScaleX.toFixed(2)}, ${shadowScaleY.toFixed(2)})`;
        shadowRef.current.style.opacity = shadowOpacity.toFixed(2);
        shadowRef.current.style.filter = `blur(${Math.max(2, 4 + heightFactor * 4).toFixed(1)}px)`;
      }

      animId = requestAnimationFrame(physicsLoop);
    }

    animId = requestAnimationFrame(physicsLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  // Auto-dismiss speech bubble
  useEffect(() => {
    if (!speech) return;
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => {
      setSpeech(null);
    }, 3400);

    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [speech]);

  // Click: trigger full 3D leap + new quip + floating paw sparkles
  const handleClick = useCallback(() => {
    // 1. Cycle to next cat quip
    const nextText = CAT_QUIPS[clickCount % CAT_QUIPS.length];
    setClickCount((prev) => prev + 1);
    setSpeech(nextText);

    // 2. Trigger 3D pounce physics leap
    pouncePhase.current = performance.now();

    // 3. Spawn floating paw prints & sparkles
    const icons = ['🐾', '✨', '💛', '🐱', '🌸', '✦'];
    const newSparkles: SparkleParticle[] = Array.from({ length: 4 }).map(() => ({
      id: particleIdRef.current++,
      char: icons[Math.floor(Math.random() * icons.length)],
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 20 - 15,
      vx: (Math.random() - 0.5) * 36,
      vy: -40 - Math.random() * 25,
    }));

    setSparkles((prev) => [...prev.slice(-6), ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((p) => !newSparkles.some((ns) => ns.id === p.id)));
    }, 900);
  }, [clickCount]);

  return (
    <div
      className="pointer-events-none fixed right-4 bottom-4 z-50 sm:right-7 sm:bottom-6 select-none"
      style={{ perspective: '1200px' }}
    >
      <div className="pointer-events-auto relative flex flex-col items-end gap-1.5" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Floating Sparkle / Paw Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {sparkles.map((sp) => (
            <span
              key={sp.id}
              className="absolute text-sm animate-sparkle-rise pointer-events-none"
              style={{
                left: `calc(50% + ${sp.x}px)`,
                top: `calc(50% + ${sp.y}px)`,
                '--vx': `${sp.vx}px`,
                '--vy': `${sp.vy}px`,
              } as React.CSSProperties}
            >
              {sp.char}
            </span>
          ))}
        </div>

        {/* Speech Bubble Tooltip */}
        {speech && (
          <div
            key={speech}
            className="relative mb-1 max-w-[15rem] rounded-2xl rounded-br-sm bg-white/95 backdrop-blur-md px-4 py-2.5 text-left text-xs sm:text-[13px] leading-snug font-semibold text-[#540B0E] shadow-[0_14px_35px_rgba(84,11,14,0.18)] ring-1 ring-[#540B0E]/12 animate-pop-in"
          >
            <div className="flex items-start gap-1.5">
              <span>{speech}</span>
            </div>
            {/* Speech Tail pointing down toward cat's head */}
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-[#540B0E]/12" />
          </div>
        )}

        {/* 3D Cat Interactive Mascot with True Spatial Preserved 3D */}
        <div className="relative flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
          <button
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Pet the Lookup 3D Cat mascot"
            className="relative bg-transparent border-0 ring-0 outline-none p-0 cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* True 3D Spatial Container with 120fps Transform Engine */}
            <div
              ref={mascotRef}
              className="relative w-24 h-24 sm:w-28 sm:h-28 will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                filter: isHovered
                  ? 'drop-shadow(0 18px 24px rgba(84, 11, 14, 0.28))'
                  : 'drop-shadow(0 14px 20px rgba(84, 11, 14, 0.20))',
                transition: 'filter 0.2s ease',
              }}
            >
              <img
                src="/brand/cat-3d.png"
                alt="3D Cat Mascot"
                width={560}
                height={538}
                className="w-full h-full object-contain pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </button>

          {/* Dynamic 3D Ground Contact Shadow */}
          <div
            ref={shadowRef}
            className="w-16 sm:w-20 h-2.5 bg-[#540B0E] rounded-full -mt-2 pointer-events-none transition-all duration-75 will-change-transform"
            style={{
              opacity: 0.25,
              filter: 'blur(4px)',
            }}
          />
        </div>

      </div>
    </div>
  );
}
