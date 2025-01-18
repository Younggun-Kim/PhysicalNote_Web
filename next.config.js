const withTM = require("next-transpile-modules");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    ENV_PREFIX_PATH: process.env.ENV_PREFIX_PATH,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  trailingSlash: true,
  images: {
    loader: "akamai",
    path: "/",
    domains: ["https://dfg817v7j6xks.cloudfront.netprofile"],
  },
};

module.exports = withTM([
  "antd",
  "rc-picker",
  "rc-util",
  "@ant-design/icons",
  "rc-pagination",
  "rc-notification",
])(nextConfig);
