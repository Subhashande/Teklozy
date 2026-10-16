import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { LEVELS, PATH_D, TUNABLES } from '../data/journeyConfig';
import TeloMascot from './TeloMascot';
import { LevelProps } from './Props/LevelProps';
import { LevelToy } from './Toys/LevelToys';
import { CommunityBench } from './CommunityBench';
import { FarHills } from './FarHills';
import { Hud } from './Hud';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const pathEl = useRef<SVGPathElement>(null);
  const pathBankEl = useRef<SVGPathElement>(null);
  const byte = useRef<HTMLDivElement>(null);

  // Dynamic application state
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [activeAccent, setActiveAccent] = useState(LEVELS[0].accent);
  const [xpCount, setXpCount] = useState(2450);
  const [streakDays, setStreakDays] = useState(12);
  const [showEarlyAccessModal, setShowEarlyAccessModal] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isReserved, setIsReserved] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const path = pathEl.current;
      const worldEl = world.current;
      const rootEl = root.current;
      const byteEl = byte.current;

      if (!path || !worldEl || !rootEl || !byteEl) return;

      const len = path.getTotalLength();
      const worldW = worldEl.scrollWidth;
      const vw = window.innerWidth;
      const vh = worldEl.clientHeight;
      const sx = worldW / TUNABLES.viewBoxWidth;
      const sy = vh / TUNABLES.viewBoxHeight;

      // Initialize path drawing
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len });
      if (pathBankEl.current) {
        gsap.set(pathBankEl.current, { strokeDasharray: len, strokeDashoffset: 0 });
      }

      // Hide reveal elements until Byte arrives at that level
      gsap.set('.reveal', { autoAlpha: reduce ? 1 : 0, y: reduce ? 0 : 36 });
      gsap.set('.prop', { autoAlpha: reduce ? 1 : 0, scale: reduce ? 1 : 0.6, rotate: reduce ? 0 : -8, transformOrigin: '50% 50%' });

      let activeIndex = -1;

      const arrive = (i: number) => {
        const lvl = `.level-${i}`;
        const targetLevel = LEVELS[i];

        gsap.timeline()
          .to(`${lvl} .prop`, {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.65,
            ease: 'back.out(1.8)',
            stagger: 0.08,
          })
          .to(
            `${lvl} .reveal`,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
              stagger: 0.07,
            },
            '<0.05'
          )
          .add(() => {
            if (byteEl) {
              byteEl.dispatchEvent(
                new CustomEvent('byte-state', {
                  detail: { state: 'celebrate', bubble: targetLevel.bubble },
                })
              );
            }
          }, '<');
      };

      // Create Master Pinned ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: rootEl,
        pin: true,
        scrub: TUNABLES.scrub,
        start: 'top top',
        end: () => `+=${worldW * TUNABLES.endScrollMultiplier}`,
        onUpdate: (self) => {
          const p = self.progress;
          const L = p * len;
          const pt = path.getPointAtLength(L);
          const ahead = path.getPointAtLength(Math.min(len, L + TUNABLES.lookAheadPx));
          const bx = pt.x * sx;
          const by = pt.y * sy;

          // 1. Path draws itself behind Byte
          gsap.set(path, { strokeDashoffset: len - L });

          // 2. Camera follows Byte (Byte positioned at ~35% of the screen)
          const camX = gsap.utils.clamp(-(worldW - vw), 0, -(bx - vw * TUNABLES.cameraOffsetRatio));
          gsap.set(worldEl, { x: camX });

          // 3. Parallax layers
          gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((el) => {
            const depth = parseFloat(el.dataset.depth || '1');
            gsap.set(el, { x: (depth - 1) * camX });
          });

          // 4. Byte: Position, Facing Direction, Clamped Curve Tilt, Run vs Idle
          const dx = ahead.x - pt.x;
          const dy = ahead.y - pt.y;
          const rawTilt = Math.atan2(dy, Math.abs(dx)) * 57.3 * 0.25;
          const tilt = gsap.utils.clamp(-10, 10, rawTilt);

          gsap.set(byteEl, {
            x: bx,
            y: by,
            rotation: tilt,
            scaleX: dx < 0 ? -1 : 1,
          });

          // Switch mascot animation state based on scroll velocity
          const vel = Math.abs(self.getVelocity());
          byteEl.dataset.state = vel > TUNABLES.runVelocityThreshold ? 'run' : 'idle';

          // 5. Active Level detection
          const i = Math.min(LEVELS.length - 1, Math.round(p * (LEVELS.length - 1)));
          if (i !== activeIndex) {
            activeIndex = i;
            const currentLevel = LEVELS[i];
            setActiveLevelId(currentLevel.id);
            setActiveAccent(currentLevel.accent);
            arrive(i);
            document.documentElement.style.setProperty('--accent', currentLevel.accent);
          }
        },
      });

      // Reveal Level 1 immediately on mount
      arrive(0);

      return () => {
        trigger.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  // Jump to specific level via HUD click
  const handleJumpToLevel = (levelId: number) => {
    const totalScroll = (world.current?.scrollWidth || 12000) * TUNABLES.endScrollMultiplier;
    const targetProgress = (levelId - 1) / (LEVELS.length - 1);
    window.scrollTo({
      top: targetProgress * totalScroll,
      behavior: 'smooth',
    });
  };

  const handleAddXp = (amount: number) => {
    setXpCount((prev) => prev + amount);
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setIsReserved(true);
      setTimeout(() => {
        setIsReserved(false);
        setShowEarlyAccessModal(false);
        setEmailValue('');
      }, 2000);
    }
  };

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-[#F4FAFF]">
      {/* Top Persistent HUD */}
      <Hud
        activeLevelId={activeLevelId}
        xpCount={xpCount}
        streakDays={streakDays}
        accent={activeAccent}
        onJumpToLevel={handleJumpToLevel}
        onOpenEarlyAccess={() => setShowEarlyAccessModal(true)}
      />

      {/* Main Horizontal Scrollable Canvas World */}
      <div
        ref={world}
        className="relative h-full select-none"
        style={{ width: `${LEVELS.length * TUNABLES.levelWidthVw}vw` }}
      >
        {/* Layer 1: Parallax Far Hills Background (depth 0.4) */}
        <div data-depth="0.4" className="absolute inset-0">
          <FarHills />
        </div>

        {/* Layer 2: River Path SVG Canvas (depth 1.0) */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none z-10"
          viewBox={`0 0 ${TUNABLES.viewBoxWidth} ${TUNABLES.viewBoxHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="riverGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00C2FF" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Base River Bank / Trench */}
          <path
            ref={pathBankEl}
            d={PATH_D}
            fill="none"
            stroke="#DBEAFE"
            strokeWidth="68"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner River Track */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#93C5FD"
            strokeWidth="42"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Foreground Animated Luminous River Path */}
          <path
            ref={pathEl}
            d={PATH_D}
            fill="none"
            stroke={activeAccent}
            strokeWidth="24"
            strokeLinecap="round"
            filter="url(#riverGlowFilter)"
            vectorEffect="non-scaling-stroke"
            className="transition-colors duration-500"
          />

          {/* River Water Highlight Ripple */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 28"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Layer 3: 10 Level Vignettes, Declarative Copy & Interactive Toys */}
        {LEVELS.map((lvl, i) => (
          <article
            key={lvl.id}
            className={`level-${i} absolute top-0 h-full w-screen`}
            style={{ left: `${i * 100}vw` }}
          >
            {/* Themed SVG Prop Set (depth 0.75) */}
            <div data-depth="0.75" className="absolute inset-0 pointer-events-none">
              <LevelProps id={lvl.id} accent={lvl.accent} />
            </div>

            {/* Level Copy (Declarative max 6 words headline, max 2 lines body) */}
            <div className="absolute left-[16vw] top-[14vh] max-w-xl z-20 pointer-events-auto">
              <p
                className="reveal text-xs font-bold uppercase tracking-widest"
                style={{ color: lvl.accent }}
              >
                LEVEL {String(lvl.id).padStart(2, '0')}
              </p>

              <h2 className="reveal font-display text-4xl sm:text-6xl font-bold leading-tight text-[#0F172A] mt-1 tracking-tight">
                {lvl.title}
              </h2>

              <p className="reveal mt-3 text-base sm:text-lg text-slate-600 font-medium max-w-lg leading-relaxed">
                {lvl.line}
              </p>

              {/* Feature Chips */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {lvl.features.map((f) => (
                  <li
                    key={f}
                    className="reveal rounded-full border-2 px-3.5 py-1.5 text-xs font-bold bg-white/80 shadow-2xs text-slate-800 transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: lvl.accent }}
                  >
                    {f}
                  </li>
                ))}
              </ul>

              {/* Interactive Toy For This Level */}
              <div className="mt-5">
                <LevelToy
                  levelId={lvl.id}
                  accent={lvl.accent}
                  onUpdateAccent={setActiveAccent}
                  onAddXp={handleAddXp}
                />
              </div>
            </div>

            {/* Persistent Community Bench at bottom */}
            <div className="reveal absolute bottom-6 left-[16vw] z-20">
              <CommunityBench levelId={lvl.id} accent={lvl.accent} />
            </div>
          </article>
        ))}

        {/* Telo The Learning Companion Mascot (glides on top of the river) */}
        <div
          ref={byte}
          data-state="idle"
          className="absolute left-0 top-0 z-30 -ml-14 -mt-16 h-32 w-28 pointer-events-auto cursor-pointer"
        >
          <TeloMascot accent={activeAccent} />
        </div>
      </div>

      {/* Early Access Modal */}
      {showEarlyAccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="tk-card p-6 sm:p-8 bg-white max-w-md w-full shadow-2xl relative border-2 border-[#CBD5E1]">
            <h3 className="font-display font-bold text-2xl text-[#0F172A]">
              Claim your spot at <span style={{ color: activeAccent }}>Level 01</span>
            </h3>
            <p className="text-sm text-slate-600 mt-2 mb-6">
              Join the gamified EdTech ecosystem and begin your 10-level journey toward getting hired.
            </p>

            {isReserved ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm text-center">
                Spot reserved! Welcome aboard the journey, explorer!
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <input
                  type="email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:outline-none focus:border-[#00C2FF]"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEarlyAccessModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: activeAccent }}
                  >
                    Claim My Spot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
