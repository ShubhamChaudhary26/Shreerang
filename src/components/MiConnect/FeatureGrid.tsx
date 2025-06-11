'use client';

import { motion } from 'framer-motion';

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  heading: string;
  features: FeatureItem[];
}

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const FeatureGrid = ({ heading, features }: FeatureGridProps) => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="h2 mb-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {heading}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="flex flex-col items-start text-left max-w-xs space-y-3"
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20 object-contain"
            />
            <h3 className="h3">{feature.title}</h3>
            <p className="p2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
