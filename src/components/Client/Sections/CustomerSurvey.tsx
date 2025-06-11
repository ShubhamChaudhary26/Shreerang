'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Select, Tooltip as AntTooltip } from 'antd';
import { Chart } from 'react-google-charts';
import { useUser } from '@/src/hooks/UserContext';
import Cookies from 'js-cookie';
import { Briefcase, Bell, MessageSquare, User } from 'lucide-react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ComposedChart, Legend, Radar, Tooltip
} from 'recharts';
// import SurveyMap from '../SurveyMap';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      duration: 0.5,
    },
  },
};

// Defined color palette
const COLORS = ['#087dba', '#0e4d89', '#b5b7b9', '#d4d4d4', '#d4d4d4', '#087dba'];

// Gantt Chart Data
const ganttData: any[][] = [
  [
    { type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'string', label: 'Resource' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },
  ],
  ['RTD', 'Research Tool Design', 'Development', new Date(2025, 5, 13), new Date(2025, 5, 20), null, 60, null],
  ['FTB', 'Field Team Briefing', 'Training', new Date(2025, 5, 21), new Date(2025, 5, 22), null, 100, 'RTD'],
  ['DC', 'Data Collection', 'Fieldwork', new Date(2025, 5, 23), new Date(2025, 6, 5), null, 30, 'FTB'],
  ['QC', 'Quality Check', 'Quality', new Date(2025, 6, 6), new Date(2025, 6, 10), null, 20, 'DC'],
  ['DA', 'Data Analysis', 'Analysis', new Date(2025, 6, 11), new Date(2025, 6, 20), null, 15, 'QC'],
  ['RD', 'Report Drafting', 'Documentation', new Date(2025, 6, 21), new Date(2025, 6, 28), null, 10, 'DA'],
  ['CP', 'Client Presentation', 'Meetings', new Date(2025, 6, 29), new Date(2025, 6, 30), null, 5, 'RD'],
  ['CR', 'Client Revisions', 'Documentation', new Date(2025, 7, 1), new Date(2025, 7, 5), null, 0, 'CP'],
  ['PC', 'Project Closure', 'Meetings', new Date(2025, 7, 6), new Date(2025, 7, 7), null, 0, 'CR'],
];

// Gantt Chart Options
const ganttOptions = {
  height: 320,
  gantt: {
    trackHeight: 28,
    labelStyle: {
      fontName: 'Arial',
      fontSize: 12,
      color: '#0e4d89', // Changed to blue
    },
    barCornerRadius: 4,
    criticalPathEnabled: true,
    criticalPathStyle: {
      stroke: '#087dba',
      strokeWidth: 2,
    },
    arrow: {
      angle: 45,
      width: 2,
      color: '#b5b7b9',
      radius: 0,
    },
    palette: [
      { color: '#0e4d89', dark: '#087dba', light: '#d4d4d4' },
      { color: '#0e4d89', dark: '#087dba', light: '#b5b7b9' },
      { color: '#0e4d89', dark: '#087dba', light: '#0e4d89' },
      { color: '#0e4d89', dark: '#087dba', light: '#0e4d89' },
      { color: '#0e4d89', dark: '#087dba', light: '#d4d4d4' },
    ],
  },
};

// Profile Views Data
const profileViewsData: Array<{ name: string; views: number; uniqueVisitors: number }> = [
  { name: 'Jan', views: 200, uniqueVisitors: 150 },
  { name: 'Feb', views: 130, uniqueVisitors: 100 },
  { name: 'Mar', views: 210, uniqueVisitors: 160 },
  { name: 'Apr', views: 360, uniqueVisitors: 280 },
  { name: 'May', views: 200, uniqueVisitors: 140 },
  { name: 'Jun', views: 250, uniqueVisitors: 190 },
];

// New Stats Data
const additionalMetrics: Array<{
  id: string;
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}> = [
  { id: 'applied-Survey', label: 'Applied Survey', value: 22, icon: Briefcase },
  { id: 'Research-alerts', label: 'Research Alerts', value: 9382, icon: Bell },
  { id: 'messages', label: 'Messages', value: 74, icon: MessageSquare },
  { id: 'shortlist', label: 'Shortlist', value: 32, icon: User },
];

