
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-[68vh] mt-[10vh]  mb-8 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2  mx-auto relative z-10  md:py-0 max-w-[1440px] ">
        <motion.div
          className="flex items-center justify-center text-center md:text-left md:justify-start"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className=" mx-auto md:mx-0">
            {/* <p className="h5  !mb-2">Brand Growth</p>{" "} */}
            <h1 className="h1">
            Data-Driven Brand  
              <br />
         Growth Starts with
              <br />
            MintSurvey 
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="b1 ml-2"
            >
              <Link href="/requestquote" >
             Book a Free Consultation
              </Link>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="h-[300px] md:h-[450px] flex items-center justify-center md:justify-end mt-8 md:mt-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full h-full max-w-sm md:max-w-full flex justify-center items-center">
            <img
              src="/brandgrowth/HeroSection.svg"
              alt="Hero Section Image"
              className="custom-image"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
