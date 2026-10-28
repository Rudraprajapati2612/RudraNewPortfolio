import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rudra Prajapati | Systems, DeFi & Engineering Portfolio',
  description:
    'Editorial engineering portfolio of Rudra Prajapati — systems builder exploring low-latency matching, decentralized protocols, and computer vision.',
  openGraph: {
    title: 'Rudra Prajapati | Systems, DeFi & Engineering Portfolio',
    description:
      'Editorial engineering portfolio of Rudra Prajapati — systems builder exploring low-latency matching, decentralized protocols, and computer vision.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rudra Prajapati | Systems, DeFi & Engineering Portfolio',
    description:
      'Editorial engineering portfolio of Rudra Prajapati — systems builder exploring low-latency matching, decentralized protocols, and computer vision.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F3F1E8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${mono.variable}`}
    >
      <body className="antialiased min-h-screen text-[var(--color-ink)] bg-[var(--color-canvas)] selection:bg-[#E7E4F2] selection:text-[#604BB4]">
        {children}
      </body>
    </html>
  );
}
