import React from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { JourneySection } from './components/sections/JourneySection';
import { Footer } from './components/layout/Footer';
import { ClaimSpotModal } from './components/ui/ClaimSpotModal';
import { useTeklozyJourney } from './hooks/useTeklozyJourney';

export default function App() {
  const {
    activeLevelId,
    setActiveLevelId,
    scrollToLevel,
    scrollToTop,
    showClaimModal,
    setShowClaimModal,
  } = useTeklozyJourney();

  return (
    <div className="relative min-h-screen bg-[#F7F7F2] text-[#1A1A1A] font-manrope selection:bg-[#0088E0] selection:text-white">
      <h1 className="sr-only">Teklozy — 10-Level Gamified Career Journey</h1>

      {/* 1. Floating Capsule Header */}
      <Header
        onScrollToLevel={scrollToLevel}
        onOpenClaimModal={() => setShowClaimModal(true)}
      />

      {/* 2. Connected Modular Hero Section */}
      <HeroSection
        activeLevelId={activeLevelId}
        onScrollToLevel={scrollToLevel}
        onOpenClaimModal={() => setShowClaimModal(true)}
      />

      {/* 3. 10-Level Scroll River Path Journey */}
      <JourneySection
        activeLevelId={activeLevelId}
        onActiveLevelChange={setActiveLevelId}
        onScrollToLevel={scrollToLevel}
        onOpenClaimModal={() => setShowClaimModal(true)}
      />

      {/* 4. 4-Column Statement Footer with Watermark */}
      <Footer
        brandName="Teklozy"
        onBackToTop={scrollToTop}
        onNavigateToLevel={scrollToLevel}
      />

      {/* 5. Claim Spot Celebration Modal */}
      <ClaimSpotModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
      />
    </div>
  );
}
