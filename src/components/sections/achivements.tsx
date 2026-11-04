import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CalendarDays, UsersRound, GraduationCap, ChartNoAxesColumnIncreasing } from 'lucide-react';


import community1 from '../../assets/images/community/community-1.webp';
import community2 from '../../assets/images/community/community-2.webp';
import community3 from '../../assets/images/community/community-3.webp';
import community4 from '../../assets/images/community/community-4.webp';
import community5 from '../../assets/images/community/community-5.webp';
import community6 from '../../assets/images/community/community-6.webp';
import community7 from '../../assets/images/community/community-7.webp';
import community8 from '../../assets/images/community/community-8.webp';
import community9 from '../../assets/images/community/community-9.webp';
import logoPng from '../../assets/images/erasebg-teklozy.webp';
import startupIndiaLogo from '../../assets/images/startup-india-mark.webp';


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

export interface AchivementsProps {
  onOpenContact?: () => void;
}

export const Achivements: React.FC<AchivementsProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let xPos = 0;
    let isPaused = false;
    let tickerCallback: ((time: number, deltaTime: number) => void) | null = null;

    // 1. Continuous Ticker for Auto-Marquee
    const SPEED = 36; // px per second
    tickerCallback = (_time: number, deltaTime: number) => {
      if (isPaused) return;
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
    };
    const onMouseLeave = () => {
      isPaused = false;
      // Resume the automatic community gallery motion.
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      id="achievements"
      className="achievements-section relative w-full bg-[#F7F7F2] pt-8 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
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
          {/* Official Startup India recognition — minimal, centered, original asset */}
          <div className="flex flex-col items-center mb-5 sm:mb-6" aria-label="Startup India initiative">
            <div className="mb-3 flex w-full max-w-[260px] items-center gap-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span aria-hidden="true" className="h-px flex-1 bg-slate-300" />
              <span className="whitespace-nowrap">Proudly part of</span>
              <span aria-hidden="true" className="h-px flex-1 bg-slate-300" />
            </div>
            <img src={startupIndiaLogo} alt="Startup India" width="180" height="64" className="h-10 sm:h-12 w-auto max-w-[180px] object-contain" loading="eager" decoding="async" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-4 py-2 text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#087FC8] mb-4 select-none">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0789D8]" />
            <span>Our Community</span>
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
              <img decoding="async"
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
          className="relative z-10 w-full overflow-hidden  py-2"
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
                    <img decoding="async"
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
                      <img decoding="async"
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
                      <img decoding="async"
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

        <p className="mt-5 text-center text-[11px] font-medium tracking-wide text-slate-400">A glimpse of the Teklozy community</p>

        <section className="relative max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-24" aria-labelledby="impact-heading">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 top-8 h-64 rounded-[50%] bg-sky-100/45 blur-3xl" />
          <div className="relative mx-auto max-w-4xl text-center px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-[#10233F] shadow-sm">
              <ChartNoAxesColumnIncreasing className="h-4 w-4 text-[#0789D8]" aria-hidden="true" />
              <span>Our Impact</span>
            </div>
            <h2 id="impact-heading" className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] leading-tight text-[#10233F]">
              Creating Real <span className="text-[#0789D8]">Career Opportunities</span>
            </h2>
            <p className="mt-4 mx-auto max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-500">
              Programs, experiences and partnerships that turn student potential into real outcomes.
            </p>
          </div>

          <div className="relative mt-9 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <article className="group relative isolate flex min-h-[142px] items-center gap-5 overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white px-5 py-6 sm:px-6 shadow-[0_12px_32px_rgba(15,45,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,90,150,0.12)]">
              <div aria-hidden="true" className="absolute bottom-0 right-0 -z-10 h-20 w-36 rounded-tl-[100%] bg-gradient-to-tl from-sky-100 to-transparent opacity-90" />
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#0789D8] ring-1 ring-sky-100 sm:h-[72px] sm:w-[72px]">
                <CalendarDays className="h-8 w-8" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-4xl sm:text-[2.65rem] leading-none font-bold tracking-[-0.045em] text-[#10233F]">60<span className="text-[#0789D8]">+</span></p>
                <p className="mt-2 text-sm sm:text-base font-medium leading-snug text-[#263B56]">Events &amp; programs</p>
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#087FE0] via-[#38BDF8] to-[#B7E8FF]" />
            </article>

            <article className="group relative isolate flex min-h-[142px] items-center gap-5 overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white px-5 py-6 sm:px-6 shadow-[0_12px_32px_rgba(15,45,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,90,150,0.12)]">
              <div aria-hidden="true" className="absolute bottom-0 right-0 -z-10 h-20 w-36 rounded-tl-[100%] bg-gradient-to-tl from-sky-100 to-transparent opacity-90" />
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#0789D8] ring-1 ring-sky-100 sm:h-[72px] sm:w-[72px]">
                <UsersRound className="h-8 w-8" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-4xl sm:text-[2.65rem] leading-none font-bold tracking-[-0.045em] text-[#10233F]">1,500<span className="text-[#0789D8]">+</span></p>
                <p className="mt-2 text-sm sm:text-base font-medium leading-snug text-[#263B56]">Career interactions delivered</p>
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#087FE0] via-[#38BDF8] to-[#B7E8FF]" />
            </article>

            <article className="group relative isolate flex min-h-[142px] items-center gap-5 overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white px-5 py-6 sm:px-6 shadow-[0_12px_32px_rgba(15,45,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,90,150,0.12)]">
              <div aria-hidden="true" className="absolute bottom-0 right-0 -z-10 h-20 w-36 rounded-tl-[100%] bg-gradient-to-tl from-sky-100 to-transparent opacity-90" />
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[#0789D8] ring-1 ring-sky-100 sm:h-[72px] sm:w-[72px]">
                <GraduationCap className="h-8 w-8" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-4xl sm:text-[2.65rem] leading-none font-bold tracking-[-0.045em] text-[#10233F]">45<span className="text-[#0789D8]">+</span></p>
                <p className="mt-2 text-sm sm:text-base font-medium leading-snug text-[#263B56]">Partner colleges &amp; universities</p>
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#087FE0] via-[#38BDF8] to-[#B7E8FF]" />
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Achivements;
