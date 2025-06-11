// File: app/admin/blog/preview/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  publishedDate: string;
  status: 'Published' | 'Draft';
  category?: string;
  featuredImage?: string; // Changed from image to featuredImage
}

export default function BlogPreviewPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          setIsLoading(true);
          console.log(`Fetching blog with ID: ${id}`);
          const response = await fetch(`/api/blogs/${id}`);
          const text = await response.text();
          console.log('Raw response:', text);
          if (response.ok) {
            const data = JSON.parse(text);
            setBlog({
              _id: data.blog._id,
              title: data.blog.title,
              content: data.blog.content,
              author: data.blog.author,
              slug: data.blog.slug,
              publishedDate: new Date(data.blog.publishedDate).toISOString().split('T')[0],
              status: data.blog.status || 'Published',
              category: data.blog.category || 'General',
              featuredImage: data.blog.featuredImage || undefined,
            });
            console.log('Blog data set:', data.blog);
          } else {
            const errorData = JSON.parse(text);
            console.log('Error response:', errorData);
            alert(`Failed to fetch blog: ${errorData.message || 'Unknown error'}`);
          }
        } catch (error: any) {
          console.error('Error fetching blog:', error);
          alert(`Error fetching blog: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlog();
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
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Blog Preview</h2>
        <Link href="/admin" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
          <ChevronLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : !blog ? (
        <div className="p-4 text-center text-gray-500">Blog not found.</div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Title</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{blog.title}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Slug</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{blog.slug}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Author</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{blog.author}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{blog.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Published Date</h3>
            <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{blog.publishedDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <p className={`p-3 bg-gray-50 rounded-lg text-gray-800 inline-flex ${
              blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>{blog.status}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Featured Image</h3>
            <div className="relative h-58 w-full rounded-lg overflow-hidden">
              {blog.featuredImage ? (
                <img src={blog.featuredImage} alt={blog.title} className="h-full w-full object-cover rounded-lg" />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">No Image</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Content</h3>
            <div className="p-3 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-wrap">{blog.content}</div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Link href={`/admin/blog/add?id=${blog._id}`} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-base font-medium">
              Edit Blog
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}