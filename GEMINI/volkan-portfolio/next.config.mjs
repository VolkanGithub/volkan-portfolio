/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity'nin resim sunucusu
        port: '',
      },
    ],
  },
};

export default nextConfig;