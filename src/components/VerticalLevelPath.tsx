import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LEVELS, Level } from '../data/journeyConfig';
import { VerticalLevelCard } from './VerticalLevelCard';
import { VerticalMascotRunner, MascotState } from './VerticalMascotRunner';
import { VerticalLevelProgress } from './VerticalLevelProgress';
import { TeklozyLogo } from './BrandVectors';
import { Sparkles, ArrowDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

// Custom web audio chime for level unlock
function playChime(freq = 523.25) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.33, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // audio context muted or disallowed
  }
}

// Alternating X positions for 10 levels on desktop
const NODE_X_OFFSETS = [
  '62%', // 1 (r)
  '36%', // 2
  '66%', // 3 (r)
  '34%', // 4
  '68%', // 5 (r - milestone)
  '32%', // 6
  '64%', // 7 (r)
  '36%', // 8
  '62%', // 9 (r)
  '50%', // 10 (center finish)
];

export const VerticalLevelPath: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const inkRef = useRef<SVGPathElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Dynamic application state
  const [unlockedLevels, setUnlockedLevels] = useState<boolean[]>(new Array(LEVELS.length).fill(false));
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [highestUnlockedId, setHighestUnlockedId] = useState(1);
  const [mascotPos, setMascotPos] = useState({ x: 0, y: 0, angle: 0 });
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [mascotBubble, setMascotBubble] = useState<string>('Welcome to Level 01!');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [xpCount, setXpCount] = useState(2500);
  const [streakDays, setStreakDays] = useState(12);

  // Setup Lenis Smooth Scroll connected to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  // Path measurement and scroll drawing
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let st: ScrollTrigger | null = null;
    let resizeTimer: number;

    const buildPath = () => {
      if (st) st.kill();

      const mapEl = mapRef.current;
      const svgEl = svgRef.current;
      const trackEl = trackRef.current;
      const inkEl = inkRef.current;

      if (!mapEl || !svgEl || !trackEl || !inkEl) return;

      const mr = mapEl.getBoundingClientRect();
      const nodeEls = Array.from(mapEl.querySelectorAll<HTMLElement>('.node'));
      if (nodeEls.length === 0) return;

      // 1. Measure real on-screen centers of every node
      const pts = nodeEls.map((n) => {
        const r = n.getBoundingClientRect();
        return [r.left + r.width / 2 - mr.left, r.top + r.height / 2 - mr.top];
      });

      svgEl.setAttribute('viewBox', `0 0 ${mr.width} ${mr.height}`);

      // 2. Build continuous cubic Bézier S-curves with vertical tangents
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [a, b] = pts[i - 1];
        const [c, e] = pts[i];
        const m = (b + e) / 2;
        d += ` C${a} ${m} ${c} ${m} ${c} ${e}`;
      }

      trackEl.setAttribute('d', d);
      inkEl.setAttribute('d', d);

      const len = inkEl.getTotalLength();
      inkEl.style.strokeDasharray = `${len}`;

      // 3. Binary search (bisect getPointAtLength on y) to find exact distance to each node
      const at = pts.map(([, y]) => {
        let lo = 0;
        let hi = len;
        for (let k = 0; k < 24; k++) {
          const mid = (lo + hi) / 2;
          if (inkEl.getPointAtLength(mid).y < y) {
            lo = mid;
          } else {
            hi = mid;
          }
        }
        return hi;
      });

      let prevIndex = -1;
      let lastVelocityTime = Date.now();

      // 4. Paint function driven by scroll progress
      const paint = (progress: number, velocity = 0) => {
        const L = progress * len;
        inkEl.style.strokeDashoffset = `${len - L}`;

        // Get runner coordinates along path
        const pt = inkEl.getPointAtLength(L);
        const ahead = inkEl.getPointAtLength(Math.min(len, L + 6));
        const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * (180 / Math.PI) - 90;

        // Determine current active level
        let activeIdx = 0;
        const newUnlocked = at.map((dist, i) => {
          const reached = L >= dist - 4;
          if (reached) activeIdx = i;
          return reached;
        });

        // Always unlock level 1
        newUnlocked[0] = true;
        setUnlockedLevels(newUnlocked);
        setCurrentLevelId(activeIdx + 1);
        setHighestUnlockedId((prev) => Math.max(prev, activeIdx + 1));

        // Detect new level arrival
        if (activeIdx !== prevIndex) {
          prevIndex = activeIdx;
          const currentLvl = LEVELS[activeIdx];
          setMascotBubble(currentLvl.bubble);

          if (soundEnabled && activeIdx > 0) {
            playChime(523.25 + activeIdx * 45);
          }

          if (activeIdx === LEVELS.length - 1) {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#0088E0', '#2563EB', '#10B981', '#FBBF24'],
            });
          }
        }

        // Mascot animation state
        const isNearNode = at.some((dist) => Math.abs(L - dist) < 18);
        let state: MascotState = 'idle';
        if (Math.abs(velocity) > 0.05) {
          state = 'walking';
        } else if (isNearNode) {
          state = activeIdx === LEVELS.length - 1 ? 'celebrating' : 'arriving';
        }

        setMascotState(state);
        setMascotPos({ x: pt.x, y: pt.y, angle });
      };

      // Reduced motion: draw complete path and unlock all levels immediately
      if (reduce) {
        paint(1, 0);
        return;
      }

      // Master GSAP ScrollTrigger
      st = ScrollTrigger.create({
        trigger: mapEl,
        start: 'top 55%',
        end: 'bottom 55%',
        scrub: 0.6,
        onUpdate: (self) => {
          const vel = self.getVelocity();
          paint(self.progress, vel);
        },
      });

      paint(st.progress, 0);
    };

    // Build after web fonts ready and on resize
    if (document.fonts) {
      document.fonts.ready.then(buildPath);
    } else {
      buildPath();
    }

    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        buildPath();
        ScrollTrigger.refresh();
      }, 150);
    });

    if (mapRef.current) {
      ro.observe(mapRef.current);
    }

    return () => {
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      if (st) st.kill();
    };
  }, [soundEnabled]);

  // Jump to specific level via Lenis
  const handleJumpToLevel = (levelId: number) => {
    const nodeEl = document.getElementById(`level-node-${levelId}`);
    if (nodeEl && lenisRef.current) {
      lenisRef.current.scrollTo(nodeEl, {
        offset: -window.innerHeight * 0.35,
        duration: 1.4,
      });
    }
  };

  const handleAddXp = (amount: number) => {
    setXpCount((prev) => prev + amount);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0088E0] selection:text-white pb-32">
      {/* Top Brand Banner */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#DCE6F0] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TeklozyLogo className="h-8" />
          <span className="hidden sm:inline-block h-4 w-[1px] bg-slate-200" />
          <span className="hidden sm:inline-block text-xs font-bold text-slate-500 uppercase tracking-widest">
            10-Step Career Journey
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#0088E0] border border-blue-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Blue & White Theme</span>
          </div>
          <button
            onClick={() => handleJumpToLevel(1)}
            className="tk-btn-primary px-4 py-2 text-xs font-bold shadow-xs rounded-xl"
          >
            Start Level 1
          </button>
        </div>
      </header>

      {/* Hero Intro Section */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0088E0] text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Continuous Illustrated Timeline</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight max-w-2xl mx-auto">
          Ten levels, one unbroken path.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          From career awareness to verified industry champion. Scroll down to watch the path draw itself and guide Telo through every milestone.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 animate-bounce">
          <ArrowDown className="w-4 h-4 text-[#0088E0]" />
          <span>Scroll to begin</span>
        </div>
      </section>

      {/* The Master Level Path Map */}
      <section
        id="quest"
        aria-label="Ten levels of career progression"
        className="max-w-[1040px] mx-auto px-4 sm:px-6 relative"
      >
        <div ref={mapRef} id="map" className="relative mt-8">
          {/* Continuous SVG River Track & Ink */}
          <svg
            ref={svgRef}
            id="trail"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
          >
            <defs>
              <filter id="inkGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0088E0" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Faint Full Track Underneath */}
            <path
              ref={trackRef}
              id="track"
              fill="none"
              stroke="#DCE6F0"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Expressive Coloured Ink On Top (Draws with scroll progress) */}
            <path
              ref={inkRef}
              id="ink"
              fill="none"
              stroke="#0088E0"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#inkGlow)"
            />
          </svg>

          {/* Telo Mascot Runner Gliding Along the Ink */}
          <VerticalMascotRunner
            x={mascotPos.x}
            y={mascotPos.y}
            angle={mascotPos.angle}
            state={mascotState}
            bubbleText={mascotBubble}
            accent={LEVELS[currentLevelId - 1]?.accent || '#0088E0'}
          />

          {/* Semantic Ordered List of 10 Levels */}
          <ol className="levels list-none p-0 relative" role="list">
            {LEVELS.map((lvl, index) => {
              const isRight = index % 2 === 0;
              const isDone = unlockedLevels[index];
              const isCurrent = currentLevelId === lvl.id;
              const isMilestone = lvl.id === 5 || lvl.id === 10;
              const xPos = NODE_X_OFFSETS[index] || '50%';

              return (
                <li
                  key={lvl.id}
                  id={`level-node-${lvl.id}`}
                  className={`lv relative h-[360px] sm:h-[320px] ${isRight ? 'r' : ''} ${
                    isDone ? 'done' : ''
                  }`}
                  style={{ '--x': xPos } as React.CSSProperties}
                >
                  {/* The On-Screen Center Node */}
                  <span
                    className={`node absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm sm:text-base z-20 transition-all duration-500 ${
                      isDone
                        ? 'bg-[#0088E0] border-[#0088E0] text-white shadow-lg scale-110'
                        : 'bg-white border-[#CBD5E1] text-slate-400'
                    } ${isMilestone ? 'ring-4 ring-[#0088E0]/30' : ''}`}
                    style={{
                      left: 'var(--x)',
                      transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                  >
                    {lvl.id === 10 ? (
                      <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                    ) : (
                      lvl.id < 10 ? `0${lvl.id}` : '10'
                    )}
                  </span>

                  {/* Level Card: Alternates Left / Right on Desktop, Clean Below Node on Mobile */}
                  <div
                    className={`absolute z-10 w-[92%] sm:w-[380px] max-w-full ${
                      /* Mobile: centered below node */
                      'left-1/2 -translate-x-1/2 top-[calc(50%+46px)] sm:top-1/2 sm:-translate-y-1/2'
                    } ${
                      /* Desktop alternating: .r places card on left, normal places card on right */
                      isRight
                        ? 'sm:left-auto sm:right-[calc(100%-var(--x)+68px)] sm:translate-x-0'
                        : 'sm:left-[calc(var(--x)+68px)] sm:right-auto sm:translate-x-0'
                    }`}
                  >
                    <VerticalLevelCard
                      level={lvl}
                      totalLevels={LEVELS.length}
                      isUnlocked={isDone}
                      isCurrent={isCurrent}
                      onSelectLevel={handleJumpToLevel}
                      onAddXp={handleAddXp}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Graduation Champion End Banner */}
      <footer className="max-w-3xl mx-auto px-6 mt-32 text-center">
        <div className="bg-white rounded-3xl border-2 border-[#CBD5E1] p-8 sm:p-12 shadow-xl">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            Level 10 Complete
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-4">
            You are ready to claim your career.
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            From discovering your path to scaling full-stack applications and landing verified referrals.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleJumpToLevel(1)}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Back to Start
            </button>
            <button
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#0088E0', '#2563EB', '#10B981'],
                });
              }}
              className="tk-btn-primary px-6 py-3 rounded-xl text-sm font-bold shadow-md"
            >
              Claim Career Spot
            </button>
          </div>
        </div>
      </footer>

      {/* Persistent Floating Level Progress Sidebar */}
      <VerticalLevelProgress
        currentLevelId={currentLevelId}
        highestUnlockedId={highestUnlockedId}
        xpCount={xpCount}
        streakDays={streakDays}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onJumpToLevel={handleJumpToLevel}
      />
    </div>
  );
};
