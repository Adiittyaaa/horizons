// Horizons constants
export const PERSONAS = [
  {
    name: 'Skeptical Buyer',
    icon: '🤨',
    prompt: 'You are a skeptical buyer who questions credibility, looks for trust signals, and needs proof before purchasing.'
  },
  {
    name: 'Impatient Mobile User',
    icon: '📱',
    prompt: 'You are an impatient mobile user who hates slow loading, hard-to-read text, and complicated navigation.'
  },
  {
    name: 'First-Time Visitor',
    icon: '👋',
    prompt: 'You are visiting this website for the first time. You need clarity, simplicity, and immediate understanding of what this site offers.'
  },
  {
    name: 'Price-Sensitive Customer',
    icon: '💸',
    prompt: 'You are price-conscious and need to see clear value, transparent pricing, and justification for costs.'
  }
] as const;

export const PERFORMANCE_THRESHOLDS = {
  SLOW_LOAD_CRITICAL: 3000,
  SLOW_LOAD_WARNING: 2000,
  SLOW_LOAD_MINOR: 1000,
} as const;

export const SCORE_PENALTIES = {
  NO_SSL: 20,
  BROKEN_LINKS: 10,
  LOAD_TIME_CRITICAL: 15,
  LOAD_TIME_WARNING: 10,
  LOAD_TIME_MINOR: 5,
  HIGH_SEVERITY_ISSUE: 8,
  MEDIUM_SEVERITY_ISSUE: 5,
  LOW_SEVERITY_ISSUE: 2,
} as const;
