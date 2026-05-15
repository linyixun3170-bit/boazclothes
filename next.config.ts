import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/boaz-frontend" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/boaz-frontend/" : "",
  images: {
    unoptimized: true,
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
