import CaseStudy from "../MiConnect/CaseStudy";
import FeatureBlocks from "../MiConnect/FeatureBlocks";
import HeroSection from "../MiConnect/HeroSection";
import floorLogo from "../../../public/icon.webp";
import { FeatureGrid } from "../MiConnect/FeatureGrid";
import { RecentPublications } from "../MiConnect/RecentPublications";
import { CallToActionSection } from "../MiConnect/CallToActionSection";

const brandList = [
  {
    src: '/grt.jpg',
    alt: 'Social Media Engagement Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Brand Sentiment Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Campaign ROI Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Competitor Benchmarking Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Trend Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Customer Insights Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Crisis Detection Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Content Optimization Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Audience Segmentation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Social Listening Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Feedback Analysis Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Market Trends Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Risk Mitigation Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Engagement Metrics Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Sentiment Tracking Icon',
    name: ""
  },
  {
    src: '/grt.jpg',
    alt: 'Performance Analytics Icon',
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
    title: "Social Media Listening & Campaign Performance",
    description:
      "MiClick’s real-time social listening tracks brand mentions, hashtags, and conversations across platforms, providing actionable insights to optimize campaign performance, boost engagement, and maximize ROI.",
    imgSrc: "/miclick/miclick1.svg",
    link: "#",
  },
  {
    title: "Customer Sentiment & Feedback Analysis",
    description:
      "Leverage MiClick’s AI-powered sentiment analysis to understand customer emotions, analyze feedback, and refine strategies based on real-time consumer insights from social media and reviews.",
    imgSrc: "/miclick/miclick2.svg",
    link: "#",
    reverse: true,
  },
  {
    title: "Competitor & Market Analysis",
    description:
      "MiClick benchmarks your brand against competitors, analyzing their strategies, audience engagement, and market positioning to uncover opportunities and stay ahead in your industry.",
    imgSrc: "/miclick/miclick3.svg",
    link: "#",
  },
  {
    title: "Crisis Management & Risk Mitigation",
    description:
      "With MiClick’s real-time alerts and sentiment tracking, detect potential crises early, respond proactively, and mitigate risks to protect your brand’s reputation.",
    imgSrc: "/miclick/miclick4.svg",
    link: "#",
    reverse: true,
  },
];

const featuresGrid = [
  {
    image: "/mismallicon1.png",
    title: "Real-Time Campaign Insights",
    description:
      "MiClick’s live dashboards deliver instant metrics on engagement, reach, and sentiment, enabling data-driven content optimization for superior campaign performance.",
  },
  {
    image: "/mismallicon2.png",
    title: "Advanced Sentiment Analysis",
    description:
      "MiClick uses NLP and machine learning to analyze customer feedback, identifying emotions and trends to enhance customer experience and brand loyalty.",
  },
  {
    image: "/mismallicon3.png",
    title: "Competitor Benchmarking",
    description:
      "Compare your brand’s performance with competitors using MiClick’s analytics, uncovering market gaps and strategic opportunities to gain a competitive edge.",
  },
  {
    image: "/mismallicon4.png",
    title: "Trend Identification",
    description:
      "MiClick identifies emerging trends and consumer preferences across social platforms, empowering brands to create resonant content and stay ahead of market shifts.",
  },
  {
    image: "/mismallicon5.png",
    title: "Crisis Detection & Mitigation",
    description:
      "MiClick’s AI-driven alerts detect negative sentiment spikes and potential crises, enabling swift responses to safeguard brand reputation.",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
      <HeroSection
        title={`Unlock Social Media Success with MiClick`}
        description="Harness the power of social media with MiClick’s advanced analytics. Monitor conversations, optimize campaigns, analyze sentiment, benchmark competitors, and manage risks with real-time insights."
        imageSrc="/miclick/miclick.svg"
        imageAlt="Social Media Analytics Illustration"
        buttonText="Book a Free Consultation"
      />
      
      <FeatureBlocks features={features} />
      <CaseStudy
        logo={floorLogo}
        title="Global Brand Boosts Engagement with MiClick"
        description="A leading consumer brand leveraged MiClick’s social listening and sentiment analysis to optimize campaigns, benchmark competitors, and manage crises. The result was a 30% increase in engagement, 20% higher campaign ROI, and proactive risk mitigation across platforms."
        stats={[
          { number: "500+", label: "social campaigns optimized" },
          {
            number: "30%",
            label: "increase in audience engagement",
          },
          {
            number: "95%",
            label: "accuracy in sentiment and trend detection",
          },
        ]}
        button1Label="Read full case study"
      />
      <FeatureGrid heading="Empowering Data-Driven Social Strategies" features={featuresGrid} />
      <RecentPublications
        heading="Recent Publications"
      />
      <CallToActionSection
        title="Amplify Your Social Presence with MiClick"
        subtitle="Leverage real-time insights for smarter campaigns, deeper consumer insights, and stronger engagement"
        primaryBtnText="Book a Free Consultation"
        primaryBtnLink="/requestquote"
        imageSrc="/miautobanner.png"
      />
    </div>
  );
}