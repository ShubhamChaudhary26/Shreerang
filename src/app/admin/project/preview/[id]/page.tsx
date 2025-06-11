'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft';
  startDate?: string;
  featuredImage?: string; // Changed from image to featuredImage
}

export default function ProjectPreviewPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          setIsLoading(true);
          console.log(`Fetching project with ID: ${id}`);
          const response = await fetch(`/api/projects/${id}`);
          const text = await response.text();
          console.log('Raw response:', text);
          if (response.ok) {
            const data = JSON.parse(text);
            setProject({
              _id: data.project._id,
              title: data.project.title,
              description: data.project.description,
              author: data.project.author,
              category: data.project.category || 'General',
              status: data.project.status || 'Published',
              startDate: data.project.startDate ? new Date(data.project.startDate).toISOString().split('T')[0] : '',
              featuredImage: data.project.featuredImage || undefined,
            });
            console.log('Project data set:', data.project);
          } else {
            const errorData = JSON.parse(text);
            console.log('Error response:', errorData);
            alert(`Failed to fetch project: ${errorData.message || 'Unknown error'}`);
          }
        } catch (error: any) {
          console.error('Error fetching project:', error);
          alert(`Error fetching project: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProject();
    }
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-white rounded-lg shadow-sm max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Project Preview</h2>
        <Link href="/admin/project" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
          <ChevronLeft size={16} className="mr-2" /> Back to Project Dashboard
        </Link>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : !project ? (
        <div className="p-4 text-center text-gray-500">Project not found.</div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Title</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{project.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <div className="p-3 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">{project.description}</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Author</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{project.author}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{project.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Start Date</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{project.startDate || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <p className={`p-3 bg-gray-50 rounded-lg text-gray-800 inline-flex ${
              project.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>{project.status}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Featured Image</h3>
            {project.featuredImage ? (
              <img src={project.featuredImage} alt={project.title} className="h-58 w-full object-cover rounded-lg" />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg text-gray-800">No image available</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Link href={`/admin/project/add?id=${project._id}`} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-base font-medium">
              Edit Project
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}