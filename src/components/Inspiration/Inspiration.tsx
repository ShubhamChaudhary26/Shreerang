"use client";
import React, { useState } from "react";
import InspirationHeader from "./HeroSection";
import CaseStudiesSection from "./OurSolutions";
import FilterBar from "./FilterBar";
import InsightsGrid from "./InsightsGrid";
import ArticleCards from "./Article";
import OurSolutions from "./OurSolution";
import BrandGrowthSection from "./BrandGrowth";

const Inspiration = () => {
  const [filters, setFilters] = useState({});
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
      <InspirationHeader />
 
<CaseStudiesSection
  title={["On-field Check", "Meta-data Check", "Logical Check", "Back-check"]}
  descriptions={[
    "Senior researchers oversee data collection in the field to ensure it meets the quality standards. For online surveys, the respondent's social media profile is validated",
    "Metadata for each interview, such as GPS location, duration, and time distribution.",
    "We perform logical checks on the collected data to ensure it aligns with market trends.",
    "Interviews are backchecked by contacting respondents and asking specific questions, like What is the colour of your car? to verify authenticity"
  ]}
 
  images={[
    "/inspiration/CaseStudies1.svg",
    "/inspiration/CaseStudies2.svg",
    "/inspiration/CaseStudies3.svg",
    "/inspiration/CaseStudies4.svg"
  ]}
  cards={[
    {
      title: "On-field Check",
      content: "Senior researchers oversee data collection in the field to ensure it meets the quality standards. For online surveys, the respondent's social media profile is validated"
    },
    {
      title: "Meta-data Check",
      content: "Metadata for each interview, such as GPS location, duration, and time distribution."
    },
    {
      title: "Logical Check",
      content: "We perform logical checks on the collected data to ensure it aligns with market trends."
    },
    {
      title: "Back-check",
      content: "Interviews are backchecked by contacting respondents and asking specific questions, like What is the colour of your car? to verify authenticity"
    }
  ]}
/>
        <div >
          <h1 className="h2 !mb-10 ">
            Dig deep in to the depth and breadth of our knowledge.
          </h1>
          <FilterBar filters={filters} setFilters={setFilters} />
          <InsightsGrid filters={filters} />
        </div>
        <div >
          {/* <ArticleCards /> */}
        </div>

        <OurSolutions />

        <div className="bg-dark">
          {/* <BrandGrowthSection /> */}
        </div>

      </div>
    </>
  );
};

export default Inspiration;
