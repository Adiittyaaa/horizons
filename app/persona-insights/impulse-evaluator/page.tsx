'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PERSONA_ROUTES: Record<string, string> = {
  'Skeptical Buyer': '/persona-insights/skeptical-buyer',
  'Value Seeker': '/persona-insights/value-seeker',
  'Impulse Evaluator': '/persona-insights/impulse-evaluator',
  'Enterprise Evaluator': '/persona-insights/enterprise-evaluator',
};

export default function ImpulseEvaluatorPage() {
  const router = useRouter();

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(PERSONA_ROUTES[e.target.value] ?? '/persona-insights');
  };

  return (
    <div className="bg-background font-body-md text-on-background selection:bg-secondary-fixed min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 py-xl pt-[120px] flex-grow w-full">
        {/* Persona Header */}
        <header className="mb-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div className="flex-grow">
              <Link className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors mb-6 group w-fit" href="/persona-insights">
                <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                <span className="font-label-mono text-label-mono uppercase tracking-widest">Back to Personas</span>
              </Link>
              <div className="flex items-center justify-between w-full mb-xs">
                <div className="flex items-center gap-sm">
                  <span className="text-headline-lg text-4xl">⚡</span>
                  <h1 className="font-headline-lg text-headline-lg text-primary ml-2 tracking-tight">The Impulse Evaluator</h1>
                </div>
                <div className="relative">
                  <select
                    value="Impulse Evaluator"
                    onChange={handlePersonaChange}
                    className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg pl-md pr-xl py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary shadow-sm"
                  >
                    <option value="Skeptical Buyer">Skeptical Buyer</option>
                    <option value="Value Seeker">Value Seeker</option>
                    <option value="Impulse Evaluator">Impulse Evaluator</option>
                    <option value="Enterprise Evaluator">Enterprise Evaluator</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A fast-moving, visually-driven visitor who decides within seconds. Low patience for friction: if the value proposition and primary CTA aren&apos;t obvious above the fold, this persona bounces before scrolling.
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                <span className="px-sm py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full font-body-sm text-body-sm font-medium">Fast Decisions</span>
                <span className="px-sm py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full font-body-sm text-body-sm font-medium">Visually Driven</span>
                <span className="px-sm py-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 rounded-full font-body-sm text-body-sm font-medium">Low Patience</span>
              </div>
            </div>
            {/* Revenue Recovery Metric */}
            <div className="glass-surface p-lg rounded-2xl bg-surface-container-low/50 ambient-shadow border border-outline-variant min-w-[240px]">
              <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1 uppercase tracking-widest">Recovery Potential</span>
              <div className="text-display-xl font-display-xl text-primary">+$96,200</div>
              <p className="font-body-sm text-body-sm text-secondary mt-1 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                Monthly Potential
              </p>
            </div>
          </div>
        </header>

        {/* Bento Grid Insights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Internal Monologue */}
          <section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl p-md shadow-sm">
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Simulated Internal Monologue</h2>
            </div>
            <div className="space-y-md">
              {[
                "I landed here from an ad — what does this actually do? I&apos;ll give it about five seconds before I hit back.",
                "There&apos;s too much text. Where&apos;s the button? Just show me how to start.",
                "It&apos;s loading slowly. I&apos;m out — I&apos;ll try the next result instead.",
              ].map((text, i) => (
                <div key={i} className="flex gap-md p-md bg-surface-container-low/30 rounded-xl border-l-4 border-amber-500 group hover:bg-white hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-amber-500 transition-colors">format_quote</span>
                  <p className="font-body-md text-body-md italic text-on-surface" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendations Sidebar */}
          <aside className="md:col-span-4 flex flex-col gap-gutter">
            <div className="bg-primary text-on-primary rounded-2xl p-md shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-sm mb-md relative z-10">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">auto_awesome</span>
                <h2 className="font-headline-md text-headline-md ml-2">AI Optimizations</h2>
              </div>
              <ul className="space-y-md relative z-10">
                {[
                  { icon: "ads_click", title: "Sharpen the Above-the-Fold CTA", desc: "One primary action, high contrast, visible without scrolling." },
                  { icon: "bolt", title: "Cut Time-to-Value", desc: "Lead with a 6-word outcome statement, not a paragraph." },
                  { icon: "speed", title: "Fix Load Performance", desc: "Every 1s of delay lifts bounce for this segment by ~20%." },
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-sm group cursor-pointer p-sm hover:bg-white/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined mt-1 text-tertiary-fixed-dim">{rec.icon}</span>
                    <div>
                      <span className="font-body-sm font-bold block">{rec.title}</span>
                      <p className="text-xs opacity-70 leading-relaxed">{rec.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-lg pt-md border-t border-white/10 relative z-10">
                <button className="w-full py-3 bg-white text-primary font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg">Apply Strategies</button>
              </div>
            </div>
          </aside>

          {/* Friction Journey Timeline */}
          <section className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm overflow-hidden">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-error">route</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Friction Journey Timeline</h2>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2 hidden md:block"></div>
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-xl">
                {[
                  { title: "Ad Click", desc: "Arrives with high intent but zero patience.", icon: "ads_click", color: "secondary" },
                  { title: "First 5 Seconds", desc: "74% Drop-off: unclear value + slow paint.", icon: "warning", color: "error", friction: true },
                  { title: "Scan for CTA", desc: "Converts fast IF the next step is obvious.", icon: "touch_app", color: "outline-variant" },
                  { title: "Instant Signup", desc: "Frictionless flows win this segment outright.", icon: "shopping_cart_checkout", color: "outline-variant" },
                ].map((step, i) => (
                  <div key={i} className="relative bg-white p-lg rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center text-center group hover:border-secondary transition-colors">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-2">
                      <span className={`material-symbols-outlined text-${step.color} ${step.friction ? 'animate-pulse' : ''}`}>{step.icon}</span>
                    </div>
                    <h3 className={`font-label-mono uppercase mt-2 text-xs font-bold ${step.friction ? 'text-error' : 'text-on-surface-variant'}`}>{step.title}</h3>
                    <p className="text-body-sm mt-2 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
