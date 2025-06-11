// components/InsightSection.tsx
'use client'; // Add 'use client' directive

import React from "react";
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import your ScrollFadeIn component

const InsightSection: React.FC = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center group">
        {/* Left Text Content */}
        <ScrollFadeIn delay={0.2}> {/* Apply fade-in to the left text block */}
          <div>
            <h2 className="h2">
              MI Correlate, MI Connect & MI Compliance
            </h2>
            <p className="p2">
              Discover our cutting-edge solutions:
              <br />
              <strong>MI Correlate:</strong> Uncover hidden relationships in your data to drive actionable insights.
              <br />
              <strong>MI Connect:</strong> Seamlessly integrate multiple data sources for a unified research experience.
              <br />
              <strong>MI Compliance:</strong> Ensure your data collection meets the highest industry standards with automated compliance monitoring.
            </p>
            {/* <button className="b2 !mb-7">
              <span className="Arrow">→</span>
              Find out more
            </button> */}
          </div>
        </ScrollFadeIn>

        {/* Right Image Content */}
        <ScrollFadeIn delay={0.4}> {/* Apply fade-in to the image block */}
          <div className="overflow-hidden rounded-md">
            <img
              src="/solution/InsightsSection1.png"
              alt="solution"
              className="w-full h-auto rounded-md transform transition duration-500 group-hover:scale-105"
            />
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
};

export default InsightSection;