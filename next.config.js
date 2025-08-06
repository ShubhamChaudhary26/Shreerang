// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'localhost',
      'res.cloudinary.com', 
       // Add this line for placeholder images
    ],
  },
};

module.exports = nextConfig;