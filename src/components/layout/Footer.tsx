import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';
import logoPng from '../../assets/images/erasebg-teklozy.webp';

interface FooterProps {
  onBackToTop?: () => void;
  onNavigateToLevel?: (levelId: number) => void;
  onOpenTeam?: () => void;
  onOpenLogin?: () => void;
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
  onOpenOpportunities?: () => void;
  onOpenEvents?: () => void;
  brandName?: string;
}

/**
 * Standard, Decent Statement Footer Component
 * Matching the reference layout with:
 * - Left Brand Block: Logo, Slogan Statement, "Get In Touch [→]" button, and #StartupIndia badge.
 * - Right Link Columns: Structured with clean vertical borders (| Roadmap | Company | Connect).
 * - Verified social links with direction arrows kept intact as requested.
 * - Standard bottom legal and copyright bar.
 */
export const Footer: React.FC<FooterProps> = ({
  onBackToTop,
  onNavigateToLevel,
  onOpenTeam,
  onOpenLogin,
  onOpenContact,
  onNavigateHome,
  onOpenOpportunities,
  onOpenEvents,
  brandName = 'Teklozy',
}) => {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = 'mailto:hello@teklozy.com';
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#102746] via-[#0B1D36] to-[#08172B] text-white font-manrope pt-16 sm:pt-20 pb-8 select-none">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#38BDF8]/80 to-transparent" />
      {/* Background Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center justify-center w-full max-w-7xl z-0"
      >
        <span className="text-white/[0.035] font-display font-black tracking-tight whitespace-nowrap text-[14vw] leading-none select-none">
          {brandName}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12 sm:mb-14 rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-7 sm:px-9 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">Ready to take the next step?</p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Your future starts with one step.</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">Build skills, gain practical experience and move forward with confidence.</p>
          </div>
          <button type="button" onClick={onOpenLogin} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0789D8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#159BEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {/* Main Grid: Left Brand Block + Right Link Columns with Vertical Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 sm:pb-16 border-b border-white/15">
          {/* =========================================================================
              LEFT BLOCK: Logo, Slogan Statement, Get In Touch Button, #StartupIndia
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:pr-10">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 p-1.5 flex items-center justify-center shadow-[0_6px_18px_rgba(15,23,42,0.06)] shrink-0">
                <img decoding="async"
                  src={logoPng}
                  alt="Teklozy Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,136,224,0.35)]"
                />
              </div>
              <span className="font-display font-extrabold text-[1.7rem] text-white tracking-tight">
                {brandName}
              </span>
            </div>

            {/* Slogan Statement (Matching Reference Layout) */}
            <p className="font-display font-semibold text-[15px] sm:text-base text-slate-200 leading-relaxed tracking-tight max-w-md">
              Strategic career ecosystems, and 10-stage gamified roadmaps tailored to drive tech mastery and career conversion.
            </p>

            {/* Two-Part "Get In Touch [→]" Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center rounded-xl overflow-hidden bg-[#0A1628] hover:bg-[#0088E0] text-white transition-all duration-300 shadow-[0_8px_20px_rgba(10,22,40,0.14)] hover:shadow-[0_10px_24px_rgba(0,136,224,0.2)] hover:-translate-y-0.5 cursor-pointer group"
              >
                <span className="px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide">
                  Get In Touch
                </span>
                <span className="px-3 py-2.5 bg-white/10 border-l border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              RIGHT BLOCK: 3 Columns with Vertical Dividers (| Roadmap | Company | Connect)
              ========================================================================= */}
          <div className="tk-footer-links lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-5 lg:gap-0">
            {/* Column 1: Roadmap & Curriculum */}
            <div className="sm:border-l sm:border-white/15 sm:pl-6 lg:pl-9 space-y-4">
              <h4 className="text-[11px] font-extrabold uppercase text-sky-300 tracking-[0.16em]">
                Roadmap
              </h4>
              <ul className="space-y-3 text-[13px] sm:text-sm text-slate-300 font-medium">
                <li><button type="button" onClick={() => onNavigateToLevel?.(1)} className="hover:text-sky-300 hover:translate-x-0.5 transition-all text-left">10-Level Journey</button></li>
                <li><button type="button" onClick={() => onNavigateToLevel?.(6)} className="hover:text-sky-300 hover:translate-x-0.5 transition-all text-left">Production Crucibles</button></li>
                <li><button type="button" onClick={() => onNavigateToLevel?.(7)} className="hover:text-sky-300 hover:translate-x-0.5 transition-all text-left">Achievements</button></li>
                <li><button type="button" onClick={() => onNavigateToLevel?.(10)} className="hover:text-sky-300 hover:translate-x-0.5 transition-all text-left">Student FAQs</button></li>
              </ul>
            </div>

            {/* Column 2: Company & destinations */}
            <div className="sm:border-l sm:border-white/15 sm:pl-6 lg:pl-9 space-y-4">
              <h4 className="text-[11px] font-extrabold uppercase text-sky-300 tracking-[0.16em]">Company</h4>
              <ul className="space-y-3 text-[13px] sm:text-sm text-slate-300 font-medium">
                <li><button type="button" onClick={() => onOpenEvents?.()} className="hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200 text-left cursor-pointer">Events & Programs</button></li>
                <li><button type="button" onClick={() => onOpenOpportunities?.()} className="hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200 text-left cursor-pointer">Career Opportunities</button></li>
                <li><button type="button" onClick={() => onOpenLogin?.()} className="hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200 text-left cursor-pointer">Portal Login</button></li>
                <li><button type="button" onClick={handleContactClick} className="hover:text-sky-300 hover:translate-x-0.5 transition-all duration-200 text-left cursor-pointer">Contact Us</button></li>
              </ul>
            </div>

            {/* Column 3: Connect (Social Links with direction arrows preserved) */}
            <div className="sm:border-l sm:border-white/15 sm:pl-6 lg:pl-9 space-y-4">
              <h4 className="text-[11px] font-extrabold uppercase text-sky-300 tracking-[0.16em]">
                Connect
              </h4>
              <ul className="space-y-3 text-[13px] sm:text-sm text-slate-300 font-medium">
                <li>
                  <a
                    href="mailto:hello@teklozy.com"
                    className="hover:text-sky-300 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span>Email</span>
                    <span className="text-slate-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/teklozy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-300 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span>Instagram</span>
                    <span className="text-slate-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/teklozy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-300 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span>LinkedIn</span>
                    <span className="text-slate-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-7 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <button
            type="button"
            onClick={handleScrollTop}
            className="text-sky-300 hover:text-white font-bold inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
