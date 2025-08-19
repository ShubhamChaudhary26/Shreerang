import About from '../../components/About/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Shreerang Associates | Online Rent Agreement Pune & Digital Solutions',
  description:
    'Know more about Shreerang Associates, your trusted partner for Online Rent Agreement in Pune and digital e-governance services across Maharashtra & India.',
  openGraph: {
    title: 'About Shreerang Associates | Rent Agreement Pune',
    description:
      'Discover Shreerang Associates - Experts in Online Rent Agreement Pune, property, legal, and digital e-governance solutions.',
    images: [
      {
        url: 'https://rentagreementwithus.com/home/ContentWithImage1.png',
        width: 1200,
        height: 630,
        alt: 'About Shreerang Associates',
      },
    ],
    url: 'https://rentagreementwithus.com/about',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shreerang Associates | Rent Agreement Pune',
    description:
      'Shreerang Associates specializes in Online Rent Agreement Pune and trusted digital solutions for property & legal services.',
    images: ['https://rentagreementwithus.com/home/ContentWithImage1.png'],
  },
  alternates: {
    canonical: 'https://rentagreementwithus.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    'Shreerang Associates',
    'About Shreerang',
    'Rent Agreement Pune',
    'Online Rent Agreement',
    'Digital Rent Agreement Maharashtra',
    'E-Governance Pune',
    'Property Agreement Services',
    'Legal Document Services Pune',
  ],
};

export default function AboutPage() {
  return (
    <div>
      <About />
    </div>
  );
}
