'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);
  const [isWithinTime, setIsWithinTime] = useState(true); 
  const popupRef = useRef(null);

  const checkTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; 
    const startTime = 8 * 60 + 30; 
    const endTime = 18 * 60 + 30; 
    return currentTime >= startTime && currentTime <= endTime;
  };

  useEffect(() => {
    setIsWithinTime(checkTime());
    const intervalId = setInterval(() => {
      setIsWithinTime(checkTime());
    }, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 0) {
      const encodedMessage = encodeURIComponent(trimmedMessage);
      window.open(`https://wa.me/7697016792?text=${encodedMessage}`, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    let intervalId;
    if (!isOpen) {
      intervalId = setInterval(() => {
        setShowPrompt((prev) => !prev);
      }, 5000);
    } else {
      setShowPrompt(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen]);

  return (
    <>
      {/* Blinking Prompt Text */}
      <AnimatePresence>
        {!isOpen && showPrompt && (
          <motion.div
            key="chatPrompt"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 0.7, scale: 1, y: -5 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-[60px] left-2 p2 light px-3 py-0 rounded-full z-40 transform -translate-x-1/2 left-1/2"
          >
            <span className="relative">talk to us!!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-2 left-3 bg-dark p2 dark p-3 rounded-full shadow-lg transition-transform z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            key="chatbox"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-10 left-4 w-80 min-h-[400px] max-h-[500px] rounded-xl shadow-xl border z-50 flex flex-col overflow-hidden bg-light"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark p2 dark px-4 py-3 rounded-t-xl"
            >
              <span className="font-semibold block">Agent</span>
              <span className="text-sm">Available 8:30 AM - 6:30 PM for quick replies!</span>
            </motion.div>

            {/* Message Area */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-light-50 flex items-start gap-3 flex-grow overflow-y-auto"
            >
              <UserCircle className="w-10 h-10" />
              <div className="text-sm px-4 py-2 rounded-lg shadow">
                {isWithinTime === undefined
                  ? 'Loading time status...' // Fallback for undefined state
                  : isWithinTime
                  ? 'Got any questions? I\'m happy to help.'
                  : 'Insert data in between 8:30 to 6:30 to get fast response'}
              </div>
            </motion.div>

            {/* Input at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-t px-3 py-2 flex items-center"
            >
              <input
                type="text"
                placeholder="Write a message"
                className="flex-1 text-sm px-4 py-2 border rounded-full outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="!ml-2 !mb-0 light p2"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}