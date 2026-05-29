import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Support & Knowledge Base | Horizons AI',
  description: 'Find answers to common questions about Horizons AI swarms, setup, pricing, and behavioral intelligence methodology.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
