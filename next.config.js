/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression and minification
  compress: true,

  // Generate ETags
  generateEtags: true,

  // PoweredBy header (security)
  poweredByHeader: false,

  // Production source maps (optional, set to false for smaller builds)
  productionBrowserSourceMaps: false,

  // Enable SWR (Stale-While-Revalidate) for API routes
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

module.exports = nextConfig;
