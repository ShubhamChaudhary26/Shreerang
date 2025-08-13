'use client';

import React, { useState } from 'react';

// Utility for classNames
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

type AccordionItemType = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

const Accordion = ({ items }: { items: AccordionItemType[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl  border border-gray-100 overflow-hidden">
      {items.map(({ id, title, content }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="border-b last:border-b-0">
            <button
              aria-expanded={isOpen}
              aria-controls={`${id}-content`}
              id={`${id}-header`}
              onClick={() => toggle(id)}
              className={cn(
                'w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors duration-200',
                isOpen ? 'bg-blue-50' : ''
              )}
            >
              <span className="text-lg md:text-xl">{title}</span>
              <svg
                className={cn(
                  'w-5 h-5 text-blue-600 transform transition-transform duration-300',
                  isOpen ? 'rotate-180' : ''
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`${id}-content`}
              role="region"
              aria-labelledby={`${id}-header`}
              className={cn(
                'px-6 overflow-hidden transition-all duration-300 text-gray-700',
                isOpen ? 'py-4 max-h-96' : 'max-h-0'
              )}
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Example usage in FAQ Section
const faqs = [
  {
    id: 'faq1',
    title: 'Is the online agreement legally valid?',
    content: 'Yes, agreements are e-stamped and legally valid across India.',
  },
  {
    id: 'faq2',
    title: 'Do you offer doorstep service?',
    content: 'Absolutely. Our executive visits for biometric KYC and signing.',
  },
  {
    id: 'faq3',
    title: 'How long does it take?',
    content: 'Most agreements are completed within 24-72 hours.',
  },
];

export const FAQSection = () => (
  <section className="py-20 bg-gray-100">
    <div className="max-w-8xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Answers to the most common questions about our property rental and agreement services.
        </p>
      </div>
      <Accordion items={faqs} />
    </div>
  </section>
);

export default Accordion;
