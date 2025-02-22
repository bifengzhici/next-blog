import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "bifengzhici.cn",
        port: "1337",
        pathname: "/uploads/*",
      },
    ],
  },
};

export default nextConfig;
