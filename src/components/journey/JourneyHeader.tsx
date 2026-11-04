import React from 'react';

/**
 * JourneyHeader Component
 * Editorial title section:
 * "A journey built around real progress."
 * "Ten focused levels to take you from curiosity to a confident, job-ready professional."
 */
export const JourneyHeader: React.FC = () => {
  return (
    <div className="relative text-center max-w-4xl mx-auto pt-6 pb-12 sm:pb-20 px-4">

      {/* Main Headline with Brand Gradient Accent */}
      <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
        A journey built around{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088E0] via-[#2563EB] to-[#0077CC]">
          real progress.
        </span>
      </h2>

      {/* Editorial Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Ten focused levels to take you from curiosity to a confident, job-ready professional.
      </p>

      {/* Subtle organic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[240px] bg-gradient-to-r from-blue-100/40 via-sky-100/30 to-blue-50/20 blur-3xl rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

export default JourneyHeader;
