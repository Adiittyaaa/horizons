import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SuccessStories() {
  const caseStudies = [
    {
      title: "NexusData",
      industry: "B2B SaaS",
      before: "12%",
      after: "24%",
      metric: "Conversion Rate",
      quote: "Horizons completely demystified our user journey. The AI insights allowed us to pinpoint exactly where users were dropping off, leading to an immediate doubling of our conversion rate.",
      author: "Sarah Jenkins, CEO at NexusData",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      tag: "Doubled Conversion"
    },
    {
      title: "Thread Co.",
      industry: "E-commerce",
      before: "68%",
      after: "31%",
      metric: "Cart Abandonment",
      quote: "By streamlining the checkout process based on Horizons' behavioral analysis, we recovered over half of our previously abandoned carts in the first month.",
      author: "Marcus Lin, Founder of Thread Co.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
      tag: "Reduced Friction"
    },
    {
      title: "VaultPay",
      industry: "FinTech",
      before: "14 Days",
      after: "2 Days",
      metric: "Onboarding Time",
      quote: "The precision of the data allowed us to identify bottlenecks in our KYC process. Removing friction points led to a massive reduction in user onboarding time.",
      author: "Elena Rostova, VP Product at VaultPay",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      tag: "Accelerated Onboarding"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-[100px] pb-xl px-gutter max-w-container-max mx-auto w-full">
        {/* Header Section */}
        <header className="mb-xl text-center md:text-left max-w-3xl">
          <h1 className="font-display-xl text-display-xl text-on-background mb-md">Results that move the needle.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">See how top-performing teams use Horizons to transform their conversion funnels and drive measurable growth across diverse industries.</p>
        </header>

        {/* Bento Grid / Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {caseStudies.map((study, index) => (
            <article key={index} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col hover:shadow-[0_20px_25px_-5px_rgba(15,23,42,0.05)] transition-shadow duration-300 group">
              <div className="h-48 relative overflow-hidden bg-surface-dim">
                <img 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={study.image} 
                />
                <div className="absolute top-sm left-sm">
                  <span className="bg-white/80 backdrop-blur-md px-sm py-xs rounded-full font-label-mono text-label-mono text-on-background border border-outline-variant">
                    {study.industry}
                  </span>
                </div>
                <div className="absolute bottom-sm right-sm">
                  <span className="bg-secondary text-on-secondary px-sm py-xs rounded-full font-label-mono text-[10px] uppercase font-bold shadow-lg">
                    {study.tag}
                  </span>
                </div>
              </div>

              <div className="p-md flex flex-col flex-grow">
                <div className="flex items-end gap-sm mb-md pb-md border-b border-outline-variant/30">
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant mb-xs uppercase">{study.metric} (Before)</span>
                    <span className="font-headline-md text-headline-md text-on-surface-variant line-through opacity-70">{study.before}</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary mb-1">arrow_right_alt</span>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-secondary mb-xs uppercase">After Horizons</span>
                    <span className="font-headline-lg text-headline-lg text-secondary">{study.after}</span>
                  </div>
                </div>

                <blockquote className="flex-grow mb-md">
                  <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">"{study.quote}"</p>
                  <footer className="mt-sm font-label-mono text-label-mono text-on-surface-variant">— {study.author}</footer>
                </blockquote>

                <button className="w-full font-body-sm text-body-sm bg-primary text-on-primary py-sm rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-xs group">
                  View Case Study 
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Global Impact Section */}
        <section className="mt-xl p-lg rounded-2xl bg-primary-container text-on-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-lg">
            <div className="flex-grow space-y-sm">
              <h2 className="font-headline-lg text-headline-lg">Join 200+ companies optimizing with AI.</h2>
              <p className="font-body-md text-on-primary-container max-w-xl">From early-stage startups to Fortune 500 enterprises, we help teams unlock revenue hidden in their existing traffic.</p>
            </div>
            <button className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
              Get Your Free Trust Audit
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
