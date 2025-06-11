import { Metadata } from 'next';
import Dashboard from '@/src/components/Client/Client';

export const metadata: Metadata = {
  title: 'Client Dashboard - Mintsurvey',
  description: 'Access your personalized client dashboard on Mintsurvey for survey insights and data.',
  openGraph: {
    title: 'Client Dashboard - Mintsurvey',
    description: 'Access your personalized client dashboard on Mintsurvey for survey insights and data.',
    images: [
      {
        url: 'https://yourdomain.com/images/client-og-image.png', // Replace with your 1200x630 image
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Client Dashboard Preview',
      },
    ],
    url: 'https://yourdomain.com/client',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Dashboard - Mintsurvey',
    description: 'Access your personalized client dashboard on Mintsurvey for survey insights and data.',
    images: ['https://yourdomain.com/images/client-og-image.png'],
  },
};

export default function ClientPage() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}