'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function UpgradePage() {
  const { user, upgradeToPro, isLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    upgradeToPro();
    setIsProcessing(false);
    setShowSuccess(true);
    // Delay redirect to show success state
    setTimeout(() => {
      router.push('/dashboard');
    }, 4000);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const features = [
    { name: "Persona Simulations", free: "3 / mo", pro: "Unlimited", enterprise: "Custom", icon: "psychology" },
    { name: "Live Swarm Monitor", free: "Basic", pro: "Real-time", enterprise: "Ultra-low latency", icon: "monitoring" },
    { name: "Revenue Forecasting", free: "❌", pro: "✅", enterprise: "✅", icon: "payments" },
    { name: "Trust Leak Detection", free: "3 / report", pro: "Unlimited", enterprise: "Unlimited", icon: "gpp_bad" },
    { name: "Team Seats", free: "1", pro: "10", enterprise: "Unlimited", icon: "groups" },
    { name: "API & Webhooks", free: "❌", pro: "✅", enterprise: "✅", icon: "api" },
    { name: "Custom Personas", free: "❌", pro: "❌", enterprise: "✅", icon: "settings_account_box" },
  ];

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <Navbar />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg md:py-xl pt-[120px] grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        {/* Upgrade Content */}
        <div className="lg:col-span-9 flex flex-col gap-xl">
          <header className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-label-mono text-[10px] uppercase tracking-[0.2em] font-black mb-6 animate-in fade-in slide-in-from-top duration-700">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              Elevate Your Intelligence
            </div>
            <h1 className="font-display-xl text-display-xl text-primary tracking-tight mb-4 animate-in fade-in slide-in-from-top duration-700 delay-100">Unlock Pro Capabilities</h1>
            <p className="font-body-lg text-on-surface-variant leading-relaxed animate-in fade-in slide-in-from-top duration-700 delay-200">
              Transition from basic analytics to deep behavioral forecasting. Connect your site, deploy your swarms, and recapture lost revenue with the power of AI personas.
            </p>

            {/* Billing Toggle */}
            <div className="mt-10 p-1.5 bg-surface-container-low rounded-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top duration-700 delay-300">
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${billingPeriod === 'monthly' ? 'bg-white shadow-md text-primary' : 'text-outline hover:text-on-surface'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingPeriod === 'yearly' ? 'bg-white shadow-md text-primary' : 'text-outline hover:text-on-surface'}`}
              >
                Yearly
                <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md text-[9px] uppercase font-black tracking-tighter">Save 20%</span>
              </button>
            </div>
          </header>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-8">
            {/* Starter Plan */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group hover:border-outline transition-all duration-500">
              <div className="mb-8">
                <div className="font-label-mono text-[10px] text-outline uppercase tracking-widest font-black mb-2">Tier 01</div>
                <h3 className="font-headline-sm text-on-surface mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display-md text-primary">$0</span>
                  <span className="text-on-surface-variant font-body-sm">/ mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {["3 Scans per month", "Standard persona set", "Basic dashboard access", "Email support"].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant leading-tight">
                    <span className="material-symbols-outlined text-outline text-lg">check</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-4 border border-outline-variant rounded-2xl font-bold text-sm text-outline cursor-not-allowed bg-surface-container-low transition-colors">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-950 text-white border-2 border-secondary/50 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden shadow-2xl scale-105 z-10 animate-in zoom-in-95 duration-1000">
              <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 -translate-y-4 translate-x-4 pointer-events-none">
                <span className="material-symbols-outlined text-[160px]">auto_awesome</span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="bg-secondary text-on-secondary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-secondary/20">Most Popular</span>
              </div>
              
              <div className="mb-8 relative z-10">
                <div className="font-label-mono text-[10px] text-secondary uppercase tracking-widest font-black mb-2">Tier 02</div>
                <h3 className="font-headline-sm text-white mb-2">Horizons Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display-lg text-secondary">{billingPeriod === 'yearly' ? '$159' : '$199'}</span>
                  <span className="text-white/40 font-body-sm">/ mo</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-12 flex-grow relative z-10">
                {[
                  "Unlimited Swarm Simulations",
                  "Revenue Impact Forecasting",
                  "Advanced Trust Diagnostics",
                  "CRM & Slack Integrations",
                  "API Access & Webhooks",
                  "Priority GPU Allocation"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90 leading-tight">
                    <span className="material-symbols-outlined text-secondary text-lg">verified</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleUpgrade}
                disabled={isProcessing || user?.isPro}
                className={`w-full py-5 bg-secondary text-on-secondary rounded-2xl font-black text-sm hover:shadow-2xl hover:shadow-secondary/40 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 relative z-10 ${user?.isPro ? 'cursor-default' : 'hover:-translate-y-1'}`}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                    Securing Transaction...
                  </>
                ) : user?.isPro ? (
                  "Pro Plan Active"
                ) : (
                  "Upgrade to Pro Now"
                )}
              </button>
              <p className="text-[10px] text-center text-white/40 mt-4 font-label-mono uppercase tracking-widest">Secure Stripe Checkout</p>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group hover:border-outline transition-all duration-500">
              <div className="mb-8">
                <div className="font-label-mono text-[10px] text-outline uppercase tracking-widest font-black mb-2">Tier 03</div>
                <h3 className="font-headline-sm text-on-surface mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display-md text-primary">Custom</span>
                </div>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {["Custom persona training", "SLA & Dedicated account lead", "On-premise deployment", "Unlimited team seats", "SSO & SAML Auth"].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant leading-tight">
                    <span className="material-symbols-outlined text-outline text-lg">check</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-sm hover:opacity-90 hover:shadow-xl hover:shadow-primary/20 transition-all text-center hover:-translate-y-1 active:scale-95">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Comparison Matrix Section */}
          <section className="mt-20 w-full bg-surface-container-low/30 border border-outline-variant rounded-[3rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="text-center mb-16">
              <h2 className="font-headline-md text-display-sm text-primary mb-4">Technical Capabilities Matrix</h2>
              <p className="text-on-surface-variant text-sm max-w-xl mx-auto">Compare every micro-feature across our tiers. Our Pro engine uses dedicated GPU clusters for real-time inference.</p>
            </header>
            
            <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 font-label-mono text-[10px] text-outline uppercase tracking-[0.2em]">
                    <th className="py-6 px-8 bg-surface-container-low/50">Feature Protocol</th>
                    <th className="py-6 px-8 text-center bg-surface-container-low/50">Starter</th>
                    <th className="py-6 px-8 text-center bg-secondary/5 text-primary">Pro Tier</th>
                    <th className="py-6 px-8 text-center bg-surface-container-low/50">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-on-surface">
                  {features.map((f, i) => (
                    <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low/30 transition-colors group">
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-outline group-hover:text-primary transition-colors">{f.icon}</span>
                          <span className="font-bold">{f.name}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8 text-center text-on-surface-variant font-medium">{f.free}</td>
                      <td className="py-6 px-8 text-center font-black text-secondary bg-secondary/[0.02]">{f.pro}</td>
                      <td className="py-6 px-8 text-center text-on-surface-variant font-medium">{f.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Security & Trust Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center border-t border-outline-variant pt-20 mb-xl">
            {[
              { icon: 'security', title: 'Bank-grade Security', desc: '256-bit SSL encryption for all data transactions and payment processing via Stripe.' },
              { icon: 'published_with_changes', title: 'Cancel Anytime', desc: 'Flexible monthly billing with one-click cancellation. No long-term lock-ins.' },
              { icon: 'verified', title: 'SOC2 Type II Compliance', desc: 'We adhere to the highest industry standards of data privacy and organizational security.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">{item.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Success Modal / State Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-surface-container-lowest border border-outline-variant rounded-[3rem] p-xl text-center shadow-3xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
            
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30">
              <span className="material-symbols-outlined text-5xl">verified</span>
            </div>
            
            <h2 className="font-display-md text-3xl text-primary mb-4 tracking-tight">Upgrade Successful!</h2>
            <p className="font-body-md text-on-surface-variant mb-10 leading-relaxed">
              Welcome to <span className="font-bold text-on-surface">Horizons Pro</span>. Your workspace is being provisioned with advanced GPU clusters.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-surface-container-low rounded-2xl flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-outline uppercase tracking-widest">Next Step</div>
                  <div className="text-sm font-bold text-on-surface">Initializing Dashboard...</div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[loading_4s_ease-in-out_forwards]"></div>
              </div>
            </div>
          </div>
          
          {/* Confetti simulation with CSS particles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-sm pointer-events-none animate-confetti"
              style={{
                top: '-10px',
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#eab308'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 4s linear forwards;
        }
      `}</style>
    </div>
  );
}
