// SOLUTION 1: Try this corrected version
import Home from '../../components/Home/Home';
import React from 'react';
import { Metadata } from 'next';

// Make sure this export is EXACTLY like this - before the component
export const metadata: Metadata = {
  title: 'Empowering Businesses Through Data - Mintsurvey',
  description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
  openGraph: {
    title: 'Empowering Businesses Through Data - Mintsurvey',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
    images: ['/home/ContentWithImage1.png'],
    url: 'https://yourdomain.com',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empowering Businesses Through Data - Mintsurvey',
    description: 'Unlock smarter decisions with insightful data and cutting-edge media intelligence solutions at Mintsurvey.',
    images: ['/home/ContentWithImage1.png'],
  },
};

// Component name should start with capital letter
export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}