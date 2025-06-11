// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com', // Add this line for placeholder images
      // Add any other external image domains here, e.g., 'cdn.example.com', 'res.cloudinary.com'
    ],
  },
};

module.exports = nextConfig;