import React from 'react';

export const LevelProps: React.FC<{ id: number; accent: string }> = ({ id, accent }) => {
  switch (id) {
    case 1:
      // Level 1: Career Awareness — Compass, 5-Way Crossroads Sign, Route Map
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Adventurer's Precision Compass */}
          <div className="prop absolute right-[15vw] top-[22vh]">
            <svg width="180" height="180" viewBox="0 0 160 160" fill="none">
              <circle cx="80" cy="80" r="72" fill="#FFFFFF" stroke="#0F172A" strokeWidth="6" />
              <circle cx="80" cy="80" r="60" fill="#F0F9FF" stroke="#0088E0" strokeWidth="2.5" strokeDasharray="4 6" />
              <polygon points="80,24 88,80 80,74 72,80" fill="#0088E0" />
              <polygon points="80,136 88,80 80,86 72,80" fill="#0F172A" />
              <circle cx="80" cy="80" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
              <text x="80" y="20" textAnchor="middle" fill="#0088E0" fontWeight="bold" fontSize="12">N</text>
              <text x="80" y="152" textAnchor="middle" fill="#64748B" fontWeight="bold" fontSize="12">S</text>
            </svg>
          </div>

          {/* Prop 2: 5-Way Career Crossroads Signpost */}
          <div className="prop absolute right-[30vw] top-[48vh]">
            <svg width="150" height="160" viewBox="0 0 130 150" fill="none">
              <rect x="58" y="20" width="14" height="130" rx="4" fill="#0F172A" />
              {/* Sign 1: Frontend */}
              <polygon points="20,28 94,28 108,40 94,52 20,52" fill="#0088E0" stroke="#0F172A" strokeWidth="3.5" />
              <text x="58" y="44" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="10">FRONTEND</text>
              {/* Sign 2: Backend */}
              <polygon points="110,64 36,64 22,76 36,88 110,88" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
              <text x="68" y="80" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="10">BACKEND</text>
            </svg>
          </div>

          {/* Prop 3: Rolled Parchment Diagnostic Map */}
          <div className="prop absolute right-[9vw] top-[52vh]">
            <svg width="150" height="130" viewBox="0 0 140 120" fill="none">
              <path d="M 20 20 Q 70 10 120 20 L 115 100 Q 65 90 15 100 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <path d="M 35 40 Q 65 35 95 55 T 100 80" stroke="#0088E0" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              <circle cx="100" cy="80" r="6" fill="#0088E0" stroke="#0F172A" strokeWidth="2" />
              <path d="M 35 75 L 50 65 L 65 75" stroke="#64748B" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      );

    case 2:
      // Level 2: Learning & Practice — YouTube Source, Crossed Blades, Commit Grid, Streak Flame
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Streak Flame */}
          <div className="prop absolute right-[17vw] top-[18vh]">
            <svg width="160" height="180" viewBox="0 0 140 160" fill="none">
              <path d="M 70 145 C 30 145, 10 105, 35 65 C 45 90, 65 95, 60 45 C 80 75, 115 85, 110 115 C 105 135, 90 145, 70 145 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="5" />
              <path d="M 70 140 C 45 140, 30 115, 48 90 C 55 105, 68 110, 65 80 C 80 100, 95 105, 92 125 C 88 135, 80 140, 70 140 Z" fill="#60A5FA" />
              <circle cx="70" cy="120" r="10" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Prop 2: YouTube Video Source Card */}
          <div className="prop absolute right-[29vw] top-[46vh]">
            <svg width="150" height="110" viewBox="0 0 140 100" fill="none">
              <rect x="10" y="10" width="120" height="80" rx="20" fill="#0F172A" stroke="#0088E0" strokeWidth="4" />
              <polygon points="55,30 95,50 55,70" fill="#0088E0" />
              <circle cx="108" cy="28" r="4" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Prop 3: GitHub Blue Commit Matrix */}
          <div className="prop absolute right-[10vw] top-[50vh]">
            <svg width="160" height="140" viewBox="0 0 150 130" fill="none">
              <g transform="rotate(10 75 65)">
                <rect x="15" y="15" width="26" height="26" rx="6" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
                <rect x="47" y="15" width="26" height="26" rx="6" fill="#2563EB" stroke="#0F172A" strokeWidth="3" />
                <rect x="79" y="15" width="26" height="26" rx="6" fill="#1D4ED8" stroke="#0F172A" strokeWidth="3" />
                <rect x="15" y="47" width="26" height="26" rx="6" fill="#60A5FA" stroke="#0F172A" strokeWidth="3" />
                <rect x="47" y="47" width="26" height="26" rx="6" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
                <rect x="79" y="47" width="26" height="26" rx="6" fill="#93C5FD" stroke="#0F172A" strokeWidth="3" />
              </g>
            </svg>
          </div>
        </div>
      );

    case 3:
      // Level 3: Advanced Learning & Complete Ecosystem — Architecture Cube, Neural Chip
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Complete Ecosystem Isometric Cube */}
          <div className="prop absolute right-[17vw] top-[22vh]">
            <svg width="170" height="170" viewBox="0 0 160 160" fill="none">
              <polygon points="80,20 140,55 80,90 20,55" fill="#0088E0" stroke="#0F172A" strokeWidth="4" />
              <polygon points="20,55 80,90 80,150 20,115" fill="#1D4ED8" stroke="#0F172A" strokeWidth="4" />
              <polygon points="140,55 80,90 80,150 140,115" fill="#2563EB" stroke="#0F172A" strokeWidth="4" />
              <circle cx="80" cy="55" r="10" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Prop 2: Neural Architecture Processor */}
          <div className="prop absolute right-[28vw] top-[48vh]">
            <svg width="150" height="140" viewBox="0 0 140 130" fill="none">
              <rect x="25" y="25" width="90" height="80" rx="14" fill="#0F172A" stroke="#0088E0" strokeWidth="4" />
              <circle cx="70" cy="65" r="22" fill="#0088E0" />
              <line x1="70" y1="10" x2="70" y2="25" stroke="#0088E0" strokeWidth="3" />
              <line x1="45" y1="10" x2="45" y2="25" stroke="#0088E0" strokeWidth="3" />
              <line x1="95" y1="10" x2="95" y2="25" stroke="#0088E0" strokeWidth="3" />
              <line x1="10" y1="65" x2="25" y2="65" stroke="#0088E0" strokeWidth="3" />
              <line x1="115" y1="65" x2="130" y2="65" stroke="#0088E0" strokeWidth="3" />
            </svg>
          </div>

          {/* Prop 3: Floating Skill Prism */}
          <div className="prop absolute right-[9vw] top-[52vh]">
            <svg width="130" height="130" viewBox="0 0 120 120" fill="none">
              <polygon points="60,15 105,45 105,85 60,110 15,85 15,45" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <line x1="60" y1="15" x2="60" y2="110" stroke="#0088E0" strokeWidth="2.5" />
              <line x1="15" y1="45" x2="105" y2="85" stroke="#0088E0" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      );

    case 4:
      // Level 4: Build like a startup — Startup Booster, Jira Sprint Sheet, Blueprint
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Startup Booster Rocket */}
          <div className="prop absolute right-[16vw] top-[20vh]">
            <svg width="170" height="190" viewBox="0 0 150 170" fill="none">
              <g transform="rotate(-28 75 85)">
                <path d="M 75 15 C 60 50, 48 95, 52 130 L 98 130 C 102 95, 90 50, 75 15 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
                <circle cx="75" cy="70" r="14" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
                <polygon points="50,105 20,135 52,130" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
                <polygon points="100,105 130,135 98,130" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
                <polygon points="60,135 75,165 90,135" fill="#2563EB" />
              </g>
            </svg>
          </div>

          {/* Prop 2: Jira Task Board Card */}
          <div className="prop absolute right-[28vw] top-[48vh]">
            <svg width="150" height="120" viewBox="0 0 140 110" fill="none">
              <rect x="15" y="15" width="110" height="80" rx="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <rect x="25" y="28" width="50" height="10" rx="3" fill="#0088E0" />
              <line x1="25" y1="52" x2="105" y2="52" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
              <line x1="25" y1="66" x2="85" y2="66" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
              <circle cx="108" cy="80" r="8" fill="#0088E0" />
            </svg>
          </div>

          {/* Prop 3: SDLC Blueprint Card */}
          <div className="prop absolute right-[9vw] top-[52vh]">
            <svg width="140" height="130" viewBox="0 0 130 120" fill="none">
              <rect x="15" y="15" width="100" height="90" rx="10" fill="#0F172A" stroke="#0088E0" strokeWidth="4" />
              <line x1="15" y1="45" x2="115" y2="45" stroke="#0088E0" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="15" y1="75" x2="115" y2="75" stroke="#0088E0" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="50" y1="15" x2="50" y2="105" stroke="#0088E0" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      );

    case 5:
      // Level 5: Scaling & Deployment — Cloud Server, Autonomous AI Test Drone, Green Shield
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: AI Test Drone */}
          <div className="prop absolute right-[17vw] top-[18vh]">
            <svg width="170" height="150" viewBox="0 0 160 140" fill="none">
              <circle cx="80" cy="70" r="34" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <circle cx="80" cy="70" r="16" fill="#0088E0" />
              <circle cx="84" cy="66" r="5" fill="#FFFFFF" />
              <line x1="30" y1="40" x2="130" y2="40" stroke="#0F172A" strokeWidth="4" />
              <ellipse cx="30" cy="38" rx="20" ry="4" fill="#CBD5E1" />
              <ellipse cx="130" cy="38" rx="20" ry="4" fill="#CBD5E1" />
            </svg>
          </div>

          {/* Prop 2: 48/48 Green Pass Shield */}
          <div className="prop absolute right-[28vw] top-[46vh]">
            <svg width="140" height="150" viewBox="0 0 120 130" fill="none">
              <path d="M 60 15 L 100 30 L 100 80 Q 60 115 60 115 Q 20 80 20 80 L 20 30 Z" fill="#0F172A" stroke="#0088E0" strokeWidth="4" />
              <path d="M 42 64 L 54 76 L 80 48" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Prop 3: Cloud Cluster Server */}
          <div className="prop absolute right-[9vw] top-[50vh]">
            <svg width="140" height="150" viewBox="0 0 120 130" fill="none">
              <rect x="20" y="20" width="80" height="95" rx="10" fill="#0F172A" stroke="#CBD5E1" strokeWidth="4" />
              <rect x="30" y="35" width="60" height="14" rx="4" fill="#1E293B" />
              <circle cx="80" cy="42" r="3" fill="#0088E0" />
              <rect x="30" y="60" width="60" height="14" rx="4" fill="#1E293B" />
              <circle cx="80" cy="67" r="3" fill="#0088E0" />
              <rect x="30" y="85" width="60" height="14" rx="4" fill="#1E293B" />
              <circle cx="80" cy="92" r="3" fill="#60A5FA" />
            </svg>
          </div>
        </div>
      );

    case 6:
      // Level 6: Look hireable — Magnifying Glass, Verified Portfolio, Signed Offer
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Magnifying Glass */}
          <div className="prop absolute right-[18vw] top-[22vh]">
            <svg width="160" height="160" viewBox="0 0 140 140" fill="none">
              <circle cx="55" cy="55" r="42" fill="#F0F9FF" stroke="#0F172A" strokeWidth="6" />
              <line x1="86" y1="86" x2="128" y2="128" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <line x1="86" y1="86" x2="128" y2="128" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
              <circle cx="48" cy="48" r="8" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Prop 2: 96% Profile Strength Meter */}
          <div className="prop absolute right-[28vw] top-[50vh]">
            <svg width="140" height="140" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="48" stroke="#E2E8F0" strokeWidth="10" />
              <circle cx="60" cy="60" r="48" stroke="#0088E0" strokeWidth="10" strokeDasharray="301" strokeDashoffset="24" strokeLinecap="round" />
              <text x="60" y="66" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#0F172A">96%</text>
            </svg>
          </div>

          {/* Prop 3: Signed Offer Letter Parchment */}
          <div className="prop absolute right-[9vw] top-[52vh]">
            <svg width="130" height="140" viewBox="0 0 110 120" fill="none">
              <rect x="15" y="15" width="80" height="95" rx="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <line x1="28" y1="35" x2="82" y2="35" stroke="#CBD5E1" strokeWidth="3" />
              <line x1="28" y1="50" x2="82" y2="50" stroke="#CBD5E1" strokeWidth="3" />
              <line x1="28" y1="65" x2="65" y2="65" stroke="#CBD5E1" strokeWidth="3" />
              <path d="M 28 85 Q 45 78 60 85 T 80 82" stroke="#0088E0" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
      );

    case 7:
      // Level 7: Interview Prep — Studio Spotlight, Stopwatch, Vocal Waves
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Countdown Stopwatch */}
          <div className="prop absolute right-[18vw] top-[20vh]">
            <svg width="160" height="180" viewBox="0 0 140 160" fill="none">
              <circle cx="70" cy="90" r="54" fill="#FFFFFF" stroke="#0F172A" strokeWidth="6" />
              <rect x="64" y="16" width="12" height="20" rx="3" fill="#0088E0" stroke="#0F172A" strokeWidth="4" />
              <circle cx="70" cy="90" r="6" fill="#0F172A" />
              <line x1="70" y1="90" x2="70" y2="56" stroke="#0088E0" strokeWidth="4" strokeLinecap="round" />
              <line x1="70" y1="90" x2="94" y2="90" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          {/* Prop 2: Audio Speech Waveform */}
          <div className="prop absolute right-[28vw] top-[48vh]">
            <svg width="150" height="90" viewBox="0 0 130 80" fill="none">
              <line x1="15" y1="40" x2="15" y2="40" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
              <line x1="35" y1="25" x2="35" y2="55" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
              <line x1="55" y1="10" x2="55" y2="70" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
              <line x1="75" y1="18" x2="75" y2="62" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
              <line x1="95" y1="28" x2="95" y2="52" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
              <line x1="115" y1="38" x2="115" y2="42" stroke="#0088E0" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

          {/* Prop 3: 1:1 Scoring Rubric */}
          <div className="prop absolute right-[9vw] top-[50vh]">
            <svg width="130" height="140" viewBox="0 0 110 120" fill="none">
              <rect x="15" y="15" width="80" height="95" rx="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <text x="55" y="42" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#0088E0">RUBRIC SCORE</text>
              <text x="55" y="72" textAnchor="middle" fontWeight="bold" fontSize="24" fill="#0F172A">98%</text>
            </svg>
          </div>
        </div>
      );

    case 8:
      // Level 8: Opportunity Ecosystem — Anti-Scam Radar Shield, Briefcase
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Fake-Job Radar Shield */}
          <div className="prop absolute right-[18vw] top-[20vh]">
            <svg width="170" height="170" viewBox="0 0 150 150" fill="none">
              <path d="M 75 15 L 125 35 L 125 90 Q 75 135 75 135 Q 25 90 25 90 L 25 35 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
              <circle cx="75" cy="70" r="30" stroke="#0088E0" strokeWidth="3" fill="none" strokeDasharray="4 4" />
              <line x1="75" y1="70" x2="95" y2="50" stroke="#0088E0" strokeWidth="3" />
              <circle cx="95" cy="50" r="4" fill="#0088E0" />
            </svg>
          </div>

          {/* Prop 2: Verified Opportunity Briefcase */}
          <div className="prop absolute right-[28vw] top-[50vh]">
            <svg width="150" height="120" viewBox="0 0 130 100" fill="none">
              <rect x="15" y="30" width="100" height="60" rx="10" fill="#0F172A" stroke="#0088E0" strokeWidth="4" />
              <path d="M 45 30 L 45 18 C 45 12, 85 12, 85 18 L 85 30" stroke="#FFFFFF" strokeWidth="4" fill="none" />
              <circle cx="65" cy="55" r="7" fill="#0088E0" />
            </svg>
          </div>

          {/* Prop 3: Grant & Scholarship Seal */}
          <div className="prop absolute right-[9vw] top-[52vh]">
            <svg width="130" height="150" viewBox="0 0 110 130" fill="none">
              <circle cx="55" cy="45" r="30" fill="#0088E0" stroke="#0F172A" strokeWidth="4" />
              <polygon points="40,70 30,120 55,105 80,120 70,70" fill="#0F172A" />
              <circle cx="55" cy="45" r="12" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      );

    case 9:
      // Level 9: Alumni Connect — Global Network Globe, Paper Plane, Mentor Badge
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Connected Alumni Globe */}
          <div className="prop absolute right-[18vw] top-[20vh]">
            <svg width="170" height="170" viewBox="0 0 150 150" fill="none">
              <circle cx="75" cy="75" r="62" fill="#F0F9FF" stroke="#0F172A" strokeWidth="5" />
              <ellipse cx="75" cy="75" rx="62" ry="24" stroke="#0088E0" strokeWidth="2.5" fill="none" />
              <ellipse cx="75" cy="75" rx="24" ry="62" stroke="#0088E0" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="65" r="5" fill="#0088E0" />
              <circle cx="95" cy="55" r="5" fill="#0088E0" />
              <circle cx="75" cy="98" r="5" fill="#0088E0" />
            </svg>
          </div>

          {/* Prop 2: Intro Request Paper Plane */}
          <div className="prop absolute right-[28vw] top-[48vh]">
            <svg width="150" height="120" viewBox="0 0 130 100" fill="none">
              <polygon points="15,45 115,20 65,85" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <polygon points="65,85 75,55 115,20" fill="#0088E0" stroke="#0F172A" strokeWidth="3" />
            </svg>
          </div>

          {/* Prop 3: Handshake Guild Badge */}
          <div className="prop absolute right-[9vw] top-[50vh]">
            <svg width="130" height="140" viewBox="0 0 110 120" fill="none">
              <circle cx="55" cy="55" r="42" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <text x="55" y="62" textAnchor="middle" fontSize="28">🤝</text>
            </svg>
          </div>
        </div>
      );

    case 10:
      // Level 10: Champion — Grand Victory Trophy with Teklozy Wing Crest, Laurel Crown
      return (
        <div className="relative w-full h-full pointer-events-none">
          {/* Prop 1: Massive Champion Trophy */}
          <div className="prop absolute right-[18vw] top-[14vh]">
            <svg width="220" height="240" viewBox="0 0 180 200" fill="none">
              <path d="M 50 30 H 130 V 90 C 130 125, 115 140, 90 145 C 65 140, 50 125, 50 90 Z" fill="#0088E0" stroke="#0F172A" strokeWidth="6" />
              <path d="M 50 45 C 20 45, 20 85, 50 85" stroke="#0F172A" strokeWidth="6" fill="none" />
              <path d="M 130 45 C 160 45, 160 85, 130 85" stroke="#0F172A" strokeWidth="6" fill="none" />
              <rect x="80" y="145" width="20" height="25" fill="#0F172A" stroke="#0F172A" strokeWidth="5" />
              <rect x="55" y="170" width="70" height="18" rx="4" fill="#0F172A" />
              <polygon points="90,60 95,75 110,75 98,85 102,100 90,90 78,100 82,85 70,75 85,75" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Prop 2: Laurel Wreath */}
          <div className="prop absolute right-[32vw] top-[46vh]">
            <svg width="150" height="150" viewBox="0 0 130 130" fill="none">
              <path d="M 35 95 C 15 70, 20 35, 45 25" stroke="#0088E0" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 95 95 C 115 70, 110 35, 85 25" stroke="#0088E0" strokeWidth="5" fill="none" strokeLinecap="round" />
              <circle cx="65" cy="105" r="6" fill="#0088E0" />
            </svg>
          </div>

          {/* Prop 3: Sunburst Rays */}
          <div className="prop absolute right-[9vw] top-[50vh]">
            <svg width="150" height="150" viewBox="0 0 130 130" fill="none">
              <g transform="translate(65,65)">
                <line x1="0" y1="-45" x2="0" y2="-20" stroke="#0088E0" strokeWidth="4" strokeLinecap="round" />
                <line x1="0" y1="45" x2="0" y2="20" stroke="#0088E0" strokeWidth="4" strokeLinecap="round" />
                <line x1="-45" y1="0" x2="-20" y2="0" stroke="#0088E0" strokeWidth="4" strokeLinecap="round" />
                <line x1="45" y1="0" x2="20" y2="0" stroke="#0088E0" strokeWidth="4" strokeLinecap="round" />
                <circle cx="0" cy="0" r="10" fill="#0088E0" />
              </g>
            </svg>
          </div>
        </div>
      );

    default:
      return null;
  }
};
