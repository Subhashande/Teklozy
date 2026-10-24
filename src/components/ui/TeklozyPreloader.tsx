import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoPng from '../../assets/images/erasebg-teklozy.png';

interface TeklozyPreloaderProps {
  onComplete?: () => void;
}

/**
 * TeklozyPreloader Component
 * High-production brand intro loading screen with Teklozy brand colors:
 * Electric Cyan (#00D2FF) & Teklozy Blue (#0088E0).
 * Features a large glowing emblem, prominent stroke-drawn wordmark,
 * and a smooth curtain reveal into the landing page.
 */
export const TeklozyPreloader: React.FC<TeklozyPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during intro loading sequence
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide the preloader curtain up to open landing page
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.85,
            ease: 'power3.inOut',
            onComplete: () => {
              document.body.style.overflow = '';
              if (onComplete) onComplete();
            },
          });
        },
      });

      // 1. Initial State
      gsap.set(textRef.current, {
        strokeDasharray: 100,
        strokeDashoffset: 100,
        fill: 'transparent',
      });
      gsap.set(emblemRef.current, {
        scale: 0.3,
        opacity: 0,
        y: 15,
      });
      gsap.set([subtextRef.current, glowRef.current], { opacity: 0 });

      // 2. Stroke Draw Animation of Teklozy Wordmark (over 2s)
      tl.fromTo(
        textRef.current,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 2.0,
          ease: 'power2.inOut',
        }
      )
        // 3. Emblem pops into existence with elastic energy
        .to(
          emblemRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'back.out(2.0)',
          },
          '-=1.2'
        )
        // 4. Fill Transition into brand gradient / electric cyan & blue
        .to(
          textRef.current,
          {
            fill: 'url(#teklozyFillGrad)',
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // 5. Ambient brand blue glow and tagline emergence
        .to(
          [glowRef.current, subtextRef.current],
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        // 6. Brief hold so the user experiences the filled logo
        .to({}, { duration: 0.45 });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#070B14] flex flex-col items-center justify-center select-none overflow-hidden"
      aria-label="Loading Teklozy"
    >
      {/* Background Ambient Radial Glows (Teklozy Electric Blue & Cyan Aura) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute pointer-events-none w-[750px] h-[550px] rounded-full bg-gradient-to-tr from-[#0088E0]/25 via-[#00D2FF]/15 to-transparent blur-[160px] -translate-y-8 transition-opacity"
      />

      {/* Subtle Grid Canvas Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#0088E0_1px,transparent_1px)] [background-size:28px_28px]"
      />

      {/* Centered Brand Presentation */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full max-w-4xl">

        {/* Massive SVG Wordmark Drawing */}
        <svg
          viewBox="0 0 1100 220"
          className="w-full max-w-[840px] sm:max-w-[920px] overflow-visible drop-shadow-[0_0_45px_rgba(0,136,224,0.45)]"
        >
          <defs>
            {/* Teklozy Brand Blue Neon Glow Filter */}
            <filter id="teklozyNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00D2FF" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#0088E0" floodOpacity="0.6" />
            </filter>

            {/* Stroke Gradient */}
            <linearGradient id="teklozyStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="50%" stopColor="#0088E0" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>

            {/* Luminous Brand Fill Gradient */}
            <linearGradient id="teklozyFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E0F2FE" />
              <stop offset="70%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#0088E0" />
            </linearGradient>
          </defs>

          {/* Stroke-Drawn & Filled Text "TEKLOZY" */}
          <text
            ref={textRef}
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="central"
            className="font-display font-black tracking-[0.22em] select-none uppercase"
            fontSize="108"
            fill="transparent"
            stroke="url(#teklozyStrokeGrad)"
            strokeWidth="3.6"
            pathLength="100"
            filter="url(#teklozyNeonGlow)"
          >
            teklozy
          </text>
        </svg>

        {/* Tagline / Indicator in Brand Colors */}
        <div
          ref={subtextRef}
          className="flex items-center gap-2.5 mt-5 text-xs sm:text-sm font-mono font-bold tracking-[0.28em] text-[#00D2FF] uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#0088E0] shadow-[0_0_10px_#00D2FF] animate-pulse" />
          <span>Gamified Career Ecosystem</span>
        </div>
      </div>
    </div>
  );
};

export default TeklozyPreloader;
