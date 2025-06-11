'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import ScrollFadeIn

type Slide = {
  image: string;
  title: string;
  description: string;
  store1: string;
  store2: string;
  address1: string;
  address2: string;
};

type Props = {
  slides: Slide[];
};

export default function CaseStudyCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const current = slides[index];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => {
      const nextIndex =
        newDirection === 1
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length;
      return nextIndex;
    });
  };

  // !!! FIX HERE: Ensure 'variants' is declared with 'const' or 'let' !!!
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%', // Use percentage for responsiveness
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%', // Use percentage for responsiveness
      opacity: 0,
    }),
  };

  return (
    <div className="bg-light py-8 md:py-16 px-4 md:px-12 text-center overflow-hidden">
      {/* Apply ScrollFadeIn to the title */}
      <ScrollFadeIn delay={0.2}>
        <h2 className="h2 text-xl sm:text-2xl md:text-3xl lg:text-4xl px-2">
          {current.title}
        </h2>
      </ScrollFadeIn>

      {/* Apply ScrollFadeIn to the description */}
      <ScrollFadeIn delay={0.3}>
        <p className="p2 mx-auto mb-6 text-sm sm:text-base md:text-lg px-2">
          {current.description}
        </p>
      </ScrollFadeIn>

      {/* Apply ScrollFadeIn to the button */}
      <ScrollFadeIn delay={0.4}>
        <button className="b1 dark font-medium px-6 py-2 rounded mb-6 md:mb-10 text-sm sm:text-base">
          Sign Up Free
        </button>
      </ScrollFadeIn>

      {/* The Carousel itself (Image, arrows) */}
      <div className="relative w-full max-w-[700px] mx-auto h-[250px] sm:h-[300px] md:h-[400px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <Image
              src={current.image}
              alt="Case Study"
              width={1000}
              height={600}
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => paginate(-1)}
          className="absolute top-1/2 left-2 md:left-0 -translate-y-1/2 border bg-light rounded-full p-1 md:p-2 shadow hover:scale-110 transition z-10"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute top-1/2 right-2 md:right-0 -translate-y-1/2 bg-light border rounded-full p-1 md:p-2 shadow hover:scale-110 transition z-10"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Apply ScrollFadeIn to the store information */}
      <ScrollFadeIn delay={0.6}>
        <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-4 mt-4 md:mt-6 text-sm sm:text-base md:text-lg dark">
          <div>{current.store1}</div>
          <span className="flex-shrink-0">VS</span>
          <div>{current.store2}</div>
        </div>
      </ScrollFadeIn>

      {/* Apply ScrollFadeIn to the address information */}
      <ScrollFadeIn delay={0.7}>
        <div className="h5 mt-2 text-xs sm:text-sm md:text-base px-2">
          <p>{current.address1}</p>
          <p>{current.address2}</p>
        </div>
      </ScrollFadeIn>
    </div>
  );
}