import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white font-body-md antialiased selection:bg-secondary selection:text-on-secondary">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="pt-[160px] pb-24 px-6 max-w-7xl mx-auto text-center flex flex-col items-center gap-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-slate-900 border border-slate-800 text-secondary font-label-mono text-[10px] uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
            OUR MISSION
          </div>
          <div className="flex flex-col gap-6 max-w-4xl">
            <h1 className="font-display-xl text-display-xl md:text-7xl text-white leading-tight font-black">
              Decoding the <span className="bg-gradient-to-r from-secondary-container via-secondary to-indigo-400 bg-clip-text text-transparent italic">Human</span> behind the data.
            </h1>
            <p className="font-body-lg text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm">
              We build intelligence that simulates empathy at scale. We help high-performance growth teams understand the psychological 'Why' behind every bounce and every conversion.
            </p>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-y border-slate-900 bg-slate-900/30">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-900">
            {[
              { value: "2,800+", label: "Growth teams" },
              { value: "1.2M+", label: "Pages audited" },
              { value: "$48M+", label: "Revenue recovered" },
              { value: "4", label: "Persona lenses" },
            ].map((s, i) => (
              <div key={i} className="py-12 px-6 text-center flex flex-col gap-2 group">
                <span className="font-display-md text-4xl md:text-5xl font-black text-white group-hover:text-secondary transition-colors">{s.value}</span>
                <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* NARRATIVE SECTION */}
        <section className="py-32 px-6 bg-slate-900/30 border-t border-b border-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 animate-pulse"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest font-bold">THE PROBLEM</span>
                <h2 className="font-display-md text-3xl font-bold text-white leading-tight">Data is noisy. <br />Behavior is human.</h2>
              </div>
              <p className="font-body-md text-slate-400 leading-relaxed text-sm">
                Traditional dashboards tell you *what* happened. They show you the drop-off rates and the bounce rates. But they rarely tell you why. We realized that true conversion optimization requires empathy at scale—something legacy tools lack.
              </p>
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-none border-l-4 border-l-secondary shadow-md font-sans text-xs text-slate-300 italic">
                <p>"Horizons was built to simulate that empathy, analyzing interfaces not just for broken links, but for broken trust."</p>
              </div>
            </div>
            <div className="aspect-square w-full rounded-none overflow-hidden shadow-2xl border border-slate-800 relative bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
                alt="AI Intelligence Visual"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1c30]/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* CORE PERSONAS (BENTO STYLE) */}
        <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display-md text-3xl font-bold text-white">The Swarm Intelligence</h2>
            <p className="font-body-md text-slate-400">Our agents evaluate your interface through distinct, rigorous lenses rooted in behavioral psychology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Skeptical Buyer", icon: "🤨", desc: "Questions credibility and hunts for trust signals—testimonials, guarantees, real proof—before committing to anything.", color: "#f87171" },
              { name: "Value Seeker", icon: "💸", desc: "Demands clear value and transparent, justified pricing. Hesitates the moment cost appears to outweigh the benefit.", color: "#34d399" },
              { name: "Impulse Evaluator", icon: "⚡", desc: "Impatient and mobile-first. Forms a judgment within seconds and bounces fast when a page is slow or cluttered.", color: "#fbbf24" },
              { name: "Enterprise Evaluator", icon: "🏢", desc: "Vets security, compliance (SOC2 / ISO 27001), integrations, and whether the product can scale to a large org.", color: "#a78bfa" }
            ].map((persona, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-900 rounded-none p-8 flex items-start gap-6 hover:border-slate-800 transition-all group">
                <div className="w-14 h-14 shrink-0 rounded-none flex items-center justify-center text-2xl group-hover:scale-105 transition-transform border shadow-md" style={{ backgroundColor: `${persona.color}1a`, borderColor: `${persona.color}55` }}>
                  {persona.icon}
                </div>
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-white mb-2 tracking-tight">{persona.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">{persona.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-32 px-6 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col gap-20">
            <h2 className="font-display-md text-3xl font-bold text-white text-center">The Minds Behind Horizons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "Aditya Pandey", role: "Founder & CEO", bio: "Spent a decade watching teams guess at why visitors bounce. Built Horizons to replace the guessing with simulated behavior.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
                { name: "Aditya Pandey", role: "Head of AI Research", bio: "Leads the behavioral swarm—designing the persona models that read an interface the way a wary human actually would.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
                { name: "Aditya Pandey", role: "VP Product", bio: "Turns raw behavioral signal into the Horizons Score and the revenue-impact projections teams act on every day.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" }
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                  <div className="w-[280px] h-[280px] rounded-none overflow-hidden border-[6px] border-slate-900 shadow-2xl group-hover:border-secondary transition-all duration-500 p-2 bg-slate-900">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="text-center space-y-2 max-w-[280px]">
                    <h4 className="font-headline-md text-lg font-bold text-white">{member.name}</h4>
                    <span className="font-label-mono text-[10px] text-secondary uppercase tracking-[0.2em] font-bold">{member.role}</span>
                    <p className="font-body-sm text-xs text-slate-400 leading-relaxed pt-2">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 p-12 md:p-20 rounded-none flex flex-col items-center gap-8 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
            <h2 className="font-display-lg text-3xl md:text-5xl font-bold max-w-xl relative z-10 leading-tight">Ready to see your site through their eyes?</h2>
            <Link href="/progress" className="bg-secondary hover:bg-secondary-container text-white px-10 py-4 font-bold text-xs uppercase tracking-widest transition-all rounded-none relative z-10 border border-secondary shadow-lg active:scale-95">
              START YOUR FIRST SCAN
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
