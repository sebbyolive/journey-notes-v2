// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {};

// export default nextConfig;

module.exports = {
  output: "standalone",
  images: {
    domains: ["tailwindui.com"],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  experimental: {
    appDir: true,
  },
};
