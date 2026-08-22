// Horizons constants
//
// PERSONAS is the single source of truth for the four behavioral agents.
// Every surface (progress screen, persona-insights routes, report page, and the
// OpenAI analysis in lib/ai-agents.ts) must derive its persona list from here so
// the product never contradicts itself about who is auditing the site.
export const PERSONAS = [
  {
    id: 'skeptical-buyer',
    name: 'Skeptical Buyer',
    icon: '🤨',
    color: '#f87171',
    tagline: 'Questions credibility and demands proof before trusting.',
    prompt: 'You are a skeptical buyer who questions credibility, looks for trust signals, and needs proof before purchasing.'
  },
  {
    id: 'value-seeker',
    name: 'Value Seeker',
    icon: '💸',
    color: '#34d399',
    tagline: 'Hunts for clear value and transparent, justified pricing.',
    prompt: 'You are a price-conscious value seeker who needs to see clear value, transparent pricing, and justification for costs before committing.'
  },
  {
    id: 'impulse-evaluator',
    name: 'Impulse Evaluator',
    icon: '⚡',
    color: '#fbbf24',
    tagline: 'Impatient and mobile-first; judges within seconds and bounces fast.',
    prompt: 'You are an impatient, mobile-first visitor who bounces quickly when pages are slow, cluttered, or hard to scan. You form a judgment within seconds.'
  },
  {
    id: 'enterprise-evaluator',
    name: 'Enterprise Evaluator',
    icon: '🏢',
    color: '#a78bfa',
    tagline: 'Vets security, compliance, integrations, and ability to scale.',
    prompt: 'You are an enterprise evaluator who vets vendors for security, compliance (SOC2 / ISO 27001), integrations, and the ability to scale to a large organization.'
  }
] as const;

export type Persona = (typeof PERSONAS)[number];

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
