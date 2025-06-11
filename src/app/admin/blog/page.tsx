'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlusCircleIcon, Edit, Trash2, BookOpen, Eye, Globe, Share2 } from 'lucide-react';

// Interface for Blog (aligned with schema)
interface Blog {
  _id: string;
  title: string;
  content: string;
  author?: string;
  slug: string;
  publishedDate?: string;
  status: 'Published' | 'Draft';
  category?: string;
  featuredImage?: string;
}

// Dummy Metrics for Dashboard
const DUMMY_METRICS = [
  {
    id: '1',
    title: 'Total Blogs',
    value: 75,
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: '2',
    title: 'Published Blogs',
    value: 60,
    icon: Globe,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: '3',
    title: 'Total Views',
    value: '8.3k',
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple50',
  },
  {
    id: '4',
    title: 'Shares',
    value: 30,
    icon: Share2,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function BlogDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          const formattedBlogs = data.map((blog: any) => ({
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author || 'Unknown',
            slug: blog.slug,
            publishedDate: blog.publishedDate ? new Date(blog.publishedDate).toISOString().split('T')[0] : 'N/A',
            status: blog.status || 'Published',
            category: blog.category || 'General',
            featuredImage: blog.featuredImage || undefined,
          }));
          setBlogs(formattedBlogs);
        } else {
          console.error('Error fetching blogs:', await res.json());
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleBlogDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete this blog post?`)) {
      try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setBlogs(blogs.filter((blog) => blog._id !== id));
          alert('Blog deleted successfully!');
        } else {
          console.error('Error deleting blog:', await res.json());
          alert('Failed to delete blog.');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-white rounded-lg shadow-sm"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Blog Dashboard</h2>
        <Link href="blog/add" className="inline-flex items-center px-4 py-2 bg-blue text-white rounded-full  transition-colors duration-200 text-sm font-medium">
          <PlusCircleIcon size={16} className="mr-2" /> Add New Blog
        </Link>
      </div>

      {/* Blog Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {DUMMY_METRICS.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: parseFloat(metric.id) * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`p-3 rounded-full ${metric.bgColor}`}>
              <metric.icon size={24} className={metric.color} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Posts Table */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Blog Posts</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Image</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Title</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600 hidden md:table-cell">Category</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600 hidden sm:table-cell">Date</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={listVariants} initial="hidden" animate="visible" className="divide-y divide-gray-100">
              {blogs.map((post) => (
                <motion.tr
                  key={post._id}
                  variants={itemVariants}
                  className="bg-white hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded-md overflow-hidden">
                      {post.featuredImage ? (
                        <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        <div className="text-xs text-gray-500 hidden md:block">by {post.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">{post.category}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{post.publishedDate}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/blog`} className="text-blue-600 mr-4 inline-flex items-center hover:text-blue-800">
                      <Share2 size={16} className="mr-1" /> Share
                    </Link>
                    <Link href={`blog/preview/${post._id}`} className="text-indigo-600 mr-4 inline-flex items-center hover:text-indigo-800">
                      <Eye size={16} className="mr-1" /> Preview
                    </Link>
                    <Link href={`blog/add?id=${post._id}`} className="text-blue-600 mr-4 inline-flex items-center hover:text-blue-800">
                      <Edit size={16} className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleBlogDelete(post._id)}
                      className="text-red-600 hover:text-red-900 inline-flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
          {blogs.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No recent blog posts found.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}