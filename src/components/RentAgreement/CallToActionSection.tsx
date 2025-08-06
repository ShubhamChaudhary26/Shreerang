'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CallToActionSectionProps {
  title: string;
  subtitle: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  imageSrc: string;
}

export const CallToActionSection = ({
  title,
  subtitle,
  primaryBtnText,
  primaryBtnLink,
  imageSrc,
}: CallToActionSectionProps) => {
  return (
    <section className="bg-light rounded-2xl my-5 mb-20 px-4 ">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="h2 px-2 ">{title}</h2>
          <p className="p2 mb-2">{subtitle}</p>
          <div className="flex gap-4">
            <a
              href={primaryBtnLink}
              className="b1 dark "
            >
              {primaryBtnText}
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <Image
            src={imageSrc}
            alt="Banner Illustration"
            width={420}
            height={100}
            className="custom-image"
          />
        </motion.div>
      </div>
    </section>
  );
};
