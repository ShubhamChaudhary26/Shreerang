'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { useUser } from '@/src/hooks/UserContext';

interface Project {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
  category?: string;
  location?: string;
  featuredImage?: string;
  demographics?: {
    age?: string[];
    gender?: string[];
    educationLevel?: string[];
    employmentStatus?: string[];
  };
}

interface ProjectCardProps {
  id: string;
  title: string;
  tag: string;
  date: string;
  image?: string;
  content: string;
}

const ProjectsSection = () => {
  const { userEmail } = useUser();
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/user/candidateprofile', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          const { user } = await res.json();
          const requiredFields = [
            'fullName', 'jobTitle', 'phone', 'email', 'experience', 'profession',
            'educationLevel', 'languages', 'age', 'gender', 'maritalStatus',
            'employmentStatus', 'candidateLocation', 'preferredCategories',
          ];
          const isComplete = requiredFields.every(field => {
            if (field === 'preferredCategories') {
              return Array.isArray(user[field]) && user[field].length > 0;
            }
            return user[field] && user[field] !== '';
          });
          setProfileComplete(isComplete);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!profileComplete || !userEmail) {
      setIsLoading(false);
      setError('Complete your profile to view projects');
      return;
    }

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching projects from /api/projects...');
        const userRes = await fetch('/api/user/candidateprofile', {
          method: 'GET',
          credentials: 'include',
        });
        if (!userRes.ok) {
          throw new Error('Failed to fetch user data');
        }
        const { user } = await userRes.json();

        const res = await fetch('/api/projects', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('API response status:', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('API response data:', data);
          const formattedProjects: ProjectCardProps[] = data
            .filter((project: Project) => {
              if (project.status !== 'Published') return false;
              const locationMatch = !project.location || project.location.toLowerCase() === user.candidateLocation.toLowerCase();
              const categoryMatch = !project.category || user.preferredCategories.includes(project.category);
              const demographicMatch = !project.demographics || (
                (!project.demographics.age || project.demographics.age.includes(user.age)) &&
                (!project.demographics.gender || project.demographics.gender.includes(user.gender)) &&
                (!project.demographics.educationLevel || project.demographics.educationLevel.includes(user.educationLevel)) &&
                (!project.demographics.employmentStatus || project.demographics.employmentStatus.includes(user.employmentStatus))
              );
              console.log(`Project ${project._id}: location=${locationMatch}, category=${categoryMatch}, demographics=${demographicMatch}`);
              return locationMatch && categoryMatch && demographicMatch;
            })
            .map((project: Project) => ({
              id: project._id,
              title: project.title || 'Untitled',
              tag: project.category || 'Project',
              date: project.publishedDate
                ? new Date(project.publishedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A',
              image: project.featuredImage || undefined,
              content: project.content ? project.content.slice(0, 80) + (project.content.length > 80 ? '...' : '') : 'No content',
            }));
          console.log('Formatted projects:', formattedProjects);
          setProjects(formattedProjects);
          setError(null);
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
  }, [profileComplete, userEmail]);

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <Briefcase size={20} className="mr-2 text-blue-600" /> Your Projects
        </h3>
        {projects.length > 4 && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View More
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="text-center text-gray-500 py-4">Loading projects...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : visibleProjects.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No matching projects found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              custom={index}
              className="bg-gray-50 rounded-lg p-4 flex flex-col h-[200px]"
            >
              <Link href={`/candidate/projects/preview/${project.id}`} className="flex-grow">
                <div className="flex items-center mb-2">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                  <h4 className="text-base font-semibold text-gray-800 line-clamp-1">
                    {project.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{project.content}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{project.date}</span>
                  <span className="text-xs text-white bg-blue-600 rounded-full px-2 py-1">
                    {project.tag}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsSection;