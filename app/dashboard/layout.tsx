import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Live Conversion Monitoring | Horizons AI',
  description: 'Monitor your site conversion health in real-time. Identify leaks and performance friction using AI swarm intelligence.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
