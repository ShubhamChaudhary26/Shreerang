'use client';

import React from 'react';
import Flag from 'react-world-flags';

type Country = {
  code: string; // country code e.g. 'us', 'in'
  name: string;
};

// interface Country {
//   code: string;
//   name: string;
// }

const countriesData: Country[] = [
  { code: 'us', name: 'United States' },
  { code: 'in', name: 'India' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  // Middle East
  { code: 'bh', name: 'Bahrain' },
  { code: 'eg', name: 'Egypt' },
  { code: 'ir', name: 'Iran' },
  { code: 'iq', name: 'Iraq' },
  { code: 'jo', name: 'Jordan' },
  { code: 'kw', name: 'Kuwait' },
  { code: 'lb', name: 'Lebanon' },
  { code: 'om', name: 'Oman' },
  { code: 'qa', name: 'Qatar' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'sy', name: 'Syria' },
  { code: 'ae', name: 'UAE' },
  { code: 'ye', name: 'Yemen' },
  { code: 'dz', name: 'Algeria' },
  { code: 'ao', name: 'Angola' },
  { code: 'ke', name: 'Kenya' },
  { code: 'gh', name: 'Ghana' },
  { code: 'ma', name: 'Morocco' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'za', name: 'South Africa' },
  { code: 'ug', name: 'Uganda' },
  { code: 'tz', name: 'Tanzania' },
  { code: 'zm', name: 'Zambia' },
  { code: 'et', name: 'Ethiopia' },
  { code: 'sd', name: 'Sudan' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'cn', name: 'China' },
  { code: 'jp', name: 'Japan' },
  { code: 'kr', name: 'South Korea' },
  { code: 'bd', name: 'Bangladesh' },
  { code: 'lk', name: 'Sri Lanka' },
  { code: 'np', name: 'Nepal' },
  { code: 'bt', name: 'Bhutan' },
  { code: 'mv', name: 'Maldives' },
  { code: 'th', name: 'Thailand' },
  { code: 'vn', name: 'Vietnam' },
  { code: 'my', name: 'Malaysia' },
  { code: 'id', name: 'Indonesia' },
  { code: 'ph', name: 'Philippines' },
  { code: 'mm', name: 'Myanmar' },
  { code: 'kh', name: 'Cambodia' },
  { code: 'la', name: 'Laos' },
  { code: 'sg', name: 'Singapore' },
  { code: 'bn', name: 'Brunei' },
  { code: 'tl', name: 'Timor-Leste' },
];


export const Countries: React.FC = () => {
  return (
    <section className="py-10">
      <h2 className="h2 text-center !mb-[65px]">Countries We Serve</h2>
      <div className="overflow-hidden w-full relative">
        <div className="flex items-center gap-6 animate-scroll whitespace-nowrap">
          {countriesData.map((country, index) => (
            <div
              key={index}
              className=" w-32 flex-shrink-0 flex flex-col items-center hover:scale-110 transition-transform duration-300"
            >
              <Flag
                code={country.code}
                style={{
                  width: '100%',
                  height: '50px',
                  maxWidth: '80px',
                  maxHeight: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
                alt={country.name}
              />
              <h6 className="mt-2 h5 font-medium text-center">{country.name}</h6>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </section>
  );
};
