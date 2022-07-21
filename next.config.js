/** @type {import('next').NextConfig} */

const { version } = require('./package.json')

const isDev = process.env.NODE_ENV !== 'production'

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self'${
      isDev ? " 'unsafe-eval'" : ''
    }; connect-src *; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; base-uri 'self'; form-action 'self'`,
  },
]

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  env: {
    NEXT_PUBLIC_VERSION: version,
  },

  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig