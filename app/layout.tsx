import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = {
  title: 'Horizons AI | Behavioral Intelligence & Conversion Optimization',
  description: 'AI agents simulate real visitor behavior to detect hidden trust leaks and conversion friction. Optimize your site with behavioral swarm intelligence.',
  keywords: ['CRO', 'Conversion Rate Optimization', 'AI User Testing', 'Behavioral Analytics', 'Trust Leaks', 'SaaS Optimization'],
  openGraph: {
    title: 'Horizons AI | Behavioral Intelligence',
    description: 'AI-powered behavioral swarms for deep conversion audit.',
    type: 'website',
    url: 'https://horizons.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizons AI',
    description: 'Detect hidden conversion leaks with AI personas.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
  <body className="bg-white text-black font-body-md antialiased min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
