import React from "react";
import HeroSection from "./HeroSection";
import ContactAccordion from "./ContactAccordion";
import Map from "../About/Map";

const Contact = () => {
  return (
    <>
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-9">
      <HeroSection />

      <ContactAccordion/>
      <div id="presence">
      <Map/>
      </div>
      </div>
    </>
  );
};

export default Contact;
