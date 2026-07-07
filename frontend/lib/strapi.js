const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function fetchFromStrapi(endpoint, queryParams = '') {
  try {
    const separator = queryParams ? (queryParams.startsWith('?') ? '' : '?') : '';
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}${separator}${queryParams}`, {
      cache: 'no-store', // Dima fresh data f l-development
    });
    
    if (!res.ok) {
      throw new Error(`Strapi error: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch from Strapi:", error);
    return null;
  }
}

export function getStrapiMedia(url) {
  if (!url) return null;
  // If the url is already absolute or is a local public asset path, return it directly
  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('/assets/') || url.startsWith('/placeholder')) return url;
  // If it's a dynamic Strapi media URL, join it with the Strapi API URL
  return `${STRAPI_URL}${url}`;
}