const ProfileContent: React.FC = () => {
  const { userEmail, setUserEmail } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Last 6 Months');

  useEffect(() => {
    const sessionEmail = Cookies.get('session');
    if (sessionEmail && sessionEmail !== userEmail) {
      setUserEmail(sessionEmail);
    }
  }, [setUserEmail, userEmail]);

  // Helper functions for styling
  const getIconBgClass = (type: string): string => {
    switch (type) {
      case 'applied-Survey': return 'bg-[#087dba]/10';
      case 'Research-alerts': return 'bg-[#0e4d89]/10';
      case 'messages': return 'bg-[#b5b7b9]/10';
      case 'shortlist': return 'bg-[#d4d4d4]/10';
      default: return 'bg-[#b5b7b9]/10';
    }
  };

  const getIconColorClass = (type: string): string => {
    switch (type) {
      case 'applied-Survey': return 'text-[#087dba]';
      case 'Research-alerts': return 'text-[#0e4d89]';
      case 'messages': return 'text-[#b5b7b9]';
      case 'shortlist': return 'text-[#d4d4d4]';
      default: return 'text-[#b5b7b9]';
    }
  };

  return (
    <motion.div
      className="flex-1 p-4 sm:p-6 bg-[#F9FAFB]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8 p-4">
        <h1 className="text-4xl font-bold text-[#0e4d89] mb-2">Hello, UserName</h1>
        <p className="text-[#b5b7b9]">Ready to jump back in?</p>
      </motion.div>

      {/* Stats Cards Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-10 px-0"
        variants={containerVariants}
      >
        {additionalMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className="bg-[#ffffff] rounded-xl shadow-sm p-6 flex flex-col items-start space-y-2 border border-[#d4d4d4]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <div className={`p-3 rounded-full ${getIconBgClass(metric.id)} flex items-center justify-center`}>
              <metric.icon size={24} className={getIconColorClass(metric.id)} />
            </div>
            <p className="text-3xl font-bold text-[#0e4d89] mt-4">{metric.value}</p>
            <p className="text-[#b5b7b9] text-lg">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Gantt Chart Section */}
      <motion.div
        className="lg:col-span-2 bg-[#ffffff] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="h4 font-semibold text-[#0e4d89]">Project Timeline</h3>
          <Select
            defaultValue="Last 6 Months"
            style={{ width: 150 }}
            onChange={(value: string) => setSelectedPeriod(value)}
            className="text-[#b5b7b9]"
          >
            <Select.Option value="Last 6 Months">Last 6 Months</Select.Option>
            <Select.Option value="Last 3 Months">Last 3 Months</Select.Option>
            <Select.Option value="Last 12 Months">Last 12 Months</Select.Option>
          </Select>
        </div>
        <div style={{ width: '100%', height: 300 }}>
          <Chart
            chartType="Gantt"
            width="100%"
            height="300px"
            data={ganttData}
            options={ganttOptions}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 mt-20 lg:grid-cols-3 gap-6 px-4">
        {/* Profile Views Line Chart Card */}
        <motion.div
          className="lg:col-span-2 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Your Profile Views</h3>
            <Select
              defaultValue="Last 6 Months"
              style={{ width: 150 }}
              onChange={(value: string) => setSelectedPeriod(value)}
              className="text-[#b5b7b9]"
            >
              <Select.Option value="Last 6 Months">Last 6 Months</Select.Option>
              <Select.Option value="Last 3 Months">Last 3 Months</Select.Option>
              <Select.Option value="Last 12 Months">Last 12 Months</Select.Option>
            </Select>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#087dba"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#087dba', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#087dba', strokeWidth: 2, stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profile Views Pie Chart Card */}
        <motion.div
          className="lg:col-span-1 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views Breakdown</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={profileViewsData}
                  dataKey="views"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#087dba"
                  label
                >
                  {profileViewsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profile Views Bar Chart Card */}
        <motion.div
          className="lg:col-span-2 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views by Month (Bar)</h3>
            <Select
              defaultValue="Last 6 Months"
              style={{ width: 150 }}
              onChange={(value: string) => setSelectedPeriod(value)}
              className="text-[#b5b7b9]"
            >
              <Select.Option value="Last 6 Months">Last 6 Months</Select.Option>
              <Select.Option value="Last 3 Months">Last 3 Months</Select.Option>
              <Select.Option value="Last 12 Months">Last 12 Months</Select.Option>
            </Select>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Bar dataKey="views" fill="#087dba" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Profile Views Area Chart Card */}
        <motion.div
          className="lg:col-span-1 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views Trend</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#087dba"
                  fill="#087dba"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Scatter Chart Card */}
        <motion.div
          className="lg:col-span-2 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views Scatter</h3>
            <Select
              defaultValue="Last 6 Months"
              style={{ width: 150 }}
              onChange={(value: string) => setSelectedPeriod(value)}
              className="text-[#b5b7b9]"
            >
              <Select.Option value="Last 6 Months">Last 6 Months</Select.Option>
              <Select.Option value="Last 3 Months">Last 3 Months</Select.Option>
              <Select.Option value="Last 12 Months">Last 12 Months</Select.Option>
            </Select>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Scatter dataKey="views" data={profileViewsData} fill="#087dba" shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar Chart Card */}
        <motion.div
          className="lg:col-span-1 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views Radar</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profileViewsData}>
                <PolarGrid stroke="#d4d4d4" />
                <PolarAngleAxis dataKey="name" stroke="#b5b7b9" />
                <PolarRadiusAxis angle={30} domain={[0, 400]} stroke="#b5b7b9" />
                <Radar
                  name="Views"
                  dataKey="views"
                  stroke="#087dba"
                  fill="#087dba"
                  fillOpacity={0.3}
                />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Composed Chart Card */}
        <motion.div
          className="lg:col-span-2 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Profile Views & Unique Visitors (Composed)</h3>
            <Select
              defaultValue="Last 6 Months"
              style={{ width: 150 }}
              onChange={(value: string) => setSelectedPeriod(value)}
              className="text-[#b5b7b9]"
            >
              <Select.Option value="Last 6 Months">Last 6 Months</Select.Option>
              <Select.Option value="Last 3 Months">Last 3 Months</Select.Option>
              <Select.Option value="Last 12 Months">Last 12 Months</Select.Option>
            </Select>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Legend />
                <Bar dataKey="views" fill="#087dba" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="uniqueVisitors" stroke="#0e4d89" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Stacked Bar Chart Card */}
        <motion.div
          className="lg:col-span-1 bg-[#ffffff] mb-[100px] rounded-xl shadow-md p-6 border border-[#d4d4d4]"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="h4 font-semibold text-[#0e4d89]">Views vs Unique Visitors</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={profileViewsData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d4d4d4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <YAxis axisLine={false} tickLine={false} stroke="#b5b7b9" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d4d4d4' }} />
                <Legend />
                <Bar dataKey="views" stackId="a" fill="#087dba" radius={[0, 0, 0, 0]} />
                <Bar dataKey="uniqueVisitors" stackId="a" fill="#0e4d89" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* <SurveyMap mapColor="#808080" /> */}
    </motion.div>
  );
};

export default ProfileContent;