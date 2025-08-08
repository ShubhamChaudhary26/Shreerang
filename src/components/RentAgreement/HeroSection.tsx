'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import RentAgreementCalculator from './RentAgreementCalculator';

type HeroSectionProps = {
  title: string;
  subtitle: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <section className="w-full pt-[12vh] mt-10 md:mb-[100px] ">
  <div className="max-w-7xl mx-auto px-4 md:px-12">

    {/* Main Title */}
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-6"
    >
      Register Rent Agreement Service in Maharashtra
    </motion.h1>

    {/* Two Column Layout */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 items-start">
  {/* Left Image */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-center md:justify-start"
  >
    <img
      src="/undefined_give_me_some_attract.png"
      alt="Rent Agreement Illustration"
      className="w-full max-w-xl h-auto mt-4 md:mt-10 md:h-[70vh]"
    />
  </motion.div>

  {/* Right: Subtitle + Calculator */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex flex-col justify-start space-y-4 text-center md:text-left"
  >
    <p className="text-lg md:text-xl">{subtitle}</p>
    <div className="space-y-4">
      <RentAgreementCalculator />
    </div>
  </motion.div>
</div>

  </div>
</section>

  );
};

export default HeroSection;
