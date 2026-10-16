import React, { useRef, useState, useEffect } from 'react';
import {
  DESKTOP_JOURNEY_PATH,
  MOBILE_JOURNEY_PATH,
  JOURNEY_LEVELS,
  CAREER_CLASSES,
  CareerClass,
} from '../data/journeyConfig';
import { useTeklozyJourney } from '../hooks/useTeklozyJourney';
import { JourneyExplorer } from './BrandVectors';
import {
  Check,
  Sparkles,
  Compass,
  Flame,
  Star,
  Code2,
  Terminal,
  Layers,
  ArrowRight,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import miniHoloImg from '../assets/mini-holo.jpg';
import miniByteImg from '../assets/mini-byte.jpg';
import miniCampfireImg from '../assets/mini-campfire.jpg';

interface CareerJourneySectionProps {
  prefersReducedMotion: boolean;
  selectedClass: CareerClass;
  onSelectClass: (c: CareerClass) => void;
}

export const CareerJourneySection: React.FC<CareerJourneySectionProps> = ({
  prefersReducedMotion,
  selectedClass,
  onSelectClass,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawPathRef = useRef<SVGPathElement | null>(null);
  const explorerGroupRef = useRef<SVGGElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const { masterProgress, activeLevel, explorerDirection } = useTeklozyJourney({
    containerRef,
    drawPathRef,
    explorerGroupRef,
    isMobile,
    prefersReducedMotion,
  });

  const activePathData = isMobile ? MOBILE_JOURNEY_PATH : DESKTOP_JOURNEY_PATH;
  const viewBox = isMobile ? '0 0 420 3200' : '0 0 1200 3200';

  return (
    <section
      id="levels"
      className="relative pt-8 pb-32 bg-[#F8FAFC] tk-grid-bg overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sticky HUD Level Progress Indicator Bar */}
        <div className="sticky top-20 z-40 max-w-4xl mx-auto mb-10 transition-all">
          <div className="tk-card px-5 py-3.5 bg-white/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 border border-[#CBD5E1] shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0088E0] to-[#00C2FF] text-white font-display font-bold flex items-center justify-center shadow-md">
                {activeLevel < 10 ? `0${activeLevel}` : 'X'}
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Milestone
                </div>
                <div className="font-display font-bold text-sm sm:text-base text-[#0F172A]">
                  {activeLevel < 10
                    ? `Level 0${activeLevel} — ${JOURNEY_LEVELS[activeLevel - 1].title}`
                    : 'Level 10 — Sky Citadel Uncharted'}
                </div>
              </div>
            </div>

            {/* Segmented 10-level progress bar */}
            <div className="flex items-center gap-1.5 flex-1 min-w-[200px] max-w-xs">
              {JOURNEY_LEVELS.map((lvl) => {
                const isCompleted = activeLevel > lvl.level;
                const isCurrent = activeLevel === lvl.level;
                return (
                  <div
                    key={lvl.level}
                    className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                      lvl.isHiddenMystery
                        ? isCurrent
                          ? 'bg-[#FBBF24] shadow-[0_0_8px_#FBBF24]'
                          : 'bg-slate-200'
                        : isCompleted
                        ? 'bg-[#10B981]'
                        : isCurrent
                        ? 'bg-[#0088E0] scale-y-125 shadow-[0_0_8px_#0088E0]'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            {/* Gamified HUD Pills */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 shadow-sm">
                <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                <span className="font-display font-bold">{Math.round(masterProgress * 2450)} XP</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-900 shadow-sm">
                <Flame className="w-4 h-4 fill-[#F43F5E] text-[#F43F5E]" />
                <span className="font-display font-bold">{Math.max(1, activeLevel * 3)}d Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Interactive SVG Journey Stage */}
        <div ref={containerRef} className="relative w-full h-[3200px]">
          {/* SVG Canvas with Winding Journey Path and Beacons */}
          <svg
            viewBox={viewBox}
            className="w-full h-full overflow-visible pointer-events-none absolute inset-0 z-10"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Luminous Gradient for Journey Ribbon */}
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00C2FF" />
                <stop offset="25%" stopColor="#0088E0" />
                <stop offset="55%" stopColor="#2563EB" />
                <stop offset="85%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              {/* Glowing River Shadow Filter */}
              <filter id="riverGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0088E0" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* 1. River Bank Outer Glow Layer */}
            <path
              d={activePathData}
              fill="none"
              stroke="#DBEAFE"
              strokeWidth={isMobile ? '42' : '62'}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* 2. Base Ribbon Track (Dashed guide underneath) */}
            <path
              d={activePathData}
              fill="none"
              stroke="#93C5FD"
              strokeWidth={isMobile ? '28' : '44'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3. Foreground Scroll-Drawn Luminous River */}
            <path
              ref={drawPathRef}
              d={activePathData}
              fill="none"
              stroke="url(#riverGradient)"
              strokeWidth={isMobile ? '24' : '38'}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#riverGlow)"
            />

            {/* 4. Center Specular Water Ripple Dashes */}
            <path
              d={activePathData}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 20"
              opacity="0.75"
              className="animate-glow-flow"
            />

            {/* 5. SVG Milestone Beacons along the path */}
            {JOURNEY_LEVELS.map((lvl) => {
              const pt = isMobile ? lvl.coords.mobile : lvl.coords.desktop;
              const isCompleted =
                prefersReducedMotion || masterProgress >= lvl.progressThreshold + 0.04;
              const isActive = !prefersReducedMotion && activeLevel === lvl.level;

              return (
                <g key={lvl.level} transform={`translate(${pt.x}, ${pt.y})`}>
                  {/* Glowing ground ellipse beacon on the river surface */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx={isMobile ? '22' : '32'}
                    ry={isMobile ? '10' : '15'}
                    fill="#00C2FF"
                    fillOpacity={isActive ? '0.45' : '0.22'}
                    stroke={isActive ? '#00C2FF' : '#38BDF8'}
                    strokeWidth={isActive ? '3.5' : '2'}
                    className={isActive ? 'animate-beacon-pulse' : ''}
                  />

                  {/* Vertical stem connecting the river ring to the floating milestone card */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={isMobile ? '-40' : '-55'}
                    stroke={isActive ? '#0088E0' : '#64748B'}
                    strokeWidth="2.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx="0"
                    cy={isMobile ? '-40' : '-55'}
                    r="4.5"
                    fill={isActive ? '#0088E0' : '#64748B'}
                  />

                  {/* Beacon center point */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isMobile ? '5' : '7'}
                    fill={isCompleted ? '#10B981' : isActive ? '#0088E0' : '#FFFFFF'}
                    stroke="#0F172A"
                    strokeWidth="2.5"
                  />
                </g>
              );
            })}

            {/* 6. Travelling Explorer Character (Byte) */}
            <g ref={explorerGroupRef}>
              <g transform="translate(-38, -68)">
                <JourneyExplorer
                  mood={activeLevel >= 9 ? 'celebrate' : 'idle'}
                  direction={explorerDirection}
                  size={76}
                />
              </g>
            </g>
          </svg>

          {/* ===================================================================
              FLOATING INTERACTIVE UI CARDS (Directly Matching Reference Image)
          =================================================================== */}

          {/* --- LEVEL 01 MILESTONE CARD & SURROUNDING MOCKUPS --- */}
          {(() => {
            const lvl = JOURNEY_LEVELS[0];
            const pt = isMobile ? lvl.coords.mobile : lvl.coords.desktop;
            const isActive = activeLevel === 1;
            const isCompleted = activeLevel > 1;

            return (
              <div
                key="lvl-1-group"
                style={{ top: `${pt.y - 120}px` }}
                className={`absolute ${
                  isMobile ? 'left-6 right-6' : 'left-[530px]'
                } z-20 pointer-events-auto`}
              >
                {/* Floating Milestone Card */}
                <div
                  className={`inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-transform hover:-translate-y-1 ${
                    isActive ? 'border-[#0088E0] shadow-[0_8px_20px_rgba(0,136,224,0.2)]' : 'border-[#DCE6F0]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#0088E0] text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {isCompleted ? <Check className="w-5 h-5 text-white" /> : '01'}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Level 01
                    </div>
                    <div className="font-display font-bold text-base text-[#0F172A]">
                      Discover Your Path
                    </div>
                  </div>
                </div>

                {/* Floating Sprint Boards Mockup (from Reference Image) */}
                {!isMobile && (
                  <div className="absolute -top-36 left-48 w-64 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#DCE6F0] p-3.5 shadow-xl animate-float-slow">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-bold text-slate-700 ml-1.5">Sprint Boards</span>
                      </div>
                      <span className="text-xs text-slate-400">···</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold">
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                        <span className="text-emerald-700">Deploy ✓</span>
                        <div className="flex -space-x-1 mt-1">
                          <span className="w-4 h-4 rounded-full bg-blue-500 text-[8px] text-white flex items-center justify-center">A</span>
                          <span className="w-4 h-4 rounded-full bg-emerald-500 text-[8px] text-white flex items-center justify-center">B</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-1.5 rounded-lg border border-blue-200">
                        <span className="text-[#0088E0]">Sprint 🚀</span>
                        <div className="flex -space-x-1 mt-1">
                          <span className="w-4 h-4 rounded-full bg-amber-500 text-[8px] text-white flex items-center justify-center">C</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Review 1</span>
                        <div className="flex -space-x-1 mt-1">
                          <span className="w-4 h-4 rounded-full bg-purple-500 text-[8px] text-white flex items-center justify-center">D</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Code Snippet Terminal (from Reference Image) */}
                {!isMobile && (
                  <div className="absolute -top-16 -left-36 w-48 bg-[#0F172A] rounded-xl p-3 shadow-2xl border border-slate-800 text-[9px] font-mono text-slate-200 animate-float-delayed">
                    <div className="flex items-center gap-1 mb-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[8px] text-slate-400 ml-1 font-sans">app.tsx</span>
                    </div>
                    <div className="text-emerald-400">export const Level01 = &#123;</div>
                    <div className="pl-2 text-sky-300">track: "{selectedClass.archetype}",</div>
                    <div className="pl-2 text-amber-300">xpEarned: 100,</div>
                    <div className="pl-2 text-purple-300">diagnostic: true</div>
                    <div className="text-emerald-400">&#125;</div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* --- LEVEL 02 MILESTONE CARD & SURROUNDING PREVIEWS (Matching Reference Screenshot) --- */}
          {(() => {
            const lvl = JOURNEY_LEVELS[1];
            const pt = isMobile ? lvl.coords.mobile : lvl.coords.desktop;
            const isActive = activeLevel === 2;
            const isCompleted = activeLevel > 2;

            return (
              <div
                key="lvl-2-group"
                style={{ top: `${pt.y - 120}px` }}
                className={`absolute ${
                  isMobile ? 'left-4 right-4' : 'left-[140px] w-[920px]'
                } z-20 pointer-events-auto`}
              >
                {/* 4 Preview Cards with 'Completed ✓' Badges (from Reference Image) */}
                {!isMobile && (
                  <div className="flex items-center gap-4 mb-5">
                    {/* Preview 1: Hologram Platform */}
                    <div className="tk-card p-2.5 bg-white w-32 shadow-md animate-float-slow">
                      <div className="h-20 rounded-xl overflow-hidden bg-slate-900 mb-2">
                        <img src={miniHoloImg} alt="Hologram Milestone" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Completed</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                    </div>

                    {/* Preview 2: Code Editor Window */}
                    <div className="tk-card p-2.5 bg-white w-32 shadow-md animate-float-delayed">
                      <div className="h-20 rounded-xl bg-[#0F172A] p-2 text-[8px] font-mono text-sky-300 flex flex-col justify-between overflow-hidden mb-2">
                        <div className="flex items-center gap-1 border-b border-slate-700 pb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="space-y-0.5">
                          <div>fn runStreak() &#123;</div>
                          <div className="text-emerald-400 pl-1.5">verifyStreak(12);</div>
                          <div>&#125;</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Completed</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                    </div>

                    {/* Preview 3: Laptop Setup */}
                    <div className="tk-card p-2.5 bg-white w-32 shadow-md animate-float-slow">
                      <div className="h-20 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-2">
                        <Laptop className="w-9 h-9 text-[#0088E0]" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Completed</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                    </div>

                    {/* Preview 4: Mini Byte Sprite */}
                    <div className="tk-card p-2.5 bg-white w-32 shadow-md animate-float-gentle">
                      <div className="h-20 rounded-xl overflow-hidden bg-sky-100 mb-2">
                        <img src={miniByteImg} alt="Byte Explorer Sprite" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span>Completed</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Level 02 Floating Milestone Card */}
                <div className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-transform hover:-translate-y-1 border-[#DCE6F0]">
                  <div className="w-10 h-10 rounded-full bg-[#0088E0] text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {isCompleted ? <Check className="w-5 h-5 text-white" /> : '02'}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Level 02
                    </div>
                    <div className="font-display font-bold text-base text-[#0F172A]">
                      Build Your Streak
                    </div>
                  </div>
                </div>

                {/* Floating HUD Stat Badges (Day Streak & XP Pill from Reference) */}
                {!isMobile && (
                  <div className="absolute top-28 left-[480px] flex items-center gap-3">
                    {/* Day Streak Pill */}
                    <div className="tk-card px-4 py-2.5 bg-white flex items-center gap-2.5 shadow-md">
                      <Flame className="w-5 h-5 fill-[#F43F5E] text-[#F43F5E]" />
                      <div>
                        <div className="font-display font-bold text-sm leading-none">12</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Day Streak</div>
                      </div>
                    </div>

                    {/* XP Pill */}
                    <div className="tk-card px-4 py-2.5 bg-white flex items-center gap-2.5 shadow-md">
                      <div className="w-5 h-5 rounded-full bg-[#FBBF24] flex items-center justify-center text-white text-[10px] font-bold">
                        ★
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm leading-none">2,450</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">XP</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Career Class Toggle Card (from Reference Image) */}
                {!isMobile && (
                  <div className="absolute top-44 left-[640px] w-64 bg-[#0F172A] text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-float-delayed">
                    <div className="text-xs font-bold text-[#00C2FF] uppercase tracking-wider">
                      Career Class
                    </div>
                    <div className="text-[11px] text-slate-400 mb-3">
                      Gamified interactive components.
                    </div>
                    <div className="space-y-2">
                      {CAREER_CLASSES.slice(0, 2).map((cls) => (
                        <button
                          key={cls.id}
                          onClick={() => onSelectClass(cls)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                            selectedClass.id === cls.id
                              ? 'bg-[#0088E0] text-white shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <span>{cls.archetype} - {cls.role}</span>
                          {selectedClass.id === cls.id && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SVG Journey Path Dotted Chips (from Reference Image) */}
                {!isMobile && (
                  <div className="absolute top-44 left-[140px] bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl border border-[#CBD5E1] shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      SVG Journey Path
                    </div>
                    <div className="flex items-center gap-2">
                      {['4px', '8px', '12px', '1px', 'lgl', '24px', '32px'].map((chip) => (
                        <div
                          key={chip}
                          className="w-7 h-7 rounded-lg border border-dashed border-slate-400 text-[9px] font-mono text-slate-600 flex items-center justify-center font-bold"
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* --- LEVEL 03 MILESTONE CARD & CAMPFIRE SCENE --- */}
          {(() => {
            const lvl = JOURNEY_LEVELS[2];
            const pt = isMobile ? lvl.coords.mobile : lvl.coords.desktop;
            const isActive = activeLevel === 3;
            const isCompleted = activeLevel > 3;

            return (
              <div
                key="lvl-3-group"
                style={{ top: `${pt.y - 120}px` }}
                className={`absolute ${
                  isMobile ? 'left-6 right-6' : 'left-[580px] w-[540px]'
                } z-20 pointer-events-auto`}
              >
                {/* Milestone 03 Card */}
                <div className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border-2 shadow-lg transition-transform hover:-translate-y-1 border-[#DCE6F0]">
                  <div className="w-10 h-10 rounded-full bg-[#0088E0] text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {isCompleted ? <Check className="w-5 h-5 text-white" /> : '03'}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Level 03
                    </div>
                    <div className="font-display font-bold text-base text-[#0F172A]">
                      Master Your Skills
                    </div>
                  </div>
                </div>

                {/* Flanking Campfire & Deployment Cards */}
                {!isMobile && (
                  <div className="flex items-center gap-4 mt-4">
                    {/* Campfire illustration */}
                    <div className="tk-card p-2 bg-white w-36 shadow-lg animate-float-slow">
                      <div className="h-24 rounded-xl overflow-hidden bg-slate-900 mb-1.5">
                        <img src={miniCampfireImg} alt="Cozy Campfire" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] font-bold text-slate-600 text-center">
                        Practice Campfire
                      </div>
                    </div>

                    {/* Deployment checklist widget */}
                    <div className="tk-card p-3 bg-white w-48 shadow-lg text-[10px] font-medium space-y-1.5 animate-float-delayed">
                      <div className="text-[11px] font-bold text-[#0F172A] border-b border-slate-100 pb-1">
                        Deployment Status
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Branch:</span>
                        <span className="font-mono font-bold text-slate-800">main</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Health:</span>
                        <span className="text-emerald-600 font-bold">100% Operational</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* --- REMAINING LEVELS (04 TO 10) --- */}
          {JOURNEY_LEVELS.slice(3).map((lvl) => {
            const pt = isMobile ? lvl.coords.mobile : lvl.coords.desktop;
            const isCompleted = activeLevel > lvl.level;
            const isActive = activeLevel === lvl.level;

            if (lvl.isHiddenMystery) {
              return (
                <div
                  key={lvl.level}
                  style={{ top: `${pt.y - 100}px` }}
                  className="absolute left-1/2 -translate-x-1/2 w-full max-w-md px-4 text-center z-20 pointer-events-auto"
                >
                  <div
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border-2 transition-all duration-500 shadow-xl ${
                      isActive
                        ? 'bg-[#0F172A] text-[#FBBF24] border-[#FBBF24] scale-105'
                        : 'bg-[#0F172A] text-slate-200 border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                    <span className="font-display text-sm uppercase tracking-widest font-bold">
                      Citadel Horizon • Destination X
                    </span>
                  </div>
                </div>
              );
            }

            const desktopPositionClass =
              lvl.align === 'left'
                ? 'md:right-[54%] md:mr-10'
                : 'md:left-[54%] md:ml-10';

            return (
              <div
                key={lvl.level}
                style={{ top: `${pt.y - 80}px` }}
                className={`absolute left-16 right-4 md:w-[380px] ${desktopPositionClass} z-20 transition-all duration-300 pointer-events-auto`}
              >
                <div
                  className={`tk-card p-5 ${
                    isActive
                      ? 'tk-card-active bg-white scale-[1.02]'
                      : isCompleted
                      ? 'bg-white/95 border-[#10B981]/60'
                      : 'bg-white/80 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-display font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isActive
                          ? 'bg-blue-100 text-[#0088E0]'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5 text-[#10B981]" />}
                      LEVEL 0{lvl.level}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {lvl.previewTag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">
                    {lvl.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">{lvl.subtitle}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{lvl.previewMetric}</span>
                    <span
                      className={`font-bold ${
                        isCompleted
                          ? 'text-[#10B981]'
                          : isActive
                          ? 'text-[#0088E0]'
                          : 'text-slate-400'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isActive ? 'Active' : 'Locked'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
