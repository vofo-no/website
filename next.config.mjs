/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
  experimental: { taint: true },
};

export default nextConfig;
