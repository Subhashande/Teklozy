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
export const TEAM_MEMBERS: TeamMember[] = []; // Populate only with approved, real team profiles.


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

