"use client";

import "animate.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { useUser } from '@/src/hooks/UserContext';
import { Avatar } from 'antd';

import AccountDropdown from '../Common/AccountDropdown';

const solutionLinks = [
  { href: '/miconnect', label: 'MiConnect' },
  { href: '/micorrelate', label: 'MiCorrelate' },
  { href: '/micompliance', label: 'MiCompliance' },
  { href: '/micollection', label: 'MiCollection' },
  { href: '/miconcept', label: 'MiConcept' },
  { href: '/micompilation', label: 'MiCompilation' },
  { href: '/miclinic', label: 'MiClinic' },
  { href: '/miclick', label: 'MiClick' },
  { href: '/miauto', label: 'MiAuto' },
  // { href: '/shop', label: 'MarketPlace' },
];

const mobileMenuContainerVariants = {
  hidden: { x: '-100%', transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } },
  visible: { x: '0%', transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } },
};

const Navbar: React.FC = () => {
  const { userEmail } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringSolutions, setIsHoveringSolutions] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarBg, setNavbarBg] = useState("");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [profilePicture, setProfilePicture] = useState<string>('');

  const pathname = usePathname();
  const isCandidateDashboard = pathname.startsWith('/candidate/');

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!userEmail || !isCandidateDashboard) return;

      try {
        const response = await fetch(`/api/user/candidateprofile?email=${encodeURIComponent(userEmail)}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }
        setProfilePicture(data.user.profilePicture || '');
        console.log('Fetched profile picture:', {
          email: userEmail,
          profilePicture: data.user.profilePicture ? 'Present' : 'Absent',
        });
      } catch (err: any) {
        console.error('Error fetching profile picture:', err.message);
      }
    };

    fetchProfilePicture();
  }, [userEmail, isCandidateDashboard]);

  useEffect(() => {
    const navbarElement = document.querySelector('nav.fixed-navbar') as HTMLElement | null;
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      setShowNavbar(!scrollingDown || currentScrollY < 50);
      setLastScrollY(currentScrollY);

      setNavbarBg(
        currentScrollY > 30 ? "bg-white/70 backdrop-blur-md" : ""
      );
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', () => {
      const currentNavbarElement = document.querySelector('nav.fixed-navbar') as HTMLElement | null;
      if (currentNavbarElement) {
        setNavbarHeight(currentNavbarElement.offsetHeight);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', () => {});
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = "relative text-lg group cursor-pointer";
  const underlineSpan = (
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
  );

  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : 'U';

  const text = "MintSurvey";
  return (
    <nav
      className={`fixed-navbar ${navbarBg} border-b bg-gray-50 border-gray-100 drop-shadow-md fixed w-full top-0 z-50 shadow-sm transition-transform duration-200 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="px-6 md:px-20 max-w-[1440px] mx-auto py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex text-blue items-center font-semibold space-x-2 h-8 text-2xl !mb-0 "
        >
          <motion.img
                src="/Logo/minsurveylogosvg.svg"
                alt="MintSurvey Logo"
                className="object-cover h-[55px] !py-0 !px-0"
                style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.1))' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              />
         </Link>

        {/* Desktop Menu and Account/Join Us/Cart Section */}
        <div className="hidden md:flex items-center gap-6 !pt-4">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsHoveringSolutions(true)}
            onMouseLeave={() => setIsHoveringSolutions(false)}
          >
            <button className="flex items-center text-base group">
              <span className="relative text-lg group-hover:text-blue group-hover:font-bold">
                Solutions
                <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
              </span>
              <ChevronDown size={16} />
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/3 top-[48px] shadow-xl transition-all duration-300 ease-in-out z-40 ${
                isHoveringSolutions ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="w-[900px] px-4 pt-12 grid grid-cols-2 gap-x-10 gap-y-2 border-t bg-white border-gray-200">
                {solutionLinks.map(({ href, label }) => (
                  <Link
                    href={href}
                    key={label}
                    className="text-base hover:text-blue hover:font-bold hover:underline cursor-pointer transition"
                  >
                    <span className="relative group-hover:text-blue group-hover:font-bold">
                      {label}
                      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
                <div>
                  <Link
                    href="/solution"
                    className="text-blue font-semibold hover:underline cursor-pointer"
                  >
                    All Solutions →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other Links */}
          {[
            { href: "/about", label: "About" },
            { href: "/brandgrowth", label: "Brand Growth" },
            { href: "/inspiration", label: "Inspiration" },
            { href: "/contact", label: "Contact" },
            { href: "/requestquote", label: "Request Quote" },
          ].map(({ href, label }) => (
            <Link href={href} key={label} className={navLinkClass}>
              <span className="relative group-hover:text-blue group-hover:font-bold">
                {label}
                {underlineSpan}
              </span>
            </Link>
          ))}

          {/* Profile Picture Avatar for Desktop */}
          

          {/* Conditional Rendering for AccountDropdown / Join Us */}
          {isCandidateDashboard ? (
            <AccountDropdown profilePicture={profilePicture} />
          ) : (
            <Link
              href="/login"
              className="b1 animate__animated animate__bounce animate__repeat-2"
            >
              Join Us
            </Link>
          )}

          {/* Cart Icon */}
          {/* <Link href="/checkout" className="hover:text-blue transition-colors">
            <ShoppingCart size={24} className="h-6 w-6 md:h-7 md:w-7" />
          </Link> */}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu button and Join Us/Cart */}
        <div className="md:hidden flex items-center gap-2">
          {/* Profile Picture Avatar for Mobile (before Join Us) */}
          {isCandidateDashboard && userEmail && (
            <Avatar
              src={profilePicture || undefined}
              icon={!profilePicture ? <User /> : undefined}
              size={32}
              className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            >
              {!profilePicture && initials}
            </Avatar>
          )}
          <Link
            href="/login"
            className="b1 text-sm py-2 border border-blue text-blue rounded hover:bg-light hover:blue-default transition"
            onClick={handleNavLinkClick}
          >
            Join Us
          </Link>
          {/* <Link href="/checkout" className="hover:text-blue transition-colors">
            <ShoppingCart size={24} className="h-6 w-6 md:h-7 md:w-7" />
          </Link> */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=""
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Container with Slide-in Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuContainerVariants}
            className="fixed left-0 w-full z-40 md:hidden shadow-lg flex flex-col bg-gradient-to-br bg-light"
            style={{ top: navbarHeight, height: `calc(100vh - ${navbarHeight}px)` }}
          >
            {/* Profile Picture and AccountDropdown for Mobile */}
            {isCandidateDashboard && userEmail && (
              <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
                <Avatar
                  src={profilePicture || undefined}
                  icon={!profilePicture ? <User /> : undefined}
                  size={40}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm"
                >
                  {!profilePicture && initials}
                </Avatar>
                <AccountDropdown profilePicture={profilePicture} />
              </div>
            )}
            <div className="flex justify-end p-4 pb-0">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-blue-lightest"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-6 flex-1 flex flex-col pt-0">
              <details className="text-xl font-semibold mb-4">
                <summary className="cursor-pointer py-2">Solutions</summary>
                <div className="ml-4 mt-2 space-y-3 border-l border-white/50 pl-4">
                  {solutionLinks.map(({ href, label }) => (
                    <Link
                      href={href}
                      key={label}
                      className="block text-lg hover:text-blue-lightest hover:font-bold py-1"
                      onClick={handleNavLinkClick}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/solution"
                    className="text-blue-lightest font-semibold hover:underline cursor-pointer mt-3 block text-lg py-1"
                    onClick={handleNavLinkClick}
                  >
                    All Solutions →
                  </Link>
                </div>
              </details>

              {[
                { href: "/about", label: "About" },
                { href: "/brandgrowth", label: "Brand Growth" },
                { href: "/inspiration", label: "Inspiration" },
                { href: "/contact", label: "Contact" },
                { href: "/requestquote", label: "Request Quote" },
              ].map(({ href, label }) => (
                <Link
                  href={href}
                  key={label}
                  className="block text-xl font-semibold hover:text-blue-lightest hover:font-bold py-2"
                  onClick={handleNavLinkClick}
                >
                  {label}
                </Link>
              ))}

              <div className="mt-auto pt-8 text-center text-sm opacity-80">
                <p>© 2025 MintSurvey</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;