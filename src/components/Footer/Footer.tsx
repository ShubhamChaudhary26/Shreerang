"use client";

import Link from "next/link";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 font-sans">
                Shreerang <span className="text-blue-600">Rent</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Professional property rental and rent agreement services. Your
              trusted partner for hassle-free property rentals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                About Us
              </Link>
              <Link
                href="/agreement"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                Registration Agreement
              </Link>
              <Link
                href="/login"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                Get-Started 
              </Link>
              <Link
                href="/agreement"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                Contact Us
              </Link>
              <a
                href="#"
                className="block text-gray-500 hover:text-blue-600 transition duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Services</h3>
            <div className="space-y-2 text-gray-500">
              <div>Property Rental</div>
              <div>Rent Agreements</div>
              <div>Legal Documentation</div>
              <div>Property Management</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>
            <div className="space-y-3 text-gray-500">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>info@shreerang.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>
                  123 Business District
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {currentYear} Shreerang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
