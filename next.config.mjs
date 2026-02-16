/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@sparticuz/chromium-min'],
    outputFileTracingIncludes: {
      '/app/api/generate-pdf/route': [
        './node_modules/@sparticuz/chromium-min/bin/**/*',
      ],
    },
  },
};

export default nextConfig;