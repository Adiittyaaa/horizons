'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/lib/AuthContext';

export default function PersonaInsightsOverview() {
  const { user } = useAuth();
  const personas = [
    {
      id: "skeptical-buyer",
      emoji: "🤨",
      name: "Skeptical Buyer",
      tagline: "The Logic-First Decision Maker",
      description: "A risk-averse decision-maker who values social proof, security certifications, and technical documentation over marketing claims.",
      metrics: { impact: "High", complexity: "Mid", recovery: "+$88k" },
      traits: ["Risk Averse", "Proof Oriented", "Security First"],
      color: "error"
    },
    {
      id: "value-seeker",
      emoji: "🏷️",
      name: "Value Seeker",
      tagline: "The Efficiency Enthusiast",
      description: "A budget-conscious professional who prioritizes long-term ROI, transparent pricing, and clear comparison charts.",
      metrics: { impact: "Critical", complexity: "Low", recovery: "+$142k" },
      traits: ["Price Sensitive", "ROI Driven", "Detail Oriented"],
      color: "secondary"
    },
    {
      id: "enterprise-evaluator",
      emoji: "🏢",
      name: "Enterprise Evaluator",
      tagline: "The Scalability Architect",
      description: "A high-ticket buyer focused on compliance, SSO integration, multi-seat management, and dedicated support pipelines.",
      metrics: { impact: "Very High", complexity: "High", recovery: "+$210k" },
      traits: ["Compliance Focused", "Scalability", "Support Driven"],
      color: "primary"
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        <div className="lg:col-span-9 flex flex-col gap-lg">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                Intelligence
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight">
                Persona Intelligence
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                Meet the AI-simulated personas stress-testing your site. We analyze their behavior, friction points, and conversion triggers to unlock hidden revenue.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <Link href="/persona-comparison" className="px-6 py-2 border border-secondary text-secondary rounded-full font-label-mono text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">
                View Comparison Matrix
              </Link>
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant shadow-sm">
                <div className="text-center px-4 border-r border-outline-variant">
                  <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Total Recovery</p>
                  <p className="font-headline-lg text-headline-lg text-secondary">$440.7k</p>
                </div>
                <div className="text-center px-4">
                  <p className="font-label-mono text-[10px] text-on-surface-variant uppercase">Avg. Friction</p>
                  <p className="font-headline-lg text-headline-lg text-error">Medium</p>
                </div>
              </div>
            </div>
          </header>

        {/* Persona Cards Grid */}
        <div className="relative">
          {(!user || !user.isPro) && (
            <div className="absolute inset-0 z-20 bg-background/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-2xl max-w-md">
                <span className="material-symbols-outlined text-4xl text-secondary mb-4">lock</span>
                <h3 className="font-headline-md text-primary mb-2">Persona Intelligence Locked</h3>
                <p className="font-body-sm text-on-surface-variant mb-6">
                  {!user 
                    ? "Create a free account or sign in to access deep-dive behavioral profiles and simulated conflict matrices." 
                    : "Upgrade to the Pro plan to access deep-dive behavioral profiles and simulated conflict matrices."}
                </p>
                <div className="flex gap-4 justify-center">
                  {!user ? (
                    <>
                      <Link href="/login" className="px-6 py-2 border border-outline-variant rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">Sign In</Link>
                      <Link href="/register" className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Get Started</Link>
                    </>
                  ) : (
                    <Link href="/upgrade" className="px-6 py-2 bg-secondary text-on-secondary rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">Upgrade to Pro</Link>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

          {personas.map((persona) => (
            <Link 
              key={persona.id} 
              href={`/persona-insights/${persona.id}`}
              className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-lg flex flex-col group hover:ambient-shadow hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
            >
              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${persona.color}/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700`}></div>

              <div className="flex items-center justify-between mb-lg">
                <div className="w-16 h-16 rounded-2xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-4xl shadow-sm group-hover:rotate-6 transition-transform">
                  {persona.emoji}
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Potential Recovery</span>
                  <span className={`font-headline-md text-headline-md text-${persona.color}`}>{persona.metrics.recovery}</span>
                </div>
              </div>

              <div className="flex-grow">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-1 tracking-tight">{persona.name}</h2>
                <p className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mb-4">{persona.tagline}</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-lg leading-relaxed line-clamp-3">
                  {persona.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-lg">
                {persona.traits.map(trait => (
                  <span key={trait} className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant font-label-mono text-[9px] text-on-surface uppercase tracking-wider">
                    {trait}
                  </span>
                ))}
              </div>

              <div className="pt-lg border-t border-outline-variant/30 flex items-center justify-between group-hover:text-secondary transition-colors">
                <span className="font-body-sm font-bold">Explore Insights</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
        </div>

        {/* Swarm Capability Section */}
        <section className="mt-xl p-xl rounded-[3rem] bg-surface-container-high border border-outline-variant flex flex-col md:flex-row items-center gap-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="flex-1 space-y-md">
            <div className="inline-flex items-center gap-2 text-secondary font-label-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
              <span className="material-symbols-outlined text-[14px]">swarm_intelligence</span>
              Behavioral Swarm Engine
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">
              Our AI swarms can simulate <span className="text-secondary">thousands</span> of concurrent user journeys.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              We don't just look at heatmaps. We simulate psychological states, cognitive load thresholds, and competitive benchmarking to tell you exactly why people leave.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg">Request Custom Persona</button>
              <button className="border border-outline-variant text-on-surface px-8 py-3 rounded-xl font-bold hover:bg-surface-container-low transition-colors">Watch Demo</button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md aspect-square bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl relative flex items-center justify-center p-md overflow-hidden group">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Radar Effect */}
              <div className="w-12 h-12 rounded-full bg-secondary animate-ping absolute opacity-20"></div>
              <div className="w-24 h-24 rounded-full border-2 border-secondary/20 animate-pulse absolute"></div>
              <div className="w-48 h-48 rounded-full border border-secondary/10 absolute"></div>
              
              {/* Floating Persona Orbs */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-2xl border border-outline-variant animate-float-slow">🤨</div>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-2xl border border-outline-variant animate-float-medium">🏷️</div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-2xl border border-outline-variant animate-float-fast">🏢</div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-white shadow-xl flex items-center justify-center text-2xl border border-outline-variant animate-float-slow delay-700">🧐</div>
            </div>
          </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
