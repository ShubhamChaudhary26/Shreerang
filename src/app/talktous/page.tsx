import { Metadata } from 'next';
import TalkToUs from '../../components/TalkToUs/TalkToUs';

export const metadata: Metadata = {
  title: 'Talk to Us - Mintsurvey',
  description: 'Connect with Mintsurvey to discuss your needs and get expert support.',
  openGraph: {
    title: 'Talk to Us - Mintsurvey',
    description: 'Connect with Mintsurvey to discuss your needs and get expert support.',
    images: [
      {
        url: 'https://yourdomain.com/images/talk-to-us-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Talk to Us Preview',
      },
    ],
    url: 'https://yourdomain.com/talk-to-us',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk to Us - Mintsurvey',
    description: 'Connect with Mintsurvey to discuss your needs and get expert support.',
    images: ['https://yourdomain.com/images/talk-to-us-og-image.png'],
  },
};

export default function TalkToUsPage() {
  return (
    <div>
      <TalkToUs />
    </div>
  );
}