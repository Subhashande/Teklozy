import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Continuous SVG path coordinates from path-vector.svg
export const SVG_PATH_D =
  'M2412.38 416.793C1573.38 -189.706 -394.577 529.293 988.376 1914.29C2371.33 3299.29 1503.38 2430.06 2670.88 3633.79C3838.38 4837.53 1543.38 6074.29 822.374 6074.29C101.371 6074.29 -28.122 5205.29 618.874 4650.79C1265.87 4096.29 2877.88 5324.79 2082.88 6988.79';

interface JourneyPathProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Continuous SVG Scroll River Path Component
 * Draws itself responsively as the user scrolls through the 10 milestone levels.
 * Handles resize events, ScrollTrigger refreshes, and clean teardown.
 */
export const JourneyPath: React.FC<JourneyPathProps> = ({ containerRef }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    let pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 70%',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        const offset = pathLength * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });
      },
    });

    const handleResize = () => {
      if (!path) return;
      pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength });
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      trigger.kill();
    };
  }, [containerRef]);

  return (
    <div className="svg-container absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
      <svg
        viewBox="0 0 3197 7189"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="teklozyGradient"
            x1="1594.16"
            y1="416.793"
            x2="1594.16"
            y2="6988.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0088E0" />
            <stop offset="0.5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#0077CC" />
          </linearGradient>

          <filter id="pathGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="16" floodColor="#0088E0" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Faint Background Guide Track */}
        <path
          ref={trackRef}
          d={SVG_PATH_D}
          stroke="#E2E8F0"
          strokeWidth="120"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Foreground Scroll-Drawn Ink Path */}
        <path
          ref={pathRef}
          id="svg-path"
          d={SVG_PATH_D}
          stroke="url(#teklozyGradient)"
          strokeWidth="120"
          strokeLinecap="round"
          filter="url(#pathGlowFilter)"
        />

        {/* Subtle Inner Highlight Rib */}
        <path
          d={SVG_PATH_D}
          stroke="#FFFFFF"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray="28 42"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default JourneyPath;
