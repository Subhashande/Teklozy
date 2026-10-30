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
  onOpenContact?: () => void;
  onOpenLogin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeLevelId,
  onScrollToLevel,
  onOpenContact,
  onOpenLogin,
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
              onClick={() => onOpenLogin ? onOpenLogin() : onScrollToLevel(1)}
              className="hero__primary group"
              title="Start Your Journey"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
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

    </div>
  );
};

export default HeroSection;

