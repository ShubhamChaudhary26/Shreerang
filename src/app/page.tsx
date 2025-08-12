import Home from '@/src/components/Home/Home';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'shreerang',
  description:
    'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at shreerang.',
  metadataBase: new URL('https://shreerang.com'), // ✅ Added for consistency
  openGraph: {
    title: 'shreerang',
    description:
      'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at shreerang.',
    images: [
      {
        url: 'https://yourdomain.com/home/ContentWithImage1.png', // ✅ Absolute URL
        width: 1200,
        height: 630,
        alt: 'shreerang Preview',
      },
    ],
    url: 'https://shreerang.com',
    type: 'website',
    siteName: 'shreerang',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'shreerang',
    description:
      'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at shreerang.',
    images: ['https://yourdomain.com/home/ContentWithImage1.png'],
  },
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
