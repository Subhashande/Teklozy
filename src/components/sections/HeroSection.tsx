import React from 'react';
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react';

interface HeroSectionProps {
  activeLevelId: number;
  onScrollToLevel: (levelId: number) => void;
  onOpenClaimModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeLevelId,
  onScrollToLevel,
  onOpenClaimModal,
}) => {
  return (
    <div className="relative font-manrope">
      {/* 1. Main Hero Artwork Section - Matching Reference Image */}
      <section className="hero pt-[116px] sm:pt-[132px] pb-16 px-6 sm:px-12 lg:px-20 text-left font-manrope">
        <div className="hero__content">
          {/* Eyebrow */}
          <span className="hero__eyebrow text-xs font-bold tracking-[0.18em] text-[#93c5fd] uppercase drop-shadow-sm">
            YOUR CAREER. A BRIGHTER TOMORROW.
          </span>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] text-white max-w-[760px] drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]">
            Climb from zero to{' '}
            <span className="block text-[#63d6ff]">industry champion.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-5 sm:mt-6 mb-7 sm:mb-8 text-[#E0E9FF] text-base sm:text-lg lg:text-[19px] leading-[1.65] max-w-[540px] drop-shadow-sm font-normal">
            Ten milestone levels connected by one continuous path. Watch your future take shape as the stroke draws itself through real-world experience, AI agents, and verified placement.
          </p>

          {/* Action Buttons */}
          <div className="hero__actions flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={() => onScrollToLevel(1)}
              className="hero__primary group"
              title="Start Your Journey"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onScrollToLevel(4)}
              className="hero__secondary group"
              title="Watch Video"
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Play className="w-3.5 h-3.5 fill-[#0088E0] text-[#0088E0] ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>

          {/* 3 Reference Feature Pills (Horizontal compact layout matching reference image) */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 select-none">
            {/* Pill 1: Real-World Experience */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Zap className="w-4 h-4 fill-white text-white" />
              </div>
              <div className="flex flex-col justify-center text-left leading-tight">
                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">Real-World</span>
                <span className="text-[11px] sm:text-xs font-medium text-[#C8DCFF] whitespace-nowrap">Experience</span>
              </div>
            </div>

            {/* Pill 2: AI-Powered Learning */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0088E0] to-[#0066B3] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4 fill-white text-white" />
              </div>
              <div className="flex flex-col justify-center text-left leading-tight">
                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">AI-Powered</span>
                <span className="text-[11px] sm:text-xs font-medium text-[#C8DCFF] whitespace-nowrap">Learning</span>
              </div>
            </div>

            {/* Pill 3: Verified Placement */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-white stroke-[2.4]" />
              </div>
              <div className="flex flex-col justify-center text-left leading-tight">
                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">Verified</span>
                <span className="text-[11px] sm:text-xs font-medium text-[#C8DCFF] whitespace-nowrap">Placement</span>
              </div>
            </div>
          </div>

          {/* Scroll to Explore Mouse Indicator */}
          <div
            onClick={() => onScrollToLevel(1)}
            className="mt-12 sm:mt-16 inline-flex items-center gap-3 cursor-pointer text-white/75 hover:text-white transition-colors group select-none"
            role="button"
            tabIndex={0}
            aria-label="Scroll to explore journey"
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/50 group-hover:border-white flex items-start justify-center p-1 transition-colors">
              <span className="w-1 h-2 bg-white/90 rounded-full animate-bounce" />
            </div>
            <span className="text-xs font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {/* 2. Trusted Partners Row & 4 Key Metrics Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-slate-200/80">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
          Trusted by Thousands of Students & Leading Hiring Partners
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088E0]" /> Google Cloud
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> AWS Guild
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Codecraft Labs
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> VentureBio
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> NextGen Startups
          </div>
        </div>

        {/* 4 Key Performance Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#131209]">10,000+</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Active Learners</p>
          </div>
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#0088E0]">$500K+</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Bounties & Scholarships</p>
          </div>
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#131209]">94%</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Placement Success Rate</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-2xl sm:text-3xl font-black text-amber-500">4.9 / 5</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Community Rating</p>
          </div>
        </div>

        {/* Level Fast-Travel Navigation Bar */}
        <div className="mt-8 w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvlNum) => {
            const isCur = activeLevelId === lvlNum;
            return (
              <button
                key={lvlNum}
                onClick={() => onScrollToLevel(lvlNum)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isCur
                    ? 'bg-[#0088E0] text-white shadow-xs'
                    : 'text-[#5C5B55] hover:text-[#131209] hover:bg-slate-100'
                }`}
                title={`Jump to Level ${lvlNum}`}
              >
                {lvlNum < 10 ? `0${lvlNum}` : '10'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

