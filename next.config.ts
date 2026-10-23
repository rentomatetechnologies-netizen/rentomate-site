import type { NextConfig } from "next";

// rentomate-backend is the API (and the only service with database access). The browser never talks to it
// directly: these same-origin paths are forwarded to it, so the admin session cookie stays first-party.
const backendUrl = (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // The old plans page ranks in Google; send its visitors (and its ranking) to the home page.
      { source: "/water-purifier-rental-coimbatore", destination: "/", permanent: true },
      // The About page moved to /about-us.
      { source: "/about", destination: "/about-us", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/api/auth/:path*", destination: `${backendUrl}/api/auth/:path*` },
      { source: "/api/admin/:path*", destination: `${backendUrl}/api/admin/:path*` },
      { source: "/media/:path*", destination: `${backendUrl}/media/:path*` },
    ];
  },
};

export default nextConfig;
