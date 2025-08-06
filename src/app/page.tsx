import Home from '@/src/components/Home/Home';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shreeman',
  description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Shreeman.',
  openGraph: {
    title: 'Shreeman',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Shreeman.',
    images: [
      {
        url: 'https://yourdomain.com/home/ContentWithImage1.png', // Absolute URL is safer
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'Shreeman Preview',
      },
    ],
    url: 'https://Shreeman.com',
    type: 'website',
    siteName: 'Shreeman',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreeman',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Shreeman.',
    images: ['https://yourdomain.com/home/ContentWithImage1.png'], // Absolute URL
  },
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}