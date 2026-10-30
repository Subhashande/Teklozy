import React, { useState, useEffect } from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { JourneySection } from './components/sections/JourneySection';
import { Achivements } from './components/sections/achivements';
import { Footer } from './components/layout/Footer';
import { ContactUsModal } from './components/ui/ContactUsModal';
import { LoginPage } from './components/pages/LoginPage';
import { TeamPage } from './components/pages/TeamPage';
import { TeklozyPreloader } from './components/ui/TeklozyPreloader';
import { useTeklozyJourney } from './hooks/useTeklozyJourney';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'team'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/login' || hash === '#login') return 'login';
      if (path === '/team' || hash === '#team') return 'team';
      return 'home';
    }
    return 'home';
  });

  const {
    lenisRef,
    activeLevelId,
    setActiveLevelId,
    scrollToLevel,
    scrollToTop,
    showContactModal,
    setShowContactModal,
  } = useTeklozyJourney(currentView === 'home');

  // Handle browser back/forward buttons & URL hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (path === '/login' || hash === '#login') {
        setCurrentView('login');
      } else if (path === '/team' || hash === '#team') {
        setCurrentView('team');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToLogin = () => {
    setCurrentView('login');
    window.location.hash = '#login';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTeam = () => {
    setCurrentView('team');
    window.location.hash = '#team';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (window.location.hash === '#login' || window.location.hash === '#team') {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAchievements = () => {
    const el = document.getElementById('achievements');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -40, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // If viewing the dedicated Login Page
  if (currentView === 'login') {
    return (
      <>
        {isLoading && <TeklozyPreloader onComplete={() => setIsLoading(false)} />}
        <LoginPage
          onNavigateHome={navigateToHome}
          onOpenContact={() => setShowContactModal(true)}
        />
        <ContactUsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </>
    );
  }

  // If viewing the dedicated Our Team Page
  if (currentView === 'team') {
    return (
      <>
        {isLoading && <TeklozyPreloader onComplete={() => setIsLoading(false)} />}
        <TeamPage
          onNavigateHome={navigateToHome}
          onOpenContact={() => setShowContactModal(true)}
          onOpenLogin={navigateToLogin}
          onScrollToLevel={(levelId) => {
            navigateToHome();
            setTimeout(() => scrollToLevel(levelId), 200);
          }}
        />
        <ContactUsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </>
    );
  }

  return (
    <>
      {/* Brand Intro Preloader with GSAP DrawSVG & Fill Animation */}
      {isLoading && <TeklozyPreloader onComplete={() => setIsLoading(false)} />}

      <div className="relative min-h-screen bg-[#F7F7F2] text-[#1A1A1A] font-manrope selection:bg-[#0088E0] selection:text-white">
        <h1 className="sr-only">Teklozy — 10-Level Gamified Career Journey</h1>

        {/* 1. Floating Capsule Header with Separate Login & Contact Us */}
        <Header
          onScrollToLevel={scrollToLevel}
          onScrollToAchievements={scrollToAchievements}
          onOpenContact={() => setShowContactModal(true)}
          onOpenLogin={navigateToLogin}
          onOpenTeam={navigateToTeam}
        />

        {/* 2. Connected Modular Hero Section */}
        <HeroSection
          activeLevelId={activeLevelId}
          onScrollToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
          onOpenLogin={navigateToLogin}
        />

        {/* 3. 10-Level Scroll River Path Journey */}
        <JourneySection
          activeLevelId={activeLevelId}
          onActiveLevelChange={setActiveLevelId}
          onScrollToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
        />

        {/* 4. Success Stories from Our Community (Combined Achievements & Collaboration) */}
        <Achivements onOpenContact={() => setShowContactModal(true)} />

        {/* 5. Statement Footer */}
        <Footer
          brandName="Teklozy"
          onBackToTop={scrollToTop}
          onNavigateToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
        />

        {/* 6. Contact Us Modal (Form + Social Links for Students & Management) */}
        <ContactUsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </div>
    </>
  );
}
