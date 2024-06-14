/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/stepchild-dashboard",
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
