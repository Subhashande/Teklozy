import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ByteProps {
  outfitAccent?: string;
  className?: string;
}

export default function Byte({ outfitAccent = '#00C2FF', className = '' }: ByteProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const [bubble, setBubble] = useState("Let's begin!");

  useEffect(() => {
    // 1. Eyes follow cursor
    const move = (e: MouseEvent) => {
      if (!wrap.current || !eyes.current) return;
      const r = wrap.current.getBoundingClientRect();
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      gsap.to(eyes.current, {
        x: Math.cos(a) * 3.5,
        y: Math.sin(a) * 3.5,
        duration: 0.15,
        ease: 'power1.out',
      });
    };
    window.addEventListener('mousemove', move);

    // 2. Eye blink loop every 3.5s
    const blink = gsap.timeline({ repeat: -1, repeatDelay: 3.5 }).to('.byte-eye', {
      scaleY: 0.12,
      transformOrigin: '50% 50%',
      duration: 0.08,
      yoyo: true,
      repeat: 1,
    });

    // 3. Celebrate + Speech bubble trigger on arrival
    const onState = (e: Event) => {
      const customEvent = e as CustomEvent<{ state: string; bubble: string }>;
      if (customEvent.detail?.bubble) {
        setBubble(customEvent.detail.bubble);
      }

      if (wrap.current) {
        gsap
          .timeline()
          .to(wrap.current, { y: -24, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 })
          .to('.arm-r', { rotate: -140, transformOrigin: '0% 0%', duration: 0.18, yoyo: true, repeat: 3 }, 0)
          .to('.arm-l', { rotate: 140, transformOrigin: '100% 0%', duration: 0.18, yoyo: true, repeat: 3 }, 0);

        gsap.fromTo(
          '.byte-bubble',
          { scale: 0.4, autoAlpha: 0, y: 10 },
          { scale: 1, autoAlpha: 1, y: 0, ease: 'back.out(2)', duration: 0.35 }
        );
        gsap.to('.byte-bubble', { autoAlpha: 0, y: -6, delay: 2.8, duration: 0.35 });
      }
    };

    const parent = wrap.current?.parentElement;
    if (parent) {
      parent.addEventListener('byte-state', onState);
    }

    return () => {
      window.removeEventListener('mousemove', move);
      blink.kill();
      if (parent) {
        parent.removeEventListener('byte-state', onState);
      }
    };
  }, []);

  return (
    <div ref={wrap} className={`relative select-none pointer-events-auto ${className}`}>
      {/* Dynamic Pop-up Speech Bubble */}
      <div className="byte-bubble absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xl border-2 border-[#CBD5E1] opacity-0 z-30 pointer-events-none">
        <span className="relative z-10">{bubble}</span>
        {/* Tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-[#CBD5E1] rotate-45" />
      </div>

      {/* Byte SVG Character Illustration (Duolingo Quality Mascot) */}
      <svg
        viewBox="0 0 100 120"
        className="byte-svg w-24 h-28 overflow-visible filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.25)]"
      >
        <defs>
          <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00C2FF" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="50" cy="115" rx="26" ry="6" fill="#0F172A" fillOpacity="0.22" />

        {/* Explorer Flowing Blue Cape */}
        <path
          className="cape"
          d="M 32 46 C 10 54, 4 82, 10 98 C 22 96, 34 90, 42 82 Z"
          fill="url(#capeGrad)"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Tech Backpack with Glowing 'T' Logo */}
        <rect
          x="24"
          y="42"
          width="20"
          height="32"
          rx="6"
          fill="#0F172A"
          stroke="#000000"
          strokeWidth="2.5"
        />
        {/* Neon glowing 'T' logo on backpack */}
        <path
          d="M 29 52 H 39 M 34 52 V 64"
          stroke={outfitAccent}
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />

        {/* Explorer Running Legs */}
        <g className="leg-l">
          <path d="M 40 76 L 36 98 H 45 L 47 76 Z" fill="#0F172A" stroke="#000" strokeWidth="2" />
          <rect x="33" y="96" width="14" height="6" rx="3" fill="#2563EB" stroke="#000" strokeWidth="1.8" />
        </g>
        <g className="leg-r">
          <path d="M 54 76 L 58 98 H 67 L 62 76 Z" fill="#0F172A" stroke="#000" strokeWidth="2" />
          <rect x="56" y="96" width="14" height="6" rx="3" fill="#2563EB" stroke="#000" strokeWidth="1.8" />
        </g>

        {/* White Tech Hoodie Torso */}
        <path
          d="M 36 44 C 36 38, 64 38, 64 44 L 68 76 H 32 L 36 44 Z"
          fill="url(#hoodieGrad)"
          stroke="#0F172A"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Blue Accent Chest Stripe */}
        <path d="M 36 54 L 42 70 M 64 54 L 58 70" stroke={outfitAccent} strokeWidth="2.5" strokeLinecap="round" />
        {/* 'T' Chest Emblem */}
        <path
          d="M 46 54 H 54 M 50 54 V 64"
          stroke="#0088E0"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Arms */}
        <rect
          className="arm-l"
          x="28"
          y="46"
          width="9"
          height="22"
          rx="4.5"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
        />
        <rect
          className="arm-r"
          x="63"
          y="46"
          width="9"
          height="22"
          rx="4.5"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="2"
        />

        {/* Head & Face */}
        <circle cx="50" cy="28" r="18" fill="#FFE2D1" stroke="#0F172A" strokeWidth="2.8" />

        {/* Interactive Eye Group (Tracks Cursor) */}
        <g ref={eyes}>
          {/* Sclera */}
          <circle cx="44" cy="27" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
          <circle cx="56" cy="27" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />

          {/* Pupils */}
          <ellipse className="byte-eye" cx="44" cy="27" rx="2.5" ry="3.2" fill="#0F172A" />
          <ellipse className="byte-eye" cx="56" cy="27" rx="2.5" ry="3.2" fill="#0F172A" />

          {/* Catchlight sparks */}
          <circle cx="45" cy="25.5" r="1" fill="#FFFFFF" />
          <circle cx="57" cy="25.5" r="1" fill="#FFFFFF" />
        </g>

        {/* Friendly Confident Smile */}
        <path
          d="M 46 36 Q 50 40 54 36"
          stroke="#0F172A"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Anime Dark Windswept Spiky Hair */}
        <path
          d="M 32 26 C 29 13, 40 4, 52 5 C 64 4, 73 13, 70 26 C 67 19, 61 17, 56 20 C 52 14, 44 15, 41 21 C 37 18, 33 21, 32 26 Z"
          fill="#0F172A"
          stroke="#000000"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
