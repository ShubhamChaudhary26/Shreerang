import { Metadata } from 'next';
import CartPage from '../../components/Cart/Cart';

export const metadata: Metadata = {
  title: 'Your Cart - Mintsurvey',
  description: 'View your shopping cart on Mintsurvey and proceed to checkout with ease.',
  openGraph: {
    title: 'Your Cart - Mintsurvey',
    description: 'View your shopping cart on Mintsurvey and proceed to checkout with ease.',
    images: [
      {
        url: 'https://yourdomain.com/images/cart-og-image.png', // Absolute URL, replace with your image
        width: 1200, // Recommended for OG
        height: 630,
        alt: 'Mintsurvey Cart Preview',
      },
    ],
    url: 'https://yourdomain.com/cart',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Cart - Mintsurvey',
    description: 'View your shopping cart on Mintsurvey and proceed to checkout with ease.',
    images: ['https://yourdomain.com/images/cart-og-image.png'],
  },
};

export default function CartPageRoute() {
  return (
    <div>
      <CartPage />
    </div>
  );
}