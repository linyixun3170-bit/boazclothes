import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "boazclothes.com",
      },
      {
        protocol: "https",
        hostname: "boazclothes.com.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
