import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoPng from '../../assets/images/erasebg-teklozy.png';

interface HeaderProps {
  onScrollToLevel: (levelId: number) => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

/**
 * Morphing Header Component
 * - Top of page (scroll <= 40): Transparent and seamless with the hero section, matching reference images.
 * - On scroll (scroll > 40): Morphs smoothly into the floating frosted glass pill capsule.
 */
export const Header: React.FC<HeaderProps> = ({
  onScrollToLevel,
  onOpenContact,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (levelId: number) => {
    onScrollToLevel(levelId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 font-manrope transition-all duration-300 pointer-events-none ${
        isScrolled ? 'pt-3 sm:pt-4' : 'pt-4 sm:pt-6'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 pointer-events-auto ${
          isScrolled ? 'max-w-6xl px-4 sm:px-6' : 'max-w-7xl px-6 sm:px-10'
        }`}
      >
        {/* Navigation Bar: morphs from transparent inline to high-contrast glass capsule */}
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B1528]/85 hover:bg-[#0B1528]/95 backdrop-blur-xl border border-white/20 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 shadow-[0_12px_40px_rgba(0,0,0,0.32)] gap-4'
              : 'bg-transparent border border-transparent px-2 py-1 gap-6'
          }`}
        >
          {/* Left: Company Logo (Teklozy Emblem & Wordmark) */}
          <div
            onClick={() => handleNavClick(1)}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 overflow-hidden flex items-start justify-center shrink-0">
              <img
                src={logoPng}
                alt="Teklozy Emblem"
                className="w-full h-[150%] object-contain filter drop-shadow-[0_2px_10px_rgba(0,136,224,0.45)] transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <span className="font-display font-extrabold text-2xl sm:text-[1.65rem] text-white tracking-tight">
              Tek<span className="text-[#0088E0]">lozy</span>
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-semibold text-white/90">
            <button
              type="button"
              onClick={() => handleNavClick(1)}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-xs"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(2)}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-xs"
            >
              Career Levels
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(7)}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-xs"
            >
              Success Stories
            </button>
            <button
              type="button"
              onClick={() => handleNavClick(9)}
              className="hover:text-white transition-colors cursor-pointer drop-shadow-xs"
            >
              Our Team
            </button>
          </div>

          {/* Right: Actions & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden lg:inline-block text-sm font-semibold text-white/85 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/10"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer shrink-0"
            >
              Contact Us
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-[#061229]/85 backdrop-blur-xl border border-white/30 rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="flex flex-col gap-3 text-sm font-medium text-white/85">
              <button
                type="button"
                onClick={() => handleNavClick(1)}
                className="text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                How it works
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(2)}
                className="text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                Career Levels
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(7)}
                className="text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                Success Stories
              </button>
              <button
                type="button"
                onClick={() => handleNavClick(9)}
                className="text-left px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
              >
                Our Team
              </button>

              <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-2.5 rounded-full text-center transition-all border border-white/20 cursor-pointer"
                >
                  Log in (3-Way Portal)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-sm py-3 rounded-full text-center transition-all shadow-md cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
