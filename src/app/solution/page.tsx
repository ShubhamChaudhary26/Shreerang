import { Metadata } from 'next';
import Solution from '../../components/Solution/Solution';

export const metadata: Metadata = {
  title: 'Solutions - Mintsurvey',
  description: 'Discover Mintsurvey’s innovative solutions for data and survey insights.',
  openGraph: {
    title: 'Solutions - Mintsurvey',
    description: 'Discover Mintsurvey’s innovative solutions for data and survey insights.',
    images: [
      {
        url: 'https://yourdomain.com/images/solution-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Solutions Preview',
      },
    ],
    url: 'https://yourdomain.com/solution',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions - Mintsurvey',
    description: 'Discover Mintsurvey’s innovative solutions for data and survey insights.',
    images: ['https://yourdomain.com/images/solution-og-image.png'],
  },
};

export default function SolutionPage() {
  return (
    <div>
      <Solution />
    </div>
  );
}