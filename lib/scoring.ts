// lib/scoring.ts
import type { CrawlData, Issue } from '@/types';
import { PERFORMANCE_THRESHOLDS, SCORE_PENALTIES } from '@/lib/constants';

/**
 * Calculate the Horizons score (0‑100) based on performance metrics and issue severities.
 */
export function calculateHorizonsScore(
  crawlData: CrawlData,
  issues: Issue[]
): number {
  let score = 100;

  // Load time penalties
  if (crawlData.loadTime > PERFORMANCE_THRESHOLDS.SLOW_LOAD_CRITICAL) {
    score -= SCORE_PENALTIES.LOAD_TIME_CRITICAL;
  } else if (crawlData.loadTime > PERFORMANCE_THRESHOLDS.SLOW_LOAD_WARNING) {
    score -= SCORE_PENALTIES.LOAD_TIME_WARNING;
  } else if (crawlData.loadTime > PERFORMANCE_THRESHOLDS.SLOW_LOAD_MINOR) {
    score -= SCORE_PENALTIES.LOAD_TIME_MINOR;
  }

  // SSL & broken links
  if (!crawlData.hasSSL) score -= SCORE_PENALTIES.NO_SSL;
  if (crawlData.hasBrokenLinks) score -= SCORE_PENALTIES.BROKEN_LINKS;

  // Issue severity penalties
  const high = issues.filter(i => i.severity === 'high').length;
  const medium = issues.filter(i => i.severity === 'medium').length;
  const low = issues.filter(i => i.severity === 'low').length;

  score -= high * SCORE_PENALTIES.HIGH_SEVERITY_ISSUE;
  score -= medium * SCORE_PENALTIES.MEDIUM_SEVERITY_ISSUE;
  score -= low * SCORE_PENALTIES.LOW_SEVERITY_ISSUE;

  // Clamp between 0‑100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Estimate potential revenue impact range based on the final score.
 */
export function estimateRevenueImpact(score: number): { min: number; max: number } {
  if (score >= 90) return { min: 1, max: 3 };
  if (score >= 80) return { min: 3, max: 7 };
  if (score >= 70) return { min: 7, max: 12 };
  if (score >= 60) return { min: 12, max: 18 };
  if (score >= 50) return { min: 18, max: 25 };
  return { min: 25, max: 40 };
}
