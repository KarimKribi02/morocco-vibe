/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Standard production wildcards for popular hosted backend platforms
      {
        protocol: 'https',
        hostname: '**.render.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

// Dynamically inject backend host if environment variables are configured
const strapiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
if (strapiUrl) {
  try {
    const parsed = new URL(strapiUrl);
    nextConfig.images.remotePatterns.push({
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port || undefined,
      pathname: '/uploads/**',
    });
  } catch (err) {
    // Gracefully ignore invalid URL configurations
  }
}

export default nextConfig;