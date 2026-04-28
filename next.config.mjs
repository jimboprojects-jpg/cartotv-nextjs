/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: '**.cartotv.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/who-we-are', destination: '/en/who-we-are', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      { source: '/blog', destination: '/en/blog', permanent: true },
    ]
  },
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        'three', '@react-three/fiber', '@react-three/drei',
      ]
    }
    return config
  },
}
export default nextConfig
