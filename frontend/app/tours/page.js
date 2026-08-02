"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ArrowRight, MapPin, Clock, Search, Heart, Star, 
  SlidersHorizontal, Compass, Users, Award, ShieldCheck, Play, X,
  Tag, Headphones, Palmtree, Crown, Landmark, Mountain, Waves,
  Camera, Utensils, ChevronLeft, ChevronRight, Filter, RotateCcw, ChevronDown
} from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Link from 'next/link';
import { useCurrency } from '../../context/CurrencyContext';

import Image from 'next/image';

// Safe Stateful Image Component with fallback handling and Next.js Image optimization
function SafeImage({ src, fallback = '/assets/desert-luxury-1.png', alt, className, priority = false, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw", unoptimized, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const finalSrc = imgSrc || fallback;
  const isLocalhostMedia = typeof finalSrc === 'string' && (finalSrc.includes('localhost') || finalSrc.includes('127.0.0.1'));

  return (
    <Image 
      src={finalSrc} 
      alt={alt || "Morocco Tour"} 
      fill
      priority={priority}
      sizes={sizes}
      unoptimized={unoptimized !== undefined ? unoptimized : isLocalhostMedia}
      className={className}
      onError={() => setImgSrc(fallback)} 
      {...props} 
    />
  );
}

const defaultMockTours = [
  {
    id: 1,
    slug: "11-days-colors-of-morocco",
    title: "11 Days Colors Of Morocco",
    subtitle: "Marrakech - Merzouga - Fes - Chefchaouen",
    badge: "BEST SELLER",
    badgeColor: "bg-orange-500",
    rating: "5.0",
    reviewsCount: 129,
    duration: "11 Days",
    type: "Private Tour",
    capacity: "4+ Guests",
    price: 890,
    image: "/assets/desert-luxury-1.png"
  },
  {
    id: 2,
    slug: "10-days-in-morocco-itinerary-desert-imperial-cities-the-north",
    title: "10 Days In Morocco Itinerary",
    subtitle: "Imperial Cities & The North",
    badge: "TRENDING",
    badgeColor: "bg-rose-500",
    rating: "4.9",
    reviewsCount: 96,
    duration: "10 Days",
    type: "Group Tour",
    capacity: "6+ Guests",
    price: 1290,
    image: "/assets/desert-luxury-2.png"
  },
  {
    id: 3,
    slug: "private-moroccan-adventure",
    title: "Private Moroccan Adventure",
    subtitle: "Tangier, Chefchaouen, Fes, Essaouira",
    badge: "POPULAR",
    badgeColor: "bg-amber-500",
    rating: "4.9",
    reviewsCount: 74,
    duration: "8 Days",
    type: "Private Tour",
    capacity: "2+ Guests",
    price: 2000,
    image: "/dest-chefchaouen.png"
  },
  {
    id: 4,
    slug: "8-day-group-adventure",
    title: "8-Day Group Adventure",
    subtitle: "Imperial Cities & Sahara Desert",
    badge: "LIMITED",
    badgeColor: "bg-purple-600",
    rating: "4.8",
    reviewsCount: 64,
    duration: "8 Days",
    type: "Group Tour",
    capacity: "4+ Guests",
    price: 1000,
    image: "/dest-merzouga.png"
  },
  {
    id: 5,
    slug: "essaouira-coastal-escape",
    title: "Essaouira Coastal Escape",
    subtitle: "Relaxation, Culture & Ocean Breeze",
    badge: "FEATURED",
    badgeColor: "bg-teal-600",
    rating: "4.7",
    reviewsCount: 52,
    duration: "6 Days",
    type: "Private Tour",
    capacity: "4+ Guests",
    price: 650,
    image: "/dest-essaouira.png"
  },
  {
    id: 6,
    slug: "atlas-mountains-experience",
    title: "Atlas Mountains Experience",
    subtitle: "Hiking, Berber Villages & Nature",
    badge: "RECOMMENDED",
    badgeColor: "bg-emerald-600",
    rating: "4.9",
    reviewsCount: 87,
    duration: "7 Days",
    type: "Private Tour",
    capacity: "2+ Guests",
    price: 750,
    image: "/dest-atlas.png"
  },
  {
    id: 7,
    slug: "marrakech-medina-culture",
    title: "Marrakech Medina Cultural Tour",
    subtitle: "Palaces, Gardens & Souks",
    badge: "NEW",
    badgeColor: "bg-indigo-600",
    rating: "4.9",
    reviewsCount: 43,
    duration: "4 Days",
    type: "Private Tour",
    capacity: "2+ Guests",
    price: 580,
    image: "/dest-marrakech.png"
  },
  {
    id: 8,
    slug: "fes-imperial-heritage",
    title: "Fes Imperial Heritage & Tanneries",
    subtitle: "Ancient Architecture & Artisan Crafts",
    badge: "POPULAR",
    badgeColor: "bg-[#E86D5A]",
    rating: "5.0",
    reviewsCount: 110,
    duration: "5 Days",
    type: "Private Tour",
    capacity: "2+ Guests",
    price: 720,
    image: "/dest-fes.png"
  }
];

export default function ToursPage() {
  const { formatPrice } = useCurrency();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination State (8 cards per page = 2 full rows of 4 cards)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter States
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState(3500);
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    async function loadTours() {
      try {
        setLoading(true);
        const data = await fetchFromStrapi('tours', 'populate=*');
        if (data && data.data && data.data.length > 0) {
          const formatted = data.data.map((item, idx) => {
            const attrs = item.attributes || item;
            let rawImgUrl = null;
            if (attrs.mainImage?.url) rawImgUrl = attrs.mainImage.url;
            else if (attrs.coverImage?.url) rawImgUrl = attrs.coverImage.url;
            else if (attrs.image?.url) rawImgUrl = attrs.image.url;

            const tourImg = rawImgUrl ? getStrapiMedia(rawImgUrl) : defaultMockTours[idx % defaultMockTours.length].image;

            return {
              id: item.documentId || item.id || idx,
              slug: attrs.slug || `tour-${idx}`,
              title: attrs.title || "Morocco Expedition",
              subtitle: attrs.destination || attrs.location || "Marrakech - Sahara - Fes",
              badge: idx === 0 ? "BEST SELLER" : idx === 1 ? "TRENDING" : "POPULAR",
              badgeColor: idx === 0 ? "bg-orange-500" : idx === 1 ? "bg-rose-500" : "bg-amber-500",
              rating: "4.9",
              reviewsCount: 80 + idx * 15,
              duration: attrs.duration ? (typeof attrs.duration === 'number' ? `${attrs.duration} Days` : attrs.duration) : "8 Days",
              type: attrs.type || "Private Tour",
              capacity: "2+ Guests",
              price: attrs.price || (800 + idx * 250),
              image: tourImg
            };
          });
          setTours(formatted);
        } else {
          setTours(defaultMockTours);
        }
      } catch (err) {
        console.error("Failed to load Strapi tours:", err);
        setTours(defaultMockTours);
      } finally {
        setLoading(false);
      }
    }

    loadTours();
  }, []);

  const rawTours = tours.length > 0 ? tours : defaultMockTours;

  // Filter & Sort Logic
  const filteredTours = useMemo(() => {
    return rawTours.filter(t => {
      // 1. Budget filter
      if (selectedBudget < t.price) return false;

      // 2. Destination filter
      if (selectedDestination !== 'all') {
        const destLower = selectedDestination.toLowerCase();
        const subtitleLower = (t.subtitle || '').toLowerCase();
        const titleLower = (t.title || '').toLowerCase();
        if (!subtitleLower.includes(destLower) && !titleLower.includes(destLower)) {
          return false;
        }
      }

      // 3. Duration filter
      if (selectedDuration !== 'all') {
        const days = parseInt(t.duration) || 0;
        if (selectedDuration === 'short' && (days < 1 || days > 5)) return false;
        if (selectedDuration === 'medium' && (days < 6 || days > 8)) return false;
        if (selectedDuration === 'long' && days < 9) return false;
      }

      // 4. Tour type filter
      if (selectedType !== 'all') {
        const typeLower = (t.type || '').toLowerCase();
        if (selectedType === 'private' && !typeLower.includes('private')) return false;
        if (selectedType === 'group' && !typeLower.includes('group')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [rawTours, selectedBudget, selectedDestination, selectedDuration, selectedType, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredTours.length / itemsPerPage));
  const currentTours = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredTours.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredTours, currentPage, itemsPerPage]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetFilters = () => {
    setSelectedDestination('all');
    setSelectedDuration('all');
    setSelectedType('all');
    setSelectedBudget(3500);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Morocco Vibe Luxury & Private Tours',
    'description': 'Browse handpicked private Morocco tours, Sahara desert expeditions, and imperial city heritage itineraries.',
    'numberOfItems': filteredTours.length,
    'itemListElement': filteredTours.map((t, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'Product',
        'name': t.title,
        'url': `https://moroccovibetours.com/tours/${t.slug}`,
        'image': typeof t.image === 'string' && t.image.startsWith('http') ? t.image : `https://moroccovibetours.com${t.image || '/assets/desert-luxury-1.png'}`,
        'offers': {
          '@type': 'Offer',
          'price': t.price,
          'priceCurrency': 'EUR',
          'availability': 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900 font-sans pb-16 selection:bg-orange-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative min-h-[440px] md:min-h-[500px] w-full flex flex-col justify-between bg-gray-950 pt-28 md:pt-36 pb-0 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="/ChatGPT Image Jul 30, 2026, 10_34_27 PM.png"
            fallback="/tours-hero-bg.png" 
            alt="Moroccan Kasbah Sunset"
            priority={true}
            sizes="100vw"
            className="w-full h-full object-cover object-top brightness-[0.95] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full my-auto text-left text-white pt-4">
          <div className="max-w-2xl space-y-3">
            <motion.span 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#E06D29] block"
            >
              EXPLORE MOROCCO
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white font-bold leading-[1.15]"
            >
              One Country,
              <br />
              <span className="text-[#E06D29]">
                Endless Journeys
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed"
            >
              Handpicked tours across Morocco. Authentic experiences, local experts, and unforgettable memories.
            </motion.p>

            {/* Feature Badges Horizontal Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4 flex flex-wrap items-center gap-5 sm:gap-6 md:gap-8 text-xs font-medium text-gray-200"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200">100% Local Experts</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Tag className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200">Best Price Guarantee</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200">Flexible Bookings</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Headphones className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200">24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Curved Wave Divider */}
        <div className="relative w-full overflow-hidden leading-none z-10 mt-8">
          <svg className="relative block w-full h-10 md:h-12 text-[#FAF8F5]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 L0,45 Q15,42 30,48 Q45,54 60,40 Q75,26 90,38 Q105,50 120,44 Q135,38 150,49 Q165,60 180,45 Q195,30 210,42 Q225,54 240,40 Q255,26 270,38 Q285,50 300,43 Q315,36 330,48 Q345,60 360,44 Q375,28 390,41 Q405,54 420,46 Q435,38 450,51 Q465,64 480,47 Q495,30 510,42 Q525,54 540,39 Q555,24 570,37 Q585,50 600,45 Q615,40 630,52 Q645,64 660,46 Q675,28 690,40 Q705,52 720,44 Q735,36 750,49 Q765,62 780,45 Q795,28 810,41 Q825,54 840,43 Q855,32 870,47 Q885,62 900,48 Q915,34 930,44 Q975,30 990,46 Q1035,36 1050,47 Q1065,58 1080,43 Q1095,28 1110,40 Q1125,52 1140,44 Q1155,36 1170,48 Q1185,60 1200,42 L1200,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA (COLLAPSIBLE RESPONSIVE FILTER BAR + 4-COLUMN CARDS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* CENTERED FILTER BAR WITH RESPONSIVE TOGGLE */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-150 shadow-md mb-8 transition-all duration-300">
          
          {/* Header Bar (Clickable on Mobile) */}
          <div 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center justify-between cursor-pointer md:cursor-default select-none border-b border-gray-100 pb-3 flex-wrap gap-3"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#E06D29]" />
              <h3 className="font-serif font-bold text-base text-gray-900">Filter Experiences</h3>
              
              {/* Mobile Status Badge */}
              <span className="md:hidden text-[10px] font-extrabold bg-orange-50 text-[#E06D29] px-2.5 py-0.5 rounded-full border border-orange-200 ml-1">
                {isMobileFilterOpen ? 'Tap to Hide' : 'Tap to Filter'}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-gray-500 text-[11px] sm:text-xs">
                Showing <span className="text-gray-900 font-extrabold">{filteredTours.length}</span> Experiences
              </span>

              <button 
                onClick={(e) => { e.stopPropagation(); handleResetFilters(); }}
                className="text-[11px] font-bold text-[#E06D29] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Filters</span>
              </button>

              {/* Mobile Expand Chevron */}
              <div className="md:hidden w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileFilterOpen ? 'rotate-180 text-[#E06D29]' : ''}`} />
              </div>
            </div>
          </div>

          {/* Controls Grid (Collapsed on Mobile by default, always visible on Desktop) */}
          <div className={`${isMobileFilterOpen ? 'block pt-4' : 'hidden'} md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center md:pt-4`}>
            
            {/* 1. Destination Filter */}
            <div className="space-y-1 text-left mb-3 md:mb-0">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">DESTINATION</label>
              <select 
                value={selectedDestination}
                onChange={(e) => { setSelectedDestination(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none bg-gray-50/60 cursor-pointer hover:border-[#E06D29] transition-colors"
              >
                <option value="all">All Destinations</option>
                <option value="marrakech">Marrakech</option>
                <option value="merzouga">Sahara Desert (Merzouga)</option>
                <option value="chefchaouen">Chefchaouen</option>
                <option value="fes">Fes</option>
                <option value="essaouira">Essaouira</option>
                <option value="atlas">Atlas Mountains</option>
              </select>
            </div>

            {/* 2. Duration Filter */}
            <div className="space-y-1 text-left mb-3 md:mb-0">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">DURATION</label>
              <select 
                value={selectedDuration}
                onChange={(e) => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none bg-gray-50/60 cursor-pointer hover:border-[#E06D29] transition-colors"
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 5 Days</option>
                <option value="medium">6 - 8 Days</option>
                <option value="long">9+ Days</option>
              </select>
            </div>

            {/* 3. Tour Type Filter */}
            <div className="space-y-1 text-left mb-3 md:mb-0">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">TOUR TYPE</label>
              <select 
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none bg-gray-50/60 cursor-pointer hover:border-[#E06D29] transition-colors"
              >
                <option value="all">All Types</option>
                <option value="private">Private Tour</option>
                <option value="group">Group Tour</option>
              </select>
            </div>

            {/* 4. Price Range Slider */}
            <div className="space-y-1 text-left mb-3 md:mb-0">
              <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                <span>MAX PRICE</span>
                <span className="text-gray-900 font-extrabold">€{selectedBudget}</span>
              </div>
              <input 
                type="range" 
                min={200} 
                max={3500} 
                step={50}
                value={selectedBudget}
                onChange={(e) => { setSelectedBudget(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-[#E06D29] cursor-pointer mt-1.5"
              />
            </div>

            {/* 5. Sort Selector */}
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">SORT BY</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none bg-gray-50/60 cursor-pointer hover:border-[#E06D29] transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* 4-COLUMNS TOURS CARDS GRID */}
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentTours.map((tour) => (
              <div 
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                {/* Image Backdrop & Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <SafeImage 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 ${tour.badgeColor || 'bg-orange-500'} text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow`}>
                    {tour.badge || "BEST SELLER"}
                  </span>

                  {/* Heart Favorite Button */}
                  <button 
                    onClick={() => toggleFavorite(tour.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-rose-500 transition cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites[tour.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 text-left flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs text-orange-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      <span>{tour.rating}</span>
                      <span className="text-gray-400 font-normal">({tour.reviewsCount})</span>
                    </div>

                    {/* Title */}
                    <Link href={`/tours/${tour.slug}`}>
                      <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#E06D29] transition-colors line-clamp-1">
                        {tour.title}
                      </h3>
                    </Link>

                    {/* Subtitle / Locations */}
                    <p className="text-[11px] text-gray-500 font-light line-clamp-1">
                      {tour.subtitle}
                    </p>

                    {/* Metadata Pills with Lucide Icons */}
                    <div className="flex items-center justify-between pt-2.5 text-[10px] text-gray-600 font-medium border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#E06D29]" />
                        <span>{tour.duration}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#E06D29]" />
                        <span>{tour.type}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#E06D29]" />
                        <span>{tour.capacity}</span>
                      </span>
                    </div>
                  </div>

                  {/* Price & Action Link */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold uppercase block">From</span>
                      <span className="text-sm font-extrabold text-gray-900">{formatPrice(tour.price)}</span>
                    </div>

                    <Link 
                      href={`/tours/${tour.slug}`}
                      className="text-[11px] font-bold text-[#E06D29] hover:text-orange-600 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      VIEW DETAILS →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FUNCTIONAL PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-[#E06D29] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 via-[#E06D29] to-rose-500 text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-[#E06D29]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-[#E06D29] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </section>
  

  
      {/* 3. WATCH MOROCCO COME TO LIFE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-xl border border-white/10">
          <SafeImage 
            src="/watch-morocco-bg.png" 
            alt="Watch Morocco Come to Life" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-10 text-white z-10">
            <div className="text-left space-y-1">
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">Watch Morocco Come to Life</h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light">Real moments. Real people. Real Morocco.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. READY TO START YOUR JOURNEY? ACTION BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-white rounded-3xl p-8 md:p-12 border border-amber-500/20 shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <h3 className="font-serif font-bold text-3xl text-gray-900">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-lg mx-auto">
            Our travel experts are here to help you plan the perfect Moroccan adventure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a 
              href="https://wa.me/212634332000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-[#E06D29] to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transform hover:-translate-y-0.5 transition"
            >
              BOOK ON WHATSAPP
            </a>

            <Link 
              href="/tours" 
              className="px-8 py-3.5 rounded-full border border-gray-300 text-gray-800 font-bold text-xs uppercase tracking-wider hover:border-orange-500 hover:text-orange-500 transition"
            >
              EXPLORE TOURS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
