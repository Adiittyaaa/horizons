'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/lib/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [logs, setLogs] = useState<string[]>([
    '> Initializing Swarm Protocol v4.2.0...',
    '> Loading Persona Profiles: [Skeptical, Detail, Impulse]',
    '> Connection established with data layer...',
  ]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Simulation for live logs (only run for Pro users)
  useEffect(() => {
    if (isLoading || !user || !user.isPro) return;
    
    const possibleLogs = [
      '> Simulating checkout flow interaction...',
      '> Detecting DOM layout shifts... [CAUTION: LCP Delay]',
      '> Analyzing trust badge placement effectiveness...',
      '> Persona [Skeptical Buyer] reached pricing page...',
      '> Persona [Value Seeker] comparing feature tiers...',
      '> Trust Auditor: Missing SSL/Security badges detected.',
      '> Revenue Impact Engine: Calculation update in progress...',
      '> Swarm Agent #442: Bounce rate analysis complete.',
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const nextLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
        return [...prev.slice(-4), nextLog];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading, user]);

  // Formatter for logs in live console output
  const formatLog = (log: string) => {
    const cleanLog = log.startsWith('> ') ? log.slice(2) : log;
    
    if (cleanLog.includes('[CAUTION:')) {
      const parts = cleanLog.split('[CAUTION:');
      const warningText = parts[1].replace(']', '');
      return (
        <div className="flex items-start gap-2">
          <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
          <span className="text-slate-300">{parts[0]}</span>
          <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-none text-[9px] font-bold uppercase tracking-wider border border-amber-500/30">
            CAUTION: {warningText}
          </span>
        </div>
      );
    }
    
    if (cleanLog.includes('Trust Auditor:')) {
      const parts = cleanLog.split('Trust Auditor:');
      return (
        <div className="flex items-start gap-2">
          <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
          <span className="text-emerald-400 font-bold font-headline-md text-xs">Trust Auditor:</span>
          <span className="text-slate-300">{parts[1]}</span>
        </div>
      );
    }
    
    if (cleanLog.includes('Persona [')) {
      const match = cleanLog.match(/Persona \[(.*?)\](.*)/);
      if (match) {
        const persona = match[1];
        const rest = match[2];
        return (
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
            <span className="text-slate-400">Persona</span>
            <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-none text-[9px] font-bold border border-indigo-500/30">
              {persona}
            </span>
            <span className="text-slate-300">{rest}</span>
          </div>
        );
      }
    }

    if (cleanLog.includes('Swarm Agent')) {
      const parts = cleanLog.split('Swarm Agent');
      return (
        <div className="flex items-start gap-2">
          <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
          <span className="text-blue-400 font-bold font-headline-md text-xs">Swarm Agent</span>
          <span className="text-slate-300">{parts[1]}</span>
        </div>
      );
    }

    if (cleanLog.includes('Revenue Impact Engine:')) {
      const parts = cleanLog.split('Revenue Impact Engine:');
      return (
        <div className="flex items-start gap-2">
          <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
          <span className="text-teal-400 font-bold font-headline-md text-xs">Revenue Impact Engine:</span>
          <span className="text-slate-300">{parts[1]}</span>
        </div>
      );
    }

    return (
      <div className="flex items-start gap-2">
        <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
        <span className="text-slate-300">{cleanLog}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-t-2 border-primary rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary animate-pulse">radar</span>
          </div>
        </div>
        <div className="mt-8 font-label-mono text-label-mono text-outline uppercase tracking-[0.2em] animate-pulse">Initializing Workspace...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Let the redirect trigger in useEffect
  }

  const isPro = user.isPro === true;

  return (
    <div className="bg-background text-on-background antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
        <Sidebar />

        {/* Main Dashboard Canvas */}
        <div className="lg:col-span-9 flex flex-col gap-lg relative">
          {/* Decorative glowing blobs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

          {/* Header Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Score Card */}
            <div className="md:col-span-1 bg-surface-container-lowest border border-outline-variant/60 rounded-none p-6 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-error/5 rounded-full blur-2xl group-hover:bg-error/10 transition-colors"></div>

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="font-label-mono text-[10px] text-outline uppercase tracking-widest font-bold">Conversion Score</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5 font-sans">Overall rating</p>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">speed</span>
              </div>

              {/* SVG Circular Ring Gauge */}
              <div className="flex justify-center items-center my-4 relative z-10">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#score-gradient)"
                    strokeWidth="7"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 72) / 100}
                    strokeLinecap="square"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]"
                  />
                  <defs>
                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ba1a1a" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-display-xl text-4xl font-extrabold text-on-surface tracking-tighter">72</span>
                  <span className="text-[10px] font-label-mono text-outline uppercase font-bold tracking-wider">/ 100</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex justify-between items-center text-[11px] font-label-mono text-outline border-t border-outline-variant/30 pt-3">
                  <span>MOBILE: <strong className="text-on-surface font-bold">68</strong></span>
                  <span>DESKTOP: <strong className="text-on-surface font-bold">82</strong></span>
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-1">
                  <div className="w-full px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-none text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    Needs Improvement
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-none p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-label-mono text-[10px] text-outline uppercase tracking-widest font-bold">Total Scans</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">Continuous analysis</p>
                    </div>
                    <div className="w-8 h-8 bg-primary/5 rounded-none flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-sm">radar</span>
                    </div>
                  </div>
                  <div className="font-headline-lg text-4xl text-on-surface mb-2 tracking-tight">1,248</div>
                  <div className="inline-flex font-body-sm text-[11px] text-emerald-600 dark:text-emerald-400 items-center gap-1 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-none border border-emerald-500/20">
                    <span className="material-symbols-outlined text-xs">trending_up</span>
                    +12% <span className="opacity-60 font-normal ml-1">vs last week</span>
                  </div>
                </div>
                
                {/* SVG Sparkline */}
                <div className="h-12 w-full mt-4 -mx-6 -mb-6 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="scans-sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,25 Q15,10 30,22 T60,8 T90,15 L100,10 L100,30 L0,30 Z"
                      fill="url(#scans-sparkline-grad)"
                    />
                    <path
                      d="M0,25 Q15,10 30,22 T60,8 T90,15 L100,10"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="10" r="2" fill="#4f46e5" />
                  </svg>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-none p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-error/5 rounded-full blur-xl group-hover:bg-error/10 transition-colors"></div>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-label-mono text-[10px] text-outline uppercase tracking-widest font-bold">Leaks Found</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">Critical vulnerabilities</p>
                    </div>
                    <div className="w-8 h-8 bg-error/5 rounded-none flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error group-hover:scale-110 transition-all duration-300">
                      <span className="material-symbols-outlined text-sm">warning</span>
                    </div>
                  </div>
                  <div className="font-headline-lg text-4xl text-on-surface mb-2 tracking-tight">24</div>
                  <div className="inline-flex font-body-sm text-[11px] text-error items-center gap-1 font-medium bg-error/10 px-2.5 py-0.5 rounded-none border border-error/20">
                    <span className="material-symbols-outlined text-xs">notification_important</span>
                    +3 <span className="opacity-60 font-normal ml-1">since yesterday</span>
                  </div>
                </div>
                
                {/* SVG Sparkline */}
                <div className="h-12 w-full mt-4 -mx-6 -mb-6 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="leaks-sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,28 L15,26 L30,18 L45,22 L60,12 L75,15 L90,8 L100,5 L100,30 L0,30 Z"
                      fill="url(#leaks-sparkline-grad)"
                    />
                    <path
                      d="M0,28 L15,26 L30,18 L45,22 L60,12 L75,15 L90,8 L100,5"
                      fill="none"
                      stroke="#ba1a1a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="5" r="2" fill="#ba1a1a" />
                  </svg>
                </div>
              </div>

              {/* Recovery Card */}
              <div className="sm:col-span-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-none p-6 shadow-2xl relative overflow-hidden group border border-slate-800">
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-label-mono text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">Estimated Monthly Recovery</h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">$4,250</span>
                      <span className="text-white/40 font-body-sm">potential uplift</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-none">
                      <span className="material-symbols-outlined text-emerald-400 text-lg">paid</span>
                      <div className="text-left">
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Recouping rate</div>
                        <div className="text-xs font-bold text-white">85.4% efficiency</div>
                      </div>
                    </div>
                    
                    <button className="px-6 py-3.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white backdrop-blur-md rounded-none border border-white/20 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-indigo-500/10">
                      <span className="material-symbols-outlined text-sm text-emerald-400">analytics</span>
                      Run Recovery Simulation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Live Swarm Monitor */}
          <section className="flex flex-col gap-sm relative">
            <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between px-2">
              <h2 className="font-headline-md text-2xl text-on-surface flex items-center gap-3 font-bold">
                Live Swarm Activity
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-50"></span>
                </span>
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-label-mono font-bold uppercase text-outline">
                <span className="opacity-40">System Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 tracking-widest font-black">Operational</span>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-none p-1 shadow-sm overflow-hidden group relative">
              <div className="bg-white rounded-none p-6 border border-outline-variant/30 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
                  {[
                    { agent: "Skeptical Analyst", status: "Active", icon: "search", progress: 65, color: "text-indigo-600 bg-indigo-50 border-indigo-100", barColor: "bg-indigo-500" },
                    { agent: "Value Researcher", status: "Simulating", icon: "compare_arrows", progress: 42, color: "text-blue-600 bg-blue-50 border-blue-100", barColor: "bg-blue-500" },
                    { agent: "Trust Auditor", status: "Checking", icon: "verified_user", progress: 88, color: "text-emerald-600 bg-emerald-50 border-emerald-100", barColor: "bg-emerald-500" },
                    { agent: "UX Specialist", status: "Optimizing", icon: "ads_click", progress: 15, color: "text-rose-600 bg-rose-50 border-rose-100", barColor: "bg-rose-500" }
                  ].map((a, i) => (
                    <div key={i} className="p-4 bg-surface-container-lowest border border-outline-variant/50 rounded-none shadow-sm hover:border-outline transition-all duration-300 hover:shadow-sm group/card flex flex-col justify-between min-h-[140px]">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-none ${a.color} border flex items-center justify-center text-sm`}>
                          <span className="material-symbols-outlined text-sm">{a.icon}</span>
                        </div>
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="12" stroke="var(--outline-variant)" strokeWidth="2.5" fill="transparent" className="opacity-20" />
                            <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.5" fill="transparent" strokeDasharray="75.4" strokeDashoffset={75.4 - (75.4 * a.progress) / 100} className={`${a.barColor.replace('bg-', 'text-')} transition-all duration-1000`} />
                          </svg>
                          <span className="absolute text-[8px] font-label-mono font-bold text-on-surface-variant">{a.progress}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-body-sm text-xs font-bold text-on-surface mb-0.5">{a.agent}</h4>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${a.progress > 50 ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                          <span className="text-[10px] text-on-surface-variant font-medium">{a.status}</span>
                        </div>
                        <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                          <div className={`${a.barColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${a.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Swarm Terminal Console */}
                <div className="bg-slate-950 rounded-none font-label-mono text-[11px] text-slate-300 shadow-2xl relative overflow-hidden group/terminal border border-slate-800">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-rose-500/90 border border-rose-600/30"></div>
                        <div className="w-3 h-3 bg-amber-500/90 border border-amber-600/30"></div>
                        <div className="w-3 h-3 bg-emerald-500/90 border border-emerald-600/30"></div>
                      </div>
                      <span className="text-slate-400 text-[10px] tracking-wider font-bold ml-2">horizons-swarm:~</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest font-black">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      live console
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-2.5 min-h-[140px] max-h-[220px] overflow-y-auto font-mono custom-scrollbar">
                    {isPro ? (
                      logs.map((log, i) => (
                        <div key={i} className={`transition-all duration-300 ${i === logs.length - 1 ? 'opacity-100' : 'opacity-50'}`}>
                          {formatLog(log)}
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 flex flex-col items-center justify-center py-6 gap-2">
                        <span className="material-symbols-outlined text-lg">lock</span>
                        <span>Upgrade to Pro to stream live simulation logs</span>
                      </div>
                    )}
                    {isPro && (
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold font-label-mono">&gt;</span>
                        <span className="animate-pulse inline-block w-2.5 h-4 bg-indigo-400 translate-y-0.5"></span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none h-6"></div>
                </div>
              </div>
              
              {/* Overlay for Free Tier */}
              {!isPro && (
                <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm z-20 flex items-center justify-center p-6 text-center transition-all duration-500">
                  <div className="bg-white dark:bg-slate-950 border border-outline-variant p-6 rounded-none max-w-sm shadow-2xl relative overflow-hidden">
                    <span className="material-symbols-outlined text-3xl text-secondary mb-3">lock</span>
                    <h3 className="font-headline-md text-on-surface mb-2 font-bold">Lock Live Console</h3>
                    <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed font-sans">
                      Swarm agent debuggers are locked on the free tier. Purchase the Pro plan to view live diagnostic feeds.
                    </p>
                    <Link href="/checkout" className="inline-block px-6 py-2.5 bg-secondary hover:bg-secondary-container text-white rounded-none font-bold text-xs uppercase tracking-widest shadow-md">
                      Upgrade to Pro
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Revenue Intelligence Forecast */}
          <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-none shadow-xl overflow-hidden relative group">
            <div className="absolute -right-24 bottom-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="p-6 border-b border-outline-variant/60 flex justify-between items-center bg-surface-container-low/20 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-bold">Revenue Intelligence</h2>
                  <p className="text-[10px] font-label-mono text-outline uppercase tracking-widest font-bold">Projected Monthly Growth</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low border border-outline-variant/30 text-[10px] font-bold rounded-none text-on-surface">
                  <span className="material-symbols-outlined text-xs text-secondary">calendar_today</span>
                  Next 30 Days
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="text-5xl font-extrabold text-on-surface tracking-tighter mb-2 font-headline-md">
                    $12,450<span className="text-xl text-outline font-normal">.00</span>
                  </div>
                  <p className="font-body-sm text-sm text-on-surface-variant max-w-md leading-relaxed">
                    Aggregated potential monthly recovery uplift from <span className="text-on-surface font-bold">24 critical leaks</span> identified across your customer journeys.
                  </p>
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Trust Barrier Removal", value: "$4,200", color: "bg-indigo-500", glow: "shadow-indigo-500/20", width: "45%" },
                    { label: "Performance Optimization", value: "$3,850", color: "bg-emerald-500", glow: "shadow-emerald-500/20", width: "38%" },
                    { label: "Messaging Clarity", value: "$4,400", color: "bg-amber-500", glow: "shadow-amber-500/20", width: "42%" }
                  ].map((item, i) => (
                    <div key={i} className="group/item">
                      <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase tracking-[0.1em]">
                        <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">{item.label}</span>
                        <span className="text-on-surface">{item.value}</span>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded-none overflow-hidden p-0.5 border border-outline-variant/30">
                        <div className={`${item.color} ${item.glow} h-full rounded-none group-hover/item:brightness-110 transition-all duration-700 relative`} style={{ width: item.width }}>
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-xs rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/40 via-white/55 to-emerald-50/20 dark:from-slate-900/40 dark:to-slate-800/20 border border-outline-variant/60 rounded-none p-6 flex flex-col items-center justify-center text-center group/card relative overflow-hidden shadow-inner backdrop-blur-sm min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent animate-pulse"></div>
                <div className="w-16 h-16 rounded-none bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-500 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-3xl text-indigo-500 animate-pulse">auto_awesome</span>
                </div>
                <h4 className="font-headline-sm text-on-surface mb-2 font-bold font-headline-md text-sm">AI Prediction Engine</h4>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 mb-2">
                  +22.4%
                </div>
                <p className="font-body-sm text-on-surface-variant text-xs mb-6 px-4 leading-relaxed max-w-[260px] font-sans">
                  Implementing proposed adjustments suggests an uplift of conversion rate on your checkout steps.
                </p>
                <Link href="/leaks" className="w-full py-3.5 bg-on-surface text-surface rounded-none font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-3 group/btn relative overflow-hidden uppercase tracking-wider border border-on-surface">
                  <span className="relative z-10">View Implementation Guide</span>
                  <span className="material-symbols-outlined text-sm relative z-10 group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <div className="flex gap-4 mt-4">
                  <Link href="/reports" className="px-6 py-3 bg-primary text-on-primary rounded-none font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-2 border border-primary">
                    <span className="material-symbols-outlined text-sm">description</span> View Reports
                  </Link>
                  <Link href="/persona-insights" className="px-6 py-3 bg-secondary text-on-secondary rounded-none font-bold text-xs hover:bg-secondary/90 transition-all flex items-center gap-2 border border-secondary">
                    <span className="material-symbols-outlined text-sm">psychology</span> Persona Insights
                  </Link>
                </div>
              </div>
            </div>

            {!isPro && (
              <div className="absolute inset-0 z-20 bg-background/50 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
                <div className="bg-white dark:bg-slate-950 p-8 md:p-10 rounded-none border border-outline-variant/80 shadow-3xl max-w-md relative overflow-hidden animate-in zoom-in-95 duration-500">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
                  <div className="w-14 h-14 rounded-none bg-indigo-500/10 flex items-center justify-center text-indigo-500 mx-auto mb-5 border border-indigo-500/20">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <h3 className="font-headline-md text-on-surface mb-2.5 font-bold animate-pulse text-lg">Unlock Revenue Intelligence</h3>
                  <p className="font-body-sm text-on-surface-variant mb-6 leading-relaxed text-xs font-sans">
                    Connect your real-time conversion data and unlock detailed revenue forecasting based on AI persona behavior.
                  </p>
                  <Link href="/checkout" className="inline-block px-8 py-3.5 bg-secondary hover:bg-secondary-container active:scale-95 text-white rounded-none font-bold text-xs uppercase tracking-wider shadow-lg border border-secondary transition-all">
                    Upgrade to Pro ($29)
                  </Link>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
