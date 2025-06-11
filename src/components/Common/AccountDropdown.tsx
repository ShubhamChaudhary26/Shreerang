'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaRegFileAlt, FaBriefcase, FaRegEnvelope, FaRegBookmark, FaLock, FaSignOutAlt, FaTrashAlt, FaChevronDown } from 'react-icons/fa';
import { useUser } from '@/src/hooks/UserContext';

interface AccountDropdownProps {
  profilePicture: string;
}

const dropdownLinks = [
  { id: 'dashboard', name: 'Dashboard', href: '/candidate/candidatedashboard', icon: FaUser },
  { id: 'my-profile', name: 'My Profile', href: '/candidate/candidatedetails', icon: FaRegFileAlt },
  { id: 'edit', name: 'Edit Profile', href: '/candidate/candidateprofileedit', icon: FaRegEnvelope },
  
  // { id: 'my-resume', name: 'My Resume', href: '', icon: FaBriefcase },
  // { id: 'applied-jobs', name: 'Applied Jobs', href: '', icon: FaBriefcase },
  // { id: 'job-alerts', name: 'Job Alerts', href: '', icon: FaRegEnvelope },
  // { id: 'shortlisted-jobs', name: 'Shortlisted Jobs', href: '', icon: FaRegBookmark },
  // { id: 'cv-manager', name: 'CV Manager', href: '', icon: FaRegFileAlt },
  // { id: 'messages', name: 'Messages', href: '', icon: FaRegEnvelope },
  // { id: 'change-password', name: 'Change Password', href: '', icon: FaLock },
];

const AccountDropdown: React.FC<AccountDropdownProps> = ({ profilePicture }) => {
  const { userEmail } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15 } },
  };

  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-700 rounded-md py-2 px-3 transition-colors duration-200"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm flex items-center justify-center bg-gray-100">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-lg font-medium">{initials}</span>
          )}
        </div>
        <span className="p3">My Account</span>
        <FaChevronDown className={`ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50 origin-top-right"
          >
            {dropdownLinks.map((link) => (
              <Link key={link.id} href={link.href} passHref legacyBehavior>
                <motion.a
                  whileHover={{ backgroundColor: '#f3f4f6', color: '#2563eb' }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-gray-700 text-base hover:bg-gray-100 hover:text-blue-light transition-colors duration-150"
                >
                  <link.icon className="mr-3" size={18} />
                  <span>{link.name}</span>
                </motion.a>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;