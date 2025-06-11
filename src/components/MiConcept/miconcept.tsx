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
    alt: 'Concept Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Product Feedback Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Ad Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Packaging Evaluation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Quantitative Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Qualitative Feedback Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Online Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Offline Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Market Validation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Idea Evaluation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Preferences Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Prototype Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Brand Perception Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Feedback Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Concept Validation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'User Experience Icon',
    name: ""
  }
];

const features = [
  {
    title: "Concept Testing for Products",
    description:
      "MiConcept tests product ideas with real consumers, using quantitative and qualitative methods to validate market fit and appeal.",
    imgSrc: "/miconcept/miconcepticon1.svg",
    link: "#",
  },
  {
    title: "Ad and Packaging Evaluation",
    description:
      "Assess advertisements and packaging concepts through online or offline testing, ensuring they resonate with your target audience.",
    imgSrc: "/miconcept/miconcepticon2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Hybrid Testing Methodologies",
    description:
      "Leverage online and offline approaches to gather comprehensive consumer feedback on concepts, from ideation to execution.",
    imgSrc: "/miconcept/miconcepticon3.svg",
    link: "#",
  },
  {
    title: "Real Consumer Feedback",
    description:
      "Collect authentic insights from diverse consumer groups to refine concepts and drive successful product launches.",
    imgSrc: "/miconcept/miconcepticon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Quantitative & Qualitative Insights",
    description:
      "Combine statistical data and in-depth consumer feedback to gain a holistic view of concept performance.",
  },
  {
    image: "/mismallicon2.png",
    title: "Online Testing Flexibility",
    description:
      "Conduct scalable concept tests online, reaching diverse audiences quickly and efficiently.",
  },
  {
    image: "/mismallicon3.png",
    title: "Offline Consumer Engagement",
    description:
      "Facilitate in-person testing to capture hands-on feedback for tangible concepts like packaging or products.",
  },
  {
    image: "/mismallicon4.png",
    title: "Actionable Feedback Reports",
    description:
      "Receive detailed reports with actionable insights to optimize concepts for market success.",
  },
  {
    image: "/mismallicon5.png",
    title: "Versatile Concept Applications",
    description:
      "Test concepts for products, ads, or packaging to ensure alignment with consumer preferences.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Validating Concepts with MiConcept",
    description:
      "Discover how MiConcept’s hybrid testing delivers real consumer insights to refine product and ad concepts.",
    type: "Insight",
    date: "June 6, 2025",
    link: "/blog/concept-testing-miconcept",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Optimizing Ads with Consumer Feedback",
    description:
      "Learn how MiConcept’s testing methodologies enhance ad effectiveness through real consumer insights.",
    type: "Article",
    date: "June 1, 2025",
    link: "/blog/ad-testing-miconcept",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Packaging Success with MiConcept",
    description:
      "Explore how MiConcept’s qualitative and quantitative testing ensures packaging resonates with consumers.",
    type: "Report",
    date: "May 29, 2025",
    link: "/blog/packaging-miconcept",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Validate Ideas with MiConcept’s Testing Platform`}
        description="Test product, ad, and packaging concepts with MiConcept’s online and offline methodologies. Gather real consumer feedback using quantitative and qualitative techniques to ensure market-ready solutions."
        imageSrc="/miconcept/miconcept.svg"
        imageAlt="Concept Testing Illustration"
        buttonText="Book a Free Consultation"
      />
      {/* <TrustedBrands
        heading="Trusted by Brands for Concept Validation"
        brands={brandList}
        showLink={true}
        // linkHref="/brands"
      /> */}
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Brand Refines Product Launch with MiConcept"
        description="A leading consumer brand used MiConcept to test product and ad concepts across online and offline channels. Real consumer feedback led to optimized designs, boosting market acceptance and campaign success."
        stats={[
          { number: "100+", label: "concepts tested across categories" },
          {
            number: "85%",
            label: "improvement in consumer appeal scores",
          },
          {
            number: "10K+",
            label: "consumers engaged for feedback",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Concept Testing Done Right" features={featuresGrid} />
      <RecentPublications
        heading="Recent Publications"
        // publications={publications}
      />
      <CallToActionSection
        title="Launch with Confidence Using MiConcept"
        subtitle="Test and refine concepts with real consumer insights"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}