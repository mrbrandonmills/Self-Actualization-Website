import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Disabled for React Three Fiber WebGL compatibility
  // Strict mode double-renders cause "Canvas has existing context" error
  reactStrictMode: false,

  // Ignore TypeScript errors during production builds
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable Turbopack (Next.js 16 default bundler)
  turbopack: {},

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental features
  experimental: {
    // Enable optimized font loading
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Webpack configuration for optimal bundle
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Output configuration
  output: 'standalone',
}

export default nextConfig
