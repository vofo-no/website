/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
  async rewrites() {
    return [
      {
        source: "/filer/:slug/:name\\.:ext",
        destination: `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/:slug.:ext`,
      },
    ];
  },
  experimental: { taint: true },
};

export default nextConfig;
