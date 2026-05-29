import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full py-16 px-6 mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
            Horizons
          </Link>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            Precision Trust & Conversion Intelligence.<br />
            © 2024 Horizons AI. All rights reserved.
          </p>
        </div>

        {/* Product Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Product</h4>
          <Link href="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Dashboard</Link>
          <Link href="/reports" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Reports</Link>
          <Link href="/persona-insights" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Personas</Link>
          <Link href="/checkout" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Pricing</Link>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Resources</h4>
          <Link href="/success-stories" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Success Stories</Link>
          <Link href="/resource-center" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Resource Center</Link>
          <Link href="/faq" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">FAQ</Link>
          <Link href="/legal" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Legal</Link>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">Company</h4>
          <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">About Us</Link>
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Careers</a>
          <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
