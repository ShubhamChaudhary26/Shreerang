"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cardVariants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 1.2 },
  },
};

interface Blog {
  _id: string;
  title: string;
  content: string;
  featuredImage?: string;
  category?: string;
  createdAt: string;
}

const InsightsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs/");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        // Sort by createdAt in descending order and take the latest 2
        const sortedBlogs = data
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2);
        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full py-10 md:py-20 bg-light px-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="h2 text-center">
          From Data to Decisions: MintSurvey’s Marketing Edge
        </h2>
<Link href={'./inspiration#blog'}> 
         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 mt-10">
          {/* First Card - Static */}
          <motion.div
            className="md:col-span-2 rounded-xl h-auto md:h-80 overflow-hidden shadow-md"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="p-4 md:p-6 flex-1 overflow-auto">
                {/* <span className="h5 mt-4 md:mt-6 !mb-0">Featured</span> */}
                <h3 className="h3">
                  MintSurvey turns data into actionable insights, fueling data-driven strategies that outpace competitors. {" "}
                  
                </h3>
                <p className="p2 !mt-2">
                  With a blend of quantitative, qualitative research, and social media listening,  <br className="hidden md:inline" />
                  we provide a comprehensive view of market trends and consumer behavior.
                </p>
                <p className="p2 !mt-2 hidden sm:block">
                  Our insights into on-the-ground realities and competitor actions help optimize targeting, boost campaign performance, and maximize ROI. {" "}
                  <br className="hidden md:inline" />
                  Stay ahead with MintSurvey’s timely, precise intelligence.
                </p>

                <div className="text-xs flex mt-5 md:mt-6 items-center gap-3">
                  <a  href="#footer" className="b2">Subscribe our newsletter</a>
                  
                </div>
              </div>
              
              <div className="md:w-1/2 relative h-48 md:h-auto bg-light overflow-hidden group">
                
                    <Image
                      src="/home/InsightsSection1.svg"
                      alt="Group Reading"
                      layout="fill"
                      className="custom-image"
                    />
                 
              </div>
              
            </div>
          </motion.div>

          {/* Dynamic Blog Cards */}
          {loading ? (
            <div className="col-span-1 md:col-span-2 text-center text-gray-500">
              Loading blogs...
            </div>
          ) : error ? (
            <div className="col-span-1 md:col-span-2 text-center text-red-500">
              {error}
            </div>
          ) : blogs.length === 0 ? (
            <div className="col-span-1 md:col-span-2 text-center text-gray-500">
              No blogs found
            </div>
          ) : (
            blogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                className="rounded-xl p-4 md:p-6 flex flex-col justify-between shadow-md"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                whileHover={{ scale: 1.03, backgroundColor: "#f7f9fc" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  {/* <span className="h5 mt-4 md:mt-10 !mb-0">Featured</span> */}
                  <h3 className="h3 !mt-1 capitalize">{blog.title}</h3>
                  <p className="p2 !mt-5">{blog.content.slice(0, 150)}...</p>
                  <div className="h-[200px] relative mt-4 overflow-hidden group">
                    <Image
                      src={blog.featuredImage || "/home/insightsSection2.png"}
                      alt={blog.title}
                      fill
                      className="custom-image"
                    />
                  </div>
                </div>
                <div className="text-xs mt-4 flex items-center gap-3">
                  <span className="bg-light/30 px-2 py-1 rounded">
                    {blog.category || "Blog"}
                  </span>
                  <span>5 mins read</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
</Link>
        {/* CTA */}
        {/* <div className="mt-10 text-center">
          <button className="b1">See all insights</button>
        </div> */}
      </div>
    </section>
  );
};

export default InsightsSection;
