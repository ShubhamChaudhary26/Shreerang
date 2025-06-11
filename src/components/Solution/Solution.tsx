import React from "react";
import HeroSection from "./HeroSection";
import InfoSection from "./InfoSection";
import SolutionCard from "./SolutionCard";
import SolutionsSection from "./SolutionSection";
import InsightSection from "./InsightsSection";
import CaseStudiesSection from "./CaseStudy";
import MintStats from "./MintStats";
import ExploreCard from "../Common/ExploreCard";

const Solution = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
      <HeroSection />
      <InfoSection/>
      <SolutionsSection />
      {/* <InsightSection/> */}
      <CaseStudiesSection/>
      <MintStats/>

      </div>
    </>
  );
};

export default Solution;
