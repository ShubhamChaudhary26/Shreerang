import { Calendar } from "lucide-react";
import React from "react";

interface TimelineCardProps {
  year: string;
  description: string;
}

export default function TimelineCard({ year, description }: TimelineCardProps) {
  return (
    <div
      style={{
        boxShadow: "0px 1px 20px ",
      }}
     className="bg-light h-[180px] rounded-md shadow-md px-6 py-6 w-full max-w-sm transition duration-300 border relative z-10 transform hover:scale-105 hover:shadow-xl animate-glow"

    >
      <div className="flex items-center space-x-2 mb-2">
        <span className="h2 !mb-0  font-bold light transition duration-300 transform">
          {year}
        </span>
        <div className="bg-light  rounded-full">
          <Calendar size={20} className="light" />
        </div>
      </div>
      <p className="p2  ">
        {description}
      </p>
    </div>
  );
}
