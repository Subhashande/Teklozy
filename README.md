# Teklozy — Gamified Career Ecosystem Landing Page

A scroll-driven, gamified landing page built with React 18, TypeScript, Tailwind CSS, Lenis, and GSAP. It guides aspiring software engineers through a 10-stage milestone path from zero experience to champion career placement.

---

## 1. Landing Page Architecture

The project follows a component-oriented architecture with clean separation of layout, page sections, journey milestones, reusable UI primitives, hooks, and design tokens:

```text
src/
├── App.tsx                          # Root orchestrator: smooth scroll, section flow, modal state
├── main.jsx                         # Application entry point
│
├── components/
│   ├── layout/
│   │   └── Footer.tsx               # 3-column statement footer with faint watermark, company & socials
│   │
│   ├── sections/
│   │   ├── Navbar.tsx               # Floating dual-card navigation with dropdown menus
│   │   ├── HeroSection.tsx          # Connected circuit hub with 9 interactive feature nodes
│   │   └── JourneySection.tsx       # 10-level scroll journey orchestrator & outro celebration
│   │
│   ├── journey/
│   │   ├── JourneyPath.tsx          # Continuous SVG river path with GSAP ScrollTrigger stroke drawing
│   │   ├── LevelCard.tsx            # Alternating milestone row with illustrations & lab drawer
│   │   ├── LevelToys.tsx            # 10 interactive hands-on simulators awarding real-time XP
│   │   └── LevelProps.tsx           # Isometric SVG props for each milestone level
│   │
│   └── ui/
│       ├── BrandLogo.tsx            # Official Teklozy shield emblem & wordmark
│       └── ClaimSpotModal.tsx       # Confetti celebration modal with email reservation
│
├── hooks/
│   └── useTeklozyJourney.ts         # Centralized Lenis smooth scroll ticker & navigation helper
│
├── data/
│   └── journeyConfig.ts             # Single source of truth for the 10 milestone levels
│
├── types/
│   └── journey.ts                   # Domain TypeScript interfaces (Level, FeatureNode)
│
├── assets/
│   ├── images/                      # Emblem and brand raster images
│   ├── levels-img/                  # High-resolution 3D/vector illustrations for stages 1–10
│   ├── mascot/                      # Telo mascot companion assets
│   └── svg/                         # Raw vector definitions
│
└── styles/
    ├── index.css                    # Global entry stylesheet
    ├── teklozy-tokens.css           # Neo-brutalist tactile shadows, colors, and typography tokens
    └── mindmarket-green-line.css    # Responsive scaling and positioning tokens for path ribbons
```

---

## 2. Key Systems & Workflows

### Journey Configuration (`src/data/journeyConfig.ts`)
- Serves as the **single source of truth** for all 10 stages (`LEVELS`).
- Each level defines its stage badge, headline, overview copy, 3 key features, hex accent, mascot dialogue bubble, and associated simulator key (`LevelToy`).
- Includes diagnostic career profiles and security testing sample data.

### Animation System
- **Smooth Virtual Scrolling**: Managed via [Lenis](https://github.com/darkroomengineering/lenis) configured with a duration of 1.2s and smooth wheel dampening.
- **GSAP Synchronization**: Lenis updates are piped directly to `ScrollTrigger.update`, with `gsap.ticker` driving Lenis requestAnimationFrame calls (`lenis.raf(time * 1000)`).
- **Scroll-Drawn Stroke**: [`JourneyPath.tsx`](src/components/journey/JourneyPath.tsx) computes the total length of the continuous SVG path, setting `strokeDasharray` and scrubbing `strokeDashoffset` from 100% to 0% as the user traverses the spotlight section. Includes responsive window resize recalculation and clean lifecycle teardown.

---

## 3. Scripts & Validation

```bash
# Install dependencies
npm install

# Start local development server (with HMR)
npm run dev

# Run automated unit & regression test suite
npm test

# Run ESLint validation
npm run lint

# Compile TypeScript and bundle production assets
npm run build

# Preview the production build locally
npm run preview
```
