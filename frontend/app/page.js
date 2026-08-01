"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, Clock, Sparkles, Users, Compass, ShieldCheck, Crown, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LogoMarquee from './components/LogoMarquee';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import FeaturedTours from './components/FeaturedTours';
import WatchMoroccoBanner from './components/WatchMoroccoBanner';
import GuestReviews from './components/GuestReviews';
import FaqAccordion from './components/FaqAccordion';

export default function HomePage() {
  const { t } = useLanguage();

  // Search Widget Controlled States
  const [destinationSelection, setDestinationSelection] = useState('all');
  const [travelTypeSelection, setTravelTypeSelection] = useState('all');
  const [durationSelection, setDurationSelection] = useState('all');
  const [travelersSelection, setTravelersSelection] = useState('2');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    // Redirect to tours page with active filters as query params
    const queryParams = new URLSearchParams();
    if (destinationSelection !== 'all') queryParams.set('destination', destinationSelection);
    if (travelTypeSelection !== 'all') queryParams.set('type', travelTypeSelection);
    if (durationSelection !== 'all') queryParams.set('duration', durationSelection);
    if (travelersSelection !== 'all') queryParams.set('travelers', travelersSelection);
    
    window.location.href = `/tours?${queryParams.toString()}`;
  };

  // Framer Motion Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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

  const travelAgencySchema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'TouristInformationCenter'],
    '@id': 'https://moroccovibe.com/#organization',
    'name': 'Morocco Vibe',
    'alternateName': 'Morocco Vibe Travel & Tours',
    'url': 'https://moroccovibe.com',
    'logo': 'https://moroccovibe.com/assets/logo-full.png',
    'image': 'https://moroccovibe.com/assets/desert-luxury-1.png',
    'telephone': '+212634332000',
    'email': 'contact@moroccovibe.com',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Medina Heritage Quarter',
      'addressLocality': 'Marrakech',
      'addressRegion': 'Marrakech-Safi',
      'postalCode': '40000',
      'addressCountry': 'MA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 31.6295,
      'longitude': -7.9811
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+212634332000',
      'contactType': 'customer service',
      'areaServed': 'Worldwide',
      'availableLanguage': ['English', 'French', 'Spanish', 'Arabic']
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '08:00',
      'closes': '22:00'
    },
    'sameAs': [
      'https://instagram.com/moroccovibe',
      'https://facebook.com/moroccovibe'
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Are all tours private and customizable?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! Every itinerary is 100% private and fully tailorable to your travel pace, accommodation preferences, and interest points.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is included in the Sahara Desert Luxury Expedition?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our Sahara expeditions include private 4x4 transport with an experienced driver/guide, luxury air-conditioned desert camp stays with ensuite bathrooms, camel trekking, dinners, and breakfasts.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What languages do your local guides speak?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our professional tour drivers and local medina guides speak fluent English, French, Spanish, and Arabic.'
        }
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] scroll-smooth font-sans text-gray-800 relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* 1. HERO SECTION (Matched exactly to reference design & fully responsive) */}
      <section className="min-h-screen lg:h-screen w-full relative overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 bg-gray-950">
        {/* Full-width Background Backdrop */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg-v2.png" 
            alt="Morocco Sunset Landscape Cover"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-100"
          />
          {/* Subtle top gradient only for top navigation readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Left Content Layer */}
        <div className="flex-grow flex items-center relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 pt-4 sm:pt-8 pb-4">
          <div className="max-w-3xl text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-start"
            >
              {/* Top Pill Badge */}
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-amber-200 bg-amber-950/40 backdrop-blur-md border border-amber-500/30 shadow-md mb-4 sm:mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                TAILORED MOROCCO EXPEDITIONS
              </motion.div>

              {/* Main Heading */}
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5"
              >
                Experience the <br className="hidden sm:inline" />
                Majestic Soul of <span className="text-orange-500">Morocco</span>
              </motion.h1>

              {/* Subtitle Lines */}
              <motion.div variants={fadeInUp} className="space-y-1 mb-6 sm:mb-8">
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  Authentic journeys. Curated with passion.
                </p>
                <p className="text-white/75 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                  Designed for luxury travelers seeking unforgettable experiences.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Search Bar & Bottom Trust Badges */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 space-y-4 sm:space-y-6">
          {/* Floating Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl sm:rounded-3xl lg:rounded-full shadow-2xl p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-center justify-between gap-2.5 sm:gap-3 lg:gap-0"
            >
              {/* Field 1: Destination */}
              <div className="w-full lg:flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 lg:py-1 border-b sm:border-b-0 sm:border-r border-gray-200/80">
                <div className="p-2 rounded-full bg-orange-50 text-orange-500 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-0.5">Destination</label>
                  <select 
                    value={destinationSelection} 
                    onChange={(e) => setDestinationSelection(e.target.value)}
                    className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-4"
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

              {/* Field 2: Tour Type */}
              <div className="w-full lg:flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 lg:py-1 border-b sm:border-b-0 lg:border-r border-gray-200/80">
                <div className="p-2 rounded-full bg-orange-50 text-orange-500 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-0.5">Tour Type</label>
                  <select 
                    value={travelTypeSelection} 
                    onChange={(e) => setTravelTypeSelection(e.target.value)}
                    className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="all">Select tour type</option>
                    <option value="luxury">Luxury Private Tour</option>
                    <option value="desert">Sahara Desert Safari</option>
                    <option value="adventure">Atlas Mountains Trekking</option>
                    <option value="cultural">Imperial Cities Culture</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Duration */}
              <div className="w-full lg:flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 lg:py-1 border-b sm:border-b-0 sm:border-r border-gray-200/80">
                <div className="p-2 rounded-full bg-orange-50 text-orange-500 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-0.5">Duration</label>
                  <select 
                    value={durationSelection}
                    onChange={(e) => setDurationSelection(e.target.value)}
                    className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="all">Select duration</option>
                    <option value="short">Short [1-4 Days]</option>
                    <option value="medium">Medium [5-9 Days]</option>
                    <option value="long">Long [10+ Days]</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Travelers */}
              <div className="w-full lg:flex-1 flex items-center space-x-3 px-3 sm:px-4 py-2 lg:py-1">
                <div className="p-2 rounded-full bg-orange-50 text-orange-500 flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="w-full text-left">
                  <label className="block text-[10px] uppercase tracking-wider text-amber-700 font-bold mb-0.5">Travelers</label>
                  <select 
                    value={travelersSelection}
                    onChange={(e) => setTravelersSelection(e.target.value)}
                    className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="2">2 Travelers</option>
                    <option value="1">1 Traveler</option>
                    <option value="3-4">3-4 Travelers</option>
                    <option value="5+">5+ Travelers</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:col-span-2 lg:w-auto flex justify-end lg:pl-2">
                <button 
                  type="submit"
                  className="w-full lg:w-13 lg:h-13 py-3 lg:py-0 rounded-xl lg:rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg shadow-orange-500/30 transform hover:scale-105 active:scale-95 cursor-pointer"
                  title="Search Journeys"
                >
                  <Search className="w-5 h-5" />
                  <span className="lg:hidden ml-2 font-bold text-xs uppercase tracking-wider">Search Journeys</span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Bottom Trust Badges Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-3 border-t border-white/10"
          >
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Local Experts</p>
                <p className="text-[10px] sm:text-[11px] text-white/65 font-light">24/7 Support</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Best Price Guarantee</p>
                <p className="text-[10px] sm:text-[11px] text-white/65 font-light">No hidden fees</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Luxury Experience</p>
                <p className="text-[10px] sm:text-[11px] text-white/65 font-light">Handpicked with care</p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Trusted by Travelers</p>
                <p className="text-[10px] sm:text-[11px] text-amber-300 font-medium">5★ Rated Service</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LOGOMARQUE (Continuous sleek OTA partners loop strip) */}
      <LogoMarquee />

      {/* 3. FEATURED TOURS GRID */}
      <FeaturedTours className="will-change-transform" />

      {/* 3.5. WATCH MOROCCO COME TO LIFE BANNER SECTION */}
      <WatchMoroccoBanner />

      {/* 4. GUEST EDITORIAL REVIEWS (Bespoke editorial customer reviews/testimonials slider) */}
      <GuestReviews className="will-change-transform" />

      {/* 7. HOW IT WORKS */}
      <HowItWorks />

      {/* 8. FREQUENTLY ANSWERED INQUIRIES */}
      <FaqAccordion className="will-change-transform" />

      {/* 6. INTEGRATED FOOTER LAYOUT */}
      <Footer />

    </div>
  );
}