import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {

    return [
      {
        source: "/",
        destination: "/awards",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
