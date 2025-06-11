import Allprojects from '@/src/components/Candidate/AllProjects/AllProjects'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects - Mintsurvey Portfolio",
  description: "Explore our comprehensive portfolio of successful brand intelligence projects. See how Mintsurvey has helped brands grow with data-driven insights and strategies.",
  openGraph: {
    title: "All Projects - Mintsurvey Portfolio",
    description: "Explore our comprehensive portfolio of successful brand intelligence projects. See how Mintsurvey has helped brands grow with data-driven insights and strategies.",
    images: ["/images/all-projects-og-image.png"], // Replace with your 1200x630 image
    url: "https://yourdomain.com/all-projects",
    type: "website",
    siteName: "Mintsurvey",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects - Mintsurvey Portfolio",
    description: "Explore our comprehensive portfolio of successful brand intelligence projects. See how Mintsurvey has helped brands grow with data-driven insights and strategies.",
    images: ["/images/all-projects-og-image.png"], // Same image
  },
};

const page = () => {
  return (
    <>
      <Allprojects />
    </>
  )
}

export default page