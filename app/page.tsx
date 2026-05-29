import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import ToolDemo from '@/components/ToolDemo';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Horizons AI",
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered behavioral intelligence platform that simulates user behavior to detect conversion leaks.",
    "offers": {
      "@type": "Offer",
      "price": "49.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <main className="flex-grow pt-[100px]">
        {/* HERO SECTION */}
        <section id="hero" className="relative pt-24 pb-16 px-gutter max-w-container-max mx-auto flex flex-col items-center text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-secondary-fixed/20 rounded-full blur-[140px] -z-10 animate-pulse-slow"></div>
          
          <div className="max-w-4xl space-y-md z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-secondary font-label-mono text-[10px] uppercase tracking-widest mb-6 animate-fade-in-up">
              <span className="material-symbols-outlined text-[16px]">psychology_alt</span>
              Revolutionizing Conversion Rate Optimization
            </div>
            <h1 className="font-display-xl text-display-xl md:text-[5rem] text-primary-container leading-[1.1] tracking-tight mb-6">
              Detect <span className="bg-gradient-to-r from-secondary to-primary-container bg-clip-text text-transparent">Hidden Conversion Leaks</span> with AI Swarms.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
              Stop guessing why visitors leave. Our AI personas simulate thousands of distinct user journeys to find trust gaps, cognitive load spikes, and friction points.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/progress" className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Run Free Scan
              </Link>
              <Link href="/about" className="px-10 py-4 border border-outline-variant rounded-2xl font-bold text-lg hover:bg-surface-container-low transition-all">
                See How It Works
              </Link>
            </div>
          </div>

          {/* DYNAMIC TOOL DEMO ANIMATION */}
          <ToolDemo />
        </section>

        {/* LOGO CLOUD */}
        <section className="py-16 border-t border-outline-variant/30 flex flex-col items-center gap-8 bg-surface-container-lowest/50">
          <p className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Fueling Growth at the world's most innovative companies</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {['VOLT', 'AETHER', 'NEXUS', 'SYNERGY', 'LUMINA'].map(l => (
              <span key={l} className="text-2xl font-black tracking-tighter text-on-surface">{l}</span>
            ))}
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <Features />

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-32 px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="font-display-lg text-display-lg text-primary mb-6">How Behavioral Swarms Work</h2>
            <p className="font-body-lg text-on-surface-variant">We don't just look at clicks. We simulate human psychology at scale to find what's stopping your sales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent -z-10"></div>
            
            {[
              { step: "01", title: "Crawl & Digest", icon: "data_exploration", desc: "Our AI scans every page, link, and pixel of your site to build a full behavioral map." },
              { step: "02", title: "Persona Deployment", icon: "group_add", desc: "We deploy specialized swarms (Value Seekers, Skeptics, etc.) to navigate your funnel." },
              { step: "03", title: "Leak Detection", icon: "troubleshoot", desc: "Identify exactly where users hesitate, feel confused, or lose trust in your brand." }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-surface-container-lowest rounded-[3rem] border border-outline-variant shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 text-8xl font-black text-on-surface/5 group-hover:text-primary/10 transition-colors">{s.step}</div>
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">{s.title}</h3>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section id="comparison" className="py-32 px-gutter bg-primary text-on-primary rounded-[4rem] mx-gutter relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-display-lg text-display-lg mb-6">Why Horizons?</h2>
              <p className="font-body-lg opacity-80">Traditional analytics tell you *what* happened. We tell you *why*.</p>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-white/20 bg-white/5 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-8 font-headline-md">Capability</th>
                    <th className="p-8 font-headline-md text-secondary">Horizons AI</th>
                    <th className="p-8 font-headline-md opacity-50">Traditional Analytics</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: "Predictive Behavior", h: true, t: false },
                    { c: "Psychological Gap Analysis", h: true, t: false },
                    { c: "24/7 Concurrent Simulations", h: true, t: false },
                    { c: "Automated Fix Recommendations", h: true, t: "Manual" },
                    { c: "Legacy Heatmaps", h: true, t: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="p-8 font-body-sm">{row.c}</td>
                      <td className="p-8">
                        {row.h === true ? <span className="material-symbols-outlined text-secondary">check_circle</span> : <span className="text-sm opacity-60">{row.h}</span>}
                      </td>
                      <td className="p-8 opacity-50">
                         {row.t === true ? <span className="material-symbols-outlined">check_circle</span> : <span className="material-symbols-outlined">cancel</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ SECTION (SEO FOCUS) */}
        <section id="faq" className="py-32 px-gutter bg-surface-container-low/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display-md text-display-md text-primary mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How is Horizons different from Hotjar?", a: "Hotjar shows you what past users did. Horizons uses AI agents to predict what *future* users will do, identifying psychological triggers and friction points before you lose the sale." },
                { q: "Do I need to install a script?", a: "No installation required for the initial audit. Just enter your URL and our AI swarms will analyze your public funnel. Advanced tracking for authenticated states is available via our API." },
                { q: "Can I customize the AI personas?", a: "Yes, Pro and Enterprise users can define custom behavioral traits, geographic backgrounds, and specific technical proficiency levels for their AI agents." },
                { q: "Does this work on single-page apps (SPAs)?", a: "Absolutely. Our crawler is built on headless Chromium and can interact with React, Vue, and Next.js applications seamlessly." }
              ].map((item, i) => (
                <details key={i} className="group bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <summary className="p-6 font-bold text-primary flex items-center justify-between cursor-pointer list-none">
                    {item.q}
                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="p-6 pt-0 font-body-sm text-on-surface-variant border-t border-outline-variant/30 animate-fade-in">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-gutter max-w-container-max mx-auto text-center">
          <div className="bg-primary-container text-on-primary-container p-20 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
            <h2 className="font-display-lg text-display-lg mb-8 relative z-10 leading-tight">Ready to Stop the Leaks?</h2>
            <p className="font-body-lg opacity-80 mb-12 max-w-xl mx-auto relative z-10">Get your first behavioral audit in under 60 seconds. No credit card required.</p>
            <Link href="/progress" className="px-12 py-5 bg-secondary text-on-secondary rounded-2xl font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 inline-block">
              Analyze My Website
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
