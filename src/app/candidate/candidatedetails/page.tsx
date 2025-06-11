import CandidateEditPage from '@/src/components/Candidate/CandidateDetails/CandidateDetails'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Profile Details - Mintsurvey Careers",
  description: "View and manage your professional profile details. Update your skills, experience, and preferences for brand intelligence and market research opportunities.",
  openGraph: {
    title: "Candidate Profile Details - Mintsurvey Careers",
    description: "View and manage your professional profile details. Update your skills, experience, and preferences for brand intelligence and market research opportunities.",
    images: ["/images/candidate-details-og-image.png"], // Replace with your 1200x630 image
    url: "https://yourdomain.com/candidate/details",
    type: "website",
    siteName: "Mintsurvey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidate Profile Details - Mintsurvey Careers",
    description: "View and manage your professional profile details. Update your skills, experience, and preferences for brand intelligence and market research opportunities.",
    images: ["/images/candidate-details-og-image.png"], // Same image
  },
};

const page = () => {
  return (
    <div><CandidateEditPage/></div>
  )
}

export default page