/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const conf = {
  experimental: {
    appDir: true,
  },

  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['res.cloudinary.com'],
  },
};

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === 'development',
})(conf);

module.exports = nextConfig;
