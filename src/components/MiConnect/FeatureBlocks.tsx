'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

type Feature = {
  title: string;
  description: string;
  imgSrc: string;
  link?: string;
};

type FeatureBlocksProps = {
  features: Feature[];
};

const FeatureBlocks: React.FC<FeatureBlocksProps> = ({ features }) => {
  return (
    <section className="w-full bg-light py-16 md:py-15">
      <div className="container mx-auto px-6 md:px-12 space-y-24">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          const textAnimation = {
            initial: { opacity: 0, x: isEven ? -50 : 50 },
            whileInView: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            viewport: { once: true },
          };

          const imageAnimation = {
            initial: { opacity: 0, x: isEven ? 50 : -50 },
            whileInView: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            viewport: { once: true },
          };

          return (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              {/* Text Left / Right */}
              {isEven ? (
                <>
                  {/* Text Block */}
                  <motion.div {...textAnimation}>
                    <h2 className="h2 light mb-1">{feature.title}</h2>
                    <p className="p2 mb-1">{feature.description}</p>
                    {/* {feature.link && (
                      <Link
                        href={feature.link}
                        className="b2"
                      >
                        Book a Free Consultation →
                      </Link>
                    )} */}
                  </motion.div>

                  {/* Image Block */}
                  <motion.div className="flex justify-center" {...imageAnimation}>
                    <Image
                      src={feature.imgSrc}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="custom-image"
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Image Block */}
                  <motion.div className="flex justify-center" {...imageAnimation}>
                    <Image
                      src={feature.imgSrc}
                      alt={feature.title}
                      width={400}
                      height={300}
                      className="custom-image"
                    />
                  </motion.div>

                  {/* Text Block */}
                  <motion.div {...textAnimation}>
                     <h2 className="h2 light mb-1">{feature.title}</h2>
                    <p className="p2 mb-1">{feature.description}</p>
                    {/* {feature.link && (
                      <Link
                        href={feature.link}
                        className="b2 font-medium "
                      >
                        Book a Free Consultation →
                      </Link>
                    )} */}
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureBlocks;
