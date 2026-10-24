import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Level } from '../../types/journey';
import { Check } from 'lucide-react';

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

/**
 * LevelCard Component
 * Displays alternating 2-column milestone row with high-res 3D illustration
 * and curriculum details. Enhanced with smooth GSAP entrance reveals and
 * organic floating illustration physics.
 */
export const LevelCard: React.FC<LevelCardProps> = ({
  lvl,
  index,
  levelImage,
  isCurrent = false,
}) => {
  const isImageLeft = index % 2 === 0;
  const articleRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);

  // GSAP scroll entrance & continuous gentle floating physics
  useEffect(() => {
    const article = articleRef.current;
    const imgWrap = imageWrapRef.current;
    const cardWrap = cardWrapRef.current;
    if (!article || !imgWrap || !cardWrap) return;

    // 1. Entrance reveal tied to ScrollTrigger
    const entranceCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: article,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        imgWrap,
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
        cardWrap,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.45'
      );

      // 2. Continuous organic subtle floating physics on 3D island illustration
      const floatInner = imgWrap.querySelector('.level-floating-island');
      if (floatInner) {
        gsap.to(floatInner, {
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
      entranceCtx.revert();
    };
  }, [index]);

  return (
    <article
      ref={articleRef}
      id={`level-row-${lvl.id}`}
      className={`row relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center ${
        isImageLeft ? '' : 'lg:grid-flow-dense'
      }`}
    >
      {/* Image Side: 3D Illustration Island */}
      <div
        ref={imageWrapRef}
        className={`image flex items-center justify-center ${
          isImageLeft ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'
        }`}
      >
        <div className="relative group w-full max-w-[480px]">
          {/* Soft Teklozy branding halo behind illustration */}
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-25 transition-opacity duration-500 group-hover:opacity-45"
            style={{ backgroundColor: lvl.accent }}
          />

          {/* Level Illustration Image Container (Anchor for Path Connection) */}
          <div
            id={`level-img-${lvl.id}`}
            className="level-floating-island relative rounded-3xl p-4 sm:p-6 transition-transform duration-500 group-hover:scale-[1.03]"
          >
            <img
              src={levelImage}
              alt={`Level ${lvl.id}: ${lvl.title}`}
              className="w-full h-auto object-contain max-h-[380px] drop-shadow-2xl select-none"
              loading={index < 3 ? 'eager' : 'lazy'}
            />

            {/* Level Badge Overlay Pill */}
            <div
              className="absolute bottom-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5 backdrop-blur-sm"
              style={{ backgroundColor: lvl.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Level {lvl.id < 10 ? `0${lvl.id}` : '10'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Side: Curriculum & Milestones */}
      <div
        ref={cardWrapRef}
        className={`card-wrapper ${
          isImageLeft ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-1'
        }`}
      >
        <div
          className={`card bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-sm hover:shadow-xl ${
            isCurrent
              ? 'border-[#0088E0] ring-4 ring-[#0088E0]/15 shadow-blue-100'
              : 'border-[#E5E5DE] hover:border-blue-200'
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
        </div>
      </div>
    </article>
  );
};

export default LevelCard;
