'use client';

import { useEffect, useState } from 'react';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-6">
          {/* Glowing blue gradient ring */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-blue-900 border-r-blue-900 animate-spin" />
            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="w-3 h-3 bg-blue-900 rounded-full animate-ping" />
            </div>
          </div>

          {/* Site Title with fade-in + scale effect */}
          <h1 className="text-3xl font-bold text-blue-900 tracking-wider animate-[fadeInScale_1s_ease-in-out]">
          Loading Shreerang...
          </h1>
        </div>
      ) : (
        children
      )}
    </>
  );
}
