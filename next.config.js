/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
    images: {
      unoptimized: true
    },
    // assetPrefix: "./" 
}

module.exports = nextConfig
