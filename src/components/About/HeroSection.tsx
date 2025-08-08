"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full mt-[71px] bg-[#DAECFF] text-black">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Hassle-Free Registered Rent Agreement Services
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Doorstep biometric verification, quick processing, and legal compliance — trusted by thousands across Maharashtra.
          </p>
          <Link
            href="#contact"
            className="b1 inline-block   text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Right Video */}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className="aspect-video w-full rounded-xl overflow-hidden ">
            <video
              className="w-full h-full object-cover"
              src="/banking.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
