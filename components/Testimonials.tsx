import React from 'react';

const testimonials = [
  {
    quote: "Horizons identified a single trust-leak on our pricing page that was costing us $14k in MRR.",
    author: "Elena Soros",
    role: "CEO, NexusData",
    avatar: "ES"
  },
  {
    quote: "The Skeptical Buyer persona is eerily accurate. It found issues we've missed for years.",
    author: "Marcus Lin",
    role: "Founder, Thread Co.",
    avatar: "ML"
  },
  {
    quote: "Better than 1,000 user tests. We saved months of research with one scan.",
    author: "David Chen",
    role: "CTO, Quantum",
    avatar: "DC"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-gutter bg-surface-container-low/30 overflow-hidden border-t border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display-lg text-display-lg text-primary mb-4">Loved by Growth Teams</h2>
          <p className="font-body-lg text-on-surface-variant">Real results from companies scaling with AI intelligence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-surface-container-lowest p-10 rounded-none border border-outline-variant shadow-sm hover:ambient-shadow transition-all group flex flex-col justify-between">
              <div className="mb-8">
                <div className="flex gap-1 mb-6 text-secondary">
                  {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-sm">star</span>)}
                </div>
                <p className="font-body-md text-on-surface leading-relaxed italic">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center font-bold rounded-none">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-on-surface leading-tight">{t.author}</p>
                  <p className="text-sm text-on-surface-variant">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
