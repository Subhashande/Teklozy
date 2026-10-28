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
 * 6 Core Team Members matching Teklozy's live reference design.
 * Easily extensible for future additions.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ranjith',
    name: 'ranjith',
    role: 'Founder & CEO',
    category: 'Founders',
    categoryLabel: 'Founder',
    bio: 'Product, strategy and making Teklozy a reality.',
    photoUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    rankLevel: 10,
    socials: {
      linkedin: 'https://linkedin.com/in/gagan-dileep',
      github: 'https://github.com/teklozy',
      twitter: 'https://twitter.com/teklozy',
    },
  },
  {
    id: 'aishwarya-rao',
    name: 'Aishwarya Rao',
    role: 'Product Manager',
    category: 'Product',
    categoryLabel: 'Product',
    bio: 'Turns student problems into simple and effective solutions.',
    photoUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rankLevel: 9,
    socials: {
      linkedin: 'https://linkedin.com/company/teklozy',
      twitter: 'https://twitter.com/teklozy',
    },
  },
  {
    id: 'rohit-varma',
    name: 'Rohit Varma',
    role: 'Tech Lead',
    category: 'Engineering',
    categoryLabel: 'Engineering',
    bio: 'Builds and scales the platform with clean and reliable tech.',
    photoUrl:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    rankLevel: 9,
    socials: {
      linkedin: 'https://linkedin.com/company/teklozy',
      github: 'https://github.com/teklozy',
      twitter: 'https://twitter.com/teklozy',
    },
  },
  {
    id: 'sahithi-reddy',
    name: 'Sahithi Reddy',
    role: 'UI/UX Designer',
    category: 'Design',
    categoryLabel: 'Design',
    bio: 'Creates beautiful and intuitive experiences for every learner.',
    photoUrl:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    rankLevel: 9,
    socials: {
      linkedin: 'https://linkedin.com/company/teklozy',
      dribbble: 'https://dribbble.com',
      twitter: 'https://twitter.com/teklozy',
    },
  },
  {
    id: 'karthik-n',
    name: 'Karthik N',
    role: 'Learning Experience',
    category: 'Content',
    categoryLabel: 'Content',
    bio: 'Designs learning paths and curates high quality content.',
    photoUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rankLevel: 9,
    socials: {
      linkedin: 'https://linkedin.com/company/teklozy',
      twitter: 'https://twitter.com/teklozy',
    },
  },
  {
    id: 'megha-iyer',
    name: 'Megha Iyer',
    role: 'Community & Growth',
    category: 'Growth',
    categoryLabel: 'Growth',
    bio: 'Builds our student community and campus partnerships.',
    photoUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    rankLevel: 8,
    socials: {
      linkedin: 'https://linkedin.com/company/teklozy',
      twitter: 'https://twitter.com/teklozy',
    },
  },
];

/**
 * Filter categories displayed in the UI.
 */
export const TEAM_CATEGORIES: TeamCategory[] = [
  'All',
  'Founders',
  'Product',
  'Engineering',
  'Design',
  'Content',
  'Growth',
];

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
 * Top Hero Metric Indicators.
 */
export const TEAM_METRICS: TeamMetric[] = [
  {
    id: 'members',
    icon: 'users',
    value: '10+',
    label: 'Team Members',
  },
  {
    id: 'mission',
    icon: 'heart',
    value: '1 Mission',
    label: 'Students to Hired',
  },
  {
    id: 'global',
    icon: 'globe',
    value: 'Global',
    label: 'Learners & Institutions',
  },
];

