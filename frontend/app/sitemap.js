export const revalidate = 3600; // Revalidate sitemap every 1 hour

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moroccovibe.com';
  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

  // 1. Static Canonical Routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. Fetch Dynamic Tour Slugs from Strapi CMS
  let tourRoutes = [];
  try {
    const res = await fetch(`${strapiUrl.replace(/\/+$/, '')}/api/tours?fields[0]=slug&fields[1]=updatedAt`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.data && data.data.length > 0) {
        tourRoutes = data.data.map((item) => {
          const attrs = item.attributes || item;
          const slug = attrs.slug || `tour-${item.id}`;
          const updatedAt = attrs.updatedAt ? new Date(attrs.updatedAt) : new Date();
          return {
            url: `${baseUrl}/tours/${slug}`,
            lastModified: updatedAt,
            changeFrequency: 'weekly',
            priority: 0.8,
          };
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch tour slugs for sitemap generation:", error);
  }

  // 3. Fallback Dynamic Routes if Strapi returned nothing or offline
  if (tourRoutes.length === 0) {
    const defaultSlugs = [
      "10-days-in-morocco-itinerary-desert-imperial-cities-the-north",
      "sahara-luxury-nomad-expedition",
      "11-days-colors-of-morocco",
      "private-moroccan-adventure",
      "8-day-group-adventure",
      "essaouira-coastal-escape",
      "atlas-mountains-experience",
      "marrakech-medina-culture",
      "fes-imperial-heritage"
    ];

    tourRoutes = defaultSlugs.map((slug) => ({
      url: `${baseUrl}/tours/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...tourRoutes];
}
