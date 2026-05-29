"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const publicLinks = [
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Resource Center', href: '/resource-center' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  const appLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Personas', href: '/persona-insights' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Team', href: '/team' },
  ];

  const navLinks = user ? appLinks : publicLinks;

  const isActive = (href: string) => pathname === href;


  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
          Horizons
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 font-sans text-sm font-medium tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            {!user ? (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-semibold text-on-surface hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-5 py-2.5 text-sm font-bold bg-primary text-on-primary rounded-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.4)]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-on-surface">{user.email}</span>
                  <span className="text-[10px] font-label-mono uppercase text-secondary tracking-widest">{user.isPro ? 'Pro Member' : 'Demo Mode'}</span>
                </div>
                <button 
                  onClick={() => { logout(); router.push('/'); }}
                  className="px-4 py-2 text-sm font-semibold border border-outline-variant rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex items-center p-2 text-slate-600 dark:text-slate-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-lg font-medium ${
                isActive(link.href) ? 'text-indigo-600' : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
            <button className="text-left font-medium text-slate-600 dark:text-slate-400">Sign In</button>
            <Link
              href={user ? "/dashboard" : "/progress"}
              className="bg-primary text-on-primary px-4 py-3 rounded-lg text-center font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {user ? "Go to Dashboard" : "Scan Your Site"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
