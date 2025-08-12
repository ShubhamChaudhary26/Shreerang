'use client';

import React from 'react';
import CountUp from 'react-countup';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

const statsData = [
  {
    number: 40,
    label: "Countries",
    suffix: "+",
    text: "Bridging Nations Worldwide",
    bgColor: "bg-light",
  },
  {
    number: 200,
    label: "Projects",
    suffix: "+",
    text: "Driving Impact Globally",
    bgColor: "bg-light",
  },
  {
    number: 25000,
    label: "Interviewers",
    suffix: "+",
    text: "Uniting Voices in BARE",
    bgColor: "bg-light",
  },
  {
    number: 100000,
    label: "Responses",
    suffix: "+",
    text: "Fueling Global Perspectives",
    bgColor: "bg-light",
  },
]

const StatsBox = () => {
  return (
    // Ensure that ScrollFadeIn is working correctly and not causing elements to be permanently hidden
    // or loaded too late for the Intersection Observer to catch.
    <ScrollFadeIn delay={0.2}>
      <div className="flex flex-col md:flex-row    mx-auto">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} flex-1 min-h-[180px] flex flex-col justify-center items-center p-4 md:p-16 animate-fadeInUp`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-center">
              <CountUp
                end={stat.number}
                duration={3}
                separator=","
                suffix={stat.suffix}
                enableScrollSpy={true} // Explicitly enable scroll spy
                scrollSpyOnce={true}  // Ensure it animates only once when it comes into view
                // startOnMount={false} // This is the default, but you can set it if needed
              />
              <span className="block text-xl sm:text-2xl md:text-2xl lg:text-3xl mt-1 sm:mt-0 md:mt-0">
                {stat.label}
              </span>
            </h2>
            <p className="text-sm md:text-base text-center opacity-90 mt-2">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </ScrollFadeIn>
  );
};

export default StatsBox;