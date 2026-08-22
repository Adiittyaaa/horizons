'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EnterpriseEvaluatorPage() {
  const router = useRouter();
  const pathname = usePathname();

  const PERSONA_ROUTES: Record<string, string> = {
    'Skeptical Buyer': '/persona-insights/skeptical-buyer',
    'Value Seeker': '/persona-insights/value-seeker',
    'Impulse Evaluator': '/persona-insights/impulse-evaluator',
    'Enterprise Evaluator': '/persona-insights/enterprise-evaluator',
  };

  const handlePersonaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(PERSONA_ROUTES[e.target.value] ?? '/persona-insights');
  };

  const currentPersona = pathname.includes('value-seeker')
    ? 'Value Seeker'
    : pathname.includes('impulse-evaluator')
      ? 'Impulse Evaluator'
      : pathname.includes('enterprise-evaluator')
        ? 'Enterprise Evaluator'
        : 'Skeptical Buyer';

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
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
                  <span className="text-headline-lg">🛡️</span>
                  <h1 className="font-headline-lg text-headline-lg text-primary ml-2 tracking-tight">The Enterprise Evaluator</h1>
                </div>
                <div className="relative">
                  <select 
                    value={currentPersona}
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
                Highly technical decision-makers focused on risk mitigation, operational scale, and organizational compliance. They prioritize deep documentation over marketing narratives.
              </p>
              <div className="mt-md flex flex-wrap gap-sm">
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">Security Focused</span>
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">Decision Maker</span>
                <span className="px-sm py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-body-sm text-body-sm font-medium">B2B Core</span>
              </div>
            </div>
            {/* Revenue Recovery Metric */}
            <div className="glass-surface p-lg rounded-2xl bg-surface-container-low/50 ambient-shadow border border-outline-variant min-w-[240px]">
              <span className="font-label-mono text-label-mono text-on-surface-variant block mb-1 uppercase tracking-widest">Revenue Impact</span>
              <div className="text-display-xl font-display-xl text-primary">$1.4M</div>
              <p className="font-body-sm text-body-sm text-tertiary-fixed-dim mt-1 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                High Lifetime Value (LTV)
              </p>
            </div>
          </div>
        </header>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Simulated Internal Monologue */}
          <section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-2xl p-md shadow-sm">
            <div className="flex items-center gap-sm mb-md">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Simulated Internal Monologue</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {[
                "Where are the SOC2 compliance docs? I can't find their security whitepaper anywhere in the footer.",
                "Does this support SSO out of the box or is it a 'Contact Sales' add-on feature?",
                "The landing page is too flashy. I need to see the API endpoints and the data residency policy.",
                "How does the team permissioning model work? Can I restrict access by department?"
              ].map((quote, i) => (
                <div key={i} className="p-md rounded-xl bg-surface-container-low/30 border border-outline-variant/30 italic font-body-md text-on-surface relative group hover:bg-white hover:shadow-md transition-all">
                  <span className="absolute -top-3 -left-1 text-4xl text-secondary/10 font-serif group-hover:text-secondary/30 transition-colors">"</span>
                  {quote}
                </div>
              ))}
            </div>
          </section>

          {/* AI Recommendations Sidebar */}
          <aside className="md:col-span-4 flex flex-col gap-gutter">
            <div className="bg-primary text-on-primary p-md rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-sm mb-md relative z-10">
                <span className="material-symbols-outlined text-tertiary-fixed-dim">auto_awesome</span>
                <h2 className="font-headline-md text-headline-md ml-2">AI Optimizations</h2>
              </div>
              <ul className="space-y-md relative z-10">
                {[
                  { icon: "verified_user", title: "Security Trust Badges", desc: "Add SOC2, GDPR, and ISO 27001 logos in the hero and footer sections." },
                  { icon: "code", title: "API Documentation Link", desc: "Place 'Read Docs' button prominently for technical persona detection." },
                  { icon: "account_tree", title: "SSO & RBAC Highlight", desc: "Explicitly list Okta/Azure AD support on the pricing page." }
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim mt-1">{rec.icon}</span>
                    <div>
                      <p className="font-body-sm font-bold mb-1">{rec.title}</p>
                      <p className="text-xs opacity-70 leading-relaxed">{rec.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-lg py-3 bg-white text-primary rounded-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-lg relative z-10">
                Apply All Optimizations
              </button>
            </div>
          </aside>

          {/* Friction Journey Timeline */}
          <section className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
            <div className="flex items-center gap-sm mb-xl">
              <span className="material-symbols-outlined text-error">analytics</span>
              <h2 className="font-headline-md text-headline-md text-on-surface ml-2">Friction Journey Timeline</h2>
            </div>
            <div className="relative px-lg pb-lg">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-lg right-lg h-1 bg-outline-variant -translate-y-1/2 z-0 hidden md:block"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-xl">
                {[
                  { id: 1, title: "Landing Page", desc: "General interest, looking for scale indicators.", icon: "1", color: "bg-secondary" },
                  { id: 2, title: "About Us", desc: "42% Drop-off: Lack of technical leadership depth.", icon: "warning", color: "bg-error", friction: true },
                  { id: 3, title: "Features", desc: "Scanning for RBAC and permissioning capabilities.", icon: "2", color: "bg-secondary" },
                  { id: 4, title: "Docs Page", desc: "68% Drop-off: Documentation lacks detail on encryption.", icon: "block", color: "bg-error", friction: true },
                  { id: 5, title: "Checkout", desc: "Rarely reached without direct sales intervention.", icon: "3", color: "bg-outline-variant" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center mb-sm shadow-lg ring-4 ring-white relative`}>
                      <span className={step.friction ? 'material-symbols-outlined' : 'font-bold'}>{step.icon}</span>
                    </div>
                    <h3 className="font-label-mono text-label-mono mb-1 uppercase font-bold">{step.title}</h3>
                    <p className={`text-xs leading-relaxed ${step.friction ? 'text-error font-medium' : 'text-on-surface-variant'}`}>{step.desc}</p>
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
