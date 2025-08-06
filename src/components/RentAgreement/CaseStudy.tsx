"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Stat {
  number: string;
  label: string;
}

interface CaseStudyProps {
  logo: StaticImageData;
  title: string;
  description: string;
  stats: Stat[];
  bgColorClass?: string;
  textColorClass?: string;
  button1Label: string;
  // button1Link: string;
}

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

const CaseStudy: FC<CaseStudyProps> = ({
  logo,
  title,
  description,
  stats,
  bgColorClass = "bg-light",
  textColorClass = "",
  button1Label,
  // button1Link,
}) => {
  return (
    <section className={`${bgColorClass} ${textColorClass} mb-10 mt-12 relative overflow-hidden py-20 px-6 md:px-12`}>
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
        {/* Left */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0)}
        >
          <p className="h5  uppercase tracking-wide text-accent font-medium">
            Case Study
          </p>

          <div className="h-10">
            <Image src={logo} alt="Logo" className="h-full w-auto object-contain" />
          </div>

          <h2 className="h2 ">{title}</h2>

          <p className="p2 ">{description}</p>

          {/* <div className="flex flex-wrap gap-4 pt-4">
            <Link href={button1Link}>
              <button className="b1 text-primary  px-5 py-3 rounded-md flex items-center gap-2  transition">
                {button1Label}
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div> */}
        </motion.div>

        {/* Right stats */}
        <motion.div
          className="space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.2)}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="border-l-4 border-accent pl-4">
                <p className="h2 ">{stat.number}</p>
                <p className=" p2">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
