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

  useEffect(() => {
    const duration = 10000; // 10 seconds for a premium feel
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
      const currentProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      const status = statuses.reverse().find(s => currentProgress >= s.threshold);
      if (status) setCurrentStatus(status.text);
      statuses.reverse(); // put back for next loop

      if (currentStep >= steps) {
        clearInterval(interval);
        // Automatically log in as guest for a seamless demo experience
        login('guest@horizons.ai');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [router]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased overflow-hidden relative">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-md md:p-lg pt-[100px] relative z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] animate-slow-spin"></div>
        </div>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
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
                <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-container-high" />
                <circle 
                  cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" 
                  className="text-secondary transition-all duration-300 ease-out"
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="text-display-xl font-display-xl text-primary tracking-tighter transition-all duration-300 group-hover:scale-110">
                  {progress}%
                </div>
                <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-2">Scanning DNA</div>
              </div>
            </div>
          </div>

            {/* High-Tech Terminal Command Center */}
            <div className="bg-[#0f172a] rounded-[2rem] border border-slate-800 shadow-2xl p-lg flex flex-col gap-md relative overflow-hidden h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]"></div>
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-md">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                  </div>
                  <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest ml-2">Behavioral_Swarm_Engine_v4.0</span>
                </div>
                <div className="font-label-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
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
                  <span>Swarm deployed to <span className="text-blue-400">nexusdata.io/home</span></span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[{ (progress * 0.1).toFixed(2) }s]</span>
                  <span className="text-red-400">[Skeptical Buyer]</span>
                  <span className="text-slate-300">Evaluating Social Proof density... Found 2 testimonials. Insufficient verification detected.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-500">[{ (progress * 0.12).toFixed(2) }s]</span>
                  <span className="text-secondary">[Value Seeker]</span>
                  <span className="text-slate-300">Scanning pricing table. ROI calculator interaction successful. Data accuracy: 98%.</span>
                </div>
                {progress > 30 && (
                  <div className="flex gap-3">
                    <span className="text-slate-500">[{ (progress * 0.15).toFixed(2) }s]</span>
                    <span className="text-amber-400">[Impulse Evaluator]</span>
                    <span className="text-slate-300">Bounce risk detected at 'Feature Grid'. Layout complexity &gt; 65%.</span>
                  </div>
                )}
                {progress > 60 && (
                  <div className="flex gap-3">
                    <span className="text-slate-500">[{ (progress * 0.18).toFixed(2) }s]</span>
                    <span className="text-purple-400">[Enterprise Eval]</span>
                    <span className="text-slate-300">Searching for SOC2/ISO 27001 markers. Result: <span className="text-red-500">NOT FOUND</span> in Footer.</span>
                  </div>
                )}
                <div className="animate-pulse text-emerald-500 mt-4 flex gap-2">
                  <span>{'>'}</span>
                  <span className="w-2 h-4 bg-emerald-500"></span>
                </div>
              </div>

              <div className="pt-md border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-label-mono">
                <div className="flex gap-4">
                  <span>LATENCY: 8ms</span>
                  <span>MEMORY: 1.4GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
