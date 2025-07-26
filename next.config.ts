import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows any hostname
      },
    ],
  },
};

export default nextConfig;
