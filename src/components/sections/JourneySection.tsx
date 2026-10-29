import React, { useRef, useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LEVELS } from '../../data/journeyConfig';
import { JourneyHeader } from '../journey/JourneyHeader';
import { JourneyPath } from '../journey/JourneyPath';
import { LevelCard } from '../journey/LevelCard';
import { Trophy } from 'lucide-react';

// Import all 10 level images from src/assets/levels-img/
import level1Img from '../../assets/levels-img/level-1.png';
import level2Img from '../../assets/levels-img/level-2.png';
import level3Img from '../../assets/levels-img/level-3.png';
import level4Img from '../../assets/levels-img/level-4.png';
import level5Img from '../../assets/levels-img/level-5.png';
import level6Img from '../../assets/levels-img/level-6.png';
import level7Img from '../../assets/levels-img/level-7.png';
import level8Img from '../../assets/levels-img/level-8.png';
import level9Img from '../../assets/levels-img/level-9.png';
import level10Img from '../../assets/levels-img/level-10.png';

const LEVEL_IMAGES = [
  level1Img,
  level2Img,
  level3Img,
  level4Img,
  level5Img,
  level6Img,
  level7Img,
  level8Img,
  level9Img,
  level10Img,
];

interface JourneySectionProps {
  activeLevelId: number;
  onActiveLevelChange: (levelId: number) => void;
  onScrollToLevel: (levelId: number) => void;
  onOpenContact: () => void;
}

/**
 * JourneySection Component
 * Orchestrates the 10-level scroll journey, background river stroke,
 * level rows, simulators, and outro celebration section.
 */
export const JourneySection: React.FC<JourneySectionProps> = ({
  activeLevelId,
  onActiveLevelChange,
  onScrollToLevel,
  onOpenContact,
}) => {
  const spotlightRef = useRef<HTMLElement>(null);
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true });
  const [, setXpCount] = useState(2500);

  // Sync active level indicator with scroll position
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const levelTrigger = ScrollTrigger.create({
      trigger: spotlight,
      start: 'top 75%',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentIdx = Math.min(
          LEVELS.length - 1,
          Math.floor(progress * LEVELS.length)
        );
        onActiveLevelChange(currentIdx + 1);
      },
    });

    return () => {
      levelTrigger.kill();
    };
  }, [onActiveLevelChange]);

  const toggleExpand = (levelId: number) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const handleAddXp = (amount: number) => {
    setXpCount((prev) => prev + amount);
  };

  return (
    <>
      {/* 1. Editorial Section Header (Clean, no path running through title text) */}
      <div className="pt-16 pb-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <JourneyHeader />
      </div>

      {/* 2. Main Spotlight Section with Continuous SVG Path starting at Level 1 */}
      <section
        ref={spotlightRef}
        className="spotlight relative pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-20 sm:gap-28"
      >
        {/* Continuous SVG Background Path starts at Level 1 */}
        <JourneyPath containerRef={spotlightRef} />

        {/* 10 Alternating Milestone Level Cards */}
        {LEVELS.map((lvl, index) => {
          const levelImage = LEVEL_IMAGES[index] || LEVEL_IMAGES[0];
          const isExpanded = !!expandedLevels[lvl.id];
          const isCurrent = activeLevelId === lvl.id;

          return (
            <LevelCard
              key={lvl.id}
              lvl={lvl}
              index={index}
              levelImage={levelImage}
              isExpanded={isExpanded}
              isCurrent={isCurrent}
              onToggleExpand={toggleExpand}
              onAddXp={handleAddXp}
            />
          );
        })}
      </section>

      {/* 2. Outro Celebration Section */}
      <section className="outro min-h-[50vh] flex flex-col justify-center items-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E5E5DE] shadow-xl w-full">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#0088E0]" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            All 10 Stages Complete
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#131209] mt-4 tracking-tight">
            Ready for level one?
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#5C5B55] max-w-lg mx-auto">
            Take the first step. Explore the top 5 careers, build production projects, pass autonomous test suites, and join our global alumni guild.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#0088E0] hover:bg-[#0077CC] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default JourneySection;
