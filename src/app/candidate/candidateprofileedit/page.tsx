import { Metadata } from 'next';
import CandidateEdit from '@/src/components/Candidate/CandidateProfileEdit/CandidateProfileForm';

export const metadata: Metadata = {
  title: 'Edit Candidate Profile - Mintsurvey',
  description: 'Edit your candidate profile on Mintsurvey to update your details and preferences.',
  openGraph: {
    title: 'Edit Candidate Profile - Mintsurvey',
    description: 'Edit your candidate profile on Mintsurvey to update your details and preferences.',
    images: [
      {
        url: 'https://yourdomain.com/images/candidate-edit-og-image.png', // Replace with your 1200x630 image
        width: 1200,
        height: 630,
        alt: 'Mintsurvey Candidate Edit Preview',
      },
    ],
    url: 'https://yourdomain.com/candidate/edit',
    type: 'website',
    siteName: 'Mintsurvey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edit Candidate Profile - Mintsurvey',
    description: 'Edit your candidate profile on Mintsurvey to update your details and preferences.',
    images: ['https://yourdomain.com/images/candidate-edit-og-image.png'],
  },
};

export default function CandidateEditPage() {
  return (
    <div>
      <CandidateEdit />
    </div>
  );
}