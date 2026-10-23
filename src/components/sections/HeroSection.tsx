import React, { useState } from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { FeatureNode } from '../../types/journey';
import teloAvatar from '../../assets/mascot/telo-mascot.png';
import {
  ArrowRight,
  Play,
  Sparkles,
  Compass,
  Flame,
  Layers,
  Kanban,
  Bot,
  FileText,
  Headphones,
  ShieldAlert,
  Users,
} from 'lucide-react';

interface HeroSectionProps {
  activeLevelId: number;
  onScrollToLevel: (levelId: number) => void;
  onOpenClaimModal: () => void;
}

const FEATURE_NODES: FeatureNode[] = [
  // Left Wing (Stages 1 - 4)
  {
    id: 1,
    title: 'Top 5 Careers Diagnostic',
    category: 'Aptitude & Class Matcher',
    icon: Compass,
    accent: '#0088E0',
    xDesktop: 12,
    yDesktop: 32,
    status: 'Personalized',
  },
  {
    id: 2,
    title: 'Streak & Code Battles',
    category: 'LeetCode & GitHub Sync',
    icon: Flame,
    accent: '#F43F5E',
    xDesktop: 28,
    yDesktop: 16,
    status: '12d Flame',
  },
  {
    id: 3,
    title: 'Complete Ecosystem',
    category: 'Interactive Skill Tree',
    icon: Layers,
    accent: '#0077CC',
    xDesktop: 10,
    yDesktop: 60,
    status: 'Interactive',
  },
  {
    id: 4,
    title: 'Startup SDLC & Jira',
    category: 'Ticket Operations TK-14',
    icon: Kanban,
    accent: '#2563EB',
    xDesktop: 26,
    yDesktop: 76,
    status: 'Sprint Active',
  },

  // Right Wing (Stages 5 - 9)
  {
    id: 5,
    title: 'Autonomous AI Testing',
    category: 'One-Click CI/CD Deploy',
    icon: Bot,
    accent: '#10B981',
    xDesktop: 74,
    yDesktop: 18,
    status: 'AI Agent',
  },
  {
    id: 6,
    title: 'ATS Resume & Portfolio',
    category: 'LinkedIn Profile Score',
    icon: FileText,
    accent: '#0088E0',
    xDesktop: 88,
    yDesktop: 36,
    status: 'ATS 96%',
  },
  {
    id: 7,
    title: '1:1 Mock Interview',
    category: 'Real-time Audio Coaching',
    icon: Headphones,
    accent: '#8B5CF6',
    xDesktop: 72,
    yDesktop: 56,
    status: 'Expert Call',
  },
  {
    id: 8,
    title: 'Scam Job Radar Shield',
    category: 'Fake Offer Detection',
    icon: ShieldAlert,
    accent: '#F59E0B',
    xDesktop: 88,
    yDesktop: 76,
    status: 'Protected',
  },
  {
    id: 9,
    title: 'Global Alumni Guild',
    category: 'Direct Referral Network',
    icon: Users,
    accent: '#0088E0',
    xDesktop: 66,
    yDesktop: 84,
    status: 'Coffee Chat',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeLevelId,
  onScrollToLevel,
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <section className="intro relative pt-8 sm:pt-14 pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden font-manrope">
      {/* 1. Atmospheric Sky Background with Perspective 3D Grid Texture (Light Mode) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Sky Ambient Radial Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] bg-[radial-gradient(130%_90%_at_50%_-10%,rgba(0,136,224,0.18)_0%,rgba(186,230,253,0.30)_30%,rgba(247,247,242,0.8)_70%,#F7F7F2_100%)]" />

        {/* Subtle Perspective 3D Grid Plane (Light Mode) */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 136, 224, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 136, 224, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 80% 65% at 50% 40%, black 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 65% at 50% 40%, black 30%, transparent 80%)',
          }}
        />

        {/* Soft Cloud Ambient Highlights */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl" />
      </div>

      {/* 2. Top Engine Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-xs text-xs font-bold text-[#0088E0] mb-6">
        <Sparkles className="w-3.5 h-3.5 text-[#0088E0]" />
        <span>One Unified Ecosystem • All Student Tools Connected</span>
      </div>

      {/* 3. EXACT Main Title (Preserved verbatim) */}
      <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#131209] max-w-4xl mx-auto">
        Climb from zero to <br className="hidden sm:block" />
        <span className="text-[#0088E0]">industry champion.</span>
      </h1>

      {/* 4. EXACT Subtitle (Preserved verbatim) */}
      <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#5C5B55] max-w-2xl mx-auto leading-relaxed">
        Ten milestone levels connected by one continuous path. Watch your future take shape as the stroke draws itself through real-world experience, AI agents, and verified placement.
      </p>

      {/* 5. Dual Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onScrollToLevel(1)}
          className="flex items-center gap-2.5 bg-[#0088E0] hover:bg-[#0077CC] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
        >
          <span>Begin Level 01</span>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </button>

        <button
          onClick={() => onScrollToLevel(4)}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-slate-300 bg-white/95 backdrop-blur-sm text-sm font-bold text-[#131209] hover:bg-slate-50 transition-colors shadow-xs"
        >
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
            <Play className="w-3 h-3 fill-[#0088E0] text-[#0088E0] ml-0.5" />
          </div>
          <span>Watch Interactive Tour</span>
        </button>
      </div>

      {/* Micro-Trust Guarantee */}
      <p className="mt-4 text-xs font-semibold text-slate-500">
        No Prior Experience Required • 10,000+ Active Learners • 100% Free Career Diagnostic
      </p>

      {/* 6. The Connected Architecture Showcase (All tools connecting into Teklozy Hub) */}
      <div className="relative max-w-6xl mx-auto mt-14 sm:mt-18 min-h-[460px] sm:min-h-[500px] flex items-center justify-center select-none">
        {/* Interactive SVG Circuit Connector Lines (Light Mode with Glowing Data Pulses) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0088E0" floodOpacity="0.8" />
            </filter>

            <linearGradient id="wireGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0088E0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0088E0" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="wireGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0088E0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0088E0" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Left Wing Traces */}
          <path d="M 180 160 H 320 V 230 H 430" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 180 160 H 320 V 230 H 430" fill="none" stroke="url(#wireGradientLeft)" strokeWidth="2.5" strokeDasharray="16 140" strokeLinecap="round" className="animate-circuit-pulse" />

          <path d="M 330 90 V 210 H 430" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 330 90 V 210 H 430" fill="none" stroke="#0088E0" strokeWidth="2.5" strokeDasharray="14 160" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-1s' }} />

          <path d="M 160 290 H 320 V 260 H 430" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 160 290 H 320 V 260 H 430" fill="none" stroke="url(#wireGradientLeft)" strokeWidth="2.5" strokeDasharray="16 130" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-1.8s' }} />

          <path d="M 280 370 H 380 V 280 H 430" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 280 370 H 380 V 280 H 430" fill="none" stroke="url(#wireGradientLeft)" strokeWidth="2.5" strokeDasharray="14 120" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-0.6s' }} />

          {/* Right Wing Traces */}
          <path d="M 570 230 H 680 V 100 H 760" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 570 230 H 680 V 100 H 760" fill="none" stroke="url(#wireGradientRight)" strokeWidth="2.5" strokeDasharray="16 130" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-0.3s' }} />

          <path d="M 570 240 H 740 V 180 H 870" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 570 240 H 740 V 180 H 870" fill="none" stroke="url(#wireGradientRight)" strokeWidth="2.5" strokeDasharray="14 150" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-1.4s' }} />

          <path d="M 570 260 H 680 V 280 H 760" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 570 260 H 680 V 280 H 760" fill="none" stroke="url(#wireGradientRight)" strokeWidth="2.5" strokeDasharray="14 140" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-2.1s' }} />

          <path d="M 570 270 H 720 V 380 H 860" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 570 270 H 720 V 380 H 860" fill="none" stroke="url(#wireGradientRight)" strokeWidth="2.5" strokeDasharray="16 150" strokeLinecap="round" className="animate-circuit-pulse" style={{ animationDelay: '-0.9s' }} />

          {/* Glowing Junction Dots */}
          <circle cx="430" cy="230" r="4" fill="#0088E0" filter="url(#circuitGlow)" />
          <circle cx="430" cy="260" r="4" fill="#0088E0" filter="url(#circuitGlow)" />
          <circle cx="570" cy="230" r="4" fill="#0088E0" filter="url(#circuitGlow)" />
          <circle cx="570" cy="270" r="4" fill="#0088E0" filter="url(#circuitGlow)" />
        </svg>

        {/* Central App Engine Pedestal */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/25 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* App Cube */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white border-2 border-blue-200/90 shadow-2xl shadow-blue-500/25 p-3 flex flex-col items-center justify-center relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute -inset-1 rounded-3xl border border-[#0088E0]/40 opacity-75 animate-pulse pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0088E0] to-[#005A9E] flex items-center justify-center p-2 shadow-md">
              <BrandLogo className="h-8 filter brightness-0 invert" showWordmark={false} />
            </div>

            <div className="mt-2 text-center">
              <span className="text-[11px] font-display font-extrabold text-[#131209] tracking-tight block">
                TEKLOZY HUB
              </span>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                All Systems Synced
              </span>
            </div>
          </div>

          {/* Telo Avatar Companion Badge */}
          <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#CBD5E1] shadow-sm">
            <div className="w-5 h-5 rounded-full overflow-hidden border border-[#0088E0]">
              <img src={teloAvatar} alt="Telo mascot" className="w-full h-full object-cover object-top" />
            </div>
            <span className="text-[11px] font-bold text-slate-700">Telo AI Core Companion</span>
          </div>
        </div>

        {/* Feature Node Badges Floating in Light Mode */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {FEATURE_NODES.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onScrollToLevel(node.id)}
                className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110 hover:z-30"
                style={{
                  left: `${node.xDesktop}%`,
                  top: `${node.yDesktop}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className={`bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border shadow-md flex items-center gap-2.5 transition-all ${
                    isHovered
                      ? 'border-[#0088E0] shadow-lg ring-2 ring-[#0088E0]/20'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: node.accent }}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight whitespace-nowrap">
                      {node.title}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      {node.category}
                    </p>
                  </div>

                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-1 whitespace-nowrap"
                    style={{
                      backgroundColor: `${node.accent}15`,
                      color: node.accent,
                    }}
                  >
                    {node.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Developer Cursor Arrows */}
        <div className="hidden lg:block absolute left-[22%] top-[40%] pointer-events-none z-20 animate-bounce">
          <svg className="w-5 h-5 text-slate-900 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2l16 11-8 2-3 7L4 2z" />
          </svg>
          <div className="ml-4 -mt-2 px-2 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-md whitespace-nowrap shadow-sm">
            Jordan (Student)
          </div>
        </div>

        <div className="hidden lg:block absolute right-[22%] top-[68%] pointer-events-none z-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <svg className="w-5 h-5 text-[#0088E0] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2l16 11-8 2-3 7L4 2z" />
          </svg>
          <div className="ml-4 -mt-2 px-2 py-0.5 bg-[#0088E0] text-white text-[9px] font-bold rounded-md whitespace-nowrap shadow-sm">
            Telo (AI Mentor)
          </div>
        </div>

        {/* Mobile View: Responsive Grid */}
        <div className="md:hidden w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-8 px-2 z-10">
          {FEATURE_NODES.slice(0, 6).map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => onScrollToLevel(node.id)}
                className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: node.accent }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{node.title}</p>
                    <p className="text-[10px] text-slate-400">{node.category}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0088E0]">
                  {node.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Trusted Partners Row & 4 Key Metrics Bar */}
      <div className="mt-16 sm:mt-20 max-w-5xl mx-auto border-t border-slate-200/90 pt-10">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Trusted by Thousands of Students & Leading Hiring Partners
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0088E0]" /> Google Cloud
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> AWS Guild
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Codecraft Labs
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> VentureBio
          </div>
          <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> NextGen Startups
          </div>
        </div>

        {/* 4 Key Performance Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/85 backdrop-blur-md rounded-2xl border border-[#E5E5DE] p-5 sm:p-6 shadow-xs">
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#131209]">10,000+</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Active Learners</p>
          </div>
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#0088E0]">$500K+</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Bounties & Scholarships</p>
          </div>
          <div className="text-center sm:text-left border-r last:border-r-0 border-slate-100 pr-2">
            <p className="font-display text-2xl sm:text-3xl font-black text-[#131209]">94%</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Placement Success Rate</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-2xl sm:text-3xl font-black text-amber-500">4.9 / 5</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Community Rating</p>
          </div>
        </div>
      </div>

      {/* 8. Level Fast-Travel Navigation Bar */}
      <div className="mt-12 w-full max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-[#E5E5DE] p-2.5 shadow-xs flex items-center justify-between gap-1 overflow-x-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvlNum) => {
          const isCur = activeLevelId === lvlNum;
          return (
            <button
              key={lvlNum}
              onClick={() => onScrollToLevel(lvlNum)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isCur
                  ? 'bg-[#0088E0] text-white shadow-xs'
                  : 'text-[#5C5B55] hover:text-[#131209] hover:bg-slate-100'
              }`}
              title={`Jump to Level ${lvlNum}`}
            >
              {lvlNum < 10 ? `0${lvlNum}` : '10'}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
