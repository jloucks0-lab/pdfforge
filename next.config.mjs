/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/generate-pdf': ['./node_modules/@sparticuz/chromium-min/**/*'],
    },
  },
};

export default nextConfig;
