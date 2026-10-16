import React from 'react';
import { Volume2, VolumeX, Flame, Star, Trophy } from 'lucide-react';
import { LEVELS } from '../data/journeyConfig';

interface VerticalLevelProgressProps {
  currentLevelId: number;
  highestUnlockedId: number;
  xpCount: number;
  streakDays: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onJumpToLevel: (levelId: number) => void;
}

export const VerticalLevelProgress: React.FC<VerticalLevelProgressProps> = ({
  currentLevelId,
  highestUnlockedId,
  xpCount,
  streakDays,
  soundEnabled,
  onToggleSound,
  onJumpToLevel,
}) => {
  const currentLevel = LEVELS.find((l) => l.id === currentLevelId) || LEVELS[0];

  return (
    <aside
      aria-label="Level progression and quick jump"
      className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-md border-2 border-[#CBD5E1] rounded-2xl shadow-xl p-3.5 flex flex-col gap-3 max-w-[280px] w-full transition-all duration-300 pointer-events-auto"
      style={{
        transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      {/* Top Header: Progress Counter & Stats */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#0088E0]" />
          <span className="text-xs font-bold text-[#0F172A]">
            Level {currentLevelId} of {LEVELS.length}
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`p-1.5 rounded-lg border text-xs transition-colors ${
            soundEnabled
              ? 'bg-blue-50 border-blue-200 text-[#0088E0]'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
          }`}
          title={soundEnabled ? 'Mute level unlock chime' : 'Enable level unlock chime'}
          aria-label={soundEnabled ? 'Mute level unlock chime' : 'Enable level unlock chime'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Stats pills: Streak & XP */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
        <div className="flex items-center gap-1.5 bg-rose-50 px-2.5 py-1 rounded-lg text-rose-700 border border-rose-200/60">
          <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{streakDays}d Streak</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg text-amber-700 border border-amber-200/60">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>{xpCount.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Level Jump Dots List */}
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
          Fast Travel
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {LEVELS.map((lvl) => {
            const isDone = lvl.id <= highestUnlockedId;
            const isCur = lvl.id === currentLevelId;

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onJumpToLevel(lvl.id)}
                className={`py-1 rounded-lg text-xs font-bold border transition-all duration-200 ${
                  isCur
                    ? 'bg-[#0088E0] text-white border-[#0088E0] shadow-sm scale-105'
                    : isDone
                    ? 'bg-blue-50/80 text-[#0088E0] border-blue-200 hover:bg-blue-100'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
                }`}
                title={`Level ${lvl.id}: ${lvl.title}`}
                aria-label={`Jump to Level ${lvl.id}: ${lvl.title}`}
              >
                {lvl.id < 10 ? `0${lvl.id}` : '10'}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
