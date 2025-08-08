"use client";

import Image from "next/image";
import aboutImage from "../../../public/about.jpg"; // Ensure this path is correct
import { motion } from "framer-motion";

export default function WhoWeAreDescription() {
  return (
    <section className="py-10 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Floating Animated Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative h-[350px] sm:h-[450px] md:h-[70vh] w-full flex items-center justify-center"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full relative"
          >
            <Image
              src={aboutImage}
              alt="Shreerang Associate Office"
              fill
              className="object-contain rounded-xl "
              priority
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-5 text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold text-blue-900">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700">
            At <strong>Shreerang Associate</strong>, we specialize in providing
            fast, reliable, and legally compliant services—ranging from online
            rent agreements and property documentation to registration and notary assistance.
          </p>
          <p className="text-lg text-gray-700">
            Based in Maharashtra, we serve clients across the state with a hassle-free,
            doorstep documentation experience. Our digital-first approach ensures that legal formalities
            are completed quickly and securely.
          </p>
          <p className="text-lg text-gray-700">
            From property owners to tenants, and businesses to individuals—our team is committed
            to delivering transparent services with zero hidden charges and full legal compliance.
          </p>
          <p className="text-lg text-gray-700">
            Choose <strong>Shreerang Associate</strong> for a seamless,
            stress-free documentation journey backed by expert support and a customer-first mindset.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
