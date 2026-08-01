"use client";

import { useEffect, useState, use, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, User, ChevronDown, Check, X as CloseIcon, 
  Map, MessageSquare, Info, Calendar, MapPin, Image as ImageIcon, 
  Star, Send, ShieldAlert, Award, Play, RotateCcw, Tag, Zap, Headphones,
  Users, Mail, Phone, ExternalLink, ChevronRight, ShieldCheck
} from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../../lib/strapi';
import { useCurrency } from '../../../context/CurrencyContext';
import { useLanguage } from '../../../context/LanguageContext';

import Image from 'next/image';

// Safe Stateful Image Component using Next.js Image optimization
function SafeImage({ src, fallback = '/assets/desert-luxury-1.png', alt, className, priority = false, sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", unoptimized, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const finalSrc = imgSrc || fallback;
  const isLocalhostMedia = typeof finalSrc === 'string' && (finalSrc.includes('localhost') || finalSrc.includes('127.0.0.1'));

  return (
    <Image 
      src={finalSrc} 
      alt={alt || "Tour Detail Image"} 
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

const fallbackDefaultTour = {
  id: 100,
  slug: "10-days-in-morocco-itinerary-desert-imperial-cities-the-north",
  title: "10 Days in Morocco Itinerary – Desert, Imperial Cities & the North",
  excerpt: "Planning 10 days in Morocco and wondering how to see the most in a limited time? This carefully designed 10-day itinerary takes you through the country's highlights.",
  overview: "Planning 10 days in Morocco and wondering how to see the most in a limited time? This carefully designed 10-day in Morocco itinerary takes you through the country's highlights — from Marrakech and the Atlas Mountains to the Sahara Desert, Fés, Chefchaouen, Rabat, and Casablanca.\n\nIdeal for first-time visitors, this 10-day Morocco trip combines cultural discovery, scenic landscapes, and authentic experiences, all with a private driver and expert local guides.",
  price: 1290,
  salePrice: null,
  rating: "5.0",
  reviewsCount: 28,
  duration: "10 Days / 9 Nights",
  groupType: "Small Group Tour",
  guideType: "Expert Local Guides",
  destination: "Marrakech, Sahara, Fes, Chefchaouen & Casablanca",
  featured: true,
  startDate: "Flexible Daily Departure",
  whatsIncluded: [
    { id: 1, text: "Pick up service from your accommodation in Marrakech" },
    { id: 2, text: "Private transport in an A/C vehicle" },
    { id: 3, text: "Professional English speaking driver" },
    { id: 4, text: "Overnight in carefully selected hotels / Riads" },
    { id: 5, text: "Camel ride in the Sahara desert" },
    { id: 6, text: "Daily breakfast" },
    { id: 7, text: "Fuel and tolls" },
    { id: 8, text: "Local guides in major cities" },
    { id: 9, text: "All taxes and service charges" }
  ],
  whatsNotIncluded: [
    { id: 1, text: "International flights to/from Morocco" },
    { id: 2, text: "Travel insurance" },
    { id: 3, text: "Lunches and personal expenses" },
    { id: 4, text: "Tips and gratuities" },
    { id: 5, text: "Optional activities not mentioned in the program" }
  ],
  itinerary: [
    { id: 1, dayLabel: "DAY 1", dayTitle: "Arrival in Marrakech", dayContent: "Today we'll have a guided tour of Marrakech. You'll explore the main attractions and monuments of the city including the world famous Jemaa el-Fna square, Koutoubia mosque, the souks, palaces, and museums. We'll also explore off-the-beaten-path spots such as the French Colonial District and the Menara Gardens." },
    { id: 2, dayLabel: "DAY 2", dayTitle: "Marrakech City Tour", dayContent: "Full day exploring Marrakech with your private expert guide. Visit Bahia Palace, Saadian Tombs, and the bustling artisan workshops." },
    { id: 3, dayLabel: "DAY 3", dayTitle: "Marrakech to Ait Ben Haddou & Ouarzazate", dayContent: "Cross the Tizi n'Tichka pass through the High Atlas Mountains to the UNESCO World Heritage site of Ait Ben Haddou." },
    { id: 4, dayLabel: "DAY 4", dayTitle: "Sahara Excursion (Erg Chebbi)", dayContent: "Travel through Dades Valley and Todra Gorge to Merzouga. Enjoy a sunset camel trek into the golden Erg Chebbi dunes." },
    { id: 5, dayLabel: "DAY 5", dayTitle: "Merzouga – Midelt", dayContent: "Early morning sunrise over the Sahara dunes, followed by a scenic drive through the Ziz Valley towards Midelt." },
    { id: 6, dayLabel: "DAY 6", dayTitle: "Midelt – Fes", dayContent: "Journey through the Cedar Forests of Azrou, home to Barbary macaques, and stop in Ifrane before arriving in historic Fes." },
    { id: 7, dayLabel: "DAY 7", dayTitle: "Fes guided tour", dayContent: "Step back in time with a full day guided walking tour of Fes el-Bali medina, Al-Qarawiyyin University, and the famous tanneries." },
    { id: 8, dayLabel: "DAY 8", dayTitle: "Fes – Chefchaouen", dayContent: "Drive north into the Rif Mountains to the famous Blue Pearl of Morocco, Chefchaouen. Explore its charming blue-washed streets." },
    { id: 9, dayLabel: "DAY 9", dayTitle: "Chefchaouen – Rabat – Casablanca", dayContent: "Travel to the capital city of Rabat to see the Hassan Tower and Kasbah of the Udayas, then continue to coastal Casablanca." },
    { id: 10, dayLabel: "DAY 10", dayTitle: "Casablanca at Your Leisure, Transfer to the Airport", dayContent: "Visit the iconic Hassan II Mosque before your private transfer to Casablanca Mohammed V Airport for your departure." }
  ],
  mainImage: { url: "/hero-bg-v2.png" },
  mapImage: { url: "/assets/morocco-route-map.png" },
  gallery: [
    { url: "/dest-chefchaouen.png" },
    { url: "/assets/desert-luxury-1.png" },
    { url: "/dest-marrakech.png" },
    { url: "/assets/imperial-heritage.png" },
    { url: "/dest-fes.png" },
    { url: "/dest-atlas.png" }
  ]
};

const fallbackLocalTours = {
  en: [fallbackDefaultTour],
  fr: [fallbackDefaultTour],
  es: [fallbackDefaultTour]
};

export default function TourDetailPage({ params: paramsPromise }) {
  const { formatPrice } = useCurrency();
  const { currentLocale } = useLanguage();
  const params = use(paramsPromise);
  const { slug } = params;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openDayIndex, setOpenDayIndex] = useState(0);

  // Booking Card Form States
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    travelers: '1',
    message: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Lightbox / Modal States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Navigation tab bar refs
  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);
  const inclusionsRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      const offset = 90;
      const elementPosition = elementRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    async function getTourDetails() {
      try {
        setLoading(true);
        let response = await fetchFromStrapi('tours', `?locale=${currentLocale}&filters[slug][$eq]=${slug}&populate=*`);
        
        let foundTour = null;
        if (response && response.data && response.data.length > 0) {
          foundTour = response.data[0];
        } else if (currentLocale !== 'en') {
          const fallbackRes = await fetchFromStrapi('tours', `?locale=en&filters[slug][$eq]=${slug}&populate=*`);
          if (fallbackRes && fallbackRes.data && fallbackRes.data.length > 0) {
            foundTour = fallbackRes.data[0];
          }
        }

        // Apply local hardcoded fallback if Strapi returned nothing or is offline
        if (!foundTour) {
          const localList = fallbackLocalTours[currentLocale] || fallbackLocalTours['en'];
          foundTour = localList.find(t => t.slug === slug) || fallbackDefaultTour;
        }

        setTour(foundTour);
      } catch (err) {
        console.error("Failed to load tour details, applying default fallback itinerary:", err);
        setTour(fallbackDefaultTour);
      } fontFinally: {
        setLoading(false);
      }
    }
    getTourDetails();
  }, [slug, currentLocale]);

  // Construct All Images Gallery strictly
  const galleryImages = useMemo(() => {
    if (!tour) return [];
    if (tour.gallery && Array.isArray(tour.gallery) && tour.gallery.length > 0) {
      return tour.gallery
        .map(img => img?.url ? getStrapiMedia(img.url) : null)
        .filter(url => url !== null);
    }
    return [
      "/dest-chefchaouen.png",
      "/assets/desert-luxury-1.png",
      "/dest-marrakech.png",
      "/assets/imperial-heritage.png",
      "/dest-fes.png",
      "/dest-atlas.png"
    ];
  }, [tour]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] text-gray-400 font-sans">
        <div className="w-10 h-10 border-3 border-[#FF5B35] border-t-transparent animate-spin mb-4 rounded-full"></div>
        <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-gray-500">Loading Itinerary Blueprint...</p>
      </div>
    );
  }

  const currentTour = tour || fallbackDefaultTour;
  const mainImageUrl = currentTour.mainImage?.url ? getStrapiMedia(currentTour.mainImage.url) : '/hero-bg-v2.png';
  const mapImageUrl = currentTour.mapImage?.url ? getStrapiMedia(currentTour.mapImage.url) : '/assets/morocco-route-map.png';
  const safeItinerary = Array.isArray(currentTour.itinerary) && currentTour.itinerary.length > 0 
    ? currentTour.itinerary 
    : fallbackDefaultTour.itinerary;

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert("Please fill in your Name, Email, and Phone Number.");
      return;
    }
    const messageText = `Hi Morocco Vibe! I would like to book "${currentTour.title}". Here are my details:
- Name: ${bookingForm.name}
- Email: ${bookingForm.email}
- Phone: ${bookingForm.phone}
- Date: ${bookingForm.date || 'Flexible'}
- Number of Travelers: ${bookingForm.travelers}
- Note: ${bookingForm.message || 'None'}`;

    const whatsappUrl = `https://wa.me/212634332000?text=${encodeURIComponent(messageText)}`;
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const tourJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        '@id': `https://moroccovibe.com/tours/${slug}#trip`,
        'name': currentTour.title,
        'description': typeof currentTour.overview === 'string' ? currentTour.overview : currentTour.excerpt || currentTour.title,
        'image': mainImageUrl.startsWith('http') ? mainImageUrl : `https://moroccovibe.com${mainImageUrl}`,
        'touristType': currentTour.groupType || 'Private Tour',
        'subTrip': safeItinerary.map((day, idx) => ({
          '@type': 'TouristTrip',
          'name': day.dayTitle || `Day ${idx + 1}`,
          'description': typeof day.dayContent === 'string' ? day.dayContent : `Itinerary for ${day.dayTitle}`
        })),
        'provider': {
          '@type': 'TravelAgency',
          'name': 'Morocco Vibe',
          'url': 'https://moroccovibe.com'
        }
      },
      {
        '@type': 'Product',
        '@id': `https://moroccovibe.com/tours/${slug}#product`,
        'name': currentTour.title,
        'description': typeof currentTour.overview === 'string' ? currentTour.overview : currentTour.excerpt || currentTour.title,
        'image': mainImageUrl.startsWith('http') ? mainImageUrl : `https://moroccovibe.com${mainImageUrl}`,
        'offers': {
          '@type': 'Offer',
          'price': currentTour.price || 1290,
          'priceCurrency': 'EUR',
          'priceValidUntil': '2027-12-31',
          'availability': 'https://schema.org/InStock',
          'url': `https://moroccovibe.com/tours/${slug}`
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': currentTour.rating || '5.0',
          'reviewCount': currentTour.reviewsCount || 28,
          'bestRating': '5',
          'worstRating': '1'
        }
      }
    ]
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-28 font-sans text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      
      {/* 1. TOP HERO BRAND BANNER */}
      <section className="relative min-h-[480px] md:min-h-[540px] w-full flex items-end bg-gray-900 overflow-hidden pb-16 pt-24 px-4 sm:px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={mainImageUrl} 
            alt={currentTour.title} 
            priority={true}
            sizes="100vw"
            className="w-full h-full object-cover scale-105 opacity-65" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/80 font-medium mb-4 tracking-wide">
            <Link href="/" className="hover:text-[#FF5B35] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <Link href="/tours" className="hover:text-[#FF5B35] transition">Tours</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-white/60 truncate max-w-[200px] sm:max-w-xs">{currentTour.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            {/* Title & Metadata Badges */}
            <div className="max-w-3xl space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md"
              >
                {currentTour.title}
              </motion.h1>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
                  <Clock className="w-3.5 h-3.5 text-[#FF5B35]" />
                  <span>{currentTour.duration || "10 Days / 9 Nights"}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
                  <Users className="w-3.5 h-3.5 text-[#FF5B35]" />
                  <span>{currentTour.groupType || "Small Group Tour"}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white">
                  <Award className="w-3.5 h-3.5 text-[#FF5B35]" />
                  <span>{currentTour.guideType || "Expert Local Guides"}</span>
                </div>
              </div>
            </div>

            {/* Floating Price Card (Top Right in Hero) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/60 min-w-[240px] text-left shrink-0"
            >
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl md:text-4xl font-extrabold text-[#FF5B35]">
                  {formatPrice(currentTour.price || 1290)}
                </span>
                <span className="text-xs text-gray-500 font-normal">/ Per Person</span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 text-xs text-[#FF5B35] font-semibold mt-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF5B35] text-[#FF5B35]" />
                  ))}
                </div>
                <span className="text-gray-500 font-medium text-xs ml-1">
                  ({currentTour.reviewsCount || 28} Reviews)
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. TAB NAVIGATION BAR (OVERVIEW | TOUR PLAN | LOCATION | GALLERY | INCLUSIONS) */}
      <section className="relative -mt-6 z-20 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-150/80 shadow-lg p-2.5 flex items-center justify-around gap-2 flex-wrap text-xs font-bold uppercase tracking-wider text-gray-600">
          
          <button 
            onClick={() => scrollToSection(overviewRef)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-orange-50/70 hover:text-[#FF5B35] transition cursor-pointer text-gray-700 font-bold"
          >
            <Info className="w-4 h-4 text-[#FF5B35]" />
            <span>OVERVIEW</span>
          </button>

          <div className="w-[1px] h-5 bg-gray-200 hidden sm:block" />

          <button 
            onClick={() => scrollToSection(itineraryRef)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-orange-50/70 hover:text-[#FF5B35] transition cursor-pointer text-gray-700 font-bold"
          >
            <Calendar className="w-4 h-4 text-[#FF5B35]" />
            <span>TOUR PLAN</span>
          </button>

          <div className="w-[1px] h-5 bg-gray-200 hidden sm:block" />

          <button 
            onClick={() => scrollToSection(locationRef)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-orange-50/70 hover:text-[#FF5B35] transition cursor-pointer text-gray-700 font-bold"
          >
            <MapPin className="w-4 h-4 text-[#FF5B35]" />
            <span>LOCATION</span>
          </button>

          <div className="w-[1px] h-5 bg-gray-200 hidden sm:block" />

          <button 
            onClick={() => scrollToSection(galleryRef)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-orange-50/70 hover:text-[#FF5B35] transition cursor-pointer text-gray-700 font-bold"
          >
            <ImageIcon className="w-4 h-4 text-[#FF5B35]" />
            <span>GALLERY</span>
          </button>

          <div className="w-[1px] h-5 bg-gray-200 hidden sm:block" />

          <button 
            onClick={() => scrollToSection(inclusionsRef)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-orange-50/70 hover:text-[#FF5B35] transition cursor-pointer text-gray-700 font-bold"
          >
            <ShieldCheck className="w-4 h-4 text-[#FF5B35]" />
            <span>INCLUSIONS</span>
          </button>

        </div>
      </section>

      {/* 3. MAIN SPLIT GRID LAYOUT */}
      <section className="py-12 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: OVERVIEW & TOUR PLAN (8 / 12 width) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* OVERVIEW CARD */}
            <div className="bg-white rounded-2xl border border-gray-150/70 p-6 md:p-8 shadow-sm space-y-6 scroll-mt-24" ref={overviewRef}>
              
              {/* Section Header with Orange Vertical Bar */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block shrink-0"></span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">Overview</h2>
              </div>

              {/* Overview Text Paragraphs */}
              <div className="text-gray-600 text-sm leading-relaxed space-y-4 font-normal">
                {currentTour.overview ? (
                  typeof currentTour.overview === 'string' ? (
                    currentTour.overview.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  ) : Array.isArray(currentTour.overview) ? (
                    currentTour.overview.map((block, idx) => (
                      <p key={idx}>{block.children?.map(c => c.text).join(' ')}</p>
                    ))
                  ) : (
                    <p>{currentTour.overview}</p>
                  )
                ) : (
                  <p>
                    Planning 10 days in Morocco and wondering how to see the most in a limited time? This carefully designed 10-day in Morocco itinerary takes you through the country's highlights — from Marrakech and the Atlas Mountains to the Sahara Desert, Fés, Chefchaouen, Rabat, and Casablanca.
                  </p>
                )}
              </div>

              {/* 4 HIGHLIGHT FEATURE CARDS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FFFBF8] border border-orange-100/80 text-center my-6">
                
                {/* 1. Free Cancellation */}
                <div className="flex flex-col items-center p-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100/70 flex items-center justify-center text-[#FF5B35]">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900">Free Cancellation</h4>
                  <p className="text-[11px] text-gray-400 font-medium">Up to 7 days</p>
                </div>

                {/* 2. Best Price Guarantee */}
                <div className="flex flex-col items-center p-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100/70 flex items-center justify-center text-[#FF5B35]">
                    <Tag className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900">Best Price Guarantee</h4>
                  <p className="text-[11px] text-gray-400 font-medium">No hidden fees</p>
                </div>

                {/* 3. Instant Confirmation */}
                <div className="flex flex-col items-center p-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100/70 flex items-center justify-center text-[#FF5B35]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900">Instant Confirmation</h4>
                  <p className="text-[11px] text-gray-400 font-medium">Book with confidence</p>
                </div>

                {/* 4. 24/7 Support */}
                <div className="flex flex-col items-center p-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100/70 flex items-center justify-center text-[#FF5B35]">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900">24/7 Support</h4>
                  <p className="text-[11px] text-gray-400 font-medium">We're here to help</p>
                </div>

              </div>

              {/* NOT INCLUDED & INCLUDED SIDE-BY-SIDE LISTS */}
              <div className="pt-4 border-t border-gray-150 scroll-mt-24" ref={inclusionsRef}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* NOT INCLUDED */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-gray-900">Not Included</h3>
                    <ul className="space-y-3">
                      {currentTour.whatsNotIncluded && currentTour.whatsNotIncluded.length > 0 ? (
                        currentTour.whatsNotIncluded.map((item, idx) => (
                          <li key={item.id || idx} className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              ✕
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))
                      ) : (
                        fallbackDefaultTour.whatsNotIncluded.map((item) => (
                          <li key={item.id} className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              ✕
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* INCLUDED */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-gray-900">Included</h3>
                    <ul className="space-y-3">
                      {currentTour.whatsIncluded && currentTour.whatsIncluded.length > 0 ? (
                        currentTour.whatsIncluded.map((item, idx) => (
                          <li key={item.id || idx} className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))
                      ) : (
                        fallbackDefaultTour.whatsIncluded.map((item) => (
                          <li key={item.id} className="flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
                            <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                </div>
              </div>

            </div>

            {/* TOUR PLAN CARD (ACCORDION DAY-BY-DAY ITINERARY) */}
            <div className="bg-white rounded-2xl border border-gray-150/70 p-6 md:p-8 shadow-sm space-y-6 scroll-mt-24" ref={itineraryRef}>
              
              {/* Header with Orange Bar */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block shrink-0"></span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">Tour Plan</h2>
              </div>

              {/* Accordion Items */}
              <div className="space-y-3">
                {safeItinerary.map((day, idx) => {
                  const isOpen = openDayIndex === idx;
                  return (
                    <div 
                      key={day.id || idx}
                      className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                        isOpen 
                          ? 'border-orange-300 bg-orange-50/10 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <button 
                        type="button"
                        onClick={() => setOpenDayIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg shrink-0 ${
                            isOpen ? 'bg-[#FF5B35] text-white' : 'bg-orange-50 text-[#FF5B35]'
                          }`}>
                            {day.dayLabel || `DAY ${idx + 1}`}
                          </span>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900">
                            {day.dayTitle || day.title}
                          </h4>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#FF5B35]' : ''
                        }`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-gray-100 bg-white"
                          >
                            <div className="p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                              {typeof day.dayContent === 'string' ? (
                                <p>{day.dayContent}</p>
                              ) : Array.isArray(day.dayContent) ? (
                                day.dayContent.map((block, bIdx) => (
                                  <p key={bIdx} className="mb-2">{block.children?.map(c => c.text).join(' ')}</p>
                                ))
                              ) : (
                                <p>{day.description || day.dayContent || "Full detailed activities and highlights provided upon booking orientation."}</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: BOOKING FORM, MAP & ROUTE, GALLERY (4 / 12 width) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* BOOK THIS TOUR CARD */}
            <div className="bg-white rounded-2xl border border-gray-150/70 p-6 md:p-7 shadow-xl space-y-5">
              
              {/* Header with Orange Bar */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block shrink-0"></span>
                <h3 className="font-serif text-2xl font-bold text-gray-900">Book This Tour</h3>
              </div>

              <p className="text-gray-500 text-xs leading-relaxed font-normal">
                It's quick, easy & secure. Reserve your spot now and start your adventure!
              </p>

              {/* Status Alert */}
              <AnimatePresence>
                {bookingSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium p-3 rounded-xl flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Selected Dates Available! Click Book Now below.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM FIELDS WITH ICONS */}
              <form onSubmit={handleBookNow} className="space-y-3.5">
                
                {/* 1. Name */}
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name" 
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors"
                  />
                </div>

                {/* 2. Email Address */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address" 
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors"
                  />
                </div>

                {/* 3. Phone Number */}
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input 
                    type="tel" 
                    required
                    placeholder="Phone Number" 
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors"
                  />
                </div>

                {/* 4. Travel Date */}
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input 
                    type="date" 
                    placeholder="Travel Date" 
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors text-gray-700"
                  />
                </div>

                {/* 5. Number of Travelers */}
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <select 
                    value={bookingForm.travelers}
                    onChange={(e) => setBookingForm({...bookingForm, travelers: e.target.value})}
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors text-gray-700 appearance-none"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers (Couple)</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option>
                    <option value="5">5+ Travelers (Group)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* 6. Message */}
                <textarea 
                  rows="3" 
                  placeholder="Your Message (Optional)" 
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  className="w-full bg-gray-50/60 border border-gray-200 rounded-xl p-3.5 text-xs outline-none focus:border-[#FF5B35] focus:bg-white transition-colors resize-none"
                />

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button 
                    type="button"
                    onClick={handleCheckAvailability}
                    className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow cursor-pointer text-center"
                  >
                    CHECK AVAILABILITY
                  </button>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF5B35] to-[#FF3838] hover:from-[#E04B28] hover:to-[#E02B2B] text-white py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg shadow-orange-500/20 cursor-pointer text-center"
                  >
                    BOOK NOW
                  </button>
                </div>

              </form>

            </div>

            {/* MAP & ROUTE CARD */}
            <div className="bg-white rounded-2xl border border-gray-150/70 p-6 shadow-sm space-y-4 scroll-mt-24" ref={locationRef}>
              
              {/* Header with Orange Bar */}
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block shrink-0"></span>
                <h3 className="font-serif text-xl font-bold text-gray-900">Map & Route</h3>
              </div>

              {/* Map Preview Image */}
              <div 
                onClick={() => setIsMapModalOpen(true)}
                className="relative w-full h-[210px] bg-amber-50/40 rounded-xl overflow-hidden border border-gray-200 group cursor-pointer shadow-xs"
              >
                <SafeImage 
                  src={mapImageUrl} 
                  alt="Morocco Tour Route Map" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-xs text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    Click to Enlarge Map
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 font-normal leading-normal">
                This is a sample itinerary and may be adjusted based on your preferences.
              </p>

              {/* SEE FULL MAP BUTTON */}
              <button 
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="w-full border border-orange-200 text-[#FF5B35] hover:bg-orange-50 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>SEE FULL MAP</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* GALLERY CARD */}
            <div className="bg-white rounded-2xl border border-gray-150/70 p-6 shadow-sm space-y-4 scroll-mt-24" ref={galleryRef}>
              
              {/* Header with Subtitle Link */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block shrink-0"></span>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Gallery</h3>
                </div>
                <button 
                  onClick={() => { setLightboxIndex(0); setIsLightboxOpen(true); }}
                  className="text-[11px] text-gray-400 hover:text-[#FF5B35] font-medium transition cursor-pointer"
                >
                  View more photos
                </button>
              </div>

              {/* 6 Thumbnail Grid (2 rows x 3 columns) */}
              <div className="grid grid-cols-3 gap-2.5">
                {galleryImages.slice(0, 6).map((imgUrl, index) => (
                  <div 
                    key={index}
                    onClick={() => { setLightboxIndex(index); setIsLightboxOpen(true); }}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100 relative group cursor-pointer shadow-xs"
                  >
                    <SafeImage 
                      src={imgUrl} 
                      alt={`Tour gallery photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>

              {/* SEE FULL GALLERY BUTTON */}
              <button 
                type="button"
                onClick={() => { setLightboxIndex(0); setIsLightboxOpen(true); }}
                className="w-full border border-orange-200 text-[#FF5B35] hover:bg-orange-50 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>SEE FULL GALLERY</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* 4. MAP MODAL OVERLAY */}
      <AnimatePresence>
        {isMapModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsMapModalOpen(false)}
          >
            <div 
              className="bg-white rounded-3xl max-w-4xl w-full p-6 relative overflow-hidden shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#FF5B35] rounded-full inline-block"></span>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Interactive Tour Route Map</h3>
                </div>
                <button 
                  onClick={() => setIsMapModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 transition rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-[60vh] bg-amber-50/20 rounded-2xl overflow-hidden border border-gray-200">
                <SafeImage 
                  src={mapImageUrl} 
                  alt="Morocco Full Route Map" 
                  className="w-full h-full object-contain" 
                />
              </div>

              <p className="text-xs text-gray-500 text-center font-normal">
                Route includes: Marrakech → High Atlas (Ait Ben Haddou) → Merzouga (Erg Chebbi) → Midelt → Fes → Chefchaouen → Rabat → Casablanca
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. LIGHTBOX GALLERY SLIDER OVERLAY */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center select-none p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer z-50"
              onClick={() => setIsLightboxOpen(false)}
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {/* Slider Content */}
            <div className="relative max-w-5xl w-full max-h-[78vh] flex items-center justify-center">
              
              {galleryImages.length > 1 && (
                <button 
                  className="absolute left-4 bg-white/10 hover:bg-white/25 text-white p-3.5 rounded-full transition active:scale-95 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length); }}
                >
                  ‹
                </button>
              )}

              <img 
                src={galleryImages[lightboxIndex]} 
                alt={`Lightbox image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-lg"
                onClick={(e) => e.stopPropagation()} 
              />

              {galleryImages.length > 1 && (
                <button 
                  className="absolute right-4 bg-white/10 hover:bg-white/25 text-white p-3.5 rounded-full transition active:scale-95 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % galleryImages.length); }}
                >
                  ›
                </button>
              )}

            </div>

            {/* Counter */}
            <div className="mt-4 text-white/50 text-xs font-bold tracking-widest uppercase">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}