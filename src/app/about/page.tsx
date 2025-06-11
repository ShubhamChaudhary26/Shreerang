import About from '../../components/About/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Mintsurvey',
  description: 'Learn about Mintsurvey’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
  openGraph: {
    title: 'About Us - Mintsurvey',
    description: 'Learn about Mintsurvey’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
    images: [
      {
        url: 'https://yourdomain.com/images/about-og-image.png', // Absolute URL is safer
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'About Mintsurvey',
      },
    ],
    url: 'https://yourdomain.com/about',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Mintsurvey',
    description: 'Learn about Mintsurvey’s mission to empower businesses with insightful data and innovative media intelligence solutions.',
    images: ['https://yourdomain.com/images/about-og-image.png'],
  },
};

export default function AboutPage() {
  return (
    <div>
      <About />
    </div>
  );
}