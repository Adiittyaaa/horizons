import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResourceCenter() {
  const articles = [
    {
      category: "PERFORMANCE",
      title: "Latency as a Conversion Killer in 2024",
      excerpt: "A deep dive into how 100ms delays in complex application interfaces degrade perceived value and user trust.",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
    },
    {
      category: "CASE STUDIES",
      title: "FinTech Corp: Scaling Trust Across Borders",
      excerpt: "How standardizing security iconography and micro-copy increased international enterprise onboarding completion by 42%.",
      readTime: "15 MIN READ",
      image: "https://images.unsplash.com/photo-1454165833767-131f72a609d8?auto=format&fit=crop&q=80"
    },
    {
      category: "TRUST SIGNALS",
      title: "The Whitespace Imperative",
      excerpt: "Why cognitive load reduction through strategic padding is the most underutilized tool in complex B2B dashboards.",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-[100px] pb-xl px-gutter max-w-container-max mx-auto w-full">
        {/* Hero Section */}
        <section className="py-xl max-w-3xl">
          <h1 className="font-display-xl text-display-xl text-primary mb-6">
            Conversion Intelligence Library.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Deep insights on trust, speed, and human behavior. Curated research and strategies for high-end B2B environments.
          </p>
        </section>

        {/* Featured Article */}
        <section className="mb-xl">
          <div className="relative rounded-2xl overflow-hidden bg-primary-container border border-outline-variant ambient-shadow group cursor-pointer h-[500px] flex flex-col justify-end">
            <img 
              alt="The Architecture of Trust" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" 
              src="https://images.unsplash.com/photo-1451187530220-4e2a16071871?auto=format&fit=crop&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
            <div className="relative z-10 p-lg w-full md:w-2/3 backdrop-blur-sm bg-white/10 rounded-tr-2xl border-t border-r border-white/10 m-md">
              <span className="inline-block bg-tertiary-fixed-dim/20 text-tertiary-fixed font-label-mono text-label-mono px-3 py-1 rounded-full mb-4 backdrop-blur-md">
                TRUST SIGNALS
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary mb-4 leading-tight">
                The Architecture of Trust: How Micro-Interactions Drive Enterprise Conversions
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container mb-6 line-clamp-2">
                Analyzing the psychological impact of UI responsiveness and data validation feedback loops on high-ticket B2B purchasing decisions.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 border border-white/20 flex items-center justify-center text-white font-bold">EV</div>
                <div>
                  <p className="font-body-sm text-body-sm text-on-primary">Dr. Elias Vance</p>
                  <p className="font-label-mono text-label-mono text-on-primary-container">12 MIN READ</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex gap-4 mb-lg overflow-x-auto pb-4 scrollbar-hide border-b border-outline-variant/30">
          {["LATEST", "TRUST SIGNALS", "PERFORMANCE", "CASE STUDIES"].map((cat, i) => (
            <button 
              key={cat} 
              className={`font-label-mono text-label-mono pb-2 px-2 whitespace-nowrap transition-all ${
                i === 0 ? 'text-primary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {articles.map((article, index) => (
            <article key={index} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col group hover:ambient-shadow transition-all duration-300">
              <div className="h-48 overflow-hidden relative bg-surface-container">
                <img 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src={article.image} 
                />
              </div>
              <div className="p-md flex-grow flex flex-col">
                <span className="font-label-mono text-label-mono text-secondary mb-3 inline-block">{article.category}</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">{article.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-outline-variant/30">
                  <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
                  <span className="font-label-mono text-label-mono text-outline">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Subscription Section */}
        <section className="mt-xl p-xl rounded-2xl bg-secondary-container text-white text-center flex flex-col items-center gap-md shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-[60px]"></div>
          <h2 className="font-headline-lg text-headline-lg max-w-xl">Get conversion intelligence delivered to your inbox.</h2>
          <p className="font-body-md text-blue-100 max-w-lg">Join 5,000+ founders and PMs receiving our weekly research on human behavior and trust architecture.</p>
          <div className="flex w-full max-w-md gap-2">
            <input 
              type="email" 
              placeholder="work@company.com" 
              className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-secondary px-6 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">Subscribe</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
