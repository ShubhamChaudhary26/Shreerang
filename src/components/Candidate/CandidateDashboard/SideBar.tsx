'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Dummy data for sidebar links (matching Themeforest structure)
const sidebarLinks = [
  { id: 1, name: 'Dashboard', href: '/candidate/candidatedashboard', icon: '🏠' },
  { id: 2, name: 'My Profile', href: '/candidate/candidatedetails', icon: '👤' },
  { id: 3, name: 'All Projects', href: '/candidate/allprojects', icon: '💼' },
  { id: 7, name: 'Edit profile', href: '/candidate/candidateprofileedit', icon: '📄' },
  // { id: 4, name: 'Job Alerts', href: '', icon: '🔔' },
  // { id: 5, name: 'Messages', href: '', icon: '✉️' },  
  // { id: 6, name: 'Shortlisted Jobs', href: '', icon: '⭐' },
  { id: 9, name: 'Logout', href: '#', icon: '➡️' },
  { id: 10, name: 'Delete Profile', href: '#', icon: '🗑️' }, 
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout clicked, cookies before clearing:', document.cookie);
    try {
      document.cookie = 'session=; Max-Age=0; path=/;';
      console.log('Cookies after clearing:', document.cookie);
      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      alert('Failed to log out: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your profile? This cannot be undone.')) return;
    console.log('Delete Profile clicked');
    try {
      const response = await fetch('/api/user/candidateprofile', {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete profile');
      }
      alert('Profile deleted successfully');
      console.log('Profile deleted successfully');
      document.cookie = 'session=; Max-Age=0; path=/;';
      router.push('/login');
    } catch (error: any) {
      console.error('Delete error:', error);
      alert('Failed to delete profile: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-80 bg-white p-6 hidden lg:block"
    >
      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <div key={link.id}>
            {link.name === 'Logout' ? (
              <motion.a
                whileHover={{ x: 5 }}
                onClick={handleLogout}
                className={`flex items-center ml-8 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                  ${pathname === link.href ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
              >
                <span className="mr-3 text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </motion.a>
            ) : link.name === 'Delete Profile' ? (
              <motion.a
                whileHover={{ x: 5 }}
                onClick={handleDelete}
                className={`flex items-center ml-8 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                  ${pathname === link.href ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
              >
                <span className="mr-3 text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </motion.a>
            ) : (
              <Link key={link.id} href={link.href} passHref legacyBehavior>
                <motion.a
                  whileHover={{ x: 5 }}
                  className={`flex items-center ml-8 p-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                    ${pathname === link.href ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                >
                  <span className="mr-3 text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </motion.a>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;