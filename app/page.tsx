"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  const router = useRouter();
  
  // Scan Form States
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!domain.trim()) {
      setError("Please enter a website domain to audit.");
      return;
    }

    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+.*$/;
    if (!domainRegex.test(domain)) {
      setError("Please enter a valid website URL (e.g., mysite.com).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Direct user to progress page with url query parameter
      router.push(`/progress?url=${encodeURIComponent(domain.trim())}`);
    }, 1500);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Horizons AI",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered behavioral intelligence platform that simulates user behavior to detect conversion leaks.",
    "offers": {
      "@type": "Offer",
      "price": "29.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white font-body-md antialiased selection:bg-secondary selection:text-on-secondary relative overflow-hidden">
      
      {/* Floating Background Orbs / Effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-orb-1 -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-orb-2 -z-10"></div>
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <main className="flex-grow pt-[100px]">
        
        {/* 1. HERO SECTION & SCAN FORM */}
        <section id="hero" className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
          {/* Left Column: Headline & Form */}
          <div className="flex-1 space-y-8 z-10 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-slate-900 border border-slate-800 text-secondary font-label-mono text-[10px] uppercase tracking-widest animate-fade-in-up">
              <span className="material-symbols-outlined text-[16px] text-secondary">psychology_alt</span>
              BEHAVIORAL SWARM INTELLIGENCE
            </div>
            
            <h1 className="font-display-xl text-display-xl md:text-[4.5rem] leading-[1.05] tracking-tight font-black text-white">
              Why do visitors leave <br />
              without buying? Let <br />
              <span className="bg-gradient-to-r from-secondary-container via-secondary to-indigo-400 bg-clip-text text-transparent italic">Horizons</span> audit it.
            </h1>
            
            <p className="font-body-lg text-body-lg text-slate-400 max-w-xl leading-relaxed">
              Stop guessing why your landing page bounces. Our AI personas simulate thousands of distinct user journeys to uncover trust gaps, cognitive friction spikes, and hidden revenue leaks in seconds.
            </p>

            {/* Scan Form */}
            <div className="w-full max-w-xl">
              <form onSubmit={handleScanSubmit} className="flex flex-col sm:flex-row gap-3 bg-slate-900/60 p-2 border border-slate-800 rounded-none shadow-2xl backdrop-blur-md">
                <div className="flex-grow flex items-center px-4 gap-2 min-h-[50px]">
                  <span className="material-symbols-outlined text-slate-500 text-[20px]">language</span>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter your website URL (e.g. mysite.com)"
                    disabled={loading}
                    className="w-full bg-transparent text-white font-body-md text-sm border-none focus:outline-none focus:ring-0 placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-secondary text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-secondary-container transition-all active:scale-95 flex items-center justify-center gap-2 rounded-none min-h-[50px] border border-secondary"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      SCANNING...
                    </>
                  ) : (
                    <>
                      RUN FREE AUDIT
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
              
              {/* Error Message */}
              {error && (
                <div className="text-error font-semibold text-xs tracking-wider uppercase mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {error}
                </div>
              )}

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 mt-4 text-[10px] font-label-mono text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-secondary">check_circle</span> ✓ Free scan</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-secondary">check_circle</span> ✓ 60 seconds</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs text-secondary">check_circle</span> ✓ No credit card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Dashboard Mockup Preview */}
          <div className="flex-1 w-full z-10 flex justify-center items-center">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 p-2 shadow-2xl rounded-none relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-secondary to-indigo-500 opacity-20 blur-sm rounded-none -z-10"></div>
              
              {/* Browser Header */}
              <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 bg-green-500/80"></div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 px-3 py-0.5 text-[9px] text-slate-400 font-label-mono w-2/3 truncate text-center">
                  horizons.ai/report/preview
                </div>
                <div className="w-4"></div>
              </div>

              {/* Simulated Dashboard Contents */}
              <div className="bg-slate-950 p-6 flex flex-col gap-6 font-sans">
                {/* Score Widget */}
                <div className="flex justify-between items-center bg-slate-900/40 border border-slate-800 p-4 rounded-none">
                  <div>
                    <h3 className="font-label-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">Conversion Score</h3>
                    <p className="text-xl font-bold font-headline-md text-white mt-1">Behavioral Rating</p>
                  </div>
                  <div className="w-14 h-14 border-4 border-amber-500/30 flex items-center justify-center font-black text-xl text-white rounded-full">
                    72
                  </div>
                </div>

                {/* AI Sentiment Analysis Box */}
                <div className="space-y-3">
                  <h4 className="font-label-mono text-[9px] uppercase tracking-widest text-slate-500 font-bold">Persona Sentiments</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-none">
                      <div className="flex justify-between text-[9px] text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>🤨 Skeptic</span>
                        <span className="text-error font-black">HIGH RISK</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-error w-4/5"></div>
                      </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-none">
                      <div className="flex justify-between text-[9px] text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>💸 Value Seeker</span>
                        <span className="text-amber-500 font-black">MED RISK</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leaks Feed */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-none space-y-3 font-mono text-[10px] leading-relaxed">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold">Swarm Diagnostics</span>
                    <span className="text-secondary font-black animate-pulse">LIVE FEED</span>
                  </div>
                  <div className="text-slate-300 flex items-start gap-2">
                    <span className="text-secondary font-bold">&gt;</span>
                    <span>Persona [Skeptical Buyer] flagged missing SSL certificate transparency.</span>
                  </div>
                  <div className="text-slate-300 flex items-start gap-2">
                    <span className="text-secondary font-bold">&gt;</span>
                    <span>Revenue Impact Estimate: <strong className="text-error">$4,250 monthly loss</strong> detected.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SOCIAL PROOF SECTION */}
        <section className="py-16 border-t border-b border-slate-900 bg-slate-950/80 flex flex-col items-center gap-12 relative">
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Logo Cloud Left */}
            <div className="flex flex-col gap-4 max-w-md">
              <p className="font-label-mono text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">TRUSTED BY MODERN TEAMS</p>
              <h2 className="text-2xl font-bold font-headline-md tracking-tight">Horizons helps optimize funnels at high-velocity growth hubs.</h2>
              <div className="flex flex-wrap gap-8 items-center opacity-40 grayscale mt-2">
                {['VOLT', 'AETHER', 'NEXUS', 'SYNERGY', 'LUMINA'].map((l) => (
                  <span key={l} className="text-lg font-black tracking-tighter text-slate-400 hover:text-white transition-colors">{l}</span>
                ))}
              </div>
            </div>

            {/* Growth Stats Right */}
            <div className="grid grid-cols-2 gap-8 lg:min-w-[450px]">
              {[
                { val: "1.2M+", label: "Journeys Simulated" },
                { val: "$47M+", label: "Revenue Leaks Uncovered" },
                { val: "24/7", label: "Concurrent Swarm Scanning" },
                { val: "4.5x", label: "Average Funnel Conversion Uplift" }
              ].map((s, i) => (
                <div key={i} className="border-l border-secondary pl-4 py-2">
                  <div className="text-3xl font-black font-display-xl text-white tracking-tighter">{s.val}</div>
                  <div className="text-[10px] font-label-mono text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 3. PROBLEM VS SOLUTION */}
        <section id="problem-solution" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-900">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">METHODOLOGY COMPARISON</span>
            <h2 className="font-display-lg text-display-lg text-white font-bold leading-tight">Traditional Analytics Tell You What, Horizons Tells You Why.</h2>
            <p className="font-body-md text-slate-400">Heatmaps and analytics show drop-offs. Horizons swarms simulate human psychology to identify key conversion blockers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="border border-slate-900 bg-slate-900/30 p-8 rounded-none flex flex-col gap-6">
              <div className="w-12 h-12 bg-error/10 text-error flex items-center justify-center rounded-none font-bold">
                <span className="material-symbols-outlined text-2xl">cancel</span>
              </div>
              <h3 className="font-headline-md text-2xl font-bold text-white">The Legacy Approach</h3>
              <ul className="space-y-4 text-slate-400 font-sans text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-error font-bold">✕</span>
                  <span><strong>Expensive user tests:</strong> Recruiting panels takes weeks and costs thousands.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error font-bold">✕</span>
                  <span><strong>Noisy post-hoc data:</strong> Analytics tell you *where* they left, not *why* they hesitated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-error font-bold">✕</span>
                  <span><strong>Unfiltered feedback:</strong> Manual spreadsheets with generic answers that are hard to act on.</span>
                </li>
              </ul>
            </div>

            {/* The Horizons Way */}
            <div className="border border-secondary/50 bg-secondary/5 p-8 rounded-none flex flex-col gap-6 relative">
              <div className="absolute top-0 right-0 bg-secondary text-white font-label-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">PROVEN INCREASE</div>
              <div className="w-12 h-12 bg-secondary/15 text-secondary flex items-center justify-center rounded-none font-bold">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <h3 className="font-headline-md text-2xl font-bold text-white">The Horizons Approach</h3>
              <ul className="space-y-4 text-slate-300 font-sans text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong>Instant Swarm Deployment:</strong> Test page variants with 1,000+ personas in under 60 seconds.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong>Psychological Audit:</strong> Uncover cognitive overload, trust leaks, and confusion triggers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold">✓</span>
                  <span><strong>Actionable Fix Code:</strong> Receive copy and code suggestions that can be applied immediately.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS (4-STEP TIMELINE) */}
        <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-900">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">STEP-BY-STEP SIMULATION</span>
            <h2 className="font-display-lg text-display-lg text-white font-bold">How Swarm Intelligence Audits Your Funnel</h2>
            <p className="font-body-md text-slate-400">A rigorous 4-step sequence simulating cognitive profiles at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Timeline connectors (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-slate-800 -z-10"></div>
            
            {[
              { num: "01", title: "Crawl & Map", icon: "data_exploration", desc: "Input URL to map all layouts, elements, forms, and paths." },
              { num: "02", title: "Deploy Personas", icon: "group_add", desc: "Deploy Value Seekers, Skeptics, and Clickers." },
              { num: "03", title: "Track Behavior", icon: "troubleshoot", desc: "Calculate eye-tracking, hover spikes, and LCP lag." },
              { num: "04", title: "Apply Diagnostics", icon: "rocket_launch", desc: "Get specific copy/code recommendations to fix leaks." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-start p-6 bg-slate-900/30 border border-slate-900 rounded-none group hover:border-slate-800 transition-all relative">
                <div className="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-secondary mb-6 group-hover:scale-105 transition-transform font-bold">
                  <span className="material-symbols-outlined text-xl">{step.icon}</span>
                </div>
                <div className="absolute top-6 right-6 text-3xl font-black font-display-xl text-slate-800/80">{step.num}</div>
                <h3 className="font-headline-md text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="font-body-sm text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SYNTHETIC VISITORS SHOWCASE */}
        <section id="synthetic-visitors" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-900">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">AI COGNITIVE PROFILES</span>
            <h2 className="font-display-lg text-display-lg text-white font-bold">Meet Your Swarm Personas</h2>
            <p className="font-body-md text-slate-400">Our simulation engine runs audits against four core psychological user segments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🤨",
                name: "Skeptical Buyer",
                traits: "Seeks social proof, security badges, headquarter address. High trust barrier.",
                leakTrigger: "Missing headquarter address, stock photos, no refund transparency.",
                impact: "High risk"
              },
              {
                icon: "⚡",
                name: "Impulse Evaluator",
                traits: "Decides in seconds, visually driven. Needs an obvious value prop and CTA above the fold.",
                leakTrigger: "Slow LCP paint, buried CTA, walls of text before the fold.",
                impact: "High risk"
              },
              {
                icon: "💸",
                name: "Value Seeker",
                traits: "Compares price tables, calculates ROI margins. Focuses on refund guarantee.",
                leakTrigger: "Hidden fees, vague feature tiers, complex upgrade path.",
                impact: "Medium risk"
              },
              {
                icon: "🏢",
                name: "Enterprise Evaluator",
                traits: "Weighs compliance, SSO, and scale. Reads docs over marketing before committing budget.",
                leakTrigger: "No SOC2 badges, missing API docs, hidden 'Contact Sales' gates.",
                impact: "Medium risk"
              }
            ].map((p, i) => (
              <div key={i} className="bg-slate-900/30 border border-slate-900 rounded-none p-6 flex flex-col justify-between hover:border-slate-800 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-4xl">{p.icon}</span>
                    <span className={`text-[8px] font-label-mono uppercase px-2 py-0.5 border font-bold ${
                      p.impact === 'High risk' ? 'bg-error/10 text-error border-error/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>{p.impact}</span>
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.traits}</p>
                </div>
                <div className="pt-4 border-t border-slate-800/60 mt-4">
                  <div className="text-[9px] font-label-mono text-slate-500 uppercase font-bold tracking-wider mb-1">Conversion Block Trigger</div>
                  <p className="text-slate-300 text-xs leading-relaxed italic">"{p.leakTrigger}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FEATURES BENTO GRID (INCORPORATING FEATURES COMPONENT) */}
        <Features />

        {/* 7. DASHBOARD PREVIEW SHOWCASE */}
        <section id="dashboard-preview" className="py-24 px-6 bg-slate-950 border-t border-b border-slate-900 relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Column: Preview Details */}
            <div className="flex-1 space-y-6">
              <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">PRODUCT DEEP DIVE</span>
              <h2 className="font-display-lg text-display-lg text-white font-bold leading-tight">Interactive Diagnostic Workspace</h2>
              <p className="font-body-md text-slate-400 leading-relaxed">
                Connect your conversion funnels to explore detailed behavioral audits. Inspect marked layouts, view predicted attention drop spots, read sentiment metrics, and execute fixes directly through our command editor.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/15 text-secondary flex items-center justify-center font-bold rounded-none">1</div>
                  <div>
                    <h4 className="text-white text-sm font-bold">Predictive Heatmap Gaze Paths</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Visually track where attention drops off and identify structural layout leaks.</p>
                  </div>
                </div>
                <div className="h-px w-full bg-slate-900"></div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary/15 text-secondary flex items-center justify-center font-bold rounded-none">2</div>
                  <div>
                    <h4 className="text-white text-sm font-bold">Automated Code Diagnostics</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Receive direct code edits to copy, image render configurations, or element classes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Mockup Card */}
            <div className="flex-1 w-full relative">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-none space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">visibility</span>
                    <h3 className="font-headline-md text-lg font-bold text-white">Attention Heatmap Auditing</h3>
                  </div>
                  <span className="text-[9px] font-label-mono text-slate-500 uppercase tracking-widest font-black">Simulation Completed</span>
                </div>

                {/* Grid representing site mockup inside dashboard */}
                <div className="aspect-video bg-slate-950 border border-slate-800 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Heatmap color spots */}
                  <div className="absolute top-[20%] left-[30%] w-20 h-20 bg-error/35 rounded-full blur-[40px] animate-pulse"></div>
                  <div className="absolute bottom-[30%] right-[25%] w-28 h-28 bg-amber-500/20 rounded-full blur-[50px] animate-pulse delay-700"></div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between font-mono text-[10px] text-slate-400 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="w-16 h-3 bg-slate-800"></div>
                        <div className="w-24 h-2 bg-slate-800"></div>
                      </div>
                      <span className="text-error font-black px-1.5 py-0.5 bg-error/10 border border-error/20 text-[8px]">BOUNCE SPOT</span>
                    </div>
                    
                    <div className="w-full flex justify-center">
                      <div className="bg-slate-900/95 border border-slate-800 p-4 rounded-none text-center max-w-xs pointer-events-auto">
                        <h4 className="text-white text-xs font-bold font-sans">Headline Friction Detected</h4>
                        <p className="text-slate-400 text-[9px] font-sans mt-1">Value proposition lacks target segment intent markers.</p>
                      </div>
                    </div>
                    
                    <div className="h-4 bg-slate-800 w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <Testimonials />

        {/* 9. HOMEPAGE PRICING SECTION */}
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-900">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">SIMPLE TRANSPARENT PRICING</span>
            <h2 className="font-display-lg text-display-lg text-white font-bold leading-tight">One Price. Complete Funnel Intelligence.</h2>
            <p className="font-body-md text-slate-400">Run basic scans for free or upgrade to Precision tier to unlock full behavioral intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-none flex flex-col justify-between relative group hover:border-slate-800 transition-all">
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-md text-2xl font-bold text-white">Free Scan</h3>
                  <p className="text-slate-400 text-xs mt-1">Basic conversion analysis</p>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black font-display-xl text-white tracking-tighter">$0</span>
                  <span className="text-xs font-label-mono text-slate-500 uppercase tracking-widest">Free tier</span>
                </div>
                
                <p className="text-slate-300 text-xs leading-relaxed">
                  Analyze your site and review overall conversion score metrics. Identify basic layout friction indicators.
                </p>

                <ul className="space-y-3 font-sans text-xs text-slate-400 pt-4 border-t border-slate-850">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> Basic Conversion Score
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> Limit: 1 Scan per domain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-600">✕</span> Locked: Full Leaks Detail
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-slate-600">✕</span> Locked: Persona Insight Reports
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-850 w-full">
                <Link href="/progress" className="block w-full py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-center font-bold text-xs uppercase tracking-widest text-white transition-all rounded-none">
                  RUN FREE SCAN
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 border border-secondary p-8 rounded-none flex flex-col justify-between relative shadow-2xl">
              <div className="absolute top-0 right-0 bg-secondary text-white font-label-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">ONE-TIME ACCESS</div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline-md text-2xl font-bold text-white">Precision Report</h3>
                  <p className="text-secondary text-xs mt-1 font-bold">Full conversion intelligence</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black font-display-xl text-white tracking-tighter">$29</span>
                  <span className="text-xs font-label-mono text-secondary uppercase tracking-widest">USD / Site scan</span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  Unlock the full audit report with all trust, performance, and conversion leaks. View target code details and apply suggested recommendations.
                </p>

                <ul className="space-y-3 font-sans text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> Complete Conversion Score Breakdown
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> All Critical, High, Medium Leaks Unlocked
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> Diagnostic Code Inspector View
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> 4 AI Persona Simulation Sentiment Analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span> Estimated Monthly Uplift Forecast
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 w-full">
                <Link href="/checkout" className="block w-full py-4 bg-secondary hover:bg-secondary-container text-center font-bold text-xs uppercase tracking-widest text-white transition-all rounded-none shadow-xl border border-secondary">
                  UPGRADE TO PRO ($29)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FAQ ACCORDION */}
        <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">ANSWERS & CLARITY</span>
            <h2 className="font-display-lg text-display-lg text-white font-bold">Frequently Asked Questions</h2>
            <p className="font-body-md text-slate-400">Everything you need to know about the Horizons simulation engine.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How is Horizons different from Google Lighthouse or Hotjar?",
                a: "Lighthouse benchmarks loading performance, and Hotjar charts past visitor heatmaps. Horizons uses trained AI personas to simulate future visitor interactions, analyzing layout, copy hierarchy, trust badges, and decision friction points before you buy ads."
              },
              {
                q: "Do I need to install any script or snippet?",
                a: "No script installations are required for the initial free audit. Our remote browser crawlers evaluate the public layout code. An advanced API key and CLI integration are available for premium subscribers checking dev servers."
              },
              {
                q: "What types of frameworks and setups do you audit?",
                a: "Our swarm engines support Next.js, React, Vue, Webflow, Shopify, HTML templates, and complex single-page apps. If it runs in a headless Chromium browser, our swarm personas can navigate and simulate it."
              },
              {
                q: "How are the AI swarm personas modeled?",
                a: "Our swarm agents leverage models trained on conversion benchmark sheets, cognitive psychology guidelines, and layout friction databases. They act as Value Seekers, Impulse Buyers, Skeptics, or detail audit analysts."
              }
            ].map((item, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="border border-slate-900 bg-slate-900/30 rounded-none overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-6 group hover:bg-slate-900/60 transition-colors"
                  >
                    <h3 className="font-bold text-sm text-white group-hover:text-secondary transition-colors leading-tight">{item.q}</h3>
                    <span className={`material-symbols-outlined text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-slate-900/60' : 'max-h-0'
                  }`}>
                    <p className="p-6 text-xs text-slate-400 leading-relaxed font-sans">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 max-w-5xl mx-auto text-center">
          <div className="bg-slate-900 border border-slate-800 p-12 md:p-20 rounded-none relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <h2 className="font-display-lg text-display-lg mb-6 leading-tight font-bold">Secure Your Leak Audit</h2>
            <p className="font-body-lg text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
              Find out what is blocking your visitors in under 60 seconds. Simple one-click execution.
            </p>
            <Link href="/progress" className="px-10 py-4 bg-secondary hover:bg-secondary-container text-white font-bold text-xs uppercase tracking-widest transition-all rounded-none inline-block border border-secondary shadow-lg active:scale-95">
              ANALYZE MY LANDING PAGE
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
