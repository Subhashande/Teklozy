import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 10-Stage S-Curve River Path threading directly through image spaces from Stage 1 (right) to Stage 2 (left) and alternating through all 10 stages
export const SVG_PATH_D =
  'M 860 40 L 860 380 C 860 780, 340 780, 340 1180 C 340 1570, 860 1570, 860 1960 C 860 2350, 340 2350, 340 2740 C 340 3130, 860 3130, 860 3520 C 860 3910, 340 3910, 340 4300 C 340 4690, 860 4690, 860 5080 C 860 5470, 340 5470, 340 5860 C 340 6250, 860 6250, 860 6640 C 860 7030, 340 7030, 340 7420 L 340 7700';

interface JourneyPathProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Continuous Teklozy Brand River Path Component
 * A smooth, uninterrupted S-curve ribbon that begins right at Level 1
 * (below the header) and draws progressively through all 10 stages as the user scrolls.
 */
export const JourneyPath: React.FC<JourneyPathProps> = ({ containerRef }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    let tween: gsap.core.Tween | null = null;

    const setupDrawing = () => {
      tween?.kill();

      const length = path.getTotalLength();
      if (!length || length < 10) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      // Initialize path to be hidden (full dashoffset)
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Native GSAP tween with ScrollTrigger scrub
      tween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          end: 'bottom 90%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    };

    // Initial setup
    setupDrawing();

    // Refresh after layout and images settle
    const t1 = setTimeout(setupDrawing, 300);
    const t2 = setTimeout(setupDrawing, 1000);

    const handleResize = () => {
      setupDrawing();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', handleResize, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      tween?.kill();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [containerRef]);

  return (
    <div
      className="svg-container absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 7800"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Teklozy Brand Blue Pipeline Gradient */}
          <linearGradient
            id="teklozyBrandGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="20%" stopColor="#0088E0" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0077CC" />
          </linearGradient>

          {/* Electric Blue Glow */}
          <filter id="riverGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="16" floodColor="#0088E0" floodOpacity="0.38" />
          </filter>
        </defs>

        {/* 1. Faint Soft Background Guide Track (Low opacity guide) */}
        <path
          d={SVG_PATH_D}
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="60"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />

        {/* 2. Bold Vibrant Scroll-Drawn Teklozy River Path */}
        <path
          ref={pathRef}
          id="teklozy-drawn-path"
          d={SVG_PATH_D}
          fill="none"
          stroke="url(#teklozyBrandGradient)"
          strokeWidth="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#riverGlowFilter)"
        />
      </svg>
    </div>
  );
};

export default JourneyPath;
