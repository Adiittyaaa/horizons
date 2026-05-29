import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automated Reports | Behavioral Audit Archive | Horizons AI',
  description: 'Access your full history of automated swarm reports and conversion audits. Track improvements over time.',
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
