'use client';
import CaseStudy from "./CaseStudy";
import FeatureBlocks from "../MiConnect/FeatureBlocks";
import HeroSection from "./HeroSection";
import floorLogo from "../../../public/icon.webp";
import { FeatureGrid } from "../MiConnect/FeatureGrid";
import { RecentPublications } from "../MiConnect/RecentPublications";
import { CallToActionSection } from "../MiConnect/CallToActionSection";

const brandList = [
  { src: '/grt.jpg', alt: 'Customer Satisfaction Icon', name: "" },
  { src: '/grt.jpg', alt: 'Brand Awareness Icon', name: "" },
  { src: '/grt.jpg', alt: 'Pricing Research Icon', name: "" },
  { src: '/grt.jpg', alt: 'Ad Testing and Campaign Effectiveness Icon', name: "" },
  { src: '/grt.jpg', alt: 'Usage & Attitude Icon', name: "" },
  { src: '/grt.jpg', alt: 'Customer Segmentation Icon', name: "" },
  { src: '/grt.jpg', alt: 'A/B Testing Icon', name: "" },
  { src: '/grt.jpg', alt: 'Net Promoter Score Icon', name: "" },
  { src: '/grt.jpg', alt: 'Canonical Correlation Icon', name: "" },
  { src: '/grt.jpg', alt: 'Cluster Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Conjoint Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Correspondence Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Multi-Dimensional Scaling Icon', name: "" },
  { src: '/grt.jpg', alt: 'Discriminant Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Factor Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Regression Analysis Icon', name: "" },
  { src: '/grt.jpg', alt: 'Structural Equation Modeling Icon', name: "" }
];

const features = [
  {
    title: "Driving Automotive Insights",
    description:
      "At MintSurvey Auto, we are passionate about the automotive industry—delivering expert insights and driving innovation through in-depth research and analysis.",
    imgSrc: "/miauto/miauto1.svg",
    link: "#",
  },
  {
    title: "Navigating Industry Evolution",
    description:
      "From electric vehicles to autonomous driving, MintSurvey Auto helps you stay ahead in a rapidly evolving automotive ecosystem.",
    imgSrc: "/miauto/miauto2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Market Trends & Technology",
    description:
      "Explore market trends, technology breakthroughs, and the regulatory shifts redefining the future of mobility.",
    imgSrc: "/miauto/miauto3.svg",
    link: "#",
  },
  {
    title: "Community of Professionals",
    description:
      "Join a growing network of automotive professionals. Share, engage, and grow with us on LinkedIn and beyond.",
    imgSrc: "/miauto/miauto4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Market Trends Analysis",
    description:
      "Understand evolving consumer behavior, emerging innovations, and global trends that shape the auto industry.",
  },
  {
    image: "/mismallicon2.png",
    title: "Technology Advancements",
    description:
      "Track innovations in EVs, autonomous mobility, and smart technologies disrupting traditional auto ecosystems.",
  },
  {
    image: "/mismallicon3.png",
    title: "Industry Regulations",
    description:
      "Stay compliant and prepared with deep insights into local and global auto regulations.",
  },
  {
    image: "/mismallicon4.png",
    title: "Community Engagement",
    description:
      "Connect with auto enthusiasts and industry leaders. Share knowledge and expand your professional network.",
  },
  {
    image: "/mismallicon5.png",
    title: "Competitive Edge",
    description:
      "Get ahead with real-time insights and curated content by following MintSurvey Auto on LinkedIn.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "The Future of Mobility: EVs & Autonomous Driving",
    description:
      "Explore how electric vehicles and autonomous driving are redefining the automotive industry landscape.",
    type: "Insight",
    date: "May 23, 2025",
    link: "/blog/future-of-mobility-evs-adas",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Consumer Preferences Reshaping Automotive Markets",
    description:
      "An in-depth look at how changing consumer demands are driving innovation and market shifts in the auto sector.",
    type: "Article",
    date: "May 20, 2025",
    link: "/blog/consumer-preferences-auto",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Navigating Global Regulations in the Auto Industry",
    description:
      "Understand the impact of global regulations on automotive manufacturing, sales, and technology adoption.",
    type: "Report",
    date: "May 15, 2025",
    link: "/blog/auto-industry-regulations",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto">
      <HeroSection />
      
      <FeatureBlocks features={features} />
      
    <CaseStudy/>
      
      <FeatureGrid heading="Doing Data Right" features={featuresGrid} />
      
      <RecentPublications heading="Recent Publications"  />
      
      <CallToActionSection
        title="Stay Ahead with MintSurvey Auto"
        subtitle="Join the community transforming the future of mobility"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}
