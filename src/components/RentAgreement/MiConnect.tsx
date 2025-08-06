import CaseStudy from "./CaseStudy";
import FeatureBlocks from "./FeatureBlocks";
import HeroSection from "./HeroSection";
import floorLogo from "../../../public/icon.webp";
import { CallToActionSection } from "./CallToActionSection";
import LogoSlider from "../About/MintSlider";
import { ChartsSection } from "./ChartsSection";
import CaseStudyCarousel from "./CustomerPreferences";
// import TrustedBrands from "./TrustedBrands";

const slides = [
  {
    image: "/miconnect/CaseStudy3.png",
    title: "MiConnect: Excellence in Qualitative Research",
    description:
      "MiConnect delivers deep insights through In-Depth Interviews (IDIs), Focus Group Discussions (FGDs), Ethnographic Research, Online Communities, Neuroscience, and Expert Panels, uncovering rich consumer behaviors.",
    store1: "India Office",
    store2: "UAE Office",
    address1: "401, Pramukh Paramount, Kudasan, Gandhinagar, Gujarat 382421",
    address2: "Office 10, Sharjah Media City, Sharjah, United Arab Emirates",
  },
  {
    image: "/miconnect/CaseStudy2.png",
    title: "Overcoming Qualitative Research Challenges",
    description:
      "MiConnect addresses barriers like participant engagement, cultural nuances, and complex behavior analysis using immersive ethnographic studies, netnography, and behavioral research techniques.",
    store1: "Phone",
    store2: "Email",
    address1: "+91 7697016792 (9:30 AM - 6:30 PM)",
    address2: "support@mintsurvey.com",
  },
  {
    image: "/miconnect/CaseStudy1.png",
    title: "Why Choose MiConnect?",
    description:
      "MiConnect excels in capturing nuanced insights from hard-to-reach audiences, supports global expert panels, and leverages neuroscience and Delphi techniques for unmatched qualitative depth.",
    store1: "Behavioral Insights",
    store2: "Global Expertise",
    address1: "Neuroscience & Ethnography",
    address2: "Expert Panels & Delphi",
  },
];

const brandList = [
  {
    src: '/miconnect/idi.svg',
    alt: 'In-Depth Interviews Icon',
    name: 'In-Depth Interviews (IDIs)'
  },
  {
    src: '/miconnect/fgd.svg',
    alt: 'Focus Group Discussions Icon',
    name: 'Focus Group Discussions (FGDs)'
  },
  {
    src: '/miconnect/ethnography.svg',
    alt: 'Ethnographic Research Icon',
    name: 'Ethnographic Research'
  },
  {
    src: '/miconnect/immersive_research.svg',
    alt: 'Immersive Research Icon',
    name: 'Immersive Research'
  },
  {
    src: '/miconnect/netnography.svg',
    alt: 'Netnography Icon',
    name: 'Netnography'
  },
  {
    src: '/miconnect/online_communities.svg',
    alt: 'Online Communities Icon',
    name: 'Online Communities'
  },
  {
    src: '/miconnect/neuroscience.svg',
    alt: 'Neuroscience Research Icon',
    name: 'Neuroscience Research'
  },
  {
    src: '/miconnect/behavioral_research.svg',
    alt: 'Behavioral Research Icon',
    name: 'Behavioral Research'
  },
  {
    src: '/miconnect/expert_panels.svg',
    alt: 'Expert Panels Icon',
    name: 'Expert Panels'
  },
  {
    src: '/miconnect/delphi_technique.svg',
    alt: 'Delphi Technique Icon',
    name: 'Delphi Technique'
  },
  {
    src: '/miconnect/thematic_analysis.svg',
    alt: 'Thematic Analysis Icon',
    name: 'Thematic Analysis'
  },
  {
    src: '/miconnect/narrative_analysis.svg',
    alt: 'Narrative Analysis Icon',
    name: 'Narrative Analysis'
  }
];

