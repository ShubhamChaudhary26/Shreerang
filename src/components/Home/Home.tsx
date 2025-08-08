import React from "react";
// import SolutionsSection from './SolutionSection';
import Card from "./Card";
import FeaturedProductCard from "./FeaturedProductCard";
import PeopleStatsSection from "./ShreerangIndustries";
import HeroBanner from "./HeroSection";
import Services from "./OurServices";
import ContentWithImage from "./ContentWithImage";
import UploadImage from "./UploadImage";

const Home = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto ">
        <HeroBanner />
        <Card />
        {/* <FeaturedProductCard /> */}

        <PeopleStatsSection />
        <Services />
        <UploadImage />

      </div>
        <ContentWithImage />
    </>
  );
};

export default Home;
