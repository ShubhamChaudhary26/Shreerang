'use client';

import React from 'react';
import { motion } from 'framer-motion';

type SidebarProps = {
  selected: string;
  setSelected: (section: string) => void;
};

const sections = [
  { name: 'Customer Survey', icon: '📋' },
  { name: 'Product Concept Test', icon: '🧪' },
  { name: 'Brand Tracking Study', icon: '🔍' },
  { name: 'Market Analysis', icon: '📈' },
  { name: 'Client Kickoff', icon: '🚀' },
];

const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-1/4 bg-white shadow-lg p-6 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Survey Sections</h2>
      <nav className="space-y-2">
        {sections.map(({ name, icon }) => (
          <motion.div
            key={name}
            whileHover={{ x: 5 }}
            onClick={() => setSelected(name)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
              ${selected === name ? 'bg-dark text-white font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <span className="mr-3 text-lg">{icon}</span>
            <span>{name}</span>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
