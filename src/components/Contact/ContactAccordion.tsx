// components/ContactAccordion.tsx
'use client';

import { useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import the ScrollFadeIn component

type Item = {
  title: string;
  content: JSX.Element;
};

const items: Item[] = [
  {
    title: 'Job seekers',
    content: (
      <div>
        <p className='p2 '>
          Explore flexible roles and career-boosting opportunities tailored for passionate professionals.
          <a href="/login" className="underline">Login and take the next step in your journey.</a>.
        </p>
        <p className="mt-4 h5">Search for a job at MintSurvey here.</p>
      </div>
    ),
  },
  {
    title: 'Freelancers',
    content: <p className='p2'>Join our growing network of talented freelancers working on global research projects.
    <a href="/login" className="underline">Sign in and start contributing today.</a>.
    </p>,
  },
  {
    title: 'Newsletter',
    content: <p className='p2'>Stay informed with the latest insights, trends, and updates from MintSurvey.
    <a href="/requestquote" className="underline">Subscribe now to never miss a beat.</a>.
    </p>,
  },
  {
    title: 'Sales Enquiries',
    content: <p className='p2'>Looking for custom research or solutions We are here to help your business grow
    <a href="/requestquote" className="underline">Request a quote and let’s get started. </a>.
    </p>,
  },
];

export default function ContactAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16">
      <ScrollFadeIn delay={0.2}> {/* Apply fade-in to the main heading */}
        <h2 className="h2">How can we help?</h2>
      </ScrollFadeIn>

      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          // Wrap each accordion item with ScrollFadeIn
          <ScrollFadeIn key={index} delay={0.3 + index * 0.1}> {/* Stagger delay for each item */}
            <div className="border-t border-black py-6 transition-all duration-300 ease-in-out">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="h3 font-semibold tracking-widest uppercase">
                  {item.title}
                </h3>
                <span className="h3">
                  {isOpen ? <MinusOutlined /> : <PlusOutlined />}
                </span>
              </div>

              <div
                className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="h5 ">{item.content}</div>
              </div>
            </div>
          </ScrollFadeIn>
        );
      })}

      {/* Bottom border for last item */}
      <div className="border-t border-black"></div>
    </div>
  );
}