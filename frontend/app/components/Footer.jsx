"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-white text-gray-750 pt-24 pb-12 border-t border-gray-100 font-sans overflow-hidden">
      
      {/* BACKGROUND VECTOR: Mountain peaks outline overlay on the right side */}
      <div className="absolute right-0 bottom-0 h-full w-[45%] pointer-events-none z-0 opacity-[0.25] select-none hidden md:block">
        <svg className="w-full h-full text-gray-300" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Detailed mountain peaks path representing the blueprint design */}
          <path 
            d="M350 400 L440 220 L460 250 L530 110 L600 240 M280 400 L380 260 L410 290 L480 180 L580 400" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M480 180 L495 210 L510 195 L530 225" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="2 2"
          />
          <path 
            d="M440 220 L452 245 L465 235" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 relative z-10">
        
        {/* Column 1: Brand Info (3/12 span) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Official Logo full asset */}
          <div className="select-none w-64 md:w-72 overflow-visible mb-6 pb-2">
            <img 
              src="/assets/logo-full.png" 
              alt="Morocco Vibe Logo" 
              className="h-[48px] md:h-[55px] w-auto object-contain object-left origin-left transform scale-125 md:scale-135 transition-all duration-300" 
            />
          </div>

          <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Travel helps companies manage payments easily.
          </p>
          
          {/* Social Icons matching orange/coral tone using resilient inline SVGs */}
          <div className="flex items-center space-x-4 pt-2">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 hover:text-rose-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://messenger.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 hover:text-rose-500 transition-colors"
              aria-label="Messenger Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.011-2.203c1.113.308 2.292.475 3.517.475 6.627 0 12-4.975 12-11.111s-5.373-11.111-12-11.111zm1.193 14.863l-3.039-3.241-5.927 3.241 6.52-6.924 3.094 3.241 5.872-3.241-6.52 6.924z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 hover:text-rose-500 transition-colors"
              aria-label="Twitter Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://infinity.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-orange-500 hover:text-rose-500 transition-colors"
              aria-label="Infinity Link"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17 7c-1.92 0-3.606 1.096-4.62 2.705-1.014-1.609-2.7-2.705-4.62-2.705-3.187 0-6 2.72-6 6s2.813 6 6 6c1.92 0 3.606-1.096 4.62-2.705 1.014 1.609 2.7 2.705 4.62 2.705 3.187 0 6-2.72 6-6s-2.813-6-6-6zm-9.24 10c-2.316 0-4.76-2.096-4.76-4s2.444-4 4.76-4c1.688 0 3.256 1.503 3.968 2.784l.323.583-.323.583c-.712 1.281-2.28 2.784-3.968 2.784zm9.24 0c-1.688 0-3.256-1.503-3.968-2.784l-.323-.583.323-.583c.712-1.281 2.28-2.784 3.968-2.784 2.316 0 4.76 2.096 4.76 4s-2.444 4-4.76 4z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Company (2/12 span) */}
        <div className="lg:col-span-2 lg:ml-6 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-xs md:text-sm text-gray-400 font-light">
            <li>
              <Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500 transition-colors">Careers</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500 transition-colors">Blog</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-500 transition-colors">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Destinations (2/12 span) */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Destinations</h4>
          <ul className="space-y-3 text-xs md:text-sm text-gray-400 font-light">
            <li>
              <Link href="/tours?destination=Marrakech" className="hover:text-orange-500 transition-colors">Marrakech</Link>
            </li>
            <li>
              <Link href="/tours?destination=Sahara%2520Desert" className="hover:text-orange-500 transition-colors">Sahara Desert</Link>
            </li>
            <li>
              <Link href="/tours?destination=Chefchaouen" className="hover:text-orange-500 transition-colors">Chefchaouen</Link>
            </li>
            <li>
              <Link href="/tours?destination=Fes" className="hover:text-orange-500 transition-colors">Fes Medina</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter Widget (5/12 span) */}
        <div className="lg:col-span-5 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Join Our Newsletter</h4>
          
          {/* Custom horizontal input widget */}
          <div className="flex bg-[#F0EFFF]/60 rounded-2xl p-1.5 max-w-md border border-gray-100 shadow-inner">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-transparent px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 outline-none"
            />
            <button 
              type="button" 
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:brightness-105 transition-all shadow-md shadow-orange-500/10 cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          <p className="text-[10px] text-gray-400 font-light leading-relaxed max-w-sm">
            * Will send you weekly updates for your better tour packages.
          </p>
        </div>

      </div>

      {/* Global Bottom Accent Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-100 flex justify-center items-center relative z-10">
        <p className="text-[11px] text-gray-400 font-medium tracking-wide">
          Copyright @ Morocco Vibe 2026. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}
