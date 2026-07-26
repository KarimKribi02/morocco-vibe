"use client";

import Image from 'next/image';
import { Sparkles, Headphones, Compass } from 'lucide-react';

export default function WatchMoroccoBanner() {
  return (
    <section className="relative w-full min-h-[220px] md:min-h-[260px] flex items-center justify-center text-white overflow-hidden py-10 px-4 sm:px-8 lg:px-12 z-10 border-y border-amber-500/10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/watch-morocco-bg.png" 
          alt="Watch Morocco Come to Life" 
          fill 
          className="object-cover object-center scale-105"
          priority
        />
        {/* Subtle overlay for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/60 md:to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Left Side: Title & Description */}
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md">
            Watch Morocco <br className="hidden sm:inline" />
            Come to Life
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed max-w-md drop-shadow">
            A land of vibrant culture, ancient traditions and breathtaking landscapes.
          </p>
        </div>

        {/* Right Side: 3 Creative Stats Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10">
          
          {/* Stat 1 */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-lg transform hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-tight">200+</p>
              <p className="text-[10px] sm:text-[11px] text-gray-200 font-light">Unique Experiences</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-lg transform hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-tight">24/7</p>
              <p className="text-[10px] sm:text-[11px] text-gray-200 font-light">Concierge Support</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-lg transform hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-tight">100%</p>
              <p className="text-[10px] sm:text-[11px] text-gray-200 font-light">Tailor Made</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
