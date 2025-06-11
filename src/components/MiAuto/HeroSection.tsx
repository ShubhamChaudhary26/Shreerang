'use client';

import React from 'react';
import LiveChart from './LiveChart';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
    <section className="relative h-[410px] w-full mt-10 overflow-hidden">
        <div className="relative  flex  justify-center">
            <LiveChart />
      </div>
      {/* Left Side: Text */}
    </section>
        <div className="  ">
          <div className="space-y-6">
            <p className="h5">Solutions</p>
            <h1 className="h1">
              Driving Innovation with Real-Time Tyre Intelligence
            </h1>
            <Link href="/requestquote">
            <button className="b1 mt-5 mb-10">Book a Free Consultation </button>
            </Link>
          </div>
        </div>
    </>
  );
};

export default HeroSection;
