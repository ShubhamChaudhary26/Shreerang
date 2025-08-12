"use client";

import "animate.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useUser } from "@/src/hooks/UserContext";
import { Avatar } from "antd";

import AccountDropdown from "../Common/AccountDropdown";

const solutionLinks = [
  { href: "/rentagrement", label: "Rent Agrement Registration" },
  { href: "/micorrelate", label: "MiCorrelate" },
  { href: "/micompliance", label: "MiCompliance" },
];

const mobileMenuContainerVariants = {
  hidden: {
    x: "-100%",
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
  },
  visible: {
    x: "0%",
    transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
  },
};

const Navbar: React.FC = () => {
  const { userEmail } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarBg, setNavbarBg] = useState("");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [profilePicture, setProfilePicture] = useState<string>("");

  const pathname = usePathname();
  const isCandidateDashboard = pathname.startsWith("/candidate/");

  useEffect(() => {
    const navbarElement = document.querySelector(
      "nav.fixed-navbar"
    ) as HTMLElement | null;
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      setShowNavbar(!scrollingDown || currentScrollY < 50);
      setLastScrollY(currentScrollY);

      setNavbarBg(currentScrollY > 30 ? "bg-white/70 backdrop-blur-md" : "");
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      const currentNavbarElement = document.querySelector(
        "nav.fixed-navbar"
      ) as HTMLElement | null;
      if (currentNavbarElement) {
        setNavbarHeight(currentNavbarElement.offsetHeight);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {});
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = "relative text-lg group cursor-pointer";
  const underlineSpan = (
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue transition-all duration-300 group-hover:w-full"></span>
  );

  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <nav
      className={`fixed-navbar ${navbarBg} border-b bg-gray-50 border-gray-100 drop-shadow-md fixed w-full top-0 z-50 shadow-sm transition-transform duration-200 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="px-6 md:px-20 max-w-[1440px] mx-auto flex items-center justify-between"
        style={{ height: "90px" }}
      >
        {/* Logo and Text */}
      <Link href="/" className="flex items-center relative group">
  <motion.span
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="font-extrabold tracking-widest
      bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900
      bg-clip-text text-transparent drop-shadow-lg animate-textShimmer"
  >
    <img
  src="/L.png"
  alt="Logo"
  className="h-[120px] mt-5 w-[150px]"
/>

  </motion.span>
</Link>



        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 !pt-4">
          {[  
            { href: "/home", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/rentagrement", label: "Registration Agrement" },
          ].map(({ href, label }) => (
            <Link href={href} key={label} className={navLinkClass}>
              <span className="relative group-hover:text-blue group-hover:font-bold">
                {label}
                {underlineSpan}
              </span>
            </Link>
          ))}

          {isCandidateDashboard ? (
            <AccountDropdown profilePicture={profilePicture} />
          ) : (
            <Link href="/login" className="b1 border-4 animate-borderColorCycle">
              Join Us
            </Link>
          )}
        </div>

        {/* Mobile menu button and Join Us */}
        <div className="md:hidden flex gap-2 items-center">
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
            className="b1 text-sm mt-5 border border-blue text-blue rounded hover:bg-light hover:blue-default transition"
            onClick={handleNavLinkClick}
          >
            Join Us
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X size={24} className="mt-5" />
            ) : (
              <Menu size={24} className="mt-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuContainerVariants}
            className="fixed left-0 w-[80%] z-40 md:hidden shadow-lg flex flex-col bg-gradient-to-br bg-light"
            style={{
              top: navbarHeight,
              height: `calc(100vh - ${navbarHeight}px)`,
            }}
          >
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
                <X size={28} />
              </button>
            </div>

            <div className="px-6 flex-1 flex flex-col pt-0 overflow-y-auto">
              {[  
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/rentagrement", label: "Registration Agrement " },
              ].map(({ href, label }) => (
                <Link
                  href={href}
                  key={label}
                  className={`block text-xl mt-5 hover:text-blue-lightest hover:font-bold py-2 border-b border-blue ${
                    pathname === href ? "text-blue" : ""
                  }`}
                  onClick={handleNavLinkClick}
                >
                  {label}
                </Link>
              ))}

              <details className="text-xl mt-5">
                <summary className="cursor-pointer py-2 border-b border-blue">
                  Solutions
                </summary>
                <div className="ml-4 mt-2 space-y-3 border-l border-white/50 pl-4">
                  {solutionLinks.map(({ href, label }) => (
                    <Link
                      href={href}
                      key={label}
                      className={`block text-lg hover:text-blue-lightest hover:font-bold py-1 border-b border-blue ${
                        pathname === href ? "text-blue" : ""
                      }`}
                      onClick={handleNavLinkClick}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    href="/solution"
                    className={`text-blue-lightest font-semibold hover:underline cursor-pointer mt-3 block text-lg py-1 border-b border-blue ${
                      pathname === "/solution" ? "text-blue" : ""
                    }`}
                    onClick={handleNavLinkClick}
                  >
                    All Solutions →
                  </Link>
                </div>
              </details>

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
