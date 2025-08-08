import HeroSection from "./HeroSection";
import FeatureBlocks from "./FeatureBlocks";
import CaseStudy from "./CaseStudy";
import { CallToActionSection } from "./CallToActionSection";
import shreerangLogo from "../../../public/Logo.png";

const features = [
  {
    title: "100% Legally Valid Rent Agreement",
    description:
      "Digitally signed, e-stamped, and fully valid across Maharashtra. Shreerang Associates provides seamless registration with full legal compliance.",
    imgSrc: "/icons/legal-validity.svg",
    link: "#",
  },
  {
    title: "Biometric Verification at Your Doorstep",
    description:
      "Our agents visit your home for biometric verification — no need to visit any office. Convenient and hassle-free for tenants and landlords.",
    imgSrc: "/icons/biometric.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Calculate Stamp Duty Instantly",
    description:
      "Use our built-in calculator to estimate stamp duty and registration charges in seconds. Transparent pricing guaranteed.",
    imgSrc: "/icons/calculator.svg",
    link: "#",
  },
  {
    title: "Fast Online Process",
    description:
      "No paperwork delays — complete your rent agreement online in just 3 easy steps. Shreerang Associates ensures a smooth digital experience.",
    imgSrc: "/icons/online-process.svg",
    link: "#",
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto">
      <HeroSection
        title="Register Rent Agreement Service in Maharashtra" subtitle={""}      
      />

      <FeatureBlocks features={features} />

      <CaseStudy
        logo={shreerangLogo}
        title="Trusted by Thousands Across Maharashtra"
        description="Shreerang Associates has helped thousands of landlords and tenants register their rent agreements effortlessly. We focus on trust, speed, and legal compliance — all while offering unmatched convenience through doorstep biometric verification and digital processing."
        stats={[
          { number: "10,000+", label: "Agreements Processed" },
          { number: "95%", label: "Clients Recommend Us" },
          { number: "500+", label: "Pincodes Served" },
        ]}
        button1Label="Get Started"
      />

      <CallToActionSection
        title="Need a Rent Agreement? Let Us Help."
        subtitle="Fast, simple, and doorstep-verified service."
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="#contact"
        imageSrc="/banner-rent-agreement.png"
      />
    </div>
  );
}
