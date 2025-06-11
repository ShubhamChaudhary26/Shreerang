import React from "react";
import HeroSection from "./HeroSection";
import TellUsAboutIt from "./TellUsAboutIt";
import StatsBox from "./StatsBoxes";

const RequestQuote = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
      <HeroSection />
      <div id="form">
        <TellUsAboutIt />
      </div>
      </div>

      <StatsBox />
    </>
  );
};

export default RequestQuote;
