import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LEVELS, Level } from '../data/journeyConfig';
import { TeklozyLogo } from './BrandVectors';
import { LevelToy } from './Toys/LevelToys';
import { CommunityBench } from './CommunityBench';
import teloAvatar from '../assets/telo-mascot.png';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Flame,
  Star,
  Trophy,
  Compass,
  ArrowUp,
  Share2,
  ShieldCheck,
  Code2,
} from 'lucide-react';

// Import all 10 level images from src/assets/levels-img/
import level1Img from '../assets/levels-img/level-1.png';
import level2Img from '../assets/levels-img/level-2.png';
import level3Img from '../assets/levels-img/level-3.png';
import level4Img from '../assets/levels-img/level-4.png';
import level5Img from '../assets/levels-img/level-5.png';
import level6Img from '../assets/levels-img/level-6.png';
import level7Img from '../assets/levels-img/level-7.png';
import level8Img from '../assets/levels-img/level-8.png';
import level9Img from '../assets/levels-img/level-9.png';
import level10Img from '../assets/levels-img/level-10.png';

const LEVEL_IMAGES = [
  level1Img,
  level2Img,
  level3Img,
  level4Img,
  level5Img,
  level6Img,
  level7Img,
  level8Img,
  level9Img,
  level10Img,
];

// SVG path d attribute from src/assets/path-vector.svg
const SVG_PATH_D =
  'M2412.38 416.793C1573.38 -189.706 -394.577 529.293 988.376 1914.29C2371.33 3299.29 1503.38 2430.06 2670.88 3633.79C3838.38 4837.53 1543.38 6074.29 822.374 6074.29C101.371 6074.29 -28.122 5205.29 618.874 4650.79C1265.87 4096.29 2877.88 5324.79 2082.88 6988.79';

gsap.registerPlugin(ScrollTrigger);

