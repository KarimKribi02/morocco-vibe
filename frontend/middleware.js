import { NextResponse } from 'next/server';

export function middleware(request) {
  // Pass through all requests directly at root routes without URL locale prefixing or redirects
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware matching to all page-level routes
    '/((?!api|_next/static|_next/image|favicon.ico|placeholder.png|.*\\..*).*)',
  ],
};
