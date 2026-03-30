import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [32, 64, 96, 128, 256],
    qualities: [40, 75, 80, 85, 90],
  },
};

export default nextConfig;
