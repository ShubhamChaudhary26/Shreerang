// components/jobs/JobCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface JobCardProps {
  initials: string;
  title: string;
  role: string;
  location: string;
  rate: string;
  tags: string[];
  animationDelay?: number;
}

const JobCard: React.FC<JobCardProps> = ({
  initials,
  title,
  role,
  location,
  rate,
  tags,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className=" rounded-lg p-4 sm:p-6 flex items-center shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Initials / Profile Image - Using generic Tailwind gray for background, as it's not a primary UI color. */}
      {/* If you have a global class for this, replace bg-gray-200 text-gray-700 with it. */}
      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20  rounded-full flex items-center justify-center  font-bold text-base sm:text-lg mr-4 sm:mr-6">
        {initials}
      </div>

      {/* Job Details */}
      <div className="flex-1 min-w-0">
        {/* Using h3. Assuming it handles font-size, font-weight, text-color. */}
        <h3 className="h3 truncate">{title}</h3>
        {/* Using p2. Assuming it handles font-size, text-color. Using text-blue-default for role. */}
        <p className="p2 text-blue-default mb-1">{role}</p>
        {/* Generic text for location/rate, adjust classes if you have global p3 etc. */}
        <p className="text-sm  mb-2 truncate">
          <span className="inline-block mr-1">📍</span> {location}
          <span className="inline-block mx-2">|</span> ${rate} / hour
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs  text-gray-700 px-2 py-1 rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* View Profile Button - Using your b1 class */}
      <div className="flex-shrink-0 ml-4 sm:ml-6">
        <button className="b1 px-4 py-2 text-sm sm:text-base">View Profile</button>
      </div>
    </motion.div>
  );
};

export default JobCard;