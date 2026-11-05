import React from 'react';
import {
  ArrowRight,
  Users,
  Heart,
  Globe,
} from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../layout/Footer';

import {
  TEAM_MEMBERS,
  TEAM_METRICS,
} from '../../data/teamData';
import { TeamCard } from '../team/TeamCard';
import { TeamValues } from '../team/TeamValues';
import { TeamCTA } from '../team/TeamCTA';

interface TeamPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
  onScrollToLevel?: (levelId: number) => void;
  onScrollToAchievements?: () => void;
  onOpenTeam?: () => void;
  onOpenEvents?: () => void;
  onOpenOpportunities?: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenLogin,
  onScrollToLevel,
  onScrollToAchievements,
  onOpenTeam,
  onOpenEvents,
  onOpenOpportunities,
}) => {

  const getMetricIcon = (icon: string) => {
    switch (icon) {
      case 'users':
        return <Users className="w-5 h-5 text-[#0088E0]" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-emerald-500" />;
      default:
        return <Users className="w-5 h-5 text-[#0088E0]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-manrope selection:bg-[#0088E0] selection:text-white antialiased">
      {/* Shared floating capsule navigation used across the website */}
      <Header
        forceCapsule
        onScrollToLevel={(levelId) => onScrollToLevel?.(levelId)}
        onScrollToAchievements={onScrollToAchievements}
        onOpenContact={onOpenContact}
        onOpenLogin={onOpenLogin}
        onOpenTeam={onOpenTeam || (() => document.getElementById('team-roster')?.scrollIntoView({ behavior: 'smooth' }))}
        onOpenEvents={onOpenEvents}
      />

      {/* 2. Hero Section: Direct Match with Reference Mockup */}
      <section className="tk-team-hero relative overflow-hidden pt-32 pb-14 sm:pt-36 sm:pb-20 border-b border-slate-200/70 bg-gradient-to-b from-sky-50/40 via-white to-[#F8FAFC]">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-5 lg:pr-2">
              <div className="inline-block px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-[11px] font-bold uppercase tracking-wider">
                OUR TEAM
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[56px] text-slate-900 tracking-tight leading-[1.07] max-w-[650px]">
                A passionate team building the future of{' '}
                <span className="text-[#0088E0]">student careers.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-[19px] text-slate-600 max-w-[650px] leading-[1.6]">
                We are a group of builders, designers, educators and dreamers working together to create
                a platform that helps students learn, build real skills and get hired.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => (onOpenLogin ? onOpenLogin() : onScrollToLevel?.(1))}
                  className="bg-[#0088E0] hover:bg-[#0077CC] text-white text-sm font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>Join Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('team-roster')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-7 py-3 rounded-full border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
                >
                  Explore Our Team
                </button>
              </div>

              {/* Metrics Row */}
              <div className="tk-team-metrics pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-[620px]">
                {TEAM_METRICS.map((metric) => (
                  <div key={metric.id} className="flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs shrink-0">
                      {getMetricIcon(metric.icon)}
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm sm:text-base text-slate-900 block leading-tight">
                        {metric.value}
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic: Our Team Hero Image (Frameless, High-Res, Expanded Size) */}
            <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-none group">
                {/* Subtle Atmospheric Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-300/30 via-blue-200/20 to-cyan-300/30 rounded-3xl blur-3xl opacity-60 pointer-events-none group-hover:opacity-85 transition-opacity duration-500" />

                <img decoding="async"
                  src="/images/ourTeamimg.png"
                  alt="Teklozy team illustration" width={1536} height={1024} fetchPriority="high"
                  className="relative z-10 block w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet the Team Section */}
      <section id="team-roster" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[11px] font-bold uppercase tracking-wider mb-2">
            MEET THE TEAM
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            The people behind Teklozy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Different backgrounds. One shared mission: to empower students and create opportunities
            in the AI era.
          </p>
        </div>

        {/* 6-Member Clean Responsive Grid */}
        {TEAM_MEMBERS.length > 0 ? (
          <div className="tk-team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {TEAM_MEMBERS.map((member) => <TeamCard key={member.id} member={member} />)}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto rounded-2xl border border-dashed border-sky-200 bg-white/80 px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-slate-800">Team profiles are being updated</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">We will publish team member names, roles and profile links here once the details are confirmed.</p>
          </div>
        )}

      </section>

      {/* 4. What Drives Us (Our Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <TeamValues />
      </section>

      {/* 5. Want to Join Our Team (Bottom CTA Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <TeamCTA onOpenContact={onOpenContact} onOpenOpportunities={onOpenOpportunities} />
      </section>

      {/* 6. Statement Footer */}
      <Footer
        brandName="Teklozy"
        onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenContact={onOpenContact}
        onOpenOpportunities={onOpenOpportunities}
        onOpenEvents={onOpenEvents}
      />
    </div>
  );
};

export default TeamPage;
