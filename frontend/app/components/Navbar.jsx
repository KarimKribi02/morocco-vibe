"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCurrency } from '../../context/CurrencyContext';

export default function Navbar() {
  const pathname = usePathname();
  const { activeCurrency, changeCurrency, currencies } = useCurrency();
  const [scrolled, setScrolled] = useState(false);

  // Check if we are on the homepage
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const snapContainer = document.getElementById('snap-container');
      const scrollPos = snapContainer 
        ? snapContainer.scrollTop 
        : (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);

      if (scrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Listen on the custom container scroll if it exists
    const snapContainer = document.getElementById('snap-container');
    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Run once on mount to capture initial scroll offset
    handleScroll();

    return () => {
      if (snapContainer) {
        snapContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Determine dynamic classes based on location and scroll position
  const navBackgroundClass = isHomepage
    ? scrolled
      ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-md py-3.5"
      : "bg-transparent border-b border-transparent py-5"
    : "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-3.5";

  const textLinkColorClass = isHomepage
    ? scrolled
      ? "text-gray-800 hover:text-orange-500"
      : "text-white/90 hover:text-orange-400"
    : "text-gray-800 hover:text-orange-500";

  const logoFilterClass = isHomepage
    ? scrolled
      ? ""
      : "brightness-0 invert"
    : "";

  const selectBorderColorClass = isHomepage
    ? scrolled
      ? "border-gray-200 text-gray-800 bg-white"
      : "border-white/30 text-white bg-transparent"
    : "border-gray-200 text-gray-800 bg-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 flex justify-between items-center transition-all duration-300 ${navBackgroundClass}`}>
      <Link href="/" className="flex items-center w-52 md:w-64 overflow-visible py-1">
        <motion.div 
          layoutId="navbar-logo"
          className="flex items-center origin-left transform scale-140 md:scale-155 transition-all duration-300"
        >
          <img 
            src="/assets/logo-full.png" 
            alt="Morocco Vibe Logo" 
            className={`h-[35px] md:h-[40px] w-auto object-contain transition-all duration-300 ${logoFilterClass}`} 
          />
        </motion.div>
      </Link>

      {/* LINKS */}
      <div className="hidden md:flex space-x-8 text-xs font-semibold tracking-wider uppercase">
        <Link href="/" className={`transition ${textLinkColorClass}`}>HOME</Link>
        <Link href="/tours" className={`transition ${textLinkColorClass}`}>GUIDED TOURS</Link>
        <Link href="/about" className={`transition ${textLinkColorClass}`}>ABOUT</Link>
        <Link href="/contact" className={`transition ${textLinkColorClass}`}>CONTACT</Link>
      </div>

      {/* ACTION CLUSTER (Currency + Book Tour) */}
      <div className="flex items-center gap-4">
        {/* Minimalist Premium Currency Selector */}
        <div className="relative">
          <select 
            value={activeCurrency} 
            onChange={(e) => changeCurrency(e.target.value)}
            className={`border text-[10px] font-bold uppercase tracking-wider focus:outline-none px-2 py-1 cursor-pointer rounded-md transition ${selectBorderColorClass}`}
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code} className="bg-white text-gray-800 text-xs font-medium">
                {c.code}
              </option>
            ))}
          </select>
        </div>

        {/* CTA BUTTON */}
        <Link 
          href="/book" 
          className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-4 md:px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          BOOK NOW
        </Link>
      </div>
    </nav>
  );
}