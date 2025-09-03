import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export', // 👈 this makes Next.js output static HTML
  images: { unoptimized: true }, // 👈 required because Next.js image optimization won't work on GitHub Pages
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : '',
};

export default nextConfig;
