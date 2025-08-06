'use client';

import Image from 'next/image';

export default function RentWhyUsSection() {
  const reasons = [
    {
      img: '/home/Picture1.png', // ✅ Keeping original icons
      title: 'Registered Rent\nAgreement Service',
    },
    {
      img: '/home/Picture2.png',
      title: 'Doorstep Biometric\nVerification',
    },
    {
      img: '/home/Picture3.png',
      title: 'Fast E-Stamp\nRegistration',
    },
    {
      img: '/home/Picture4.png',
      title: 'Trusted Property\nDealing Assistance',
    },
    {
      img: '/home/Picture5.png',
      title: 'Secure and Hassle-Free\nProcess Always',
    },
  ];

  return (
    <section className="bg-light py-16 relative overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12 px-3">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Choose Shreerang Associates?
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Trusted Rent Agreement and Property Experts.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-4">
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
            <p className="mt-4 h3 whitespace-pre-line leading-snug text-gray-800">
              {reason.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
