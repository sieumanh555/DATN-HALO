import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wallpapershome.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
