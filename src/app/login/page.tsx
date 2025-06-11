import { Metadata } from 'next';
import LoginPage from '../../components/Login/Login';

export const metadata: Metadata = {
  title: 'Login - Mintsurvey',
  description: 'Sign in to your Mintsurvey account to access personalized features.',
  openGraph: {
    title: 'Login - Mintsurvey',
    description: 'Sign in to your Mintsurvey account to access personalized features.',
    images: [
      {
        url: 'https://yourdomain.com/images/login-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Login Preview',
      },
    ],
    url: 'https://yourdomain.com/login',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - Mintsurvey',
    description: 'Sign in to your Mintsurvey account to access personalized features.',
    images: ['https://yourdomain.com/images/login-og-image.png'],
  },
};

export default function LoginPageRoute() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}