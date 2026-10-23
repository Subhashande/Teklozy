import React from 'react';
import logoPng from '../../assets/images/erasebg-teklozy.png';

interface BrandLogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Teklozy Official Emblem & Wordmark
 * Displays crisp wing-shield 'T' emblem alongside Teklozy typography.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-9',
  showWordmark = true,
}) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <img
      src={logoPng}
      alt="Teklozy Emblem"
      className="h-8 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,136,224,0.25)]"
    />
    {showWordmark && (
      <span className="font-display text-2xl font-bold tracking-tight leading-none text-[#0F172A]">
        Tek<span className="text-[#0088E0]">lozy</span>
      </span>
    )}
  </div>
);

// Backward-compatible alias
export const TeklozyLogo = BrandLogo;
export default BrandLogo;
