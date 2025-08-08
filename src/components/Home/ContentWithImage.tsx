"use client";
import { useEffect, useRef } from "react";
import clsx from "clsx";

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("p-6 md:p-8", className)}>{children}</div>;
}

const StarIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847L19.335 24 12 20.019 4.665 24 6 15.597 0 9.75l8.332-1.732z" />
  </svg>
);

export default function ShreerangTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  const testimonials = [
    { name: "Tushar Chaskar", designation: "Business Owner", location: "Mumbai, Maharashtra", rating: 5, text: "Superb rent agreement service. Quick, professional and hassle-free." },
    { name: "Rajesh Patil", designation: "IT Professional", location: "Pune, Maharashtra", rating: 5, text: "Rent agreement was seamless and delivered within 24 hours." },
    { name: "Priya Deshmukh", designation: "Marketing Manager", location: "Nagpur, Maharashtra", rating: 5, text: "Very professional and responsive service for rent agreement." },
    { name: "Vikash Shinde", designation: "Consultant", location: "Thane, Maharashtra", rating: 5, text: "Amazing doorstep service! All documents done in one visit." },
    { name: "Anjali More", designation: "HR Executive", location: "Nashik, Maharashtra", rating: 5, text: "Quick and reliable rent agreement service with fair pricing." },
  ];

  const loopTestimonials = [...testimonials, ...testimonials];

  // Auto-scroll card-by-card
  const startScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;

    const cardWidth = el.querySelector(".testimonial-card")?.clientWidth || 300;
    animationRef.current = setInterval(() => {
      const maxScroll = el.scrollWidth / 2;
      if (el.scrollLeft + cardWidth >= maxScroll) {
        el.scrollLeft = 0;
      } else {
        el.scrollBy({ left: cardWidth + 24, behavior: "smooth" }); // 24 = gap-6
      }
    }, 2500);
  };

  const stopScroll = () => clearInterval(animationRef.current);

  useEffect(() => {
    startScroll();
    return () => stopScroll();
  }, []);

  return (
    <section className="bg-gradient-to-br  py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Rent Agreement Services in Maharashtra
        </h2>
        <p className="text-gray-600 text-center text-lg mb-10 max-w-2xl mx-auto">
          Here’s what our customers across Maharashtra say about our rent agreement service.
        </p>

        <div
          ref={scrollRef}
          className="flex gap-[75px]  md:mb-50 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          onMouseEnter={stopScroll}
          onMouseLeave={startScroll}
        >
          {loopTestimonials.map((t, idx) => (
          <Card
  key={idx}
  className={clsx(
    "testimonial-card flex-shrink-0 snap-center items-center justify-center ",
    "w-full max-w-[350px] h-[320px]",
    "sm:w-[280px] sm:h-[340px]",
    "lg:w-[350px] lg:h-auto",
    "bg-white rounded-2xl mb-20 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
  )}
>

  <CardContent className="flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-center mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <StarIcon
            key={i}
            className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]"
          />
        ))}
      </div>
      <p className="text-gray-700 italic break-words mb-4 leading-relaxed text-center">
        "{t.text}"
      </p>
    </div>
    <div className="text-center border-t pt-4">
      <p className="font-semibold text-lg text-gray-900">{t.name}</p>
      <p className="text-sm text-primary font-medium">{t.designation}</p>
      <p className="text-xs text-gray-500">{t.location}</p>
    </div>
  </CardContent>
</Card>

          ))}
        </div>
      </div>
    </section>
  );
}
