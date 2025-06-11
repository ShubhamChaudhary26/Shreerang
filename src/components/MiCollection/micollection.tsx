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
    alt: 'Data Collection Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Questionnaire Execution Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Multilingual Support Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Global Coverage Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Quality Assurance Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Fraud Detection Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Validation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Field Network Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Survey Accuracy Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Integrity Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Market Research Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Response Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Survey Deployment Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Data Reliability Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Field Operations Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Quality Control Icon',
    name: ""
  }
];

const features = [
  {
    title: "Robust Questionnaire Execution",
    description:
      "MiCollection streamlines questionnaire deployment with expert support, ensuring accurate and efficient data collection across diverse audiences.",
    imgSrc: "/micollection/micollectionicon1.svg",
    link: "#",
  },
  {
    title: "Multilingual Field Network",
    description:
      "Leverage our large, multilingual field network to collect data in multiple languages, ensuring inclusivity and precision.",
    imgSrc: "/micollection/micollectionicon2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Global Geographic Coverage",
    description:
      "Conduct data collection across major geographies, from urban centers to remote regions, with MiCollection’s extensive reach.",
    imgSrc: "/micollection/micollectionicon3.svg",
    link: "#",
  },
  {
    title: "Advanced Fraud Detection",
    description:
      "Ensure data integrity with MiCollection’s fraud detection and multi-layered validation processes, delivering reliable insights.",
    imgSrc: "/micollection/micollectionicon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "In-House MIGFT Team",
    description:
      "Our dedicated MIGFT team ensures high-quality data collection with expert oversight and rigorous standards.",
  },
  {
    image: "/mismallicon2.png",
    title: "Multi-Layered Quality Checks",
    description:
      "Implement robust quality control processes to verify data accuracy and consistency at every stage.",
  },
  {
    image: "/mismallicon3.png",
    title: "Broad Geographic Reach",
    description:
      "Cover diverse regions with our field network, enabling comprehensive data collection worldwide.",
  },
  {
    image: "/mismallicon4.png",
    title: "Fraud Detection Systems",
    description:
      "Utilize advanced algorithms to detect and eliminate fraudulent responses, ensuring data reliability.",
  },
  {
    image: "/mismallicon5.png",
    title: "Actionable Data Insights",
    description:
      "Transform raw data into actionable insights with MiCollection’s validated and high-quality outputs.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Mastering Data Collection with MiCollection",
    description:
      "Discover how MiCollection’s global network and quality checks deliver reliable data for impactful decisions.",
    type: "Insight",
    date: "June 5, 2025",
    link: "/blog/data-collection-micollection",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Ensuring Data Integrity with MiCollection",
    description:
      "Learn how MiCollection’s fraud detection and validation processes ensure trustworthy research outcomes.",
    type: "Article",
    date: "May 30, 2025",
    link: "/blog/data-integrity-micollection",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Global Reach with MiCollection’s Field Network",
    description:
      "Explore how MiCollection’s multilingual field network enables data collection across diverse geographies.",
    type: "Report",
    date: "May 25, 2025",
    link: "/blog/global-reach-micollection",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Empower Research with MiCollection’s Data Services`}
        description="Unlock reliable insights with MiCollection’s robust data collection services. Leverage our multilingual field network, global coverage, and advanced fraud detection to deliver high-quality, validated data."
        imageSrc="/micollection/micollection.svg"
        imageAlt="Data Collection Illustration"
        buttonText="Book a Free Consultation"
      />
      {/* <TrustedBrands
        heading="Trusted by Brands for Reliable Data Collection"
        brands={brandList}
        showLink={true}
        // linkHref="/brands"
      /> */}
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Brand Enhances Research with MiCollection"
        description="A leading consumer brand utilized MiCollection to execute multilingual questionnaires across 50+ countries. With robust fraud detection and quality checks, the brand achieved high-quality data, improving market insights and decision-making."
        stats={[
          { number: "50+", label: "countries covered in data collection" },
          {
            number: "98%",
            label: "data accuracy with fraud detection",
          },
          {
            number: "10K+",
            label: "respondents engaged via MIGFT team",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Data Collection Done Right" features={featuresGrid} />
      <RecentPublications
        heading="Recent Publications"
        // publications={publications}
      />
      <CallToActionSection
        title="Transform Insights with MiCollection"
        subtitle="Leverage global, high-quality data collection for smarter decisions"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}