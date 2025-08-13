'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Newspaper, FolderKanban, X, Menu } from 'lucide-react'; // Using Lucide-React for icons

const isAdmin = true;
const isAuthenticated = true;

// Define specific motion variants for the sidebar for a more controlled animation
const sidebarAnimationVariants = {
  hidden: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 200, damping: 30, duration: 0.3 } },
  visible: { x: '0%', opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 30, duration: 0.3 } },
};

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

// Define the height of your fixed Navbar here
const NAVBAR_HEIGHT = '48px'; // Changed to 68px as requested

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isLargeScreen]);

  return (
    <div className="flex  mt-[30px] bg-gray-100 relative"> {/* Main container doesn't need mt here */}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && !isLargeScreen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-40" // Z-index 40 for overlay
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          flex-none w-64 p-4 transition-transform duration-300 ease-in-out
          bg-white border-r border-gray-200
          ${isLargeScreen
            ? `relative translate-x-0 min-h-screen pt-[${NAVBAR_HEIGHT}]` // Desktop: relative, starts below navbar
            : `fixed top-[${NAVBAR_HEIGHT}] left-0 h-[calc(100vh-${NAVBAR_HEIGHT})] -translate-x-full z-[45]` // Mobile: fixed, starts below navbar, z-index 45
          }
          ${isSidebarOpen ? 'translate-x-0' : ''}
          overflow-y-auto
        `}
        initial={isLargeScreen ? "visible" : "hidden"}
        animate={isLargeScreen || isSidebarOpen ? "visible" : "hidden"}
        exit="hidden"
        variants={sidebarAnimationVariants}
      >
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h1 className="pl-10 font-bold light h3 mt-5">Admin Panel</h1>
          {!isLargeScreen && (
            <button className="text-gray-500 hover:text-gray-700 p-1" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          )}
        </div>
        <nav className="space-y-2">
          <LinkItem href="/admin" label="Dashboard" icon={LayoutDashboard} pathname={pathname} setIsSidebarOpen={setIsSidebarOpen} isLargeScreen={isLargeScreen} />
           <LinkItem href="/admin/client" label="Clients" icon={FolderKanban} pathname={pathname} setIsSidebarOpen={setIsSidebarOpen} isLargeScreen={isLargeScreen} />
          {/* Add more links here */}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-4 sm:p-6 md:p-8 relative mt-[${NAVBAR_HEIGHT}] z-10`}> {/* mt-[68px] here for main content */}
        {/* Mobile Header with Hamburger Icon - This will appear below the Navbar */}
        <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center lg:hidden">
          <button className="text-gray-600 hover:text-gray-800 mr-4" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        </header>

        {children}
      </main>
    </div>
  );
}

interface LinkItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  pathname: string;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLargeScreen: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon: Icon, pathname, setIsSidebarOpen, isLargeScreen }) => {
  const isActive = pathname === href;
  const activeClasses = 'bg-blue text-white font-semibold shadow-sm';
  const inactiveClasses = 'text-gray-700 hover:bg-blue-50 hover:text-blue';

  return (
    <div className="mb-2">
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        onClick={() => !isLargeScreen && setIsSidebarOpen(false)}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center w-full">
          <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
          <span className="text-base">{label}</span>
        </motion.div>
      </Link>
    </div>
  );
};