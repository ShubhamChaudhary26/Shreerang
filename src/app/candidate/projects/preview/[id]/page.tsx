'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Play } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button } from 'antd';
import Head from 'next/head';

// Interface for Project (aligned with assumed project schema)
interface Project {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
  category?: string;
  featuredImage?: string;
  youtubeLink?: string;
}

export default function ProjectPreviewPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/projects/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProject(data.project);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to fetch project');
          }
        } catch (err: any) {
          setError(err.message || 'Error fetching project');
        } finally {
          setIsLoading(false);
        }
      };
      fetchProject();
    }
  }, [id]);

  // Generate OG tags dynamically
  const ogTitle = project?.title || 'Project Preview';
  const ogDescription = project?.content ? project.content.slice(0, 160) + (project.content.length > 160 ? '...' : '') : 'Explore this project.';
  const ogImage = project?.youtubeLink
    ? getYouTubeThumbnailUrl(project.youtubeLink)
    : project?.featuredImage || 'https://via.placeholder.com/1200x630?text=Project+Image';
  const ogUrl = `https://yourdomain.com/candidate/projects/preview/${id || ''}`;

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Your Site Name" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-4 mt-[100px] md:p-8 bg-gray-50 min-h-screen"
      >
        <Link
          href="/candidate/candidatedashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Projects
        </Link>

        {isLoading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : !project ? (
          <div className="text-center text-gray-500 py-10">Project not found.</div>
        ) : (
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.youtubeLink ? (
              isVideoPlaying ? (
                <div className="relative w-full h-64 md:h-96">
                  <iframe
                    src={getYouTubeEmbedUrl(project.youtubeLink)}
                    title={project.title}
                    className="w-full h-full rounded-t-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <Button
                    size="small"
                    className="absolute top-2 right-2 bg-gray-800 text-white"
                    onClick={() => setIsVideoPlaying(false)}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div
                  className="relative w-full h-64 md:h-96 cursor-pointer bg-gray-200 flex items-center justify-center text-gray-400"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img
                    src={getYouTubeThumbnailUrl(project.youtubeLink)}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-t-md"
                    onError={() => console.log(`Failed to load thumbnail for ${project.youtubeLink}`)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-t-md">
                    <Play size={40} className="text-white opacity-80 hover:opacity-100" />
                  </div>
                </div>
              )
            ) : project.featuredImage ? (
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center text-gray-400 rounded-t-md">
                No Image
              </div>
            )}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {project.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-4">
                  <span>By {project.author}</span>
                  <span>
                    {project.publishedDate
                      ? new Date(project.publishedDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </div>
                {project.category && (
                  <span className="mt-2 sm:mt-0 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                )}
              </div>
              <div className="prose prose-lg text-gray-700 whitespace-pre-wrap">
                {project.content}
              </div>
            </div>
          </article>
        )}
      </motion.div>
    </>
  );
}