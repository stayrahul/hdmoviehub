import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow hot-reloading for local network mobile devices (iPads, Phones)
  allowedDevOrigins: ["192.168.1.168"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
