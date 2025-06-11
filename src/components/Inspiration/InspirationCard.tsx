import React from 'react';

// Interface for Insight
interface Insight {
  id: string;
  title: string;
  tag: string;
  date: string;
  image?: string;
  industry: string;
  type: string;
  expertise: string;
  content: string;
}

const InsightCard = ({ insight }: { insight: Insight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col h-[400px]">
      {insight.image ? (
        <img src={insight.image} alt={insight.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <span className="inline-block px-2 w-fit py-1 text-xs font-semibold text-white bg-blue rounded-full mb-2">
          {insight.tag}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{insight.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-3 flex-grow">{insight.content}</p>
        <p className="mt-2 text-xs text-gray-500">{insight.date}</p>
      </div>
    </div>
  );
};

export default InsightCard;