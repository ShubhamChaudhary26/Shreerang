'use client';
import Image from 'next/image';
import React from 'react';

type ExploreCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
  imageHeight?: string;
};

const ExploreCard: React.FC<ExploreCardProps> = ({
  imageSrc,
  title,
  description,
  reverse = false,
  imageHeight = 'h-64',
}) => {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} mb-12`}>
      <div className={`w-full md:w-1/2 relative ${imageHeight}`}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="h5  mb-4">{description}</p>
        <a href="#" className="flex items-center gap-2 h5 font-medium underline transition">
          <span className=" w-8 h-8 rounded-full border border-black flex items-center justify-center">
            <span className="text-lg">→</span>
          </span>
          FIND OUT MORE
        </a>
      </div>
    </div>
  );
};

export default ExploreCard;
