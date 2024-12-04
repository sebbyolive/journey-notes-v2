import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

module.exports = {
  output: "standalone", // DOCKER
  images: {
    domains: ["tailwindui.com"],
  },
};
