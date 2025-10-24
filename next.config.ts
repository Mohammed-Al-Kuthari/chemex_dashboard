import type { NextConfig } from "next";

const imageDomainList = process.env.NEXT_PUBLIC_IMAGE_DOMAINS
  ?.split(",")
  .map((domain) => domain.trim())
  .filter((domain) => domain.length > 0);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: imageDomainList?.length
    ? {
        remotePatterns: imageDomainList.map((hostname) => ({
          protocol: "https",
          hostname,
        })),
      }
    : undefined,
};

export default nextConfig;
