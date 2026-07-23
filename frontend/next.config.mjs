/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Production Hostinger VPS / generic IP & wildcard domain support for Strapi uploads (port 1337)
      {
        protocol: 'http',
        hostname: '**',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Production Hostinger VPS / generic IP & domain support for reverse-proxied Strapi uploads
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
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