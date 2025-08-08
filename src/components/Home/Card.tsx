'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollAnimation, useStaggeredAnimation } from "../hooks/useScrollAnimation";

// Animated Counter Component
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr+`;
    if (num >= 100000) return `${(num / 1000).toFixed(0)}K+`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
    return `${num}+`;
  };

  return <span>{formatNumber(count)}</span>;
};

const ShreerangStats = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: cardsRef, visibleItems } = useStaggeredAnimation(200);
  const companyRef = useRef(null);
  const companyInView = useInView(companyRef, { once: true });

  const stats = [
    { title: "Rent Agreements", subtitle: "Every Month", target: 50000 },
    { title: "Happy Banking Customers", subtitle: "Every Month", target: 10000 },
    { title: "Builders Transactions", subtitle: "Every Month", target: 10000000 },
  ];

  return (
    <div ref={statsRef} className="bg-gradient-to-br from-background via-muted/30 to-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mt-5 gradient-text text-blue-900 leading-tight" style={{ lineHeight: '2' }}>
            Cutting Edge Advantage
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Shreerang's digital platform offers innovative solutions that make government and banking services simple, efficient, and secure for businesses, ensuring a hassle-free experience for all.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={visibleItems.has(index) ? { opacity: 1, scale: 1 } : {}}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center border-2 border-primary/20 bg-white p-8 rounded-lg shadow-md"
            >
              <div>
                <div className="text-6xl font-bold gradient-text mb-4 font-mono text-blue-900">
                  {statsVisible && <AnimatedCounter target={stat.target} />}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission and Company Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={statsVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our mission is to simplify and streamline government services, making them easily accessible to individuals and businesses through our platform, and creating an environment where everyone can succeed.
            </p>
            <button className="bg-primary text-white text-lg px-8 py-4 rounded-md hover:bg-primary/90 transition-transform hover:scale-105">
              View more <span className="ml-2">→</span>
            </button>
          </motion.div>

          <motion.div
            ref={companyRef}
            initial={{ opacity: 0, x: 50 }}
            animate={companyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-lg shadow-md hover:shadow-lg"
          >
            <div className="text-center">
              <div className="text-6xl font-bold gradient-text mb-4 font-mono text-blue-900">
                {companyInView && <AnimatedCounter target={100} />}
              </div>
              <p className="text-lg text-foreground font-semibold">
                Companies and industries who have bought our services
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShreerangStats;
