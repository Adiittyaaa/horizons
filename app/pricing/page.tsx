"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';

export default function Pricing() {
  const { user } = useAuth();
  const isPro = user?.isPro === true;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white font-body-md antialiased selection:bg-secondary selection:text-on-secondary relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 pt-[140px] max-w-7xl mx-auto gap-12 text-center w-full z-10">
        
        <header className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-slate-900 border border-slate-800 text-secondary font-label-mono text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
            PRICING OPTIONS
          </div>
          <h1 className="font-display-xl text-display-xl md:text-6xl text-white font-black">Choose Your Plan</h1>
          <p className="font-body-md text-slate-400 max-w-lg mx-auto">
            Audit your landing page conversion tunnels. Pick the free basic score or upgrade to full intelligence.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl text-left">
          {/* Free Tier */}
          <div className={`border p-8 rounded-none flex flex-col justify-between hover:border-slate-800 transition-all ${
            user && !isPro 
              ? 'bg-slate-900 border-secondary' 
              : 'bg-slate-900/30 border-slate-900'
          }`}>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-headline-lg text-2xl font-bold text-white">Free Scan</h2>
                {user && !isPro && (
                  <span className="bg-secondary/10 text-secondary border border-secondary/20 text-[9px] font-label-mono uppercase tracking-widest px-2.5 py-0.5 font-bold">
                    Active Plan
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Limited evaluation of your public-facing domain structure.
              </p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-display-xl text-white">$0</span>
                <span className="text-[10px] font-label-mono text-slate-500 uppercase tracking-widest">Free scan</span>
              </div>

              <ul className="space-y-3 font-sans text-xs text-slate-400 pt-6 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Overall Conversion Rating
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

            <div className="pt-8">
              {user && !isPro ? (
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-6 py-4 bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-widest rounded-none"
                >
                  GO TO DASHBOARD
                </Link>
              ) : (
                <Link
                  href="/progress"
                  className="block w-full text-center px-6 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-none transition-colors"
                >
                  RUN FREE SCAN
                </Link>
              )}
            </div>
          </div>

          {/* Pro Tier */}
          <div className={`border p-8 rounded-none flex flex-col justify-between relative shadow-2xl ${
            isPro 
              ? 'bg-slate-900 border-secondary' 
              : 'bg-slate-900 border-slate-800'
          }`}>
            {isPro && (
              <div className="absolute top-0 right-0 bg-secondary text-white font-label-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold">
                ACTIVE PLAN
              </div>
            )}
            
            <div className="space-y-6">
              <h2 className="font-headline-lg text-2xl font-bold text-white">Precision Report</h2>
              <p className="text-xs text-slate-400">
                Full funnel analysis containing detailed trust audits and AI persona journeys.
              </p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-display-xl text-white">$29</span>
                <span className="text-[10px] font-label-mono text-secondary uppercase tracking-widest">USD / SCAN</span>
              </div>

              <ul className="space-y-3 font-sans text-xs text-slate-300 pt-6 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Complete Conversion Score Breakdown
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Unlocked: All Critical, High, Medium Leaks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Diagnostic Code Inspector View
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> 4 AI Persona Simulation Sentiments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary">✓</span> Revenue Recovery uplift forecast
                </li>
              </ul>
            </div>

            <div className="pt-8">
              {isPro ? (
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-6 py-4 bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-widest rounded-none"
                >
                  GO TO DASHBOARD
                </Link>
              ) : (
                <Link
                  href="/checkout"
                  className="block w-full text-center px-6 py-4 bg-secondary hover:bg-secondary-container text-white font-bold text-xs uppercase tracking-widest rounded-none shadow-lg border border-secondary transition-all active:scale-95"
                >
                  UPGRADE TO PRO ($29)
                </Link>
              )}
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-[10px] font-label-mono uppercase tracking-widest">
          No credit card required for the free scan. Upgrade anytime for full insights.
        </p>
      </main>
      <Footer />
    </div>
  );
}
