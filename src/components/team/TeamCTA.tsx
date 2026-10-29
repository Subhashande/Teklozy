import React from 'react';
import { ArrowRight, Sparkles, Layers, Terminal, Code2 } from 'lucide-react';

interface TeamCTAProps {
  onOpenContact: () => void;
}

export const TeamCTA: React.FC<TeamCTAProps> = ({ onOpenContact }) => {
  return (
    <section className="rounded-3xl bg-[#0B1526] text-white p-7 sm:p-10 lg:p-12 overflow-hidden relative shadow-xl border border-slate-800">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0088E0]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Side: Creative Tech Contributor & Open Roles Visual */}
        <div className="w-full lg:w-auto order-2 lg:order-1 space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md max-w-md">
            <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                  Open Guild Positions
                </span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Remote & Hybrid
              </span>
            </div>

            {/* Role Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-200">
                Frontend Systems
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-200">
                Cloud Architecture
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-200">
                Curriculum Design
              </span>
            </div>

            {/* Contributors Stack */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-sky-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                  GD
                </span>
                <span className="w-7 h-7 rounded-full bg-indigo-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                  AR
                </span>
                <span className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                  RV
                </span>
                <span className="w-7 h-7 rounded-full bg-amber-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                  SR
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Join 6+ creators at Teklozy</p>
            </div>
          </div>
        </div>

        {/* Right Side: Join Pitch & Action */}
        <div className="max-w-xl order-1 lg:order-2 space-y-3.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>BE A PART OF TEKLOZY</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Want to join our team?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We're always looking for passionate builders, designers, and educators who want to shape the future of student careers.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#0088E0] hover:bg-[#0077CC] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
