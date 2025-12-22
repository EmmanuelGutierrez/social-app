import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
    ],
  },
  rewrites() {
    return[{
      source:"/graphql",
      destination:"http://localhost:3001/graphql",
    },]
  },
};

export default nextConfig;
