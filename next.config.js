/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        // 启动mock服务，执行这个代码
        destination: `http://localhost:3001/api/:path*`,
        // 连接本地的nodejs服务，执行这个代码
        // destination: `https://mock.apifox.cn/m1/2398938-0-default/api/:path*`,
      },
    ]
  }
}

module.exports = nextConfig
