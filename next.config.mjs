/** @type {import('next').NextConfig} */
const nextConfig = {
  // Puppeteer + Chromium are large native packages that must not be bundled by
  // webpack. Externalizing them keeps the server build fast and prevents a hard
  // build failure when the optional local `chromium` dev binary isn't installed
  // (the crawler falls back to demo mode at runtime in that case).
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium',
      'chromium',
    ],
  },
};

export default nextConfig;