export const SpotlightJourney: React.FC = () => {
  const spotlightRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Application state
  const [activeLevelId, setActiveLevelId] = useState(1);
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true });
  const [activeBenchLevel, setActiveBenchLevel] = useState<number | null>(null);
  const [xpCount, setXpCount] = useState(2500);
  const [streakDays, setStreakDays] = useState(12);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimEmail, setClaimEmail] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);

  // Setup Lenis Smooth Scroll and connect to GSAP ticker
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

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // SVG Stroke-dashoffset animation tied to ScrollTrigger
  useEffect(() => {
    const path = pathRef.current;
    const track = trackRef.current;
    const spotlight = spotlightRef.current;
    if (!path || !spotlight) return;

    const pathLength = path.getTotalLength();

    // 1. Set dasharray and offset to hide stroke initially
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    if (track) {
      track.style.strokeDasharray = `${pathLength}`;
      track.style.strokeDashoffset = '0';
    }

    // 2. Animate stroke offset on scroll across the spotlight section
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: spotlight,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentIdx = Math.min(
            LEVELS.length - 1,
            Math.floor(progress * LEVELS.length)
          );
          setActiveLevelId(currentIdx + 1);
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Scroll smoothly to a specific level row
  const scrollToLevel = (id: number) => {
    const targetEl = document.getElementById(`level-row-${id}`);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, {
        offset: -80,
        duration: 1.2,
      });
    }
  };

  const toggleExpand = (levelId: number) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const handleAddXp = (amount: number) => {
    setXpCount((prev) => prev + amount);
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimEmail.trim()) {
      setIsClaimed(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0088E0', '#2563EB', '#10B981'],
      });
      setTimeout(() => {
        setIsClaimed(false);
        setShowClaimModal(false);
        setClaimEmail('');
      }, 2400);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F7F2] text-[#1A1A1A] font-manrope selection:bg-[#0088E0] selection:text-white">
      {/* 1. MindMarket Inspired Navigation Bar */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
        <nav
          aria-label="Main Navigation"
          className="bg-white/95 backdrop-blur-md border border-[#E5E5DE] rounded-full px-5 py-3 shadow-sm flex items-center justify-between gap-4 transition-all"
        >
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <TeklozyLogo className="h-8" />
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0088E0] text-[11px] font-bold border border-blue-200">
              <Sparkles className="w-3 h-3" />
              <span>Gamified Career Path</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#4A4A45]">
            <button
              onClick={() => scrollToLevel(1)}
              className="hover:text-[#0088E0] transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToLevel(3)}
              className="hover:text-[#0088E0] transition-colors"
            >
              Ecosystem
            </button>
            <button
              onClick={() => scrollToLevel(5)}
              className="hover:text-[#0088E0] transition-colors"
            >
              Scaling & AI
            </button>
            <button
              onClick={() => scrollToLevel(8)}
              className="hover:text-[#0088E0] transition-colors"
            >
              Radar & Bounties
            </button>
            <button
              onClick={() => scrollToLevel(10)}
              className="hover:text-[#0088E0] transition-colors"
            >
              Champion
            </button>
          </div>

          {/* Right Action: Streak Flame, XP Counter & CTA with Telo Avatar */}
          <div className="flex items-center gap-2.5">
            {/* Streak flame pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{streakDays}d</span>
            </div>

            {/* Total XP pill */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{xpCount.toLocaleString()}</span>
            </div>

            {/* Primary Action Button with Avatar */}
            <button
              onClick={() => setShowClaimModal(true)}
              className="flex items-center gap-2.5 bg-[#0088E0] hover:bg-[#0077CC] text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all hover:shadow-md"
            >
              <span>Get started</span>
              <div className="w-7 h-7 rounded-full bg-white p-0.5 overflow-hidden border border-white/60">
                <img
                  src={teloAvatar}
                  alt="Telo mascot"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* 2. Intro Section */}
      <section className="intro min-h-[75vh] flex flex-col justify-center items-center text-center px-6 py-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5DE] shadow-xs text-xs font-bold text-[#0088E0] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0088E0] animate-ping" />
          <span>The 10-Level Gamified Journey</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#131209]">
          Climb from zero to <br className="hidden sm:block" />
          <span className="text-[#0088E0]">industry champion.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-[#5C5B55] max-w-2xl leading-relaxed">
          Ten milestone levels connected by one continuous path. Watch your future take shape as the stroke draws itself through real-world experience, AI agents, and verified placement.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToLevel(1)}
            className="flex items-center gap-2 bg-[#0088E0] hover:bg-[#0077CC] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105"
          >
            <span>Begin Level 01</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <button
            onClick={() => scrollToLevel(5)}
            className="px-6 py-3.5 rounded-full border border-[#D9D7CC] bg-white text-sm font-bold text-[#131209] hover:bg-slate-50 transition-colors"
          >
            Explore Ecosystem
          </button>
        </div>

        {/* Level Quick Jump Bar */}
        <div className="mt-14 w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl border border-[#E5E5DE] p-3 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
          {LEVELS.map((lvl) => {
            const isCur = activeLevelId === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => scrollToLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isCur
                    ? 'bg-[#0088E0] text-white shadow-xs'
                    : 'text-[#5C5B55] hover:text-[#131209] hover:bg-slate-100'
                }`}
                title={`Level ${lvl.id}: ${lvl.title}`}
              >
                {lvl.id < 10 ? `0${lvl.id}` : '10'}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Spotlight Section with Background SVG Path */}
      <section
        ref={spotlightRef}
        className="spotlight relative overflow-hidden py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-24 sm:gap-36"
      >
        {/* Continuous SVG Background Path (from src/assets/path-vector.svg) */}
        <div className="svg-container absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <svg
            viewBox="0 0 3197 7189"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="teklozyGradient"
                x1="1594.16"
                y1="416.793"
                x2="1594.16"
                y2="6988.8"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0088E0" />
                <stop offset="0.5" stopColor="#2563EB" />
                <stop offset="1" stopColor="#0077CC" />
              </linearGradient>
              <filter id="pathGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="16" floodColor="#0088E0" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Faint Background Guide Track */}
            <path
              ref={trackRef}
              d={SVG_PATH_D}
              stroke="#E2E8F0"
              strokeWidth="120"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Foreground Scroll-Drawn Ink Path */}
            <path
              ref={pathRef}
              id="svg-path"
              d={SVG_PATH_D}
              stroke="url(#teklozyGradient)"
              strokeWidth="120"
              strokeLinecap="round"
              filter="url(#pathGlowFilter)"
            />

            {/* Subtle Inner Highlight Rib */}
            <path
              d={SVG_PATH_D}
              stroke="#FFFFFF"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="28 42"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* 10 Level Rows (Alternating Layout) */}
        {LEVELS.map((lvl, index) => {
          const isImageLeft = index % 2 === 0;
          const levelImage = LEVEL_IMAGES[index] || LEVEL_IMAGES[0];
          const isExpanded = !!expandedLevels[lvl.id];
          const isCurrent = activeLevelId === lvl.id;
          const isBenchOpen = activeBenchLevel === lvl.id;

          return (
            <article
              key={lvl.id}
              id={`level-row-${lvl.id}`}
              className={`row relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                isImageLeft ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image Side: High-res visual illustration */}
              <div
                className={`image flex items-center justify-center ${
                  isImageLeft
                    ? 'lg:col-span-6'
                    : 'lg:col-span-6 lg:col-start-7'
                }`}
              >
                <div className="relative group w-full max-w-[480px]">
                  {/* Subtle soft gradient halo behind illustration */}
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
                    style={{ backgroundColor: lvl.accent }}
                  />

                  {/* Level Illustration Image Container */}
                  <div className="relative rounded-3xl p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                      src={levelImage}
                      alt={`Level ${lvl.id}: ${lvl.title}`}
                      className="w-full h-auto object-contain max-h-[380px] drop-shadow-xl select-none"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />

                    {/* Level Badge Overlay Pill */}
                    <div
                      className="absolute bottom-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                      style={{ backgroundColor: lvl.accent }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Level {lvl.id < 10 ? `0${lvl.id}` : '10'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Side: MindMarket Styled White Floating Content Card */}
              <div
                className={`card-wrapper ${
                  isImageLeft
                    ? 'lg:col-span-6'
                    : 'lg:col-span-6 lg:col-start-1'
                }`}
              >
                <div
                  className={`card bg-white rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-sm hover:shadow-xl ${
                    isCurrent
                      ? 'border-[#0088E0] ring-2 ring-[#0088E0]/20'
                      : 'border-[#E5E5DE]'
                  }`}
                >
                  {/* Top Stage Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                    <span
                      className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${lvl.accent}15`,
                        color: lvl.accent,
                      }}
                    >
                      {lvl.stageName}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      Step {lvl.id} of 10
                    </span>
                  </div>

                  {/* Declarative Headline (MindMarket style) */}
                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#131209] tracking-tight leading-tight">
                    {lvl.title}
                  </h2>

                  {/* One Line Summary Paragraph */}
                  <p className="mt-3 text-sm sm:text-base text-[#5C5B55] leading-relaxed">
                    {lvl.line}
                  </p>

                  {/* Feature Bullets / Chips */}
                  <ul className="mt-4 space-y-2">
                    {lvl.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700"
                      >
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                          style={{ backgroundColor: lvl.accent }}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* MindMarket-inspired Pill Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {/* Primary Level Action Pill */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(lvl.id)}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:scale-105"
                      style={{ backgroundColor: lvl.accent }}
                    >
                      <span>{isExpanded ? 'Hide Interactive Lab' : 'Launch Interactive Lab'}</span>
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3 text-white" />
                        ) : (
                          <ArrowRight className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </button>

                    {/* Community Bench (Stack Overflow) Drawer Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveBenchLevel(activeBenchLevel === lvl.id ? null : lvl.id)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:text-[#0088E0] hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isBenchOpen ? 'Close Bench' : 'Community Bench'}</span>
                    </button>
                  </div>

                  {/* Interactive Level Toy Drawer (Expanded) */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                      <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#0088E0]" />
                            Hands-On Interactive Simulator
                          </span>
                        </div>
                        <LevelToy
                          levelId={lvl.id}
                          accent={lvl.accent}
                          onUpdateAccent={() => {}}
                          onAddXp={handleAddXp}
                        />
                      </div>
                    </div>
                  )}

                  {/* Community Bench Q&A Accordion (Stack Overflow Style) */}
                  {isBenchOpen && (
                    <div className="mt-5 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                      <CommunityBench levelId={lvl.id} accent={lvl.accent} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 4. Outro Section */}
      <section className="outro min-h-[60vh] flex flex-col justify-center items-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5E5DE] shadow-xl w-full">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#0088E0]" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            All 10 Stages Complete
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#131209] mt-4 tracking-tight">
            Ready for level one?
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#5C5B55] max-w-lg mx-auto">
            Take the first step. Explore the top 5 careers, build production projects, pass autonomous test suites, and join our global alumni guild.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToLevel(1)}
              className="px-6 py-3.5 rounded-full border border-[#D9D7CC] text-sm font-bold text-[#131209] hover:bg-slate-50 transition-colors"
            >
              Back to Start
            </button>

            <button
              onClick={() => setShowClaimModal(true)}
              className="bg-[#0088E0] hover:bg-[#0077CC] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              Claim Your Career Spot
            </button>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-16 text-xs text-[#5C5B55] flex flex-col sm:flex-row items-center gap-3">
          <span>Teklozy Gamified Learning Ecosystem</span>
          <span className="hidden sm:inline">•</span>
          <span>10 Stages • 1 SVG River Path • Built with React, GSAP & Lenis</span>
        </footer>
      </section>

      {/* Claim Spot Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0088E0]">
                <img
                  src={teloAvatar}
                  alt="Telo mascot"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#131209]">
                  Claim Your Level 01 Spot
                </h3>
                <p className="text-xs text-slate-500">
                  Begin your 10-level journey with Telo as your guide.
                </p>
              </div>
            </div>

            {isClaimed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm text-center">
                Spot claimed! Welcome aboard, champion!
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={claimEmail}
                  onChange={(e) => setClaimEmail(e.target.value)}
                  placeholder="Enter your student email..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/20"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#0088E0] text-white text-sm font-bold hover:bg-[#0077CC] shadow-sm"
                  >
                    Confirm Spot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
