// lib/ai-agents.ts
import OpenAI from 'openai';
import type { CrawlData, Issue, PersonaInsight } from '@/types';
import { PERSONAS } from '@/lib/constants';

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Analyze the site from the perspective of four synthetic personas.
 * Returns exactly four PersonaInsight objects, one per persona.
 */
export async function analyzeWithPersonas(crawlData: CrawlData): Promise<PersonaInsight[]> {
  const insights: PersonaInsight[] = [];

  for (const persona of PERSONAS) {
    const prompt = `${persona.prompt}\n\nAnalyze this website:\nURL: ${crawlData.url}\nTitle: ${crawlData.title}\nDescription: ${crawlData.description}\nContent Preview: ${crawlData.content.substring(0, 2000)}\n\nProvide exactly three specific observations about what would make this persona hesitate, distrust, or leave.\n\nReturn the observations as a JSON array of strings.\n\nJSON Example:\n[\n  "Observation 1",\n  "Observation 2",\n  "Observation 3"\n]`;

    try {
      const completion = await getOpenAI().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 300,
      });

      const raw = completion.choices[0].message.content ?? '[]';
      let observations: string[] = [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          observations = parsed.slice(0, 3).map(String);
        } else {
          console.warn('[AI] Persona response not an array');
        }
      } catch (parseError) {
        console.error('[AI] Failed to parse persona response:', parseError);
      }

      insights.push({
        persona: persona.name,
        icon: persona.icon,
        observations,
      });
    } catch (err) {
      console.error('[AI] Persona analysis error for', persona.name, err);
      insights.push({ persona: persona.name, icon: persona.icon, observations: [] });
    }
  }

  return insights;
}

/**
 * Detect trust‑related issues using OpenAI.
 */
export async function detectTrustIssues(crawlData: CrawlData): Promise<Issue[]> {
  const prompt = `Analyze the following website for TRUST and CREDIBILITY issues.\n\nURL: ${crawlData.url}\nTitle: ${crawlData.title}\nContent Preview (first 3000 chars):\n${crawlData.content.substring(0, 3000)}\n\nIdentify 3‑5 specific trust issues that could make visitors hesitate or leave. Include title, description, impact, and a concrete fix for each.\n\nReturn a JSON array of objects with the shape:\n[{\n  "title": "...",\n  "description": "...",\n  "impact": "...",\n  "fix": "..."\n}]`;

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 800,
    });
    const raw = completion.choices[0].message.content ?? '[]';
    let rawIssues: any[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) rawIssues = parsed;
    } catch (e) {
      console.error('[AI] Trust issues JSON parse error:', e);
    }
    return rawIssues.map((issue, idx) => ({
      id: `trust-${idx}`,
      category: 'trust',
      severity: 'high',
      title: issue.title ?? 'Trust Issue',
      description: issue.description ?? '',
      impact: issue.impact ?? '',
      fix: issue.fix ?? '',
    }));
  } catch (err) {
    console.error('[AI] Trust detection error:', err);
    return [];
  }
}

/**
 * Detect conversion‑leak issues using OpenAI.
 */
export async function detectConversionLeaks(crawlData: CrawlData): Promise<Issue[]> {
  const prompt = `Analyze the following website for CONVERSION FRiction points. Include form count (${crawlData.forms}) in the analysis.\n\nURL: ${crawlData.url}\nTitle: ${crawlData.title}\nContent Preview (first 3000 chars):\n${crawlData.content.substring(0, 3000)}\n\nIdentify 3‑5 specific conversion issues that could prevent visitors from completing a purchase or action. Include title, description, impact, and a concrete fix for each.\n\nReturn a JSON array of objects with the shape:\n[{\n  "title": "...",\n  "description": "...",\n  "impact": "...",\n  "fix": "..."\n}]`;

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      max_tokens: 800,
    });
    const raw = completion.choices[0].message.content ?? '[]';
    let rawIssues: any[] = [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) rawIssues = parsed;
    } catch (e) {
      console.error('[AI] Conversion issues JSON parse error:', e);
    }
    return rawIssues.map((issue, idx) => ({
      id: `conversion-${idx}`,
      category: 'conversion',
      severity: 'high',
      title: issue.title ?? 'Conversion Issue',
      description: issue.description ?? '',
      impact: issue.impact ?? '',
      fix: issue.fix ?? '',
    }));
  } catch (err) {
    console.error('[AI] Conversion detection error:', err);
    return [];
  }
}
