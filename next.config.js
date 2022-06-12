/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','192.168.1.70', '192.168.0.28'],
  }
}

module.exports = nextConfig
