"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  // Check if current route is the homepage (supporting all locale prefixes)
  const isHomepage = pathname === '/' || pathname === '/en' || pathname === '/fr' || pathname === '/es' || pathname === '/en/' || pathname === '/fr/' || pathname === '/es/';

  if (isHomepage) return null;
  return <Footer />;
}
