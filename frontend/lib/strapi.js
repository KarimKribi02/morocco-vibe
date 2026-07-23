const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_URL = rawApiUrl.replace(/\/+$/, '');

export async function fetchFromStrapi(endpoint, queryParams = '') {
  try {
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    const separator = queryParams ? (queryParams.startsWith('?') ? '' : '?') : '';
    const res = await fetch(`${STRAPI_URL}/api/${cleanEndpoint}${separator}${queryParams}`, {
      cache: 'no-store',
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
  // Ensure leading slash for media path
  const mediaPath = url.startsWith('/') ? url : `/${url}`;
  return `${STRAPI_URL}${mediaPath}`;
}