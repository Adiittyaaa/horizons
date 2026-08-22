"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

// Pages whose root background is dark. On these, the transparent (unscrolled)
// navbar sits over a dark surface, so brand/links must render light even before
// the scroll-triggered dark bar kicks in. Everything else is a light page.
const DARK_ROUTES = ['/', '/about', '/checkout', '/pricing', '/progress'];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicLinks = [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'About', href: '/about' },
  ];

  const appLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Personas', href: '/persona-insights' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Team', href: '/team' },
  ];

  const navLinks = user ? appLinks : publicLinks;

  const isActive = (href: string) => pathname === href || (pathname === '/' && href.startsWith('/#'));

  const isDarkPage = DARK_ROUTES.includes(pathname) || pathname.startsWith('/report');
  // True whenever the surface behind the navbar is dark → use light-on-dark text.
  const onDark = isScrolled || isDarkPage;

  const displayName = user?.name || user?.email || '';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(href);
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 rounded-none border-b ${
      isScrolled
        ? 'bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-800 shadow-lg py-3'
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
        {/* Brand Logo - Distinctive */}
        <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
          <span className="w-8 h-8 bg-gradient-to-tr from-secondary-container to-secondary flex items-center justify-center text-white text-base font-bold rounded-none group-hover:rotate-12 transition-transform shadow-md">
            H
          </span>
          <span className={onDark
            ? 'text-white'
            : 'bg-gradient-to-r from-secondary-container via-secondary to-primary bg-clip-text text-transparent'
          }>
            HORIZONS
          </span>
          {/* Live scanner status pill */}
          <span className="hidden xl:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] font-label-mono uppercase tracking-widest rounded-none">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Live
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-sans text-sm font-semibold tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`transition-colors duration-200 uppercase tracking-wider text-[11px] font-bold ${
                isActive(link.href)
                  ? 'text-secondary font-black border-b-2 border-secondary pb-1'
                  : onDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-secondary'
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
                <Link
                  href="/login"
                  className={`px-4 py-2 text-xs uppercase font-bold tracking-widest transition-colors rounded-none ${
                    onDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-secondary'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/progress"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-secondary text-white rounded-none hover:bg-secondary-container transition-all shadow-md active:scale-95 border border-secondary"
                >
                  Run Free Scan
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {!user.isPro && (
                  <Link
                    href="/checkout"
                    className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest bg-secondary text-white rounded-none hover:bg-secondary-container transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    Upgrade
                  </Link>
                )}
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-semibold ${onDark ? 'text-white' : 'text-slate-900'}`}>{displayName}</span>
                  <span className="text-[10px] font-label-mono uppercase text-secondary tracking-widest">{user.isPro ? 'Pro Member' : 'Free Plan'}</span>
                </div>
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className={`px-4 py-2 text-xs uppercase font-bold tracking-widest border rounded-none transition-colors ${
                    onDark ? 'text-white border-slate-700 hover:bg-slate-800' : 'text-on-surface border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden flex items-center p-2 rounded-none ${
            onDark ? 'text-white' : 'text-slate-800'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300 rounded-none">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block text-sm uppercase tracking-widest font-bold ${
                isActive(link.href) ? 'text-secondary' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-left font-bold text-sm uppercase tracking-widest text-slate-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/progress"
                  className="bg-secondary text-white px-4 py-3 rounded-none text-center font-bold text-xs uppercase tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Scan Your Site
                </Link>
              </>
            ) : (
              <>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white">{displayName}</span>
                  <span className="text-[10px] font-label-mono uppercase text-secondary tracking-widest">{user.isPro ? 'Pro Member' : 'Free Plan'}</span>
                </div>
                {!user.isPro && (
                  <Link
                    href="/checkout"
                    className="w-full text-center bg-secondary text-white px-4 py-3 rounded-none text-xs uppercase tracking-widest font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Upgrade to Pro
                  </Link>
                )}
                <button
                  onClick={() => { logout(); router.push('/'); setIsMenuOpen(false); }}
                  className="w-full text-center border border-slate-700 text-white px-4 py-3 rounded-none text-xs uppercase tracking-widest font-bold hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
