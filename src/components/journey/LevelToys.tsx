import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CAREER_OPTIONS,
  FAKE_JOBS_SAMPLE,
  ALUMNI_PINS,
} from '../../data/journeyConfig';
import {
  Check,
  Flame,
  Rocket,
  Sparkles,
  PhoneCall,
} from 'lucide-react';

interface ToyProps {
  levelId: number;
  accent: string;
  onUpdateAccent?: (color: string) => void;
  onAddXp?: (amount: number) => void;
}

export const LevelToy: React.FC<ToyProps> = ({
  levelId,
  onUpdateAccent,
  onAddXp,
}) => {
  // Toy 1: Career Picker & Compass
  const [selectedCareer, setSelectedCareer] = useState(CAREER_OPTIONS[0]);

  // Toy 2: 30-Day Streak Grid
  const [activeDays, setActiveDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  const [streakCount, setStreakCount] = useState(12);

  // Toy 4: Real-world Startup Jira Ticket
  const [ticketStatus, setTicketStatus] = useState<'todo' | 'progress' | 'done'>('todo');

  // Toy 5: Scaling & Deployment Pipeline
  const [deployState, setDeployState] = useState<'idle' | 'building' | 'testing' | 'deployed'>('idle');

  // Toy 6: Professional Identity Checklist
  const [profileChecks, setProfileChecks] = useState<Record<string, boolean>>({
    resume: true,
    github: true,
    linkedin: true,
    portfolio: false,
    leetcode: true,
    coverLetter: false,
  });

  // Toy 7: 1:1 Mock Interview Call Tile
  const [isCalling, setIsCalling] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  // Toy 8: Fake Job Radar Scanner
  const [scanned, setScanned] = useState(false);

  // Toy 9: Alumni Connect Active Mentor
  const [activeAlum, setActiveAlum] = useState(ALUMNI_PINS[0]);

  // Toy 10: Champion Confetti
  const [championClaimed, setChampionClaimed] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => setCallTimer((prev) => prev + 1), 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  switch (levelId) {
    // LEVEL 1: CAREER AWARENESS & CLASS PICKER
    case 1:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Top 5 Careers</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0088E0] border border-blue-200">
              Interactive Diagnostic
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {CAREER_OPTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCareer(c);
                  onUpdateAccent?.(c.color);
                  onAddXp?.(25);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                  selectedCareer.id === c.id
                    ? 'border-[#0088E0] bg-blue-50/80 shadow-xs font-bold'
                    : 'border-slate-200 hover:border-slate-400 bg-white'
                }`}
              >
                <span className="text-base">{c.icon}</span>
                <div>
                  <div className="text-xs font-bold text-[#0F172A] leading-tight">{c.name}</div>
                  <div className="text-[10px] text-slate-500">{c.role}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-[11px] font-semibold text-slate-600 flex items-center justify-between pt-2 border-t border-slate-200">
            <span>Selected: <span className="font-bold text-[#0088E0]">{selectedCareer.name}</span></span>
            <span className="text-[#0088E0] font-bold">+25 XP</span>
          </div>
        </div>
      );

    // LEVEL 2: LEARNING & 30-DAY STREAK
    case 2:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#0088E0] fill-[#0088E0]" />
              <span className="font-display font-bold text-sm text-[#0F172A]">Day {streakCount} Streak</span>
            </div>
            <span className="text-xs font-bold text-[#0088E0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              GitHub + LeetCode Synced
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: 30 }, (_, idx) => idx + 1).map((day) => {
              const isLit = activeDays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => {
                    if (!isLit) {
                      setActiveDays([...activeDays, day]);
                      setStreakCount((prev) => prev + 1);
                      onAddXp?.(50);
                    }
                  }}
                  className={`h-7 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center ${
                    isLit
                      ? 'bg-[#0088E0] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`Day ${day}`}
                >
                  {isLit ? '✓' : day}
                </button>
              );
            })}
          </div>
          <div className="mt-2.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Tap upcoming days to log YouTube battle</span>
            <span className="text-[#0088E0] font-bold">+50 XP / day</span>
          </div>
        </div>
      );

    // LEVEL 3: COMPLETE ECOSYSTEM
    case 3:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">Complete Ecosystem</span>
            <span className="text-xs font-bold text-[#0088E0]">Advanced Skill Tree</span>
          </div>
          <div className="relative h-32 bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col justify-between">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50" y1="30" x2="140" y2="60" stroke="#0088E0" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="140" y1="60" x2="240" y2="30" stroke="#0088E0" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="140" y1="60" x2="190" y2="105" stroke="#CBD5E1" strokeWidth="2" />
            </svg>
            <div className="flex justify-between relative z-10">
              <button
                onClick={() => onAddXp?.(30)}
                className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-bold shadow-xs"
              >
                React & TS ✓
              </button>
              <button
                onClick={() => onAddXp?.(30)}
                className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-bold shadow-xs"
              >
                Distributed APIs ✓
              </button>
            </div>
            <div className="flex justify-center relative z-10">
              <button
                onClick={() => onAddXp?.(50)}
                className="px-3 py-1 rounded-lg bg-[#0088E0] text-white text-[11px] font-bold shadow-sm"
              >
                System Architecture ⚡
              </button>
            </div>
            <div className="flex justify-between relative z-10 text-[10px]">
              <span className="text-slate-500 font-bold">RAG Agent Pipelines</span>
              <span className="text-slate-500 font-bold">Micro-Services</span>
            </div>
          </div>
        </div>
      );

    // LEVEL 4: REAL-WORLD STARTUP & SDLC JIRA OPERATIONS
    case 4:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">Startup SDLC Board</span>
            <span className="text-xs font-bold text-[#0088E0]">Jira Ticket TK-14</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">To Do</span>
              {ticketStatus === 'todo' && (
                <div
                  onClick={() => {
                    setTicketStatus('progress');
                    onAddXp?.(50);
                  }}
                  className="p-2 bg-white rounded-lg border-2 border-[#0088E0] text-[10px] font-bold cursor-pointer hover:scale-102 transition-transform shadow-xs"
                >
                  TK-14: Auth Service
                  <div className="text-[9px] text-[#0088E0] mt-1">Click → In Dev</div>
                </div>
              )}
            </div>
            <div className="bg-blue-50/40 p-2 rounded-xl border border-blue-200 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#0088E0] uppercase">In Progress</span>
              {ticketStatus === 'progress' && (
                <div
                  onClick={() => {
                    setTicketStatus('done');
                    onAddXp?.(100);
                  }}
                  className="p-2 bg-white rounded-lg border-2 border-[#0F172A] text-[10px] font-bold cursor-pointer hover:scale-102 transition-transform shadow-xs"
                >
                  TK-14: Auth Service
                  <div className="text-[9px] text-[#0F172A] mt-1">Click → Done</div>
                </div>
              )}
            </div>
            <div className="bg-slate-100 p-2 rounded-xl border border-slate-300 min-h-[90px] flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-800 uppercase">Done ✓</span>
              {ticketStatus === 'done' && (
                <div className="p-2 bg-[#0F172A] text-white rounded-lg text-[10px] font-bold shadow-xs flex items-center justify-between">
                  <span>Merged!</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      );

    // LEVEL 5: SCALING & AUTONOMOUS AI TESTING AGENT
    case 5:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">AI Testing Agent</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                deployState === 'deployed'
                  ? 'bg-blue-50 text-[#0088E0] border border-blue-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {deployState === 'deployed' ? 'Live Production' : 'Standing By'}
            </span>
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Cloud Build & Typecheck</span>
              <span className={deployState !== 'idle' ? 'text-emerald-600 font-bold' : ''}>
                {deployState !== 'idle' ? 'Passed ✓' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Autonomous AI Testing Suite</span>
              <span className={deployState === 'deployed' ? 'text-emerald-600 font-bold' : ''}>
                {deployState === 'deployed' ? '48/48 Green ✓' : 'Ready to Run'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setDeployState('building');
              setTimeout(() => setDeployState('testing'), 500);
              setTimeout(() => {
                setDeployState('deployed');
                onAddXp?.(150);
              }, 1200);
            }}
            className="w-full mt-3 py-2 rounded-xl bg-[#0088E0] text-white text-xs font-bold hover:bg-[#0077CC] transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>{deployState === 'deployed' ? 'Redeploy Pipeline' : 'Run One-Click Deploy'}</span>
          </button>
        </div>
      );

    // LEVEL 6: PROFESSIONAL IDENTITY
    case 6: {
      const completedCount = Object.values(profileChecks).filter(Boolean).length;
      const strengthPercent = Math.round((completedCount / 6) * 100);

      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold text-sm text-[#0F172A]">Proof-of-Work Identity</span>
            <span className="text-xs font-bold text-[#0088E0] font-mono">{strengthPercent}% Ready</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(profileChecks).map(([key, val]) => (
              <button
                key={key}
                onClick={() => {
                  setProfileChecks((prev) => ({ ...prev, [key]: !prev[key] }));
                  onAddXp?.(20);
                }}
                className={`p-1.5 rounded-lg border text-left flex items-center justify-between text-[11px] font-semibold ${
                  val ? 'bg-blue-50/70 border-blue-300 text-blue-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span className="capitalize">{key}</span>
                {val && <Check className="w-3.5 h-3.5 text-[#0088E0]" />}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // LEVEL 7: INTERVIEW PREPARATION
    case 7:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">1:1 Mock Arena</span>
            <span className="text-xs font-bold text-[#0088E0]">Expert Session</span>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-[#0F172A] p-3 text-white">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isCalling ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                <span>{isCalling ? `00:${String(callTimer).padStart(2, '0')}` : 'Session Ready'}</span>
              </span>
              <span className="text-[10px] text-slate-400">Staff Engineer Mentor</span>
            </div>
            <p className="text-[11px] text-slate-200 italic my-2">
              "{isCalling ? 'Explain the latency and failover strategy of your Level 05 cloud deployment.' : 'Click to start your realistic technical mock session.'}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsCalling(!isCalling);
                  if (!isCalling) onAddXp?.(75);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                  isCalling ? 'bg-rose-600 text-white' : 'bg-[#0088E0] text-white hover:bg-[#0077CC]'
                }`}
              >
                <PhoneCall className="w-3 h-3" />
                <span>{isCalling ? 'End Mock Call' : 'Start Mock Session'}</span>
              </button>
            </div>
          </div>
        </div>
      );

    // LEVEL 8: OPPORTUNITIES & FAKE JOB DETECTION SHIELD
    case 8:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">Fake Job Shield</span>
            <button
              onClick={() => {
                setScanned(true);
                onAddXp?.(80);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#0088E0] text-white text-[11px] font-bold shadow-xs hover:bg-[#0077CC]"
            >
              Scan Job Feed
            </button>
          </div>
          <div className="space-y-1.5 mt-2">
            {FAKE_JOBS_SAMPLE.map((job) => {
              const isScam = job.status === 'fake';
              return (
                <div
                  key={job.id}
                  className={`p-2 rounded-lg border text-[11px] flex items-center justify-between transition-colors ${
                    scanned && isScam
                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold">{job.role}</div>
                    <div className="text-[10px] text-slate-500">{job.company}</div>
                  </div>
                  {scanned && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        isScam ? 'bg-rose-600 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isScam ? 'SCAM BLOCKED' : 'VERIFIED'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );

    // LEVEL 9: ALUMNI CONNECT GUILD
    case 9:
      return (
        <div className="reveal tk-card p-4 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold text-sm text-[#0F172A]">Alumni Connect</span>
            <span className="text-xs font-bold text-[#0088E0]">Global Guild</span>
          </div>
          <div className="flex gap-1.5 mb-2">
            {ALUMNI_PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => {
                  setActiveAlum(pin);
                  onAddXp?.(40);
                }}
                className={`flex-1 py-1 text-center rounded-lg border text-xs transition-all ${
                  activeAlum.id === pin.id
                    ? 'bg-[#0088E0] text-white font-bold border-[#0088E0]'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {pin.avatar}
              </button>
            ))}
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950">
            <div className="font-bold">{activeAlum.name}</div>
            <div className="text-[11px] text-blue-900">{activeAlum.role}</div>
            <div className="text-[10px] text-[#0088E0] font-bold mt-1">✓ {activeAlum.time}</div>
            <div className="text-[10px] text-slate-600 italic mt-1">"{activeAlum.tip}"</div>
          </div>
        </div>
      );

    // LEVEL 10: CHAMPION
    case 10:
      return (
        <div className="reveal tk-card p-5 bg-white max-w-sm border-2 border-[#0F172A] shadow-[4px_4px_0_0_#0F172A] text-center">
          <div className="text-3xl mb-1">🏆</div>
          <h3 className="font-display font-bold text-lg text-[#0F172A]">Champion Milestone</h3>
          <p className="text-xs text-slate-600 mt-1 mb-3">
            You completed all 10 stages from zero to hired. Claim your career spot!
          </p>
          <button
            onClick={() => {
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
              });
              setChampionClaimed(true);
              onAddXp?.(500);
            }}
            className="w-full py-3 rounded-xl bg-[#0088E0] text-white font-display font-bold text-sm hover:bg-[#0077CC] transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>{championClaimed ? 'Congratulations! Career Claimed' : 'Pop Confetti & Claim Spot'}</span>
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default LevelToy;
