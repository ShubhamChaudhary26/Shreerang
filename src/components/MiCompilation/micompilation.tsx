import CaseStudy from "../MiConnect/CaseStudy";
import FeatureBlocks from "../MiConnect/FeatureBlocks";
import HeroSection from "../MiConnect/HeroSection";
// import TrustedBrands from "../MiConnect/TrustedBrands";
import floorLogo from "../../../public/icon.webp";
import { FeatureGrid } from "../MiConnect/FeatureGrid";
import { RecentPublications } from "../MiConnect/RecentPublications";
import { CallToActionSection } from "../MiConnect/CallToActionSection";

const brandList = [
  {
    src: '/grt.jpg',
    alt: 'Desk Research Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Verified Sources Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'AI-Human Review Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Accuracy Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Up-to-Date Data Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Local Language Sources Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Market Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Competitor Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Industry Trends Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Validation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Research Reliability Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Secondary Research Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Global Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Synthesis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Research Quality Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Trend Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Source Verification Icon',
    name: ""
  }
];

const features = [
  {
    title: "Comprehensive Desk Research",
    description:
      "MiCompilation delivers in-depth desk research using official, verified sources to provide accurate and actionable market insights.",
    imgSrc: "/micomplilation/micompilationicon1.svg",
    link: "#",
  },
  {
    title: "AI and Human Review Synergy",
    description:
      "Combine AI-driven analysis with human expertise to ensure precision and avoid inaccuracies in research findings.",
    imgSrc: "/micomplilation/micompilationicon2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Up-to-Date Data Access",
    description:
      "Access the latest industry data and trends, ensuring your research is current and relevant with MiCompilation.",
    imgSrc: "/micomplilation/micompilationicon3.svg",
    link: "#",
  },
  {
    title: "Local Language Insights",
    description:
      "Incorporate local language sources to capture nuanced, region-specific insights for global research projects.",
    imgSrc: "/micomplilation/micompilationicon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Verified Source Integration",
    description:
      "Rely on official, credible sources to ensure the highest standards of research accuracy and reliability.",
  },
  {
    image: "/mismallicon2.png",
    title: "AI-Human Validation",
    description:
      "Leverage AI for efficiency and human review to eliminate errors, ensuring trustworthy research outputs.",
  },
  {
    image: "/mismallicon3.png",
    title: "Global and Local Coverage",
    description:
      "Access data from global and local language sources for comprehensive, culturally relevant insights.",
  },
  {
    image: "/mismallicon4.png",
    title: "Current Data Insights",
    description:
      "Stay ahead with the most recent data, enabling timely and informed decision-making.",
  },
  {
    image: "/mismallicon5.png",
    title: "Actionable Research Outputs",
    description:
      "Receive clear, concise reports that translate complex data into strategic recommendations.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "The Power of Desk Research with MiCompilation",
    description:
      "Learn how MiCompilation’s verified sources and AI-human synergy deliver reliable market insights.",
    type: "Insight",
    date: "June 7, 2025",
    link: "/blog/desk-research-micompilation",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Avoiding AI Pitfalls in Research",
    description:
      "Explore how MiCompilation’s human review process ensures accuracy in desk research outcomes.",
    type: "Article",
    date: "June 2, 2025",
    link: "/blog/ai-human-research",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Leveraging Local Sources with MiCompilation",
    description:
      "Discover how MiCompilation incorporates local language data for nuanced, region-specific insights.",
    type: "Report",
    date: "May 27, 2025",
    link: "/blog/local-sources-micompilation",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Unlock Reliable Insights with MiCompilation`}
        description="Empower your decisions with MiCompilation’s desk research services. Using verified sources, AI-human synergy, and local language data, we deliver accurate, up-to-date insights for global markets."
        imageSrc="/micomplilation/micomplilation.svg"
        imageAlt="Desk Research Illustration"
        buttonText="Book a Free Consultation"
      />
      {/* <TrustedBrands
        heading="Trusted by Brands for Accurate Desk Research"
        brands={brandList}
        showLink={true}
        // linkHref="/brands"
      /> */}
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Brand Enhances Strategy with MiCompilation"
        description="A leading consumer brand leveraged MiCompilation to conduct desk research across 20 markets. Using verified sources and AI-human review, the brand gained accurate insights into market trends and consumer behavior, driving strategic decisions."
        stats={[
          { number: "20+", label: "markets analyzed with desk research" },
          {
            number: "95%",
            label: "accuracy in data insights",
          },
          {
            number: "50+",
            label: "local language sources integrated",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Research Done Right" features={featuresGrid} />
      <RecentPublications
        heading="Recent Publications"
        // publications={publications}
      />
      <CallToActionSection
        title="Transform Insights with MiCompilation"
        subtitle="Harness verified, up-to-date data for smarter strategic decisions"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/micomplilation/micompilationbanner.svg"
      />
    </div>
  );
}