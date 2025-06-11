'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.20,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

interface Solution {
  title: string;
  link:string;
  description: string;
}

const solutions: Solution[] = [
  { title: 'MiCorrelate', link:"/micorrelate" , description: 'Quantitative Research: Conduct face-to-face, telephonic, and online surveys, plus panel research, statistical analysis, and data modeling to deliver actionable insights and trends.' },
  { title: 'MiConnect', link:"/miconnect", description: 'Qualitative Research: Utilize in-depth interviews, focus groups, ethnographic studies, netnography, neuroscience, and expert panels to uncover behaviors and motivations.' },
  { title: 'MiCompliance',link:"/compliance", description: 'Mystery Shopping: Perform CX benchmarking, SOP audits, omnichannel evaluations, staff assessments, and campaign tracking to ensure quality and consistency.' },
  { title: 'MiClick',link:"/miclick", description: 'Social Listening: Optimize campaigns, analyze sentiment, study competitors, identify trends, and manage crises with real-time social media insights.' },
  { title: 'MiCompilation',link:"/micompliation", description: 'Desk Research: Leverage verified sources, blend AI with human review, use fresh data and local languages for structured, client-tailored outputs.' },
  { title: 'MiConcept', link:"/miconcept" ,description: 'Concept Testing: Test products or ideas online/offline, with quant/qual methods, gathering real feedback for ads, products, and custom samples.' },
  { title: 'MiClinic',link:"/miclinic", description: 'Product Feedback: Assess real product usage offline or online, combining qual/quant insights for real-time reactions and detailed reviews.' },
  { title: 'MiCollection',link:"/micollection", description: ' Field Data: Execute questionnaires via a multilingual network, with quality checks and fraud detection for reliable data collection.' },
];

const Card: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedSolutions = showAll ? solutions : solutions.slice(0, 4);

  return (
    <main className="w-full py-10 mt-20 px-2 md:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className='h2 text-center'>Our Research Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {displayedSolutions.map((item, i) => (
            <motion.div
              key={i}
              className="bg-light p-6 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-md flex flex-col items-start text-start min-h-[290px]"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="flex-1">
                <h2 className="h3 light">{item.title}</h2>
                <p className="p2 mt-2">{item.description}</p>
              </div>
              <div className=" mt-4">
                <Link href={item.link}>
                <button className="b1  text-left"> Learn More</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="b1" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show less' : 'See all solutions'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Card;