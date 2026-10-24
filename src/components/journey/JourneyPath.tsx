import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fallback path string for SSR and automated testing suites
export const SVG_PATH_D =
  'M 300 100 L 300 300 C 300 600, 900 600, 900 900 C 900 1200, 300 1200, 300 1500 C 300 1800, 900 1800, 900 2100 C 900 2400, 300 2400, 300 2700 C 300 3000, 900 3000, 900 3300 C 900 3600, 300 3600, 300 3900 C 300 4200, 900 4200, 900 4500 C 900 4800, 300 4800, 300 5100 C 300 5400, 900 5400, 900 5700 L 900 5950';

interface JourneyPathProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

interface Point {
  x: number;
  y: number;
}

/**
 * Continuous Teklozy Brand River Path Component
 * A wide, solid, continuous flowing ribbon directly connecting all 10 milestone
 * images in an organic S-curve without white dashes, flashing radar dots, or side clipping.
 */
export const JourneyPath: React.FC<JourneyPathProps> = ({ containerRef }) => {
  const [pathData, setPathData] = useState<string>(SVG_PATH_D);
  const [dims, setDims] = useState<{ width: number; height: number }>({ width: 1400, height: 6000 });

  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Calculate pixel-perfect coordinates connecting all 10 level images
  const updatePathGeometry = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cWidth = Math.max(container.clientWidth || containerRect.width, 320);
    const cHeight = Math.max(container.clientHeight || containerRect.height, 1000);

    const points: Point[] = [];

    // Query each of the 10 level illustration image wrappers
    for (let i = 1; i <= 10; i++) {
      const imgEl = document.getElementById(`level-img-${i}`);
      if (imgEl) {
        const rect = imgEl.getBoundingClientRect();
        // Compute center point of the 3D illustration
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        points.push({ x, y });
      }
    }

    if (points.length < 2) {
      setDims({ width: cWidth, height: cHeight });
      return;
    }

    setDims({ width: cWidth, height: cHeight });

    // Build organic S-curve threading through all 10 images
    // Start slightly above level 1 image
    const startX = points[0].x;
    const startY = Math.max(0, points[0].y - 180);

    let d = `M ${startX} ${startY} L ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;

      // Vertical control points generate silky smooth S-curves without side-clipping
      const cp1x = p1.x;
      const cp1y = p1.y + dy * 0.44;

      const cp2x = p2.x;
      const cp2y = p2.y - dy * 0.44;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    // Exit cleanly below level 10
    const last = points[points.length - 1];
    const endY = last.y + 200;
    d += ` L ${last.x} ${endY}`;

    setPathData(d);
  }, [containerRef]);

  // Initial calculation + dynamic ResizeObserver
  useEffect(() => {
    // Delay slightly to ensure images & layout have completed initial render
    const timer = setTimeout(updatePathGeometry, 120);

    const container = containerRef.current;
    let observer: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updatePathGeometry();
      });
      observer.observe(container);
    }

    window.addEventListener('resize', updatePathGeometry, { passive: true });

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener('resize', updatePathGeometry);
    };
  }, [containerRef, updatePathGeometry]);

  // GSAP ScrollTrigger stroke drawing setup
  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    triggerRef.current?.kill();

    const length = path.getTotalLength();
    if (!length || length < 10) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      gsap.set(path, {
        strokeDashoffset: 0,
      });
      return;
    }

    // Setup dasharray for smooth scroll drawing
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Scrub drawing synchronously with page scroll
    triggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: 'top 75%',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });
      },
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, [containerRef, pathData]);

  return (
    <div
      className="svg-container absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-visible"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${dims.width} ${dims.height}`}
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
            <stop offset="25%" stopColor="#0088E0" />
            <stop offset="65%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0077CC" />
          </linearGradient>

          {/* Soft Electric Blue Glow */}
          <filter id="riverGlowFilter" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="22" floodColor="#0088E0" floodOpacity="0.32" />
          </filter>
        </defs>

        {/* 1. Faint Background Guide Track (Soft Sky Blue) */}
        <path
          d={pathData}
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="126"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* 2. Outer Subtle Border Cushion Track */}
        <path
          d={pathData}
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="134"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />

        {/* 3. Wide Foreground Scroll-Drawn Teklozy Solid Ribbon Path */}
        <path
          ref={pathRef}
          id="teklozy-drawn-path"
          d={pathData}
          fill="none"
          stroke="url(#teklozyBrandGradient)"
          strokeWidth="110"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#riverGlowFilter)"
        />
      </svg>
    </div>
  );
};

export default JourneyPath;
