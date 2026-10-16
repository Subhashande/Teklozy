import React from 'react';
import logoPng from '../assets/erasebg-teklozy.png';

/**
 * Teklozy Official Emblem & Wordmark
 * Matches the reference image with crisp wing-shield 'T' logo and Teklozy typography.
 */
export const TeklozyLogo: React.FC<{ className?: string; showWordmark?: boolean }> = ({
  className = 'h-9',
  showWordmark = true,
}) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <img
      src={logoPng}
      alt="Teklozy Emblem"
      className="h-8 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,136,224,0.25)]"
    />
    {showWordmark && (
      <span className="font-display text-2xl font-bold tracking-tight leading-none text-[#0F172A]">
        Tek<span className="text-[#0088E0]">lozy</span>
      </span>
    )}
  </div>
);

/**
 * Byte — The Teklozy Explorer Mascot
 * Designed with windswept dark hair, blue explorer cape, white & blue tech hoodie, and glowing 'T' backpack.
 */
export const JourneyExplorer: React.FC<{
  mood?: 'idle' | 'hint' | 'celebrate' | 'focused';
  direction?: 'left' | 'right';
  size?: number;
  className?: string;
}> = ({ mood = 'idle', direction = 'right', size = 76, className = '' }) => {
  const flipScale = direction === 'left' ? -1 : 1;

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scaleX(${flipScale})`, transition: 'transform 0.25s ease' }}
        aria-label="Byte the Teklozy Explorer"
      >
        {/* Ground Hover Shadow */}
        <ellipse cx="60" cy="112" rx="28" ry="6" fill="#0F172A" fillOpacity="0.22" />

        {/* Flowing Blue Explorer Cape */}
        <path
          d="M42 54 C18 60, 10 82, 14 100 C26 97, 38 92, 48 85 Z"
          fill="#1D4ED8"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M45 56 C24 64, 18 80, 20 94 C29 92, 40 87, 48 81 Z"
          fill="#2563EB"
        />

        {/* Tech Backpack with Glowing 'T' Emblem */}
        <rect
          x="32"
          y="50"
          width="22"
          height="30"
          rx="6"
          fill="#0F172A"
          stroke="#000000"
          strokeWidth="3"
        />
        {/* Glowing Neon Cyan T */}
        <path d="M38 60 H48 M43 60 V72" stroke="#00C2FF" strokeWidth="3.2" strokeLinecap="round" />
        <rect x="36" y="74" width="14" height="2" rx="1" fill="#00C2FF" opacity="0.8" />

        {/* Explorer Boots & Legs */}
        <path d="M51 84 L47 104 H57 L59 84 Z" fill="#0F172A" stroke="#000" strokeWidth="2.5" />
        <path d="M66 84 L70 104 H80 L74 84 Z" fill="#0F172A" stroke="#000" strokeWidth="2.5" />
        <rect x="45" y="101" width="14" height="6" rx="3" fill="#2563EB" stroke="#000" strokeWidth="2" />
        <rect x="68" y="101" width="14" height="6" rx="3" fill="#2563EB" stroke="#000" strokeWidth="2" />

        {/* White & Blue Hoodie Torso */}
        <path
          d="M46 54 C46 48, 74 48, 74 54 L78 84 H43 L46 54 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Blue Accents on Hoodie */}
        <path d="M46 54 L52 70 M74 54 L68 70" stroke="#0088E0" strokeWidth="3" strokeLinecap="round" />
        {/* 'T' Chest Crest */}
        <path d="M57 63 H67 M62 63 V74" stroke="#0088E0" strokeWidth="3.5" strokeLinecap="round" />

        {/* Backpack Strap */}
        <path d="M49 53 C49 65, 50 74, 52 82" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" />

        {/* Head & Face */}
        <circle cx="62" cy="35" r="18" fill="#FFE3D4" stroke="#0F172A" strokeWidth="3" />

        {/* Expressive Eyes */}
        <ellipse cx="57" cy="36" rx="2.8" ry="3.6" fill="#0F172A" />
        <ellipse cx="69" cy="36" rx="2.8" ry="3.6" fill="#0F172A" />
        <circle cx="58" cy="34.5" r="1" fill="#FFFFFF" />
        <circle cx="70" cy="34.5" r="1" fill="#FFFFFF" />

        {/* Confident Smile */}
        <path
          d="M59 43 Q63 47 67 43"
          stroke="#0F172A"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Spiky Dark Anime Explorer Hair */}
        <path
          d="M41 34 C39 20, 50 11, 63 12 C76 11, 85 20, 83 33 C80 26, 73 24, 68 27 C64 21, 56 22, 52 28 C48 25, 43 28, 41 34 Z"
          fill="#0F172A"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Mood Badge */}
        {mood === 'celebrate' && (
          <g transform="translate(84, 14)">
            <circle cx="12" cy="12" r="11" fill="#FBBF24" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M12 6 L14 11 L19 12 L14 14 L12 19 L10 14 L5 12 L10 11 Z" fill="#FFFFFF" />
          </g>
        )}
        {mood === 'hint' && (
          <g transform="translate(84, 14)">
            <circle cx="10" cy="10" r="9" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5" />
            <path d="M10 5 V11 M10 14 V15" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
