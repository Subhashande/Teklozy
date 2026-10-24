import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 10-Stage S-Curve River Path threading from Stage 1 (left) to Stage 10 (right)
export const SVG_PATH_D =
  'M 300 20 L 300 350 C 300 750, 900 750, 900 1150 C 900 1550, 300 1550, 300 1950 C 300 2350, 900 2350, 900 2750 C 900 3150, 300 3150, 300 3550 C 300 3950, 900 3950, 900 4350 C 900 4750, 300 4750, 300 5150 C 300 5550, 900 5550, 900 5950 C 900 6350, 300 6350, 300 6750 C 300 7150, 900 7150, 900 7550 L 900 7800';

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
