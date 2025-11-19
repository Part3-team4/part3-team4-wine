// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'javascript/auto',
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
