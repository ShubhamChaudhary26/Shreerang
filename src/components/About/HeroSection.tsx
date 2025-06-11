"use client";

import Image from "next/image";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";

interface Slide {
  title: string;
  description: string;
  image: string; 
}

export default function HeroSection() {
  const carouselRef = useRef<CarouselRef>(null);

  const slides: Slide[] = [
    {
      title: "About Us",
      description:
        "Uncover how we fuel business growth across regions with data-driven insights and innovative research solutions.",
      image: "/about/aboutHero1.svg",
    },
    {
      title: "Our Vision",
      description:
        "To become the most reliable market research organization in the world, driven by technology and trust.",
      image: "/about/aboutHero2.svg",
    },
    {
      title: "Our Team",
      description:
        "To continuously adopt the best research techniques and provide actionable insights in the shortest possible time.",
      image: "/about/aboutHero3.svg",
    },
  ];

  return (
    <section className="relative mt-[67px] h-auto w-full overflow-hidden">
      <Carousel
        ref={carouselRef}
        autoplay
        dots={false}
        effect="fade"
        className="h-full"
      >
        {slides.map((slide, index) => (
          <div key={index}>
           
            <div className="relative h-[60vh] min-h-[400px] w-full flex flex-col md:flex-row items-center bg-light">
  
              <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4">

                <div className="w-full md:w-1/2 text-center md:text-left p-4 md:p-8 flex flex-col justify-center">
                  <h1 className="h1  mb-4 md:mb-6">{slide.title}</h1>
                  <p className="h3 ">{slide.description}</p>
                </div>
                <div className="hidden md:flex md:w-1/2 items-center justify-center p-4 relative h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    
                    width={500} 
                    height={400} 
                    className="custom-image"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-6 z-30 text-Darkblack p2 -translate-y-1/2">
        <span
          className="cursor-pointer hover:opacity-70 transition text-4xl"
          onClick={() => carouselRef.current?.prev()}
        >
          ←
        </span>
        <span
          className="cursor-pointer hover:opacity-70 transition text-4xl"
          onClick={() => carouselRef.current?.next()}
        >
          →
        </span>
      </div>
    </section>
  );
}