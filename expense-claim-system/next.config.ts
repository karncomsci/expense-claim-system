import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        ],
      },
    ];*/
};

export default nextConfig;
