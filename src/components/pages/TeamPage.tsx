import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Heart,
  Globe,
} from 'lucide-react';
import logoPng from '../../assets/images/erasebg-teklozy.png';
import { Footer } from '../layout/Footer';

import {
  TEAM_MEMBERS,
  TEAM_CATEGORIES,
  TEAM_METRICS,
  TeamCategory,
} from '../../data/teamData';
import { TeamCard } from '../team/TeamCard';
import { TeamValues } from '../team/TeamValues';
import { TeamCTA } from '../team/TeamCTA';

interface TeamPageProps {
  onNavigateHome: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  onNavigateHome,
  onOpenContact,
  onOpenLogin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TeamCategory>('All');

  // Filter members based on active category
  const filteredMembers =
    selectedCategory === 'All'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.category === selectedCategory);

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
      {/* 1. Header Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0088E0] px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journey</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shadow-2xs group-hover:border-[#0088E0]/40 transition-colors">
                <img
                  src={logoPng}
                  alt="Teklozy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-display font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                Teklozy
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#0088E0] hover:bg-[#0077CC] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section: Direct Match with Reference Mockup */}
      <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-slate-200/70 bg-gradient-to-b from-sky-50/40 via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-[11px] font-bold uppercase tracking-wider">
                OUR TEAM
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15]">
                A passionate team building the future of{' '}
                <span className="text-[#0088E0]">student careers.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                We are a group of builders, designers, educators and dreamers working together to create
                a platform that helps students learn, build real skills and get hired.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="bg-[#0088E0] hover:bg-[#0077CC] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>Join Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('team-roster')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
                >
                  Explore Teklozy
                </button>
              </div>

              {/* Metrics Row */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-md">
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
              <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl group">
                {/* Subtle Atmospheric Ambient Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-300/30 via-blue-200/20 to-cyan-300/30 rounded-3xl blur-3xl opacity-60 pointer-events-none group-hover:opacity-85 transition-opacity duration-500" />

                <img
                  src="/images/ourTeamimg.png"
                  alt="Teklozy Team"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.015]"
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

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TEAM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0088E0] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 6-Member Clean Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* View More Team Members Action */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-sky-300 text-[#0088E0] hover:bg-sky-50 text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
          >
            <span>View More Team Members</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. What Drives Us (Our Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <TeamValues />
      </section>

      {/* 5. Want to Join Our Team (Bottom CTA Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <TeamCTA onOpenContact={onOpenContact} />
      </section>

      {/* 6. Statement Footer */}
      <Footer
        brandName="Teklozy"
        onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};

export default TeamPage;
