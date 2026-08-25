import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Little Dreamers Club — Luxury Children’s & Baby Lifestyle',
  description:
    'Heirloom organic sleepwear, buttery cashmere blankets, and handcrafted treasures designed for little moments, big imaginations, and peaceful bedtime dreams.',
  keywords: [
    'Little Dreamers Club',
    'luxury baby clothes',
    'organic kids sleepwear',
    'cashmere baby blanket',
    'heirloom plush toys',
    'children boutique',
  ],
  authors: [{ name: 'Little Dreamers Club' }],
  metadataBase: new URL('https://littledreamersclub.com'),
  openGraph: {
    title: 'Little Dreamers Club — Luxury Children’s & Baby Lifestyle',
    description:
      'Heirloom organic sleepwear, buttery cashmere blankets, and handcrafted treasures made for little dreams.',
    url: 'https://littledreamersclub.com',
    siteName: 'Little Dreamers Club',
    images: [
      {
        url: '/images/hero-lifestyle.jpg',
        width: 1200,
        height: 630,
        alt: 'Little Dreamers Club Heirloom Sleepwear',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#FAF8F5] text-[#2A2433] selection:bg-[#EFEAF6] selection:text-[#4A3E56]">
        {children}
      </body>
    </html>
  );
}
