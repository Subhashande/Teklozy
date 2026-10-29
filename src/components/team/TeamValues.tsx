import React from 'react';
import { Rocket, Box, Users, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { TEAM_VALUES, ValuePillar } from '../../data/teamData';

export const TeamValues: React.FC = () => {
  const getIcon = (type: ValuePillar['icon']) => {
    switch (type) {
      case 'rocket':
        return <Rocket className="w-5 h-5 text-[#0088E0]" />;
      case 'box':
        return <Box className="w-5 h-5 text-sky-500" />;
      case 'users':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'target':
        return <Target className="w-5 h-5 text-indigo-500" />;
      default:
        return <Rocket className="w-5 h-5 text-[#0088E0]" />;
    }
  };

  return (
    <section className="bg-gradient-to-b from-sky-50/60 via-white to-slate-50/70 rounded-3xl border border-sky-100/90 p-6 sm:p-10 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Architectural Graphic Pill */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 relative z-10">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0088E0]" />
            <span>OUR VALUES</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            What Drives Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            These values guide how we build, collaborate and make decisions every day at Teklozy.
          </p>
        </div>

        {/* Professional Architectural Badge Graphic */}
        <div className="hidden sm:flex items-center gap-3.5 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-2xs shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0088E0] to-sky-400 text-white flex items-center justify-center font-bold text-base shadow-xs">
            4x
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Core Guild Pillars</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Engineered for real student impact</p>
          </div>
        </div>
      </div>

      {/* 4 Values Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
        {TEAM_VALUES.map((val) => (
          <div
            key={val.id}
            className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-150 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                {getIcon(val.icon)}
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-1.5">
                {val.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {val.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
