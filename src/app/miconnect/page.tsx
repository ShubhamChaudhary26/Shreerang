import { Metadata } from 'next';
import MiConnect from '../../components/MiConnect/MiConnect';

export const metadata: Metadata = {
  title: 'MiConnect - Mintsurvey',
  description: 'Explore MiConnect, Mintsurvey’s solution for seamless data connectivity.',
  openGraph: {
    title: 'MiConnect - Mintsurvey',
    description: 'Explore MiConnect, Mintsurvey’s solution for seamless data connectivity.',
    images: [
      {
        url: 'https://yourdomain.com/images/miconnect-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey MiConnect Preview',
      },
    ],
    url: 'https://yourdomain.com/miconnect',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiConnect - Mintsurvey',
    description: 'Explore MiConnect, Mintsurvey’s solution for seamless data connectivity.',
    images: ['https://yourdomain.com/images/miconnect-og-image.png'],
  },
};

export default function MiConnectPage() {
  return (
    <div>
      <MiConnect />
    </div>
  );
}