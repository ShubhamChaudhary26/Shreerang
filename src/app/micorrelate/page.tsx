import { Metadata } from 'next';
import MiCorrelate from '../../components/MiCorrelate/MiCorrelate';

export const metadata: Metadata = {
  title: 'MiCorrelate - Mintsurvey',
  description: 'Discover MiCorrelate, Mintsurvey’s tool for advanced data correlation and insights.',
  openGraph: {
    title: 'MiCorrelate - Mintsurvey',
    description: 'Discover MiCorrelate, Mintsurvey’s tool for advanced data correlation and insights.',
    images: [
      {
        url: 'https://yourdomain.com/images/micorrelate-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey MiCorrelate Preview',
      },
    ],
    url: 'https://yourdomain.com/micorrelate',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiCorrelate - Mintsurvey',
    description: 'Discover MiCorrelate, Mintsurvey’s tool for advanced data correlation and insights.',
    images: ['https://yourdomain.com/images/micorrelate-og-image.png'],
  },
};

export default function MiCorrelatePage() {
  return (
    <div>
      <MiCorrelate />
    </div>
  );
}