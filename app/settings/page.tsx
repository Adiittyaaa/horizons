'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/lib/AuthContext';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Settings State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [defaultUrl, setDefaultUrl] = useState('');

  // UI Control State
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  // Fetch settings on load
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchSettings = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`/api/settings?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          setName(data.name || '');
          setCompany(data.company || '');
          setOpenaiApiKey(data.openaiApiKey || '');
          setWebhookUrl(data.webhookUrl || '');
          setDefaultUrl(data.defaultUrl || '');
        } else {
          console.error('Failed to load settings');
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSettings();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    setIsSaving(true);
    setStatus({ type: null, text: '' });

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name,
          company,
          openaiApiKey,
          webhookUrl,
          defaultUrl,
        }),
      });

      if (res.ok) {
        setStatus({ type: 'success', text: 'Configuration saved successfully!' });
        setTimeout(() => {
          setStatus({ type: null, text: '' });
        }, 4000);
      } else {
        const err = await res.json();
        setStatus({ type: 'error', text: err.error || 'Failed to save configuration.' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setStatus({ type: 'error', text: 'A network error occurred. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-t-2 border-primary rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary animate-pulse">radar</span>
          </div>
        </div>
        <div className="mt-8 font-label-mono text-label-mono text-outline uppercase tracking-[0.2em] animate-pulse">Initializing Workspace...</div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        {/* Main Settings Panel */}
        <div className="lg:col-span-9 flex flex-col gap-lg">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Configuration
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight">
                Workspace Settings
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                Configure your personal workspace, api keys, and webhook endpoints to integrate Horizons with your custom scan triggers and analysis models.
              </p>
            </div>
          </header>

          {/* Form container */}
          <form onSubmit={handleSave} className="flex flex-col gap-gutter">
            {/* Status alerts */}
            {status.type && (
              <div 
                className={`flex items-center gap-sm px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  status.type === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-error/10 border-error/30 text-error'
                }`}
              >
                <span className="material-symbols-outlined">
                  {status.type === 'success' ? 'check_circle' : 'error'}
                </span>
                <span className="font-body-sm font-semibold">{status.text}</span>
              </div>
            )}

            {/* Grid of Bento Settings Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              
              {/* Account profile card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-lg shadow-sm flex flex-col gap-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[2rem] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="flex items-center gap-3 pb-2 border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                  <h3 className="font-headline-md text-base text-on-surface">Account Profile</h3>
                </div>

                <div className="flex flex-col gap-sm mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Email Address (Read-only)</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
                      <input 
                        type="email" 
                        value={user.email} 
                        readOnly 
                        className="w-full bg-surface-container-low/60 border border-outline-variant/50 rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-outline cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Display Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">badge</span>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="John Doe" 
                        disabled={isFetching}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Company Name</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">corporate_fare</span>
                      <input 
                        type="text" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="Acme Corp" 
                        disabled={isFetching}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scan Configurations card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-lg shadow-sm flex flex-col gap-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[2rem] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="flex items-center gap-3 pb-2 border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm">radar</span>
                  </div>
                  <h3 className="font-headline-md text-base text-on-surface">Scan Configurations</h3>
                </div>

                <div className="flex flex-col gap-sm mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Default Scan Target URL</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">link</span>
                      <input 
                        type="url" 
                        value={defaultUrl} 
                        onChange={(e) => setDefaultUrl(e.target.value)} 
                        placeholder="https://example.com" 
                        disabled={isFetching}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-outline px-1">
                      This domain will be automatically loaded as the pre-filled target for conversion leak reports.
                    </span>
                  </div>
                </div>
              </div>

              {/* Integrations card (Full width / spans two columns on md+) */}
              <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-lg shadow-sm flex flex-col gap-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[3rem] -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="flex items-center gap-3 pb-2 border-b border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm">api</span>
                  </div>
                  <h3 className="font-headline-md text-base text-on-surface">API Keys & Integrations</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">OpenAI API Key</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">key</span>
                      <input 
                        type={showApiKey ? "text" : "password"} 
                        value={openaiApiKey} 
                        onChange={(e) => setOpenaiApiKey(e.target.value)} 
                        placeholder="sk-proj-••••••••••••••••" 
                        disabled={isFetching}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-12 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {showApiKey ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    <span className="text-[10px] text-outline px-1">
                      Provide a custom OpenAI API token to override global rate-limits and enable high-fidelity persona agent scans.
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Scan Completed Alert Webhook</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">webhook</span>
                      <input 
                        type="url" 
                        value={webhookUrl} 
                        onChange={(e) => setWebhookUrl(e.target.value)} 
                        placeholder="https://api.yourcompany.com/webhooks" 
                        disabled={isFetching}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-outline px-1">
                      Horizons will deliver a JSON payload containing identified conversion leaks to this endpoint once automated scans complete.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Save Buttons & Action footer */}
            <div className="flex justify-end items-center gap-sm mt-4 p-4 bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/60 rounded-3xl">
              <button 
                type="button" 
                onClick={() => router.push('/dashboard')} 
                disabled={isSaving}
                className="px-6 py-3.5 border border-outline-variant hover:bg-surface-container-low rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors font-label-mono disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSaving || isFetching}
                className="px-8 py-3.5 bg-primary text-on-primary rounded-2xl hover:opacity-90 hover:scale-[1.02] active:scale-95 text-xs font-bold uppercase tracking-widest transition-all font-label-mono shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span>Saving...</span>
                    <span className="animate-spin material-symbols-outlined text-[16px]">sync</span>
                  </>
                ) : (
                  <>
                    <span>Save Changes</span>
                    <span className="material-symbols-outlined text-[16px]">save</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
