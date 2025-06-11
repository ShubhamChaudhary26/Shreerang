// // components/TrustedBrands.tsx
// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Assuming you still want this

// type Brand = {
//   src: string;
//   alt: string;
//   name: string; // Added name property
// };

// type TrustedBrandsProps = {
//   heading: string;
//   brands: Brand[];
//   showLink?: boolean;
//   // linkHref?: string;
//   linkText?: string;
// };

// const TrustedBrands: React.FC<TrustedBrandsProps> = ({
//   heading,
//   brands,
//   showLink = true,
//   // linkHref = '/all-brands',
//   linkText = 'See All',
// }) => {
//   // Essential for the seamless loop: Duplicate brands
//   const scrollingBrands = [...brands, ...brands];

//   return (
//     <section className="w-full py-12 overflow-hidden">
//       <div className="container mx-auto px-6">
//         {/* Apply ScrollFadeIn to the heading and link container */}
//         <ScrollFadeIn delay={0.2}>
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="p3 md:text-lg">{heading}</h2>
//             {/* {showLink && (
//               <Link href={linkHref} className="light p3 underline-animate">
//                 {linkText} →
//               </Link>
//             )} */}
//           </div>
//         </ScrollFadeIn>

//         {/* Wrap the entire scrolling container with ScrollFadeIn */}
//         <ScrollFadeIn delay={0.4}>
//           <div className="relative w-full overflow-hidden">
//             {/* Apply the custom infinite-scroll animation utility class here */}
//             {/* The `whitespace-nowrap` keeps all images on one line */}
//             {/* The `gap-12` creates space between images */}
//             <div className="flex animate-infinite-scroll whitespace-nowrap gap-12">
//               {scrollingBrands.map((brand, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 flex flex-col items-center"
//                 >
//                   <Image
//                     src={brand.src}
//                     alt={brand.alt}
//                     width={100} // Set explicit width
//                     height={60} // Set explicit height
//                     className="object-contain h-12 w-auto" // Ensure image scaling within its container
//                   />
//                   <p className="text-sm text-center mt-2">{brand.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </ScrollFadeIn>
//       </div>
//     </section>
//   );
// };

// export default TrustedBrands;