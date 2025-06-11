'use client';

import { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

const tabs = [
  {
    key: '1',
    title: 'MiCorrelate',
    heading: 'Quantitative Research & Analytics',
    content:
      'Conduct face-to-face, telephonic, and online surveys, plus panel research, statistical analysis, and data modeling to deliver actionable insights and trends.',
  },
  {
    key: '2',
    title: 'MiConnect',
    heading: 'Qualitative Research',
    content:
      'Utilize in-depth interviews (IDIs), focus group discussions (FGDs), ethnographic and immersive research, online communities and netnography, neuroscience and behavioral research, and expert panels with Delphi technique to uncover behaviors and motivations.',
  },
  {
    key: '3',
    title: 'MiCompliance',
    heading: 'Mystery Shopping / Retail Audits',
    content:
      'Perform customer experience benchmarking, compliance and SOP audits, omnichannel mystery shopping, sales and staff evaluation, promotional and campaign effectiveness tracking, and franchise and dealership audits to ensure quality and consistency.',
  },
  {
    key: '4',
    title: 'MiClick',
    heading: 'Social Media Listening',
    content:
      'Optimize campaigns with performance and content analysis, assess customer sentiment and feedback, study competitors and markets, identify trends and consumer insights, and manage crises with risk mitigation for real-time social insights.',
  },
  {
    key: '5',
    title: 'MiCompilation',
    heading: 'Secondary / Desk Research',
    content:
      'Uses official, verified sources only, combines AI with human review to avoid inaccuracies, covers latest data and local languages, delivering structured, summarized output tailored to client objectives.',
  },
  {
    key: '6',
    title: 'MiConcept',
    heading: 'Concept Testing',
    content:
      'Tests product or idea concepts online or offline, using quant or qual techniques, gathering real consumer feedback for packaging, ads, and products with custom sampling per brief.',
  },
  {
    key: '7',
    title: 'MiClinic',
    heading: 'Product Experience Feedback',
    content:
      'Assess real product usage by respondents offline for touch or online for digital trials, combining qualitative and quantitative insights for real-time reactions and detailed diagnostic output.',
  },
  {
    key: '8',
    title: 'MiCollection',
    heading: 'Field & Data Collection',
    content:
      'Supports questionnaire execution with a large multilingual field network across major geographies, using in-house MIGFT team, multi-layered quality checks, and fraud detection for reliable data.',
  },
];

export default function BrandTabsCustom() {
  const [activeKey, setActiveKey] = useState('1');
  const currentIndex = tabs.findIndex((t) => t.key === activeKey);

  const goToTab = (dir: number) => {
    let newIndex = (currentIndex + dir + tabs.length) % tabs.length;
    setActiveKey(tabs[newIndex].key);
  };

  return (
    <ScrollFadeIn delay={0.2}>
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
        <h1 className="h2 text-center !mb-[65px]">Brand Strategy</h1>

        <p className="p2 text-center md:text-left mb-4">
          At MintSurvey, our Brand Strategy solutions are designed to help brands
          uncover whitespace opportunities, build emotional connections with
          consumers, and sustain distinctiveness in crowded markets.
        </p>
        <p className="p2 text-center md:text-left mb-8">
          From advanced research and analytics to human insight-led approaches,
          we support businesses in shaping resilient and future-ready brand strategies.
        </p>

        <div className="flex items-center space-x-2 md:space-x-4 mb-6">
          {/* Left Arrow Button */}
          <button
            onClick={() => goToTab(-1)}
            className="p-2 border rounded-full hover:bg-light-200 transition transform hover:scale-105 flex-shrink-0"
          >
            <LeftOutlined />
          </button>

          {/* Tab Titles - Responsive with your h5 class */}
          <div className="flex w-full overflow-x-auto border-b pb-2 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={`h5 relative pb-2 font-medium transition-all duration-300 transform hover:scale-110 whitespace-nowrap flex-shrink-0
                            ${activeKey === tab.key
                               ? 'text-black border-b-2 border-black'
                               : 'text-black hover:text-black hover:border-b-2 hover:border-black'
                            }
                            text-sm px-2
                            md:text-base md:px-4
                            `}
              >
                {tab.title}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full transition-all duration-300 ${
                    activeKey === tab.key ? 'bg-Darkblack' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => goToTab(1)}
            className="p-2 border rounded-full hover:bg-light-200 transition transform hover:scale-105 flex-shrink-0"
          >
            <RightOutlined />
          </button>
        </div>

        {/* Tab Content with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="p-4 md:p-6 rounded-lg bg-kight shadow-md"
          >
            <h2 className="h3 light text-center md:text-left">{tabs[currentIndex].heading}</h2>
            <p className="h5 mt-2 text-center md:text-left">{tabs[currentIndex].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </ScrollFadeIn>
  );
}