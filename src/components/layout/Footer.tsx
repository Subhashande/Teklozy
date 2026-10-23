import React, { useState } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onBackToTop?: () => void;
  onNavigateToLevel?: (levelId: number) => void;
  brandName?: string;
}

/**
 * Statement Footer Component
 * 4-column layout matching reference design with faint watermark, company links,
 * external socials, interactive newsletter subscription capsule, and legal bar.
 */
export const Footer: React.FC<FooterProps> = ({
  onBackToTop,
  onNavigateToLevel,
  brandName = 'Teklozy',
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBackToTop) {
      onBackToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/80 bg-[#F8F9FA] text-[#1E293B] font-manrope pt-20 pb-12 select-none">
      {/* Background Watermark (Circular Icon + Massive Faint Wordmark) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center justify-center gap-8 w-full max-w-7xl z-0 opacity-100"
      >
        <div className="flex items-center gap-6 text-[#0066FF]/[0.035] font-display font-black tracking-tight whitespace-nowrap">
          <svg
            className="w-[14vw] h-[14vw] max-w-[180px] max-h-[180px] text-[#0066FF]/[0.035]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          >
            <circle cx="50" cy="50" r="42" />
            <path d="M50 20 A30 30 0 0 1 80 50" strokeWidth="12" strokeLinecap="round" />
            <circle cx="50" cy="50" r="14" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-[14vw] leading-none select-none">
            {brandName}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        {/* 4-Column Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-200/80">
          {/* Column 1: Brand Info (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0066FF] flex items-center justify-center text-white shadow-sm shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 8 4 4-4 4" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl text-[#0F172A] tracking-tight">
                {brandName}
              </span>
            </div>

            <p className="text-sm text-[#64748B] max-w-xs leading-relaxed font-normal">
              Strategic web design, and campaigns tailored to drive result and conversions.
            </p>
          </div>

          {/* Column 2: Company (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToLevel?.(1)}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToLevel?.(4)}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToLevel?.(10)}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Achievements
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToLevel?.(2)}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToLevel?.(3)}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Brand
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@teklozy.com"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
              Socials
            </h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li>
                <a
                  href="mailto:hello@teklozy.com"
                  className="hover:text-[#0066FF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Email</span>
                  <span className="text-slate-400 group-hover:text-[#0066FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0066FF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Instagram</span>
                  <span className="text-slate-400 group-hover:text-[#0066FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0066FF] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>LinkedIn</span>
                  <span className="text-slate-400 group-hover:text-[#0066FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
              Newsletter
            </h4>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Stay ahead with design & marketing tips and strategies that drive results.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold text-center border border-emerald-200">
                Subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <div className="flex items-center bg-white rounded-full border border-slate-200/90 pl-4 pr-1.5 py-1.5 shadow-xs focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20 transition-all">
                  <span className="text-[#94A3B8] text-sm font-semibold mr-2 select-none">@</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full bg-transparent text-xs sm:text-sm text-[#1E293B] placeholder-[#94A3B8] outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-9 h-9 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shrink-0 shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-[#64748B]">
          <p>©2026 {brandName} All rights reserved</p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a href="#privacy" className="hover:text-[#0F172A] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#0F172A] transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-[#0F172A] transition-colors">
              Cookie preferences
            </a>
            <button
              onClick={handleScrollTop}
              className="text-[#0066FF] hover:underline font-semibold inline-flex items-center gap-1 ml-2"
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
