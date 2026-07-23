"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  // Check if current route is the homepage
  const isHomepage = pathname === '/';

  if (isHomepage) return null;
  return <Footer />;
}
