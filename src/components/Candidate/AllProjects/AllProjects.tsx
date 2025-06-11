'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Play } from 'lucide-react';
import { Typography, Button, message } from 'antd';
import Head from 'next/head';
import Sidebar from '../CandidateDashboard/SideBar';

const { Text, Title } = Typography;

interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'Published' | 'Draft';
  category?: string;
  startDate?: string;
  youtubeLink?: string;
  applicants: string[];
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  youtubeLink?: string;
  applicants: string[];
}

const Allprojects = () => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [playingVideoId, setPlayingVideoId] = useState<string>('');

  // Animation variants
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

  // Utility function to get YouTube thumbnail URL
  const getYouTubeThumbnailUrl = (url: string) => {
    const videoIdMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      console.log(`Invalid YouTube URL: ${url}`);
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

  // Fetch projects and applied projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching projects from /api/projects...');
        const res = await fetch('/api/projects', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        console.log('API response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('API response data:', data);
          const formattedProjects: ProjectCardProps[] = data
            .filter((project: Project) => {
              const isPublished = project.status === 'Published';
              console.log(`Project ${project._id}: status=${project.status}, published=${isPublished}`);
              return isPublished;
            })
            .map((project: Project) => ({
              id: project._id,
              title: project.title || 'Untitled',
              description: project.description ? project.description.slice(0, 80) + (project.description.length > 80 ? '...' : '') : 'No description',
              category: project.category || 'Project',
              startDate: project.startDate
                ? new Date(project.startDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A',
              youtubeLink: project.youtubeLink,
              applicants: project.applicants || [],
            }));
          console.log('Formatted projects:', formattedProjects);
          setProjects(formattedProjects);
          setError(null);

          // Fetch user data to get applied projects
          const userResponse = await fetch('/api/user/candidateprofile', { credentials: 'include' });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setAppliedProjects(userData.user.appliedProjects || []);
          }
        } else {
          const errorData = await res.json();
          const errorMsg = errorData.message || `API error: ${res.status}`;
          console.error('API error:', errorMsg);
          setError(errorMsg);
        }
      } catch (error: any) {
        const errorMsg = error.message || 'Failed to fetch projects';
        console.error('Fetch error:', errorMsg);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

  const visibleProjects = projects.slice(0, visibleCount);
  const ogImage = projects.length > 0 && projects[0].youtubeLink
    ? getYouTubeThumbnailUrl(projects[0].youtubeLink)
    : 'https://via.placeholder.com/1200x630?text=Projects';

  return (
    <>
    <div className="flex min-h-screen bg-gray-50 mt-2" >

    
      <Head>
        <title>Explore Projects</title>
        <meta name="description" content="Discover a wide range of projects and opportunities." />
        <meta property="og:title" content="Explore Projects" />
        <meta property="og:description" content="Discover a wide range of projects and opportunities." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content="https://yourdomain.com/candidate/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Your Site Name" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Explore Projects" />
        <meta name="twitter:description" content="Discover a wide range of projects and opportunities." />
        <meta name="twitter:image" content={ogImage} />
      </Head>
        <div className="mt-20 px-2 py-2">
        <Sidebar />
      </div>
      <motion.div
        className=" rounded-xl  p-6 mt-20  mb-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Briefcase size={20} className="mr-2 text-blue-600" /> Projects
          </h3>
          {projects.length > 4 && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="text-lg text-blue-600 hover:text-blue-800 font-medium"
            >
              View More
            </button>
          )}
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : visibleProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No projects available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                custom={index}
                className="bg-gray-50 rounded-lg p-4 flex flex-col"
              >
                {playingVideoId === project.id && project.youtubeLink ? (
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
                        setPlayingVideoId('');
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
                        setPlayingVideoId(project.id);
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
                <Link href={`/candidate/projects/preview/${project.id}`} className="flex-grow">
                  <div className="flex flex-col">
                    <Title level={4} className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                      {project.title}
                    </Title>
                    <Text className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</Text>
                    <div className="flex flex-col space-y-1">
                      <Text className="text-xs text-gray-500">
                        <strong>Category:</strong> {project.category}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        <strong>Start Date:</strong> {project.startDate}
                      </Text>
                    </div>
                  </div>
                </Link>
                <Button
                  type="primary"
                  onClick={() => handleApply(project.id)}
                  disabled={appliedProjects.includes(project.id)}
                  className="mt-auto"
                >
                  {appliedProjects.includes(project.id) ? 'Applied' : 'Apply Now'}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      </div>
    </>
  );
};

export default Allprojects;