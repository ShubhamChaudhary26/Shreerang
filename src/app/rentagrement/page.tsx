import { Metadata } from 'next';
import RentAgreement from '@/src/components/RentAgreement/MiConnect';

export const metadata: Metadata = {
  title: 'RentAgreement - shreerang',
  description: 'Explore RentAgreement, shreerang’s solution for seamless data connectivity.',
  openGraph: {
    title: 'RentAgreement - shreerang',
    description: 'Explore RentAgreement, shreerang’s solution for seamless data connectivity.',
    images: [
      {
        url: 'https://yourdomain.com/images/RentAgreement-og-image.png',
        width: 1200,
        height: 630,
        alt: 'shreerang RentAgreement Preview',
      },
    ],
    url: 'https://yourdomain.com/RentAgreement',
    type: 'website',
    siteName: 'shreerang',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentAgreement - shreerang',
    description: 'Explore RentAgreement, shreerang’s solution for seamless data connectivity.',
    images: ['https://yourdomain.com/images/RentAgreement-og-image.png'],
  },
};

export default function RentAgreementPage() {
  return (
    <div>
      <RentAgreement />
    </div>
  );
}