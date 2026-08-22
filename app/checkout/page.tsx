"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';

export default function Checkout() {
  const router = useRouter();
  const { user, login, upgradeToPro } = useAuth();
  
  const [email, setEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --- Card field formatters (mirror Stripe's input UX) ---
  const handleCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, '$1 ').trim());
  };
  const handleExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits);
  };
  const handleCvc = (v: string) => setCvc(v.replace(/\D/g, '').slice(0, 4));

  const fillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setExpiry('12 / 34');
    setCvc('123');
    setFormError(null);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Simple fields validation
    if (!email.trim()) {
      setFormError("Please enter your email address.");
      return;
    }
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
      setFormError("Please enter a valid 16-digit credit card number.");
      return;
    }
    if (!expiry.trim() || !expiry.includes('/')) {
      setFormError("Please enter card expiry date (MM / YY).");
      return;
    }
    if (!cvc.trim() || cvc.trim().length < 3) {
      setFormError("Please enter a valid 3-digit CVC security code.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate secure transaction
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // If user isn't logged in, log them in first, then upgrade them to Pro
      if (!user) {
        login(email.trim());
      }
      
      // Upgrade session to Pro tier
      upgradeToPro();
      
      // Redirect to dashboard after success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-body-md antialiased relative selection:bg-secondary selection:text-on-secondary">
      {/* Decorative Glow */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-24 pt-[120px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <header>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-xs uppercase tracking-widest mb-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                SECURE CHECKOUT
              </div>
              <h1 className="font-display-xl text-display-xl text-white tracking-tight mb-4 font-black">
                Unlock Complete Funnel Insights
              </h1>
              <p className="font-body-lg text-slate-400 leading-relaxed text-sm">
                Upgrade to the Pro scan tier to unlock all conversion leak reports, diagnostic code fixes, and revenue intelligence simulations.
              </p>
            </header>

            {/* Product Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-none p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-800">
                <div>
                  <h2 className="font-headline-md text-xl font-bold text-white">Precision Scan Report</h2>
                  <p className="text-xs text-slate-400 mt-1">One-time comprehensive funnel audit</p>
                </div>
                <div className="text-right">
                  <span className="font-display-md text-3xl font-bold text-white">$29</span>
                  <span className="block font-label-mono text-[10px] text-slate-500 mt-1">USD</span>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Audit Subtotal</span>
                  <span>$29.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="text-secondary font-bold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-800 font-headline-lg text-2xl text-white font-black">
                <span>Total</span>
                <span className="text-secondary">$29.00</span>
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {[
                { title: "4 AI Persona Journeys", desc: "Skeptics, impulse clickers, and value seekers simulated on your page." },
                { title: "Actionable Code Fixes", desc: "Copy-paste code patches to immediately remove trust leaks." },
                { title: "Revenue Recovery Forecast", desc: "Calculate your monthly uplift automatically." }
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="material-symbols-outlined text-secondary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <h3 className="font-bold text-white">{f.title}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-none shadow-2xl p-8 md:p-12 relative overflow-hidden">
              
              {paymentSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-secondary/20 text-secondary border border-secondary/30 flex items-center justify-center text-3xl rounded-none">
                    <span className="material-symbols-outlined text-3xl">done_all</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-headline-lg text-2xl font-bold text-white">Payment Received!</h2>
                    <p className="text-slate-400 text-sm">Your account has been upgraded to Pro. Redirecting to workspace...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-headline-lg text-2xl font-bold text-white mb-2">Secure Payment Details</h2>
                    <p className="text-slate-400 text-xs">Simulate transactional checkout via Stripe API mock.</p>
                  </div>

                  {formError && (
                    <div className="bg-error/10 border border-error/20 text-error p-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-none">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {formError}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="font-label-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">Billing Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      disabled={isProcessing}
                      className="w-full bg-slate-950 border border-slate-800 rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-secondary transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <label className="font-label-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">Card Details</label>
                      <div className="flex gap-2 text-slate-500">
                        <span className="material-symbols-outlined text-sm">credit_card</span>
                        <span className="material-symbols-outlined text-sm">payments</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col border border-slate-800 rounded-none overflow-hidden focus-within:border-secondary transition-all">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => handleCardNumber(e.target.value)}
                        placeholder="Card number (16 digits)"
                        maxLength={19}
                        disabled={isProcessing}
                        className="w-full bg-slate-950 border-none px-4 py-3 text-white text-sm focus:ring-0 focus:outline-none tracking-widest"
                      />
                      <div className="flex border-t border-slate-800">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={expiry}
                          onChange={(e) => handleExpiry(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={7}
                          disabled={isProcessing}
                          className="w-1/2 bg-slate-950 border-none border-r border-slate-800 px-4 py-3 text-white text-sm focus:ring-0 focus:outline-none"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cvc}
                          onChange={(e) => handleCvc(e.target.value)}
                          placeholder="CVC"
                          maxLength={4}
                          disabled={isProcessing}
                          className="w-1/2 bg-slate-950 border-none px-4 py-3 text-white text-sm focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={fillTestCard}
                      disabled={isProcessing}
                      className="flex items-center gap-1.5 text-[10px] font-label-mono uppercase tracking-wider text-secondary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">bolt</span>
                      Test mode — click to fill 4242 4242 4242 4242
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-secondary hover:bg-secondary-container text-white py-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl border border-secondary rounded-none"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Security Tokens...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">lock</span>
                          Pay $29.00 USD
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 text-slate-500 text-[10px] font-label-mono uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
                    <span>7-day no-questions refund guarantee</span>
                  </div>
                </form>
              )}
              
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
