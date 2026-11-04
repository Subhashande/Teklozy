import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Level } from '../../types/journey';
import { LevelVisualScene } from './LevelVisualScene';
import {
  ArrowRight,
  Compass,
  BarChart2,
  Target,
  Play,
  Code2,
  Flame,
  Layers,
  Globe,
  GitBranch,
  Lightbulb,
  RefreshCw,
  CheckSquare,
  Cloud,
  Bot,
  TrendingUp,
  FileText,
  ExternalLink,
  Share2,
  Video,
  UserCheck,
  Award,
  ShieldCheck,
  Briefcase,
  Trophy,
  Users,
  Coffee,
  MessageSquare,
  Sparkles,
  Medal,
  Key,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LevelCardProps {
  lvl: Level;
  index: number;
  levelImage: string;
  isExpanded?: boolean;
  isCurrent?: boolean;
  onToggleExpand?: (levelId: number) => void;
  onAddXp?: (amount: number) => void;
}

// Icon dictionary for chips
const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  BarChart2,
  Target,
  Play,
  Code2,
  Flame,
  Layers,
  Globe,
  GitBranch,
  Lightbulb,
  RefreshCw,
  CheckSquare,
  Cloud,
  Bot,
  TrendingUp,
  FileText,
  ExternalLink,
  Share2,
  Video,
  UserCheck,
  Award,
  ShieldCheck,
  Briefcase,
  Trophy,
  Users,
  Coffee,
  MessageSquare,
  Sparkles,
  Medal,
  Key,
};

/**
 * LevelCard Component
 * Destructured into clean editorial typography on the information side
 * and an organic 3D illustration scene with floating UI cards on the visual side.
 */
export const LevelCard: React.FC<LevelCardProps> = ({
  lvl,
  index,
  levelImage,
}) => {
  const isImageLeft = index % 2 !== 0;
  const articleRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // GSAP scroll entrance animation
  useEffect(() => {
    const article = articleRef.current;
    const info = infoRef.current;
    const visual = visualRef.current;
    if (!article || !info || !visual) return;

    const ctx = gsap.context(() => {
      // Trigger image appearance precisely when the path connects into this level row
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: article,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. 3D Illustration emerges with organic spring when path connects
      tl.fromTo(
        visual,
        {
          opacity: 0,
          scale: 0.78,
          y: 40,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'back.out(1.4)',
        }
      );

      // 2. Milestone Number Node Springs In
      const nodeEl = visual.querySelector('[id^="level-stage-anchor-"]');
      if (nodeEl) {
        tl.fromTo(
          nodeEl,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' },
          '-=0.65'
        );
      }

      // 3. Editorial typography slides in smoothly
      tl.fromTo(
        info,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // Continuous gentle floating on the 3D island illustration
      const floatEl = visual.querySelector('.level-floating-island');
      if (floatEl) {
        gsap.to(floatEl, {
          y: -10,
          duration: 2.8 + (index % 3) * 0.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: (index % 3) * 0.25,
        });
      }
    }, article);

    return () => {
      ctx.revert();
    };
  }, [index]);

  // Format stage index (01 / 10)
  const stagePill = lvl.id < 10 ? `0${lvl.id} / 10` : `${lvl.id} / 10`;

  // Render title with blue accent highlight
  const renderTitle = () => {
    if (lvl.highlightWord && lvl.title.includes(lvl.highlightWord)) {
      const parts = lvl.title.split(lvl.highlightWord);
      return (
        <>
          {parts[0]}
          <span className="text-[#0088E0]">{lvl.highlightWord}</span>
          {parts[1]}
        </>
      );
    }
    return lvl.title;
  };

  return (
    <article
      ref={articleRef}
      id={`level-row-${lvl.id}`}
      className="row relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
    >
      {/* Information Side: Destructured Editorial Typography & Chips */}
      <div
        ref={infoRef}
        className={`w-full lg:col-span-5 ${
          isImageLeft ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="max-w-xl mx-auto lg:mx-0">
          {/* Dual Pill Stage Eyebrow */}
          <div className="inline-flex items-center gap-2.5 p-1 pr-3.5 rounded-full bg-blue-50/80 border border-blue-200/60 shadow-2xs mb-4">
            <span className="px-2.5 py-1 rounded-full bg-[#0088E0] text-white font-mono font-bold text-xs tracking-tight shadow-xs">
              {stagePill}
            </span>
            <span className="text-xs font-bold text-[#0088E0] uppercase tracking-wider">
              {lvl.stageName}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#131209] tracking-tight font-display mb-4 leading-tight">
            {renderTitle()}
          </h2>

          {/* Descriptive Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-manrope">
            {lvl.line}
          </p>

          {/* Interactive Feature Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {lvl.chips?.map((chip, chipIdx) => {
              const IconComp = ICON_MAP[chip.icon] || Target;
              return (
                <div
                  key={chipIdx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <IconComp className="w-4 h-4 text-[#0088E0]" />
                  <span className="text-xs font-semibold text-slate-700">
                    {chip.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Link */}
          <button
            type="button"
            className="inline-flex items-center gap-2 font-bold text-sm text-[#0088E0] hover:text-[#0077CC] group transition-colors cursor-pointer"
          >
            <span>{lvl.ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Visual Scene Side: Organic 3D Landscape & Mascot */}
      <div
        ref={visualRef}
        className={`w-full lg:col-span-7 ${
          isImageLeft ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <LevelVisualScene
          lvl={lvl}
          index={index}
          levelImage={levelImage}
          isImageLeft={isImageLeft}
        />
      </div>
    </article>
  );
};

export default LevelCard;
