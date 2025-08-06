'use client';

import React from 'react';
import LiveChart from './LiveChart'; 
import { motion } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-auto md:h-[590px] w-full mt-4 md:mt-12 overflow-hidden px-1 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full mx-auto relative z-10 py-20 md:py-0"> 

        <motion.div
          className="flex items-center justify-center text-center md:text-left md:justify-start" 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-xl mx-auto md:mx-0">
            <h1 className="h1"> 
              Rent Agreement Services at Your Doorstep
            </h1>
            <p className="p1 mt-4 text-muted-foreground">
              Get your Registered Rent Agreement done with biometric verification, official e-stamp, and expert support — all from the comfort of your home.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="b1 mt-6"
            >
              <Link href="tel:+917498776389">
                📞 Call Now: +91 7498776389
              </Link>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="h-[300px] md:h-full flex items-center justify-center md:justify-end mt-12 md:mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full h-full max-w-sm md:max-w-full"> 
            <LiveChart />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
