import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

module.exports = {
  // output: "standalone", // DOCKER WHEN NEEDED!
  images: {
    domains: ["tailwindui.com"],
  },
};
