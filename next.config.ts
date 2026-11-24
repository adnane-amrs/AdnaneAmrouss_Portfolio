import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets a production build/test run in a separate folder (NEXT_DIST_DIR=.next-verify)
  // without overwriting the .next folder used by a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
