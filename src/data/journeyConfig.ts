import { Level } from '../types/journey';

export type { Level };

export const TUNABLES = {
  viewBoxWidth: 12000,
  viewBoxHeight: 800,
  levelWidthVw: 100, // 100vw per level
  scrub: 0.8,
  endScrollMultiplier: 0.9, // scroll distance = worldWidth * 0.9
  cameraOffsetRatio: 0.35, // Telo sits at ~35% of the screen
  parallaxDepthFar: 0.35,
  parallaxDepthMid: 0.75,
  lookAheadPx: 14,
  runVelocityThreshold: 30,
};

// 10 Steps specified by user:
export const LEVELS: Level[] = [
  {
    id: 1,
    key: 'awareness',
    stageName: 'Stage 01 • Career Awareness',
    title: 'Discover your path.',
    highlightWord: 'your path.',
    line: 'Explore the top tech careers, understand what excites you, test your strengths and choose a direction that fits you.',
    features: ['Top 5 career preview', 'Aptitude diagnostic', 'Pick your class'],
    chips: [
      { icon: 'Compass', label: 'Career explorer' },
      { icon: 'BarChart2', label: 'Aptitude check' },
      { icon: 'Target', label: 'Choose your path' },
    ],
    ctaText: 'Explore Careers',
    accent: '#0088E0',
    bubble: "Don't know where to start? Perfect. Let's find your fit!",
    toy: 'career-picker',
  },
  {
    id: 2,
    key: 'learning-practice',
    stageName: 'Stage 02 • Learning & Practice',
    title: 'Learn, practice, streak.',
    highlightWord: 'streak.',
    line: 'Learn through curated resources, practice with real exercises, and stay consistent with daily challenges.',
    features: ['Curated YouTube tracks', 'Competition game arena', 'GitHub & LeetCode streak sync'],
    chips: [
      { icon: 'Play', label: 'Learning resources' },
      { icon: 'Code2', label: 'Coding challenges' },
      { icon: 'Flame', label: 'XP streaks' },
    ],
    ctaText: 'Start Learning',
    accent: '#2563EB',
    bubble: 'Day 12 streak locked in! Never break the chain.',
    toy: 'streak-calendar',
  },
  {
    id: 3,
    key: 'advanced-learning',
    stageName: 'Stage 03 • Complete Ecosystem',
    title: 'Go deeper.',
    highlightWord: 'deeper.',
    line: 'Unlock advanced architecture, system design, and specialized workflows inside one connected learning ecosystem.',
    features: ['Advanced specialization', 'One complete ecosystem', 'Interactive skill tree'],
    chips: [
      { icon: 'Layers', label: 'Advanced specialization' },
      { icon: 'Globe', label: 'Complete ecosystem' },
      { icon: 'GitBranch', label: 'Interactive skill tree' },
    ],
    ctaText: 'Explore Ecosystem',
    accent: '#0077CC',
    bubble: 'Skill tree unlocked. Advanced concepts incoming!',
    toy: 'skill-tree',
  },
  {
    id: 4,
    key: 'real-world',
    stageName: 'Stage 04 • Real-World Startup Experience',
    title: 'Build like a startup.',
    highlightWord: 'startup.',
    line: 'Take your own idea and build it like a venture-backed startup. Learn industry standards, SDLC cycles, and Jira operations.',
    features: ['Your own idea', 'Complete SDLC lifecycle', 'Jira ticket operations'],
    chips: [
      { icon: 'Lightbulb', label: 'Your own idea' },
      { icon: 'RefreshCw', label: 'Full SDLC lifecycle' },
      { icon: 'CheckSquare', label: 'Jira operations' },
    ],
    ctaText: 'Build Startup Project',
    accent: '#0088E0',
    bubble: 'Ticket TK-14 assigned. Time to ship real code!',
    toy: 'kanban-drag',
  },
  {
    id: 5,
    key: 'scaling-deployment',
    stageName: 'Stage 05 • Scaling & Deployment',
    title: 'Ship it. Scale it.',
    highlightWord: 'Scale it.',
    line: 'Deploy to cloud production, automate test coverage with autonomous AI testing agents, and grow the application.',
    features: ['One-click production deploy', 'Autonomous AI testing agent', 'Startup scale metrics'],
    chips: [
      { icon: 'Cloud', label: 'One-click deploy' },
      { icon: 'Bot', label: 'Autonomous AI testing' },
      { icon: 'TrendingUp', label: 'Startup scale metrics' },
    ],
    ctaText: 'View Pipeline',
    accent: '#1D4ED8',
    bubble: 'All automated tests: 48/48 green! Production live.',
    toy: 'deploy-pipeline',
  },
  {
    id: 6,
    key: 'professional-identity',
    stageName: 'Stage 06 • Professional Identity',
    title: 'Look hireable.',
    highlightWord: 'hireable.',
    line: 'Turn your shipped proof into an ATS-ready resume, compelling cover letter, optimized LinkedIn, GitHub, and portfolio.',
    features: ['ATS-tailored resume', 'Verified portfolio link', 'GitHub & LinkedIn branding'],
    chips: [
      { icon: 'FileText', label: 'ATS-tailored resume' },
      { icon: 'ExternalLink', label: 'Verified portfolio' },
      { icon: 'Share2', label: 'LinkedIn branding' },
    ],
    ctaText: 'Optimize Profile',
    accent: '#0088E0',
    bubble: 'Profile strength reached 96%. Recruiters will notice!',
    toy: 'profile-meter',
  },
  {
    id: 7,
    key: 'interview-prep',
    stageName: 'Stage 07 • Interview Preparation',
    title: 'Practice the pressure.',
    highlightWord: 'pressure.',
    line: 'Master technical system design and behavioral rounds with live expert masterclasses and realistic 1:1 mock interview sessions.',
    features: ['Live expert sessions', '1:1 mock interviews', 'Instant scoring rubric'],
    chips: [
      { icon: 'Video', label: 'Live expert sessions' },
      { icon: 'UserCheck', label: '1:1 mock interviews' },
      { icon: 'Award', label: 'Instant score rubric' },
    ],
    ctaText: 'Book Mock Interview',
    accent: '#2563EB',
    bubble: 'Deep breath. Trust your practice, you got this.',
    toy: 'mock-call',
  },
  {
    id: 8,
    key: 'opportunities',
    stageName: 'Stage 08 • Opportunity Ecosystem',
    title: 'Real jobs. Zero fakes.',
    highlightWord: 'Zero fakes.',
    line: 'Automated fake job detection on your behalf. Unlock verified jobs, freelancing bounties, scholarships, hackathons, and certifications.',
    features: ['In-house fake job shield', 'Direct jobs & freelancing', 'Scholarships, hackathons & certs'],
    chips: [
      { icon: 'ShieldCheck', label: 'Fake job shield' },
      { icon: 'Briefcase', label: 'Direct verified jobs' },
      { icon: 'Trophy', label: 'Scholarships & hackathons' },
    ],
    ctaText: 'Scan Verified Jobs',
    accent: '#0077CC',
    bubble: 'Suspicious job alert! Scam prevented.',
    toy: 'scam-scanner',
  },
  {
    id: 9,
    key: 'industry-immersion',
    stageName: 'Stage 09 • Industry Immersion',
    title: 'Step into the real world.',
    highlightWord: 'real world.',
    line: 'Experience how the industry actually works. Visit companies, collaborate on real-world challenges, and learn directly from professionals who do the work every day.',
    features: [
      'Industry visits & behind the scenes',
      'Real-world project experience',
      '1:1 sessions with industry experts',
    ],
    chips: [
      { icon: 'Briefcase', label: 'Industry visits & BTS' },
      { icon: 'Layers', label: 'Real-world projects' },
      { icon: 'UserCheck', label: '1:1 sessions with experts' },
    ],
    ctaText: 'Explore the Industry',
    accent: '#1D4ED8',
    bubble: 'Step into real engineering floors. Experience the day-to-day.',
    toy: 'industry-pass',
  },
  {
    id: 10,
    key: 'career-legacy',
    stageName: 'Stage 10 • Career Legacy',
    title: 'Your next chapter starts here.',
    highlightWord: 'starts here.',
    line: 'Celebrate how far you’ve come, learn from people who made it, and become part of a community that keeps opening doors long after the journey ends.',
    features: [
      'Alumni network & success stories',
      '1:1 alumni mentorship',
      'Give back and guide the next generation',
    ],
    chips: [
      { icon: 'Users', label: 'Alumni network & stories' },
      { icon: 'Sparkles', label: '1:1 alumni mentorship' },
      { icon: 'Medal', label: 'Guide the next generation' },
    ],
    ctaText: 'Join the Alumni Network',
    accent: '#0088E0',
    bubble: 'Welcome to the Teklozy alumni family! Your legacy begins now.',
    toy: 'trophy',
  },
];

