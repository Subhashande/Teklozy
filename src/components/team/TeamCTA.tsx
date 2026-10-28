import React from 'react';
import { ArrowRight } from 'lucide-react';
import teloMascot from '../../assets/mascot/telo-mascot.png';

interface TeamCTAProps {
  onOpenContact: () => void;
}

export const TeamCTA: React.FC<TeamCTAProps> = ({ onOpenContact }) => {
  return (
    <section className="rounded-3xl bg-[#0B1526] text-white p-7 sm:p-10 lg:p-12 overflow-hidden relative shadow-xl">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Side: Team Mascot & Avatars Showcase */}
        <div className="flex items-center gap-4 order-2 md:order-1">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center backdrop-blur-xs">
            <img
              src={teloMascot}
              alt="Teklozy Team Mascot"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
          <div className="space-y-1">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-sky-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                GV
              </span>
              <span className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                AR
              </span>
              <span className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                RV
              </span>
              <span className="w-8 h-8 rounded-full bg-amber-500 border-2 border-[#0B1526] flex items-center justify-center text-[10px] font-bold">
                SR
              </span>
            </div>
            <p className="text-xs text-sky-200/80 font-medium">Join 6+ creators at Teklozy</p>
          </div>
        </div>

        {/* Right Side: Join Pitch & Action */}
        <div className="max-w-xl order-1 md:order-2 space-y-3 text-left md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
            BE A PART OF TEKLOZY
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Want to join our team?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We're always looking for passionate individuals who want to make a difference in student careers.
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

