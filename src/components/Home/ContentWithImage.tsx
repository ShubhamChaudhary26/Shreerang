"use client";
import React from "react";
import Image from "next/image";

interface ContentWithImageProps {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  reverse?: boolean;
}

const ContentWithImage: React.FC<ContentWithImageProps> = ({
  title,
  subtitle,
  content,
  image,
  reverse = false,
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full mx-auto gap-0 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content Section */}
      <div className="lg:w-1/2 px-8 lg:px-16 py-8 lg:py-16 flex items-center">
        <div>
          <div className="border-l-4 border-light pl-2 mb-4">
            <p className="h5">{subtitle}</p>
          </div>
          <h2 className="h3">{title}</h2>
          <p className="p2">{content}</p>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 h-[400px] lg:h-auto relative overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-90 group-hover:shadow-xl"
        />
      </div>
    </div>
  );
};

export default ContentWithImage;
