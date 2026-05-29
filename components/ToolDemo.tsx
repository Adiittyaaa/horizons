"use client";

import React from 'react';

export default function ToolDemo() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-20 relative group">
      {/* Decorative Glows */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      {/* Browser Mockup */}
      <div className="bg-surface-container-lowest p-2 rounded-[2.5rem] border border-outline-variant shadow-2xl backdrop-blur-3xl bg-opacity-80 overflow-hidden">
        <div className="bg-[#0f172a] rounded-[2rem] overflow-hidden aspect-video relative flex flex-col">
          
          {/* Browser Header */}
          <div className="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex items-center justify-between z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 px-4 py-1 rounded-lg flex items-center gap-2 w-1/2">
              <span className="material-symbols-outlined text-[14px] text-slate-500">lock</span>
              <div className="text-[11px] text-slate-400 font-label-mono overflow-hidden whitespace-nowrap">
                <span className="animate-typewriter border-r-2 border-secondary pr-1">https://your-website.com</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-[18px]">more_vert</span>
              </div>
            </div>
          </div>

          {/* Animation Canvas */}
          <div className="flex-grow relative overflow-hidden bg-[#020617]">
            {/* Stage 1: The Site Being Scanned */}
            <div className="absolute inset-0 p-12 opacity-40 group-hover:opacity-20 transition-opacity">
              <div className="space-y-8">
                <div className="h-12 bg-slate-800 rounded-xl w-1/3"></div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-40 bg-slate-800/50 rounded-2xl"></div>
                  <div className="h-40 bg-slate-800/50 rounded-2xl"></div>
                  <div className="h-40 bg-slate-800/50 rounded-2xl"></div>
                </div>
                <div className="h-64 bg-slate-800/30 rounded-3xl w-full"></div>
              </div>
            </div>

            {/* Stage 2: The Scanning Swarm */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Scan Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_20px_rgba(var(--secondary),0.5)] animate-scan"></div>
              
              {/* Persona Markers */}
              <div className="absolute top-[20%] left-[15%] animate-float-slow">
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="text-sm">🤨</span>
                    <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Skeptic: Trust Leak detected</span>
                 </div>
              </div>
              <div className="absolute top-[45%] right-[20%] animate-float-slow delay-500">
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="text-sm">🏢</span>
                    <span className="text-[9px] font-bold text-white uppercase tracking-tighter">Enterprise: Compliance Gap</span>
                 </div>
              </div>
            </div>

            {/* Stage 3: The Result Pop-up (Appears on hover or auto) */}
            <div className="absolute inset-0 flex items-center justify-center p-12 animate-fade-in-up">
              <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-3xl max-w-xl w-full flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Conversion Audit</h4>
                    <p className="text-slate-400 text-xs font-label-mono">Simulation ID: #4402-Z</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-error/30 flex items-center justify-center font-black text-2xl text-white">72</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <span className="material-symbols-outlined">security</span>
                    </div>
                    <div className="flex-grow">
                      <div className="h-2 bg-white/20 rounded w-1/3 mb-2"></div>
                      <div className="h-1.5 bg-white/10 rounded w-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div className="flex-grow">
                      <div className="h-2 bg-white/20 rounded w-1/4 mb-2"></div>
                      <div className="h-1.5 bg-white/10 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                   <div className="px-8 py-3 bg-secondary text-on-secondary rounded-full font-bold shadow-xl animate-bounce-slow">Unlocking Insights...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 3s steps(40) infinite alternate;
        }
      `}</style>
    </div>
  );
}
