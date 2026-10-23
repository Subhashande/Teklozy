import React from 'react';

/**
 * 10-Level Curriculum Milestone Specification
 */
export interface Level {
  id: number;
  key: string;
  stageName: string;
  title: string;
  line: string;
  features: string[];
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
