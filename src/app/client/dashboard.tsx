import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../globals.css";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import LoadingWrapper from "../../components/LoadingWrapper";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "MintSurvey - Dashboard",
  description: "Client Dashboard for Survey Insights",
  icons: {
    icon: "/mukraj_insights_icon.jpg", // Ensure this exists in /public/
  },
  openGraph: {
    title: "MintSurvey - Dashboard",
    description: "Client Dashboard for Survey Insights",
    images: [
      {
        url: "https://yourdomain.com/images/dashboard-og-image.png", // Replace with your 1200x630 image
        width: 1200,
        height: 630,
        alt: "MintSurvey Dashboard Preview",
      },
    ],
    url: "https://yourdomain.com/dashboard",
    type: "website",
    siteName: "Mintsurvey",
  },
  twitter: {
    card: "summary_large_image",
    title: "MintSurvey - Dashboard",
    description: "Client Dashboard for Survey Insights",
    images: ["https://yourdomain.com/images/dashboard-og-image.png"],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <LoadingWrapper>{children}</LoadingWrapper>
      </body>
    </html>
  );
}