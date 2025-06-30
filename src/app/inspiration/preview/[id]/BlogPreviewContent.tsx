'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// Interface for Blog
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
  category?: string;
  featuredImage?: string;
}

export default function BlogPreviewContent({ blog }: { blog: Blog | null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      setIsLoading(false);
      // Debug the featuredImage value
      console.log('Featured Image:', blog.featuredImage);
    } else {
      setError('Failed to load blog');
      setIsLoading(false);
    }
  }, [blog]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 md:p-8 mt-20 bg-gray-50 min-h-screen"
    >
      <Link
        href="/inspiration"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-sm font-medium"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Inspiration
      </Link>

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : !blog ? (
        <div className="text-center text-gray-500 py-10">Blog not found.</div>
      ) : (
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                console.error('Failed to load image:', blog.featuredImage);
                e.currentTarget.src = '/images/default-blog-image.jpg'; // Fallback image
              }}
            />
          )}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-4">
                <span>By {blog.author}</span>
                <span>
                  {blog.publishedDate
                    ? new Date(blog.publishedDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </span>
              </div>
              {blog.category && (
                <span className="mt-2 sm:mt-0 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
              )}
            </div>
            <div className="prose prose-lg text-gray-700 whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </article>
      )}
    </motion.div>
  );
}