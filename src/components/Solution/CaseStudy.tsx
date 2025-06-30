// components/CaseStudiesSection.tsx
"use client";

import { useState, useEffect } from "react";
import ScrollFadeIn from "../../hooks/ScrollFadeIn";
import Link from "next/link";

interface Blog {
  title: string;
  slug: string;
  featuredImage?: string;
}

export default function CaseStudiesSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCount, setCurrentCount] = useState(6); // Initial number of blogs to display

  const blogsPerLoad = 6; // Number of blogs to load each time

  // Fetch all blogs from the API
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data: Blog[] = await response.json();
        setBlogs(data);
        setDisplayedBlogs(data.slice(0, currentCount)); // Show first 6 blogs initially
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    const newCount = currentCount + blogsPerLoad;
    setDisplayedBlogs(blogs.slice(0, newCount)); // Add next 6 blogs
    setCurrentCount(newCount);
  };

  if (loading) {
    return (
      <section className="py-16 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">Loading...</div>
      </section>
    );
  }

  if (error || blogs.length === 0) {
    return (
      <section className="py-16 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          {error || "No blogs available."}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollFadeIn delay={0.2}>
          <h2 className="h2">All Blogs</h2>
        </ScrollFadeIn>

        {/* Blog Grid */}
        <Link  href={'./inspiration#blog'}> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedBlogs.map((item, index) => (
            <ScrollFadeIn key={item.slug} delay={0.6 + index * 0.1}>
              <div className="relative rounded-md overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out hover:scale-[1.02]">
                <img
                  src={item.featuredImage || "/placeholder-image.png"} // Fallback image
                  alt={item.title}
                  className="w-full h-[280px] sm:h-[300px] md:h-[330px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 dark z-10">
                  <h3 className="p2 dark">{item.title}</h3>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
        </Link>

        {/* Load More */}
        {currentCount < blogs.length && ( // Show button only if more blogs are available
          <div className="flex justify-center mt-12">
            <ScrollFadeIn delay={0.2 + displayedBlogs.length * 0.1}>
              <button
                onClick={handleLoadMore}
                className="b1 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Load More
              </button>
            </ScrollFadeIn>
          </div>
        )}
      </div>
    </section>
  );
}