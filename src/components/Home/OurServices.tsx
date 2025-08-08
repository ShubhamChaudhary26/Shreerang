'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { motion } from 'framer-motion';
import { FaHome, FaMapMarkerAlt, FaIdCard, FaFileSignature, FaUserShield } from 'react-icons/fa';

const services = [
  {
    icon: <FaHome size={28} />,
    title: 'Home Biometric Service',
    description: 'We visit your location for Aadhaar biometric verification & registration.',
  },
  {
    icon: <FaMapMarkerAlt size={28} />,
    title: 'Service Across India',
    description: 'Available in Mumbai, Pune, Nashik, Nagpur & other major cities.',
  },
  {
    icon: <FaIdCard size={28} />,
    title: 'e-Stamp + Govt Registration',
    description: 'Digitally e-stamped & registered rent agreement with legal validity.',
  },
  {
    icon: <FaFileSignature size={28} />,
    title: 'Online Draft Approval',
    description: 'Preview & edit your agreement draft before final submission.',
  },
  {
    icon: <FaUserShield size={28} />,
    title: '100% Legal Support',
    description: 'Compliant with government rules, accepted by police & court.',
  },
];

const RentAgreementSlider = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br ">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">
        Why Choose Shreerang for Rent Agreement?
      </h2>

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
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="bg-white/40 backdrop-blur-md mb-10  rounded-2xl p-6 shadow-lg border border-blue-100 h-[260px] flex flex-col justify-between hover:shadow-2xl transition duration-300"
            >
              <div className="text-blue-900 bg-white p-3 w-fit rounded-full shadow">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 text-blue-900">{service.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{service.description}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RentAgreementSlider;
