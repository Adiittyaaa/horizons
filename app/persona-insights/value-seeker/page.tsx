'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ValueSeekerPage() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Value Seeker') {
      router.push('/persona-insights/value-seeker');
    } else if (value === 'Enterprise Evaluator') {
      router.push('/persona-insights/enterprise-evaluator');
    } else {
      router.push('/persona-insights');
    }
  };

  const currentPersona = pathname.includes('value-seeker') 
    ? 'Value Seeker' 
    : pathname.includes('enterprise-evaluator') 
      ? 'Enterprise Evaluator' 
      : 'Skeptical Buyer';

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
                <span className="font-ui-label text-ui-label">BACK TO PERSONAS</span>
              </Link>
              <div className="flex items-center justify-between w-full mb-xs">
                <div className="flex items-center gap-sm">
                  <span className="text-headline-lg text-4xl">🏷️</span>
                  <h1 className="font-headline-lg text-headline-lg text-primary ml-2 tracking-tight">The Value Seeker</h1>
                </div>
                <div className="relative">
                  <select 
                    value={currentPersona}
                    onChange={handlePersonaChange}
                    className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg pl-md pr-xl py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary shadow-sm"
                  >
                    <option value="Skeptical Buyer">Skeptical Buyer</option>
                    <option value="Value Seeker">Value Seeker</option>
                    <option value="Enterprise Evaluator">Enterprise Evaluator</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A highly analytical, budget-conscious decision-maker who prioritizes long-term ROI and upfront transparency. This persona spends 3x longer on the pricing page compared to other segments.
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">Price Sensitive</span>
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">ROI Driven</span>
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">AI Verified</span>
              </div>
            </div>
            {/* Revenue Recovery Metric */}
            <div className="glass-surface p-lg rounded-2xl bg-surface-container-low/50 ambient-shadow border border-outline-variant min-w-[240px]">
              <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1 uppercase tracking-widest">Recovery Potential</span>
              <div className="text-display-xl font-display-xl text-primary">+$142,500</div>
              <p className="font-body-sm text-body-sm text-tertiary-fixed-dim mt-1 font-semibold flex items-center gap-1">
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
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Simulated Internal Monologue</h2>
            </div>
            <div className="space-y-md">
              {[
                { text: "Is there a free trial? I need to validate this tech before committing any part of my department's quarterly budget.", icon: "format_quote" },
                { text: "I need to see the yearly savings vs monthly. If the discount for annual billing isn't at least 20%, I'll stick to monthly flexibility.", icon: "format_quote" },
                { text: "Where is the comparison chart? I can't justify this to finance without a clear list of what features are excluded in the 'Pro' tier.", icon: "format_quote" }
              ].map((item, i) => (
                <div key={i} className="flex gap-md p-md bg-surface-container-low/30 rounded-xl border-l-4 border-secondary group hover:bg-white hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">{item.icon}</span>
                  <p className="font-body-md text-body-md italic text-on-surface">{item.text}</p>
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
                  { icon: "add_task", title: "Highlight Annual Savings", desc: "Update pricing toggle to emphasize 25% cost reduction on annual plans." },
                  { icon: "calculate", title: "Add ROI Calculator", desc: "Embed a dynamic tool to visualize cost savings based on user input." },
                  { icon: "list_alt", title: "Direct Feature Comparison", desc: "Replace the simple list with a comprehensive grid showing 'No' checkboxes." }
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
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2 hidden md:block"></div>
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-xl">
                {[
                  { title: "Discovery", desc: 'Arrives via "Enterprise Cost Efficiency" ads.', icon: "search", color: "secondary" },
                  { title: "Pricing Page", desc: "68% Drop-off Rate: Hidden fees anxiety.", icon: "warning", color: "error", friction: true },
                  { title: "Free Trial", desc: "High conversion IF value is proven in 7 days.", icon: "fact_check", color: "outline-variant" },
                  { title: "Retention", desc: "Low churn segment if ROI is maintained.", icon: "shopping_cart_checkout", color: "outline-variant" }
                ].map((step, i) => (
                  <div key={i} className="relative bg-white p-lg rounded-2xl border border-outline-variant shadow-sm flex flex-col items-center text-center group hover:border-secondary transition-colors">
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-2`}>
                      <span className={`material-symbols-outlined text-${step.color} ${step.friction ? 'animate-pulse' : ''}`}>{step.icon}</span>
                    </div>
                    <h3 className={`font-label-mono uppercase mt-2 text-xs font-bold ${step.friction ? 'text-error' : 'text-on-surface-variant'}`}>{step.title}</h3>
                    <p className="text-body-sm mt-2 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Context Section */}
          <section className="md:col-span-12 rounded-[2rem] overflow-hidden relative h-80 border border-outline-variant shadow-2xl group">
            <img alt="Data visualization dashboard" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-xl">
              <div className="text-white max-w-2xl">
                <span className="font-label-mono uppercase text-secondary font-bold tracking-widest text-xs">Behavioral Analysis Overlay</span>
                <h3 className="font-headline-lg text-headline-lg mt-2">Session Replay Insights</h3>
                <p className="font-body-lg text-body-lg text-slate-300 mt-2">Value Seekers spend an average of 4.2 minutes scrolling the pricing grid versus 1.1 minutes for other personas. They are meticulously comparing column-by-column.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
