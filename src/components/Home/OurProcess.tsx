"use client";

import React, { useEffect, useRef, useState } from "react";

const sliderData = [
  {
    title: "Project Initiation",
    description: "The research objectives and project scope are defined in detail at this stage.",
    image: "/grt.jpg",
    number: "01",
  },
  {
    title: "Data Collection",
    description: "Collecting data via primary and secondary research.",
    image: "/grt.jpg",
    number: "02",
  },
  {
    title: "Research Analysis",
    description: "Analyzing data to understand market trends.",
    image: "/grt.jpg",
    number: "03",
  },
  {
    title: "Final Review & Publication",
    description: "Publishing the final report after thorough review.",
    image: "/grt.jpg",
    number: "04",
  },
  {
    title: "Market Research",
    description: "Gathering insights from various sources for better decision-making.",
    image: "/grt.jpg",
    number: "05",
  },
];

export default function SliderComponent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    let animationFrameId: number;
    const scrollSpeed = 0.1;

    const autoScroll = () => {
      if (scrollRef.current && !isUserScrolling) {
        scrollRef.current.scrollLeft += scrollSpeed;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth / 2
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isUserScrolling]);

  const handleUserScroll = () => {
    setIsUserScrolling(true);
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000);
  };

  return (
    <div className="w-full py-10 ">
      <div className="text-left ml-[100px] mb-4 border-l-4 border-gold-semi pl-2">
        <p className=" font-semibold">Our Process</p>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleUserScroll}
        className="flex gap-6 w-full overflow-x-auto scroll-smooth scrollbar-hide px-10"
      >
        {[...sliderData, ...sliderData].map((item, index) => (
          <div
            key={index}
            className="w-[300px] h-[400px] flex-shrink-0 rounded-xl relative overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-Darkblack bg-opacity-50 p-4 flex flex-col justify-end">
              <h3 className="dark text-lg font-bold">{item.title}</h3>
              <p className="dark h5 mb-4">{item.description}</p>
              <span className="text-gold text-4xl font-bold absolute bottom-4 right-4">{item.number}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
