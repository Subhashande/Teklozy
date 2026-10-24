import React from 'react';
import { Level } from '../../types/journey';
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
  Video,
  FileCheck,
  Trophy,
} from 'lucide-react';

interface LevelVisualSceneProps {
  lvl: Level;
  index: number;
  levelImage: string;
}

/**
 * LevelVisualScene Component
 * Renders the organic 3D illustration scene with contextual floating UI cards
 * and the milestone numbered anchor node on the river path.
 */
export const LevelVisualScene: React.FC<LevelVisualSceneProps> = ({
  lvl,
  index,
  levelImage,
}) => {
  const isImageLeft = index % 2 === 0;
  const stageNum = lvl.id < 10 ? `0${lvl.id}` : `${lvl.id}`;

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* 1. Milestone Numbered Node (Sits right on the connecting river path) */}
      <div
        id={`level-stage-anchor-${lvl.id}`}
        className={`absolute z-30 top-4 ${
          isImageLeft ? '-left-3 sm:-left-5' : '-right-3 sm:-right-5'
        } transition-transform duration-300 hover:scale-110`}
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0088E0] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white ring-2 ring-blue-200">
          {stageNum}
        </div>
      </div>

      {/* 2. Soft Organic Cloud Scene Container */}
      <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 bg-gradient-to-tr from-blue-50/70 via-sky-50/30 to-white/90 border border-blue-100/70 shadow-xl shadow-blue-600/5 backdrop-blur-sm overflow-hidden">
        {/* Soft Background Radial Light */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: lvl.accent }}
        />

        {/* 3. Main 3D Level Illustration (Floating Animation) */}
        <div
          id={`level-img-${lvl.id}`}
          className="level-floating-island relative z-10 flex items-center justify-center min-h-[260px] sm:min-h-[320px]"
        >
          <img
            src={levelImage}
            alt={`Level ${lvl.id}: ${lvl.title}`}
            className="w-full h-auto object-contain max-h-[340px] drop-shadow-2xl select-none transition-transform duration-500 hover:scale-[1.02]"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>

        {/* 4. Contextual Floating UI Card / Widget */}
        <div className="relative z-20 mt-2">
          {lvl.id === 1 && <Level1CardWidget />}
          {lvl.id === 2 && <Level2StreakWidget />}
          {lvl.id === 3 && <Level3SkillTreeWidget />}
          {lvl.id === 4 && <Level4KanbanWidget />}
          {lvl.id === 5 && <Level5DeployWidget />}
          {lvl.id === 6 && <Level6ProfileWidget />}
          {lvl.id === 7 && <Level7InterviewWidget />}
          {lvl.id === 8 && <Level8ShieldWidget />}
          {lvl.id === 9 && <Level9AlumniWidget />}
          {lvl.id === 10 && <Level10ChampionWidget />}
        </div>
      </div>

      {/* 5. Subtle Hand-Drawn Sparkle Accent */}
      <div
        className={`absolute -bottom-4 ${
          isImageLeft ? '-right-3' : '-left-3'
        } pointer-events-none text-blue-400 opacity-60`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2V22M2 12H22M5 5L19 19M19 5L5 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

/* =========================================================================
   CONTEXTUAL FLOATING UI WIDGETS
   ========================================================================= */

/** Level 1: "Which path excites you?" Role Chooser */
const Level1CardWidget: React.FC = () => {
  const roles = [
    { title: 'Frontend Developer', icon: '💻', color: '#0088E0' },
    { title: 'Backend Developer', icon: '🛡️', color: '#2563EB' },
    { title: 'AI/ML Engineer', icon: '🤖', color: '#1D4ED8' },
    { title: 'UI/UX Designer', icon: '🎨', color: '#EC4899' },
    { title: 'Data Analyst', icon: '📊', color: '#0077CC' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-lg shadow-slate-200/50">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 leading-tight">
            Which path excites you?
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Explore career paths based on your interests and strengths.
          </p>
        </div>
        <button
          type="button"
          aria-label="View paths"
          className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088E0] hover:bg-[#0088E0] hover:text-white transition-colors shrink-0"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {roles.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] font-semibold text-slate-700 whitespace-nowrap hover:border-blue-300 hover:bg-blue-50/50 transition-all shrink-0"
          >
            <span>{r.icon}</span>
            <span>{r.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Level 2: Frontend Code Lessons & Streak Dashboard */
const Level2StreakWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Lesson Progress Mini Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#0088E0]" />
            Frontend Development
          </span>
          <span className="text-[10px] font-bold text-[#0088E0] bg-blue-50 px-2 py-0.5 rounded-full">
            50%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div className="bg-[#0088E0] h-full rounded-full w-1/2" />
        </div>
        <div className="text-[10px] text-slate-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="truncate">1. Introduction to HTML</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
          </div>
          <div className="flex items-center justify-between">
            <span className="truncate">2. HTML & CSS Layouts</span>
            <span className="text-[#0088E0] font-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* Streak & XP Badge Mini Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Day 12 Streak
            </span>
            <span className="text-[10px] text-slate-400">Sync Active</span>
          </div>
          <div className="flex items-center justify-between text-[9px] font-bold text-slate-600 gap-1 my-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span
                key={i}
                className={`w-5 h-5 rounded-md flex items-center justify-center ${
                  i < 5
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-700">
          <span>⭐ 250 XP earned today</span>
          <span className="text-amber-600">Keep going!</span>
        </div>
      </div>
    </div>
  );
};

/** Level 3: Interactive Skill Tree */
const Level3SkillTreeWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0088E0]">
        <Layers className="w-4 h-4" />
      </div>
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          Connected Ecosystem Tree
        </h5>
        <p className="text-[11px] text-slate-500">
          System Architecture • Cache • Sharding
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
      Unlocked
    </span>
  </div>
);

/** Level 4: Kanban Sprint Board */
const Level4KanbanWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#0088E0] text-[10px] font-mono font-bold">
        TK-14
      </span>
      <span className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
        Build Multi-Tenant Auth SDLC
      </span>
    </div>
    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
      In Progress
    </span>
  </div>
);

/** Level 5: Production Deployment Pipeline */
const Level5DeployWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          Production Deploy Live
        </h5>
        <p className="text-[10px] text-slate-500">
          48/48 Autonomous AI Tests Passed • 99.9% Uptime
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0088E0] text-[10px] font-bold">
      Cloudscale AWS
    </span>
  </div>
);

/** Level 6: ATS Score Meter */
const Level6ProfileWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <FileCheck className="w-4 h-4 text-[#0088E0]" />
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          ATS Profile Match: 96%
        </h5>
        <p className="text-[10px] text-slate-500">
          GitHub proof & verified projects linked
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
      Recruiter Ready
    </span>
  </div>
);

/** Level 7: 1:1 Live Mock Session */
const Level7InterviewWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <Video className="w-4 h-4 text-[#2563EB]" />
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          1:1 Live System Design Mock
        </h5>
        <p className="text-[10px] text-slate-500">
          Senior Engineer Score: 9.4 / 10
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">
      Passed
    </span>
  </div>
);

/** Level 8: Scam Job Shield Protected */
const Level8ShieldWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <ShieldCheck className="w-4 h-4 text-emerald-600" />
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          Fake Job Shield Active
        </h5>
        <p className="text-[10px] text-slate-500">
          1 Scam Prevented • 3 Verified Seed Co Offers
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
      Protected
    </span>
  </div>
);

/** Level 9: Alumni Mentorship Coffee Chat */
const Level9AlumniWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <span className="text-base">☕</span>
      <div>
        <h5 className="text-xs font-bold text-slate-800">
          Coffee Chat: Priya S. (Razorpay)
        </h5>
        <p className="text-[10px] text-slate-500">
          Referral Guidance & Salary Negotiation
        </p>
      </div>
    </div>
    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#0088E0] text-[10px] font-bold">
      Confirmed
    </span>
  </div>
);

/** Level 10: Official Champion Offer Acceptance */
const Level10ChampionWidget: React.FC = () => (
  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-amber-200/80 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <Trophy className="w-4 h-4 text-amber-500" />
      <div>
        <h5 className="text-xs font-bold text-slate-900">
          Job Offer Accepted!
        </h5>
        <p className="text-[10px] text-slate-500">
          $95,000 - $120,000 • Alumni Mentor Guild Unlocked
        </p>
      </div>
    </div>
    <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
      <Sparkles className="w-3 h-3" /> Champion
    </span>
  </div>
);

export default LevelVisualScene;
