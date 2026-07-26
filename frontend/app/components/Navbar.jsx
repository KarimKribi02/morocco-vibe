"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

export default function Navbar() {
  const pathname = usePathname();
  const { activeCurrency, changeCurrency, currencies } = useCurrency();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      : "border-white/30 text-white bg-white/10"
    : "border-gray-200 text-gray-800 bg-white";

  const userIconBorderClass = isHomepage
    ? scrolled
      ? "border-gray-300 text-gray-700 hover:bg-gray-100"
      : "border-white/30 text-white hover:bg-white/10"
    : "border-gray-300 text-gray-700 hover:bg-gray-100";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-12 flex justify-between items-center transition-all duration-300 ${navBackgroundClass}`}>
      <Link href="/" className="flex items-center w-52 sm:w-64 md:w-80 overflow-visible py-1">
        <motion.div 
          layoutId="navbar-logo"
          className="flex items-center origin-left transform scale-135 sm:scale-150 md:scale-165 transition-all duration-300"
        >
          <img 
            src="/assets/logo-full.png" 
            alt="Morocco Vibe Logo" 
            className={`h-[36px] sm:h-[42px] md:h-[48px] w-auto object-contain transition-all duration-300 ${logoFilterClass}`} 
          />
        </motion.div>
      </Link>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[11px] font-bold tracking-widest uppercase">
        <Link href="/" className={`transition-colors duration-200 ${textLinkColorClass}`}>HOME</Link>
        <Link href="/tours" className={`transition-colors duration-200 ${textLinkColorClass}`}>TOURS</Link>
        <Link href="/tours?destination=all" className={`transition-colors duration-200 ${textLinkColorClass}`}>DESTINATIONS</Link>
        <Link href="/tours?type=luxury" className={`transition-colors duration-200 ${textLinkColorClass}`}>EXPERIENCES</Link>
        <Link href="/about" className={`transition-colors duration-200 ${textLinkColorClass}`}>ABOUT US</Link>
        <Link href="/contact" className={`transition-colors duration-200 ${textLinkColorClass}`}>CONTACT</Link>
      </div>

      {/* ACTION CLUSTER (Language/Currency + User Icon + WhatsApp CTA) */}
      <div className="flex items-center gap-3.5">
        {/* Language/Currency Pill Selector */}
        <div className="relative flex items-center">
          <select 
            value={activeCurrency} 
            onChange={(e) => changeCurrency(e.target.value)}
            className={`border text-[11px] font-bold uppercase tracking-wider focus:outline-none px-2.5 py-1 cursor-pointer rounded-full transition appearance-none pr-5 ${selectBorderColorClass}`}
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code} className="bg-gray-900 text-white text-xs font-medium">
                {c.code}
              </option>
            ))}
          </select>
          <ChevronDown className={`w-3 h-3 absolute right-1.5 pointer-events-none ${isHomepage && !scrolled ? 'text-white' : 'text-gray-600'}`} />
        </div>

        {/* User Account Icon Button */}
        <Link 
          href="/contact"
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${userIconBorderClass}`}
          title="Account / Contact"
        >
          <User className="w-4 h-4" />
        </Link>

        {/* CTA BUTTON */}
        <a 
          href="https://wa.me/212634332000" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-orange-500 via-rose-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white px-4 md:px-5 py-2 md:py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all duration-300 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap hidden sm:inline-block"
        >
          BOOK ON WHATSAPP
        </a>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-1.5 rounded-lg ${isHomepage && !scrolled ? 'text-white' : 'text-gray-800'}`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Fullscreen Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#0B132B] text-white p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
          {/* Top Bar with Logo & Close Button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <img 
                src="/assets/logo-full.png" 
                alt="Morocco Vibe Logo" 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 py-8 text-center sm:text-left">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">HOME</Link>
            <Link href="/tours" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">TOURS</Link>
            <Link href="/tours?destination=all" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">DESTINATIONS</Link>
            <Link href="/tours?type=luxury" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">EXPERIENCES</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">ABOUT US</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl sm:text-2xl font-serif font-bold tracking-wider uppercase hover:text-[#E86D5A] transition">CONTACT</Link>
          </div>

          {/* Bottom Action Controls & CTA */}
          <div className="space-y-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-center gap-4">
              {/* Language Selector */}
              <div className="relative flex items-center bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-bold uppercase">
                <select 
                  value={activeCurrency} 
                  onChange={(e) => changeCurrency(e.target.value)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                      {c.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-2 text-white pointer-events-none" />
              </div>

              {/* User Account Button */}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>

            {/* WhatsApp CTA Button */}
            <a 
              href="https://wa.me/212634332000" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 text-white font-bold text-xs py-3.5 rounded-full uppercase tracking-wider shadow-xl shadow-orange-500/25"
            >
              BOOK ON WHATSAPP
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}