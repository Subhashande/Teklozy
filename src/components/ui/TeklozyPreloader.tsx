import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import emblemPng from '../../assets/images/teklozy-emblem-intro.webp';

interface TeklozyPreloaderProps {
  onComplete?: () => void;
}

const letters = ['T', 'e', 'k', 'l', 'o', 'z', 'y'];

export const TeklozyPreloader: React.FC<TeklozyPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = containerRef.current;
    if (!root) return;

    const finish = () => {
      gsap.to(root, {
        autoAlpha: 0,
        scale: 1.025,
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          onComplete?.();
        },
      });
    };

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set([emblemRef.current, wordRef.current, taglineRef.current], { opacity: 1, clearProps: 'all' });
        gsap.delayedCall(0.25, finish);
        return;
      }

      const lettersEls = letterRefs.current.filter(Boolean);
      gsap.set(emblemRef.current, { opacity: 0, scale: 0.72, y: 18, filter: 'blur(8px)' });
      gsap.set(lettersEls, { opacity: 0, y: 42, rotateX: -65, filter: 'blur(10px)', transformOrigin: '50% 100%' });
      gsap.set(taglineRef.current, { opacity: 0, y: 12, filter: 'blur(5px)' });
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

      const timeline = gsap.timeline({ onComplete: () => gsap.delayedCall(0.55, finish) });
      timeline
        .to(emblemRef.current, {
          opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
        })
        .to(lettersEls, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.82,
          stagger: 0.085,
          ease: 'back.out(1.35)',
        }, '-=0.2')
        .to(underlineRef.current, { scaleX: 1, duration: 0.72, ease: 'power3.inOut' }, '-=0.28')
        .to(taglineRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' }, '-=0.25')
        .to(progressRef.current, { scaleX: 1, duration: 1.15, ease: 'power1.inOut' }, '-=0.15');

      // A restrained, continuous glow gives the wordmark life without any white flash.
      gsap.to(wordRef.current, {
        filter: 'drop-shadow(0 0 22px rgba(0,174,255,0.2))',
        duration: 1.8,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      });
      gsap.to(emblemRef.current, {
        y: -4,
        duration: 2.4,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
      });
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050B17] text-white select-none"
      aria-label="Loading Teklozy"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_43%,rgba(0,151,235,0.16)_0%,rgba(5,11,23,0.04)_38%,#050B17_78%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(74,185,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(74,185,255,0.22)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-[15%] h-96 w-96 rounded-full bg-[#087FE8]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[10%] h-[28rem] w-[28rem] rounded-full bg-[#00C8F0]/10 blur-[145px]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <div ref={emblemRef} className="mb-7 h-20 w-20 sm:h-24 sm:w-24">
          <img decoding="async" src={emblemPng} alt="Teklozy emblem" className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(0,174,255,0.3)]" />
        </div>

        <div ref={wordRef} className="relative" style={{ perspective: '700px' }}>
          <div className="flex items-center justify-center font-display text-[3.8rem] font-extrabold leading-none tracking-[-0.075em] sm:text-8xl">
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(element) => { letterRefs.current[index] = element; }}
                className="inline-block bg-gradient-to-b from-[#8CEEFF] via-[#25CFFF] to-[#087CE8] bg-clip-text text-transparent"
                style={{ willChange: 'transform, opacity, filter' }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div ref={underlineRef} className="mx-auto mt-5 h-[3px] w-[78%] rounded-full bg-gradient-to-r from-[#087CE8] via-[#25D5FF] to-[#087CE8] shadow-[0_0_18px_rgba(0,190,255,0.5)]" />
        </div>

        <div ref={taglineRef} className="mt-6 flex flex-col items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#A7DDF3] sm:text-xs">Your journey starts here</p>
          <p className="text-xs font-medium tracking-[0.16em] text-[#86AFCB]/65 sm:text-sm">
            Learn <span className="px-1.5 text-[#22C8F5]">·</span> Build <span className="px-1.5 text-[#22C8F5]">·</span> Grow <span className="px-1.5 text-[#22C8F5]">·</span> Get hired
          </p>
        </div>
      </div>

      <div className="absolute bottom-9 left-0 right-0 px-8">
        <div className="mx-auto h-px max-w-56 overflow-hidden bg-white/10">
          <div ref={progressRef} className="h-full w-full bg-gradient-to-r from-[#087CE8] via-[#35D9FF] to-[#087CE8]" />
        </div>
        <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-[0.34em] text-[#7BA4C2]/45">TEKLOZY <span className="px-2 text-[#20BFF0]/65">/</span> CAREER ECOSYSTEM</p>
      </div>
    </div>
  );
};

export default TeklozyPreloader;
