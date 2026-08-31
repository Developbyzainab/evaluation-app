/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  // Disable static optimization for pages that use dynamic features
  experimental: {
    // This helps with font loading issues
    optimizePackageImports: ['next/font/google'],
  },
};

export default nextConfig;