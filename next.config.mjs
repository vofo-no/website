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
      {
        source: "/statistikk/agder",
        destination: "/statistikk/alle/agder",
        permanent: true,
      },
      {
        source: "/statistikk/akershus",
        destination: "/statistikk/alle/akershus",
        permanent: true,
      },
      {
        source: "/statistikk/buskerud",
        destination: "/statistikk/alle/buskerud",
        permanent: true,
      },
      {
        source: "/statistikk/finnmark",
        destination: "/statistikk/alle/finnmark",
        permanent: true,
      },
      {
        source: "/statistikk/innlandet",
        destination: "/statistikk/alle/innlandet",
        permanent: true,
      },
      {
        source: "/statistikk/more-og-romsdal",
        destination: "/statistikk/alle/more-og-romsdal",
        permanent: true,
      },
      {
        source: "/statistikk/nordland",
        destination: "/statistikk/alle/nordland",
        permanent: true,
      },
      {
        source: "/statistikk/oslo",
        destination: "/statistikk/alle/oslo",
        permanent: true,
      },
      {
        source: "/statistikk/rogaland",
        destination: "/statistikk/alle/rogaland",
        permanent: true,
      },
      {
        source: "/statistikk/telemark",
        destination: "/statistikk/alle/telemark",
        permanent: true,
      },
      {
        source: "/statistikk/troms",
        destination: "/statistikk/alle/troms",
        permanent: true,
      },
      {
        source: "/statistikk/trondelag",
        destination: "/statistikk/alle/trondelag",
        permanent: true,
      },
      {
        source: "/statistikk/vestfold",
        destination: "/statistikk/alle/vestfold",
        permanent: true,
      },
      {
        source: "/statistikk/vestland",
        destination: "/statistikk/alle/vestland",
        permanent: true,
      },
      {
        source: "/statistikk/ostfold",
        destination: "/statistikk/alle/ostfold",
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
