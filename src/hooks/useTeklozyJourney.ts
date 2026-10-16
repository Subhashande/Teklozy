import { useState, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { JOURNEY_LEVELS } from '../data/journeyConfig';

gsap.registerPlugin(ScrollTrigger);

interface UseTeklozyJourneyProps {
  containerRef: RefObject<HTMLDivElement | null>;
  drawPathRef: RefObject<SVGPathElement | null>;
  explorerGroupRef: RefObject<SVGGElement | null>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function useTeklozyJourney({
  containerRef,
  drawPathRef,
  explorerGroupRef,
  isMobile,
  prefersReducedMotion,
}: UseTeklozyJourneyProps) {
  const [masterProgress, setMasterProgress] = useState<number>(0);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [explorerDirection, setExplorerDirection] = useState<'left' | 'right'>('right');

  useGSAP(
    () => {
      const container = containerRef.current;
      const pathEl = drawPathRef.current;
      const explorerEl = explorerGroupRef.current;

      if (!container || !pathEl || !explorerEl) return;

      const totalLength = pathEl.getTotalLength();

      // Reduced motion fallback: reveal full route immediately without pinning or scrubbing character
      if (prefersReducedMotion) {
        gsap.set(pathEl, { strokeDasharray: totalLength, strokeDashoffset: 0 });
        const startPt = pathEl.getPointAtLength(0);
        gsap.set(explorerEl, { x: startPt.x, y: startPt.y });
        return;
      }

      // Initialize stroke-dasharray and stroke-dashoffset so path draws progressively
      gsap.set(pathEl, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      const initialPt = pathEl.getPointAtLength(0);
      gsap.set(explorerEl, {
        x: initialPt.x,
        y: initialPt.y,
        xPercent: -50,
        yPercent: -80,
      });

      const progressProxy = { value: 0 };

      gsap.to(progressProxy, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 28%',
          end: 'bottom 72%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const prog = self.progress;
            const currentLength = prog * totalLength;

            // 1. Synchronize SVG Path Drawing
            gsap.set(pathEl, {
              strokeDashoffset: totalLength - currentLength,
            });

            // 2. Synchronize Explorer Position & Subtle Orientation along the curve
            const point = pathEl.getPointAtLength(currentLength);
            const lookAheadLength = Math.min(totalLength, currentLength + 12);
            const nextPoint = pathEl.getPointAtLength(lookAheadLength);

            const dx = nextPoint.x - point.x;
            const dy = nextPoint.y - point.y;
            // Subtle tilt clamped between -10deg and 10deg so Byte remains upright & readable
            const rawAngle = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
            const clampedTilt = Math.max(-10, Math.min(10, rawAngle * 0.25));

            gsap.set(explorerEl, {
              x: point.x,
              y: point.y,
              rotation: clampedTilt,
            });

            if (Math.abs(dx) > 0.4) {
              setExplorerDirection(dx >= 0 ? 'right' : 'left');
            }

            // 3. Synchronize Active Milestone Level (1 through 10)
            let currentActive = 1;
            for (const lvl of JOURNEY_LEVELS) {
              if (prog >= lvl.progressThreshold - 0.04) {
                currentActive = lvl.level;
              }
            }

            setMasterProgress(prog);
            setActiveLevel(currentActive);
          },
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [isMobile, prefersReducedMotion],
      revertOnUpdate: true,
    }
  );

  return {
    masterProgress,
    activeLevel,
    explorerDirection,
  };
}
