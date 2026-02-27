import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://suvidha-server-4u66.onrender.com/api/:path*'
      },
      {
        source: '/uploads/:path*',
        destination: 'https://suvidha-server-4u66.onrender.com/uploads/:path*'
      }
    ];
  }
};

export default nextConfig;
