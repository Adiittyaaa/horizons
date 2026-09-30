'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Hero scan form — the primary entry point into the scan pipeline.
 * Validates a domain client-side, then routes to /progress?url=<encoded>,
 * where the POST /api/analyze call runs. Kept as its own client component
 * so the marketing homepage (app/page.tsx) can stay a server component.
 */
export default function HeroScanForm() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!domain.trim()) {
      setError('Please enter a website domain to audit.');
      return;
    }
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+.*$/;
    if (!domainRegex.test(domain)) {
      setError('Please enter a valid website URL (e.g., mysite.com).');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      router.push(`/progress?url=${encodeURIComponent(domain.trim())}`);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-16">
      <form onSubmit={handleScanSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
            language
          </span>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter your website URL (e.g. mysite.com)"
            aria-label="Website URL"
            className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-2xl text-on-surface placeholder:text-on-surface-variant/60 font-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
              SCANNING...
            </>
          ) : (
            'RUN FREE AUDIT'
          )}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-error font-medium flex items-center gap-1.5 justify-center sm:justify-start animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-center gap-6 text-on-surface-variant">
        <span className="font-label-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
          No credit card required
        </span>
        <Link
          href="/about"
          className="text-sm font-semibold hover:text-secondary transition-colors inline-flex items-center gap-1"
        >
          See How It Works
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
