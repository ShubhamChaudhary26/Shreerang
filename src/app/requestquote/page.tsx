import { Metadata } from 'next';
import RequestQuote from '../../components/Contact/RequestQuote';

export const metadata: Metadata = {
  title: 'Request a Quote - Mintsurvey',
  description: 'Request a custom quote from Mintsurvey for tailored survey and data solutions.',
  openGraph: {
    title: 'Request a Quote - Mintsurvey',
    description: 'Request a custom quote from Mintsurvey for tailored survey and data solutions.',
    images: [
      {
        url: 'https://yourdomain.com/images/request-quote-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Request Quote Preview',
      },
    ],
    url: 'https://yourdomain.com/request-quote',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote - Mintsurvey',
    description: 'Request a custom quote from Mintsurvey for tailored survey and data solutions.',
    images: ['https://yourdomain.com/images/request-quote-og-image.png'],
  },
};

export default function RequestQuotePage() {
  return (
    <div>
      <RequestQuote />
    </div>
  );
}