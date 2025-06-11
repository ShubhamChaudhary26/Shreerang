// components/jobs/JobListings.tsx
'use client';

import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { motion } from 'framer-motion';

// Dummy Data (replace with actual data fetching later)
const DUMMY_JOBS = [
  { initials: 'DR', title: 'Darlene Robertson', role: 'UI Designer', location: 'London, UK', rate: '99', tags: ['App', 'Design', 'Digital'] },
  { initials: 'LA', title: 'Leslie Alexander', role: 'Marketing Expert', location: 'London, UK', rate: '99', tags: ['App', 'Design', 'Digital'] },
  { initials: 'FM', title: 'Floyd Miles', role: 'Charted Accountant', location: 'London, UK', rate: '88', tags: ['App', 'Design', 'Digital'] },
  { initials: 'DR', title: 'Darlene Robertson', role: 'UI Designer', location: 'London, UK', rate: '77', tags: ['App', 'Design', 'Digital'] },
  { initials: 'WW', title: 'Wade Warren', role: 'Developer', location: 'London, UK', rate: '66', tags: ['App', 'Design', 'Digital'] },
  { initials: 'LA', title: 'Leslie Alexander', role: 'UX Designer', location: 'New York, USA', rate: '105', tags: ['Web', 'Design', 'Product'] },
  { initials: 'FM', title: 'Floyd Miles', role: 'Financial Analyst', location: 'Dublin, Ireland', rate: '92', tags: ['Finance', 'Analytics'] },
  { initials: 'DR', title: 'Darlene Robertson', role: 'Frontend Dev', location: 'Berlin, Germany', rate: '85', tags: ['Web', 'Development'] },
  { initials: 'WW', title: 'Wade Warren', role: 'Data Scientist', location: 'Sydney, Australia', rate: '110', tags: ['Data', 'AI'] },
];

const JobListings: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const jobsPerPage = 5; 
  const [visibleJobsCount, setVisibleJobsCount] = useState(jobsPerPage);

  const totalJobs = DUMMY_JOBS.length; 
  const showingJobs = Math.min(visibleJobsCount, totalJobs);
  const progressPercentage = (showingJobs / totalJobs) * 100;


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShowMore = () => {
    setVisibleJobsCount(prevCount => prevCount + jobsPerPage);
  };

  return (
    <section className="w-full py-8 sm:py-10 lg:py-12 mt-20 min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="md:hidden col-span-1 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="b1 w-full py-2 flex items-center justify-center"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
              <span className="ml-2">{showFilters ? '▲' : '▼'}</span>
            </button>
          </div>
          <motion.div
            initial={false}
            animate={{
              height: isMobile && !showFilters ? 0 : 'auto',
              opacity: isMobile && !showFilters ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`md:col-span-1 flex-shrink-0 min-w-0 z-10 overflow-hidden ${isMobile ? (showFilters ? 'block' : 'hidden') : 'block'}`}
          >
            <JobFilters />
          </motion.div>
          <div className="md:col-span-2 min-w-0">
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="p2 font-semibold mb-3 sm:mb-0">
               
                {showingJobs} jobs
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative">
                  <select className="p-2 border  rounded-md pr-8 focus:ring-blue-default focus:border-blue-default outline-none text-gray-700">
                    <option>Sort by (default)</option>
                    <option>Sort by (newest)</option>
                    <option>Sort by (oldest)</option>
                  </select>
                  {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">▼</span> */}
                </div>
                <div className="relative">
                  <select className="p-2 border  rounded-md pr-8 focus:ring-blue-default focus:border-blue-default outline-none text-gray-700">
                    <option>All</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                  {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">▼</span> */}
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 gap-4">
              {DUMMY_JOBS.slice(0, visibleJobsCount).map((job, index) => ( 
                <JobCard key={index} {...job} animationDelay={index * 0.1} />
              ))}
            </div>

            {showingJobs < totalJobs && ( 
              <div className="flex flex-col items-center mt-8">
              
                <p className="p2  font-semibold mb-4">
                  Showing {showingJobs} of {totalJobs} Jobs
                </p>

                <div className="w-full max-w-sm h-2  rounded-full mb-6">
                  <div
                    className="h-2 bg-blue-default rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <button
                  onClick={handleShowMore}
                  className="b1 text-blue-default px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out hover:underline"
           
                  style={{ backgroundColor: 'transparent', color: 'inherit' }} 
                >
                  Show More
                  <span className="block h-0.5 bg-blue-default w-0 group-hover:w-full transition-all duration-300 mt-0.5"></span>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;