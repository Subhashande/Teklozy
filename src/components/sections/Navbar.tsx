import React, { useState } from 'react';
import { ChevronDown, X, Compass, Layers, Bot, ShieldAlert, Award } from 'lucide-react';

interface NavbarProps {
  onScrollToLevel: (levelId: number) => void;
  onOpenClaimModal: () => void;
  brandTitle?: string;
}

/**
 * Floating Dual-Card Navbar Component
 * Card 1: Coiled spring logo glyph, navigation links with dropdown menus, and circular '=' menu toggle.
 * Card 2: 'Get a quote' CTA pill with smiling mascot face.
 */
export const Navbar: React.FC<NavbarProps> = ({
  onScrollToLevel,
  onOpenClaimModal,
  brandTitle = 'MindMarket',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<'methodology' | 'sectors' | 'strategy' | null>(null);

  const toggleDropdown = (menu: 'methodology' | 'sectors' | 'strategy') => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <header className="sticky top-4 sm:top-5 z-50 max-w-6xl mx-auto px-4 sm:px-6 font-manrope">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Card 1: Main Navigation Card */}
        <nav
          aria-label="Main Navigation"
          className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center justify-between gap-5 sm:gap-8 flex-1 max-w-3xl transition-all"
        >
          {/* Logo (Green Coiled Glyph + MindMarket Brandmark) */}
          <div
            onClick={() => onScrollToLevel(1)}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#72BE42] transition-transform group-hover:scale-105"
              viewBox="0 0 36 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="4" r="2" fill="#72BE42" stroke="none" />
              <path d="M10 24C6.5 24 4.5 21 4.5 17C4.5 12.5 8 9 12.5 9C16 9 17.5 11.5 18 15C18.5 11.5 20 9 23.5 9C28 9 31.5 12.5 31.5 17C31.5 21 29.5 24 26 24C23 24 21 21 19.5 16C18 21 16 24 13 24" />
            </svg>

            <span className="font-display font-extrabold text-base sm:text-lg text-[#1F2937] tracking-tight group-hover:text-black transition-colors">
              {brandTitle}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-[14px] font-medium text-[#2A2A2A]">
            <button
              type="button"
              onClick={() => onScrollToLevel(1)}
              className="hover:text-[#72BE42] transition-colors"
            >
              Services
            </button>

            {/* Methodology Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('methodology')}
                className="flex items-center gap-1 hover:text-[#72BE42] transition-colors"
              >
                <span>Methodology</span>
                <ChevronDown className="w-3 h-3 text-slate-500 transition-transform duration-200" />
              </button>

              {dropdownOpen === 'methodology' && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-200 text-left space-y-1 animate-in fade-in duration-150 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(1);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#0088E0]" />
                    <span>Career Awareness</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(3);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-[#0088E0]" />
                    <span>Complete Ecosystem</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(5);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-[#0088E0]" />
                    <span>AI Testing Agent</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sectors Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('sectors')}
                className="flex items-center gap-1 hover:text-[#72BE42] transition-colors"
              >
                <span>Sectors</span>
                <ChevronDown className="w-3 h-3 text-slate-500 transition-transform duration-200" />
              </button>

              {dropdownOpen === 'sectors' && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-200 text-left space-y-1 animate-in fade-in duration-150 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(4);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-[#0088E0]" />
                    <span>Full-Stack & Cloud</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(8);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#0088E0]" />
                    <span>Scam Radar Shield</span>
                  </button>
                </div>
              )}
            </div>

            {/* Strategy Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('strategy')}
                className="flex items-center gap-1 hover:text-[#72BE42] transition-colors"
              >
                <span>Strategy</span>
                <ChevronDown className="w-3 h-3 text-slate-500 transition-transform duration-200" />
              </button>

              {dropdownOpen === 'strategy' && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl p-2.5 shadow-xl border border-slate-200 text-left space-y-1 animate-in fade-in duration-150 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(7);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-[#0088E0]" />
                    <span>1:1 Mock Interviews</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onScrollToLevel(10);
                      setDropdownOpen(null);
                    }}
                    className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0088E0] hover:bg-slate-50 rounded-xl flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-[#0088E0]" />
                    <span>Champion Placement</span>
                  </button>
                </div>
              )}
            </div>

            {/* Pricing */}
            <button
              type="button"
              onClick={() => onScrollToLevel(10)}
              className="hover:text-[#72BE42] transition-colors"
            >
              Pricing
            </button>
          </div>

          {/* Circular Lime Green Hamburger Button (=) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#72BE42] hover:bg-[#64A937] text-white flex flex-col items-center justify-center gap-[4px] shrink-0 transition-transform hover:scale-105 active:scale-95 shadow-xs"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#1E293B]" />
            ) : (
              <>
                <span className="w-3.5 h-[2px] bg-[#1E293B] rounded-full" />
                <span className="w-3.5 h-[2px] bg-[#1E293B] rounded-full" />
              </>
            )}
          </button>
        </nav>

        {/* Card 2: Standalone Floating CTA Box (Get a quote + Smiling Blue Mascot Avatar) */}
        <button
          type="button"
          onClick={onOpenClaimModal}
          className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl pl-4 sm:pl-5 pr-2 sm:pr-2.5 py-2 sm:py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center gap-3 shrink-0 hover:shadow-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <span className="text-xs sm:text-sm font-semibold text-[#1F2937] group-hover:text-[#0088E0] transition-colors whitespace-nowrap">
            Get a quote
          </span>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0088FF] relative overflow-hidden flex items-center justify-center border border-white shadow-xs shrink-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#0088FF" />
              <path
                d="M4 12C7 6 12 4 16 4C22 4 28 8 28 13C28 13 25 10 22 10C19 10 17 12 14 11C11 10 8 11 4 12Z"
                fill="#1E293B"
              />
              <path
                d="M10 14C11 12.5 13 12.5 14 14"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M18 14C19 12.5 21 12.5 22 14"
                stroke="#1E293B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M11 18C11 22 14 24 16 24C18 24 21 22 21 18H11Z"
                fill="#1E293B"
              />
              <path
                d="M13 21C14 23 18 23 19 21C18 23.5 14 23.5 13 21Z"
                fill="#FF6B8B"
              />
              <path
                d="M11.5 18.5H20.5"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white/98 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[#1F2937]">
            <button
              type="button"
              onClick={() => {
                onScrollToLevel(1);
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollToLevel(3);
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
            >
              Methodology
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollToLevel(6);
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
            >
              Sectors
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollToLevel(8);
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
            >
              Strategy
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollToLevel(10);
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left hover:bg-slate-50 rounded-xl transition-colors"
            >
              Pricing
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenClaimModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#72BE42] hover:bg-[#64A937] text-white font-bold rounded-xl text-center text-sm shadow-sm transition-all"
            >
              Get a quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
