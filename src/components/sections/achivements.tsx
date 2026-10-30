import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ArrowLeft, ArrowRight, Pause } from 'lucide-react';

import community1 from '../../assets/images/community/community-1.jpeg';
import community2 from '../../assets/images/community/community-2.jpeg';
import community3 from '../../assets/images/community/community-3.png';
import community4 from '../../assets/images/community/community-4.png';
import community5 from '../../assets/images/community/community-5.png';
import community6 from '../../assets/images/community/community-6.jpeg';
import community7 from '../../assets/images/community/community-7.jpeg';
import community8 from '../../assets/images/community/community-8.jpeg';
import community9 from '../../assets/images/community/community-9.jpeg';
import logoPng from '../../assets/images/erasebg-teklozy.png';

gsap.registerPlugin(Draggable);

export interface CommunityCard {
  name: string;
  role: string;
  image: string;
}

export type ColumnData =
  | { type: 'single'; card: CommunityCard }
  | { type: 'stacked'; topCard: CommunityCard; bottomCard: CommunityCard };

const COLUMNS: ColumnData[] = [
  {
    type: 'stacked',
    topCard: {
      name: 'College Campus Cohort',
      role: 'Hackathon Participants',
      image: community8,
    },
    bottomCard: {
      name: 'Student Workshop',
      role: 'Teklozy Cohort',
      image: community6,
    },
  },
  {
    type: 'single',
    card: {
      name: 'Future Developers',
      role: 'Tech Community',
      image: community9,
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Auditorium Seminar',
      role: 'Full-House Masterclass',
      image: community2,
    },
    bottomCard: {
      name: 'Interactive Q&A Session',
      role: 'Campus Tech Day',
      image: community7,
    },
  },
  {
    type: 'single',
    card: {
      name: 'Build Learn Connect',
      role: '1:1 Mentorship Session',
      image: community3,
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Campus Lab Session',
      role: 'Real Code Sprints',
      image: community1,
    },
    bottomCard: {
      name: 'Team Project Collaboration',
      role: 'Engineering Sprint',
      image: community4,
    },
  },
  {
    type: 'single',
    card: {
      name: 'Hands-on Production Code',
      role: 'Student Devs',
      image: community5,
    },
  },
];

// Duplicate columns array for seamless infinite marquee loop
const REPEATED_COLUMNS = [...COLUMNS, ...COLUMNS];

const STATS = [
  {
    value: '15,000+',
    label: 'Career interactions delivered',
  },
  {
    value: '60+',
    label: 'Events & hackathons completed',
  },
  {
    value: '45+',
    label: 'Partner colleges & universities',
  },
  {
    value: '98%',
    label: 'Student placement & satisfaction',
  },
];

export interface AchivementsProps {
  onOpenContact?: () => void;
}

