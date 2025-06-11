import { Metadata } from 'next';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions'; // Adjust path if needed

export const metadata: Metadata = {
  title: 'Terms and Conditions - Mintsurvey',
  description: 'Review Mintsurvey’s Terms and Conditions for using our services.',
  openGraph: {
    title: 'Terms and Conditions - Mintsurvey',
    description: 'Review Mintsurvey’s Terms and Conditions for using our services.',
    images: [
      {
        url: 'https://yourdomain.com/images/terms-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Terms and Conditions Preview',
      },
    ],
    url: 'https://yourdomain.com/terms-and-conditions',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions - Mintsurvey',
    description: 'Review Mintsurvey’s Terms and Conditions for using our services.',
    images: ['https://yourdomain.com/images/terms-og-image.png'],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
}