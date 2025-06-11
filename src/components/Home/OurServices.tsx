"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaEye, FaChartLine, FaUsers, FaBoxOpen, FaSmile, FaClipboard, FaLightbulb,
  FaBullhorn, FaPeopleCarry, FaNetworkWired, FaTag,
  FaStar
} from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";

const servicesData = [
  {
    icon: <FaEye className="text-2xl text-blue-light mb-2" />,
    title: "Brand Perception & Awareness Studies",
    description: "Gain deep insights into how your brand is perceived by your target audience, measure brand recall, and identify strategies to increase its visibility and recognition in the competitive market.",
    image: "home/service1.svg",
  },
  {
    icon: <FaChartLine className="text-2xl text-blue-light mb-2" />,
    title: "Competitor & Market Analysis",
    description: "Understand your competitors’ strengths and weaknesses, analyze market trends, and identify opportunities to position your business strategically for long-term growth and success.",
    image: "home/service2.svg",
  },
  {
    icon: <FaUsers className="text-2xl text-blue-light mb-2" />,
    title: "Consumer Segmentation",
    description: "Segment your audience based on demographics, behaviors, and preferences to create targeted marketing strategies that resonate with specific customer groups and drive engagement.",
    image: "home/service3.svg",
  },
  {
    icon: <FaBoxOpen className="text-2xl text-blue-light mb-2" />,
    title: "Usage & Attitude Study",
    description: "Explore customer behaviors, preferences, and attitudes towards your products or services to uncover actionable insights that help refine your offerings and improve user experience.",
    image: "home/service4.svg",
  },
  {
    icon: <FaStar className="text-2xl text-blue-light mb-2" />,
    title: "Product Evaluation",
    description: "Assess your product’s performance through user feedback, identify areas for improvement, and ensure it meets customer expectations while maintaining high quality and satisfaction levels.",
    image: "home/service5.svg",
  },
  {
    icon: <FaSmile className="text-2xl text-blue-light mb-2" />,
    title: "Customer Satisfaction",
    description: "Measure customer happiness with your products or services, identify pain points, and implement changes to enhance their overall experience and foster long-term loyalty.",
    image: "home/service6.svg",
  },
  {
    icon: <FaClipboard className="text-2xl text-blue-light mb-2" />,
    title: "Market Sizing & Market Entrance Study",
    description: "Analyze the potential size of your target market, evaluate entry barriers, and develop a strategic plan to successfully launch your products or services in new regions.",
    image: "home/service7.svg",
  },
  {
    icon: <FaLightbulb className="text-2xl text-blue-light mb-2" />,
    title: "Concept Ideation & New Product Ideation",
    description: "Generate innovative concepts and ideas for new products, test their viability with your audience, and bring creative solutions to market that drive growth and innovation.",
    image: "home/service8.svg",
  },
  {
    icon: <FaBullhorn className="text-2xl text-blue-light mb-2" />,
    title: "Campaign Performance & Effectiveness",
    description: "Evaluate the success of your marketing campaigns by analyzing key metrics, understanding audience response, and optimizing future campaigns for better ROI and engagement.",
    image: "home/service9.svg",
  },
  {
    icon: <FaPeopleCarry className="text-2xl text-blue-light mb-2" />,
    title: "Ethnographic Research",
    description: "Conduct in-depth studies of customer lifestyles, cultures, and behaviors to uncover deep insights that inform product development and marketing strategies.",
    image: "home/service10.svg",
  },
  {
    icon: <FaNetworkWired className="text-2xl text-blue-light mb-2" />,
    title: "Contact Point Analysis",
    description: "Analyze and optimize all customer touchpoints, from online interactions to in-store experiences, to improve engagement, conversions, and overall customer satisfaction.",
    image: "home/service11.svg",
  },
  {
    icon: <FaTag className="text-2xl text-blue-light mb-2" />,
    title: "Pricing Study",
    description: "Determine the optimal pricing strategy for your products or services by analyzing market trends, customer willingness to pay, and competitive pricing to maximize profitability.",
    image: "home/service12.svg",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 40 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.9 },
  },
};

const Services = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    let animationFrameId;

    const scroll = () => {
      if (scrollElement) {
        scrollElement.scrollLeft += 1;
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth) {
          scrollElement.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <h2 className="h2 !mb-12 text-center">
        We are your all-in-one partner for every market research need
      </h2>
      <div className="md:h-[505px] overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 whitespace-nowrap w-full max-w-[80rem] mx-auto overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {[...servicesData, ...servicesData].map((service, index) => (
            <motion.div
              key={index}
              className="bg-light shadow-lg mb-4 overflow-hidden rounded-lg relative h-[410px] w-[300px] flex-shrink-0 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="relative h-48 w-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain bg-gray-100"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute top-0 left-0 p-1 px-2 right-0 z-10 flex flex-col items-start space-y-1">
                  <div className="bg-white bg-opacity-80 rounded-full p-2">
                    {service.icon}
                  </div>
                  <h3 className="h3 dark break-words whitespace-normal max-w-full">{service.title}</h3>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="p2 break-words whitespace-normal">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;