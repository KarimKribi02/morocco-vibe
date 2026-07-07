import { NextResponse } from 'next/server';

const LOCALES = ['en', 'fr', 'es'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public files, Next.js system routes, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/placeholder.png' ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|js|css|json)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Check if the path is missing a valid locale prefix
  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Detect preferred browser locale or default to English
    const acceptLang = request.headers.get('accept-language') || '';
    let detectedLocale = 'en';
    
    if (acceptLang.includes('fr')) {
      detectedLocale = 'fr';
    } else if (acceptLang.includes('es')) {
      detectedLocale = 'es';
    }

    // Redirect user to the path prefixed with their locale
    const redirectUrl = new URL(
      `/${detectedLocale}${pathname}${request.nextUrl.search}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // 3. Extract the locale prefix (first path segment)
  const segments = pathname.split('/');
  const locale = segments[1];
  const restOfPath = '/' + segments.slice(2).join('/');

  // 4. Rewrite request internally to the page segment, appending the locale parameter
  const rewriteUrl = new URL(request.nextUrl.clone());
  rewriteUrl.pathname = restOfPath;
  rewriteUrl.searchParams.set('locale', locale);

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    // Apply middleware matching to all page-level routes
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.png|.*\\..*).*)',
  ],
};
