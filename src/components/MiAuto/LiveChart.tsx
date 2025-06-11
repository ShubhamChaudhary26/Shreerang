'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#b5b7b9', '#0e4d89', '#087dba', '#d4d4d4'];

// Static data for pie charts
const initialData = COLORS.map((_, index) => ({
  name: `Segment ${index + 1}`,
  value: 100 / COLORS.length + (Math.random() * 20 - 10),
}));

const LiveInfographic = () => {
  const [data] = useState(initialData);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Car Image */}
      <img
        src="/miauto/car1.png"
        alt="Car"
        className="w-[500px] h-auto"
      />

      {/* Front Left Tyre */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="absolute left-[11%] sm:left-[35.5%] bottom-[29%] w-[70px] h-[140px] sm:w-[100px] sm:h-[100px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
            innerRadius={window.innerWidth < 640 ? 15 : 3}
              outerRadius={window.innerWidth < 640 ? 30 : 50}
              paddingAngle={2}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Rear Right Tyre */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="absolute right-[12%] sm:right-[35.5%] bottom-[29%] w-[70px] h-[145px] sm:w-[100px] sm:h-[100px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={window.innerWidth < 640 ? 15 : 3}
              outerRadius={window.innerWidth < 640 ? 30 : 50}
              paddingAngle={2}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default LiveInfographic;