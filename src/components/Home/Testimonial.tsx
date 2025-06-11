'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ALL_TESTIMONIALS = [
  {
    id: 'marketing-manager-singapore',
    title: 'Marketing Manager',
    location: 'Automotive, Singapore',
    quote:
      'MintSurvey’s professionalism and expert insights helped us improve our automotive marketing strategies across Southeast Asia, boosting customer engagement. The study included qualitative research with in-depth interviews and focus group discussions, ensuring we gained detailed insights from key customers in the region.',
    linkedin: '',
  },
  {
    id: 'consumer-insights-uae',
    title: 'Consumer Insights Manager',
    location: 'Retail, UAE',
    quote:
      'The MintSurvey team was always available to provide updates and adapt the research to meet our needs, ensuring the success of our UAE market strategy. We conducted an online survey targeting a broad demographic, which provided us with timely and relevant feedback for decision-making.',
    linkedin: '',
  },
  {
    id: 'product-planning-malaysia',
    title: 'Product Planning Manager',
    location: 'FMCG, Malaysia',
    quote:
      'Timely research delivery from MintSurvey allowed us to adjust our campaigns quickly and effectively in the dynamic Southeast Asian market. The research was based on a combination of online surveys and data modeling, ensuring that the insights were actionable and based on solid data analytics.',
    linkedin: '',
  },
  {
    id: 'marketing-head-india',
    title: 'Marketing Head',
    location: 'Technology, India',
    quote:
      "We appreciate MintSurvey's cost-effective solutions, which provided us with high-quality data for strategic decisions without compromising on value. The study was an advanced analytics exercise supported by a management consultancy approach, helping us understand customer behavior, forecast market trends, and fine-tune our go-to-market strategy (GTM).",
    linkedin: '',
  },
  {
    id: 'market-research-saudi',
    title: 'Market Research Manager',
    location: 'Automotive, Saudi Arabia',
    quote:
      'Their timely delivery of research reports allowed us to quickly adjust our strategy and stay competitive in the Saudi automotive market. The study involved face-to-face surveys and a detailed retail audit, which gave us a comprehensive view of both consumer preferences and competitor activities.',
    linkedin: '',
  },
  {
    id: 'product-planner-india',
    title: 'Product Planner',
    location: 'Automotive, India',
    quote:
      'MintSurvey’s understanding of the Indian automotive market gave us the clarity we needed to optimize our product offering for better customer alignment. We used ethnographic research and in-depth interviews with senior professionals to gather qualitative insights, providing us with a deeper understanding of consumer needs and industry trends.',
    linkedin: '',
  },
  {
    id: 'marketing-manager-egypt',
    title: 'Marketing Manager',
    location: 'FMCG, Egypt',
    quote:
      'MintSurvey offered cost-effective research solutions, delivering high-quality insights that helped us expand our product range in Egypt without exceeding our budget. The study involved an online survey and mystery shopping, giving us valuable data on customer satisfaction and competitor performance.',
    linkedin: '',
  },
  {
    id: 'consumer-insights-indonesia',
    title: 'Consumer Insights Manager',
    location: 'Consumer Goods, Indonesia',
    quote:
      'Their deep market understanding in Southeast Asia helped us create tailored campaigns that resonated with our diverse customer base. We conducted a combination of focus groups and a retail audit to understand the local market dynamics better, while also including market sizing to refine our growth strategy.',
    linkedin: '',
  },
  {
    id: 'market-research-india',
    title: 'Market Research Manager',
    location: 'Automotive, India',
    quote:
      'MintSurvey’s professionalism in delivering detailed, reliable research has helped us refine our strategy and stay ahead in India’s automotive sector. The research included a comprehensive online survey and data analytics that pinpointed the most important factors for customer satisfaction.',
    linkedin: '',
  },
  {
    id: 'product-planning-retail-india',
    title: 'Product Planning Manager',
    location: 'Retail, India',
    quote:
      'The MintSurvey team was highly flexible and responsive, adapting to our changing needs and ensuring that research goals were met within our timeline. We leveraged their flexibility with an offline survey and focus group discussions, ensuring we got the best insights for our retail strategy.',
    linkedin: '',
  },
  {
    id: 'marketing-head-uae',
    title: 'Marketing Head',
    location: 'Automotive, UAE',
    quote:
      'MintSurvey’s professionalism and expert research provided us with insights that helped refine our customer experience strategy across multiple touchpoints in the UAE. The study was a combination of mystery shopping and a detailed survey, ensuring we had both qualitative and quantitative data.',
    linkedin: '',
  },
  {
    id: 'market-research-egypt',
    title: 'Market Research Manager',
    location: 'Retail, Egypt',
    quote:
      'MintSurvey’s cost-effective solutions delivered actionable insights, allowing us to target our marketing efforts efficiently across Southeast Asia. The data modeling and advanced analytics they provided were essential in understanding regional consumer trends and guiding our marketing strategy.',
    linkedin: '',
  },
  {
    id: 'marketing-manager-fmcg-india',
    title: 'Marketing Manager',
    location: 'FMCG, India',
    quote:
      "We were impressed with MintSurvey's ability to provide fast insights. Their timeliness helped us adjust our marketing campaign to meet the needs of Indian consumers quickly. The study was based on an online survey combined with focus groups, giving us both broad and in-depth insights.",
    linkedin: '',
  },
  {
    id: 'product-planning-uae',
    title: 'Product Planning Manager',
    location: 'Automotive, UAE',
    quote:
      'MintSurvey’s professionalism was evident throughout our project. They provided precise and actionable insights, helping us enhance our customer experience strategy in the UAE. The study was a combination of focus group discussions and in-depth surveys, targeting high-quality respondents for the best results.',
    linkedin: '',
  },
  {
    id: 'market-research-saudi-final',
    title: 'Marketing Head',
    location: 'Automotive, Saudi Arabia',
    quote:
      'MintSurvey’s market understanding is unmatched. Their comprehensive reports provided in-depth insights into Saudi consumer behavior, which helped us fine-tune our marketing strategy. This research was conducted through face-to-face surveys and a detailed mystery shopping exercise to assess customer experience.',
    linkedin: '',
  },
];

