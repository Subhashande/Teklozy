import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import teloImg from '../assets/telo-mascot.png';

interface TeloMascotProps {
  accent?: string;
  className?: string;
}

export default function TeloMascot({ accent = '#0088E0', className = '' }: TeloMascotProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [bubble, setBubble] = useState("Let's begin your 10-level journey!");
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    // 1. Mouse parallax tilt for mascot
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current || !wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      gsap.to(imgRef.current, {
        rotateY: dx * 18,
        rotateX: -dy * 18,
        duration: 0.3,
        ease: 'power1.out',
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. Celebrate and speech bubble trigger on level arrival
    const onState = (e: Event) => {
      const customEvent = e as CustomEvent<{ state: string; bubble: string }>;
      if (customEvent.detail?.bubble) {
        setBubble(customEvent.detail.bubble);
      }

      setIsCelebrating(true);
      setTimeout(() => setIsCelebrating(false), 2400);

      if (wrap.current) {
        gsap
          .timeline()
          .to(wrap.current, { y: -28, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 })
          .fromTo(
            '.telo-bubble',
            { scale: 0.4, autoAlpha: 0, y: 12 },
            { scale: 1, autoAlpha: 1, y: 0, ease: 'back.out(2)', duration: 0.35 }
          );

        gsap.to('.telo-bubble', { autoAlpha: 0, y: -8, delay: 3.2, duration: 0.35 });
      }
    };

    const parent = wrap.current?.parentElement;
    if (parent) {
      parent.addEventListener('byte-state', onState);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (parent) {
        parent.removeEventListener('byte-state', onState);
      }
    };
  }, []);

  return (
    <div ref={wrap} className={`relative select-none pointer-events-auto ${className}`}>
      {/* Speech Bubble */}
      <div className="telo-bubble absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-4 py-2.5 text-xs font-bold text-[#0F172A] shadow-2xl border-2 border-[#CBD5E1] opacity-0 z-40 pointer-events-none">
        <span className="relative z-10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0088E0] animate-pulse" />
          <span>{bubble}</span>
        </span>
        {/* Tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-[#CBD5E1] rotate-45" />
      </div>

      {/* Telo Mascot Container */}
      <div className="relative group cursor-pointer">
        {/* Ground Hover Shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0F172A]/25 rounded-full blur-xs transition-all telo-shadow" />

        {/* Mascot Avatar Token with Blue Glow Border */}
        <div
          className={`w-28 h-28 rounded-full overflow-hidden border-4 bg-white p-1 shadow-2xl transition-transform duration-200 ${
            isCelebrating ? 'scale-110 shadow-[0_0_24px_rgba(0,136,224,0.6)]' : 'hover:scale-105'
          }`}
          style={{ borderColor: accent }}
        >
          <img
            ref={imgRef}
            src={teloImg}
            alt="Telo the Teklozy Learning Companion"
            className="w-full h-full object-cover object-top rounded-full telo-avatar"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>

        {/* Level Companion Tag Pill */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-display font-bold text-white shadow-md border border-white uppercase tracking-wider whitespace-nowrap"
          style={{ backgroundColor: accent }}
        >
          Telo Guide
        </div>
      </div>
    </div>
  );
}
