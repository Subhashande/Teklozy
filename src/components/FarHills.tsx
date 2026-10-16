import React from 'react';

/**
 * FarHills: Parallax background layer (depth 0.4)
 * Spans across the entire 12000px horizontal landscape with soft alpine silhouettes, clouds, and gradient hues.
 */
export const FarHills: React.FC = () => {
  return (
    <div className="w-full h-full pointer-events-none select-none relative overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 12000 800"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#F8FAFC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>

          <linearGradient id="farMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="midMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sky wash */}
        <rect width="12000" height="800" fill="url(#skyGrad)" />

        {/* Distant atmospheric mountains repeating across the 10 levels */}
        {Array.from({ length: 10 }).map((_, i) => {
          const offsetX = i * 1200;
          return (
            <g key={i}>
              {/* Soft Distant Peaks */}
              <polygon
                points={`${offsetX - 200},420 ${offsetX + 250},140 ${offsetX + 700},420`}
                fill="url(#farMountainGrad)"
              />
              <polygon
                points={`${offsetX + 400},440 ${offsetX + 850},180 ${offsetX + 1300},440`}
                fill="url(#farMountainGrad)"
              />

              {/* Mid Layer Rolling Hills */}
              <path
                d={`M ${offsetX} 480 Q ${offsetX + 300} 320, ${offsetX + 600} 460 T ${offsetX + 1200} 480 L ${offsetX + 1200} 800 L ${offsetX} 800 Z`}
                fill="url(#midMountainGrad)"
              />

              {/* Distant Fluffy Clouds */}
              <ellipse cx={offsetX + 320} cy={120} rx={120} ry={35} fill="#FFFFFF" fillOpacity="0.65" />
              <ellipse cx={offsetX + 360} cy={105} rx={80} ry={45} fill="#FFFFFF" fillOpacity="0.75" />
              <ellipse cx={offsetX + 880} cy={160} rx={140} ry={40} fill="#FFFFFF" fillOpacity="0.6" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
