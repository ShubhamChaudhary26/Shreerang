'use client';

import { Building, Cpu, Home, Briefcase, Users, Shield } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "../hooks/useScrollAnimation";

const ShreerangIndustries = () => {
  const { ref: industriesRef, isVisible } = useScrollAnimation();
  const { ref: gridRef, visibleItems } = useStaggeredAnimation(150);

  const industries = [
    { icon: <Building className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "Finance Industry", description: "Banking & Financial Services" },
    { icon: <Cpu className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "IT Industry", description: "Technology & Software" },
    { icon: <Home className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "Real-Estate Industry", description: "Property & Development" },
    { icon: <Briefcase className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "Corporate Services", description: "Business Solutions" },
    { icon: <Users className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "Consulting", description: "Advisory Services" },
    { icon: <Shield className="h-12 w-12 text-primary group-hover:rotate-[360deg] transition-transform duration-500" />, name: "Legal Services", description: "Law & Compliance" },
  ];

  return (
    <div ref={industriesRef} className="bg-gradient-to-br from-muted via-background to-muted py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-4xl font-bold gradient-text mb-8 text-blue-900" style={{ lineHeight: '1.3' }}>
            Join 100+ companies and industries who have bought our services.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by leading organizations across diverse sectors for reliable property documentation solutions.
          </p>
        </div>

        {/* Industries grid */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted to-transparent z-10"></div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16"
          >
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`group text-center bg-white  border-2 border-transparent hover:border-primary/20 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
                  visibleItems.has(index) ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4 relative text-blue-900">
                  {industry.icon}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enquire Button */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <a href="/requestquote">
            <button className="b1 hover:bg-primary/90 text-white text-lg px-8 py-4 rounded-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl inline-flex items-center">
              Enquire Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShreerangIndustries;
