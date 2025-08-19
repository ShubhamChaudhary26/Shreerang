import { Metadata } from 'next';
import Contact from '../../components/Contact/RequestQuote';

export const metadata: Metadata = {
  title: 'Contact Us | Shreerang Associates - Rent Agreement & Legal Services',
  description:
    'Contact Shreerang Associates today for hassle-free Rent Agreement services in Pune and across Maharashtra. Get expert legal, property, and digital governance solutions.',
  metadataBase: new URL('https://rentagreementwithus.com'),
  openGraph: {
    title: 'Contact Shreerang Associates | Rent Agreement Pune & Legal Support',
    description:
      'Looking for Rent Agreement services in Pune? Contact Shreerang Associates for trusted online rent agreement, legal, and property solutions across Maharashtra.',
    images: [
      {
        url: 'https://rentagreementwithus.com/og.png', 
        width: 1200,
        height: 630,
        alt: 'Shreerang Associates Contact Page Preview',
      },
    ],
    url: 'https://rentagreementwithus.com/contact',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Shreerang Associates | Rent Agreement & Legal Solutions',
    description:
      'Get in touch with Shreerang Associates for online rent agreements in Pune, property services, and digital e-governance support.',
    images: ['https://rentagreementwithus.com/images/contact-og-image.png'],
  },
  alternates: {
    canonical: 'https://rentagreementwithus.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
  'Shreerang Associates',
  'Rent Agreement Pune',
  'Online Rent Agreement Pune',
  'Pune Rent Agreement Services',
  'Rent Agreement Registration Pune',
  'E-Registration Rent Agreement Pune',
  'Rent Agreement Office Pune',
  'Property Agreement Pune',
  'Legal Services Pune',
  'Pune Rent Agreement Consultant',
  'Rent Agreement Near Me Pune',
  'Rent Agreement Online Maharashtra',
  'Rent Agreement Contact Pune',
  'Digital Rent Agreement Pune',
  'Rent Agreement Agents Pune',
  'Shreerang Rent Agreement Pune',
],

};

export default function ContactPageRoute() {
  return (
    <div>
      <Contact />
    </div>
  );
}
