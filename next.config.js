/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
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
    unoptimized: true,
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
