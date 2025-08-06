'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import RentAgreementCalculator from './RentAgreementCalculator'; // Make sure path is correct

type HeroSectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  reverse?: boolean;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonText = 'Book a Free Consultation',
  reverse = false,
}) => {
  return (
    <section className="w-full bg-light md:py-20 mt-[15vh]">
      <div
        className={`container mx-auto md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="h1 Text whitespace-pre-line">{title}</h1>
          <p className="p2 max-w-xl mb-6">{description}</p>
          <div className="flex gap-4 mt-2">
            <Link href="/requestquote">
              <button className="b1 mt-5">{buttonText}</button>
            </Link>
          </div>
        </motion.div>

        {/* Calculator on Right */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <RentAgreementCalculator />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
