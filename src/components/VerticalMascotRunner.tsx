import React, { useEffect, useRef } from 'react';
import teloImg from '../assets/telo-mascot.png';

export type MascotState = 'idle' | 'walking' | 'arriving' | 'celebrating';

interface VerticalMascotRunnerProps {
  x: number;
  y: number;
  angle: number;
  state: MascotState;
  bubbleText?: string;
  accent?: string;
}

export const VerticalMascotRunner: React.FC<VerticalMascotRunnerProps> = ({
  x,
  y,
  angle,
  state,
  bubbleText,
  accent = '#0088E0',
}) => {
  const isCelebrating = state === 'celebrating';
  const isArriving = state === 'arriving';
  const isWalking = state === 'walking';

  return (
    <div
      className="absolute top-0 left-0 pointer-events-none z-30 transition-transform duration-75 will-change-transform"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* Speech Bubble */}
      <div
        className={`absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-[#0F172A] shadow-lg border border-[#CBD5E1] transition-all duration-300 pointer-events-auto ${
          bubbleText ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: accent }}
          />
          <span>{bubbleText || "Let's level up!"}</span>
        </span>
        {/* Pointer Tail */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-[#CBD5E1] rotate-45" />
      </div>

      {/* Mascot Container with Tilt & Dynamic Animation */}
      <div
        className="relative transition-transform duration-150"
        style={{
          transform: `rotate(${Math.max(-14, Math.min(14, angle))}deg)`,
        }}
      >
        {/* Dynamic Ground Shadow */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#0F172A]/20 blur-[2px] transition-all duration-200 ${
            isWalking ? 'w-14 h-3 scale-95 opacity-80' : isCelebrating ? 'w-18 h-4 scale-110 opacity-60' : 'w-16 h-3.5'
          }`}
        />

        {/* Mascot Avatar Token */}
        <div
          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-[3px] bg-white p-1 shadow-xl transition-all duration-300 ${
            isCelebrating
              ? 'scale-115 ring-4 ring-[#0088E0]/40'
              : isArriving
              ? 'scale-105'
              : 'hover:scale-105'
          }`}
          style={{
            borderColor: accent,
            transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <img
            src={teloImg}
            alt="Telo mascot companion"
            className={`w-full h-full object-cover object-top rounded-full select-none ${
              isWalking ? 'animate-pulse' : ''
            }`}
            draggable={false}
          />
        </div>

        {/* Status Pill Badge */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-sm border border-white tracking-wider uppercase whitespace-nowrap"
          style={{ backgroundColor: accent }}
        >
          {state}
        </div>
      </div>
    </div>
  );
};
