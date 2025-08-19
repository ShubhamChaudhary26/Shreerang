import Agreement from '@/src/components/Agreement/Agreement'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agreement | Shreerang Associates - Rent Agreement & Legal Services',
  description:
    'Shreerang Associates offers hassle-free Online Rent Agreement services in Pune and across Maharashtra, along with expert legal and property solutions.',
  metadataBase: new URL('https://rentagreementwithus.com'),
  openGraph: {
    title: 'Agreement | Shreerang Associates',
    description:
      'Looking for Rent Agreement services in Pune? Shreerang Associates provides reliable online rent agreement, property, and legal solutions across Maharashtra.',
    images: [
      {
        url: 'https://rentagreementwithus.com/og.png',
        width: 1200,
        height: 630,
        alt: 'Shreerang Associates Agreement Page Preview',
      },
    ],
    url: 'https://rentagreementwithus.com/agreement',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agreement | Shreerang Associates - Rent Agreement & Legal Services',
    description:
      'Get your Online Rent Agreement in Pune easily with Shreerang Associates. Trusted legal, property, and digital governance solutions across Maharashtra.',
    images: ['https://rentagreementwithus.com/og.png'],
  },
  alternates: {
    canonical: 'https://rentagreementwithus.com/agreement',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    // ✅ Main Keywords
    'Rent Agreement Pune',
    'Online Rent Agreement Pune',
    'Shreerang Associates Rent Agreement',
    'Digital Rent Agreement Maharashtra',
    'Legal Services in Pune',
    'Property Agreement Pune',
    'Online Property Agreement Maharashtra',

    // ✅ Long-tail Keywords (Google search variations)
    'Rent Agreement in Pune near me',
    'Hassle free rent agreement Pune',
    'Pune online rent agreement service',
    'Shreerang Associates rent agreement Pune',
    'Property rent agreement in Maharashtra',
    'Notary rent agreement Pune',
    'Legal property consultation Pune',
    'E-registration rent agreement Pune',
    'Online leave and license agreement Pune',
    'Affordable rent agreement Pune',
  ],
};


const page = () => {
  return (
    <div>
      <Agreement />
    </div>
  )
}

export default page
