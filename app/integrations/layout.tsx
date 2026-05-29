import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations | Workflow Automation Ecosystem | Horizons AI',
  description: 'Connect Horizons AI with Slack, HubSpot, Salesforce, and more. Amplify your conversion insights through your existing toolstack.',
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
