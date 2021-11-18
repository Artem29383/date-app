const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  reactStrictMode: false,
  webpack5: true,
  webpack: config => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      ...require('./alias')
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/]
      },

      use: ['@svgr/webpack'],
    });

    return config
  },
  workbox: {
    debug: false,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
});
