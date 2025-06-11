'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Link from 'next/link';

const fadeInSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedProductCard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 }); 
  return (
    <section className="py-12 w-full">
      <div className=" mx-auto" ref={ref}> 
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"} 
              variants={fadeInSlideLeft}
              className="mb-4 md:mb-0"
            >
              <h1 className="h2 text-center md:text-left">
                Expanding your reach, fueling progress, and discovering
                <br className="hidden sm:inline" />
                 fresh possibilities.
               
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"} 
              variants={fadeInSlideRight}
              transition={{ delay: 0.1 }} 
              className="mt-4 md:mt-0"
            >
              <Link href="/solution">
              <button className="b1">See all solutions</button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* <div className={`bg-light rounded-lg overflow-hidden
                       flex flex-col lg:flex-row items-center justify-between
                       p-6 sm:p-8 lg:p-12 xl:p-20
                       min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] w-full`}>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"} 
            variants={fadeInSlideUp}
            transition={{ delay: 0.2 }}
            className="max-w-full lg:max-w-lg space-y-3 sm:space-y-4 text-center lg:text-left mb-8 lg:mb-0"
          >
            <p className="h5 !mb-0">Featured product</p>
            <h2 className="h2 !mt-0">MintSurvey</h2>
            <p className="p2">
              A unified research platform that brings together real-time insights,<br className="hidden sm:inline" />
              advanced analytics, and audience intelligence — all in one place.
            </p>
            <button className="mt-4 b1">
              <Link href="/requestquote">
                Book a Free Consultation
              </Link>
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"} 
            variants={fadeInSlideRight} // Right image ke liye fadeInSlideRight variant use kiya
            transition={{ delay: 0.3 }} // Right image ke liye delay
            className="mt-8 lg:mt-0 lg:ml-12 w-full max-w-sm sm:max-w-md lg:max-w-lg"
          >
            <img src="/home/FeaturedProduct1.png" alt="MintSurvey ONE" className="w-full bg-light h-[35vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] object-contain" />
          </motion.div>
        </div> */}
      </div>
    </section>
  );
}