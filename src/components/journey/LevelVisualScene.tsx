import React from 'react';
import { Level } from '../../types/journey';

interface LevelVisualSceneProps {
  lvl: Level;
  index: number;
  levelImage: string;
  isImageLeft?: boolean;
}

/**
 * LevelVisualScene Component
 * Showcases the pure 3D illustration scene matching reference styling.
 * The milestone numbered node sits at the top center of the image space,
 * where the continuous river path physically connects into the scene.
 */
export const LevelVisualScene: React.FC<LevelVisualSceneProps> = ({
  lvl,
  index,
  levelImage,
}) => {
  const stageNum = lvl.id < 10 ? `0${lvl.id}` : `${lvl.id}`;

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* 1. Milestone Numbered Node (Centered at top of image space where the path connects) */}
      <div
        id={`level-stage-anchor-${lvl.id}`}
        className="absolute z-30 -top-5 left-1/2 -translate-x-1/2 transition-transform duration-300 hover:scale-110"
      >
        <div className="w-11 h-11 rounded-full bg-[#0088E0] text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/35 border-2 border-white ring-4 ring-blue-100">
          {stageNum}
        </div>
      </div>

      {/* 2. Pure 3D Illustration Showcase (No clunky extra cards, pure art with natural drop shadow) */}
      <div className="relative rounded-[2.5rem] p-3 sm:p-5 overflow-visible">
        {/* Soft Ambient Radial Lighting */}
        <div
          className="absolute inset-0 max-w-[500px] max-h-[350px] mx-auto rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: lvl.accent || '#0088E0' }}
        />

        {/* 3. Main 3D Level Illustration (Floating Animation) */}
        <div
          id={`level-img-${lvl.id}`}
          className="level-floating-island relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[360px]"
        >
          <img
            src={levelImage}
            alt={`Level ${lvl.id}: ${lvl.title}`}
            className="w-full h-auto object-contain max-h-[420px] sm:max-h-[460px] drop-shadow-[0_24px_45px_rgba(0,136,224,0.16)] select-none transition-transform duration-500 hover:scale-[1.02]"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      </div>

      {/* 4. Subtle Hand-Drawn Sparkle Accent */}
      <div
        className="absolute -bottom-4 right-2 pointer-events-none text-blue-400 opacity-60"
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2V22M2 12H22M5 5L19 19M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default LevelVisualScene;
