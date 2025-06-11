import { Metadata } from 'next';
import MiAuto from '../../components/MiAuto/MiAuto';

export const metadata: Metadata = {
  title: 'MiAuto - Mintsurvey',
  description: 'Discover MiAuto, Mintsurvey’s innovative solution for automated insights.',
  openGraph: {
    title: 'MiAuto - Mintsurvey',
    description: 'Discover MiAuto, Mintsurvey’s innovative solution for automated insights.',
    images: [
      {
        url: 'https://yourdomain.com/images/miauto-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey MiAuto Preview',
      },
    ],
    url: 'https://yourdomain.com/miauto',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiAuto - Mintsurvey',
    description: 'Discover MiAuto, Mintsurvey’s innovative solution for automated insights.',
    images: ['https://yourdomain.com/images/miauto-og-image.png'],
  },
};

export default function MiAutoPage() {
  return (
    <div>
      <MiAuto />
    </div>
  );
}