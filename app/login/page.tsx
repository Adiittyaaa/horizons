'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const router = useRouter();
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, user, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email);
    router.push('/dashboard');
  };
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased relative">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-gutter py-xl pt-[120px] relative z-10">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] p-lg md:p-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <header className="text-center mb-xl">
              <h1 className="font-display-md text-display-md text-primary tracking-tight mb-2">Welcome Back</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Sign in to access your persona insights.</p>
            </header>

            <form className="space-y-lg" onSubmit={handleLogin}>
              <div className="space-y-sm">
                <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-4 font-body-md text-on-surface focus:outline-none focus:border-secondary transition-all" 
                    required
                  />
                </div>
              </div>

              <div className="space-y-sm">
                <div className="flex justify-between items-end">
                  <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Password</label>
                  <Link href="#" className="text-xs text-secondary hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-12 py-4 font-body-md text-on-surface focus:outline-none focus:border-secondary transition-all" 
                    required
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <div className="pt-md">
                <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                  Sign In
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </button>
              </div>

              <div className="relative py-4 flex items-center gap-4">
                <div className="flex-1 h-px bg-outline-variant"></div>
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Or continue with</span>
                <div className="flex-1 h-px bg-outline-variant"></div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors">
                  <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 grayscale" />
                  <span className="font-body-sm font-semibold">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-sm">hub</span>
                  <span className="font-body-sm font-semibold">SSO</span>
                </button>
              </div>
            </form>

            <footer className="mt-xl text-center">
              <p className="font-body-sm text-on-surface-variant">
                Don't have an account? <Link href="/register" className="text-secondary font-bold hover:underline">Start free trial</Link>
              </p>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
