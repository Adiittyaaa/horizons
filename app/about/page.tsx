import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="pt-[160px] pb-24 px-gutter max-w-container-max mx-auto text-center flex flex-col items-center gap-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-secondary font-label-mono text-[10px] uppercase tracking-widest mb-4">
            <span className="material-symbols-outlined text-[16px]">group</span>
            Our Mission
          </div>
          <div className="flex flex-col gap-md max-w-[900px]">
            <h1 className="font-display-xl text-display-xl md:text-[5rem] text-on-surface leading-[1.1] tracking-tight">
              Decoding the <span className="text-secondary italic">Human</span> behind the data.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              We build intelligence that simulates empathy at scale. We help high-performance teams understand the psychological 'Why' behind every bounce and every conversion.
            </p>
          </div>
        </section>

        {/* NARRATIVE SECTION */}
        <section className="py-32 px-gutter relative overflow-hidden bg-surface-container-low/50">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 translate-x-1/2"></div>
          
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-lg">
              <div className="space-y-4">
                <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">The Problem</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">Data is noisy. <br/>Behavior is human.</h2>
              </div>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Traditional dashboards tell you *what* happened. They show you the drop-off rates and the bounce rates. But they rarely tell you why. We realized that true conversion optimization requires empathy at scale—something legacy tools lack.
              </p>
              <div className="p-8 bg-white rounded-3xl border border-outline-variant shadow-sm border-l-4 border-l-secondary">
                 <p className="font-body-sm italic text-on-surface">"Horizons was built to simulate that empathy, analyzing interfaces not just for broken links, but for broken trust."</p>
              </div>
            </div>
            <div className="aspect-square w-full rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant relative bg-white group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                alt="AI Intelligence Visual" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* CORE PERSONAS (BENTO STYLE) */}
        <section className="py-32 px-gutter max-w-container-max mx-auto flex flex-col gap-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display-md text-display-md text-on-surface mb-4">The Swarm Intelligence</h2>
            <p className="font-body-md text-on-surface-variant">Our agents evaluate your interface through distinct, rigorous lenses rooted in behavioral psychology.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { id: "psychology", name: "The Skeptic", desc: "Evaluates trust signals, friction points, and potential objections before commitment.", color: "bg-error/10 text-error" },
              { id: "speed", name: "The Executor", desc: "Scans for clarity, direct paths to action, and elimination of unnecessary steps.", color: "bg-blue-500/10 text-blue-500" },
              { id: "search_insights", name: "The Researcher", desc: "Seeks deep validation, detailed specifications, and comprehensive comparative data.", color: "bg-purple-500/10 text-purple-500" },
              { id: "visibility", name: "The Browser", desc: "Assesses high-level narrative, visual appeal, and intuitive discovery paths.", color: "bg-emerald-500/10 text-emerald-500" }
            ].map((persona, i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] p-10 shadow-sm flex items-start gap-8 hover:ambient-shadow transition-all group">
                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${persona.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <span className="material-symbols-outlined text-3xl">{persona.id}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-3 tracking-tight">{persona.name}</h3>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">{persona.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-32 px-gutter bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto flex flex-col gap-20">
            <h2 className="font-display-md text-display-md text-on-surface text-center">The Minds Behind Horizons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { name: "Alex Mercer", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
                { name: "Sarah Chen", role: "Head of AI Research", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
                { name: "Marcus Vance", role: "VP Product", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" }
              ].map((member, i) => (
                <div key={i} className="flex flex-col items-center gap-8 group">
                  <div className="w-[280px] h-[280px] rounded-full overflow-hidden border-[6px] border-surface-container shadow-2xl group-hover:border-secondary transition-all duration-700 p-2 bg-white">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="text-center flex flex-col gap-2">
                    <h4 className="font-headline-md text-on-surface font-bold">{member.name}</h4>
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.2em]">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-gutter max-w-container-max mx-auto">
          <div className="bg-primary text-on-primary rounded-[4rem] p-24 flex flex-col items-center gap-10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent"></div>
            <h2 className="font-display-lg text-display-lg max-w-2xl relative z-10 leading-tight">Ready to see your site through their eyes?</h2>
            <Link href="/progress" className="bg-secondary text-on-secondary px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all relative z-10 shadow-xl">
              Start Your First Audit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
