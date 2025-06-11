// components/InfoSection.tsx
'use client';

import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import your ScrollFadeIn component

export default function InfoSection() {
  return (
    <section className="py-16 ">
      <div className=" ">
        <ScrollFadeIn delay={0.2}> {/* Apply fade-in to the main paragraph */}
          <p className="h2">
            From connecting with niche audiences using{" "}
            <span className="h2 light">MI Connect</span>, to tracking campaign performance through{" "}
            <span className="h2 light">MI Correlate</span>, and ensuring data integrity with{" "}
            <span className="h2 light">MI Compliance</span>, we deliver reliable solutions that drive growth.
          </p>
        </ScrollFadeIn>

        {/* <div className="mt-8">
          <ScrollFadeIn delay={0.4}> 
            <button className="b1">
              Book a Free Consultation
            </button>
          </ScrollFadeIn>
        </div> */}
      </div>
    </section>
  );
}