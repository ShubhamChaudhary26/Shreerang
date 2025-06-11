import React from "react";
import BrandGrowth from "../../components/BrandGrowth/BrandGrowth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Growth Solutions - Mintsurvey",
  description: "Drive your brand forward with Mintsurvey’s data-driven insights and media intelligence solutions.",
  openGraph: {
    title: "Brand Growth Solutions - Mintsurvey",
    description: "Drive your brand forward with Mintsurvey’s data-driven insights and media intelligence solutions.",
    images: ["/images/brand-growth-og-image.png"], // Replace with your 1200x630 image
    url: "https://yourdomain.com/brand-growth",
    type: "website",
    siteName: "Mintsurvey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Growth Solutions - Mintsurvey",
    description: "Drive your brand forward with Mintsurvey’s data-driven insights and media intelligence solutions.",
    images: ["/images/brand-growth-og-image.png"], // Same image
  },
};

const brandGrowthRoute = () => {
  return (
    <>
      <BrandGrowth />
    </>
  );
};

export default brandGrowthRoute;