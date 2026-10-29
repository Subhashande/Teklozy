import React from 'react';
import { ArrowUp, ArrowRight, ShieldCheck } from 'lucide-react';
import logoPng from '../../assets/images/erasebg-teklozy.png';
import startupIndiaPng from '../../assets/images/startup-india.png';

interface FooterProps {
  onBackToTop?: () => void;
  onNavigateToLevel?: (levelId: number) => void;
  onOpenTeam?: () => void;
  onOpenLogin?: () => void;
  onOpenContact?: () => void;
  onNavigateHome?: () => void;
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
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-[#FAFAFA] text-[#1E293B] font-manrope pt-16 pb-10 select-none">
      {/* Background Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center justify-center w-full max-w-7xl z-0"
      >
        <span className="text-[#0088E0]/[0.025] font-display font-black tracking-tight whitespace-nowrap text-[14vw] leading-none select-none">
          {brandName}
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Main Grid: Left Brand Block + Right Link Columns with Vertical Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-200/80">
          {/* =========================================================================
              LEFT BLOCK: Logo, Slogan Statement, Get In Touch Button, #StartupIndia
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shadow-2xs shrink-0">
                <img
                  src={logoPng}
                  alt="Teklozy Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,136,224,0.35)]"
                />
              </div>
              <span className="font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
                {brandName}
              </span>
            </div>

            {/* Slogan Statement (Matching Reference Layout) */}
            <p className="font-display font-bold text-sm sm:text-base text-slate-900 leading-[1.25] tracking-tight max-w-sm">
              Strategic career ecosystems, and 10-stage gamified roadmaps tailored to drive tech mastery and career conversion.
            </p>

            {/* Two-Part "Get In Touch [→]" Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center rounded-lg overflow-hidden bg-[#0A1628] hover:bg-[#0088E0] text-white transition-all shadow-sm cursor-pointer group"
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
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 lg:gap-0">
            {/* Column 1: Roadmap & Curriculum */}
            <div className="sm:border-l sm:border-slate-200/90 sm:pl-6 lg:pl-8 space-y-3.5">
              <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
                Roadmap
              </h4>
              <ul className="space-y-2.5 text-sm text-[#475569] font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLevel?.(1)}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    10-Level Journey
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLevel?.(4)}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Production Crucibles
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLevel?.(10)}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Achievements
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLevel?.(2)}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Student FAQs
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="sm:border-l sm:border-slate-200/90 sm:pl-6 lg:pl-8 space-y-3.5">
              <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-[#475569] font-medium">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenTeam) {
                        onOpenTeam();
                      } else {
                        window.location.hash = '#team';
                      }
                    }}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenTeam) {
                        onOpenTeam();
                      } else {
                        window.location.hash = '#team';
                      }
                    }}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenLogin) {
                        onOpenLogin();
                      } else {
                        window.location.hash = '#login';
                      }
                    }}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Portal Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleContactClick}
                    className="hover:text-[#0088E0] transition-colors text-left cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect (Social Links with direction arrows preserved) */}
            <div className="sm:border-l sm:border-slate-200/90 sm:pl-6 lg:pl-8 space-y-3.5">
              <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
                Connect
              </h4>
              <ul className="space-y-2.5 text-sm text-[#475569] font-medium">
                <li>
                  <a
                    href="mailto:hello@teklozy.com"
                    className="hover:text-[#0088E0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Email</span>
                    <span className="text-slate-400 group-hover:text-[#0088E0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/teklozy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0088E0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Instagram</span>
                    <span className="text-slate-400 group-hover:text-[#0088E0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/teklozy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0088E0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>LinkedIn</span>
                    <span className="text-slate-400 group-hover:text-[#0088E0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/teklozy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0088E0] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>YouTube</span>
                    <span className="text-slate-400 group-hover:text-[#0088E0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM BAR: Privacy Policy, Terms, Cookie Preferences & Copyright
            ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-[#64748B]">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button
              type="button"
              onClick={handleContactClick}
              className="hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Cookie preferences
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p>© 2026 {brandName} All rights reserved</p>
            <button
              type="button"
              onClick={handleScrollTop}
              className="text-[#0088E0] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
