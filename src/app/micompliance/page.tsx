import { Metadata } from 'next';
import MiCompliance from '../../components/MiCompliance/MiCompliance';

export const metadata: Metadata = {
  title: 'MiCompliance - Mintsurvey',
  description: 'Learn about MiCompliance, Mintsurvey’s tool for regulatory and compliance insights.',
  openGraph: {
    title: 'MiCompliance - Mintsurvey',
    description: 'Learn about MiCompliance, Mintsurvey’s tool for regulatory and compliance insights.',
    images: [
      {
        url: 'https://yourdomain.com/images/micompliance-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey MiCompliance Preview',
      },
    ],
    url: 'https://yourdomain.com/micompliance',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiCompliance - Mintsurvey',
    description: 'Learn about MiCompliance, Mintsurvey’s tool for regulatory and compliance insights.',
    images: ['https://yourdomain.com/images/micompliance-og-image.png'],
  },
};

export default function MiCompliancePage() {
  return (
    <div>
      <MiCompliance />
    </div>
  );
}