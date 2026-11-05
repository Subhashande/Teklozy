/**
 * =======================================================================
 * TEKLOZY TEAM DATA ARCHITECTURE
 * =======================================================================
 * Single Source of Truth for Teklozy's Team Roster, Core Values, and Metrics.
 * 
 * MAINTAINABILITY GUIDELINES:
 * - To add a new team member: Append a new `TeamMember` object to `TEAM_MEMBERS`.
 *   The grid, filter counts, and responsive layout dynamically adapt without
 *   requiring changes to component code.
 * - Categories update automatically based on member data.
 * =======================================================================
 */

export type TeamCategory =
  | 'All'
  | 'Founders'
  | 'Product'
  | 'Engineering'
  | 'Design'
  | 'Content'
  | 'Growth';

export interface TeamSocials {
  linkedin?: string;
  github?: string;
  twitter?: string;
  dribbble?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  categoryLabel: string;
  bio: string;
  photoUrl: string;
  socials: TeamSocials;
  rankLevel?: number;
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  icon: 'rocket' | 'box' | 'users' | 'target';
}

export interface TeamMetric {
  id: string;
  icon: 'users' | 'heart' | 'globe';
  value: string;
  label: string;
}

/**
 * Add only confirmed team member profiles here.
 */
import ctoPhoto from '../assets/team/cto-gagan.webp';
import headAiPhoto from '../assets/team/head-of-ai-harsha.webp';
import pranayPhoto from '../assets/team/ai-product-manager-pranay.webp';
import subashPhoto from '../assets/team/fde-subash.webp';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'gagan-dileep-vemula',
    name: 'Gagan Dileep Vemula',
    role: 'CTO',
    category: 'Engineering',
    categoryLabel: 'Technology',
    bio: 'Leading Teklozy’s technology and engineering direction.',
    photoUrl: ctoPhoto,
    socials: {
      linkedin: 'https://www.linkedin.com/in/vemulagagandileep',
      github: 'https://github.com/Gagan78119',
    },
    rankLevel: 1,
  },
  {
    id: 'harsha-vardhan-dumpa',
    name: 'Harsha Vardhan Dumpa',
    role: 'Head of AI',
    category: 'Engineering',
    categoryLabel: 'Artificial Intelligence',
    bio: 'Driving AI initiatives and intelligent product experiences at Teklozy.',
    photoUrl: headAiPhoto,
    socials: {
      linkedin: 'https://www.linkedin.com/in/harsha-vardhan-dumpa-data-analyst-python-backend-developer',
      github: 'https://github.com/arshavardhan',
    },
    rankLevel: 2,
  },
  {
    id: 'tangirala-venkata-raghavendra-pranay',
    name: 'Tangirala Venkata Raghavendra Pranay',
    role: 'AI Product Manager',
    category: 'Product',
    categoryLabel: 'Product',
    bio: 'Connecting AI capabilities with useful, student-focused product experiences.',
    photoUrl: pranayPhoto,
    socials: {
      linkedin: 'https://www.linkedin.com/in/tangirala-venkata-raghavendra-pranay-796118301/',
      github: 'https://github.com/TvrPranay',
    },
    rankLevel: 3,
  },
  {
    id: 'subash',
    name: 'Ande Lakshmi Subhash',
    role: 'Forward Deployed Engineer',
    category: 'Engineering',
    categoryLabel: 'Engineering',
    bio: 'Turning real-world challenges into practical, production-ready solutions with users and teams.' ,
    photoUrl: subashPhoto,
    socials: {
      linkedin: 'https://www.linkedin.com/in/lakshmisubhash-ande',
      github: 'https://github.com/Subhashande',
    },
    rankLevel: 4,
  },
];


/**
 * Reserved for future team directory filters.
 */
export const TEAM_CATEGORIES: TeamCategory[] = [];


/**
 * Core Values defining Teklozy's culture and student mission.
 */
export const TEAM_VALUES: ValuePillar[] = [
  {
    id: 'student-first',
    title: 'Student First',
    description: 'We start with student problems and build solutions that truly help.',
    icon: 'rocket',
  },
  {
    id: 'action-over-talk',
    title: 'Action Over Talk',
    description: 'We move fast, ship early and keep improving.',
    icon: 'box',
  },
  {
    id: 'open-collaboration',
    title: 'Open Collaboration',
    description: 'We believe in diverse perspectives and learning together.',
    icon: 'users',
  },
  {
    id: 'real-impact',
    title: 'Real Impact',
    description: 'Everything we do is aimed at creating real opportunities for students.',
    icon: 'target',
  },
];

/**
 * Descriptive team principles (not numeric performance claims).
 */
export const TEAM_METRICS: TeamMetric[] = [
  { id: 'mission', icon: 'heart', value: 'Student-first', label: 'Our design focus' },
  { id: 'approach', icon: 'users', value: 'Collaborative', label: 'How we work' },
  { id: 'purpose', icon: 'globe', value: 'Career-led', label: 'Our platform goal' },
];

