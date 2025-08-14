"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import {
  FaHome,
  FaMapMarkerAlt,
  FaIdCard,
  FaFileSignature,
  FaUserShield,
} from "react-icons/fa";

const services = [
  {
    icon: <FaHome size={32} />,
    title: "Home Biometric Service",
    description:
      "We visit your location for Aadhaar biometric verification & registration.",
    details:
      "Our trained executives ensure accurate biometric capture and assist with form submission at your doorstep.",
  },
  {
    icon: <FaMapMarkerAlt size={32} />,
    title: "Service Across India",
    description:
      "Available in Mumbai, Pune, Nashik, Nagpur & other major cities.",
    details:
      "No matter where you are, Shreerang Associates ensures you get the same premium service across all locations.",
  },
  {
    icon: <FaIdCard size={32} />,
    title: "e-Stamp + Govt Registration",
    description:
      "Digitally e-stamped & registered rent agreement with legal validity.",
    details:
      "All agreements are compliant with government standards and fully recognized legally.",
  },
  {
    icon: <FaFileSignature size={32} />,
    title: "Online Draft Approval",
    description: "Preview & edit your agreement draft before final submission.",
    details:
      "You get full control over your agreement draft to ensure all terms are accurate and transparent.",
  },
  {
    icon: <FaUserShield size={32} />,
    title: "100% Legal Support",
    description: "Compliant with government rules, accepted by police & court.",
    details:
      "Our legal experts provide guidance at every step and assist in resolving any queries post-registration.",
  },
];

const RentAgreementSlider = () => {
  return (
    <section className="py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 ">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-sans mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Shreerang Associates offers complete property and rent agreement
            solutions with expert support, legal validation, and doorstep
            convenience across India.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          grabCursor
          loop
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white rounded-2xl p-6  shadow-md border flex flex-col items-center text-center h-[320px] mx-5 my-5 duration-300 hover:shadow-lg transition-shadow border-l-1 border-r-1 border-blue-500"
              >
                {/* Icon Circle */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 shadow mb-6">
                  {service.icon}
                </div>
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-2">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-gray-700 text-sm md:text-base mb-2">
                  {service.description}
                </p>
                {/* Extra Details */}
                <p className="text-gray-500 text-sm">{service.details}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RentAgreementSlider;
