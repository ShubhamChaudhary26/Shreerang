'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Menu, X } from 'lucide-react';

const MINI_WIDTH = 84;
const FULL_WIDTH = 256;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isLargeScreen ? (isHovered ? FULL_WIDTH : MINI_WIDTH) : FULL_WIDTH;

  return (
    <div className="flex min-h-screen bg-gray-100 mt-[49px]">

      {/* Desktop Sidebar */}
      {isLargeScreen && (
        <motion.aside
          className="bg-white border-r border-gray-200 overflow-y-auto relative min-h-screen pt-4"
          animate={{ width: sidebarWidth }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
          <div className="flex items-center justify-center mb-6 p-3 border-b border-gray-200">
            {isHovered ? (
              <h1 className="font-bold text-lg">Admin Panel</h1>
            ) : (
              <h1 className="font-bold text-lg">AP</h1>
            )}
          </div>

          <nav className="space-y-2 px-2">
            <SidebarLink href="/admin" label="Dashboard" icon={LayoutDashboard} pathname={pathname} isHovered={isHovered} />
            <SidebarLink href="/admin/client" label="Clients" icon={FolderKanban} pathname={pathname} isHovered={isHovered} />
          </nav>
        </motion.aside>
      )}

      {/* Mobile Top Bar */}
      {!isLargeScreen && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md px-4 py-3 flex items-center justify-between z-50">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {!isLargeScreen && isMobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-md flex flex-col mt-[60px] w-full z-40 fixed top-0 left-0"
          >
            <MobileLink href="/admin" label="Dashboard" pathname={pathname} closeMenu={() => setIsMobileMenuOpen(false)} icon={LayoutDashboard} />
            <MobileLink href="/admin/client" label="Clients" pathname={pathname} closeMenu={() => setIsMobileMenuOpen(false)} icon={FolderKanban} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 p-4 sm:p-6 md:p-8 ${!isLargeScreen ? 'mt-[56px]' : ''}`}>
        {children}
      </main>
    </div>
  );
}

// Desktop Sidebar Link
interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  pathname: string;
  isHovered: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, label, icon: Icon, pathname, isHovered }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
        isActive ? 'bg-blue-500 text-white font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'
      }`}
    >
      <Icon size={20} className="mr-3" />
      {isHovered && <span>{label}</span>}
    </Link>
  );
};

// Mobile Link
interface MobileLinkProps {
  href: string;
  label: string;
  pathname: string;
  closeMenu: () => void;
  icon: React.ElementType;
}

const MobileLink: React.FC<MobileLinkProps> = ({ href, label, pathname, closeMenu, icon: Icon }) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className={`flex items-center p-3 transition-all ${isActive ? 'bg-blue-500 text-white font-semibold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'}`}
    >
      <Icon size={20} className="mr-3" />
      {label}
    </Link>
  );
};
