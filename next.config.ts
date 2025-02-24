import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: process.env.STRAPI_PROTOCOL! as "http" | "https",
        hostname: process.env.STRAPI_HOSTNAME!,
        port: process.env.STRAPI_PORT!,
        pathname: "/uploads/*",
      },
    ],
  },
};

export default nextConfig;
