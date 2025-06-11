"use client";

import { ArrowRightOutlined } from "@ant-design/icons";

export default function BrandGrowthSection() {
  return (
    <section className="w-full  ">
      <div className="flex flex-col md:flex-row w-full px-10 min-h-[470px]  md:min-h-[700px] text-left">
        {/* Left Side */}
        <div className="bg-light-light  px-6 py-10 md:px-12 md:py-10 md:w-1/2 flex flex-col justify-center items-center md:items-start">
          <div className="w-full max-w-md">
            <h2 className="h2 dark ">
              MintSurvey&apos;s Blueprint for Brand Growth is built on an
              analysis of 6.5 billion consumer data points.
            </h2>
            <div className="text-4xl sm:text-5xl md:text-[6rem] font-extrabold mt-6 text-center md:text-justify">
              6.5b
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="  py-1 md:px-12 md:py-5  flex flex-col justify-center items-center md:items-start">
          <div className="w-full max-w-md">
            <h3 className="h2 ">Blueprint for Brand Growth</h3>
            <p className="p2">
              The Blueprint for Brand Growth is a breakthrough in understanding
              how businesses build profitable, strong, and sustainable brands.
            </p>
            
<button className="b2">
            <span className="Arrow">→</span>
            Find out more
          </button>

          </div>
        </div>
      </div>
    </section>
  );
}
