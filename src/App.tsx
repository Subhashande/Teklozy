import React, { useState, useEffect } from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { JourneySection } from './components/sections/JourneySection';
import { Achivements } from './components/sections/achivements';
import { Footer } from './components/layout/Footer';
import { ContactUsModal } from './components/ui/ContactUsModal';
import { LoginPage } from './components/pages/LoginPage';
import { TeklozyPreloader } from './components/ui/TeklozyPreloader';
import { useTeklozyJourney } from './hooks/useTeklozyJourney';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'login'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path === '/login' || hash === '#login' ? 'login' : 'home';
    }
    return 'home';
  });

  const {
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
      const isLogin = window.location.pathname === '/login' || window.location.hash === '#login';
      setCurrentView(isLogin ? 'login' : 'home');
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

  const navigateToHome = () => {
    setCurrentView('home');
    if (window.location.hash === '#login') {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <>
      {/* Brand Intro Preloader with GSAP DrawSVG & Fill Animation */}
      {isLoading && <TeklozyPreloader onComplete={() => setIsLoading(false)} />}

      <div className="relative min-h-screen bg-[#F7F7F2] text-[#1A1A1A] font-manrope selection:bg-[#0088E0] selection:text-white">
        <h1 className="sr-only">Teklozy — 10-Level Gamified Career Journey</h1>

        {/* 1. Floating Capsule Header with Separate Login & Contact Us */}
        <Header
          onScrollToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
          onOpenLogin={navigateToLogin}
        />

        {/* 2. Connected Modular Hero Section */}
        <HeroSection
          activeLevelId={activeLevelId}
          onScrollToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
        />

        {/* 3. 10-Level Scroll River Path Journey */}
        <JourneySection
          activeLevelId={activeLevelId}
          onActiveLevelChange={setActiveLevelId}
          onScrollToLevel={scrollToLevel}
          onOpenContact={() => setShowContactModal(true)}
        />

        {/* 4. Alumni Achievements & Testimonial Inspirations Infinite 3D Carousel */}
        <Achivements onOpenContact={() => setShowContactModal(true)} />

        {/* 5. 4-Column Statement Footer with Watermark */}
        <Footer
          brandName="Teklozy"
          onBackToTop={scrollToTop}
          onNavigateToLevel={scrollToLevel}
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
