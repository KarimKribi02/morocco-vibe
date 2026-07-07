"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LogoMarquee from './components/LogoMarquee';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import FeaturedTours from './components/FeaturedTours';
import GuestReviews from './components/GuestReviews';
import FaqAccordion from './components/FaqAccordion';

export default function HomePage() {
  const { t } = useLanguage();

  // Search Widget Controlled States
  const [destinationSelection, setDestinationSelection] = useState('all');
  const [travelTypeSelection, setTravelTypeSelection] = useState('all');
  const [durationSelection, setDurationSelection] = useState('all');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    // Redirect to tours page with active filters as query params
    const queryParams = new URLSearchParams();
    if (destinationSelection !== 'all') queryParams.set('destination', destinationSelection);
    if (travelTypeSelection !== 'all') queryParams.set('type', travelTypeSelection);
    if (durationSelection !== 'all') queryParams.set('duration', durationSelection);
    
    window.location.href = `/tours?${queryParams.toString()}`;
  };

  // Framer Motion Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] scroll-smooth font-sans text-gray-800 relative z-0">
      
      {/* 1. HERO SECTION (Unified full-screen introduction baseline) */}
      <section className="min-h-screen w-full relative overflow-hidden flex flex-col justify-between pb-12 bg-gray-950 pt-20">
        {/* Full-width Background Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.jpg" 
            alt="Morocco Sunset Landscape Cover"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Smooth, soft dark overlay mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/30" />
        </div>

        {/* Content Layer */}
        <div className="flex-grow flex items-center justify-center relative z-10">
          <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center px-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center"
            >
              <motion.span 
                variants={fadeInUp}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-500/20 mb-6"
              >
                Tailored Morocco Expeditions
              </motion.span>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-none mb-6 max-w-4xl"
              >
                Experience the Majestic Soul of Morocco
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-white/85 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed font-light"
              >
                {t('subtitle')}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Floating search bar container */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-4xl mx-auto"
          >
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl md:rounded-full shadow-2xl p-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-0 items-center"
            >
              {/* Column 1: Where to? */}
              <div className="md:col-span-4 flex items-center space-x-3 px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-200/60">
                <MapPin className="text-orange-500 w-5 h-5 flex-shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Where to?</label>
                  <select 
                    value={destinationSelection} 
                    onChange={(e) => setDestinationSelection(e.target.value)}
                    className="w-full text-xs font-semibold text-gray-800 bg-transparent focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Destinations</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Sahara Desert">Sahara Desert</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Chefchaouen">Chefchaouen</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Fes">Fes</option>
                  </select>
                </div>
              </div>

              {/* Column 2: Travel Type */}
              <div className="md:col-span-4 flex items-center space-x-3 px-4 py-2 md:py-0 border-b md:border-b-0 md:border-r border-gray-200/60">
                <Sparkles className="text-orange-500 w-5 h-5 flex-shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Travel Type</label>
                  <select 
                    value={travelTypeSelection} 
                    onChange={(e) => setTravelTypeSelection(e.target.value)}
                    className="w-full text-xs font-semibold text-gray-800 bg-transparent focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">Select travel type</option>
                    <option value="luxury">Luxury Private Tour</option>
                    <option value="desert">Sahara Desert Safari</option>
                    <option value="adventure">Atlas Mountains Trekking</option>
                    <option value="cultural">Imperial Cities Culture</option>
                  </select>
                </div>
              </div>

              {/* Column 3: Duration */}
              <div className="md:col-span-3 flex items-center space-x-3 px-4 py-2 md:py-0">
                <Clock className="text-orange-500 w-5 h-5 flex-shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Duration</label>
                  <select 
                    value={durationSelection}
                    onChange={(e) => setDurationSelection(e.target.value)}
                    className="w-full text-xs font-semibold text-gray-800 bg-transparent focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">Select duration</option>
                    <option value="short">Short [1-4 Days]</option>
                    <option value="medium">Medium [5-9 Days]</option>
                    <option value="long">Long [10+ Days]</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="md:col-span-1 flex justify-end">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white w-full md:w-12 md:h-12 py-3.5 md:py-0 rounded-xl md:rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg shadow-orange-500/20 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  title="Search Journeys"
                >
                  <Search className="w-5 h-5" />
                  <span className="md:hidden ml-2 font-bold text-xs uppercase tracking-wider">Search Journeys</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. LOGOMARQUE (Continuous sleek OTA partners loop strip) */}
      <section className="w-full py-16 flex flex-col justify-center items-center bg-white border-b border-gray-100">
        <LogoMarquee />
      </section>

      {/* 3. FEATURED TOURS GRID (Breathtaking 3-column tour itineraries grid) */}
      <FeaturedTours className="will-change-transform" />

      {/* 4. GUEST EDITORIAL REVIEWS (Bespoke editorial customer reviews/testimonials slider) */}
      <GuestReviews className="will-change-transform" />

      {/* 7. HOW IT WORKS */}
      <div className="w-full min-h-screen md:h-screen snap-start snap-always flex flex-col justify-center relative bg-[#FDFBF7] will-change-transform">
        <HowItWorks />
      </div>

      {/* 8. FREQUENTLY ANSWERED INQUIRIES */}
      <FaqAccordion className="will-change-transform" />

      {/* 6. INTEGRATED FOOTER LAYOUT */}
      <Footer />

    </div>
  );
}