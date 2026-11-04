import React from 'react';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../layout/Footer';

type PageProps = {
  onNavigateHome: () => void;
  onScrollToLevel: (levelId: number) => void;
  onScrollToAchievements?: () => void;
  onOpenEvents: () => void;
  onOpenOpportunities: () => void;
  onOpenTeam: () => void;
  onOpenLogin: () => void;
  onOpenContact: () => void;
};

const PageFrame: React.FC<PageProps & { children?: React.ReactNode }> = ({
  onNavigateHome, onScrollToLevel, onScrollToAchievements, onOpenEvents, onOpenOpportunities, onOpenTeam, onOpenLogin, onOpenContact, children,
}) => (
  <div className="min-h-screen bg-[#F7FAFE] text-slate-900 font-manrope">
    <Header
      forceCapsule
      onScrollToLevel={onScrollToLevel} onScrollToAchievements={onScrollToAchievements}
      onOpenContact={onOpenContact}
      onOpenLogin={onOpenLogin}
      onOpenTeam={onOpenTeam}
      onOpenEvents={onOpenEvents}
    />
    <main className="min-h-[72vh] px-4 sm:px-6 pt-32 pb-20">
      <div className="max-w-5xl mx-auto">
        <button onClick={onNavigateHome} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0088E0] transition-colors">
          <ArrowRight className="rotate-180" size={16} /> Back to Teklozy
        </button>
        <section className="rounded-[28px] border border-sky-100 bg-white p-7 sm:p-12 shadow-[0_18px_60px_rgba(20,70,120,0.07)]">
          {children}
        </section>
      </div>
    </main>
    <Footer
      brandName="Teklozy"
      onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onOpenContact={onOpenContact}
      onOpenLogin={onOpenLogin}
      onOpenOpportunities={onOpenOpportunities}
      onOpenEvents={onOpenEvents}
      onNavigateToLevel={onScrollToLevel}
    />
  </div>
);

export const OpportunitiesPage: React.FC<PageProps> = (props) => (
  <PageFrame {...props}>
    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0088E0] flex items-center justify-center">
      <BriefcaseBusiness size={23} />
    </div>
    <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#0088E0] uppercase">Career Opportunities</p>
    <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#10233F]">Your next opportunity starts here.</h1>
    <p className="mt-4 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-600">
      Explore internships, entry-level roles and ways to grow with the Teklozy community. Verified opportunities will be added here as they become available.
    </p>
    <div className="mt-10 rounded-2xl border border-dashed border-sky-200 bg-sky-50/60 p-7 sm:p-9 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-white text-[#0088E0] flex items-center justify-center"><BriefcaseBusiness size={22} /></div>
      <h2 className="mt-4 text-lg font-bold text-slate-800">Opportunities will be listed here</h2>
      <p className="mt-2 text-sm text-slate-500">We are preparing this page. Only verified roles and genuine application links will be published.</p>
    </div>
  </PageFrame>
);
