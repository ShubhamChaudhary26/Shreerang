"use client";

import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Johnson", city: "Pune", rating: 5, content: "Smooth, fast, and professional. Highly recommend!" },
  { name: "Amit Verma", city: "Mumbai", rating: 5, content: "Doorstep KYC was super convenient." },
  { name: "Emma Williams", city: "Delhi", rating: 5, content: "Clear terms and quick processing." },
  { name: "Ravi Kumar", city: "Bengaluru", rating: 4, content: "Great support throughout the process." },
  { name: "Priya Shah", city: "Hyderabad", rating: 5, content: "Trustworthy and efficient service." },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleCount = (() => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  })();

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  const displayedTestimonials = [];

  for (let i = 0; i < visibleCount; i++) {
    displayedTestimonials.push(testimonials[(currentIndex + i) % testimonials.length]);
  }

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-sans">What Our Clients Say</h2>
          <p className="text-gray-600">Real feedback from our customers</p>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="flex gap-6 overflow-hidden"
        >
          {displayedTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex mb-2">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-900 mb-2">“{t.content}”</p>
              <div className="text-sm text-gray-600">
                {t.name} — {t.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
