// Horizons Type Definitions
// Central type definitions used across the backend.

import { nanoid } from 'nanoid'; // Imported for potential ID generation utilities

export type IssueCategory = 'performance' | 'trust' | 'conversion';
export type IssueSeverity = 'high' | 'medium' | 'low';

export interface ScanRequest {
  url: string;
  email?: string;
}

export interface CrawlData {
  url: string;
  title: string;
  description: string;
  content: string;
  links: string[];
  forms: number;
  images: number;
  loadTime: number; // ms
  hasSSL: boolean;
  hasBrokenLinks: boolean;
  brokenLinksCount: number;
}

export interface Issue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  impact: string;
  fix: string;
}

export interface PersonaInsight {
  persona: string;
  icon: string;
  observations: string[];
}

export interface ScanReport {
  id: string;
  url: string;
  score: number;
  createdAt: string; // ISO timestamp
  issues: Issue[];
  personaInsights: PersonaInsight[];
  revenueImpact: {
    min: number;
    max: number;
  };
  isPaid: boolean;
  /** True when the report was synthesized (no OPENAI_API_KEY, or the live crawl/AI failed). */
  demoMode?: boolean;
}
