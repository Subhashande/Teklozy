import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { JourneySection } from './components/sections/JourneySection';
import { Achivements } from './components/sections/achivements';
import { Footer } from './components/layout/Footer';
import { ContactUsModal } from './components/ui/ContactUsModal';
import { LoginPage } from './components/pages/LoginPage';
import { TeamPage } from './components/pages/TeamPage';
import { EventsPage } from './components/pages/EventsPage';
import { OpportunitiesPage } from './components/pages/OpportunitiesPage';
import { TeklozyPreloader } from './components/ui/TeklozyPreloader';
import { useTeklozyJourney } from './hooks/useTeklozyJourney';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pendingAchievements = useRef(false);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'team' | 'events' | 'opportunities'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/login' || hash === '#login') return 'login';
      if (path === '/team' || hash === '#team') return 'team';
      if (path === '/events' || hash === '#events') return 'events';
      if (path === '/opportunities' || hash === '#opportunities') return 'opportunities';
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
      } else if (path === '/events' || hash === '#events') {
        setCurrentView('events');
      } else if (path === '/opportunities' || hash === '#opportunities') {
        setCurrentView('opportunities');
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

  const navigateToEvents = () => {
    setCurrentView('events');
    window.location.hash = '#events';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOpportunities = () => {
    setCurrentView('opportunities');
    window.location.hash = '#opportunities';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTeam = () => {
    setCurrentView('team');
    window.location.hash = '#team';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView !== 'home' || !pendingAchievements.current) return;
    pendingAchievements.current = false;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [currentView]);

  const navigateToAchievements = () => {
    if (currentView !== 'home') {
      pendingAchievements.current = true;
      navigateToHome();
    } else {
      scrollToAchievements();
    }
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
          onOpenTeam={() => document.getElementById('team-roster')?.scrollIntoView({ behavior: 'smooth' })}
          onOpenEvents={navigateToEvents}
          onOpenOpportunities={navigateToOpportunities}
          onScrollToLevel={(levelId) => {
            navigateToHome();
            setTimeout(() => scrollToLevel(levelId), 200);
          }}
          onScrollToAchievements={navigateToAchievements}
        />
        <ContactUsModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      </>
    );
  }

  if (currentView === 'events') {
    return <EventsPage onScrollToAchievements={navigateToAchievements} onNavigateHome={navigateToHome} onScrollToLevel={(levelId) => { navigateToHome(); window.setTimeout(() => scrollToLevel(levelId), 240); }} onOpenEvents={navigateToEvents} onOpenOpportunities={navigateToOpportunities} onOpenTeam={navigateToTeam} onOpenLogin={navigateToLogin} onOpenContact={() => setShowContactModal(true)} />;
  }

  if (currentView === 'opportunities') {
    return <OpportunitiesPage onScrollToAchievements={navigateToAchievements} onNavigateHome={navigateToHome} onScrollToLevel={(levelId) => { navigateToHome(); window.setTimeout(() => scrollToLevel(levelId), 240); }} onOpenEvents={navigateToEvents} onOpenOpportunities={navigateToOpportunities} onOpenTeam={navigateToTeam} onOpenLogin={navigateToLogin} onOpenContact={() => setShowContactModal(true)} />;
  }

  return (
    <>
      {/* Brand Intro Preloader with GSAP DrawSVG & Fill Animation */}
      {isLoading && <TeklozyPreloader onComplete={() => setIsLoading(false)} />}

      <div className="relative min-h-screen bg-[#F7F7F2] text-[#1A1A1A] font-manrope selection:bg-[#0088E0] selection:text-white">
        <h1 className="sr-only">Teklozy — 10-Level Gamified Career Journey</h1>

        {/* 1. Floating Capsule Header with Separate Login & Contact Us */}
        <Header
          forceCapsule
          onScrollToLevel={scrollToLevel}
          onScrollToAchievements={navigateToAchievements}
          onOpenContact={() => setShowContactModal(true)}
          onOpenLogin={navigateToLogin}
          onOpenTeam={navigateToTeam}
          onOpenEvents={navigateToEvents}
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
          onOpenOpportunities={navigateToOpportunities}
          onOpenEvents={navigateToEvents}
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
