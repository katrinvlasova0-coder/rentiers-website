import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/rentiers-website',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/rentiers-website',
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
