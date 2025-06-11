'use client';

import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { BsDisplay } from 'react-icons/bs';

const COLORS = ['#b5b7b9', '#0e4d89', '#087dba', '#d4d4d4'];

const generateData = () => [
  { name: 'Digital', value: Math.random() * 100 },
  { name: 'TV', value: Math.random() * 100 },
  { name: 'Radio', value: Math.random() * 100 },
  { name: 'Print', value: Math.random() * 100 },
];

const LiveInfographic = () => {
  const [data, setData] = useState(generateData());
  // State to track if the screen is large (corresponds to Tailwind's 'lg' breakpoint)
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Media query for large screens (1024px and above)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // Initial check
    setIsLargeScreen(mediaQuery.matches);

    // Event listener for changes in screen size
    const handler = (event: MediaQueryListEvent) => {
      setIsLargeScreen(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateData());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Outer container for positioning the infographic
    <div className="relative w-full h-fit flex items-center justify-center overflow-hidden py-2 lg:py-4">
      {/* Container for the Monitor Icon and Charts */}
      <div className="relative transition-all duration-500 hover:text-blue hover:scale-90">
        {/* Monitor Icon - Responsive sizing */}
        <BsDisplay className="text-[350px] sm:text-[400px] md:text-[450px] lg:text-[500px] xl:text-[550px]" />

        {/* Chart Grid inside monitor - Responsive positioning and sizing */}
        <div className="absolute
                      top-[25%] left-[20%] w-[60%] h-[35%]                 {/* Mobile / Default */}
                      lg:top-[20%] lg:left-[15%] lg:w-[70%] lg:h-[42%]     {/* Laptop / Large screens */}
                      grid grid-cols-2 grid-rows-2
                      gap-0.5 sm:gap-1 md:gap-2 lg:gap-3">
          {/* Pie Chart */}
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={isLargeScreen ? 10 : 5} 
                  outerRadius={isLargeScreen ? 35 : 20} 
                  paddingAngle={isLargeScreen ? 5 : 1} 
                  isAnimationActive
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % 4]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Chart */}
          <div className="w-full h-full bg-gray-100 rounded-sm p-1 shadow-sm lg:rounded-lg lg:p-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis type="category" dataKey="name" hide />
                <YAxis type="number" dataKey="value" hide />
                <Tooltip />
                <Scatter data={data} fill={COLORS[1]} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="w-full h-full bg-gray-100 rounded-sm p-1 shadow-sm lg:rounded-lg lg:p-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line dataKey="value" stroke="#0e4d89" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInfographic;