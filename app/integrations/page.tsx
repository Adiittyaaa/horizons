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
  statusCode?: number;
  statusText?: string;
  responseTimeMs?: number;
  errorMessage?: string | null;
  isSimulated?: boolean;
  signature?: string;
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
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

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
        const { __webhookTest, apiKey: storedKey, ...states } = data;
        setIntegrationStates(states);
        if (storedKey) setApiKey(storedKey);
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

  const handleGenerateApiKey = async () => {
    if (!user?.email) return;
    setIsGeneratingKey(true);
    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          action: 'generate_api_key'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.apiKey) setApiKey(data.apiKey);
      }
    } catch (err) {
      console.error('Failed to generate key', err);
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const copyApiKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
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
    if (!user?.email || !webhookUrlInput.trim()) return;
    setIsTestingWebhook(true);
    setWebhookError(null);

    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          webhookTestUrl: webhookUrlInput.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setWebhookError(data.error || 'Webhook verification failed.');
        return;
      }

      if (data.data && data.data.__webhookTest) {
        setWebhookTest(data.data.__webhookTest);
        if (data.data.__webhookTest.url) {
          setWebhookUrlInput(data.data.__webhookTest.url);
        }
      }
    } catch (error: any) {
      console.error("Failed to test webhook", error);
      setWebhookError(error.message || 'Failed to send HTTP test request.');
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const copyPayloadJson = () => {
    if (!webhookTest.payload) return;
    navigator.clipboard.writeText(JSON.stringify(webhookTest.payload, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
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

          {/* REST API & Webhooks Section */}
          <section className="mt-8 md:mt-xl p-6 md:p-xl rounded-[2rem] md:rounded-[3rem] bg-surface-container-high border border-outline-variant relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-xl relative z-10">
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                    <span className="material-symbols-outlined text-[16px]">api</span>
                    Developer Portal
                  </div>
                  <h2 className="font-headline-lg text-display-sm text-primary mb-3">REST API & Webhooks</h2>
                  <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Directly ingest swarm behavior data into your internal analytics tools. Configure a webhook URL to receive real-time events.
                  </p>

                  <div className="flex flex-col gap-4 mb-6 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-sm">key</span>
                      </div>
                      <div className="flex-grow">
                        <span className="text-sm font-bold text-on-surface block">Secure API Authentication</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <input 
                            type={showApiKey ? "text" : "password"} 
                            readOnly 
                            value={apiKey || 'hz_live_loading...'} 
                            className="text-xs font-label-mono px-3 py-1.5 bg-surface-container-high border border-outline-variant rounded-lg flex-grow text-on-surface"
                          />
                          <button 
                            onClick={() => setShowApiKey(!showApiKey)} 
                            title={showApiKey ? "Hide Key" : "Reveal Key"}
                            className="p-1.5 rounded-lg border border-outline-variant bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors text-xs"
                          >
                            <span className="material-symbols-outlined text-base">
                              {showApiKey ? "visibility_off" : "visibility"}
                            </span>
                          </button>
                          <button 
                            onClick={copyApiKey} 
                            title="Copy API Key"
                            className="p-1.5 rounded-lg border border-outline-variant bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors text-xs font-bold flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-base">
                              {copiedApiKey ? "check" : "content_copy"}
                            </span>
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-[10px] text-outline font-label-mono">Passed in X-Horizons-Signature header</span>
                          <button 
                            onClick={handleGenerateApiKey}
                            disabled={isGeneratingKey}
                            className="text-[10px] text-secondary hover:underline font-bold disabled:opacity-50"
                          >
                            {isGeneratingKey ? "Regenerating..." : "Roll secret key"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-outline-variant/40">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-sm">notifications_active</span>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-on-surface block">Real-time Webhook Events</span>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          Payloads include conversion leaks, persona sentiment scores, and revenue impact alerts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-on-surface flex items-center justify-between">
                    <span>Test Webhook URL</span>
                    <span className="text-[10px] font-normal text-on-surface-variant">HTTP POST</span>
                  </label>
                  
                  {webhookError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-600 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm shrink-0">error</span>
                      <span>{webhookError}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input 
                      type="url"
                      placeholder="https://your-domain.com/webhook"
                      className="flex-grow px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                      value={webhookUrlInput}
                      onChange={(e) => {
                        setWebhookUrlInput(e.target.value);
                        setWebhookError(null);
                      }}
                    />
                    <button 
                      onClick={handleTestWebhook}
                      disabled={isTestingWebhook || !webhookUrlInput.trim()}
                      className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 flex items-center gap-2 shadow-md"
                    >
                      {isTestingWebhook ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <span>Test</span>
                          <span className="material-symbols-outlined text-sm">send</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-outline">
                    Tip: You can use placeholder URLs like <code className="bg-surface-container-low px-1 rounded">https://your-domain.com/webhook</code> or a live target endpoint.
                  </p>
                </div>
              </div>

              {/* Webhook Response Console */}
              <div className="lg:col-span-3 bg-slate-950 rounded-2xl p-6 font-label-mono text-xs overflow-hidden shadow-2xl border border-slate-800 flex flex-col min-h-[420px]">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-slate-400 text-[11px] ml-2 font-bold tracking-wide">Webhook Diagnostic Console</span>
                  </div>
                  
                  {webhookTest.status && (
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        webhookTest.status === 'success' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {webhookTest.statusCode ? `${webhookTest.statusCode} ${webhookTest.statusText || ''}` : webhookTest.status}
                      </span>
                      {webhookTest.responseTimeMs !== undefined && (
                        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                          ⚡ {webhookTest.responseTimeMs} ms
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow flex flex-col">
                  {webhookTest.payload ? (
                    <>
                      <div className="mb-3 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                        <div>
                          <span className="text-slate-600">URL:</span> <span className="text-slate-300 underline">{webhookTest.url}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Tested:</span> <span className="text-slate-300">{new Date(webhookTest.lastTested!).toLocaleTimeString()}</span>
                        </div>
                        {webhookTest.isSimulated && (
                          <div className="text-amber-400 font-semibold">
                            (Simulated Verification)
                          </div>
                        )}
                      </div>

                      {webhookTest.errorMessage && (
                        <div className="mb-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs">
                          ⚠️ {webhookTest.errorMessage}
                        </div>
                      )}

                      {webhookTest.signature && (
                        <div className="mb-3 p-2 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-400 overflow-x-auto flex items-center justify-between">
                          <span className="text-slate-500">Header [X-Horizons-Signature]:</span>
                          <code className="text-secondary ml-2">{webhookTest.signature}</code>
                        </div>
                      )}

                      <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 font-bold">Sample Payload Sent:</div>
                      <pre className="text-emerald-400 bg-slate-900/80 p-4 rounded-xl border border-slate-800 block whitespace-pre overflow-x-auto flex-grow text-[11px] leading-relaxed">
                        {JSON.stringify(webhookTest.payload, null, 2)}
                      </pre>
                    </>
                  ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-slate-500 py-12 text-center">
                      <span className="material-symbols-outlined text-4xl mb-2 text-slate-700">send_time_extension</span>
                      <p className="text-sm font-semibold text-slate-400">No Webhook Event Sent Yet</p>
                      <p className="text-xs text-slate-600 max-w-sm mt-1">
                        Enter your webhook URL on the left and click <span className="text-slate-400 font-bold">Test</span> to dispatch a real HTTP POST request and inspect response diagnostics.
                      </p>
                    </div>
                  )}
                </div>

                {webhookTest.payload && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500 text-[10px]">
                      {webhookTest.status === 'success' ? '✓ Request completed successfully' : '✖ Endpoint verification failed'}
                    </span>
                    <button 
                      onClick={copyPayloadJson}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 font-bold"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {copiedJson ? 'check' : 'content_copy'}
                      </span>
                      {copiedJson ? 'Copied!' : 'Copy JSON'}
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

