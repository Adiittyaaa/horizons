'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';
import Sidebar from '@/components/Sidebar';

const TerminalLine = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;
  return (
    <div className="flex gap-2 font-label-mono text-[10px] leading-relaxed animate-in fade-in slide-in-from-left-2 duration-300">
      <span className="text-primary opacity-50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
      <span className="text-on-surface-variant italic">{text}</span>
    </div>
  );
};

export default function Leaks() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [selectedLeak, setSelectedLeak] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  useEffect(() => {
    const logPool = [
      "Initializing AI Persona Engine...",
      "Skeptical Buyer persona active.",
      "Scanning DOM tree for trust indicators...",
      "Analyzing layout shifts in hero section...",
      "Detected regression in mobile LCP.",
      "Evaluating CTA affordance...",
      "Eye-tracking simulation: 500 agents deployed.",
      "Heatmap generation in progress...",
      "Leak identified: Missing contact transparency.",
      "Leak identified: Vague navigation labels."
    ];
    
    if (isScanning) {
      const timer = setInterval(() => {
        if (logs.length < logPool.length) {
          setLogs(prev => [...prev, logPool[prev.length]]);
        }
      }, 800);
      return () => clearInterval(timer);
    }
  }, [isScanning, logs.length]);

  const runScan = () => {
    if (isScanning) return;
    setSelectedLeak(null);
    setLogs([]);
    setScanProgress(0);
    setIsScanning(true);
  };

  const leaks = [
    { 
      priority: "CRITICAL", 
      type: "TRUST", 
      title: "Contact Transparency", 
      impact: "-18%", 
      desc: "Skeptical Buyer persona identified lack of physical address and direct phone line as a major trust barrier.", 
      persona: "🤨", 
      code: `<footer class="bg-dark p-8">\n  <!-- Error: No physical address or phone -->\n  <p>© 2024 Horizons Inc.</p>\n  <a href="/support">Help Center</a>\n</footer>`,
      fix: "Add 1-800 number and physical headquarters address to footer."
    },
    { 
      priority: "HIGH", 
      type: "PERF", 
      title: "Mobile LCP Regression", 
      impact: "-12%", 
      desc: "Impulse Evaluator persona experienced significant layout shifts (CLS > 0.15) on hero section load.",
      persona: "⚡",
      code: `<section id="hero">\n  <img src="/heavy-hero.jpg" /> <!-- LCP Delay: 3.4s -->\n  <h1>Future of SaaS</h1>\n</section>`,
      fix: "Optimize hero image with Next/Image and set priority=true."
    },
    { 
      priority: "MEDIUM", 
      type: "CONV", 
      title: "Vague Call-to-Action", 
      impact: "-7%", 
      desc: "Value Seeker persona hesitated at the 'Learn More' link structure—insufficient intent signal.",
      persona: "💸",
      code: `<div class="cta-section">\n  <a href="/features">Learn More</a> <!-- Friction: Weak signal -->\n</div>`,
      fix: "Change label to 'See Demo' or 'Start Free Trial'."
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
        <div className="w-20 h-20 border-t-2 border-primary rounded-full animate-spin absolute"></div>
      </div>
    );
  }

  if (!user) {
    return null; // redirecting
  }

  const isPro = user.isPro === true;

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col selection:bg-secondary selection:text-on-secondary">
      <Navbar />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        {/* Leaks Content */}
        <div className="lg:col-span-9 flex flex-col gap-lg">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">error</span>
                Vulnerability Scan Result
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight font-black">
                Active Conversion Leaks
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed font-sans">
                Our AI personas have identified the following friction points. Resolving these is the highest ROI action you can take.
              </p>
            </div>
            <div className="bg-surface-container-high p-4 rounded-none border border-outline-variant/50 flex flex-col gap-2 min-w-[200px]">
              <div className="flex justify-between items-center text-[10px] font-label-mono uppercase font-bold text-outline">
                <span>Scan Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-outline-variant/30 rounded-none overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
              </div>
              {isScanning ? (
                <div className="text-[10px] font-label-mono text-primary animate-pulse font-black uppercase tracking-wider">
                  AGENT SCANNING LIVE...
                </div>
              ) : (
                <button
                  onClick={runScan}
                  className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-label-mono text-primary hover:text-on-primary hover:bg-primary border border-primary/40 font-black uppercase tracking-wider py-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">refresh</span>
                  Rerun Scan
                </button>
              )}
            </div>
          </header>

          {/* Terminal Simulation View */}
          <section className="bg-slate-950 rounded-none border border-slate-800 p-6 font-label-mono shadow-2xl relative overflow-hidden h-40 flex flex-col gap-1">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-red-500"></div>
                <div className="w-2 h-2 bg-amber-500"></div>
                <div className="w-2 h-2 bg-green-500"></div>
              </div>
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest ml-4">Agent Terminal — debug@horizons.ai</span>
            </div>
            <div className="overflow-y-auto flex flex-col-reverse gap-1 pr-4 custom-scrollbar">
              {logs.slice().reverse().map((log, i) => (
                <TerminalLine key={i} text={log} />
              ))}
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>
          </section>

          {/* Leak Terminal Grid */}
          <section className="grid grid-cols-1 gap-gutter">
            {leaks.map((leak, i) => {
              const isLocked = !isPro && i > 0;
              return (
                <div 
                  key={i} 
                  className={`bg-surface-container-lowest border rounded-none p-lg transition-all duration-500 overflow-hidden group relative ${
                    selectedLeak === i ? 'border-primary ring-1 ring-primary/20 shadow-xl' : 'border-outline-variant hover:border-outline'
                  }`}
                >
                  <div className={`flex flex-col md:flex-row justify-between gap-8 transition-all ${isLocked ? 'blur-xs select-none pointer-events-none opacity-40' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-none font-label-mono text-[9px] uppercase font-black tracking-widest border ${
                          leak.priority === 'CRITICAL' ? 'bg-error/10 text-error border-error/20' : 'bg-secondary/10 text-secondary border-secondary/20'
                        }`}>
                          {leak.priority} PRIORITY
                        </span>
                        <span className="text-xl">{leak.persona}</span>
                      </div>
                      
                      <h3 className="font-headline-md text-2xl text-on-surface mb-2 group-hover:text-primary transition-colors font-bold">
                        {leak.title}
                      </h3>
                      
                      <p className="font-body-sm text-on-surface-variant mb-6 leading-relaxed max-w-xl font-sans">
                        {leak.desc}
                      </p>
   
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-label-mono text-outline uppercase font-bold tracking-tighter">Lost Revenue</span>
                          <span className="text-3xl font-display-md text-error tracking-tighter">{leak.impact}</span>
                        </div>
                        <div className="h-10 w-px bg-outline-variant/30"></div>
                        <button 
                          onClick={() => setSelectedLeak(selectedLeak === i ? null : i)}
                          className="px-6 py-3 bg-surface-container-high rounded-none text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2"
                        >
                          {selectedLeak === i ? 'Close Inspector' : 'Inspect Codebase'}
                          <span className={`material-symbols-outlined text-sm transition-transform ${selectedLeak === i ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>
                      </div>
                    </div>

                    {/* Minified Terminal Preview */}
                    <div className="w-full md:w-80 bg-slate-950 rounded-none p-6 font-label-mono text-[11px] text-green-400/80 border border-slate-800 shadow-inner flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-slate-800"></div>
                          <div className="w-2 h-2 bg-slate-800"></div>
                          <div className="w-2 h-2 bg-slate-800"></div>
                        </div>
                        <span className="text-slate-600 text-[9px] uppercase tracking-tighter">Source View</span>
                      </div>
                      <code className="block whitespace-pre opacity-90 leading-relaxed">
                        {leak.code.split('\n').map((line, idx) => (
                          <div key={idx} className="flex gap-4">
                            <span className="text-slate-700 w-4 select-none">{idx + 1}</span>
                            <span className={line.includes('Error') || line.includes('Friction') ? 'text-error' : ''}>{line}</span>
                          </div>
                        ))}
                      </code>
                      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between opacity-50">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs">history</span>
                          <span>Detected 12h ago</span>
                        </div>
                        <span className="text-primary font-bold">LIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Lock Screen Overlay for Free users on secondary cards */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-10 transition-all">
                      <div className="bg-white dark:bg-slate-950 p-6 border border-outline-variant shadow-2xl max-w-sm rounded-none">
                        <span className="material-symbols-outlined text-3xl text-secondary mb-3">lock</span>
                        <h4 className="font-headline-md text-on-surface mb-1 font-bold text-sm">Unlock Detailed Leaks</h4>
                        <p className="font-sans text-[11px] text-on-surface-variant mb-4 leading-relaxed">
                          Detailed audits for this {leak.priority.toLowerCase()} friction leak are locked on the Free tier.
                        </p>
                        <Link href="/checkout" className="inline-block px-5 py-2.5 bg-secondary hover:bg-secondary-container text-white font-bold text-xs uppercase tracking-widest transition-all">
                          Upgrade to Pro ($29)
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Expanded Debugger Section */}
                  {selectedLeak === i && isPro && (
                    <div className="mt-8 pt-8 border-t border-outline-variant/30 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="space-y-6">
                        <h4 className="font-bold text-sm text-primary uppercase tracking-widest flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-secondary">terminal</span>
                          Diagnostic Report
                        </h4>
                        <div className="bg-surface-container-high rounded-none p-6 space-y-4 border border-outline-variant/30 text-sm">
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 rounded-none">01</div>
                            <div className="space-y-1">
                              <p className="font-bold text-on-surface">Identify Target Element</p>
                              <p className="text-xs text-on-surface-variant font-sans">The agent flagged line {leak.code.split('\n').length - 1} as a high-friction zone for the Skeptical Buyer persona.</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 rounded-none">02</div>
                            <div className="space-y-1">
                              <p className="font-bold text-on-surface">Recommended Fix</p>
                              <p className="text-xs text-on-surface-variant font-sans">{leak.fix}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 rounded-none">03</div>
                            <div className="space-y-1">
                              <p className="font-bold text-on-surface">Simulate Variation</p>
                              <p className="text-xs text-on-surface-variant font-sans">Predicted conversion uplift: <span className="text-secondary font-bold">+4.2%</span> post-deployment.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface-container-low rounded-none p-8 border border-outline-variant/30 flex flex-col justify-center items-center text-center group/cta">
                        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-none flex items-center justify-center mb-6 group-hover/cta:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-3xl">auto_fix</span>
                        </div>
                        <p className="text-sm text-on-surface-variant italic mb-8 max-w-xs font-sans">"Fixing this leak is equivalent to scaling your ad spend by <span className="text-secondary font-bold">12%</span> for free."</p>
                        <button className="w-full py-4 bg-on-surface text-surface rounded-none font-bold text-sm hover:bg-primary hover:text-on-primary transition-all shadow-xl flex items-center justify-center gap-3">
                          Apply Fix via Command Center
                          <span className="material-symbols-outlined text-sm">rocket_launch</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Eye Tracking Section */}
          <section className="bg-surface-container-high rounded-none p-8 border border-outline-variant relative overflow-hidden flex flex-col lg:flex-row items-center gap-8">
            <div className={`flex-1 space-y-6 relative z-10 transition-all duration-500 ${!isPro ? 'blur-xs select-none pointer-events-none opacity-45' : ''}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-none font-label-mono text-[10px] font-black uppercase tracking-widest border border-secondary/20">
                <span className="material-symbols-outlined text-sm">visibility</span>
                Attention Engine v2.0
              </div>
              <h2 className="font-display-md text-4xl text-primary tracking-tight font-bold">Predictive Heatmaps</h2>
              <p className="font-body-md text-on-surface-variant max-w-md leading-relaxed font-sans text-sm">
                We simulate thousands of browsing sessions to predict exactly where your visitors' attention drops.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { label: "Fixation Intensity", value: "88%", color: "bg-secondary" },
                  { label: "Saccade Pathing", value: "42%", color: "bg-error" },
                  { label: "Readability Score", value: "65%", color: "bg-secondary" },
                  { label: "Cognitive Load", value: "72%", color: "bg-amber-500" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-none p-4 border border-white/10 space-y-2">
                    <div className="flex justify-between font-label-mono text-[9px] uppercase font-bold text-outline">
                      <span>{stat.label}</span>
                      <span className="text-on-surface">{stat.value}</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-none overflow-hidden">
                      <div className={`h-full rounded-none ${stat.color}`} style={{ width: stat.value }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`flex-1 w-full aspect-video bg-slate-950 rounded-none border border-slate-800 shadow-3xl overflow-hidden relative group transition-all duration-500 ${!isPro ? 'blur-xs select-none pointer-events-none opacity-45' : ''}`}>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-[3000ms] group-hover:scale-105"></div>
              
              {/* Animated Scanline */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-20 w-full animate-scan pointer-events-none"></div>

              {/* Dynamic Heatmap Overlays */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/40 rounded-full blur-[60px] animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-500/30 rounded-full blur-[70px] delay-700 animate-pulse"></div>
              <div className="absolute top-1/2 right-1/2 w-20 h-20 bg-blue-500/20 rounded-full blur-[40px] delay-1000 animate-pulse"></div>
              
              {isPro && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700 p-8 rounded-none text-center shadow-2xl relative overflow-hidden group/overlay max-w-xs">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
                    <div className="font-label-mono text-[10px] text-secondary uppercase font-black tracking-widest mb-3">Skeptical Buyer Simulation</div>
                    <div className="text-white font-display-sm text-lg mb-6">Attention drop detected at price section.</div>
                    <button className="w-full py-3 bg-white text-slate-950 rounded-none text-xs font-bold transition-all hover:bg-secondary hover:text-white flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Rerun Simulation
                    </button>
                  </div>
                </div>
              )}

              {/* Digital Grid Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>

            {/* Lock Screen Overlay for Free users on heatmaps */}
            {!isPro && (
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="bg-white dark:bg-slate-950 p-8 border border-outline-variant shadow-2xl max-w-sm rounded-none">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-3">lock</span>
                  <h4 className="font-headline-md text-on-surface mb-2 font-bold">Predictive Heatmaps Locked</h4>
                  <p className="font-sans text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Swarm eye-tracking and cognitive layout heatmaps are locked on the Free tier. Upgrade to full Pro access.
                  </p>
                  <Link href="/checkout" className="inline-block px-6 py-3 bg-secondary hover:bg-secondary-container text-white font-bold text-xs uppercase tracking-widest shadow-md">
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
