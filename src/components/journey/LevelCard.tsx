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
  const isImageLeft = index % 2 === 0;
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: article,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        visual,
        {
          opacity: 0,
          y: 45,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
        }
      ).fromTo(
        info,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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
      className={`row relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
        isImageLeft ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Visual Scene Side: Organic 3D Island & Floating UI Cards */}
      <div
        ref={visualRef}
        className={`w-full ${
          isImageLeft ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'
        }`}
      >
        <LevelVisualScene lvl={lvl} index={index} levelImage={levelImage} />
      </div>

      {/* Information Side: Destructured Editorial Typography & Chips */}
      <div
        ref={infoRef}
        className={`w-full ${
          isImageLeft ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-1'
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
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
            {renderTitle()}
          </h3>

          {/* Editorial Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {lvl.line}
          </p>

          {/* Feature Pill Chips Row */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-6">
            {lvl.chips && lvl.chips.length > 0 ? (
              lvl.chips.map((chip, cIdx) => {
                const IconComponent = ICON_MAP[chip.icon] || CheckCircle;
                return (
                  <div
                    key={cIdx}
                    className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xs flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <IconComponent className="w-4 h-4 text-[#0088E0] shrink-0" />
                    <span>{chip.label}</span>
                  </div>
                );
              })
            ) : (
              lvl.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-xs flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700"
                >
                  <CheckCircle className="w-4 h-4 text-[#0088E0] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))
            )}
          </div>

          {/* Action Call-to-Action Link */}
          <div className="mt-8">
            <a
              href="#explore"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0088E0] hover:text-[#0070BA] transition-all group"
            >
              <span>{lvl.ctaText || 'Explore Careers'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LevelCard;
