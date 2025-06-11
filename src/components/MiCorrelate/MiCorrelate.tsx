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
    src: '/micorrelate/face_to_face_survey.svg',
    alt: 'Face-to-Face Surveys Icon',
    name: 'Face-to-Face Surveys'
  },
  {
    src: '/micorrelate/telephonic_survey.svg',
    alt: 'Telephonic Surveys Icon',
    name: 'Telephonic Surveys'
  },
  {
    src: '/micorrelate/online_survey.svg',
    alt: 'Online Surveys Icon',
    name: 'Online Surveys'
  },
  {
    src: '/micorrelate/panel_research.svg',
    alt: 'Panel Research Icon',
    name: 'Panel Research'
  },
  {
    src: '/micorrelate/statistical_analysis.svg',
    alt: 'Statistical Analysis Icon',
    name: 'Statistical Analysis'
  },
  {
    src: '/micorrelate/data_modeling.svg',
    alt: 'Data Modeling Icon',
    name: 'Data Modeling'
  },
  {
    src: '/micorrelate/in_person_mystery_shopping.svg',
    alt: 'In-Person Mystery Shopping Icon',
    name: 'In-Person Mystery Shopping'
  },
  {
    src: '/micorrelate/telephone_mystery_shopping.svg',
    alt: 'Telephone Mystery Shopping Icon',
    name: 'Telephone Mystery Shopping'
  },
  {
    src: '/micorrelate/online_mystery_shopping.svg',
    alt: 'Online Mystery Shopping Icon',
    name: 'Online Mystery Shopping'
  },
  {
    src: '/micorrelate/customer_experience_audit.svg',
    alt: 'Customer Experience Audit Icon',
    name: 'Customer Experience Audit'
  },
  {
    src: '/micorrelate/price_audit.svg',
    alt: 'Price Audit Icon',
    name: 'Price Audit'
  },
  {
    src: '/micorrelate/compliance_audit.svg',
    alt: 'Compliance Audit Icon',
    name: 'Compliance Audit'
  }
];


const features = [
  {
    title: "Transform Data Into Strategy",
    description:
      "MiCorrelate empowers businesses with Face-to-Face, Telephonic, and Online Surveys, panel research, and advanced statistical modeling to drive data-driven decisions.",
    imgSrc: "/micorrelate/micorrelateicon1.svg",
    link: "#",
  },
  {
    title: "Comprehensive Data Collection",
    description:
      "Leverage hybrid surveys (CAPI, CATI, CAWI) and mystery shopping audits to gather high-quality data across diverse audiences and geographies.",
    imgSrc: "/micorrelate/micorrelateicon2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Robust Statistical Analysis",
    description:
      "Use regression, ANOVA, and cluster analysis to uncover relationships, validate assumptions, and predict market trends with confidence.",
    imgSrc: "/micorrelate/micorrelateicon3.svg",
    link: "#",
  },
  {
    title: "Actionable Insights with Audits",
    description:
      "Combine mystery shopping and compliance audits with conjoint analysis to optimize customer experiences, pricing, and market positioning.",
    imgSrc: "/micorrelate/micorrelateicon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Predictive Modeling",
    description:
      "Forecast trends using advanced regression and machine learning, powered by data from surveys and panel research.",
  },
  {
    image: "/mismallicon2.png",
    title: "Multi-Mode Surveys",
    description:
      "Collect high-quality data through Face-to-Face, Telephonic, and Online Surveys for comprehensive market insights.",
  },
  {
    image: "/mismallicon3.png",
    title: "Mystery Shopping Audits",
    description:
      "Enhance customer experience with in-person, telephone, and online mystery shopping to evaluate service quality.",
  },
  {
    image: "/mismallicon4.png",
    title: "Panel Research Expertise",
    description:
      "Access diverse, pre-recruited panels for reliable data, supporting targeted quantitative research globally.",
  },
  {
    image: "/mismallicon5.png",
    title: "Statistical Confidence",
    description:
      "Validate decisions with hypothesis testing and correlation analysis, ensuring robust, actionable insights.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Unleashing Advanced Analytics with MiCORRELATE",
    description:
      "Explore how MiCORRELATE combines statistical depth with business strategy to deliver transformative insights.",
    type: "Insight",
    date: "May 21, 2025",
    link: "/blog/advanced-analytics-micorrelate",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Customer Segmentation Through Cluster Analysis",
    description:
      "See how brands use cluster analysis via MiCORRELATE to drive targeted marketing and enhance customer experience.",
    type: "Article",
    date: "May 17, 2025",
    link: "/blog/cluster-segmentation",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Optimizing Pricing With Conjoint Analysis",
    description:
      "Learn how MiCORRELATE enables better pricing decisions by decoding what customers truly value.",
    type: "Report",
    date: "May 14, 2025",
    link: "/blog/conjoint-pricing-analysis",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
  title={`Unlock the \nData Power \nWith MiCorrelate`}
  description="Leverage Face-to-Face, Telephonic, and Online Surveys, robust panel research, advanced statistical analysis, data modeling, and mystery shopping to deliver precise, actionable insights."
  imageSrc="/micorrelate/micorrelate.svg"
  imageAlt="Quantitative Research Illustration"
  buttonText="Book a Free Consultation"
/>
      {/* <TrustedBrands
  heading="Core Advanced Analytics Techniques Used by MintSurvey"
  brands={brandList}
  showLink={true}
  // linkHref="/brands"
/> */}
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Retailer Optimizes Market Strategy with MiCORRELATE Insights"
        description="A leading national retailer used MiCORRELATE to evaluate store performance, segment customers, and test product pricing strategies. With advanced analytics tools like regression and conjoint analysis, the brand boosted predictive accuracy and made more informed, impactful decisions across 200+ store locations."
        stats={[
          { number: "100K+", label: "Feedback analyzed" },
          {
            number: "10+",
            label: "Advanced statistical techniques implemented",
          },
          {
            number: "95%",
            label: "Predictive accuracy for pricing and demand",
          },
        ]}
        button1Label="Login to read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Doing Data Right" features={featuresGrid} />;
      <RecentPublications heading="Recent Publications" />
      <CallToActionSection
        title="Accelerate Business Growth With MiCORRELATE"
        subtitle="Start leveraging data-driven analytics today"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}
