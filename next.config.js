/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint errors ignore karega build me
  },
};

module.exports = nextConfig;
