'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const faqs = [
  {
    category: "PLATFORM",
    question: "How does the AI simulation process work?",
    answer: "Our engine uses large language models trained on massive datasets of user interaction and conversion metrics. When you provide a URL, our agents navigate through the site structure, analyzing elements for visual hierarchy, trust signals, and cognitive load, providing a simulated 'first-time user' report within seconds."
  },
  {
    category: "DATA",
    question: "Is my data and site information secure?",
    answer: "Absolutely. We do not store sensitive user data or proprietary information from your site. Our analysis is conducted on the public-facing version of your URL. Any internal dashboards or reports generated are encrypted and only accessible to authorized users on your account."
  },
  {
    category: "PRICING",
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, Horizons offers a flexible month-to-month subscription model. You can cancel, upgrade, or downgrade your plan at any time through the billing dashboard without any hidden fees or long-term contracts."
  },
  {
    category: "PLATFORM",
    question: "What platforms and browsers do you support?",
    answer: "Our analysis agents can simulate interactions across all modern desktop and mobile browsers, including Chrome, Safari, Firefox, and Edge. We also support specialized analysis for responsive designs and progressive web apps."
  },
  {
    category: "INTEGRATION",
    question: "Do I need to install any code on my site?",
    answer: "No installation is required. Horizons works by analyzing your site's public URL from our server-side agents. However, we do offer a lightweight SDK for deeper integration into your CI/CD pipeline for automated trust-testing during deployment."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['ALL', ...Array.from(new Set(faqs.map(item => item.category)))];
  const filteredFaqs = activeCategory === 'ALL' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      <Navbar />

      <main className="flex-grow pt-[160px] pb-32 px-gutter max-w-5xl mx-auto w-full relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-secondary/5 rounded-full blur-[140px] -z-10"></div>
        
        {/* Header */}
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant text-secondary font-label-mono text-[10px] uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-[16px]">help</span>
            Knowledge Base
          </div>
          <h1 className="font-display-xl text-display-xl md:text-[4.5rem] text-on-surface mb-8 tracking-tight leading-[1.1]">
            Common Queries <br/>& <span className="text-secondary italic">Clarity</span>.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Horizons platform, our AI technology, and how we help drive your conversion growth.
          </p>
        </header>

        {/* Search / Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-label-mono text-label-mono transition-all border ${
                activeCategory === cat 
                  ? 'bg-secondary text-on-secondary border-secondary shadow-xl scale-105 font-bold' 
                  : 'bg-white text-on-surface-variant border-outline-variant hover:border-secondary hover:text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white border transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
                openIndex === index ? 'border-secondary shadow-2xl scale-[1.02]' : 'border-outline-variant hover:border-secondary/30'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-10 flex items-center justify-between gap-6 group"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-label-mono text-[10px] text-secondary tracking-[0.2em] uppercase font-bold">{faq.category}</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors tracking-tight">{faq.question}</h3>
                </div>
                <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center transition-transform duration-500 ${openIndex === index ? 'rotate-180 bg-secondary text-on-secondary' : 'text-secondary'}`}>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="px-10 pb-10">
                  <div className="h-px w-full bg-outline-variant/30 mb-8"></div>
                  <p className="font-body-md text-on-surface-variant leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-32 p-16 rounded-[4rem] bg-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex flex-col gap-4 relative z-10">
            <h2 className="font-display-md text-display-md">Still have questions?</h2>
            <p className="font-body-md opacity-80 max-w-md">Our specialized support engineers are available 24/7 to assist with your technical needs.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
            <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl text-center">
              Open Support Ticket
            </button>
            <button className="border border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-center">
              Live Chat
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
