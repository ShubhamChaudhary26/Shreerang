'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { MdFeedback, MdPreview } from 'react-icons/md';
import { Earth, Group, ProjectorIcon } from 'lucide-react';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

const stats = [
  {
    icon: <Earth size={50} />,
    number: 40,
    suffix: '+',
    label: 'Countries',
  },
  {
    icon: <ProjectorIcon size={50} />,
    number: 200,
    suffix: '+',
    label: 'Projects',
  },
  {
    icon: <MdPreview size={50} />,
    number: 25000,
    suffix: '+',
    label: 'Interviewers',
  },
  {
    icon: <MdFeedback size={50} />,
    number: 100000,
    suffix: '+',
    label: 'Feedback',
  },
];

type StatCardProps = {
  icon: ReactNode;
  number: number;
  suffix?: string;
  label: string;
  delay: number;
};

const StatCard = ({ icon, number, suffix = '', label, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay / 1000 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center px-4 py-6 sm:py-8 bg-light rounded-md shadow transition transform hover:scale-105 hover:shadow-xl"
  >
    <div className="p-4 rounded-full mb-3">{icon}</div>
    <h3 className="h2 light text-2xl font-bold">
      <CountUp end={number} duration={2} separator="," suffix={suffix} />
    </h3>
    <p className="h3 light">{label}</p>
  </motion.div>
);

export default function WhoWeAreSection() {
  return (
    <ScrollFadeIn delay={0.2}>
      <div className="px-full md:px-full w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
         
        </motion.div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              icon={item.icon}
              number={item.number}
              suffix={item.suffix}
              label={item.label}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </ScrollFadeIn>
  );
}
