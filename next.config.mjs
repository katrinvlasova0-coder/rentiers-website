import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBase.replace(/\/$/, '') || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions ?? {}),
        ignored: [
          '**/node_modules/**',
          '**/content-factory/**',
          '**/out/**',
          '**/.git/**',
          '**/.next/**',
          '**/.superpowers/**',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
