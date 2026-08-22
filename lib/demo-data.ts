// lib/demo-data.ts
//
// Deterministic demo-report generator. Horizons is designed to always be
// demonstrable end-to-end: when OPENAI_API_KEY is absent, or the live
// Puppeteer + OpenAI pipeline fails (e.g. serverless Chromium issues), the
// analyze route falls back to this generator so the user still gets a
// realistic, stable report for the URL they entered.
//
// The output is seeded from the URL, so the same site always yields the same
// score and findings — which makes the demo feel real rather than random.
import { nanoid } from 'nanoid';
import type { Issue, IssueSeverity, PersonaInsight, ScanReport } from '@/types';
import { PERSONAS } from '@/lib/constants';
import { SCORE_PENALTIES } from '@/lib/constants';
import { estimateRevenueImpact } from '@/lib/scoring';

// FNV-1a style string hash → unsigned 32-bit int.
function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 seeded PRNG — stable sequence per seed.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickN<T>(rand: () => number, pool: T[], n: number): T[] {
  const copy = [...pool];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(rand() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

type IssueSeed = { title: string; description: string; impact: string; fix: string; severity: IssueSeverity };

const TRUST_ISSUES: IssueSeed[] = [
  { title: 'No customer testimonials above the fold', description: 'The hero section leads with product claims but shows no social proof, reviews, or recognizable logos.', impact: 'Skeptical visitors have nothing to anchor trust to and bounce before scrolling.', fix: 'Add 2–3 named testimonials or a recognizable-customer logo strip near the primary CTA.', severity: 'high' },
  { title: 'Missing security & compliance badges', description: 'No SOC 2, ISO 27001, GDPR, or SSL trust markers are surfaced anywhere on the page.', impact: 'Enterprise and security-conscious buyers cannot verify you meet their procurement bar.', fix: 'Add a trust/compliance strip in the footer and near checkout.', severity: 'medium' },
  { title: 'Vague "About" and no team page', description: 'There is no clear company story, physical address, or named team — the site reads as anonymous.', impact: 'Reduces perceived legitimacy; buyers question whether a real company stands behind the product.', fix: 'Publish an About page with real team members, location, and founding story.', severity: 'medium' },
  { title: 'Unsubstantiated statistics', description: 'Big claims ("10x faster", "$12M recovered") appear with no source, methodology, or case study link.', impact: 'Skeptical buyers discount every claim on the page once one feels unverifiable.', fix: 'Link each headline stat to a case study or cite the data source inline.', severity: 'high' },
  { title: 'No visible pricing or contact path', description: 'Neither pricing nor a clear way to reach a human is discoverable within two clicks.', impact: 'Signals "enterprise sales trap"; value-seekers and SMBs disqualify you immediately.', fix: 'Expose at least a starting price and a contact/demo link in the top navigation.', severity: 'medium' },
];

const CONVERSION_ISSUES: IssueSeed[] = [
  { title: 'Primary CTA competes with 4 other buttons', description: 'The hero presents five calls-to-action of similar visual weight, diluting the intended next step.', impact: 'Decision paralysis measurably lowers click-through on the primary action.', fix: 'Promote one primary CTA; demote the rest to text or secondary styling.', severity: 'high' },
  { title: 'Signup form asks for too much upfront', description: 'The form requests company size, phone, and role before the visitor has seen any value.', impact: 'Each extra required field compounds form-abandonment, especially on mobile.', fix: 'Reduce to email-only to start; collect the rest progressively after activation.', severity: 'high' },
  { title: 'No pricing anchor on the plans page', description: 'Plans are shown without a "most popular" anchor or annual-vs-monthly framing.', impact: 'Value-seekers cannot quickly judge which plan is "right", so they defer the decision.', fix: 'Highlight a recommended tier and default the toggle to the better-value option.', severity: 'medium' },
  { title: 'Checkout lacks reassurance near the pay button', description: 'The pay button has no money-back guarantee, security seal, or "cancel anytime" microcopy beside it.', impact: 'Last-mile hesitation drives cart abandonment at the highest-intent moment.', fix: 'Add a guarantee + secure-payment badge directly under the pay button.', severity: 'medium' },
  { title: 'Dead-end 404s from footer links', description: 'Several footer links resolve to empty or missing pages.', impact: 'Broken journeys erode confidence and interrupt momentum toward conversion.', fix: 'Audit and fix/remove broken links; add a helpful 404 with a path back.', severity: 'low' },
];

const PERFORMANCE_ISSUES: IssueSeed[] = [
  { title: 'Largest Contentful Paint over 3s on mobile', description: 'The hero image and web fonts block first meaningful paint on a throttled mobile connection.', impact: 'Impatient mobile users abandon before the page becomes usable.', fix: 'Preload the hero asset, subset fonts, and defer non-critical scripts.', severity: 'high' },
  { title: 'Unoptimized hero imagery', description: 'Large PNG/JPG assets are served without next-gen formats or responsive sizing.', impact: 'Slower loads on mobile inflate bounce rate and hurt Core Web Vitals.', fix: 'Serve AVIF/WebP with responsive srcset and lazy-load below-the-fold media.', severity: 'medium' },
  { title: 'Layout shift as fonts and banners load', description: 'Content jumps as web fonts swap and a cookie banner injects late.', impact: 'Cumulative Layout Shift frustrates users and can cause mis-taps on CTAs.', fix: 'Reserve space for late elements and use font-display: optional/swap deliberately.', severity: 'low' },
];

const PERSONA_OBSERVATIONS: Record<string, string[]> = {
  'skeptical-buyer': [
    'I see bold claims but no named customers or verifiable proof — I don\'t believe the numbers yet.',
    'There\'s no security or compliance information, so I can\'t tell if this is safe to adopt.',
    'The testimonials feel generic and unattributed; I\'d want real names, roles, and companies.',
    'No clear refund or guarantee policy makes committing feel risky.',
  ],
  'value-seeker': [
    'Pricing isn\'t visible without talking to sales, so I can\'t judge whether this is worth it.',
    'I don\'t see a clear comparison of what each tier actually gets me.',
    'The value proposition is abstract — show me the concrete ROI or savings.',
    'No annual discount or "most popular" cue means I have to do the math myself.',
  ],
  'impulse-evaluator': [
    'The page took too long to become usable on my phone — I almost left.',
    'Too many competing buttons; I couldn\'t tell what I\'m supposed to do first.',
    'The hero text is dense — I scanned for three seconds and didn\'t get the point.',
    'Content shifted as things loaded and I nearly tapped the wrong thing.',
  ],
  'enterprise-evaluator': [
    'No SOC 2 / ISO 27001 markers — this won\'t clear our security review.',
    'I can\'t find integration or SSO details needed to evaluate fit for our stack.',
    'There\'s no clear path to talk to sales or request a security questionnaire.',
    'No case studies from companies at our scale to de-risk the decision.',
  ],
};

/**
 * Build a realistic, deterministic report for a URL without any external calls.
 */
export function generateDemoReport(url: string): ScanReport {
  const seed = hashString(url.toLowerCase().replace(/\/+$/, ''));
  const rand = mulberry32(seed);

  const trust = pickN(rand, TRUST_ISSUES, 2 + Math.floor(rand() * 2)); // 2–3
  const conversion = pickN(rand, CONVERSION_ISSUES, 2 + Math.floor(rand() * 2)); // 2–3
  const performance = pickN(rand, PERFORMANCE_ISSUES, 1 + Math.floor(rand() * 2)); // 1–2

  const build = (seeds: IssueSeed[], category: Issue['category'], prefix: string): Issue[] =>
    seeds.map((s, i) => ({ id: `${prefix}-${i}`, category, ...s }));

  const issues: Issue[] = [
    ...build(trust, 'trust', 'trust'),
    ...build(conversion, 'conversion', 'conversion'),
    ...build(performance, 'performance', 'perf'),
  ];

  // Score from the same penalty model the real scorer uses, so demo and live
  // reports are on the same scale.
  let score = 100;
  for (const issue of issues) {
    if (issue.severity === 'high') score -= SCORE_PENALTIES.HIGH_SEVERITY_ISSUE;
    else if (issue.severity === 'medium') score -= SCORE_PENALTIES.MEDIUM_SEVERITY_ISSUE;
    else score -= SCORE_PENALTIES.LOW_SEVERITY_ISSUE;
  }
  score = Math.max(38, Math.min(92, Math.round(score)));

  const personaInsights: PersonaInsight[] = PERSONAS.map((p) => {
    const pool = PERSONA_OBSERVATIONS[p.id] ?? [];
    return { persona: p.name, icon: p.icon, observations: pickN(rand, pool, 3) };
  });

  return {
    id: nanoid(10),
    url,
    score,
    createdAt: new Date().toISOString(),
    issues,
    personaInsights,
    revenueImpact: estimateRevenueImpact(score),
    isPaid: false,
    demoMode: true,
  };
}
