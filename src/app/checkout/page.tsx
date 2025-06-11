import { Metadata } from 'next';
import CheckoutPage from '../../components/CheckOut.tsx/CheckOut';

export const metadata: Metadata = {
  title: 'Checkout - Mintsurvey',
  description: 'Complete your purchase on Mintsurvey with a secure and seamless checkout process.',
  openGraph: {
    title: 'Checkout - Mintsurvey',
    description: 'Complete your purchase on Mintsurvey with a secure and seamless checkout process.',
    images: [
      {
        url: 'https://yourdomain.com/images/checkout-og-image.png', // Absolute URL, replace with your image
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'Mintsurvey Checkout Preview',
      },
    ],
    url: 'https://yourdomain.com/checkout',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checkout - Mintsurvey',
    description: 'Complete your purchase on Mintsurvey with a secure and seamless checkout process.',
    images: ['https://yourdomain.com/images/checkout-og-image.png'],
  },
};

export default function CheckoutPageRoute() {
  return (
    <div>
      <CheckoutPage />
    </div>
  );
}