import React from "react";
// import SolutionsSection from './SolutionSection';
import Card from "./Card";
import FeaturedProductCard from "./FeaturedProductCard";
import PeopleStatsSection from "./PeopleStatsSection";
import InsightsSection from "./InsightsSection";
import HeroBanner from "./HeroSection";
import Services from "./OurServices";
import ContentWithImage from "./ContentWithImage";
import { Countries } from "./Country";
import TestimonialSlider from "./Testimonial";
import WhyBrandsSection from "./Brand";

const Home = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
        <HeroBanner />
        <Card />
        {/* <FeaturedProductCard /> */}
        <WhyBrandsSection/>
        
        <Countries />
        <InsightsSection />
        <PeopleStatsSection />
        <Services />
        <div className="w-full py-10 md:py-20 bg-light px-4">
          <h2 className="h2 text-center pb-6">
          Our Core Belief
        </h2>
        <ContentWithImage
          subtitle="Our Vision"
          title="To become the most reliable market research organization in the world, driven by technology and trust."
          content=""
          image="/home/ContentWithImage1.svg"
          reverse={undefined}
          />

        {/* Second Section - Reversed */}
        <ContentWithImage
          subtitle="Our Mission"
          title="To continuously adopt the best research techniques and provide actionable insights in the shortest possible time."
          content=""
          image="/home/ContentWithImage2.svg"
          reverse
          />
          </div>
          <TestimonialSlider/>
          </div>
    </>
  );
};

export default Home;
