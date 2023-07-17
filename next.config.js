/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
