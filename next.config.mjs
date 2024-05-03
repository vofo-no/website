/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/om-vofo/nyheter/:path*",
        destination: "/aktuelt/:path*",
        permanent: true,
      },
      {
        source: "/om-vofo/om-vofo",
        destination: "/om-vofo",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/filer/:slug/:name\\.:ext",
        destination: `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/:slug.:ext`,
      },
      {
        source: "/filer/:slug",
        destination: `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/:slug`,
      },
    ];
  },
  experimental: { taint: true },
};

export default nextConfig;
