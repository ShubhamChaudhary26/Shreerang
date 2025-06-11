import { Metadata } from 'next';
import ContactPage from '../../components/Contact/Contact';

export const metadata: Metadata = {
  title: 'Contact Us - Mintsurvey',
  description: 'Book a Free Consultation with Mintsurvey for support, inquiries, or feedback.',
  openGraph: {
    title: 'Contact Us - Mintsurvey',
    description: 'Book a Free Consultation with Mintsurvey for support, inquiries, or feedback.',
    images: [
      {
        url: 'https://yourdomain.com/images/contact-og-image.png', // Replace with your 1200x630 image
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Contact Preview',
      },
    ],
    url: 'https://yourdomain.com/contact',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Mintsurvey',
    description: 'Book a Free Consultation with Mintsurvey for support, inquiries, or feedback.',
    images: ['https://yourdomain.com/images/contact-og-image.png'],
  },
};

export default function ContactPageRoute() {
  return (
    <div>
      <ContactPage />
    </div>
  );
}