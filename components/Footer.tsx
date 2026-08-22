import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 w-full py-20 px-6 mt-auto rounded-none relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Newsletter band */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-16 border-b border-slate-800">
          <div className="max-w-md">
            <h3 className="font-display-md text-2xl font-bold text-white mb-2">Stay ahead of conversion leaks.</h3>
            <p className="font-sans text-sm text-slate-400">Monthly teardowns, persona research, and product updates. No noise.</p>
          </div>
          <NewsletterSignup />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 flex flex-col gap-6">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 group">
              <span className="w-8 h-8 bg-gradient-to-tr from-secondary-container to-secondary flex items-center justify-center text-white text-base font-bold rounded-none group-hover:rotate-12 transition-transform">
                H
              </span>
              <span>HORIZONS</span>
            </Link>
            <p className="font-sans text-sm text-slate-400 max-w-sm leading-relaxed">
              Precision Trust & Conversion Intelligence. We deploy AI-powered user swarms to audit your landing pages, uncover hidden friction, and recover lost conversions.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 items-center">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center rounded-none shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center rounded-none shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center rounded-none shadow-md">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm tracking-widest uppercase text-white">Product</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/dashboard" className="hover:text-secondary transition-colors">Overview Dashboard</Link>
              <Link href="/leaks" className="hover:text-secondary transition-colors">Friction Auditor</Link>
              <Link href="/reports" className="hover:text-secondary transition-colors">Archive Reports</Link>
              <Link href="/#pricing" className="hover:text-secondary transition-colors">Pricing Options</Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm tracking-widest uppercase text-white">Resources</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/success-stories" className="hover:text-secondary transition-colors">Success Stories</Link>
              <Link href="/resource-center" className="hover:text-secondary transition-colors">Resource Center</Link>
              <Link href="/#faq" className="hover:text-secondary transition-colors">Help Center & FAQ</Link>
              <Link href="/legal" className="hover:text-secondary transition-colors">Compliance Center</Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm tracking-widest uppercase text-white">Security & Legal</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/legal" className="hover:text-secondary transition-colors">Privacy Policy</Link>
              <Link href="/legal" className="hover:text-secondary transition-colors">Terms of Service</Link>
              <Link href="/legal" className="hover:text-secondary transition-colors">Cookie settings</Link>
              <Link href="/legal" className="hover:text-secondary transition-colors">SOC2 Compliance</Link>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-800"></div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-slate-400">
          {[
            { icon: 'verified_user', label: 'SOC2 Type II' },
            { icon: 'gpp_good', label: 'GDPR Compliant' },
            { icon: 'lock', label: '256-bit SSL' },
            { icon: 'bolt', label: '99.9% Uptime' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 font-label-mono text-[10px] uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px] text-secondary">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>© 2026 Horizons AI. Built with precision and trust swarm technology. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Security Disclosure</Link>
            <Link href="/legal" className="hover:text-white transition-colors">Opt Out</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