// Continuous Serpentine River Path in a 12000 x 800 viewBox (1200 per level)
export const PATH_D = (() => {
  let d = 'M 0 520';
  for (let i = 0; i < 10; i++) {
    const x = i * 1200;
    const up = i % 2 === 0;
    d += ` C ${x + 300} ${up ? 260 : 700}, ${x + 700} ${up ? 700 : 260}, ${x + 1200} 520`;
  }
  return d;
})();

export const CAREER_OPTIONS = [
  { id: 'frontend', name: 'Frontend Engineer', color: '#0088E0', icon: '⚡', role: 'UI Precision & Systems' },
  { id: 'backend', name: 'Backend Engineer', color: '#2563EB', icon: '🛡️', role: 'APIs, Databases & Scale' },
  { id: 'ai', name: 'AI Engineer', color: '#1D4ED8', icon: '🧠', role: 'LLMs, Agents & RAG' },
  { id: 'fullstack', name: 'Full-Stack Dev', color: '#0077CC', icon: '🚀', role: 'End-to-End Product Shipper' },
  { id: 'product', name: 'Product Engineer', color: '#0284C7', icon: '🎯', role: 'User Empathy & Analytics' },
];

export const FAKE_JOBS_SAMPLE = [
  { id: 'j1', company: 'CloudScale Labs', role: 'Jr. Frontend Developer', pay: '$85k - $105k', status: 'verified', note: 'Verified company domain & seed fund backing' },
  { id: 'j2', company: 'Global Remote HR Corp', role: 'Data Assistant (Pay $150 Upfront Tool Fee)', pay: '$95/hr', status: 'fake', note: 'FLAGGED SCAM: Requests upfront crypto or wire fee' },
  { id: 'j3', company: 'Nexus Health Systems', role: 'Full-Stack Software Fellow', pay: '$75k - $95k', status: 'verified', note: 'Verified campus partner hiring entry engineers' },
];

export const ALUMNI_PINS = [
  { id: 'a1', name: 'Priya S.', role: 'Frontend Engineer @ Razorpay', time: 'Hired in 3 mos', x: 22, y: 38, avatar: '👩‍💻', tip: 'Building Level 04 startup project was 100% of my interview conversation.' },
  { id: 'a2', name: 'Marcus K.', role: 'Backend Dev @ Stripe', time: 'Hired in 4.5 mos', x: 48, y: 55, avatar: '👨‍💻', tip: 'The Level 05 testing pipeline proved I write clean production code.' },
  { id: 'a3', name: 'Aiden T.', role: 'AI Agent Engineer @ Anthropic partner', time: 'Hired in 5 mos', x: 74, y: 32, avatar: '🧑‍🚀', tip: '1-on-1 mocks at Level 07 made the actual final round feel easy.' },
  { id: 'a4', name: 'Sarah L.', role: 'Full-Stack Builder @ YC W24', time: 'Hired in 2 mos', x: 62, y: 72, avatar: '👩‍🔬', tip: 'Streak discipline at Level 02 completely changed my focus.' },
];