const TestimonialSlider = () => {
  const VISIBLE_ITEMS = 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const currentTestimonial = ALL_TESTIMONIALS[activeIndex];
  const cardRef = useRef(null);
  const [cardHeightWithMargin, setCardHeightWithMargin] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      const computedStyle = window.getComputedStyle(cardRef.current);
      const height = cardRef.current.offsetHeight;
      const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
      setCardHeightWithMargin(height + marginBottom);
    }
  }, []);

  useEffect(() => {
    if (activeIndex < startIndex || activeIndex >= startIndex + VISIBLE_ITEMS) {
      setActiveIndex(startIndex);
    }
  }, [startIndex, activeIndex]);

  const [direction, setDirection] = useState(0);
  const autoSlideTimeoutRef = useRef(null);

  const resetAutoSlide = () => {
  if (autoSlideTimeoutRef.current) {
    clearTimeout(autoSlideTimeoutRef.current);
  }
  autoSlideTimeoutRef.current = setTimeout(() => {
    setActiveIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % ALL_TESTIMONIALS.length;

      // Make sure visible area also scrolls
      if (nextIndex < startIndex) {
        setStartIndex(nextIndex);
      } else if (nextIndex >= startIndex + VISIBLE_ITEMS) {
        setStartIndex(nextIndex - VISIBLE_ITEMS + 1);
      }

      return nextIndex;
    });
  }, 4000);
};

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (autoSlideTimeoutRef.current) {
        clearTimeout(autoSlideTimeoutRef.current);
      }
    };
  }, [activeIndex]);

  const setTestimonial = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
    resetAutoSlide();
    if (newIndex < startIndex) {
      setStartIndex(newIndex);
    } else if (newIndex >= startIndex + VISIBLE_ITEMS) {
      setStartIndex(newIndex - VISIBLE_ITEMS + 1);
    }
  };

  const handleScrollUp = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    resetAutoSlide();
  };

  const handleScrollDown = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, ALL_TESTIMONIALS.length - VISIBLE_ITEMS)
    );
    resetAutoSlide();
  };

  const contentVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
      y: direction > 0 ? 20 : -20,
    }),
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 0.4, ease: 'easeOut' },
        y: { type: 'spring', stiffness: 400, damping: 25, duration: 0.5 },
        scale: { duration: 0.4, ease: 'easeOut' },
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
      y: direction > 0 ? -20 : 20,
      transition: {
        opacity: { duration: 0.4, ease: 'easeIn' },
        y: { type: 'spring', stiffness: 400, damping: 25, duration: 0.5 },
        scale: { duration: 0.4, ease: 'easeIn' },
      },
    }),
  };

  const translateYValue = -startIndex * cardHeightWithMargin;

  return (
    <section className="bg-light mt-10 mb-10 py-6 lg:mt-20 lg:mb-20 lg:py-12 flex items-center min-h-[400px] lg:min-h-[500px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-10 tracking-tight">
          Trusted by Industry Leaders in Every Region
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col items-center mb-6 lg:mb-10"
          >
            <button
              onClick={handleScrollUp}
              disabled={startIndex === 0}
              className="p-2 sm:p-2.5 rounded-full bg-light shadow disabled:opacity-30 mb-2 lg:mb-0"
            >
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div
              className="w-full my-2 relative overflow-hidden"
              style={{ height: `${VISIBLE_ITEMS * (cardHeightWithMargin || 100)}px` }}

            >
              <motion.div
                animate={{ y: translateYValue }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col absolute top-0 left-0 w-full"
              >
                {ALL_TESTIMONIALS.map((testimonial, index) => (
                  <motion.button
                    key={testimonial.id}
               ref={index === activeIndex ? cardRef : null}
                    onClick={() => setTestimonial(index)}
                    className={`flex items-center justify-between p-2 sm:p-3 rounded-lg transition-all duration-300 w-full mb-1 sm:mb-2 text-left ${
                      activeIndex === index
                        ? 'bg-blue text-white'
                        : ' bg-light text-black shadow-xl'
                    } ${index >= startIndex && index < startIndex + VISIBLE_ITEMS ? '' : 'opacity-30 pointer-events-none'}`}
                  >
                    <span className="text-xs sm:text-sm md:text-base font-medium">
                      {testimonial.location}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <button
              onClick={handleScrollDown}
              disabled={startIndex >= ALL_TESTIMONIALS.length - VISIBLE_ITEMS}
              className="p-2 sm:p-2.5 rounded-full bg-light shadow disabled:opacity-30 mt-2 lg:mt-0"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-10 bg-light rounded-xl shadow-2xl p-4 sm:p-6 relative overflow-hidden min-h-[280px] sm:min-h-[320px]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              {currentTestimonial && (
                <motion.div
                  key={currentTestimonial.id}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="absolute inset-0 flex px-4 sm:px-10 py-4 sm:py-5 flex-col items-center justify-center text-center"
                >
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 sm:mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 10C4.34 10 3 11.34 3 13V19H9V13C9 11.34 7.66 10 6 10ZM15 10C13.34 10 12 11.34 12 13V19H18V13C18 11.34 16.66 10 15 10Z" />
                  </svg>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 max-w-2xl font-light leading-relaxed">
                    {currentTestimonial.quote}
                  </p>
                  <div className="flex items-center flex-col">
                    <p className="text-xs sm:text-sm md:text-base font-semibold">
                      {currentTestimonial.title} | {currentTestimonial.location}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;