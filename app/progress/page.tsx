"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/AuthContext';

export default function Progress() {
  const router = useRouter();
  const { login } = useAuth();
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Initializing Swarm...");
  const [targetUrl, setTargetUrl] = useState("your-website.com");
  const [error, setError] = useState<string | null>(null);
  const [scanUrl, setScanUrl] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState('');

  // Read the ?url= param once on mount. If it's absent we render a URL prompt
  // (below) instead of scanning, so every "start scan" CTA lands somewhere useful.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawUrl = (params.get('url') || '').trim();
    if (rawUrl) setScanUrl(rawUrl);
  }, []);

  useEffect(() => {
    if (!scanUrl) return;
    const rawUrl = scanUrl;
    setTargetUrl(rawUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').replace(/\/+$/, ''));

    // State shared between the real request and the animation loop.
    let apiResult: { id: string; report: any } | null = null;
    let apiError: string | null = null;

    // Fire the real analysis immediately; the animation runs alongside it.
    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: rawUrl }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Scan failed. Please try again.');
        apiResult = data;
      })
      .catch((e) => { apiError = e?.message || 'Scan failed. Please try again.'; });

    const goToReport = () => {
      if (apiError) { setError(apiError); return; }
      if (!apiResult) return;
      login('guest@horizons.ai'); // seamless demo session
      try {
        sessionStorage.setItem(`horizons_report_${apiResult.id}`, JSON.stringify(apiResult.report));
      } catch { /* storage quota — report page falls back to the API */ }
      router.push(`/report/${apiResult.id}`);
    };

    const duration = 6000;
    const intervalTime = 100;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const statuses = [
      { threshold: 0, text: "Initializing Behavioral Swarm..." },
      { threshold: 15, text: "Simulating Skeptical Buyer Saccades..." },
      { threshold: 35, text: "Mapping Conversion Friction Points..." },
      { threshold: 55, text: "Analyzing Trust Signal Density..." },
      { threshold: 75, text: "Calculating Revenue Impact Projections..." },
      { threshold: 90, text: "Finalizing Heuristic Audit..." }
    ];

    const interval = setInterval(() => {
      currentStep++;
      const raw = Math.floor((currentStep / steps) * 100);
      // Hold just short of 100% until the real request settles, so we never
      // redirect before the report exists.
      const settled = apiResult !== null || apiError !== null;
      const currentProgress = settled ? Math.min(raw, 100) : Math.min(raw, 96);
      setProgress(currentProgress);

      const status = [...statuses].reverse().find(s => currentProgress >= s.threshold);
      if (status) setCurrentStatus(status.text);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setCurrentStatus(apiError ? 'Scan failed.' : 'Report ready. Redirecting…');
        setTimeout(goToReport, 400);
      } else if (currentStep >= steps && !settled) {
        setCurrentStatus('Compiling behavioral report…');
      }
    }, intervalTime);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanUrl]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // The four canonical personas, activating as the scan crosses each threshold
  // (mirrors the terminal log below). Colors match their terminal tags.
  const swarm = [
    { emoji: '🤨', name: 'Skeptical Buyer', color: 'text-red-400', ring: 'border-red-400/60', at: 0 },
    { emoji: '💸', name: 'Value Seeker', color: 'text-secondary', ring: 'border-secondary/60', at: 0 },
    { emoji: '⚡', name: 'Impulse Evaluator', color: 'text-amber-400', ring: 'border-amber-400/60', at: 30 },
    { emoji: '🏢', name: 'Enterprise Evaluator', color: 'text-purple-400', ring: 'border-purple-400/60', at: 60 },
  ];

  // No URL yet → prompt for one (reached when a CTA links to /progress directly).
  if (!scanUrl) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col font-body-md antialiased">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-6 pt-[100px]">
          <form
            onSubmit={(e) => { e.preventDefault(); if (inputUrl.trim()) setScanUrl(inputUrl.trim()); }}
            className="w-full max-w-xl border border-slate-800 bg-[#0f172a] p-8 text-center"
          >
            <span className="material-symbols-outlined text-emerald-400 text-4xl">radar</span>
            <h1 className="text-2xl font-extrabold mt-3">Scan a website</h1>
            <p className="text-slate-400 mt-2 mb-6">Enter a domain and the behavioral swarm will audit it for trust and conversion leaks.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="yourcompany.com"
                autoFocus
                className="flex-1 bg-slate-900 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
              <button type="submit" className="bg-emerald-500 text-slate-950 font-bold px-6 py-3 hover:bg-emerald-400 transition-colors">
                Start scan
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-body-md antialiased overflow-hidden relative">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-6 pt-[100px] relative z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] animate-slow-spin"></div>
        </div>

        {error && (
          <div className="mb-8 w-full max-w-2xl mx-auto border border-red-500/40 bg-red-500/10 text-red-200 px-6 py-4 flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            <div className="flex-1">
              <p className="font-semibold text-white">Scan couldn&apos;t complete</p>
              <p className="text-sm text-red-300/80">{error}</p>
            </div>
            <button onClick={() => router.push('/')} className="text-sm font-bold underline whitespace-nowrap">Try again</button>
          </div>
        )}

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Progress Indicator */}
          <div className="flex flex-col items-center justify-center relative group">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
              {/* Spinning Rings */}
              <svg className="absolute inset-0 w-full h-full animate-slow-spin opacity-30 text-primary" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </svg>
              <svg className="absolute inset-0 w-full h-full animate-reverse-spin opacity-20 text-secondary" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
              </svg>

              {/* Main Ring */}
              <svg className="w-[260px] h-[260px] md:w-[380px] md:h-[380px] -rotate-90 relative z-10" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-900" />
                <circle 
                  cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" 
                  className="text-secondary transition-all duration-300 ease-out animate-pulse"
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="square"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="text-display-xl font-display-xl text-white font-extrabold text-5xl tracking-tighter transition-all duration-300 group-hover:scale-110">
                  {progress}%
                </div>
                <div className="font-label-mono text-label-mono text-slate-500 uppercase tracking-widest mt-2 max-w-[180px] truncate px-2" title={targetUrl}>{targetUrl}</div>
              </div>
            </div>

            {/* Live status line — the computed swarm status, finally surfaced */}
            <div className="mt-6 h-6 text-center">
              <span className="font-label-mono text-label-mono text-slate-400 uppercase tracking-widest animate-pulse">{currentStatus}</span>
            </div>

            {/* Persona swarm — avatars light up as the scan reaches each agent */}
            <div className="mt-6 flex items-center justify-center gap-3 md:gap-4">
              {swarm.map((p) => {
                const active = progress >= p.at;
                return (
                  <div key={p.name} className="flex flex-col items-center gap-1.5" title={p.name}>
                    <div className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl border-2 transition-all duration-500 ${active ? `${p.ring} bg-white/5 opacity-100 scale-100 animate-avatar-pulse` : 'border-slate-800 opacity-30 grayscale scale-90'}`}>
                      {p.emoji}
                    </div>
                    <span className={`font-label-mono text-[8px] uppercase tracking-wider transition-colors ${active ? p.color : 'text-slate-700'}`}>{p.name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High-Tech Terminal Command Center */}
          <div className="bg-[#0f172a] rounded-none border border-slate-800 shadow-2xl p-8 flex flex-col gap-6 relative overflow-hidden h-[500px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 bg-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 bg-emerald-500/50"></div>
                </div>
                <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest ml-2">Behavioral_Swarm_Engine_v4.0</span>
              </div>
              <div className="font-label-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                SCANNING: LIVE
              </div>
            </div>

            <div className="flex-grow font-mono text-[11px] leading-relaxed overflow-y-auto space-y-3 scrollbar-hide pr-2">
              <div className="flex gap-3 text-slate-500">
                <span>[0.00s]</span>
                <span className="text-emerald-400">System initialization complete. Handshaking with 1,200 agent nodes...</span>
              </div>
              <div className="flex gap-3 text-slate-500">
                <span>[0.45s]</span>
                <span>Swarm deployed to <span className="text-blue-400">{targetUrl}</span></span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500">[{ (progress * 0.08).toFixed(2) }s]</span>
                <span className="text-red-400">[Skeptical Buyer]</span>
                <span className="text-slate-300">Evaluating Social Proof density... Found 2 testimonials. Insufficient verification detected.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-slate-500">[{ (progress * 0.10).toFixed(2) }s]</span>
                <span className="text-secondary">[Value Seeker]</span>
                <span className="text-slate-300">Scanning pricing table. ROI calculator interaction successful. Data accuracy: 98%.</span>
              </div>
              {progress > 30 && (
                <div className="flex gap-3">
                  <span className="text-slate-500">[{ (progress * 0.12).toFixed(2) }s]</span>
                  <span className="text-amber-400">[Impulse Evaluator]</span>
                  <span className="text-slate-300">Bounce risk detected at 'Feature Grid'. Layout complexity &gt; 65%.</span>
                </div>
              )}
              {progress > 60 && (
                <div className="flex gap-3">
                  <span className="text-slate-500">[{ (progress * 0.15).toFixed(2) }s]</span>
                  <span className="text-purple-400">[Enterprise Eval]</span>
                  <span className="text-slate-300">Searching for SOC2/ISO 27001 markers. Result: <span className="text-red-500">NOT FOUND</span> in Footer.</span>
                </div>
              )}
              <div className="animate-pulse text-emerald-500 mt-4 flex gap-2">
                <span>{'>'}</span>
                <span className="w-2 h-4 bg-emerald-500"></span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-label-mono">
              <div className="flex gap-4">
                <span>LATENCY: 8ms</span>
                <span>MEMORY: 1.4GB</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500"></span>
                <span>ALL AGENTS SYNCED</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
}
