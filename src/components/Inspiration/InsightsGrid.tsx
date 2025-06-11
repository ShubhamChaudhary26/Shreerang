'use client';

import React, { useState, useEffect } from 'react';
import InsightCard from './InspirationCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Interface for Blog data from API (aligned with schema/blog.ts)
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

// Interface for Insight (aligned with InspirationCard.tsx)
interface Insight {
  id: string;
  title: string;
  tag: string;
  date: string;
  image?: string;
  industry: string;
  type: string;
  expertise: string;
  content: string;
}

type Filters = {
  industry?: string;
  type?: string;
  expertise?: string;
};

const InsightsGrid = ({ filters }: { filters: Filters }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data: Blog[] = await res.json();
          // Map blog data to Insight interface
          const formattedInsights: Insight[] = data
            .filter((blog) => blog.status === 'Published')
            .map((blog) => ({
              id: blog._id,
              title: blog.title,
              tag: blog.category || 'Article',
              date: blog.publishedDate
                ? new Date(blog.publishedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'N/A',
              image: blog.featuredImage || undefined,
              industry: blog.category?.toLowerCase() || 'tech',
              type: 'article',
              expertise: blog.category?.toLowerCase() || 'consumer',
              content: blog.content.slice(0, 100) + (blog.content.length > 100 ? '...' : ''),
            }));
          setInsights(formattedInsights);
        } else {
          console.error('Error fetching blogs:', await res.json());
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Apply filters
  const filtered = insights.filter((insight) => {
    return (
      (!filters.industry || insight.industry === filters.industry) &&
      (!filters.type || insight.type === filters.type) &&
      (!filters.expertise || insight.expertise === filters.expertise)
    );
  });

  const visibleInsights = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleInsights.length === 0 ? (
          <div className="col-span-full text-center py-10">
            No insights match your filters.
          </div>
        ) : (
          visibleInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Link href={`/inspiration/preview/${insight.id}`} className="block">
                <InsightCard insight={insight} />
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {visibleCount < filtered.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="b1"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default InsightsGrid;