import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Check, Sparkles } from 'lucide-react';
import { Level } from '../data/journeyConfig';
import { LevelToy } from './Toys/LevelToys';
import { CommunityBench } from './CommunityBench';

interface VerticalLevelCardProps {
  level: Level;
  totalLevels: number;
  isUnlocked: boolean;
  isCurrent: boolean;
  onSelectLevel: (id: number) => void;
  onAddXp?: (amount: number) => void;
}

export const VerticalLevelCard: React.FC<VerticalLevelCardProps> = ({
  level,
  totalLevels,
  isUnlocked,
  isCurrent,
  onSelectLevel,
  onAddXp,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBench, setShowBench] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <article
      tabIndex={0}
      role="region"
      aria-expanded={isExpanded}
      aria-label={`Level ${level.id}: ${level.title}`}
      onKeyDown={handleKeyDown}
      onClick={toggleExpand}
      className={`card cursor-pointer rounded-2xl border-2 p-5 sm:p-6 transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-[#0088E0] focus-visible:ring-offset-2 ${
        isUnlocked
          ? 'bg-white border-[#CBD5E1] shadow-lg hover:shadow-xl hover:-translate-y-1'
          : 'bg-white/70 border-slate-200 opacity-35 filter grayscale-[20%]'
      } ${isCurrent ? 'ring-2 ring-[#0088E0]' : ''}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
      }}
    >
      {/* Top Meta Bar: Level progress & stage name */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <span
          className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: isUnlocked ? `${level.accent}15` : '#F1F5F9',
            color: isUnlocked ? level.accent : '#64748B',
          }}
        >
          Level {level.id} of {totalLevels}
        </span>

        <span className="text-xs font-semibold text-slate-500 truncate max-w-[170px]">
          {level.stageName}
        </span>
      </div>

      {/* Main Declarative Headline */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] leading-snug">
            {level.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
            {level.line}
          </p>
        </div>

        {/* Expand / Collapse Indicator */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label={isExpanded ? 'Collapse features' : 'Expand features'}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Key Feature List with Staggered Entrance */}
      <ul
        className="mt-4 space-y-2"
        role="list"
        aria-label={`Features for ${level.title}`}
      >
        {level.features.map((feature, idx) => (
          <li
            key={feature}
            className={`flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
              isUnlocked ? 'text-slate-700 translate-y-0 opacity-100' : 'text-slate-400 translate-y-1 opacity-70'
            }`}
            style={{
              transitionDelay: `${idx * 60}ms`,
              transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold transition-transform ${
                isUnlocked ? 'scale-100' : 'scale-90 bg-slate-300'
              }`}
              style={isUnlocked ? { backgroundColor: level.accent } : {}}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Expanded Interactive Tray */}
      {isExpanded && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-5 pt-4 border-t border-slate-100 space-y-4 animate-in fade-in duration-300"
        >
          {/* Interactive Level Toy */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0088E0]" />
                Interactive Level Exercise
              </span>
            </div>
            <LevelToy
              levelId={level.id}
              accent={level.accent}
              onUpdateAccent={() => {}}
              onAddXp={onAddXp || (() => {})}
            />
          </div>

          {/* Community Bench Accordion Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowBench(!showBench)}
              className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 text-[#0088E0] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{showBench ? 'Hide Step Community Bench' : 'Open Step Community Bench (Stack Overflow)'}</span>
            </button>

            {showBench && (
              <div className="mt-3">
                <CommunityBench levelId={level.id} accent={level.accent} />
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
