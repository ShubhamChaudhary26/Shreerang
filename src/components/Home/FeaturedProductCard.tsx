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
      </div>
    </section>
  );
}