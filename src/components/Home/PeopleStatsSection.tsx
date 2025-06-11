"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Globe2 } from "lucide-react";

const itemVariants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.9 },
  },
};

const contentList = [
  {
    icon: <Users className="w-6 h-6 text-blue" />,
    title: "Direct Control",
    desc: "MintSurvey works directly with freelancers, ensuring they fully understand each assignment.",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-blue shrink-0" />,
    title: "Reasonable Price",
    desc: "MiGFT was created to establish local teams and ensure complete control over data quality and cost.",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-blue shrink-0" />,
    title: "Global Experience | Local Expertise",
    desc: "MiGFT members comprise multi-lingual people who are well trained to cull out the required information from the target audience.",
  },
];

const PeopleStatsSection: React.FC = () => {
  return (
    <section className="py-16 mt-20 bg-light mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our in-house data collection team called{" "}
          <span className="text-blue">“MIGFT”</span> is an integral part of MintSurvey
        </h2>

        <div className="space-y-16">
          {contentList.map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="flex flex-col"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Icon + Title aligned to the left */}
                <div className="md:col-span-3 col-span-1 flex items-center gap-3">
               <span className="mb-4">   {icon}</span>
                  <p className="h3 light">
                    {title}
                  </p>
                </div>

                {/* Description aligned properly */}
                <div className="md:col-span-9 col-span-1">
                  <p className="p1 md:text-lg">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleStatsSection;
