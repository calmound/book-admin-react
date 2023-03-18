/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        // 联调
        destination: `http://localhost:3001/api/:path*`,
        // destination: `https://mock.apifox.cn/m1/2398938-0-default/api/:path*`,
      },
    ]
  }
}

module.exports = nextConfig
