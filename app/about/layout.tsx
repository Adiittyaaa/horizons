import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Horizons AI | The Future of Behavioral Intelligence',
  description: 'Learn about the mission behind Horizons AI. We’re building the world’s most advanced AI-simulated user testing platform for modern SaaS.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
