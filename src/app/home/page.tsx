import Home from '../../components/Home/Home';
import React from 'react';
import { Metadata } from 'next';

// SEO & social metadata for Shreerang
export const metadata: Metadata = {
  title: 'Shreerang Associates - Digital E-Governance Solutions',
  description: 'Shreerang Associates empowers individuals and businesses with digital e-governance, legal, and property solutions across India.',
  metadataBase: new URL('https://rentyourpropertywithus.vercel.app'),
  openGraph: {
    title: 'Shreerang Associates - Digital E-Governance Solutions',
    description: 'Shreerang Associates empowers individuals and businesses with digital e-governance, legal, and property solutions across India.',
    images: [
      {
        url: 'https://rentyourpropertywithus.vercel.app/home/ContentWithImage1.png', // absolute URL
        width: 1200,
        height: 630,
        alt: 'Shreerang Preview',
      },
    ],
    url: 'https://rentyourpropertywithus.vercel.app',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
  
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
