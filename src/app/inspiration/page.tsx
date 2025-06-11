import { Metadata } from 'next';
import Inspiration from '../../components/Inspiration/Inspiration';

export const metadata: Metadata = {
  title: 'Inspiration - Mintsurvey',
  description: 'Explore inspiring content and insights from Mintsurvey to fuel your ideas.',
  openGraph: {
    title: 'Inspiration - Mintsurvey',
    description: 'Explore inspiring content and insights from Mintsurvey to fuel your ideas.',
    images: [
      {
        url: 'https://yourdomain.com/images/inspiration-og-image.png', // Replace with your 1200x630 image
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Inspiration Preview',
      },
    ],
    url: 'https://yourdomain.com/inspiration',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspiration - Mintsurvey',
    description: 'Explore inspiring content and insights from Mintsurvey to fuel your ideas.',
    images: ['https://yourdomain.com/images/inspiration-og-image.png'],
  },
};

export default function InspirationPageRoute() {
  return (
    <div>
      <Inspiration />
    </div>
  );
}