'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/lib/AuthContext';

export default function PersonaComparisonPage() {
  const { user } = useAuth();
  const comparisonData = [
    {
      feature: "Security & Trust Signals",
      skeptical: { score: "Low", comment: "Wants SOC2 badge", color: "text-error" },
      value: { score: "Med", comment: "Checks for longevity", color: "text-amber-500" },
      enterprise: { score: "Critical", comment: "Requires full audit", color: "text-error font-bold" }
    },
    {
      feature: "Pricing Transparency",
      skeptical: { score: "High", comment: "Likes clear tiers", color: "text-secondary" },
      value: { score: "Critical", comment: "Needs ROI calculator", color: "text-error font-bold" },
      enterprise: { score: "Low", comment: "Wants custom quote", color: "text-secondary" }
    },
    {
      feature: "Feature Depth",
      skeptical: { score: "Med", comment: "Verifies claims", color: "text-amber-500" },
      value: { score: "High", comment: "Max features/price", color: "text-secondary" },
      enterprise: { score: "High", comment: "Needs API & SSO", color: "text-secondary" }
    },
    {
      feature: "Checkout Velocity",
      skeptical: { score: "Low", comment: "Hesitates at step 3", color: "text-error" },
      value: { score: "High", comment: "Smooth transaction", color: "text-secondary" },
      enterprise: { score: "N/A", comment: "Offline sales cycle", color: "text-on-surface-variant opacity-50" }
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg md:py-xl pt-[120px] grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        <div className="lg:col-span-9 flex flex-col gap-lg">
          {/* Page Header */}
          <header className="mb-8">
            <Link className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors mb-6 group w-fit" href="/persona-insights">
              <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              <span className="font-ui-label text-ui-label">BACK TO PERSONA INTELLIGENCE</span>
            </Link>
            <div className="max-w-3xl">
              <h1 className="font-display-xl text-display-xl text-primary mb-4 tracking-tight">Persona Conflict Analysis</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Compare how different AI agents perceive the same conversion funnel. Identify where a fix for one persona might create friction for another.
              </p>
            </div>
          </header>

          {/* Comparison Matrix */}
          <section className="relative bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] shadow-2xl overflow-hidden mb-xl">
            {(!user || !user.isPro) && (
              <div className="absolute inset-0 z-20 bg-background/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-2xl max-w-md">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-4">lock</span>
                  <h3 className="font-headline-md text-primary mb-2">Matrix Analysis Locked</h3>
                  <p className="font-body-sm text-on-surface-variant mb-6">
                    {!user 
                      ? "Create a free account or sign in to compare how different AI personas conflict and align on your site." 
                      : "Upgrade to the Pro plan to compare how different AI personas conflict and align on your site."}
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
            <div className="overflow-x-auto">

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                    <th className="px-lg py-xl font-headline-md text-headline-md text-primary w-1/4">Conversion Factor</th>
                    <th className="px-lg py-xl text-center border-l border-outline-variant/30">
                      <div className="text-3xl mb-2">🤨</div>
                      <div className="font-headline-sm text-headline-sm text-on-surface">Skeptical Buyer</div>
                    </th>
                    <th className="px-lg py-xl text-center border-l border-outline-variant/30">
                      <div className="text-3xl mb-2">🏷️</div>
                      <div className="font-headline-sm text-headline-sm text-on-surface">Value Seeker</div>
                    </th>
                    <th className="px-lg py-xl text-center border-l border-outline-variant/30">
                      <div className="text-3xl mb-2">🏢</div>
                      <div className="font-headline-sm text-headline-sm text-on-surface">Enterprise Eval</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-md">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors">
                      <td className="px-lg py-lg font-bold text-on-surface">{row.feature}</td>
                      <td className="px-lg py-lg border-l border-outline-variant/30 text-center">
                        <div className={`font-label-mono text-[10px] uppercase tracking-widest mb-1 ${row.skeptical.color}`}>Priority: {row.skeptical.score}</div>
                        <div className="text-sm text-on-surface-variant">{row.skeptical.comment}</div>
                      </td>
                      <td className="px-lg py-lg border-l border-outline-variant/30 text-center">
                        <div className={`font-label-mono text-[10px] uppercase tracking-widest mb-1 ${row.value.color}`}>Priority: {row.value.score}</div>
                        <div className="text-sm text-on-surface-variant">{row.value.comment}</div>
                      </td>
                      <td className="px-lg py-lg border-l border-outline-variant/30 text-center">
                        <div className={`font-label-mono text-[10px] uppercase tracking-widest mb-1 ${row.enterprise.color}`}>Priority: {row.enterprise.score}</div>
                        <div className="text-sm text-on-surface-variant">{row.enterprise.comment}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dynamic Insight Card */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-primary text-on-primary p-xl rounded-[3rem] shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -z-10"></div>
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim">troubleshoot</span>
                <h2 className="font-headline-lg text-headline-lg">Conflict Alert</h2>
              </div>
              <p className="font-body-lg text-body-lg mb-8 opacity-90 leading-relaxed">
                Adding a "Quick Checkout" button (ideal for Value Seekers) is currently triggering a <span className="font-bold underline decoration-tertiary-fixed-dim">High Risk</span> warning for Skeptical Buyers who feel rushed. 
              </p>
              <div className="p-lg bg-white/10 rounded-2xl border border-white/20">
                <p className="font-label-mono text-[11px] uppercase tracking-widest mb-2 opacity-70">AI Recommendation</p>
                <p className="font-body-md">Keep the Quick Checkout but place a "Verified by Stripe" badge directly beneath it to satisfy both personas.</p>
              </div>
            </div>

            <div className="bg-surface-container-high border border-outline-variant p-xl rounded-[3rem] shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-4 tracking-tight">Swarm Simulation Data</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
                  Based on 4,200 concurrent simulations across all regions. Enterprise Evaluators in the EMEA region show a 22% higher sensitivity to data residency markers.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[85%] rounded-full"></div>
                </div>
                <span className="font-label-mono text-label-mono text-secondary">85% SYNC</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
