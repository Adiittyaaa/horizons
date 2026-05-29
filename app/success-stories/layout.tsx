import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories | CRO Case Studies & ROI Metrics | Horizons AI',
  description: 'See how top-performing teams use Horizons AI to detect conversion leaks and double their conversion rates. Real ROI from real companies.',
};

export default function SuccessStoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