const features = [
  {
    title: "Redefining Qualitative Research",
    description:
      "MiConnect delivers rich insights through In-Depth Interviews (IDIs), Focus Group Discussions (FGDs), Ethnographic Research, and Online Communities, enhanced by neuroscience and expert panels.",
    imgSrc: "/miconnect/miicon2.svg",
    link: "#",
  },
  {
    title: "Tackling Qualitative Research Challenges",
    description:
      "MiConnect overcomes barriers like participant engagement and cultural complexity using immersive ethnography, netnography, and behavioral research for authentic, nuanced insights.",
    imgSrc: "/miconnect/miicon3.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "MiConnect’s Unique Advantage",
    description:
      "Ideal for hard-to-reach audiences, MiConnect supports global expert panels, 24/7 online communities, and neuroscience-based research for deep, actionable qualitative insights.",
    imgSrc: "/miconnect/miicon4.svg",
    link: "#",
  },
  {
    title: "MiConnect’s Research Scope",
    description:
      "Optimized for in-depth qualitative methods like IDIs and FGDs, MiConnect uses the Delphi Technique and thematic analysis to deliver strategic insights within flexible timelines.",
    imgSrc: "/miconnect/miicon1.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Rich, Nuanced Insights",
    description:
      "MiConnect captures deep consumer insights through IDIs, FGDs, and ethnographic research, ensuring authentic and actionable qualitative data.",
  },
  {
    image: "/mismallicon2.png",
    title: "Privacy-First Approach",
    description:
      "MiConnect prioritizes respondent privacy using secure platforms for online communities and ethical practices in neuroscience research.",
  },
  {
    image: "/mismallicon3.png",
    title: "Real-Time Engagement",
    description:
      "With 24/7 support for online communities and netnography, MiConnect boosts participant engagement and insight quality.",
  },
  {
    image: "/mismallicon4.png",
    title: "Multi-Method Integration",
    description:
      "MiConnect combines IDIs, FGDs, ethnography, and expert panels with behavioral research to address diverse research needs globally.",
  },
  {
    image: "/mismallicon5.png",
    title: "Trusted by Global Clients",
    description:
      "MiConnect’s expertise in qualitative research, from neuroscience to Delphi techniques, delivers tailored insights for global industries.",
  },
];

const publications = [
  {
    image: "/miconnect/publication1.png",
    title: "Advancing Quantitative Research with MiCorrelate",
    description:
      "Learn how MiCorrelate redefines market research with hybrid CAPI, CATI, and CAWI surveys, enhanced by panel research and advanced statistical analysis.",
    type: "Insight",
    date: "May 21, 2025",
    link: "#",
  },
  {
    image: "/miconnect/publication2.png",
    title: "Navigating Challenges in Quantitative Data Collection",
    description:
      "An in-depth look at overcoming respondent recruitment, geographic, and cultural barriers using MiCorrelate’s innovative survey and analytics solutions.",
    type: "Article",
    date: "May 17, 2025",
    link: "#",
  },
  {
    image: "/miconnect/publication3.png",
    title: "The Future of Analytics with MiCorrelate",
    description:
      "Explore how MiCorrelate drives quantitative research innovation with 24/7 data collection, panel research, and data modeling for strategic insights.",
    type: "Report",
    date: "May 14, 2025",
    link: "#",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
     <HeroSection
  title="Registered Rent Agreement Service in Maharashtra"
  description="Calculate your stamp duty and registration fees instantly. Get doorstep biometric & agreement registration with Anulom."
  buttonText="Book Now"
/>

      

      {/* <CaseStudyCarousel slides={slides} /> */}
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="MiCONNECT Enhances Qualitative Efficiency and Reach"
        description="Faced with the challenge of engaging diverse and hard-to-reach participants, MintSurvey introduced MiCONNECT to enhance respondent recruitment and participation in qualitative studies. By combining in-depth techniques such as IDIs, FGDs, and ethnographic approaches with digital tools and hybrid outreach strategies. "
        stats={[
          { number: "500+", label: "IDIs & FGDs conducted annually" },
          {
            number: "4+",
            label: "Modes to conduct qualitative research",
          },
          {
            number: "75%",
            label: "Increase in respondent participation with MiCONNECT",
          },
        ]}
        button1Label="Read full case study"
        // button1Link="#"
      />
      {/* <FeatureGrid heading="Doing Data Right" features={featuresGrid} /> */}
      
      {/* <ChartsSection /> */}
      {/* <TestimonialSwitcher /> */}
      <CallToActionSection
        title="Grow Your Research Impact With MintSurvey"
        subtitle=""
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}
