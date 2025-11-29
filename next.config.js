/** @type {import('next').NextConfig} */

// セキュリティヘッダーの設定
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
];

const nextConfig = {
  output: 'export', // 静的エクスポートモード
  trailingSlash: true,
  // distDir: 'out', ← この行を削除（デフォルトの.nextを使用）
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    // TypeScriptの実験的機能警告を抑制
    ignoreBuildErrors: false,
  },
  experimental: {
    // Type Strippingの警告を抑制
    typedRoutes: false,
  },
  // セキュリティヘッダーの追加（Vercelや一部ホスティングで使用）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Node.jsの警告を抑制
  webpack: (config, { isServer }) => {
    // Node.jsの実験的機能警告を抑制
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // 実験的機能の警告を抑制
    config.stats = {
      warnings: false,
    };
    
    // コンソール警告を抑制
    config.ignoreWarnings = [
      /ExperimentalWarning/,
      /Type Stripping/,
    ];
    
    return config;
  },
  images: {
    // 注意: output: 'export' モードでは Next.js の画像最適化は動作しません
    // 静的サイトでは unoptimized: true が必須です
    // 画像最適化を使うには Vercel などのホスティングサービスが必要です
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nssu-ekiden.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ekiden-results.com",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

module.exports = nextConfig;
