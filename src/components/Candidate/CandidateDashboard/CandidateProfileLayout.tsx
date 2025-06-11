// components/CandidateProfile/CandidateProfileLayout.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './SideBar'; // Updated import path
import ProfileContent from './ProfileContent'; // Updated import path

const CandidateProfileLayout: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // Adjusted margin top to accommodate your header.
      className="flex flex-col lg:flex-row min-h-screen bg-gray-100 pt-[90px] pb-10 lg:pb-0" // Standard Tailwind classes
    >
      {/* Sidebar Section - Padded from top for header */}
      <div className="lg:pt-0 pt-4 bg-white  px-0">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-1   px-0 pt-4 lg:pt-0">
        <ProfileContent />
      </div>
    </motion.div>
  );
};

export default CandidateProfileLayout;