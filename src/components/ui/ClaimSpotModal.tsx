import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import teloAvatar from '../../assets/mascot/telo-mascot.png';

interface ClaimSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClaimSpotModal: React.FC<ClaimSpotModalProps> = ({ isOpen, onClose }) => {
  const [claimEmail, setClaimEmail] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimEmail.trim()) {
      setIsClaimed(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0088E0', '#2563EB', '#10B981'],
      });
      setTimeout(() => {
        setIsClaimed(false);
        setClaimEmail('');
        onClose();
      }, 2400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0088E0]">
            <img
              src={teloAvatar}
              alt="Telo mascot"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-[#131209]">
              Claim Your Level 01 Spot
            </h3>
            <p className="text-xs text-slate-500">
              Begin your 10-level journey with Telo as your guide.
            </p>
          </div>
        </div>

        {isClaimed ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm text-center">
            Spot claimed! Welcome aboard, champion!
          </div>
        ) : (
          <form onSubmit={handleClaimSubmit} className="space-y-4">
            <input
              type="email"
              required
              value={claimEmail}
              onChange={(e) => setClaimEmail(e.target.value)}
              placeholder="Enter your student email..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-[#0088E0]/20"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#0088E0] text-white text-sm font-bold hover:bg-[#0077CC] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Confirm Spot
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ClaimSpotModal;
