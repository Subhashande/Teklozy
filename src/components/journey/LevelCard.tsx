import React from 'react';
import { Level } from '../../types/journey';
import { LevelToy } from './LevelToys';
import { CommunityBench } from './CommunityBench';
import {
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';

interface LevelCardProps {
  lvl: Level;
  index: number;
  levelImage: string;
  isExpanded: boolean;
  isCurrent: boolean;
  isBenchOpen: boolean;
  onToggleExpand: (levelId: number) => void;
  onToggleBench: (levelId: number) => void;
  onAddXp: (amount: number) => void;
}

/**
 * LevelCard Component
 * Displays alternating 2-column milestone row with high-res 3D illustration,
 * curriculum details, interactive simulator drawer, and community bench.
 */
export const LevelCard: React.FC<LevelCardProps> = ({
  lvl,
  index,
  levelImage,
  isExpanded,
  isCurrent,
  isBenchOpen,
  onToggleExpand,
  onToggleBench,
  onAddXp,
}) => {
  const isImageLeft = index % 2 === 0;

  return (
    <article
      id={`level-row-${lvl.id}`}
      className={`row relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
        isImageLeft ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Image Side: Illustration */}
      <div
        className={`image flex items-center justify-center ${
          isImageLeft
            ? 'lg:col-span-6'
            : 'lg:col-span-6 lg:col-start-7'
        }`}
      >
        <div className="relative group w-full max-w-[480px]">
          {/* Subtle soft gradient halo behind illustration */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-50"
            style={{ backgroundColor: lvl.accent }}
          />

          {/* Level Illustration Image Container */}
          <div className="relative rounded-3xl p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.02]">
            <img
              src={levelImage}
              alt={`Level ${lvl.id}: ${lvl.title}`}
              className="w-full h-auto object-contain max-h-[380px] drop-shadow-xl select-none"
              loading={index < 3 ? 'eager' : 'lazy'}
            />

            {/* Level Badge Overlay Pill */}
            <div
              className="absolute bottom-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5"
              style={{ backgroundColor: lvl.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Level {lvl.id < 10 ? `0${lvl.id}` : '10'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Side: Content Card */}
      <div
        className={`card-wrapper ${
          isImageLeft
            ? 'lg:col-span-6'
            : 'lg:col-span-6 lg:col-start-1'
        }`}
      >
        <div
          className={`card bg-white rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-sm hover:shadow-xl ${
            isCurrent
              ? 'border-[#0088E0] ring-2 ring-[#0088E0]/20'
              : 'border-[#E5E5DE]'
          }`}
        >
          {/* Top Stage Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
            <span
              className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${lvl.accent}15`,
                color: lvl.accent,
              }}
            >
              {lvl.stageName}
            </span>

            <span className="text-xs font-semibold text-slate-400">
              Step {lvl.id} of 10
            </span>
          </div>

          {/* Level Title */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#131209] tracking-tight">
            {lvl.title}
          </h3>

          {/* Level Summary */}
          <p className="mt-3 text-sm sm:text-base text-[#5C5B55] leading-relaxed">
            {lvl.line}
          </p>

          {/* Feature Bullets */}
          <div className="mt-5 space-y-2.5">
            {lvl.features.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${lvl.accent}20` }}
                >
                  <Check
                    className="w-3 h-3 stroke-[3]"
                    style={{ color: lvl.accent }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#131209]">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Action Row: Expand Simulator + Community Bench */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleExpand(lvl.id)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white shadow-xs transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: lvl.accent }}
            >
              <span>{isExpanded ? 'Hide Interactive Lab' : 'Launch Interactive Lab'}</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                {isExpanded ? (
                  <ChevronUp className="w-3 h-3 text-white" />
                ) : (
                  <ArrowRight className="w-3 h-3 text-white" />
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => onToggleBench(lvl.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:text-[#0088E0] hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isBenchOpen ? 'Close Bench' : 'Community Bench'}</span>
            </button>
          </div>

          {/* Interactive Simulator Drawer (Expanded) */}
          {isExpanded && (
            <div className="mt-5 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0088E0]" />
                    Hands-On Interactive Simulator
                  </span>
                </div>
                <LevelToy
                  levelId={lvl.id}
                  accent={lvl.accent}
                  onAddXp={onAddXp}
                />
              </div>
            </div>
          )}

          {/* Community Bench Q&A Accordion */}
          {isBenchOpen && (
            <div className="mt-5 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
              <CommunityBench levelId={lvl.id} accent={lvl.accent} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default LevelCard;
