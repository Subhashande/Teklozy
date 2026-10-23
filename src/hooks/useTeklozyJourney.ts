import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * useTeklozyJourney Hook
 * Manages Lenis smooth scroll lifecycle, synchronization with GSAP ticker,
 * and programmatic smooth scroll navigation.
 */
export function useTeklozyJourney() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);

  // Setup Lenis Smooth Scroll and connect to GSAP ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Programmatically scroll smoothly to any level row
  const scrollToLevel = useCallback((id: number) => {
    const targetEl = document.getElementById(`level-row-${id}`);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, {
        offset: -80,
        duration: 1.2,
      });
    }
  }, []);

  // Programmatically scroll smoothly to top
  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return {
    lenisRef,
    activeLevelId,
    setActiveLevelId,
    scrollToLevel,
    scrollToTop,
    showClaimModal,
    setShowClaimModal,
  };
}

export default useTeklozyJourney;
