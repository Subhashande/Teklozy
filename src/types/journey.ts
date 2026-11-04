import React from 'react';

/**
 * 10-Level Curriculum Milestone Specification
 */
export interface FeatureChip {
  icon: string;
  label: string;
  color?: string;
}

export interface Level {
  id: number;
  key: string;
  stageName: string;
  title: string;
  highlightWord?: string;
  line: string;
  features: string[];
  chips?: FeatureChip[];
  ctaText?: string;
  accent: string;
  bubble: string;
  toy: string;
}

/**
 * Interactive Student Feature Node for the Hero Section
 */
export interface FeatureNode {
  id: number;
  title: string;
  category: string;
  icon: React.ElementType;
  accent: string;
  xDesktop: number; // percentage
  yDesktop: number; // percentage
  status: string;
}
