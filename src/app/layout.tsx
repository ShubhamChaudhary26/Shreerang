import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';
import 'leaflet/dist/leaflet.css';
import LayoutWrapper from '../components/LayoutWrapper';
import { UserProvider } from '@/src/hooks/UserContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://shreerang.com'), // ✅ Added to remove metadata warning
  title: 'Shreerang',
  description: 'Rent Agreement',
  icons: {
    icon: '/L.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <SpeedInsights />
        <UserProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
