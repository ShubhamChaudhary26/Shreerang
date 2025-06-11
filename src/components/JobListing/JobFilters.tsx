// components/jobs/JobFilters.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper component for collapsible filter sections
const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true); // Default open for desktop

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b  py-4"
    >
      <button
        className="flex justify-between items-center w-full pb-3 text-gray-800 font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Toggle Switch Component (Custom, as Tailwind doesn't have a built-in one)
// You might need to add specific CSS for .toggle-switch in your globals.css
const ToggleSwitch: React.FC<{ label: string; id: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, id, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          // Custom classes for the track and thumb
          // You might need to add this to your globals.css to ensure it styles correctly
          // Example for globals.css:
          // .toggle-checkbox {
          //   right: 0;
          //   transition: right 0.2s ease-in-out, background-color 0.2s ease-in-out;
          // }
          // .toggle-checkbox:checked {
          //   right: 1.25rem; // Moves the thumb to the right when checked
          // }
          // .toggle-label {
          //   background-color: theme('colors.gray.300'); // Track color when unchecked
          //   width: 2.5rem; // 10 units in Tailwind
          //   height: 1.25rem; // 5 units in Tailwind
          //   border-radius: 9999px; // full rounded
          // }
          // .toggle-checkbox:checked + .toggle-label {
          //   background-color: theme('colors.blue-default'); // Track color when checked
          // }
        />
        <label htmlFor={id} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
      </div>
    </div>
  );
};


const JobFilters: React.FC = () => {
  const [radius, setRadius] = useState(100);

  // State for Qualification toggles
  const [qualifications, setQualifications] = useState({
    certificate: false,
    associateDegree: false,
    bachelorDegree: false,
    masterDegree: false,
    doctorateDegree: false,
  });

  const handleQualificationChange = (key: keyof typeof qualifications, checked: boolean) => {
    setQualifications((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sticky top-4">
      <h4 className="h3 mb-4">Filters</h4>

      {/* Qualification Section - NEWLY ADDED */}
      <FilterSection title="Qualification">
        <ToggleSwitch
          label="Certificate"
          id="certificate"
          checked={qualifications.certificate}
          onChange={(c) => handleQualificationChange('certificate', c)}
        />
        <ToggleSwitch
          label="Associate Degree"
          id="associateDegree"
          checked={qualifications.associateDegree}
          onChange={(c) => handleQualificationChange('associateDegree', c)}
        />
        <ToggleSwitch
          label="Bachelor Degree"
          id="bachelorDegree"
          checked={qualifications.bachelorDegree}
          onChange={(c) => handleQualificationChange('bachelorDegree', c)}
        />
        <ToggleSwitch
          label="Master's Degree"
          id="masterDegree"
          checked={qualifications.masterDegree}
          onChange={(c) => handleQualificationChange('masterDegree', c)}
        />
        <ToggleSwitch
          label="Doctorate Degree"
          id="doctorateDegree"
          checked={qualifications.doctorateDegree}
          onChange={(c) => handleQualificationChange('doctorateDegree', c)}
        />
      </FilterSection>

      {/* Search by Keywords */}
      <FilterSection title="Search by Keywords">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="w-full p-2 border  rounded-md focus:ring-blue-default focus:border-blue-default outline-none text-gray-700"
        />
      </FilterSection>

      {/* Location */}
      <FilterSection title="Location">
        <input
          type="text"
          placeholder="City or postcode"
          className="w-full p-2 border  rounded-md focus:ring-blue-default focus:border-blue-default outline-none text-gray-700"
        />
        <div className="mt-4">
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
            Radius around selected destination
          </label>
          <input
            type="range"
            id="radius"
            min="0"
            max="200"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-default"
          />
          <span className="block text-right text-xs text-gray-500 mt-1">{radius}km</span>
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <select className="w-full p-2 border  rounded-md focus:ring-blue-default focus:border-blue-default outline-none text-gray-700">
          <option>Choose a category</option>
          <option>App</option>
          <option>Design</option>
          <option>Digital</option>
          <option>Marketing</option>
          <option>Development</option>
        </select>
      </FilterSection>

      {/* Candidate Gender */}
      <FilterSection title="Candidate Gender">
        <select className="w-full p-2 border  rounded-md focus:ring-blue-default focus:border-blue-default outline-none text-gray-700">
          <option>Male</option>
          <option>Female</option>
          <option>Any</option>
        </select>
      </FilterSection>

      {/* Date Posted */}
      <FilterSection title="Date Posted">
        <div className="space-y-2">
          {['All', 'Last Hour', 'Last 24 Hour', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'].map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="radio"
                id={`date-${option.replace(/\s/g, '-')}`}
                name="datePosted"
                className="h-4 w-4 text-blue-default  focus:ring-blue-default"
              />
              <label htmlFor={`date-${option.replace(/\s/g, '-')}`} className="ml-2 text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Experience */}
      <FilterSection title="Experience">
        <div className="space-y-2">
          {['Fresh', '1 Year', '2 Year', '3 Year', '4 Year', '5 Year', '6 Year', '7 Year', '8 Year', '9 Year', '10+ Year'].map((option) => (
            <div key={option} className="flex items-center">
              <input
                type="radio"
                id={`exp-${option.replace(/\s/g, '-')}`}
                name="experience"
                className="h-4 w-4 text-blue-default  focus:ring-blue-default"
              />
              <label htmlFor={`exp-${option.replace(/\s/g, '-')}`} className="ml-2 text-sm text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

export default JobFilters;