import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'proper-friendship-29e4bdb47f.media.strapiapp.com',
      },
    ],
  },
};

export default nextConfig;
