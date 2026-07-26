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
  const [selectedBudget, setSelectedBudget] = useState(3500);
  const [selectedCategory, setSelectedCategory] = useState('all');
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
      if (selectedBudget < t.price) return false;
      if (isPrivateOnly && !t.type.toLowerCase().includes('private')) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
      return 0;
    });
  }, [rawTours, selectedBudget, isPrivateOnly, sortBy]);

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
    setSelectedBudget(3500);
    setSelectedCategory('all');
    setIsPrivateOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-gray-900 font-sans pb-16 selection:bg-orange-500 selection:text-white">
      
      {/* 1. HERO SECTION WITH SCENIC BACKGROUND */}
      <section className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[70vh] flex items-center justify-start bg-gray-950 overflow-hidden px-4 sm:px-12 lg:px-20 pt-16">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="/tours-hero-bg.png" 
            alt="Moroccan Kasbah Landscape" 
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FAF8F5] z-10" />
        </div>

        <div className="relative z-20 max-w-2xl text-left space-y-4 -mt-8">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E86D5A] block">
            EXPLORE MOROCCO
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white font-serif font-bold tracking-tight leading-tight drop-shadow-md">
            One Country,<br />
            Endless <span className="text-[#E86D5A]">Journeys</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 font-light max-w-lg leading-relaxed drop-shadow">
            Handpicked tours across Morocco. Authentic experiences, local experts, unforgettable memories.
          </p>

          {/* 4 Trust Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-3 text-white/90 text-xs font-semibold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm hover:bg-white/15 transition">
              <ShieldCheck className="w-4 h-4 text-[#E86D5A]" />
              <span>100% Local Experts</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm hover:bg-white/15 transition">
              <Tag className="w-4 h-4 text-[#E86D5A]" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm hover:bg-white/15 transition">
              <Calendar className="w-4 h-4 text-[#E86D5A]" />
              <span>Flexible Bookings</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm hover:bg-white/15 transition">
              <Headphones className="w-4 h-4 text-[#E86D5A]" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING FILTER BAR (Overlapping Hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative -mt-16 z-30">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-150 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Destination */}
          <div className="w-full md:w-1/4 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
            <MapPin className="w-5 h-5 text-[#E86D5A] shrink-0" />
            <div className="text-left w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">DESTINATION</span>
              <select 
                value={selectedDestination} 
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">Where to?</option>
                <option value="marrakech">Marrakech</option>
                <option value="merzouga">Sahara Desert</option>
                <option value="chefchaouen">Chefchaouen</option>
                <option value="fes">Fes</option>
              </select>
            </div>
          </div>

          {/* Duration */}
          <div className="w-full md:w-1/4 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
            <Clock className="w-5 h-5 text-[#E86D5A] shrink-0" />
            <div className="text-left w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">DURATION</span>
              <select 
                value={selectedDuration} 
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">1 - 3 Days</option>
                <option value="medium">4 - 7 Days</option>
                <option value="long">8+ Days</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="w-full md:w-1/4 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
            <Compass className="w-5 h-5 text-[#E86D5A] shrink-0" />
            <div className="text-left w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">BUDGET</span>
              <select 
                value={selectedBudget} 
                onChange={(e) => setSelectedBudget(Number(e.target.value))}
                className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={3500}>Any Budget</option>
                <option value={800}>Under €800</option>
                <option value={1500}>Under €1,500</option>
                <option value={2500}>Under €2,500</option>
              </select>
            </div>
          </div>

          {/* Tour Type & Search Button */}
          <div className="w-full md:w-1/4 flex items-center justify-between gap-3 px-3 py-2">
            <div className="flex items-center gap-3 text-left w-full">
              <SlidersHorizontal className="w-5 h-5 text-[#E86D5A] shrink-0" />
              <div className="w-full">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">TOUR TYPE</span>
                <select className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer">
                  <option value="all">All Types</option>
                  <option value="private">Private Tour</option>
                  <option value="group">Group Tour</option>
                </select>
              </div>
            </div>

            <button className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0 transition transform hover:scale-105 cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. CATEGORY QUICK PILLS STRIP WITH LUCIDE ICONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          {categoryPills.map((cat) => {
            const IconComponent = cat.Icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-[#E86D5A] hover:bg-amber-50/50'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#E86D5A]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. MAIN DIRECTORY LAYOUT (LEFT FILTERS SIDEBAR + 3-COLUMN TOURS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4">
        
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
                className="text-[11px] font-bold text-[#E86D5A] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>

            {/* Destination */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">DESTINATION</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50">
                <option value="all">All Destinations</option>
                <option value="marrakech">Marrakech</option>
                <option value="merzouga">Sahara Desert</option>
                <option value="chefchaouen">Chefchaouen</option>
                <option value="fes">Fes</option>
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
              <select className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50">
                <option value="all">Any Duration</option>
                <option value="3">1 - 3 Days</option>
                <option value="7">4 - 7 Days</option>
                <option value="12">8 - 12 Days</option>
              </select>
            </div>

            {/* Tour Type */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">TOUR TYPE</label>
              <select className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none bg-gray-50/50">
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
