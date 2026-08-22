'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';

export default function Register() {
  const router = useRouter();
  const { user, login, isLoading } = useAuth(); // We'll just use login to set the state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, user, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    // Mock registration signs the user in; carry the entered name through.
    login(email, name ? { name } : undefined);
    router.push('/dashboard');
  };

  const handleDemo = () => {
    setSubmitting(true);
    login('demo@horizons.ai', { isPro: true, name: 'Demo User', company: 'Horizons Demo' });
    router.push('/dashboard');
  };
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased relative">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-gutter py-xl pt-[120px] relative z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] p-lg md:p-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/5 rounded-br-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <header className="text-center mb-xl">
              <div className="flex items-center justify-center gap-2 text-secondary font-label-mono text-[10px] uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Instant Setup
              </div>
              <h1 className="font-display-md text-display-md text-primary tracking-tight mb-2">Start Your Analysis</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Join 2,800+ teams optimizing their conversion funnels.</p>
            </header>

            <button
              type="button"
              onClick={handleDemo}
              disabled={submitting}
              className="w-full mb-lg flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-secondary/40 bg-secondary/5 text-secondary font-bold hover:bg-secondary/10 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait group/demo"
            >
              <span className="material-symbols-outlined text-[20px] group-hover/demo:scale-110 transition-transform">bolt</span>
              Skip signup — explore the demo
              <span className="font-label-mono text-[10px] uppercase tracking-widest bg-secondary text-on-primary px-1.5 py-0.5 rounded-full">Pro</span>
            </button>

            <div className="relative pb-lg flex items-center gap-4">
              <div className="flex-1 h-px bg-outline-variant"></div>
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Or create an account</span>
              <div className="flex-1 h-px bg-outline-variant"></div>
            </div>

            <form className="space-y-lg" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="space-y-sm">
                  <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Pandey" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 font-body-md text-on-surface focus:outline-none focus:border-secondary transition-all" 
                    required
                  />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Work Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aditya@horizons.ai" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 font-body-md text-on-surface focus:outline-none focus:border-secondary transition-all" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-sm">
                <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 pr-12 py-4 font-body-md text-on-surface focus:outline-none focus:border-secondary transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="terms" />
                <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                  I agree to the <Link href="/legal" className="text-secondary font-bold hover:underline">Terms of Service</Link> and <Link href="/legal" className="text-secondary font-bold hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <div className="pt-md">
                <button type="submit" disabled={submitting} className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100">
                  {submitting ? (
                    <>
                      Creating account
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="material-symbols-outlined text-[20px]">person_add</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <footer className="mt-xl text-center">
              <p className="font-body-sm text-on-surface-variant">
                Already have an account? <Link href="/login" className="text-secondary font-bold hover:underline">Sign in instead</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
