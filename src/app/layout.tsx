import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import 'antd/dist/reset.css';
import 'leaflet/dist/leaflet.css';
import LayoutWrapper from '../components/LayoutWrapper';
import { UserProvider } from '@/src/hooks/UserContext';
// import ReCaptchaProvider from '../components/ReCaptchaProvider/ReCaptchaProvider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'MintSurvey',
  description: 'Data Driven Insights',
  icons: {
    icon: '/Icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* <ReCaptchaProvider> */}
          <UserProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </UserProvider>
        {/* </ReCaptchaProvider> */}
      </body>
    </html>
  );
}