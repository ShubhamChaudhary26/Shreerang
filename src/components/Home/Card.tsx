'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

interface Service {
  title: string;
  description: string;
}

const rentServices: Service[] = [
  {
    title: 'Registered Rent Agreement',
    description: 'We offer legally registered rent agreements with biometric verification at your doorstep, ensuring hassle-free documentation with government e-stamping.',
  },
  {
    title: 'Property Buy-Sell Assistance',
    description: 'Whether you want to buy or sell a property, our expert agents will guide you through legal formalities, documentation, and smooth handover.',
  },
  {
    title: 'Leave & License Agreement',
    description: 'Need a proper agreement between landlord and tenant? We help draft and register Leave & License agreements accepted by all major authorities.',
  },
  {
    title: 'NRI Property Support',
    description: 'Specialized services for NRI clients – rent agreement registration, property management, and legal documentation, all done remotely.',
  },
];

const RentServices: React.FC = () => {
  return (
    <main className="w-full py-10 mt-20 px-2 md:px-6 lg:px-8 items-center">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="h2 text-center text-primary">Rent Agreement Services</h2>
        <p className="text-center text-lg mt-4 mb-10 text-muted-foreground">
          Offered by Shreerang Associates — fast, reliable, and doorstep service for all your agreement and property needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {rentServices.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 hover:shadow-md flex flex-col text-start min-h-[200px]"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 text-center">{service.title}</h3>
              <p className="mt-2 text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="tel:917498776389">
            <button className="b1 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90">
              📞 Call Now: +91 7498776389
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RentServices;