export const Achivements: React.FC<AchivementsProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    let xPos = 0;
    let isPaused = false;
    let isUserDragging = false;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    let tickerCallback: ((time: number, deltaTime: number) => void) | null = null;

    // 1. Continuous Ticker for Auto-Marquee
    const SPEED = 36; // px per second
    tickerCallback = (_time: number, deltaTime: number) => {
      if (isPaused || isUserDragging) return;
      const deltaSeconds = Math.min(deltaTime / 1000, 0.1);
      xPos -= deltaSeconds * SPEED;

      // When half the track is scrolled past, loop back seamlessly
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (xPos <= -halfWidth) {
          xPos += halfWidth;
        } else if (xPos > 0) {
          xPos -= halfWidth;
        }
        gsap.set(track, { x: xPos });
      }
    };

    gsap.ticker.add(tickerCallback);

    // 2. Hover Pause / Resume
    const onMouseEnter = () => {
      isPaused = true;
      setIsPlaying(false);
    };
    const onMouseLeave = () => {
      isPaused = false;
      if (!isUserDragging) {
        setIsPlaying(true);
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    // 3. Draggable for Mouse and Touch Scrubbing
    const draggable = Draggable.create(track, {
      type: 'x',
      trigger: container,
      onPress() {
        isUserDragging = true;
        setIsPlaying(false);
        if (resumeTimeout) clearTimeout(resumeTimeout);
      },
      onDrag() {
        xPos = this.x;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          if (xPos <= -halfWidth) {
            xPos += halfWidth;
            this.update();
          } else if (xPos > 0) {
            xPos -= halfWidth;
            this.update();
          }
        }
      },
      onDragEnd() {
        resumeTimeout = setTimeout(() => {
          isUserDragging = false;
          if (!container.matches(':hover')) {
            isPaused = false;
            setIsPlaying(true);
          }
        }, 1200);
      },
    })[0];

    return () => {
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      draggable.kill();
    };
  }, []);

  // Button navigation controls to nudge track
  const handleNudge = (direction: 'next' | 'prev') => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    const currentX = gsap.getProperty(track, 'x') as number;
    const offset = direction === 'next' ? -280 : 280;
    let targetX = currentX + offset;

    if (targetX <= -halfWidth) targetX += halfWidth;
    if (targetX > 0) targetX -= halfWidth;

    gsap.to(track, {
      x: targetX,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="achievements"
      className="achievements-section relative w-full bg-[#F7F7F2] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background Soft Lighting and Ambient Arcs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-gradient-to-b from-[#E0F2FE]/55 via-[#EBF5FF]/30 to-transparent blur-[120px]" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#E0E7FF]/40 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#CFFAFE]/40 blur-[100px]" />

        {/* Subtle decorative curved ambient arc line */}
        <svg
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[1300px] h-[450px] text-sky-300/35 pointer-events-none"
          viewBox="0 0 1300 450"
          fill="none"
        >
          <path
            d="M-50 220 C 350 30, 950 30, 1350 220"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto px-4">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5FF] border border-[#BFDBFE]/80 text-[#0088E0] text-xs font-bold tracking-wider uppercase mb-4 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0088E0] animate-pulse" />
            <span>OUR COMMUNITY</span>
          </div>

          {/* Main Heading: Success Stories from Our Community */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
            Success Stories from Our{' '}
            <span className="relative inline-block text-[#0088E0]">
              Community
              {/* Decorative curved brush underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3.5 text-[#0088E0]/40 -z-10"
                viewBox="0 0 240 14"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 10C60 3 180 3 237 10"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-4 text-base sm:text-lg text-[#55565B] max-w-2xl mx-auto font-manrope font-normal leading-relaxed">
            From campus meetups and hackathons to real-world projects and global partnerships, our community is turning learning into opportunities.
          </p>
        </div>

        {/* 2. Collaboration Brand Lockup: Teklozy × Coding Club with Doodle Sparks */}
        <div className="flex items-center justify-center gap-5 sm:gap-9 my-8 sm:my-11 relative max-w-md mx-auto">
          {/* Left doodle confetti spark */}
          <div className="hidden sm:block absolute -left-12 lg:-left-16 text-[#0088E0] select-none">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M4 14C8 10 12 8 16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10 20C13 17 17 15 20 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6 26C10 24 14 22 18 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Teklozy Emblem & Brand Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 select-none">
            <div className="h-9 w-9 sm:h-11 sm:w-11 overflow-hidden flex items-start justify-center shrink-0">
              <img
                src={logoPng}
                alt="Teklozy Emblem"
                className="w-full h-[150%] object-contain filter drop-shadow-[0_2px_8px_rgba(0,136,224,0.35)]"
              />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-[28px] text-[#111827] tracking-tight">
              Tek<span className="text-[#0088E0]">lozy</span>
            </span>
          </div>

          {/* Multiplication ✕ symbol */}
          <span className="text-xl sm:text-2xl font-light text-slate-400 select-none">
            ✕
          </span>

          {/* Coding Club Logo & Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 select-none">
            <div className="font-serif italic font-black text-3xl sm:text-[38px] text-[#00B4D8] tracking-tighter leading-none select-none">
              CC
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-display font-extrabold text-xs sm:text-sm tracking-[0.18em] text-[#111827] uppercase">
                Coding Club
              </span>
            </div>
          </div>

          {/* Right doodle spark */}
          <div className="hidden sm:block absolute -right-12 lg:-right-16 text-[#0088E0] select-none">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M28 14C24 10 20 8 16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 20C19 17 15 15 12 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M26 26C22 24 18 22 14 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 3. Staggered Masonry Images Marquee Slider (Alternating Single & Stacked) */}
        <div
          ref={containerRef}
          className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing py-2"
        >
          {/* Subtle edge fade masks for smooth entry and exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-[#F7F7F2] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-[#F7F7F2] to-transparent" />

          {/* Marquee Track containing columns */}
          <div
            ref={trackRef}
            className="flex items-center gap-4 sm:gap-5 w-max will-change-transform px-4"
          >
            {REPEATED_COLUMNS.map((col, idx) => (
              <div key={idx} className="shrink-0">
                {col.type === 'single' ? (
                  /* Single Tall Card */
                  <div className="group relative w-[200px] sm:w-[230px] md:w-[250px] h-[330px] sm:h-[360px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-slate-200 transition-all duration-300 hover:scale-[1.02] border border-black/[0.05]">
                    <img
                      src={col.card.image}
                      alt={col.card.name || 'Community moment'}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-semibold drop-shadow-sm line-clamp-1">
                        {col.card.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Two Stacked Cards */
                  <div className="flex flex-col gap-3.5 sm:gap-4 w-[200px] sm:w-[230px] md:w-[250px]">
                    {/* Top Card */}
                    <div className="group relative w-full h-[158px] sm:h-[172px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-slate-200 transition-all duration-300 hover:scale-[1.02] border border-black/[0.05]">
                      <img
                        src={col.topCard.image}
                        alt={col.topCard.name || 'Community moment'}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-xs font-semibold drop-shadow-sm line-clamp-1">
                          {col.topCard.name}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Card */}
                    <div className="group relative w-full h-[158px] sm:h-[172px] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-slate-200 transition-all duration-300 hover:scale-[1.02] border border-black/[0.05]">
                      <img
                        src={col.bottomCard.image}
                        alt={col.bottomCard.name || 'Community moment'}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <span className="text-white text-xs font-semibold drop-shadow-sm line-clamp-1">
                          {col.bottomCard.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Controls Bar: Prev/Next Buttons and Auto-Marquee Status */}
        <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 px-4">
          <button
            onClick={() => handleNudge('prev')}
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-black border border-black/10 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Previous Stories"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono px-3.5 py-1.5 rounded-full bg-white/70 border border-black/5 backdrop-blur-sm shadow-sm select-none">
            {isPlaying ? (
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-gliding</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-500">
                <Pause className="w-3 h-3 text-slate-400" />
                <span>Paused on hover</span>
              </span>
            )}
            <span className="text-slate-300">|</span>
            <span className="hidden sm:inline text-slate-500">Drag or swipe cards</span>
          </div>

          <button
            onClick={() => handleNudge('next')}
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-black border border-black/10 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Next Stories"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* 4. Bottom Metric Numbers Bar - 2nd Reference Image Style */}
        <div className="max-w-6xl mx-auto rounded-3xl sm:rounded-[2rem] bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] py-8 sm:py-10 px-6 sm:px-12 mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center px-3 ${
                  idx > 1 ? 'pt-6 md:pt-0' : idx === 1 ? 'pt-0' : ''
                }`}
              >
                {/* 2nd Reference Image Number Style: Elegant Serif Display Number */}
                <div className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal sm:font-medium text-[#111827] tracking-tight leading-none text-center">
                  {stat.value}
                </div>
                {/* Clean, minimalist descriptive subtext underneath */}
                <p className="text-xs sm:text-sm text-[#4B5563] font-medium text-center mt-2.5 sm:mt-3 max-w-[175px] mx-auto leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achivements;
