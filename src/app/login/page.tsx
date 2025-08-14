import { Metadata } from 'next';
import LoginPage from '../../components/Login/Login';

export const metadata: Metadata = {
  title: 'Login - Shreerang Associates',
  description: 'Sign in to your Shreerang account to access digital e-governance and property solutions.',
  metadataBase: new URL('https://rentyourpropertywithus.vercel.app'),
  openGraph: {
    title: 'Login - Shreerang Associates',
    description: 'Sign in to your Shreerang account to access digital e-governance and property solutions.',
    images: [
      {
        url: 'https://rentyourpropertywithus.vercel.app/images/login-og-image.png', // absolute URL
        width: 1200,
        height: 630,
        alt: 'Shreerang Login Preview',
      },
    ],
    url: 'https://rentyourpropertywithus.vercel.app/login',
    type: 'website',
    siteName: 'Shreerang Associates',
  },
 
};

export default function LoginPageRoute() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
