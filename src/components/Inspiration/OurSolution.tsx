"use client";

import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import ScrollFadeIn from "../../hooks/ScrollFadeIn";

export default function OurSolutions() {
  return (
    <section className="flex flex-col md:flex-row gap-10 items-center justify-between mt-[100px] mb-10  px-6 py-12 md:py-16 max-w-[1440px] mx-auto">
      {/* Left Section - Heading + Text */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6">
        <ScrollFadeIn delay={0.1}>
          <h2 className="h2">MiGFT: Our In-House Data Collection Network</h2>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.4}>
          <p className="p2">
            MiGFT is a growing team of trained freelancers across the Indian
            Subcontinent and Middle East, including India, UAE, Saudi Arabia,
            Egypt, and more. Created to tackle industry-wide poor data quality,
            MiGFT ensures direct recruitment, training, and payment,
            guaranteeing reliable results.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.6}>
          <p className="p2">
            Our diverse members—Asians, Arabs, Westerners, Africans—bring local
            insights and native language skills, enabling fast, cost-effective,
            and high-quality data collection. They are socially active with
            strong professional networks, enhancing online survey reach. Each
            member’s performance is regularly evaluated, ensuring continuous
            quality and rewarding top performers for sustained excellence.
          </p>
        </ScrollFadeIn>

        {/* <ScrollFadeIn delay={0.8}>
          <button className="b2 flex items-center gap-2">
            <span className="Arrow">→</span>
            Find out more
          </button>
        </ScrollFadeIn> */}
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center">
        <ScrollFadeIn delay={1.0}>
          <Image
            src="/inspiration/solution.svg"
            alt="Our Solutions"
            width={500}
            height={400}
            className="custom-image"
            loading="lazy"
          />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
