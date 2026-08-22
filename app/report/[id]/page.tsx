'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';
import type { Issue, ScanReport } from '@/types';

const CATEGORY_META: Record<Issue['category'], { label: string; icon: string }> = {
  trust: { label: 'Trust & Credibility', icon: 'verified_user' },
  conversion: { label: 'Conversion Leaks', icon: 'trending_down' },
  performance: { label: 'Performance', icon: 'speed' },
};

const SEVERITY_META: Record<Issue['severity'], { label: string; color: string; bg: string }> = {
  high: { label: 'High', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  medium: { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  low: { label: 'Low', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)' },
};

function scoreBand(score: number) {
  if (score >= 80) return { label: 'Healthy', color: '#34d399' };
  if (score >= 60) return { label: 'At Risk', color: '#fbbf24' };
  return { label: 'Critical', color: '#f87171' };
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const band = scoreBand(score);
  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke={band.color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold text-white tracking-tighter">{score}</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest mt-1" style={{ color: band.color }}>
          {band.label}
        </span>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = String(params?.id ?? '');

  const [report, setReport] = useState<ScanReport | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>('loading');

  useEffect(() => {
    if (!id) return;
    // Prefer the inline report the scan flow cached this session (works even
    // when the serverless DB doesn't persist between requests).
    try {
      const cached = sessionStorage.getItem(`horizons_report_${id}`);
      if (cached) {
        setReport(JSON.parse(cached));
        setStatus('ready');
        return;
      }
    } catch { /* ignore */ }

    // Fallback: shared or refreshed link → look it up on the server.
    let cancelled = false;
    fetch(`/api/report/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setReport(data.report);
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('notfound'));
    return () => { cancelled = true; };
  }, [id]);

  const isPro = !!user?.isPro;

  if (status === 'loading') {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="w-5 h-5 border-2 border-slate-600 border-t-emerald-400 rounded-full animate-spin" />
            Loading report…
          </div>
        </main>
      </div>
    );
  }

  if (status === 'notfound' || !report) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-600">search_off</span>
          <h1 className="text-2xl font-bold">This report isn&apos;t available</h1>
          <p className="text-slate-400 max-w-md">It may have expired from temporary storage. Run a fresh scan to generate a new one.</p>
          <Link href="/" className="mt-2 bg-emerald-500 text-slate-950 font-bold px-6 py-3 hover:bg-emerald-400 transition-colors">
            Run a new scan
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const displayUrl = report.url.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').replace(/\/+$/, '');
  const grouped: Record<Issue['category'], Issue[]> = { trust: [], conversion: [], performance: [] };
  for (const issue of report.issues) grouped[issue.category]?.push(issue);
  const highCount = report.issues.filter((i) => i.severity === 'high').length;

  // Freemium gating: free users see the first few findings; the rest are locked.
  const FREE_VISIBLE = 3;
  let shown = 0;

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-body-md antialiased">
      <Navbar />

      <main className="flex-grow max-w-6xl w-full mx-auto px-6 pt-[110px] pb-20">
        {/* Header / score summary */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-between border border-slate-800 bg-[#0f172a] p-8">
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">
                Horizons Report
              </span>
              {report.demoMode && (
                <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5" title="Synthesized because no OPENAI_API_KEY is configured (or the live crawl failed).">
                  Demo data
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight break-all">{displayUrl}</h1>
            <p className="text-slate-400 mt-2">
              Scanned {new Date(report.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              {' · '}{report.issues.length} findings{' · '}
              <span className="text-red-400 font-semibold">{highCount} high severity</span>
            </p>
            <div className="mt-5 inline-flex flex-wrap gap-3">
              <Link href="/" className="bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 hover:bg-emerald-400 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">radar</span> Run new scan
              </Link>
              {!isPro && (
                <Link href="/checkout" className="border border-slate-700 text-white font-bold px-5 py-2.5 hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">lock_open</span> Unlock full report
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <ScoreRing score={report.score} />
            <div className="hidden sm:flex flex-col gap-1 border-l border-slate-800 pl-8">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Est. revenue at risk</span>
              <span className="text-4xl font-extrabold text-white">{report.revenueImpact.min}–{report.revenueImpact.max}%</span>
              <span className="text-slate-400 text-sm max-w-[180px]">of potential revenue is leaking through the issues below.</span>
            </div>
          </div>
        </div>

        {/* Findings by category */}
        <div className="mt-10 grid grid-cols-1 gap-8">
          {(Object.keys(grouped) as Issue['category'][]).map((cat) => {
            const list = grouped[cat];
            if (list.length === 0) return null;
            const meta = CATEGORY_META[cat];
            return (
              <section key={cat}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-emerald-400">{meta.icon}</span>
                  <h2 className="text-xl font-bold">{meta.label}</h2>
                  <span className="text-slate-500 text-sm">({list.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {list.map((issue) => {
                    const locked = !isPro && shown >= FREE_VISIBLE;
                    shown += 1;
                    const sev = SEVERITY_META[issue.severity];
                    return (
                      <div key={issue.id} className="relative border border-slate-800 bg-[#0f172a] p-5">
                        <div className={locked ? 'blur-sm select-none pointer-events-none' : ''}>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-bold text-white leading-snug">{issue.title}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shrink-0"
                              style={{ color: sev.color, background: sev.bg }}>
                              {sev.label}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm mt-2">{issue.description}</p>
                          <div className="mt-3 flex items-start gap-2 text-sm">
                            <span className="material-symbols-outlined text-[16px] text-red-400 mt-0.5">warning</span>
                            <span className="text-slate-300">{issue.impact}</span>
                          </div>
                          <div className="mt-2 flex items-start gap-2 text-sm">
                            <span className="material-symbols-outlined text-[16px] text-emerald-400 mt-0.5">lightbulb</span>
                            <span className="text-slate-300">{issue.fix}</span>
                          </div>
                        </div>
                        {locked && (
                          <Link href="/checkout" className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-slate-950/40">
                            <span className="material-symbols-outlined text-emerald-400">lock</span>
                            <span className="text-xs font-semibold text-white">Unlock with Pro</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Persona panel */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-emerald-400">groups</span>
            <h2 className="text-xl font-bold">What each persona experienced</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.personaInsights.map((p) => (
              <div key={p.persona} className="border border-slate-800 bg-[#0f172a] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <h3 className="font-bold text-white">{p.persona}</h3>
                </div>
                <ul className="space-y-2">
                  {p.observations.length === 0 && (
                    <li className="text-slate-500 text-sm italic">No blocking observations — this persona was satisfied.</li>
                  )}
                  {p.observations.map((obs, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="material-symbols-outlined text-[16px] text-slate-500 mt-0.5">chat_bubble</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {!isPro && (
          <div className="mt-12 border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <h3 className="text-2xl font-extrabold">Unlock every finding + fix guide</h3>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto">
              Pro reveals all findings, prioritized fixes, competitor benchmarks, and unlimited scans.
            </p>
            <Link href="/checkout" className="inline-flex mt-5 bg-emerald-500 text-slate-950 font-bold px-8 py-3 hover:bg-emerald-400 transition-colors">
              Upgrade to Pro
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
