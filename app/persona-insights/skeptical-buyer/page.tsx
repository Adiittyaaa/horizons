'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SkepticalBuyerPage() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Value Seeker') {
      router.push('/persona-insights/value-seeker');
    } else if (value === 'Enterprise Evaluator') {
      router.push('/persona-insights/enterprise-evaluator');
    } else if (value === 'Skeptical Buyer') {
      router.push('/persona-insights/skeptical-buyer');
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
                  <span className="text-headline-lg text-4xl">🤨</span>
                  <h1 className="font-headline-lg text-headline-lg text-primary ml-2 tracking-tight">The Skeptical Buyer</h1>
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
                A risk-averse decision-maker who values social proof, security certifications, and case studies over marketing claims. They are looking for reasons to say "no".
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                <span className="px-sm py-1 bg-error/10 text-error border border-error/20 rounded-full font-body-sm text-body-sm font-medium">Risk Averse</span>
                <span className="px-sm py-1 bg-error/10 text-error border border-error/20 rounded-full font-body-sm text-body-sm font-medium">Proof Oriented</span>
                <span className="px-sm py-1 bg-error/10 text-error border border-error/20 rounded-full font-body-sm text-body-sm font-medium">Security First</span>
              </div>
            </div>
            {/* Revenue Recovery Metric */}
            <div className="glass-surface p-lg rounded-2xl bg-surface-container-low/50 ambient-shadow border border-outline-variant min-w-[240px]">
              <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1 uppercase tracking-widest">Recovery Potential</span>
              <div className="text-display-xl font-display-xl text-primary">+$88,200</div>
              <p className="font-body-sm text-body-sm text-error mt-1 font-semibold flex items-center gap-1">
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
              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Simulated Internal Monologue</h2>
            </div>
            <div className="space-y-md">
              {[
                { text: "This looks too good to be true. Where are the real reviews? If I can't find a G2 or Trustpilot link in 30 seconds, I'm out.", icon: "format_quote" },
                { text: "They claim to be SOC2 compliant, but I don't see the badge in the footer. Is their security posture actually verified?", icon: "format_quote" },
                { text: "The 'Case Studies' are just logos. I want to see actual data and a quote from a CTO I recognize.", icon: "format_quote" }
              ].map((item, i) => (
                <div key={i} className="flex gap-md p-md bg-surface-container-low/30 rounded-xl border-l-4 border-error group hover:bg-white hover:shadow-md transition-all">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-error transition-colors">{item.icon}</span>
                  <p className="font-body-md text-body-md italic text-on-surface">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendations Sidebar */}
          <aside className="md:col-span-4 flex flex-col gap-gutter">
            <div className="bg-surface-container-high border border-outline-variant rounded-2xl p-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-sm mb-md relative z-10">
                <span className="material-symbols-outlined text-primary">verified</span>
                <h2 className="font-headline-md text-headline-md ml-2 text-primary">Trust Builder</h2>
              </div>
              <ul className="space-y-md relative z-10">
                {[
                  { icon: "verified_user", title: "Add Security Badges", desc: "Place SOC2, GDPR, and HIPAA badges prominently in the footer and checkout." },
                  { icon: "reviews", title: "Embed Live Reviews", desc: "Integrate G2 or Trustpilot widgets to provide real-time third-party validation." },
                  { icon: "policy", title: "Clarify Refund Policy", desc: "Ensure a '30-Day Money Back Guarantee' is visible near all CTA buttons." }
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-sm group cursor-pointer p-sm hover:bg-white rounded-lg transition-colors border border-transparent hover:border-outline-variant">
                    <span className="material-symbols-outlined mt-1 text-primary">{rec.icon}</span>
                    <div>
                      <span className="font-body-sm font-bold block text-on-surface">{rec.title}</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{rec.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-lg pt-md border-t border-outline-variant relative z-10">
                <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg">Generate Trust Plan</button>
              </div>
            </div>
          </aside>

          {/* Trust Leak Map */}
          <section className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm overflow-hidden">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-error">visibility_off</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Identified Trust Leaks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {[
                { title: "Missing Footer Contact", impact: "High", desc: "Skeptics look for a physical address or phone number to verify business legitimacy." },
                { title: "Generic Testimonials", impact: "Medium", desc: "Stock-photo style testimonials trigger 'fake' alarms for this persona." },
                { title: "Vague Pricing", impact: "Critical", desc: " 'Contact Us' for mid-market tiers creates anxiety about hidden enterprise markups." }
              ].map((leak, i) => (
                <div key={i} className="p-md bg-surface-container-low/50 border border-outline-variant rounded-xl group hover:bg-white hover:border-error transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-on-surface">{leak.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${leak.impact === 'Critical' ? 'bg-error text-on-error' : leak.impact === 'High' ? 'bg-orange-500 text-white' : 'bg-secondary text-white'}`}>
                      {leak.impact}
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">{leak.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Heatmap Overlay */}
          <section className="md:col-span-12 rounded-[2rem] overflow-hidden relative h-96 border border-outline-variant shadow-2xl group">
            <img alt="Heatmap of website" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" />
            <div className="absolute inset-0 bg-gradient-to-t from-error/40 via-transparent to-transparent flex items-end p-xl">
              <div className="backdrop-blur-md bg-white/20 p-lg rounded-2xl border border-white/30 text-white max-w-2xl">
                <span className="font-label-mono uppercase text-error font-bold tracking-widest text-xs">Skeptical Eye-Tracking Heatmap</span>
                <h3 className="font-headline-lg text-headline-lg mt-2">Where the Skeptic looks.</h3>
                <p className="font-body-lg text-body-lg text-white mt-2">Skeptics ignore marketing copy and focus almost exclusively on trust badges, footer links, and pricing fine print. They are looking for "Gotchas".</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
