import Home from '../../components/Home/Home';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shreerang Associates | Online Rent Agreement in Pune & Maharashtra',
  description:
    'Shreerang Associates provides hassle-free Online Rent Agreement services in Pune and across Maharashtra. Get trusted digital rent agreement, legal, and property solutions.',
  metadataBase: new URL('https://rentagreementwithus.com'),
  openGraph: {
    title: 'Online Rent Agreement Pune | Shreerang Associates',
    description:
      'Looking for Online Rent Agreement in Pune? Shreerang Associates offers reliable rent agreement, property, and legal solutions across Maharashtra.',
    images: [
      {
        url: 'https://rentagreementwithus.com/og.png', // ✅ recommended single OG image
        width: 1200,
        height: 630,
        alt: 'Shreerang Associates - Online Rent Agreement Pune',
      },
    ],
    url: 'https://rentagreementwithus.com',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Rent Agreement Pune | Shreerang Associates',
    description:
      'Get your Online Rent Agreement in Pune with Shreerang Associates. Trusted legal, property, and digital governance solutions across Maharashtra.',
    images: ['https://rentagreementwithus.com/og.png'],
  },
  alternates: {
    canonical: 'https://rentagreementwithus.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'Shreerang Associates',
    'Online Rent Agreement Pune',
    'Pune Rent Agreement',
    'Digital Rent Agreement Maharashtra',
    'Shreerang Rent Agreement',
    'Property Agreement Services',
    'Legal Services Pune',
    'E-Governance Solutions',
    'Maharashtra Rent Agreement Online',
    'Online Property Solutions',
  ],
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
