import { ConfigValue } from "@/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      new URL(`${ConfigValue.NEXT_PUBLIC_REST_API_ENDPOINT}/**`),
      new URL(`https://g6.misa.com.tw/**`),
    ],
  },
};

export default nextConfig;
