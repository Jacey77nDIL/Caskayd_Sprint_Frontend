import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  // Where your custom service worker lives
  swSrc: "app/sw.ts",
  // Where the compiled service worker will be output
  swDest: "public/sw.js",
  // Automatically disable the service worker in development so it doesn't cache aggressively while you are coding
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sedmmurtlwrtglowknpi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Keeping this for your placeholders!
      }
    ],
  },
};


export default withSerwist(nextConfig);