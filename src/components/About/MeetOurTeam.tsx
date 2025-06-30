'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollFadeIn from '../../hooks/ScrollFadeIn';
import { LinkedinFilled } from '@ant-design/icons';

type Leader = {
  name: string;
  title: string;
  image: string;
  linkedin: string;
  testimonial: string;
  experience: string;
  education: string;
  expertise: string[];
  achievements: string[];
};

const leaders: Leader[] = [
  {
    name: 'Neeraj Sharma',
    title: 'Consultant',
    image: '/about/NeerajSharma.jpg',
    linkedin: 'https://www.linkedin.com/in/neerajmukraj-insights/',
    testimonial: 'With 15+ years of experience, Neeraj Sharma is a consultant at MintSurvey, specializing in market research and advanced analytics. He brings together expertise in technology & data to design smart, scalable methodologies that uncover actionable insights. His thoughtful approach, combined with a deep understanding of client needs, enables him to deliver tailored solutions that drive strategic growth. Neeraj’s commitment to leveraging technology in research ensures that MintSurvey remains at the forefront of innovation in the industry.',
    experience: '15 years',
    education: 'PGDM in Marketing & IT, Fore School of Management; B.E., Rajiv Gandhi Prodyogiki Vishwavidyalaya',
    expertise: ['SQL', 'PHP', 'Python', 'Market Research', 'Brand Management', 'Customer Experience Management', 'Advanced Analytics'],
    achievements: ['Published Lessons from leveraging technology in auditing during COVID-19: an emerging economy perspective']
  },
  {
    name: 'Raktim Chatterjee',
    title: 'Consultant',
    image: '/about/RaktimChatterjee.jpg',
    linkedin: 'https://www.linkedin.com/in/raktim-chatterjee-2a661b6/',
    testimonial: 'Raktim Chatterjee, an accomplished marketing professional, brings 20+ years of experience across leading research agencies and client-side roles. His unique perspective helps bridge insight and execution, guiding manufacturers in refining product strategy, pricing, and GTM plans. At MintSurvey, he ensures research translates into clear, actionable outcomes that drive real business impact across the automotive and consumer sectors.',
    experience: '19 years',
    education: 'MBA in Marketing, Viswa Bharati University; B.E., Rajiv Gandhi Prodyogiki Vishwavidyalaya',
    expertise: ['Product Service', 'Product Offerings', 'Annual Budgeting', 'Market Research', 'Consumer Insights', 'Market Analytics', 'Project Management'],
    achievements: []
  },
  {
    name: 'Zainab Musa',
    title: 'Consultant',
    image: '/about/ZainabMusa.png',
    linkedin: 'https://www.linkedin.com/in/zainab-musa/',
    testimonial: 'Zainab Musa, with 15+ years of experience, is a Consultant at MintSurvey specializing in market and qualitative research. She excels in moderation, in-depth interviews, and uncovering the emotional drivers behind consumer behavior. Her ability to engage respondents and extract rich insights has contributed to successful projects across Africa. Zainab’s practical approach and strong client management skills make her a key contributor to MintSurvey’s insight-led research initiatives.',
    experience: '15 years',
    education: 'MBA in Finance & General Management, Murdoch University Dubai; B.A. (Hons) in Accountancy, University of Bolton',
    expertise: ['Financial Statements', 'Budgeting & Forecasting', 'Attention to Detail', 'Project Management', 'Analytical Skills', 'Team Building'],
    achievements: []
  },
  {
    name: 'Sneha Shah',
    title: 'Research and Operations Manager',
    image: '/about/SnehaShah.png',
    linkedin: 'https://www.linkedin.com/in/snehamukraj/',
    testimonial: 'With 15 years of experience, Sneha Shah is a dedicated Research and Operations Manager at MintSurvey, specializing in market research operations and fieldwork. She excels in managing field teams, overseeing data collection, and ensuring smooth execution of projects. Her expertise in recruitment, training, and panel maintenance supports robust respondent engagement. Sneha’s leadership across all field operations strengthens MintSurvey’s ability to deliver consistent, high-quality insights across diverse geographies.',
    experience: '7 years 7 months at Mukraj-Insights (Research and Operations Manager, Research Analyst), 1 year 3 months as Market Researcher, 1 year 3 months as Market Research Supervisor, 3 years 3 months as Market Research Freelancer',
    education: 'B.Com, University of Mumbai',
    expertise: ['Data Collection', 'Recruiting', 'Market Research'],
    achievements: []
  },
  {
    name: 'Shubham Chaudhari',
    title: 'Digital Solution Engineer',
    image: '/about/ShubhamChaudhari.png',
    linkedin: 'https://www.linkedin.com/in/shubham-chaudhary-react/',
    testimonial: 'Shubham is a versatile digital solutions expert specializing in web development, data analytics, social media management, and automation tools. At MintSurvey, he builds responsive, high-performance platforms that enhance user experience and operational efficiency. By integrating smart analytics and workflow automation, he streamlines research processes and drives digital growth.',
    experience: '2 months as Digital Solution Engineer at MintSurvey, 6 months as Full Stack Developer at Divine Infotech',
    education: 'MCA, Sri Balaji University, Pune; BCA, Rofel Shri G. M. Bilakhia College of Applied Sciences',
    expertise: ['Next.js', 'GitHub', 'Webpack', 'React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    achievements: []
  },
  {
    name: 'Arpita Anit',
    title: 'Research Executive',
    image: '/about/ArpitaAnit.png',
    linkedin: 'https://www.linkedin.com/in/arpitha-anit-50a809238/',
    testimonial: 'Arpitha Anit is a skilled Research Executive at MintSurvey, with a strong focus on project management, quantitative, and qualitative research. She excels at analyzing consumer data to uncover actionable insights, creating detailed reports that guide strategic business decisions. Arpitha’s ability to conduct in-depth interviews and coordinate research teams ensures high-quality outcomes that align with client goals, making her a valuable contributor to MintSurvey’s market research initiatives.',
    experience: '1 month as Research Executive at MintSurvey, 3 months as Management Trainee at Jabra Connect, 4 months as Business Development Lead at DevTown, 2 months as Marketing Intern at Astound Academy',
    education: 'MBA, Amity University; BBA, Amrita Vishwa Vidyapeetham',
    expertise: ['Program Management', 'Quantitative Research', 'Qualitative Research'],
    achievements: []
  },
];

const LeadershipSlider = () => {
  const [index, setIndex] = useState(leaders.length > 0 ? Math.min(2, leaders.length - 1) : 0);
  const [isHovered, setIsHovered] = useState(false);
  const rotationInterval = 7000;

  useEffect(() => {
    console.log('Current index:', index);
    console.log('Image src:', leaders[index]?.image);
    console.log('LinkedIn URL:', leaders[index]?.linkedin || 'No LinkedIn URL provided');
  }, [index]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));
    }, rotationInterval);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleUp = () => setIndex((prev) => (prev === 0 ? leaders.length - 1 : prev - 1));
  const handleDown = () => setIndex((prev) => (prev === leaders.length - 1 ? 0 : prev + 1));

  return (
    <ScrollFadeIn delay={0.2}>
      <section
        className="max-w-7xl mx-auto bg-gradient-to-br bg-light dark:from-gray-900 dark:to-gray-700 mt-20 py-16 mb-20 px-4 sm:px-6 md:px-8 text-center md:text-left rounded-3xl shadow-2xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 md:mb-12 tracking-tight">
          Meet Our Core Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end">
          {/* Left-side Image (Desktop), Image + Name/Title/LinkedIn (Mobile) */}
          <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl group">
            <div className="absolute inset-0 md:bg-gradient-to-t md:from-blue-900/50 md:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUp}
                className="bg-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                aria-label="Previous leader"
              >
                ↑
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDown}
                className="bg-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl"
                aria-label="Next leader"
              >
                ↓
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -500, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full flex flex-col items-center justify-start"
              >
                <Image
                  src={leaders[index]?.image || '/about/fallback.jpg'}
                  alt={leaders[index]?.name || 'Leader'}
                  width={320}
                  height={400}
                  className="rounded-3xl md:rounded-3xl object-cover w-full h-[80%] md:h-full"
                  onError={() => console.error(`Failed to load image: ${leaders[index]?.image}`)}
                />
                {/* Name, Title, LinkedIn for Mobile Only */}
                <div className="mt-4 text-center md:hidden pointer-events-auto">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {leaders[index]?.name || 'Leader'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {leaders[index]?.title || 'Title'}
                  </div>
                  {/* {leaders[index]?.linkedin && (
                    <a
                      href={leaders[index].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-300 hover:underline mt-2 inline-block cursor-pointer"
                      onClick={() => console.log(`Navigating to LinkedIn: ${leaders[index].linkedin}`)}
                    >
                      <LinkedinFilled className="text-xl" />
                    </a>
                  )} */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center: Leader List (Desktop Only) */}
          <div className="hidden md:block space-y-2 mt-12 px-5 py-0.5">
            {leaders.map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  i === index
                    ? 'bg-blue text-white'
                    : 'text-gray-200 dark:text-gray-300 hover:bg-blue-light'
                }`}
                onClick={() => setIndex(i)}
              >
                <div className="text-left">
                  <div className="text-lg font-semibold">{leader.name}</div>
                  <div className={`text-xs ${i === index ? 'text-white' : 'text-gray-300'}`}>
                    {leader.title}
                  </div>
                </div>
                {i === index && leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-white hover:underline cursor-pointer"
                    onClick={() => console.log(`Navigating to LinkedIn: ${leader.linkedin}`)}
                  >
                    <LinkedinFilled />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right-side Profile Info (Desktop), Testimonial + Details (Mobile) */}
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="md:bg-white dark:bg-gray-800 p-4 sm:p-6 md:rounded-3xl md:shadow-lg  flex flex-col max-h-[500px] overflow-y-auto text-left text-sm sm:text-base"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4 md:block hidden">
              {leaders[index]?.name || 'Leader'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify leading-loose mb-4">
              {leaders[index]?.testimonial || 'No testimonial available.'}
            </p>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-blue-900 dark:text-blue-300">Experience: </span>
                <span className="text-gray-700 dark:text-gray-300">{leaders[index]?.experience || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900 dark:text-blue-300">Education: </span>
                <span className="text-gray-700 dark:text-gray-300">{leaders[index]?.education || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-900 dark:text-blue-300">Skills: </span>
                <span className="text-gray-700 dark:text-gray-300">{leaders[index]?.expertise?.join(', ') || 'N/A'}</span>
              </div>
              {leaders[index]?.achievements?.length > 0 && (
                <div>
                  <span className="font-semibold text-blue-900 dark:text-blue-300">Achievements:</span>
                  <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside">
                    {leaders[index].achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </ScrollFadeIn>
  );
};

export default LeadershipSlider;