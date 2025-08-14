"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../../../public/whatsapp.jpg"; // adjust path if needed

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const popupRef = useRef(null);

  const checkTime = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    return minutes >= 510 && minutes <= 1110; // 8:30 AM to 6:30 PM
  };

  useEffect(() => {
    const interval = setInterval(() => setShowPrompt(checkTime()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    window.open(`https://wa.me/7777909218?text=${encoded}`, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
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
    return () => clearInterval(intervalId);
  }, [isOpen]);

  return (
    <>
      {/* Blinking Prompt */}
      <AnimatePresence>
        {!isOpen && showPrompt && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.8, y: -5 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-[70px] left-3 px-4 py-1 bg-blue-600 text-white rounded-full text-sm z-40"
          >
            Talk to us!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Chat Button (hidden when open) */}
      {!isOpen && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-3 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            key="chatbox"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 left-3 w-[320px] max-w-[90vw] min-h-[500px] max-h-[600px] rounded-xl shadow-xl border z-50 flex flex-col overflow-hidden bg-white"
          >
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-5">
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-10 h-10"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.668.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.074-.148-.668-1.611-.916-2.206-.242-.579-.487-.5-.668-.51-.173-.008-.372-.01-.57-.01s-.52.074-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347z" />
              </svg>

              <div>
                <span className="font-semibold block">
                  Shreerang Associates
                </span>
                <span className="text-sm">Rent Agreement Agent</span>
              </div>
            </div>

            {/* Message Background */}
            <div
              className="flex-1 p-4 overflow-y-auto bg-cover bg-center"
              style={{
                backgroundImage: `url(${bgImage.src})`,
              }}
            >
              {/* Agent Intro Message */}
              <div className="flex gap-2 items-start mb-3">
                <UserCircle className="text-green-500 w-[110px] h-[100px]" />
                <div className="bg-white text-sm px-4 py-2 rounded-lg shadow">
                  Hi! 👋 Need help with your rent agreement? I can assist you
                  with doorstep biometric service and online documentation. What
                  would you like to know?
                </div>
              </div>
            </div>

            {/* Input Box */}
            <div className="border-t px-3 py-2 bg-white flex items-center gap-2">
              {/* Left icon (optional) */}

              <input
                type="text"
                placeholder="Write a message"
                className="flex-1 px-4 py-2 text-sm border rounded-full outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              {/* Send button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="text-green-600"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
