import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team Management | Collaboration & Permissions | Horizons AI',
  description: 'Manage your conversion optimization team. Define roles, permissions, and collaborate on behavioral audit findings.',
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
