/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.antaranews.com" },
      { protocol: "https", hostname: "pustaka.bca.co.id" },
      { protocol: "https", hostname: "asset.kompas.com" },
      { protocol: "https", hostname: "cdn-jpr.jawapos.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "geti.id" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn-linkumkm.bri.co.id" },
      { protocol: "https", hostname: "assets-a1.kompasiana.com" },
    ],
  },
};

export default nextConfig;
