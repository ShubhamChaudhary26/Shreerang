'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PublicationItem {
  image: string;
  title: string;
  description: string;
  type: 'Article' | 'Report' | string;
  date: string;
  link: string;
}

interface RecentPublicationsProps {
  heading: string;
}

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const RecentPublications = ({ heading }: RecentPublicationsProps) => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs/');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();

        // Map the blog data to the PublicationItem interface
        const mappedPublications: PublicationItem[] = data.map((blog: any) => ({
          image: blog.featuredImage || '/placeholder-image.jpg', // Fallback image if none exists
          title: blog.title || 'Untitled',
          description: blog.content.slice(0, 100) + '...' || 'No description available', // Truncate content for description
          type: blog.category || 'Article', // Use category as type, default to 'Article'
          date: blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'Unknown Date', // Format date from createdAt
          link: `/shop/${blog._id}`, // Adjust link based on your routing
        }));

        setPublications(mappedPublications);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPublications();
  }, []); // Empty dependency array to run once on mount

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.h2
        className="h2 light mb-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {heading}
      </motion.h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : publications.length === 0 ? (
        <div className="text-center text-gray-500">No publications found</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {publications.map((item, idx) => (
  <Link href={item.link} key={idx}>
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-light rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover transition-transform duration-300"
        whileHover={{ scale: 1.05 }}
      />
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="h3">{item.title}</h3>
            <span className="bg-blue dark p2 px-2 py-1 rounded-full">
              {item.type}
            </span>
          </div>
          <p className="p2">{item.description}</p>
        </div>
      </div>
    </motion.div>
  </Link>
))}

        </motion.div>
      )}
    </section>
  );
};