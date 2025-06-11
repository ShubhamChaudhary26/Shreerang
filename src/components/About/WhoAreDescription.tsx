"use client";

import Image from "next/image";
import aboutImage from "../../../public/about/whoweare.svg";
import { motion } from "framer-motion";
import ScrollFadeIn from "../../hooks/ScrollFadeIn";

export default function WhoWeAreDescription() {
  return (
    <ScrollFadeIn delay={0.2}>
      <section className="py-8 md:py-12 mt-4 md:mt-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden shadow-md rounded-md h-[250px] sm:h-[350px] md:h-[60vh] lg:h-[60vh] w-full" // Responsive height for image container
          >
            <div className="flex items-center justify-center h-full">
              <Image
                src={aboutImage}
                alt="MintSurvey Office"
                className="custom-image"
                priority
              />
            </div>
          </motion.div>

          {/* Text Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4 py-4 md:py-0"
          >
            <h2 className="h2 text-center md:text-left">Who We Are</h2>
            <p className="p2 text-center md:text-left">
              Mint Survey is a full-service, independent market research and
              analytics agency offering end-to-end solutions—from research
              design and data collection to advanced analytics and strategic
              insights.
            </p>
            <p className="p2 text-center md:text-left">
              We are your one-stop research partner, powered by our proprietary
              field force platform MIGFT, a trusted network of 25,000+ field
              experts across Africa, the Middle East, the Indian subcontinent,
              and Southeast Asia, ensuring deep reach and high-quality data—even
              from rural and hard-to-reach segments.
            </p>
            <p className="p2 text-center md:text-left">
              We do not outsource. Every step of your project—data collection,
              technology, <br /> analysis—is handled in-house, keeping your data
              secure, confidential, and compliant.
            </p>
            <p className="p2 text-center md:text-left">
              We blend human intelligence with smart tools, delivering insights
              that are not only accurate, but also actionable. Whether you’re
              testing concepts, tracking performance, or decoding consumer
              behavior—Mint Survey brings clarity, confidence, and speed to your
              decisions.
            </p>
          </motion.div>
        </div>
      </section>
    </ScrollFadeIn>
  );
}
