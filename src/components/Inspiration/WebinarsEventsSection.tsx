// components/WebinarsEventsSection.tsx
'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import your ScrollFadeIn component

export default function WebinarsEventsSection() {
  return (
    <>
      <ScrollFadeIn delay={0.1}> {/* Apply fade-in to the heading */}
        <h2 className="h2">Webinars & Events</h2>
      </ScrollFadeIn>

      <section className="w-full border-t border-black py-7">
        {/* Content Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left Side (Date + Category) */}
          <div className="text-left md:w-1/3">
            <ScrollFadeIn delay={0.4}> {/* Apply fade-in to the date */}
              <p className="p2"> 1 June 2025</p>
            </ScrollFadeIn>
            {/* If you uncomment the category, wrap it in ScrollFadeIn as well */}
            {/* <ScrollFadeIn delay={0.6}>
              <p className="text-xs mt-1">BRAND</p>
            </ScrollFadeIn> */}
          </div>

          {/* Right Side (Title + Link) */}
          <div className="md:w-2/3 mt-2">
            <ScrollFadeIn delay={0.6}> {/* Apply fade-in to the title */}
              <h3 className="p2">
             
Official Launch of Our Second Office in Bengaluru, Karnataka <br /> — Expanding Our Presence in South India.
              </h3>
            </ScrollFadeIn>

            {/* <ScrollFadeIn delay={0.8}> 
              <button className="b2">
                <span className="Arrow">→</span>
                Find out more
              </button>
            </ScrollFadeIn> */}
          </div>
        </div>
      </section>
    </>
  );
}