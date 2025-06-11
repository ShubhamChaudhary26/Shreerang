import { Metadata } from 'next';
import JobListings from '@/src/components/JobListing/JobListings';

export const metadata: Metadata = {
  title: 'Job Listings - Mintsurvey',
  description: 'Explore career opportunities and job listings at Mintsurvey.',
  openGraph: {
    title: 'Job Listings - Mintsurvey',
    description: 'Explore career opportunities and job listings at Mintsurvey.',
    images: [
      {
        url: 'https://yourdomain.com/images/job-listings-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Job Listings Preview',
      },
    ],
    url: 'https://yourdomain.com/job-listings',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Job Listings - Mintsurvey',
    description: 'Explore career opportunities and job listings at Mintsurvey.',
    images: ['https://yourdomain.com/images/job-listings-og-image.png'],
  },
};

export default function JobListingsPage() {
  return (
    <div>
      <JobListings />
    </div>
  );
}