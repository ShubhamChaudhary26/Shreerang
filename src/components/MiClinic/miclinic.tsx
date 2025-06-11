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
    alt: 'Product Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Feedback Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Usage Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Qualitative Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Quantitative Metrics Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Real-Time Reviews Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Touch & Feel Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Digital Trials Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Diagnostic Reports Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Satisfaction Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Product Usability Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Feedback Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Market Fit Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Prototype Testing Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'User Experience Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Product Validation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Consumer Behavior Icon',
    name: ""
  }
];

const features = [
  {
    title: "Real Product Usage Testing",
    description:
      "MiClinic facilitates authentic product usage by respondents in controlled environments, capturing real-world interactions and feedback.",
    imgSrc: "/miclinic/miclinicicon1.svg",
    link: "#",
  },
  {
    title: "Offline Touch & Feel Clinics",
    description:
      "Conduct in-person product clinics to gather tactile feedback, ensuring products meet consumer expectations for quality and usability.",
    imgSrc: "/miclinic/miclinicicon2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Online Digital Trials",
    description:
      "Enable virtual product testing through MiClinic’s online platform, allowing respondents to trial digital or physical products remotely.",
    imgSrc: "/miclinic/miclinicicon3.svg",
    link: "#",
  },
  {
    title: "Detailed Diagnostic Insights",
    description:
      "Gain qualitative and quantitative insights with MiClinic’s comprehensive reports, highlighting consumer reactions and actionable recommendations.",
    imgSrc: "/miclinic/miclinicicon4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Real-Time Reactions",
    description:
      "Capture live consumer reactions and reviews during product testing for immediate, actionable insights.",
  },
  {
    image: "/mismallicon2.png",
    title: "Hybrid Testing Approach",
    description:
      "Combine offline touch-and-feel with online digital trials for a holistic view of product performance.",
  },
  {
    image: "/mismallicon3.png",
    title: "Broad Respondent Reach",
    description:
      "Engage diverse consumer groups across urban and rural areas for comprehensive feedback.",
  },
  {
    image: "/mismallicon4.png",
    title: "Qualitative & Quantitative Data",
    description:
      "Leverage both emotional and statistical insights to inform product development and improvements.",
  },
  {
    image: "/mismallicon5.png",
    title: "Detailed Diagnostic Reports",
    description:
      "Receive in-depth analyses to pinpoint strengths, weaknesses, and opportunities for product optimization.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Unlocking Product Success with MiClinic",
    description:
      "Learn how MiClinic’s product clinics deliver real-time consumer insights to refine product designs and boost market fit.",
    type: "Insight",
    date: "June 3, 2025",
    link: "/blog/product-clinics-miclinic",
  },
  {
    image: "/miconnect/publication2.png",
    title: "The Power of Touch & Feel Testing",
    description:
      "Explore how MiClinic’s offline clinics capture tactile feedback to enhance product usability and consumer satisfaction.",
    type: "Article",
    date: "May 28, 2025",
    link: "/blog/touch-feel-testing",
  },
  {
    image: "/miconnect/publication3.png",
    title: "Digital Trials with MiClinic",
    description:
      "Discover how MiClinic’s online platform enables scalable product testing with real-time consumer feedback.",
    type: "Report",
    date: "May 22, 2025",
    link: "/blog/digital-trials-miclinic",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Refine Products with MiClinic’s Consumer Insights`}
        description="Gain deep insights into product performance with MiClinic’s hybrid testing approach. Conduct offline touch-and-feel clinics and online digital trials to capture real-time consumer reactions and detailed diagnostic feedback."
        imageSrc="/miclinic/miclinic.svg"
        imageAlt="Product Testing Illustration"
        buttonText="Book a Free Consultation"
      />
      {/* <TrustedBrands
        heading="Trusted by Brands Committed to Product Excellence"
        brands={brandList}
        showLink={true}
        // linkHref="/brands"
      /> */}
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Brand Enhances Product Design with MiClinic"
        description="A leading consumer goods brand utilized MiClinic to conduct hybrid product clinics, combining offline touch-and-feel testing with online trials. The result was actionable insights that improved product usability, consumer satisfaction, and market readiness."
        stats={[
          { number: "200+", label: "products tested across categories" },
          {
            number: "80%",
            label: "increase in consumer satisfaction scores",
          },
          {
            number: "95%",
            label: "accuracy in identifying product improvement areas",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      <FeatureGrid heading="Empowering Product Innovation" features={featuresGrid} />
      <RecentPublications
        heading="Recent Publications"
        // publications={publications}
      />
      <CallToActionSection
        title="Optimize Products with MiClinic"
        subtitle="Harness real-time consumer insights for smarter product development"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}