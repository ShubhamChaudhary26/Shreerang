import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';
import 'leaflet/dist/leaflet.css';
import LayoutWrapper from '../components/LayoutWrapper';
import { UserProvider } from '@/src/hooks/UserContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

// ✅ Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rentagreementwithus.com'),
  title: {
    default: 'Online Rent Agreement Pune | Shreerang Associates',
    template: '%s | Rent Agreement Pune - Shreerang Associates',
  },
  description:
    'Looking for Online Rent Agreement in Pune? Shreerang Associates offers hassle-free, legally valid rent agreement services across Pune and Maharashtra. Get doorstep biometric verification and instant registration.',
  icons: {
    icon: '/L.png',
    apple: '/L.png',
  },
  openGraph: {
    title: 'Rent Agreement Pune | Online Rent Agreement in Pune - Shreerang Associates',
    description:
      'Get your Rent Agreement in Pune quickly and securely with Shreerang Associates. We provide Online Rent Agreement, Registration, and Legal Documentation services in Maharashtra.',
    url: 'https://rentagreementwithus.com',
    type: 'website',
    siteName: 'Shreerang Associates',
    images: [
      {
        url: 'https://rentagreementwithus.com/og.png',
        width: 1200,
        height: 630,
        alt: 'Online Rent Agreement Pune - Shreerang Associates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Rent Agreement Pune | Shreerang Associates',
    description:
      'Trusted Online Rent Agreement Service in Pune. Fast, Legal, and Government Approved Rent Agreements with doorstep biometric verification.',
    images: ['https://rentagreementwithus.com/og.png'],
    creator: '@shreerang',
  },
  alternates: {
    canonical: 'https://rentagreementwithus.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'Rent Agreement Pune',
    'Online Rent Agreement Pune',
    'Rent Agreement Registration Pune',
    'E-Rent Agreement Maharashtra',
    'Digital Rent Agreement Pune',
    'Online Rent Agreement Maharashtra',
    'Rent Agreement Services Pune',
    'Property Rent Agreement Pune',
    'Legal Rent Agreement Pune',
    'Biometric Rent Agreement Pune',
  ],
  category: 'Legal Services',
  authors: [{ name: 'Shreerang Associates' }],
  publisher: 'Shreerang Associates',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        {/* ✅ Vercel Speed Insights */}
        <SpeedInsights />

        {/* <UserProvider> */}
          {/* <LayoutWrapper> */}
            {<h1 className='text-center mx-auto my-10 justify-center'>Our website is currently under construction. Please check back later. </h1>}
            {/* </LayoutWrapper> */}
        {/* </UserProvider> */}

        {/* ✅ Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
