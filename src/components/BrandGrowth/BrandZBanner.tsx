'use client';

import { motion } from 'framer-motion';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

interface BrandZBannerProps {
  imageUrl: string;
  heading: string;
  description: string;
  // buttonText: string;
}

export default function BrandZBanner({
  imageUrl,
  heading,
  description,
  // buttonText,
}: BrandZBannerProps) {
  return (
    <ScrollFadeIn delay={0.2}>
      <motion.div
        className="flex flex-col lg:flex-row w-full min-h-[400px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
  className="relative lg:w-1/2 w-full h-56 lg:h-auto overflow-hidden group lg:mb-0"
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1, duration: 0.6 }}
>
  <div className="absolute left-0 top-0 h-full z-10 bg-gray-50" />
  <img
    src={imageUrl}
    alt="Visual"
    className="custom-image mt-12 pt-6"
    loading="lazy"
  />
</motion.div>

        <motion.div
          className="lg:w-1/2 w-full flex flex-col justify-center px-6 pt-0 md:px-10"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2
            className="h2 !mb-2"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="p2">{description}</p>
          {/* <button className="b1 mt-6 px-6 py-2 w-fit">{buttonText}</button> */}
        </motion.div>
      </motion.div>
    </ScrollFadeIn>
  );
}