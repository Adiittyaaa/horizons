'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface IntegrationState {
  connected: boolean;
  connectedAt?: string | null;
  lastSync?: string;
}

interface WebhookTestState {
  url?: string;
  lastTested?: string;
  status?: string;
  payload?: any;
}

interface AllIntegrations {
  [key: string]: IntegrationState;
}

export default function IntegrationsPage() {
  const { user, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  
  const [integrationStates, setIntegrationStates] = useState<AllIntegrations>({});
  const [webhookTest, setWebhookTest] = useState<WebhookTestState>({});
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [loadingIntegration, setLoadingIntegration] = useState<string | null>(null);

  const baseIntegrations = [
    { name: "Slack", icon: "forum", description: "Receive real-time conversion leak alerts and weekly swarm summaries directly in your Slack channels.", status: "Available" },
    { name: "HubSpot", icon: "hub", description: "Sync identified persona segments with your HubSpot CRM to personalize email marketing campaigns.", status: "Available" },
    { name: "Salesforce", icon: "cloud_done", description: "Inject behavioral insights into your Salesforce leads to help sales teams prioritize based on intent.", status: "Pro Only" },
    { name: "Segment", icon: "dataset", description: "Stream raw behavioral simulation data to your warehouse via Segment's event pipeline.", status: "Pro Only" },
    { name: "Intercom", icon: "chat", description: "Trigger Intercom flows based on AI-detected friction points in the user journey.", status: "Available" },
    { name: "Zapier", icon: "bolt", description: "Connect Horizons with 5,000+ apps to automate your CRO workflow.", status: "Available" },
    { name: "PostHog", icon: "data_exploration", description: "Directly import your PostHog heatmaps into our swarm analyzer for deeper persona simulation.", status: "Pro Only" },
    { name: "Discord", icon: "discord", description: "Send automated updates and insights directly to your team's Discord server.", status: "Available" },
    { name: "GitHub", icon: "code", description: "Automatically create GitHub issues when significant UI friction points are identified.", status: "Available" },
    { name: "Jira", icon: "bug_report", description: "Sync UX friction issues directly to your Jira backlog for engineering to resolve.", status: "Pro Only" },
    { name: "Mailchimp", icon: "mail", description: "Export user segments into Mailchimp audiences for targeted retention campaigns.", status: "Available" },
    { name: "Mixpanel", icon: "analytics", description: "Analyze custom user segments and conversion flow events directly in Mixpanel.", status: "Available" },
    { name: "Amplitude", icon: "monitoring", description: "Track simulated user paths and drop-offs within your Amplitude event streams.", status: "Pro Only" },
    { name: "Google Analytics", icon: "query_stats", description: "Send custom virtual pageviews and event hits corresponding to friction points.", status: "Available" },
    { name: "Linear", icon: "task_alt", description: "File software issues and engineering tasks for identified design flaws.", status: "Available" }
  ];

  useEffect(() => {
    if (user?.email) {
      fetchIntegrations();
    }
  }, [user]);

  const fetchIntegrations = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/integrations?email=${encodeURIComponent(user!.email)}`);
      if (res.ok) {
        const data = await res.json();
        const { __webhookTest, ...states } = data;
        setIntegrationStates(states);
        if (__webhookTest) {
          setWebhookTest(__webhookTest);
          if (__webhookTest.url) setWebhookUrlInput(__webhookTest.url);
        }
      }
    } catch (error) {
      console.error("Failed to fetch integrations", error);
    } finally {
      setIsFetching(false);
    }
  };

  const toggleConnection = async (integrationName: string, currentlyConnected: boolean) => {
    if (!user?.email) return;
    setLoadingIntegration(integrationName);
    
    // Optimistic update
    setIntegrationStates(prev => ({
      ...prev,
      [integrationName]: {
        ...prev[integrationName],
        connected: !currentlyConnected,
        lastSync: !currentlyConnected ? 'Just now' : 'Never'
      }
    }));

    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          integrationName,
          connected: !currentlyConnected
        })
      });
      
      if (!res.ok) {
        // Revert on failure
        fetchIntegrations();
      }
    } catch (error) {
      console.error("Failed to toggle connection", error);
      fetchIntegrations();
    } finally {
      setLoadingIntegration(null);
    }
  };

  const handleTestWebhook = async () => {
    if (!user?.email || !webhookUrlInput) return;
    setIsTestingWebhook(true);

    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          webhookTestUrl: webhookUrlInput
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data && data.data.__webhookTest) {
          setWebhookTest(data.data.__webhookTest);
        }
      }
    } catch (error) {
      console.error("Failed to test webhook", error);
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const integrations = baseIntegrations.map(int => {
    const state = integrationStates[int.name] || { connected: false, lastSync: 'Never' };
    return {
      ...int,
      health: state.connected ? 'Connected' : 'Idle',
      lastSync: state.lastSync || 'Never',
      isConnected: state.connected
    };
  });

  const filteredIntegrations = integrations.filter(int => {
    const matchesSearch = int.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' 
      || (filter === 'Connected' && int.isConnected) 
      || (filter === 'Pro' && int.status === 'Pro Only');
    return matchesSearch && matchesFilter;
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-t-2 border-primary rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary animate-pulse">hub</span>
          </div>
        </div>
        <div className="mt-8 font-label-mono text-label-mono text-outline uppercase tracking-[0.2em] animate-pulse">Loading Integrations...</div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        {/* Integrations Main Content */}
        <div className="lg:col-span-9 flex flex-col gap-lg">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">extension</span>
                Ecosystem
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight">Integrations</h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                Connect your conversion funnel to the rest of your tech stack. Feed behavioral insights into your CRM or receive alerts in Slack.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="Search tools..." 
                  className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary transition-colors w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </header>

          {/* Filter Tabs */}
          <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl self-start">
            {['All', 'Connected', 'Pro'].map((t) => (
              <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === t ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {filteredIntegrations.map((int) => (
              <div key={int.name} className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-6 shadow-sm hover:ambient-shadow transition-all group flex flex-col relative overflow-hidden">
                {int.status === "Pro Only" && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-label-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-bold">Pro</span>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <span className="material-symbols-outlined text-2xl text-secondary">{int.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-on-surface leading-none mb-1">{int.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${int.isConnected ? 'bg-green-500' : 'bg-outline/30'}`}></span>
                      <span className="text-[10px] font-label-mono text-outline uppercase font-bold tracking-wider">{int.health}</span>
                    </div>
                  </div>
                </div>

                <p className="font-body-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                  {int.description}
                </p>

                <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] font-label-mono text-outline uppercase tracking-wider">
                    <span>Last Sync</span>
                    <span className="text-on-surface-variant">{int.lastSync}</span>
                  </div>
                  
                  {int.status === "Pro Only" && !user?.isPro ? (
                    <Link href="/upgrade" className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant">
                      Upgrade to Connect
                    </Link>
                  ) : (
                    <button 
                      onClick={() => toggleConnection(int.name, int.isConnected)}
                      disabled={loadingIntegration === int.name}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        int.isConnected 
                          ? "bg-surface-container-high text-red-500 hover:bg-red-500/10 border border-outline-variant" 
                          : "bg-primary text-on-primary hover:opacity-90 shadow-md shadow-primary/10 active:scale-95"
                      }`}
                    >
                      {loadingIntegration === int.name ? (
                        <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                      ) : (
                        <>
                          {int.isConnected ? "Disconnect" : "Connect"}
                          {!int.isConnected && <span className="material-symbols-outlined text-sm">link</span>}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Custom API Request Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/20 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary">add_circle</span>
              </div>
              <h3 className="font-headline-sm text-white mb-2">Request Integration</h3>
              <p className="text-white/60 text-xs mb-6 px-4">
                Need a specific tool? We're constantly adding new connectors to our library.
              </p>
              <button 
                className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95"
                onClick={() => alert("Integration request submitted. Our team will review this shortly.")}
              >
                Suggest Tool
              </button>
            </div>
          </div>

          {/* Webhook Section */}
          <section className="mt-8 md:mt-xl p-6 md:p-xl rounded-[2rem] md:rounded-[3rem] bg-surface-container-high border border-outline-variant relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-xl relative z-10">
              <div className="lg:col-span-2 flex flex-col justify-center">
                <h2 className="font-headline-lg text-display-sm text-primary mb-4">REST API & Webhooks</h2>
                <p className="font-body-md text-on-surface-variant mb-lg leading-relaxed">
                  Directly ingest swarm behavior data into your internal analytics tools. Configure a webhook URL to receive real-time events.
                </p>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-sm">key</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">Secure API Authentication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-sm">notifications_active</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">Real-time Webhook Events</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-on-surface">Test Webhook URL</label>
                  <div className="flex gap-2">
                    <input 
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                      className="flex-grow px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                      value={webhookUrlInput}
                      onChange={(e) => setWebhookUrlInput(e.target.value)}
                    />
                    <button 
                      onClick={handleTestWebhook}
                      disabled={isTestingWebhook || !webhookUrlInput}
                      className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 flex items-center gap-2"
                    >
                      {isTestingWebhook ? 'Testing...' : 'Test'}
                      {!isTestingWebhook && <span className="material-symbols-outlined text-sm">send</span>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 bg-slate-950 rounded-2xl p-6 font-label-mono text-xs overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                  </div>
                  <span className="text-slate-500 text-[9px] uppercase tracking-widest font-black">webhook payload test</span>
                </div>
                
                <div className="flex-grow flex flex-col">
                  {webhookTest.payload ? (
                    <>
                      <div className="mb-4">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${webhookTest.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {webhookTest.status === 'success' ? '202 Accepted' : 'Error'}
                        </span>
                        <span className="text-slate-500 ml-2 text-[10px]">
                          Tested: {new Date(webhookTest.lastTested!).toLocaleString()}
                        </span>
                      </div>
                      <code className="text-green-400 block whitespace-pre overflow-x-auto flex-grow">
                        {JSON.stringify(webhookTest.payload, null, 2)}
                      </code>
                    </>
                  ) : (
                    <div className="flex-grow flex items-center justify-center text-slate-500">
                      Enter a URL and click Test to see a sample webhook payload.
                    </div>
                  )}
                </div>

                {webhookTest.payload && (
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                    <button 
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(webhookTest.payload, null, 2))}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      Copy JSON
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
