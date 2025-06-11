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
    alt: 'Customer Satisfaction Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Brand Awareness Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Pricing Research Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Ad Testing and Campaign Effectiveness Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Usage & Attitude Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Customer Segmentation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'A/B Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Net Promoter Score Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Canonical Correlation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Cluster Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Conjoint Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Correspondence Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Multi-Dimensional Scaling Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Discriminant Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Factor Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Regression Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Structural Equation Modeling Icon',
    name: ""
  }
];

const features = [
  {
    title: "Mystery Shopping Made Smart",
    description:
      "MiCOMPLIANCE transforms traditional mystery shopping with trained shoppers evaluating service quality, SOP compliance, and brand representation across retail and B2B environments.",
    imgSrc: "/micompliance/micomplianceicon2.svg",
    link: "#",
  },
  {
    title: "Staff Training & Development",
    description:
      "Identify service gaps and improve frontline performance by using insights from mystery evaluations to deliver targeted staff training programs.",
    imgSrc: "/micompliance/micomlianceicon1.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Distributor & Retailer Evaluation",
    description:
      "Ensure consistent customer experience by measuring brand advocacy and service quality at distribution and retail points through MiCOMPLIANCE assessments.",
    imgSrc: "/micompliance/micomplianceicon3.svg",
    link: "#",
  },
  {
    title: "Monitoring Ethics & Verifying B2B",
    description:
      "Monitor employee integrity, evaluate ethical practices, and strengthen B2B service delivery using specialized MiCOMPLIANCE methodologies.",
    imgSrc: "/micompliance/micomplianceicon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Real-Time Insights",
    description:
      "Receive live updates and comprehensive dashboards to monitor service quality and compliance with organizational SOPs.",
  },
  {
    image: "/mismallicon2.png",
    title: "Trained Mystery Shoppers",
    description:
      "Our skilled evaluators provide unbiased, high-quality assessments across customer-facing touchpoints.",
  },
  {
    image: "/mismallicon3.png",
    title: "Urban & Remote Reach",
    description:
      "Cover a wide geographic range with our mystery shopping network, from metro cities to remote towns.",
  },
  {
    image: "/mismallicon4.png",
    title: "Actionable Feedback",
    description:
      "Access detailed reports that help you drive continuous improvement in customer service and staff conduct.",
  },
  {
    image: "/mismallicon5.png",
    title: "Brand Reputation Enhancement",
    description:
      "Ensure every customer touchpoint reflects your brand values and builds long-term trust.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Mystery Shopping: The Secret to Service Excellence",
    description:
      "Learn how MiCOMPLIANCE empowers brands to improve customer experience and operational compliance through real-world evaluations.",
    type: "Insight",
    date: "May 21, 2025",
    link: "/blog/mystery-shopping-excellence",
  },
  {
    image:  "/miconnect/publication2.png",
    title: "Training Teams Through Mystery Evaluations",
    description:
      "Explore how feedback from mystery shoppers drives impactful training and long-term performance growth.",
    type: "Article",
    date: "May 17, 2025",
    link: "/blog/training-with-micompliance",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Ensuring Ethics in B2B Service with MiCOMPLIANCE",
    description:
      "Discover how businesses leverage MiCOMPLIANCE to uphold ethical practices and boost B2B service reliability.",
    type: "Report",
    date: "May 14, 2025",
    link: "/blog/b2b-ethics-micompliance",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Boost Service Excellence with MiCOMPLIANCE`}
        description="Enhance service quality and brand consistency with real-time insights from expert evaluations conducted across retail and B2B environments. Monitor staff conduct, measure SOP compliance, and drive improvement with actionable feedback."
        imageSrc="/micompliance/micompliance.svg"
        imageAlt="Retail Analytics Illustration"
        buttonText="Book a Free Consultation"
      />
      {/* <TrustedBrands
        heading="Chosen by Brands Committed to Service Excellence"
        brands={brandList}
        showLink={true}
        // linkHref="/brands"
      /> */}
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Retailer Elevates Customer Service with MiCOMPLIANCE"
        description="A global consumer brand deployed MiCOMPLIANCE to evaluate staff performance, monitor SOP compliance, and assess distributor integrity. The program led to measurable improvement in customer satisfaction, service quality, and operational transparency across 300+ locations."
        stats={[
          { number: "300+", label: "retail & B2B outlets evaluated" },
          {
            number: "4",
            label: "evaluation types: staff, ethics, SOPs, B2B compliance",
          },
          {
            number: "90%",
            label: "improvement in service adherence and compliance visibility",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Doing Data Right" features={featuresGrid} />;
      <RecentPublications
        heading="Recent Publications"
        // publications={publications}
      />
      <CallToActionSection
        title="Strengthen Service Quality with MiCOMPLIANCE"
        subtitle="Experience smarter mystery shopping with real-time insights"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}
