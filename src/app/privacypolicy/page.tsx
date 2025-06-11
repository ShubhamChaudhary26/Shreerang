import { Metadata } from 'next';
import PrivacyPolicy from '@/src/components/PrivacyPolicy/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mintsurvey',
  description: 'Read Mintsurvey’s Privacy Policy to understand how we handle your data.',
  openGraph: {
    title: 'Privacy Policy - Mintsurvey',
    description: 'Read Mintsurvey’s Privacy Policy to understand how we handle your data.',
    images: [
      {
        url: 'https://yourdomain.com/images/privacy-policy-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Privacy Policy Preview',
      },
    ],
    url: 'https://yourdomain.com/privacy-policy',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Mintsurvey',
    description: 'Read Mintsurvey’s Privacy Policy to understand how we handle your data.',
    images: ['https://yourdomain.com/images/privacy-policy-og-image.png'],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
}