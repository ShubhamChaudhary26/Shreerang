'use client';

import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';

type Props = {
  title: string;
  description: string;
  // logo: string;
  // buttonText: string;
  images: string[];
};

export default function CaseStudiesSection({
  title,
  description,
  // logo,
  // buttonText,
  images,
}: Props) {
  const carouselRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <ScrollFadeIn delay={0.2}>
    <motion.div
      className="flex flex-col lg:flex-row mx-auto py-16 gap-12 items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* LEFT SIDE */}
      <motion.div
        className="flex-1 max-w-md space-y-6"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
       
        <h2 className="h2 light">{title}</h2>
        <p className="p2">{description}</p>
        {/* <button className="b1">{buttonText}</button> */}
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="relative flex-1 w-full overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Carousel
          ref={carouselRef}
          dots={false}
          effect="fade"
          beforeChange={(_, next) => setActiveSlide(next)}
        >
          {images.map((src, idx) => (
  <div key={idx} className="relative w-full">
    <img
      src={src}
      alt={`Slide ${idx + 1}`}
      className={`w-full h-auto max-h-96 object-contain rounded-lg transition-all duration-700 ease-in-out ${
        activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    />
  </div>
))}
        </Carousel>

        {/* Arrows */}
        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full shadow hover:bg-light-100 hover:scale-110 transition"
        >
          <LeftOutlined />
        </button>
        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full shadow hover:bg-light-100 hover:scale-110 transition"
        >
          <RightOutlined />
        </button>
      </motion.div>
    </motion.div>
          </ScrollFadeIn>
  );
}
