import Agreement from '@/src/components/Agreement/Agreement'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agreement - Shreerang',
  description: 'Learn about Shreerang’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
  openGraph: {
    title: 'Agreement - Shreerang',
    description: 'Learn about Shreerang’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
    images: [
      {
        url: 'https://yourdomain.com/images/about-og-image.png', // Absolute URL is safer
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'About Shreerang',
      },
    ],
    url: 'https://yourdomain.com/about',
    type: 'website',
    siteName: 'Shreerang',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agreement - Shreerang',
    description: 'Learn about Shreerang’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
    images: ['https://yourdomain.com/images/about-og-image.png'],
  },
};


const page = () => {
  return (
    <div><Agreement/></div>
  )
}

export default page