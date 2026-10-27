import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ArrowLeft, ArrowRight, Sparkles, Pause, Play } from 'lucide-react';

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
    type: 'single',
    card: {
      name: 'Siddharth Joshi',
      role: 'Founding Engineer @ Stealth AI',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Ananya S.',
      role: 'Full Stack Dev @ Atlassian',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    bottomCard: {
      name: 'Devansh Pillai',
      role: 'Platform Engineer @ Postman',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'single',
    card: {
      name: 'Varun Malhotra',
      role: 'Systems Architect @ Swiggy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Ananya S.',
      role: 'Frontend Architect @ Stripe',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    bottomCard: {
      name: 'Simran Kaur',
      role: 'Mobile Lead @ CRED',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'single',
    card: {
      name: 'Sameer Choudhury',
      role: 'Cloud Infrastructure @ Razorpay',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Rohit K.',
      role: 'Data Engineer @ PhonePe',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    },
    bottomCard: {
      name: 'Tanvi Joshi',
      role: 'Product Engineer @ Zepto',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'single',
    card: {
      name: 'Aarav Sharma',
      role: 'SDE-II Backend @ Google Cloud',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    type: 'stacked',
    topCard: {
      name: 'Meera Patel',
      role: 'AI Engineer @ Cohere',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    bottomCard: {
      name: 'Kabir Verma',
      role: 'Security Engineer @ Coinbase',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    },
  },
];

// Duplicate columns array so we achieve a smooth, mathematically seamless infinite marquee loop
const REPEATED_COLUMNS = [...COLUMNS, ...COLUMNS];

interface AchivementsProps {
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
    const SPEED = 38; // px per second
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
          setIsPlaying(!isPaused);
        }, 2200);
      },
    })[0];

    // Cleanup
    return () => {
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      draggable.kill();
    };
  }, []);

  // Button navigation controls
  const handleNudge = (direction: 'next' | 'prev') => {
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    const currentX = gsap.getProperty(track, 'x') as number;
    const offset = direction === 'next' ? -260 : 260;
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
      className="achievements-section relative w-full bg-[#F7F7F2] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Outer rounded card container with soft pastel gradient like reference */}
      <div className="relative mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#FFF2F5] via-[#FCFBF8] to-[#F1F8F5] border border-black/[0.06] shadow-[0_12px_45px_-10px_rgba(0,0,0,0.06)] overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12">
        {/* Soft background ambient glow spots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#FFD1DC]/30 blur-[100px]" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#D1F2D9]/35 blur-[100px]" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#E0E7FF]/30 blur-[100px]" />
        </div>

        {/* 1. Header matching exact title and typography: Stories From Our Community */}
        <div className="relative z-10 text-center px-4 mb-10 sm:mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Stories From Our{' '}
            <span className="font-serif italic font-normal text-[#111827]">
              Community
            </span>
          </h2>
        </div>

        {/* 2. Seamless Multi-Column Staggered Masonry Marquee */}
        <div
          ref={containerRef}
          className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing py-2"
        >
          {/* Subtle edge fade masks for smooth entry and exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-20 bg-gradient-to-r from-[#FFF5F7] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-20 bg-gradient-to-l from-[#F2F8F5] to-transparent" />

          {/* Marquee Track containing columns */}
          <div
            ref={trackRef}
            className="flex items-center gap-4 sm:gap-5 w-max will-change-transform px-4"
          >
            {REPEATED_COLUMNS.map((col, idx) => (
              <div key={idx} className="shrink-0">
                {col.type === 'single' ? (
                  /* Single Tall Card (h-[350px]) */
                  <div className="group relative w-[190px] sm:w-[220px] h-[330px] sm:h-[360px] rounded-2xl overflow-hidden shadow-md bg-slate-200 transition-transform duration-300 hover:scale-[1.02]">
                    <img
                      src={col.card.image}
                      alt={col.card.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark gradient for crisp text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                      <h3 className="text-white text-base sm:text-lg font-bold leading-tight drop-shadow-md">
                        {col.card.name}
                      </h3>
                      {col.card.role && (
                        <p className="text-white/80 text-[11px] font-medium mt-0.5 line-clamp-1 drop-shadow-sm">
                          {col.card.role}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Two Stacked Cards (each h-[157px] + 16px gap = 330px/360px total) */
                  <div className="flex flex-col gap-3.5 sm:gap-4 w-[190px] sm:w-[220px]">
                    {/* Top Card */}
                    <div className="group relative w-full h-[158px] sm:h-[172px] rounded-2xl overflow-hidden shadow-md bg-slate-200 transition-transform duration-300 hover:scale-[1.02]">
                      <img
                        src={col.topCard.image}
                        alt={col.topCard.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-left">
                        <h3 className="text-white text-sm sm:text-base font-bold leading-tight drop-shadow-md">
                          {col.topCard.name}
                        </h3>
                        {col.topCard.role && (
                          <p className="text-white/80 text-[10px] sm:text-[11px] font-medium mt-0.5 line-clamp-1 drop-shadow-sm">
                            {col.topCard.role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom Card */}
                    <div className="group relative w-full h-[158px] sm:h-[172px] rounded-2xl overflow-hidden shadow-md bg-slate-200 transition-transform duration-300 hover:scale-[1.02]">
                      <img
                        src={col.bottomCard.image}
                        alt={col.bottomCard.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-left">
                        <h3 className="text-white text-sm sm:text-base font-bold leading-tight drop-shadow-md">
                          {col.bottomCard.name}
                        </h3>
                        {col.bottomCard.role && (
                          <p className="text-white/80 text-[10px] sm:text-[11px] font-medium mt-0.5 line-clamp-1 drop-shadow-sm">
                            {col.bottomCard.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Controls Bar: Prev/Next Buttons and Auto-Marquee Status */}
        <div className="relative z-10 mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4 px-4">
          <button
            onClick={() => handleNudge('prev')}
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black border border-black/10 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Previous Stories"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono px-3.5 py-1.5 rounded-full bg-white/60 border border-black/5 backdrop-blur-sm shadow-sm">
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
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-black border border-black/10 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Next Stories"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Achivements;
