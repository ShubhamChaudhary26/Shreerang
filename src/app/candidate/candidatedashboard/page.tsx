import React from 'react'
import MyAccountDropdown from '../../../components/Candidate/CandidateProfileEdit/CandidateProfileForm'
import Candidateprofile from '../../../components/Candidate/CandidateDashboard/CandidateDashboard'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Dashboard - Mintsurvey Career Portal",
  description: "Manage your profile, track applications, and discover new opportunities in brand intelligence and market research with Mintsurvey's candidate dashboard.",
  openGraph: {
    title: "Candidate Dashboard - Mintsurvey Career Portal",
    description: "Manage your profile, track applications, and discover new opportunities in brand intelligence and market research with Mintsurvey's candidate dashboard.",
    images: ["/images/candidate-dashboard-og-image.png"], // Replace with your 1200x630 image
    url: "https://yourdomain.com/candidate/dashboard",
    type: "website",
    siteName: "Mintsurvey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Candidate Dashboard - Mintsurvey Career Portal",
    description: "Manage your profile, track applications, and discover new opportunities in brand intelligence and market research with Mintsurvey's candidate dashboard.",
    images: ["/images/candidate-dashboard-og-image.png"], // Same image
  },
};

const candidateRoute = () => {
  return (
    <div><Candidateprofile /></div>
  )
};

export default candidateRoute;