import React from "react";
import HeroSection from "./HeroSection";
import WhoWeAreSection from "./WhoWeAre";
import WhoWeAreDescription from "./WhoAreDescription";
import TimelineSection from "./TimeLineSection";
import EsomarSection from "./EsomarSection";
import LogoSlider from "./MintSlider";
import Map from "./Map";
import LeadershipSlider from "./MeetOurTeam";

const About = () => {
  return ( 
    <>
      <HeroSection />
    <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
      <WhoWeAreSection />
      <WhoWeAreDescription />
      <TimelineSection />
      <div id="gdpr-compliance">
      <EsomarSection />
      </div>
      <LogoSlider/>
      <div id="research">

      <LeadershipSlider/>
      </div>
      <Map/>
    </div>
    </>
  );
};

export default About;
