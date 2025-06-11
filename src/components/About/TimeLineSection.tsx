'use client';

import ScrollFadeIn from '../../hooks/ScrollFadeIn';
import TimelineCard from './TimeLineCard';
import { motion } from 'framer-motion';

export default function TimelineSection() {
  return (
    <ScrollFadeIn delay={0.2}>

    <motion.div
      className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 px-4 md:px-8 lg:px-20 py-10 bg-light"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      {[
        {
          year: '2017',
          description:
            'Started in the UAE to cater MENA region client',
        },
        {
          year: '2019',
          description:
            'First India office in Gandhinagar to cover India and the subcontinent.',
        },
        {
          year: '2025',
          description:
            'Second office in Bengaluru to strengthen India presence.',
        },
      ].map((item, i) => (
        <motion.div
          key={item.year}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          className="w-full sm:w-[300px] md:w-[260px] lg:w-[280px]"
        >
          <TimelineCard year={item.year} description={item.description} />
        </motion.div>
      ))}
    </motion.div>
    </ScrollFadeIn>
  );
}
