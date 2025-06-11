import Home from '@/src/components/Home/Home';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mintsurvey',
  description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
  openGraph: {
    title: 'Mintsurvey',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
    images: [
      {
        url: 'https://yourdomain.com/home/ContentWithImage1.png', // Absolute URL is safer
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'Mintsurvey Preview',
      },
    ],
    url: 'https://mintsurvey.com',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mintsurvey',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
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