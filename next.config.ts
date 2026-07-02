import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow self-signed certs from DDEV in development
  experimental: {
    serverActions: {
      allowedOrigins: [],
    },
  },
};

// Accept DDEV's self-signed certificate during local development
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default nextConfig;
