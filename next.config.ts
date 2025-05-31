/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [new URL('https://cdn.sanity.io/images/kc9fsr95/production/***')],
  },
};

module.exports = nextConfig;

