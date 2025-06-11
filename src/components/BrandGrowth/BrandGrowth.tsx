import React from "react";
import HeroSection from "./HeroSection";
import BrandStrategyTabs from "./BrandStategy";
import CaseStudiesSection from "../Common/CaseStudy";
import BrandZBanner from "./BrandZBanner";

const BrandGrowth = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
        <HeroSection />

        <BrandStrategyTabs />
        {/* <BrandStrategyTabs/> */}
        <CaseStudiesSection
          title="Expert-Driven GTM Strategies to Grow Your Brand"
          description="Use tailored go-to-market plans, powered by insights from top experts, to segment, target, and position your brand successfully in new markets."
          // buttonText="Learn more"
          images={[
            "/brandgrowth/brandgrowth2.svg",
            "/brandgrowth/brandgrowth3.svg",
            "/brandgrowth/brandgrowth1.svg",
          ]}
        />

        <div className="mb-10">
          <BrandZBanner
            imageUrl="/brandgrowth/brandbazar1.svg"
            heading="Explore MintSurvey articles for free"
            description="Stay informed and make smarter, data-driven decisions without any subscription or sign-up barrier."            // buttonText="Explore for free"
          />
        </div>

        <BrandZBanner
          imageUrl="/brandgrowth/brandbazar2.svg"
          heading="Get Real Feedback from Real People "
          description="While AI may rely on outdated data or generate assumptions, MintSurvey connects directly with your target audience — uncovering their true emotions, motivations, and decision drivers through authentic human insights."
          // buttonText="Start now"
        />
      </div>
    </>
  );
};

export default BrandGrowth;
