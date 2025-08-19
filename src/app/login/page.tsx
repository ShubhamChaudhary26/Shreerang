import { Metadata } from 'next';
import LoginPage from '../../components/Login/Login';

export const metadata: Metadata = {
  title: 'Login - Shreerang Associates',
  description: 'Sign in to your Shreerang account to access digital e-governance and property solutions.',
  keywords: ['Shreerang login', 'property rent Pune', 'rent agreement online', 'Shreerang Associates Pune', 'digital e-governance'],
  metadataBase: new URL('https://rentagreementwithus.com'),
openGraph: {
  title: 'Login - Shreerang Associates',
  description: 'Sign in to your Shreerang account to access digital e-governance and property solutions.',
  images: [
    {
      url: 'https://rentagreementwithus.com/images/login-og-image.png', // <-- new domain
      width: 1200,
      height: 630,
      alt: 'Shreerang Login Preview',
    },
  ],
  url: 'https://rentagreementwithus.com/login',  // <-- new domain
  type: 'website',
  siteName: 'Shreerang Associates',
},
twitter: {
  card: 'summary_large_image',
  title: 'Login - Shreerang Associates',
  description: 'Sign in to your Shreerang account to access digital e-governance and property solutions.',
  images: ['https://rentagreementwithus.com/images/login-og-image.png'], // <-- new domain
}

};


export default function LoginPageRoute() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
