'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Checkout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased relative">
      <Navbar />

      <main className="flex-1 w-full max-w-container-max mx-auto px-gutter py-xl pt-[120px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 flex flex-col gap-lg">
            <header>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Secure Checkout
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight mb-4">Upgrade to Precision</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Unlock the full potential of your conversion funnel with deep AI analysis and actionable persona insights.
              </p>
            </header>

            {/* Product Summary Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-lg shadow-sm">
              <div className="flex justify-between items-start mb-md pb-md border-b border-outline-variant">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Precision Report</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">One-time comprehensive audit</p>
                </div>
                <div className="text-right">
                  <span className="font-display-md text-display-md text-primary">$29</span>
                  <span className="block font-label-mono text-label-mono text-on-surface-variant mt-1">USD</span>
                </div>
              </div>

              <div className="space-y-sm mb-md">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>$29.00</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Processing Fee</span>
                  <span className="text-secondary">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-md border-t border-outline-variant font-headline-lg text-headline-lg text-on-surface">
                <span>Total</span>
                <span className="text-primary font-bold">$29.00</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-md">
              {[
                { title: "4 AI Persona Insights", desc: "Understand exactly who is dropping off and why." },
                { title: "Actionable Fixes", desc: "Direct code and copy changes to boost conversion." },
                { title: "Revenue Projection", desc: "See exactly how much revenue you're leaving on the table." }
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-secondary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <h3 className="font-body-md text-body-md font-bold text-on-surface">{f.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Payment Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] shadow-2xl p-lg md:p-xl">
              <div className="mb-lg">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Payment Details</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Secure, encrypted payment via Stripe.</p>
              </div>

              <form className="space-y-lg">
                <div className="space-y-sm">
                  <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="you@company.com" className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-lg py-md font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
                </div>

                <div className="space-y-sm">
                  <div className="flex justify-between items-end">
                    <label className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">Card Information</label>
                    <div className="flex gap-2 text-outline-variant">
                      <span className="material-symbols-outlined text-[20px]">credit_card</span>
                      <span className="material-symbols-outlined text-[20px]">payments</span>
                    </div>
                  </div>
                  <div className="flex flex-col border border-outline-variant rounded-xl overflow-hidden focus-within:border-secondary focus-within:ring-1 focus-within:ring-secondary transition-all">
                    <div className="relative border-b border-outline-variant">
                      <input type="text" placeholder="Card number" className="w-full bg-surface-container-low border-none px-lg py-md font-body-md text-on-surface focus:ring-0" />
                    </div>
                    <div className="flex">
                      <input type="text" placeholder="MM / YY" className="w-1/2 bg-surface-container-low border-none border-r border-outline-variant px-lg py-md font-body-md text-on-surface focus:ring-0" />
                      <input type="text" placeholder="CVC" className="w-1/2 bg-surface-container-low border-none px-lg py-md font-body-md text-on-surface focus:ring-0" />
                    </div>
                  </div>
                </div>

                <div className="pt-md">
                  <button type="button" className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Pay $29.00 USD
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 pt-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span className="font-label-mono text-[11px] uppercase tracking-wider">7-day no-questions-asked refund policy</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
