"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ArrowRight, MapPin, Clock, Search, Heart, Star, 
  SlidersHorizontal, Compass, Users, Award, ShieldCheck, Play, X,
  Tag, Headphones, Palmtree, Crown, Landmark, Mountain, Waves,
  Camera, Utensils, ChevronLeft, ChevronRight, Filter, RotateCcw
} from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Link from 'next/link';
import { useCurrency } from '../../context/CurrencyContext';

// Safe Stateful Image Component with fallback handling
function SafeImage({ src, fallback = '/assets/desert-luxury-1.png', alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img 
      src={imgSrc || fallback} 
      alt={alt || "Morocco Tour"} 
      className={className}
      onError={() => setImgSrc(fallback)} 
      {...props} 
    />
  );
}

const categoryPills = [
  { id: "all", label: "All Experiences", Icon: Compass },
  { id: "desert", label: "Desert", Icon: Palmtree },
  { id: "luxury", label: "Luxury", Icon: Crown },
  { id: "adventure", label: "Adventure", Icon: Compass },
  { id: "culture", label: "Culture", Icon: Landmark },
  { id: "mountains", label: "Mountains", Icon: Mountain },
  { id: "coast", label: "Coast", Icon: Waves },
  { id: "family", label: "Family", Icon: Users },
  { id: "honeymoon", label: "Honeymoon", Icon: Heart },
  { id: "photography", label: "Photography", Icon: Camera },
  { id: "food", label: "Food", Icon: Utensils }
];

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
    slug: "10-days-in-morocco-itinerary",
    title: "10 Days In Morocco Itinerary",
    subtitle: "Imperial Cities & The North",
    badge: "TRENDING",
    badgeColor: "bg-rose-500",
    rating: "4.9",
    reviewsCount: 96,
    duration: "10 Days",
    type: "Group Tour",
    capacity: "6+ Guests",
    price: 1200,
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter States
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState(3500);
  const [sortBy, setSortBy] = useState('popular');
  const [isPrivateOnly, setIsPrivateOnly] = useState(false);
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

      // 5. Private only toggle
      if (isPrivateOnly && !t.type.toLowerCase().includes('private')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [rawTours, selectedBudget, selectedDestination, selectedDuration, selectedType, isPrivateOnly, sortBy]);

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
    setIsPrivateOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900 font-sans pb-16 selection:bg-orange-500 selection:text-white">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative min-h-[500px] md:min-h-[580px] w-full flex flex-col justify-between bg-gray-950 pt-28 md:pt-36 pb-0 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="/ChatGPT Image Jul 30, 2026, 10_34_27 PM.png"
            fallback="/tours-hero-bg.png" 
            alt="Moroccan Kasbah Sunset"
            className="w-full h-full object-cover object-top brightness-[0.95] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full my-auto text-left text-white pt-8">
          <div className="max-w-2xl space-y-4">
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
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed pt-1"
            >
              Handpicked tours across Morocco. Authentic experiences, local experts, and unforgettable memories.
            </motion.p>

            {/* Feature Badges Horizontal Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 flex flex-wrap items-center gap-5 sm:gap-6 md:gap-8 text-xs font-medium text-gray-200"
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

        {/* Torn Paper Edge Bottom SVG Divider */}
        <div className="relative w-full overflow-hidden leading-none z-10 mt-12">
          <svg className="relative block w-full h-10 md:h-14 text-[#FAF8F5]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 L0,45 Q15,42 30,48 Q45,54 60,40 Q75,26 90,38 Q105,50 120,44 Q135,38 150,49 Q165,60 180,45 Q195,30 210,42 Q225,54 240,40 Q255,26 270,38 Q285,50 300,43 Q315,36 330,48 Q345,60 360,44 Q375,28 390,41 Q405,54 420,46 Q435,38 450,51 Q465,64 480,47 Q495,30 510,42 Q525,54 540,39 Q555,24 570,37 Q585,50 600,45 Q615,40 630,52 Q645,64 660,46 Q675,28 690,40 Q705,52 720,44 Q735,36 750,49 Q765,62 780,45 Q795,28 810,41 Q825,54 840,43 Q855,32 870,47 Q885,62 900,48 Q915,34 930,44 Q945,54 960,42 Q975,30 990,46 Q1035,36 1050,47 Q1065,58 1080,43 Q1095,28 1110,40 Q1125,52 1140,44 Q1155,36 1170,48 Q1185,60 1200,42 L1200,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 2. MAIN DIRECTORY LAYOUT (LEFT FILTERS SIDEBAR + 3-COLUMN TOURS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-gray-800 shadow-sm"
          >
            <Filter className="w-4 h-4 text-[#E86D5A]" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR FILTERS (w-full lg:w-1/4) */}
          <div className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 bg-white rounded-3xl p-6 border border-gray-150 shadow-sm space-y-6 shrink-0`}>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-bold text-base text-gray-900 uppercase tracking-wide">FILTERS</h3>
              <button 
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-[#E86D5A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>

            {/* Destination */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">DESTINATION</label>
              <select 
                value={selectedDestination}
                onChange={(e) => { setSelectedDestination(e.target.value); setCurrentPage(1); }}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50 cursor-pointer"
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

            {/* Price Range Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <span>PRICE RANGE</span>
                <span className="text-gray-900 font-extrabold">€0 - €{selectedBudget}</span>
              </div>
              <input 
                type="range" 
                min={200} 
                max={3500} 
                step={50}
                value={selectedBudget}
                onChange={(e) => { setSelectedBudget(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">DURATION</label>
              <select 
                value={selectedDuration}
                onChange={(e) => { setSelectedDuration(e.target.value); setCurrentPage(1); }}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50 cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 5 Days</option>
                <option value="medium">6 - 8 Days</option>
                <option value="long">9+ Days</option>
              </select>
            </div>

            {/* Tour Type */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">TOUR TYPE</label>
              <select 
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="private">Private Tour</option>
                <option value="group">Group Tour</option>
              </select>
            </div>

            {/* Language */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">LANGUAGE</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50">
                <option value="en">All Languages</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            {/* Private Tours Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">PRIVATE TOURS</span>
              <button 
                onClick={() => setIsPrivateOnly(!isPrivateOnly)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  isPrivateOnly ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isPrivateOnly ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer">
              APPLY FILTERS
            </button>
          </div>

          {/* MAIN TOURS GRID (w-full lg:w-3/4) */}
          <div className="w-full lg:w-3/4 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-xs text-gray-600 border-b border-gray-200 pb-3">
              <span className="font-bold text-gray-900">
                Showing {filteredTours.length} Experiences
              </span>

              <div className="flex items-center gap-2">
                <span className="text-gray-400">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none cursor-pointer shadow-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* 3-Column Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentTours.map((tour) => (
                <div 
                  key={tour.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
                >
                  {/* Image Backdrop & Badges */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
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
                        <Star className="w-3.5 h-3.5 fill-orange-500" />
                        <span>{tour.rating}</span>
                        <span className="text-gray-400 font-normal">({tour.reviewsCount})</span>
                      </div>

                      {/* Title */}
                      <Link href={`/tours/${tour.slug}`}>
                        <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-[#E86D5A] transition-colors line-clamp-1">
                          {tour.title}
                        </h3>
                      </Link>

                      {/* Subtitle / Locations */}
                      <p className="text-[11px] text-gray-500 font-light line-clamp-1">
                        {tour.subtitle}
                      </p>

                      {/* Metadata Pills with Lucide Icons */}
                      <div className="flex items-center justify-between pt-2.5 text-[10px] text-gray-600 font-medium border-t border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E86D5A]" />
                          <span>{tour.duration}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[#E86D5A]" />
                          <span>{tour.type}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#E86D5A]" />
                          <span>{tour.capacity}</span>
                        </span>
                      </div>
                    </div>

                    {/* Price & Action Link */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase block">From</span>
                        <span className="text-sm font-extrabold text-gray-900">€{tour.price}</span>
                      </div>

                      <Link 
                        href={`/tours/${tour.slug}`}
                        className="text-[11px] font-bold text-[#E86D5A] hover:text-orange-600 flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                      >
                        VIEW DETAILS →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 5. FUNCTIONAL PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-[#E86D5A] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
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
                          ? 'bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-500 hover:text-[#E86D5A]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-[#E86D5A] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 6. TRUST STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-serif font-bold text-lg text-gray-900 leading-none">1,500+</p>
              <p className="text-[11px] text-gray-400 font-light mt-1">Happy Travelers</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div className="text-left">
              <p className="font-serif font-bold text-lg text-gray-900 leading-none">4.9/5</p>
              <p className="text-[11px] text-gray-400 font-light mt-1">Google Rating</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-serif font-bold text-lg text-gray-900 leading-none">98%</p>
              <p className="text-[11px] text-gray-400 font-light mt-1">Satisfaction Rate</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-serif font-bold text-lg text-gray-900 leading-none">100%</p>
              <p className="text-[11px] text-gray-400 font-light mt-1">Local Expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WATCH MOROCCO COME TO LIFE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">
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

      {/* 8. READY TO START YOUR JOURNEY? ACTION BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10">
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
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transform hover:-translate-y-0.5 transition"
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
