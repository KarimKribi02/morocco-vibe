"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight, ChevronRight, User } from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';

// Safe Image component with automatic fallback handling
function SafeImage({ src, fallback = '/assets/desert-luxury-1.png', alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img 
      src={imgSrc || fallback} 
      alt={alt || "Tour image"} 
      className={className}
      onError={() => setImgSrc(fallback)} 
      {...props} 
    />
  );
}

export default function FeaturedTours({ className = '' }) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const destinationsRef = useRef(null);
  const toursRef = useRef(null);

  // Popular Destinations Data
  const destinations = [
    {
      id: "marrakech",
      name: "Marrakech",
      subtitle: "The Red City",
      image: "/dest-marrakech.png"
    },
    {
      id: "chefchaouen",
      name: "Chefchaouen",
      subtitle: "The Blue Pearl",
      image: "/dest-chefchaouen.png"
    },
    {
      id: "merzouga",
      name: "Merzouga Desert",
      subtitle: "Sahara Adventure",
      image: "/dest-merzouga.png"
    },
    {
      id: "fes",
      name: "Fes",
      subtitle: "Cultural Capital",
      image: "/dest-fes.png"
    },
    {
      id: "essaouira",
      name: "Essaouira",
      subtitle: "Coastal Paradise",
      image: "/dest-essaouira.png"
    },
    {
      id: "atlas",
      name: "Atlas Mountains",
      subtitle: "Nature & Berber Villages",
      image: "/dest-atlas.png"
    }
  ];

  // Default fallback tours matching screenshot if backend is empty or loading
  const defaultTours = [
    {
      id: "imperial-cities-sahara",
      documentId: "imperial-cities-sahara",
      title: "Imperial Cities & Sahara Experience",
      location: "MARRAKECH & DESERT",
      duration: "5 DAYS",
      type: "Private Tour",
      badge: "BEST SELLER",
      badgeColor: "bg-rose-500",
      price: "€890",
      description: "Explore Marrakech, Ait Ben Haddou, Ouarzazate and the magical Sahara Desert.",
      image: "/assets/desert-luxury-1.png"
    },
    {
      id: "morocco-highlights",
      documentId: "morocco-highlights",
      title: "Morocco Highlights Journey",
      location: "NORTH OF MOROCCO",
      duration: "7 DAYS",
      type: "Private Tour",
      badge: "MOST BOOKED",
      badgeColor: "bg-[#E86D5A]",
      price: "€1,190",
      description: "Discover Chefchaouen, Fes, Volubilis, Meknes and the stunning Atlas Mountains.",
      image: "/assets/desert-luxury-2.png"
    },
    {
      id: "ultimate-discovery",
      documentId: "ultimate-discovery",
      title: "Ultimate Morocco Discovery",
      location: "MOROCCO GRAND TOUR",
      duration: "10 DAYS",
      type: "Private Tour",
      badge: "EXPERT PICK",
      badgeColor: "bg-amber-500",
      price: "€1,990",
      description: "The ultimate journey across Morocco with luxury riads, unique experiences and VIP service.",
      image: "/assets/imperial-heritage.png"
    }
  ];

  // Fetch backend tours from Strapi
  useEffect(() => {
    async function loadBackendTours() {
      try {
        setLoading(true);
        const data = await fetchFromStrapi('tours', 'populate=*');
        
        if (data && data.data && data.data.length > 0) {
          const formatted = data.data.map((item, idx) => {
            const attrs = item.attributes || item;
            
            // Image handling from Strapi media: check mainImage, coverImage, image, gallery
            let rawImgUrl = null;
            if (attrs.mainImage?.url) rawImgUrl = attrs.mainImage.url;
            else if (attrs.mainImage?.data?.attributes?.url) rawImgUrl = attrs.mainImage.data.attributes.url;
            else if (attrs.coverImage?.url) rawImgUrl = attrs.coverImage.url;
            else if (attrs.coverImage?.data?.attributes?.url) rawImgUrl = attrs.coverImage.data.attributes.url;
            else if (attrs.image?.url) rawImgUrl = attrs.image.url;
            else if (attrs.image?.data?.attributes?.url) rawImgUrl = attrs.image.data.attributes.url;
            else if (Array.isArray(attrs.gallery) && attrs.gallery.length > 0 && attrs.gallery[0]?.url) rawImgUrl = attrs.gallery[0].url;

            const tourImg = rawImgUrl ? getStrapiMedia(rawImgUrl) : defaultTours[idx % defaultTours.length].image;

            // Overview text extraction
            let desc = "Handcrafted itinerary showcasing the best of Morocco with luxury, comfort and authenticity.";
            if (typeof attrs.overview === 'string' && attrs.overview.trim()) {
              desc = attrs.overview;
            } else if (Array.isArray(attrs.overview) && attrs.overview[0]?.children?.[0]?.text) {
              desc = attrs.overview[0].children[0].text;
            } else if (attrs.description) {
              desc = attrs.description;
            }

            // Price formatting
            const rawPrice = attrs.price || attrs.salePrice;
            const formattedPrice = rawPrice ? (typeof rawPrice === 'number' ? `€${rawPrice.toLocaleString()}` : rawPrice) : defaultTours[idx % defaultTours.length].price;

            // Duration text formatting
            const durVal = attrs.duration || attrs.days;
            const durationText = durVal ? (typeof durVal === 'number' ? `${durVal} DAYS` : `${durVal}`.toUpperCase()) : `${5 + idx * 2} DAYS`;

            // Location tag formatting
            let locTag = "MARRAKECH & DESERT";
            if (attrs.destination) {
              locTag = `${attrs.destination}`.toUpperCase();
            } else if (attrs.location) {
              locTag = `${attrs.location}`.toUpperCase();
            } else if (attrs.title) {
              const tLower = attrs.title.toLowerCase();
              if (tLower.includes("chefchaouen") || tLower.includes("tangier") || tLower.includes("north")) {
                locTag = "NORTH OF MOROCCO";
              } else if (tLower.includes("colors") || tLower.includes("grand") || tLower.includes("10 days") || tLower.includes("11 days")) {
                locTag = "MOROCCO GRAND TOUR";
              } else if (tLower.includes("sahara") || tLower.includes("desert") || tLower.includes("casablanca")) {
                locTag = "IMPERIAL CITIES & DESERT";
              }
            }

            const badges = ["BEST SELLER", "MOST BOOKED", "EXPERT PICK", "RECOMMENDED"];
            const badgeColors = ["bg-rose-500", "bg-[#E86D5A]", "bg-amber-500", "bg-orange-500"];

            return {
              id: item.documentId || item.id || attrs.slug || `tour-${idx}`,
              slug: attrs.slug || item.documentId || item.id,
              title: attrs.title || attrs.name || "Morocco Expedition",
              location: locTag,
              duration: durationText.includes("DAY") ? durationText : `${durationText} DAYS`,
              type: attrs.type || attrs.tourType || "Private Tour",
              badge: attrs.badge || badges[idx % badges.length],
              badgeColor: badgeColors[idx % badgeColors.length],
              price: formattedPrice,
              description: desc,
              image: tourImg
            };
          });
          setTours(formatted);
        } else {
          setTours(defaultTours);
        }
      } catch (err) {
        console.error("Error loading Strapi tours:", err);
        setTours(defaultTours);
      } finally {
        setLoading(false);
      }
    }

    loadBackendTours();
  }, []);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeTours = tours.length > 0 ? tours : defaultTours;

  return (
    <div className={`w-full bg-[#FDFBF7] space-y-12 py-12 md:py-16 ${className}`}>
      
      {/* 1. POPULAR DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Header Block */}
          <div className="w-full lg:w-1/4 text-left shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E86D5A] mb-2 block">
              EXPLORE MOROCCO
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-3 leading-tight">
              Popular Destinations
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Discover the most breathtaking places in Morocco.
            </p>
          </div>

          {/* Right Carousel Block */}
          <div className="w-full lg:w-3/4 relative group">
            <div 
              ref={destinationsRef}
              className="flex gap-4 overflow-x-auto scroll-bar-none scroll-smooth pb-4 snap-x"
            >
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/tours?destination=${dest.name}`}
                  className="w-48 sm:w-52 md:w-56 h-64 shrink-0 rounded-2xl overflow-hidden relative group/card cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 snap-start bg-gray-100"
                >
                  <SafeImage 
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-left text-white z-10">
                    <h3 className="font-serif font-bold text-lg leading-tight mb-0.5 group-hover/card:text-amber-300 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-light">
                      {dest.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Right Arrow Button */}
            <button 
              onClick={() => scrollContainer(destinationsRef, 'right')}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#E86D5A] hover:text-white transition-all duration-200 cursor-pointer absolute right-[-12px] top-1/2 -translate-y-1/2 z-20"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. OUR SIGNATURE CURATED EXPEDITIONS SECTION (BACKEND FETCHED TOURS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pt-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Header Block */}
          <div className="w-full lg:w-1/4 text-left shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E86D5A] mb-2 block">
              EXCLUSIVE EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-3 leading-tight">
              Our Signature Curated Expeditions
            </h2>
            <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
              Handcrafted itineraries that showcase the best of Morocco with luxury, comfort and authenticity.
            </p>

            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-md shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              VIEW ALL TOURS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Cards Carousel Block (3-Column scrollable backend fetched tours) */}
          <div className="w-full lg:w-3/4 relative group/tours">
            <div 
              ref={toursRef}
              className="flex gap-5 overflow-x-auto scroll-bar-none scroll-smooth pb-4 snap-x relative w-full"
            >
              {activeTours.map((tour, idx) => (
                <Link
                  key={tour.id || idx}
                  href={`/tours/${tour.slug || tour.id}`}
                  className="w-72 sm:w-80 lg:w-[calc((100%-2.5rem)/3)] shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 flex flex-col justify-between group transform hover:-translate-y-1.5 snap-start"
                >
                  {/* Image Backdrop & Floating Badges */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                    <SafeImage
                      src={tour.image}
                      fallback={defaultTours[idx % defaultTours.length].image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Top Left Badge */}
                    <span className={`absolute top-3.5 left-3.5 ${tour.badgeColor || 'bg-rose-500'} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10`}>
                      {tour.badge || "BEST SELLER"}
                    </span>

                    {/* Top Right Duration Pill */}
                    <span className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                      {tour.duration}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-3.5">
                    <div className="space-y-1.5 text-left">
                      {/* Location Subtitle */}
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{tour.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                        {tour.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2">
                        {tour.description}
                      </p>
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-3 text-[11px] font-medium text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {tour.type}
                        </span>
                      </div>

                      {/* Price tag */}
                      <span className="font-bold text-amber-700 text-sm flex items-center gap-1">
                        From <span className="text-gray-900 font-extrabold">{tour.price}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Right Arrow Button */}
            <button 
              onClick={() => scrollContainer(toursRef, 'right')}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#E86D5A] hover:text-white transition-all duration-200 cursor-pointer absolute right-[-12px] top-1/2 -translate-y-1/2 z-20"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
