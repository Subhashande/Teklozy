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

/**
 * Community Bench Q&A Question item
 */
export interface BenchQuestion {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  votes: number;
  answersCount: number;
  tags: string[];
  acceptedAnswer?: string;
  createdAt: string;
}
