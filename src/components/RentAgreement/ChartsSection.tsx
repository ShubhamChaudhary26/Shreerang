'use client';

import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export const ChartsSection = () => {
  const barData = {
    labels: ['Ethical Compliance', 'Training Coverage', 'B2B Evaluation', 'Retail Quality'],
    datasets: [
      {
        label: 'Performance Metrics (%)',
        data: [85, 90, 78, 92],
        backgroundColor: '#087dba',
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ['Urban Locations', 'Remote Areas'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['#0e4d89', '#087dba'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <section className="py-16  mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="h2 text-center mb-10"
      >
        Insights Backed by Data
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="rounded-xl shadow-md p-6"
>
  <h3 className="h3 mb-1">Service Performance Overview</h3>
  <div className="h-[60vh]"> {/* Increase height here */}
    <Bar data={barData} options={{ maintainAspectRatio: false }} />
  </div>
</motion.div>


        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="rounded-xl shadow-md p-6"
>
  <h3 className="h3 mb-1 ">Geographic Reach Distribution</h3>
  <div className="h-[60vh]"> {/* Set desired height */}
    <Pie data={pieData} options={{ maintainAspectRatio: false }} />
  </div>
</motion.div>

      </div>
    </section>
  );
};
