import React from "react";
import HeroSection from "./HeroSection";
import WhoWeAreDescription from "./WhoAreDescription";
import EsomarSection from "./EsomarSection";
import Map from "./Map";
const About = () => {
  return ( 
    <>
      <HeroSection />
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
 
      <WhoWeAreDescription />
      <div id="gdpr-compliance">
      <EsomarSection />
      </div>
      <div id="research">

      </div>
      <Map/>
    </div>
    </>
  );
};

export default About;
