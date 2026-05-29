'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard', href: '/dashboard' },
    { id: 'leaks', label: 'Conversion Leaks', icon: 'error', href: '/leaks' },
    { id: 'reports', label: 'Automated Reports', icon: 'summarize', href: '/reports' },
    { id: 'settings', label: 'Settings', icon: 'settings', href: '/settings' },
  ];

  return (
    <aside className="lg:col-span-3 hidden lg:flex flex-col gap-sm">
      <div className="bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant rounded-2xl p-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-32">
        <div className="font-label-mono text-[10px] text-outline mb-6 uppercase tracking-widest font-bold opacity-60">Workspace Navigation</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id}
                href={item.href} 
                className={`flex items-center gap-sm px-4 py-3 rounded-xl font-body-sm text-body-sm transition-all duration-300 group ${
                  isActive 
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 font-semibold' 
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive ? '' : 'text-outline'}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent my-8"></div>

        <div className="flex items-center gap-sm p-3 bg-surface-container-low/50 rounded-2xl border border-outline-variant/30">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-container text-on-secondary flex items-center justify-center font-bold shadow-inner">
            {user ? user.email.charAt(0).toUpperCase() : 'D'}
          </div>
          <div className="overflow-hidden">
            <div className="font-body-sm text-body-sm text-on-surface font-semibold leading-tight truncate">
              {user ? 'Horizons Workspace' : 'Demo Workspace'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <div className="font-label-mono text-[9px] text-secondary uppercase font-bold tracking-wider">
                {user && user.isPro ? 'Pro Plan' : 'Demo Mode'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
