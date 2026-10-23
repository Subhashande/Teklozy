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
    line: "Don't know the top 5 tech careers? Explore each role, test your natural aptitude, and choose your career class.",
    features: ['Top 5 career preview', 'Aptitude diagnostic', 'Pick your class'],
    accent: '#0088E0',
    bubble: "Don't know where to start? Perfect. Let's find your fit!",
    toy: 'career-picker',
  },
  {
    id: 2,
    key: 'learning-practice',
    stageName: 'Stage 02 • Learning & Practice',
    title: 'Learn, practice, streak.',
    line: 'Master concepts with curated YouTube sources, compete in coding battles, and sync your GitHub and LeetCode streaks.',
    features: ['Curated YouTube tracks', 'Competition game arena', 'GitHub & LeetCode streak sync'],
    accent: '#2563EB',
    bubble: 'Day 12 streak locked in! Never break the chain.',
    toy: 'streak-calendar',
  },
  {
    id: 3,
    key: 'advanced-learning',
    stageName: 'Stage 03 • Complete Ecosystem',
    title: 'Go deeper.',
    line: 'Unlock advanced architecture, system design, and specialized workflows inside one connected learning ecosystem.',
    features: ['Advanced specialization', 'One complete ecosystem', 'Interactive skill tree'],
    accent: '#0077CC',
    bubble: 'Skill tree unlocked. Advanced concepts incoming!',
    toy: 'skill-tree',
  },
  {
    id: 4,
    key: 'real-world',
    stageName: 'Stage 04 • Real-World Startup Experience',
    title: 'Build like a startup.',
    line: 'Take your own idea and build it like a venture-backed startup. Learn industry standards, SDLC cycles, and Jira operations.',
    features: ['Your own idea', 'Complete SDLC lifecycle', 'Jira ticket operations'],
    accent: '#0088E0',
    bubble: 'Ticket TK-14 assigned. Time to ship real code!',
    toy: 'kanban-drag',
  },
  {
    id: 5,
    key: 'scaling-deployment',
    stageName: 'Stage 05 • Scaling & Deployment',
    title: 'Ship it. Scale it.',
    line: 'Deploy to cloud production, automate test coverage with autonomous AI testing agents, and grow the application.',
    features: ['One-click production deploy', 'Autonomous AI testing agent', 'Startup scale metrics'],
    accent: '#1D4ED8',
    bubble: 'All automated tests: 48/48 green! Production live.',
    toy: 'deploy-pipeline',
  },
  {
    id: 6,
    key: 'professional-identity',
    stageName: 'Stage 06 • Professional Identity',
    title: 'Look hireable.',
    line: 'Turn your shipped proof into an ATS-ready resume, compelling cover letter, optimized LinkedIn, GitHub, and portfolio.',
    features: ['ATS-tailored resume', 'Verified portfolio link', 'GitHub & LinkedIn branding'],
    accent: '#0088E0',
    bubble: 'Profile strength reached 96%. Recruiters will notice!',
    toy: 'profile-meter',
  },
  {
    id: 7,
    key: 'interview-prep',
    stageName: 'Stage 07 • Interview Preparation',
    title: 'Practice the pressure.',
    line: 'Master technical system design and behavioral rounds with live expert masterclasses and realistic 1:1 mock interview sessions.',
    features: ['Live expert sessions', '1:1 mock interviews', 'Instant scoring rubric'],
    accent: '#2563EB',
    bubble: 'Deep breath. Trust your practice, you got this.',
    toy: 'mock-call',
  },
  {
    id: 8,
    key: 'opportunities',
    stageName: 'Stage 08 • Opportunity Ecosystem',
    title: 'Real jobs. Zero fakes.',
    line: 'Automated fake job detection on your behalf. Unlock verified jobs, freelancing bounties, scholarships, hackathons, and certifications.',
    features: ['In-house fake job shield', 'Direct jobs & freelancing', 'Scholarships, hackathons & certs'],
    accent: '#0077CC',
    bubble: 'Suspicious job alert! Scam prevented.',
    toy: 'scam-scanner',
  },
  {
    id: 9,
    key: 'alumni-connect',
    stageName: 'Stage 09 • Alumni Connect',
    title: 'Connect with legends.',
    line: 'Reach out to alumni who have already made the journey. Exchange insights, get direct coffee chats, and receive referral guidance.',
    features: ['Alumni global guild', 'Direct mentor coffee chats', 'Offer negotiation circle'],
    accent: '#1D4ED8',
    bubble: 'Alumni Priya got hired in 3 months. Say hello!',
    toy: 'alumni-map',
  },
  {
    id: 10,
    key: 'champion',
    stageName: 'Stage 10 • Champion',
    title: 'Champion.',
    line: 'You started knowing nothing. Look at what you built. Claim your spot, celebrate your offer, and give back as a mentor.',
    features: ['Job offer claimed', 'Alumni mentor badge', 'Career lifetime access'],
    accent: '#0088E0',
    bubble: 'WE MADE IT! YOU ARE OFFICIALLY A CHAMPION!',
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

// Tailored Community Bench Questions for each of the 10 levels
export const COMMUNITY_QUESTIONS: Record<number, Array<{ id: string; title: string; votes: number; replies: number; author: string }>> = {
  1: [
    { id: 'q1', title: 'How do I decide between Frontend and Full-Stack if I love UI visual polish?', votes: 42, replies: 9, author: 'Alex_Dev' },
    { id: 'q2', title: 'What are the highest demand entry-level roles right now in 2026?', votes: 31, replies: 14, author: 'CareerCurious' },
  ],
  2: [
    { id: 'q3', title: 'Should I prioritize LeetCode or building personal projects during month 1?', votes: 76, replies: 23, author: 'StreakMaster' },
    { id: 'q4', title: 'Best YouTube channels for deep JavaScript and React without fluff?', votes: 58, replies: 17, author: 'CodeBattler' },
  ],
  3: [
    { id: 'q5', title: 'When does deep distributed systems architecture matter for junior engineers?', votes: 64, replies: 18, author: 'ArchNinja' },
    { id: 'q6', title: 'Which vector database and retrieval framework should I master for AI engineering?', votes: 53, replies: 12, author: 'NeuralDave' },
  ],
  4: [
    { id: 'q7', title: 'How to structure Jira tickets and branch naming conventions like a real startup?', votes: 89, replies: 31, author: 'ShipDaily' },
    { id: 'q8', title: 'How do I pick an idea that impresses technical interviewers instead of another clone?', votes: 72, replies: 24, author: 'Founder01' },
  ],
  5: [
    { id: 'q9', title: 'How do autonomous AI testing agents integrate with GitHub Actions CI?', votes: 95, replies: 40, author: 'DevOpsDan' },
    { id: 'q10', title: 'What are the essential checks before deploying an API to live production?', votes: 61, replies: 19, author: 'ScaleFast' },
  ],
  6: [
    { id: 'q11', title: 'What ATS resume formatting rules actually pass modern enterprise screening?', votes: 124, replies: 52, author: 'ResumeHunter' },
    { id: 'q12', title: 'How to structure your GitHub profile README so hiring managers test the live link?', votes: 83, replies: 27, author: 'PixelCraft' },
  ],
  7: [
    { id: 'q13', title: 'How to handle answering behavioral failure questions using the STAR framework?', votes: 110, replies: 44, author: 'MockPrep99' },
    { id: 'q14', title: 'Best way to whiteboard a system design question under 45 minutes?', votes: 88, replies: 26, author: 'AlgoPro' },
  ],
  8: [
    { id: 'q15', title: 'What are the biggest red flags for fake remote developer postings and paid training scams?', votes: 142, replies: 67, author: 'SafeCareers' },
    { id: 'q16', title: 'Are developer bounties and hackathon wins considered legitimate experience?', votes: 79, replies: 21, author: 'FreelanceAce' },
  ],
  9: [
    { id: 'q17', title: 'How to respectfully ask an alumni engineer for a 15-minute coffee chat or referral?', votes: 133, replies: 38, author: 'GuildSeeker' },
    { id: 'q18', title: 'What is the average timeline from alumni introduction to first interview screen?', votes: 91, replies: 29, author: 'PriyaFan' },
  ],
  10: [
    { id: 'q19', title: 'How do alumni volunteer to mentor the next incoming cohort on Teklozy?', votes: 204, replies: 88, author: 'ChampionTelo' },
    { id: 'q20', title: 'First 90 days on the job checklist: how to make an immediate positive impact?', votes: 167, replies: 43, author: 'TeklozyAlum' },
  ],
};
