import React from 'react';
import { Rocket, Box, Users, Target } from 'lucide-react';
import { TEAM_VALUES, ValuePillar } from '../../data/teamData';
import teloMascot from '../../assets/mascot/telo-mascot.png';

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
    <section className="bg-gradient-to-b from-sky-50/50 via-white to-slate-50/60 rounded-3xl border border-sky-100/80 p-6 sm:p-10 relative overflow-hidden">
      {/* Top Header & Mascot Illustration */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-[11px] font-bold uppercase tracking-wider mb-3">
            OUR VALUES
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
            What Drives Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            These values guide how we build, collaborate and make decisions every day at Teklozy.
          </p>
        </div>

        {/* Mascot Accent */}
        <div className="hidden sm:flex items-center justify-center relative shrink-0">
          <div className="w-24 h-24 lg:w-32 lg:h-32 relative">
            <img
              src={teloMascot}
              alt="Teklozy Mascot Telo"
              className="w-full h-full object-contain filter drop-shadow-md animate-pulse duration-1000"
            />
          </div>
        </div>
      </div>

      {/* 4 Values Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {TEAM_VALUES.map((val) => (
          <div
            key={val.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-3.5">
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

