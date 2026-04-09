import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for Render deployment — packages the app as a self-contained
  // Node.js server with all dependencies in .next/standalone/
  output: 'standalone',

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: '**.cartotv.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    // On Render, disable image optimization (uses CPU/memory)
    // Use unoptimized: true if you run into memory issues
    unoptimized: false,
  },

  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: false },
      { source: '/who-we-are', destination: '/en/who-we-are', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      { source: '/privacy', destination: '/en/privacy', permanent: true },
    ]
  },

  // Three.js is browser-only — don't bundle it on the server
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        'three',
        '@react-three/fiber',
        '@react-three/drei',
      ]
    }
    return config
  },
}

export default nextConfig
