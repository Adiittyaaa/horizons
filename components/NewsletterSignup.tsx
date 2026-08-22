'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 font-label-mono text-xs uppercase tracking-widest h-[46px]">
        <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
        You&apos;re on the list — watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 min-w-0 bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-secondary transition-colors"
      />
      <button
        type="submit"
        className="bg-secondary hover:bg-secondary-container text-white px-5 py-3 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 whitespace-nowrap"
      >
        Subscribe
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </form>
  );
}
