'use client';

import { useEffect, useState } from 'react';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50  flex flex-col items-center justify-center gap-4">
          {/* Chart-style loading bars */}
          <div className="flex items-end gap-1 h-12">
            <div className="w-2 h-4 bg-dark animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-6 bg-dark animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-10 bg-dark animate-bounce [animation-delay:0.3s]" />
            <div className="w-2 h-6 bg-dark animate-bounce [animation-delay:0.4s]" />
            <div className="w-2 h-4 bg-dark animate-bounce [animation-delay:0.5s]" />
          </div>
          <p className="h5 ">Loading MintSurvey...</p>
        </div>
      ) : (
        children
      )}
    </>
  );
}
