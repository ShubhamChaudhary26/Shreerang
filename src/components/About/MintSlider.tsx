'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';
import Link from 'next/link';

export default function LogoSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    let animationFrameId;
    const scrollSpeed = 1.5;

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollSpeed;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle loading and error states
  if (loading) {
    return (

      <section className="w-full bg-light py-12 mt-10 overflow-hidden">
        <h2 className="h2 light !mb-20 tracking-wider text-center">
          Our Featured Case Studies
        </h2>
        <p className="text-center">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 mt-10 overflow-hidden">
        <h2 className="h2 !mb-20 tracking-wider text-center">
          Our Featured Case Studies
        </h2>
        <p className="text-center text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    
    <ScrollFadeIn delay={0.2}>
      <section className="w-full bg-light py-12 mt-10 overflow-hidden">
        <h2 className="h2 !mb-20 tracking-wider text-center">
          Our Featured Case Studies
        </h2>

      
        <div
          ref={scrollRef}
          className="flex gap-14 whitespace-nowrap overflow-hidden w-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          {[...blogs, ...blogs].map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 flex flex-col items-center justify-center w-[180px] opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="relative w-[160px] h-[100px]">
                <Link  href={'./inspiration#blog'}> 
                <Image
                  src={item.featuredImage || '/grt.jpg'}
                  alt={item.title || `Blog ${index}`}
                  
                  fill
                  className="object-contain rounded-xl shadow-md"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
               </Link>
              </div>
              <p className="mt-2 text-sm font-medium text-center">
                {item.title || 'Untitled Blog'}
              </p>
            </motion.div>
          ))}
        </div>
    
      </section>
    </ScrollFadeIn>
  );
}