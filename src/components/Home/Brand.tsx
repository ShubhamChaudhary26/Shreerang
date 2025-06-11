// components/WhyBrandsSection.tsx
"use client";

import Image from "next/image";

export default function WhyBrandsSection() {
  const reasons = [
    {
      img: "/home/Picture1.png", // ← Your image path
      title: "We Don’t Outsource,\nWe Take Ownership",
    },
    {
      img: "/home/Picture2.png",
      title: "One-Stop Solution\nfor All Research Needs",
    },
    {
      img: "/home/Picture3.png",
      title: "Respondents' Panel &\nIn-house Interviewers",
    },
    {
      img: "/home/Picture4.png",
      title: "90% Clients Return for ROI-Focused Research",
    },
    {
      img: "/home/Picture5.png",
      title: "Your data and identity\nstay secure—always.",
    },
  ];

  return (
    <section className="bg-light py-16 relative overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12 px-3">
        <h2 className=" text-3xl md:text-4xl font-bold">
          Why brands count on us?
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border-white/20 md:border-l first:md:border-l-0"
          >
            <div className="w-14 h-14 relative">
              <Image
                src={reason.img}
                alt="icon"
                fill
                className="object-contain"
              />
            </div>
            <p className=" mt-4 h3 whitespace-pre-line leading-snug">
              {reason.title}
            </p>
          </div>
        ))}
      </div>

      {/* Decorative gradient on right side */}
      
    </section>
  );
}
