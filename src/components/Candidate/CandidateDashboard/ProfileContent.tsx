'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Select, Button, Typography, message } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useUser } from '@/src/hooks/UserContext';
import Cookies from 'js-cookie';
import { Briefcase, FileText, MessageSquare, Bell, User, Play } from 'lucide-react';
import { profileMetrics } from './Profile-Matrix';
import { notifications } from './Notifications';
import Link from 'next/link';
import Head from 'next/head';

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

// Dummy Data for Profile Views Chart
const profileViewsData = [
  { name: 'Jan', views: 200 },
  { name: 'Feb', views: 130 },
  { name: 'Mar', views: 210 },
  { name: 'Apr', views: 360 },
  { name: 'May', views: 200 },
  { name: 'Jun', views: 250 },
];

interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'Published' | 'Draft';
  applicants: string[];
  youtubeLink?: string;
  category?: string;
  startDate?: string;
}

interface User {
  age?: string;
  gender?: string;
  educationLevel?: string;
  jobTitle?: string;
  languages?: string[];
  country?: string;
  candidateLocation?: string;
  fullName?: string;
  appliedProjects?: string[];
}

const { Text, Title } = Typography;

const ProfileContent: React.FC = () => {
  const { userEmail, setUserEmail } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Last 6 Months');
  const [projects, setProjects] = useState<Project[]>([]);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  // Utility function to get YouTube thumbnail URL
  const getYouTubeThumbnailUrl = (url: string) => {
    const videoIdMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      console.log(`Invalid or missing YouTube URL: ${url}`);
      return 'https://via.placeholder.com/480x360?text=No+Video';
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    console.log(`Thumbnail URL for ${url}: ${thumbnailUrl}`);
    return thumbnailUrl;
  };

  // Utility function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      console.log(`Invalid YouTube URL for embed: ${url}`);
      return null;
    }
    return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`;
  };

  // Session handling
  useEffect(() => {
    const session = Cookies.get('session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        if (sessionData.email && sessionData.email !== userEmail) {
          setUserEmail(sessionData.email);
        }
      } catch (err) {
        console.error('Error parsing session cookie:', err);
      }
    } else {
      window.location.href = '/login';
    }
  }, [setUserEmail, userEmail]);

  // Fetch user and project data
  useEffect(() => {
    const fetchData = async () => {
      if (!userEmail) {
        setError('User email not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch user data
        const userResponse = await fetch('/api/user/candidateprofile', { credentials: 'include' });
        if (!userResponse.ok) {
          const contentType = userResponse.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await userResponse.json();
            throw new Error(errorData.message || 'Failed to fetch user data');
          } else {
            const text = await userResponse.text();
            console.error('Non-JSON response from /api/user/candidateprofile:', text);
            throw new Error('Invalid response format from server');
          }
        }
        const userData = await userResponse.json();
        console.log('User data:', userData);
        setUser(userData.user);
        setAppliedProjects(userData.user.appliedProjects || []);

        // Fetch all published projects
        const projectsResponse = await fetch('/api/projects', {
          method: 'GET',
          credentials: 'include',
        });
        if (!projectsResponse.ok) {
          const contentType = projectsResponse.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await projectsResponse.json();
            throw new Error(errorData.message || 'Failed to fetch projects');
          } else {
            const text = await projectsResponse.text();
            console.error('Non-JSON response from /api/projects:', text);
            throw new Error('Invalid response format from server');
          }
        }
        const projectsData = await projectsResponse.json();
        console.log('Projects data:', projectsData);

        // Map projects to include all fields
        const formattedProjects: Project[] = projectsData
          .filter((project: Project) => {
            if (project.status !== 'Published') {
              console.log(`Project ${project._id} filtered out: status=${project.status}`);
              return false;
            }
            console.log(`Project ${project._id} included`);
            return true;
          })
          .map((project: any) => ({
            _id: project._id,
            title: project.title,
            description: project.description,
            status: project.status,
            applicants: project.applicants.map((id: any) => id.toString()),
            youtubeLink: project.youtubeLink || '',
            category: project.category,
            startDate: project.startDate,
          }));

        console.log('Formatted projects:', formattedProjects);
        setProjects(formattedProjects);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  const handleApply = async (projectId: string) => {
    try {
      const response = await fetch('/api/projects/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
        credentials: 'include',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to apply to project');
      }
      setAppliedProjects([...appliedProjects, projectId]);
      message.success('Applied to project successfully!');
    } catch (error: any) {
      message.error(error.message || 'An error occurred while applying to the project');
    }
  };

  const getIconBgClass = (type: string) => {
    switch (type) {
      case 'applied-jobs':
        return 'bg-blue-500/10';
      case 'job-alerts':
        return 'bg-red-500/10';
      case 'messages':
        return 'bg-yellow-500/10';
      case 'shortlist':
        return 'bg-green-500/10';
      default:
        return 'bg-gray-100';
    }
  };

  const getIconColorClass = (type: string): string => {
    switch (type) {
      case 'applied-jobs':
        return 'text-blue-600';
      case 'job-alerts':
        return 'text-red-600';
      case 'messages':
        return 'text-yellow-600';
      case 'shortlist':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Candidate Dashboard</title>
        <meta name="description" content="Explore job opportunities and manage your applications." />
        <meta property="og:title" content="Candidate Dashboard" />
        <meta property="og:description" content="Explore job opportunities and manage your applications." />
        <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Candidate+Dashboard" />
        <meta property="og:url" content="https://yourdomain.com/candidate/dashboard" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Site Name" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Candidate Dashboard" />
        <meta name="twitter:description" content="Explore job opportunities and manage your applications." />
        <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Candidate+Dashboard" />
      </Head>
      <motion.div
        className="min-h-screen flex-1 p-4 sm:p-6 bg-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8 p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Hello, {user?.fullName || userEmail || 'Guest'}</h1>
          <p className="text-gray-500">Ready to explore opportunities?</p>
        </motion.div>

        {/* Metrics Cards Section */}
        {/* <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 px-4"
          variants={containerVariants}
        >
          {profileMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-start space-y-2 border border-gray-200"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <div className={`p-3 rounded-full ${getIconBgClass(metric.id)} flex items-center justify-center`}>
                <metric.icon size={24} className={getIconColorClass(metric.id)} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-4">{metric.value}</p>
              <p className="text-gray-500 text-lg">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Profile Views Chart and Notifications Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
          {/* Profile Views Chart Card */}
          {/* <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Your Profile Views</h3>
              <Select
                defaultValue="Last 6 Months"
                style={{ width: 150 }}
                onChange={(value) => setSelectedPeriod(value as string)}
                className="text-gray-700"
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div> */}

          {/* Notifications Card */}
          {/* <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-start space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    {notification.avatarUrl ? (
                      <img
                        src={notification.avatarUrl}
                        alt={notification.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold rounded-full">
                        {notification.userName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-800">{notification.userName}</span>{' '}
                      applied for a job <span className="font-semibold text-gray-800">{notification.jobTitle || 'Project'}</span>,{' '}
                      <span className="text-gray-500 text-sm">{notification.jobStatus || 'N/A'}</span>
                    </p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div> */}
        </div>

        {/* Projects Section */}
        <motion.div className="px-4 mt-6" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Projects</h3>
          <div className="mb-4">
            <p className="text-gray-700">Total Available Projects: {projects.length}</p>
            <p className="text-gray-700">Applied Projects: {appliedProjects.length}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  variants={cardVariants}
                  custom={index}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                >
                  <Link href="/candidate/projects" className="flex-grow">
                    {playingVideoId === project._id && project.youtubeLink ? (
                      <div className="relative w-full h-40 mb-4">
                        <iframe
                          src={getYouTubeEmbedUrl(project.youtubeLink)}
                          title={project.title}
                          className="w-full h-full rounded-md"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <Button
                          size="small"
                          className="absolute top-2 right-2 bg-gray-800 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingVideoId(null);
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="relative w-full h-40 rounded-md mb-4 cursor-pointer bg-gray-200 flex items-center justify-center text-gray-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (project.youtubeLink) {
                            setPlayingVideoId(project._id);
                          }
                        }}
                      >
                        {project.youtubeLink ? (
                          <>
                            <img
                              src={getYouTubeThumbnailUrl(project.youtubeLink)}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-md"
                              onError={() => console.log(`Failed to load thumbnail for ${project.youtubeLink}`)}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-md">
                              <Play size={40} className="text-white opacity-80 hover:opacity-100" />
                            </div>
                          </>
                        ) : (
                          'No Video'
                        )}
                      </div>
                    )}
                    <Title level={4} className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {project.title}
                    </Title>
                    <Text className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</Text>
                    <div className="flex flex-col space-y-1 mb-4">
                      <Text className="text-xs text-gray-500">
                        <strong>Category:</strong> {project.category || 'N/A'}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        <strong>Start Date:</strong>{' '}
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString('en-GB')
                          : 'N/A'}
                      </Text>
                    </div>
                  </Link>
                  <Button
                    type="primary"
                    onClick={() => handleApply(project._id)}
                    disabled={appliedProjects.includes(project._id)}
                    className="mt-auto"
                  >
                    {appliedProjects.includes(project._id) ? 'Applied' : 'Apply Now'}
                  </Button>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No projects available at the moment.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProfileContent;