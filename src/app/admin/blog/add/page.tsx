'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, Send } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogFormData, BlogStatus } from '@/schema/blog';

export default function AdminAddBlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    category: '',
    content: '',
    status: 'Draft',
    featuredImage: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the file object

  // Fetch existing blog data for editing
  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          setIsLoading(true);
          console.log(`Fetching blog with ID: ${blogId}`);
          const response = await fetch(`/api/blogs/${blogId}`);
          const text = await response.text();
          console.log('Raw response:', text);
          if (response.ok) {
            const data = JSON.parse(text);
            setFormData({
              title: data.blog.title || '',
              slug: data.blog.slug || '',
              category: data.blog.category || 'General',
              content: data.blog.content || '',
              status: data.blog.status || 'Draft',
              featuredImage: data.blog.featuredImage || '',
            });
            setImagePreview(data.blog.featuredImage || null);
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
  }, [blogId]);

  // Auto-generate slug from title for new blogs only
  useEffect(() => {
    if (formData.title && !blogId) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, blogId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    console.log(`Updated ${id}:`, value);
    if (formErrors[id]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the file object
      const previewUrl = URL.createObjectURL(file); // Create a preview URL
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent, submitStatus: BlogStatus) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToValidate: BlogFormData = { ...formData, status: submitStatus };
    const newErrors: Record<string, string> = {};

    if (!dataToValidate.title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (dataToValidate.title.trim().length > 100) {
      newErrors.title = 'Title cannot exceed 10 characters.';
    }

    if (!dataToValidate.slug.trim()) {
      newErrors.slug = 'Slug is required.';
    }

    if (!dataToValidate.content.trim()) {
      newErrors.content = 'Content is required.';
    } else if (dataToValidate.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters long.';
    }

    setFormErrors(newErrors);
    console.log('Form errors:', newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Please correct the form errors before submitting.');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', dataToValidate.title);
      formDataToSend.append('slug', dataToValidate.slug);
      formDataToSend.append('category', dataToValidate.category || 'General');
      formDataToSend.append('content', dataToValidate.content);
      formDataToSend.append('status', submitStatus);
      if (imageFile) {
        formDataToSend.append('featuredImage', imageFile); // Send the file object
      } else if (dataToValidate.featuredImage) {
        formDataToSend.append('featuredImageUrl', dataToValidate.featuredImage); // For edits, send existing URL if no new file
      }

      console.log('Sending data:', formDataToSend);
      const response = await fetch(blogId ? `/api/blogs/${blogId}` : '/api/blogs', {
        method: blogId ? 'PUT' : 'POST',
        body: formDataToSend, // Send as FormData instead of JSON
      });

      const result = await response.json();
      console.log('Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save blog post');
      }

      alert(`Blog post ${blogId ? 'updated' : 'saved'} as ${submitStatus}!`);
      router.push('/admin');
    } catch (error: any) {
      console.error('Error submitting form:', error.message);
      alert(`Failed to ${blogId ? 'update' : 'save'} blog post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 bg-white rounded-lg shadow-sm max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
          {blogId ? 'Edit Blog Post' : 'Add New Blog Post'}
        </h2>
        <Link href="/admin" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
          <ChevronLeft size={16} className="mr-2" /> Back to Dashboard
        </Link>
      </div>

      {isLoading && <div className="p-4 text-center text-gray-500">Loading...</div>}

      <form onSubmit={(e) => handleSubmit(e, formData.status)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            className={`w-full p-3 border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 text-base`}
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog post title"
            disabled={isLoading}
          />
          {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slug"
            className={`w-full p-3 border ${formErrors.slug ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 text-base ${blogId ? '' : 'bg-gray-50 text-gray-600 cursor-not-allowed'}`}
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g., my-awesome-blog-post-title"
            disabled={isLoading || !blogId}
          />
          {formErrors.slug && <p className="text-red-500 text-xs mt-1">{formErrors.slug}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Web Development, UI/UX, Marketing"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <input
            type="file"
            id="featuredImage"
            accept="image/*"
            className="w-full p-3  border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            onChange={handleImageChange}
            disabled={isLoading}
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="h-58 w-full object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            rows={10}
            className={`w-full p-3 border ${formErrors.content ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500 text-base resize-y`}
            value={formData.content}
            onChange={handleChange}
            placeholder="Start writing your blog post here..."
            required
            disabled={isLoading}
          ></textarea>
          {formErrors.content && <p className="text-red-500 text-xs mt-1">{formErrors.content}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-blue-500 text-base appearance-none bg-white pr-8"
            value={formData.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 text-base font-medium"
            onClick={(e) => handleSubmit(e, 'Draft')}
            disabled={isLoading}
          >
            <Save size={18} className="mr-2" /> Save Draft
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-blue text-white rounded-md  transition-colors duration-200 text-base font-medium"
            onClick={(e) => handleSubmit(e, 'Published')}
            disabled={isLoading}
          >
            <Send size={18} className="mr-2" /> Publish Post
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}