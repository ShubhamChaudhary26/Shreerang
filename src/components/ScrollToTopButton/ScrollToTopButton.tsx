'use client';

import { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons'; // Ant Design icon for the up arrow

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 190) {  // If scrolled down 100px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); 

  return (
    <button
      onClick={scrollToTop}
      className= "fixed bottom-4 right-4 bg-light light p-3 z-50  rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 "
      
    >
      <UpOutlined style={{ fontSize: '20px' }} />
    </button>
  );
}
