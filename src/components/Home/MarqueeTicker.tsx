"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  "Doorstep Biometric KYC",
  "E-stamped Legal Agreements",
  "Express 24–48h Processing",
  "Verified Rental Listings",
  "Police Verification Assistance",
  "Custom Clauses Support",
  "Priority Customer Support",
];

const MarqueeTicker = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf: number;
    let last = performance.now();
    const speed = 60; // px per second

    const step = (now: number) => {
      if (!el) return;
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        el.scrollLeft += speed * dt;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div
      className="py-4 bg-gray-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="overflow-x-hidden">
        <div className="flex gap-8 whitespace-nowrap px-4" style={{ width: "max-content" }}>
          {[...items, ...items].map((text, i) => (
            <span key={i} className="text-sm md:text-base text-gray-700/80">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
