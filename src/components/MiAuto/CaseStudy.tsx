'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import floorLogo from "../../../public/icon.webp"; // Direct import

const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const CaseStudy: FC = () => {
  return (
    <section className="bg-light mb-10 mt-12 relative overflow-hidden py-20 px-6 md:px-12">
      {/* Background Arrow */}
      <motion.svg
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-10 top-10 w-[300px] h-[300px] opacity-30 z-0 hidden md:block"
      >
        <path
          d="M20 20 C300 20, 500 200, 580 380"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d="M570 360 L580 380 L560 375"
          fill="white"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        />
      </motion.svg>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Section */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0)}
        >
          <p className="h5 uppercase tracking-wide text-accent font-medium">
            Case Study
          </p>

          <div className="h-10">
            <Image src={floorLogo} alt="Logo" className="h-full w-auto object-contain" />
          </div>

          <h2 className="h2">
            Global Automaker Enhances Strategic Vision with MintSurvey Auto
          </h2>

          <p className="p2">
            An automotive leader leveraged MintSurvey Auto to analyze evolving
            trends and regulations, improving product strategy and gaining
            valuable consumer insights across diverse markets.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="b1 text-primary px-5 py-3 rounded-md flex items-center gap-2 transition">
              Read full case study
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Right stats */}
        <motion.div
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.2)}
        >
          {[
            { number: "20+", label: "markets evaluated across India" },
            { number: "3", label: "segments: EV, ICE & Commercial Vehicles" },
            { number: "95%", label: "insight accuracy from verified data" },
          ].map((stat, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="border-l-4 border-accent pl-4">
                <p className="h2">{stat.number}</p>
                <p className="p2">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
