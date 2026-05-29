// app/api/analyze/route.ts
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;
import { nanoid } from 'nanoid';
import { crawlWebsite } from '@/lib/crawler';
import { analyzeWithPersonas, detectTrustIssues, detectConversionLeaks } from '@/lib/ai-agents';
import { calculateHorizonsScore, estimateRevenueImpact } from '@/lib/scoring';
import { saveScan, ensureDB } from '@/lib/db';
import type { Issue } from '@/types';

export async function POST(request: Request) {
  await ensureDB(); // Ensure DB exists
  // In a real production app, use Redis or a similar store
  const rateLimitMap = (global as any).rateLimitMap || new Map();
  (global as any).rateLimitMap = rateLimitMap;

  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours
  
  const userRateData = rateLimitMap.get(ip) || { count: 0, firstScan: now };
  
  if (now - userRateData.firstScan > windowMs) {
    userRateData.count = 1;
    userRateData.firstScan = now;
  } else {
    userRateData.count += 1;
  }
  
  rateLimitMap.set(ip, userRateData);

  if (userRateData.count > 10) { // Limit to 10 for demo purposes
    return NextResponse.json({ 
      error: 'Rate limit exceeded. Please upgrade to Pro for unlimited scans.' 
    }, { status: 429 });
  }
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let { url } = body;
  if (typeof url !== 'string') {
    return NextResponse.json({ error: 'URL missing' }, { status: 400 });
  }

  // Normalize URL (add https if missing)
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  // Validate URL format
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  try {
    const crawlData = await crawlWebsite(url);

    // Performance issues based on crawl data
    const performanceIssues: Issue[] = [];
    if (crawlData.loadTime > 2000) {
      performanceIssues.push({
        id: 'perf-1',
        category: 'performance',
        severity: crawlData.loadTime > 3000 ? 'high' : 'medium',
        title: 'Slow page load time',
        description: `Page loads in ${(crawlData.loadTime / 1000).toFixed(1)}s`,
        impact: 'High bounce rates for slow pages',
        fix: 'Optimize assets, enable caching, use a CDN',
      });
    }
    if (!crawlData.hasSSL) {
      performanceIssues.push({
        id: 'perf-2',
        category: 'performance',
        severity: 'high',
        title: 'No SSL certificate',
        description: 'Site is served over HTTP',
        impact: 'Browsers show "Not Secure" warnings',
        fix: 'Install an SSL certificate (e.g., Let\'s Encrypt)',
      });
    }
    if (crawlData.hasBrokenLinks) {
      performanceIssues.push({
        id: 'perf-3',
        category: 'performance',
        severity: 'medium',
        title: `${crawlData.brokenLinksCount} broken links detected`,
        description: 'Broken links harm credibility',
        impact: 'Visitors encounter 404 errors',
        fix: 'Run a link checker and fix/remove broken URLs',
      });
    }

    // AI analysis (run in parallel)
    const [personaInsights, trustIssues, conversionIssues] = await Promise.all([
      analyzeWithPersonas(crawlData),
      detectTrustIssues(crawlData),
      detectConversionLeaks(crawlData),
    ]);

    const allIssues = [...performanceIssues, ...trustIssues, ...conversionIssues];
    const score = calculateHorizonsScore(crawlData, allIssues);
    const revenueImpact = estimateRevenueImpact(score);

    const report = {
      id: nanoid(10),
      url: crawlData.url,
      score,
      createdAt: new Date().toISOString(),
      issues: allIssues,
      personaInsights,
      revenueImpact,
      isPaid: false,
    };

    await saveScan(report);

    return NextResponse.json({ id: report.id });
  } catch (error) {
    console.error('[Analyze] Unexpected error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

