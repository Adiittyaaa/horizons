import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Center | CRO Guides & Behavioral Science | Horizons AI',
  description: 'Master the art of conversion optimization. Access our library of guides, research papers, and behavioral science insights.',
};

export default function ResourceCenterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
