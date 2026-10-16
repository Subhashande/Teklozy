import React from 'react';
import { TeklozyLogo } from './BrandVectors';
import { Flame, Star, Compass, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { LEVELS } from '../data/journeyConfig';

interface HudProps {
  activeLevelId: number;
  xpCount: number;
  streakDays: number;
  accent: string;
  onJumpToLevel: (levelId: number) => void;
  onOpenEarlyAccess: () => void;
}

export const Hud: React.FC<HudProps> = ({
  activeLevelId,
  xpCount,
  streakDays,
  accent,
  onJumpToLevel,
  onOpenEarlyAccess,
}) => {
  const [soundOn, setSoundOn] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo & Current Level Indicator */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-[#DCE6F0] shadow-sm flex items-center gap-3">
            <TeklozyLogo className="h-8" />
            <div className="hidden sm:block h-5 w-[1px] bg-slate-200" />
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-400">LVL</span>
              <span
                className="w-6 h-6 rounded-lg text-white flex items-center justify-center font-display font-bold shadow-xs text-[11px]"
                style={{ backgroundColor: accent }}
              >
                {activeLevelId < 10 ? `0${activeLevelId}` : '10'}
              </span>
            </div>
          </div>
        </div>

        {/* Level Navigation Dots (Clickable Jump) */}
        <nav
          className="hidden md:flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-[#DCE6F0] shadow-sm pointer-events-auto"
          aria-label="Level progression"
        >
          {LEVELS.map((lvl) => {
            const isCurrent = activeLevelId === lvl.id;
            const isCompleted = activeLevelId > lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => onJumpToLevel(lvl.id)}
                className={`relative px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? 'text-white shadow-xs scale-105'
                    : isCompleted
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                style={isCurrent ? { backgroundColor: lvl.accent } : {}}
                title={`Jump to Level ${lvl.id}: ${lvl.title}`}
              >
                {lvl.id < 10 ? `0${lvl.id}` : '10'}
              </button>
            );
          })}
        </nav>

        {/* Gamified HUD Badges & CTA */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Day Streak Flame Pill */}
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-[#DCE6F0] shadow-sm flex items-center gap-2">
            <Flame className="w-4 h-4 fill-[#F43F5E] text-[#F43F5E]" />
            <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A]">{streakDays}d</span>
          </div>

          {/* Total XP Counter Pill */}
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-[#DCE6F0] shadow-sm flex items-center gap-2">
            <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
            <span className="font-display font-bold text-xs sm:text-sm text-[#0F172A]">{xpCount.toLocaleString()}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#DCE6F0] flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
            title={soundOn ? 'Mute ambient SFX' : 'Enable ambient SFX'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#00C2FF]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Early Access Action Button */}
          <button
            onClick={onOpenEarlyAccess}
            className="tk-btn-primary px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-xl font-bold shadow-sm whitespace-nowrap"
          >
            Claim Spot
          </button>
        </div>
      </div>
    </header>
  );
};
