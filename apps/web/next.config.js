/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lotool/lib", "@lotool/ui"],
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
