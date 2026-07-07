"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Play, X, ChevronLeft, ChevronRight, Star, 
  MapPin, Clock, ArrowRight, Compass, ShieldCheck, 
  Award, HeartHandshake, Film
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

// Safe Stateful Image Component with local asset fallback
function SafeImage({ src, fallback = '/placeholder.png', alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <img 
      src={imgSrc || fallback} 
      alt={alt || "Travel Image"} 
      className={className}
      onError={() => setImgSrc(fallback)} 
      {...props} 
    />
  );
}

// Circular SVG Progress Loader
function CircularProgress({ percentage, strokeColor, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const circumference = 2 * Math.PI * 36;
  const strokeOffset = isInView ? circumference * (1 - percentage / 100) : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle cx="48" cy="48" r="36" className="stroke-gray-100 fill-none" strokeWidth="6" />
          {/* Foreground progress circle */}
          <motion.circle 
            cx="48" 
            cy="48" 
            r="36" 
            className={`fill-none ${strokeColor}`} 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeOffset }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute text-sm font-extrabold text-gray-900">{percentage}%</span>
      </div>
      <span className="mt-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

// Destination Grid Card
function DestinationCard({ item }) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="relative w-full rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer mb-6"
      style={{ height: item.height || '200px' }}
    >
      <SafeImage 
        src={item.img} 
        alt={item.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
      />
      {/* Dark overlay mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/30 transition-all duration-300" />
      {/* Content overlay at the bottom border edges */}
      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-left">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide uppercase">{item.name}</h4>
        </div>
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-gray-800 shadow-sm">
          ${item.price}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { currentLocale } = useLanguage();
  const { formatPrice } = useCurrency();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Localized dictionaries matching page requirements
  const localTranslations = {
    en: {
      title: "About Us",
      subtitle: "DISCOVER OUR STORY",
      promoLabel: "Promotion",
      promoTitle: "We Provide You Best Private Sightseeing Tours",
      promoDesc1: "We are dedicated to crafting bespoke private journeys across Morocco that connect travelers with local heritage. Our curated itineraries are tailored frame-by-frame to guarantee luxury, flexibility, and authenticity.",
      promoDesc2: "From the golden sand dunes of the Sahara to the historic streets of Marrakech and Chefchaouen, our certified guides and private drivers provide elite assistance.",
      viewPackages: "View Packages",
      wanderlustTitle: "Wanderlust",
      popularPlansTitle: "Our Popular Tour Plans",
      popularPlansLabel: "Trends",
      popularPlansDesc: "Explore our highly recommended tour blueprints designed for deep cultural immersion and premium comfort.",
      vacations: "Vacations",
      honeymoon: "Honeymoon",
      musicalEvents: "Musical Events",
      intlPackagesTitle: "Our International Packages",
      intlPackagesLabel: "Explore More",
      testimonialsTitle: "See What Our Clients Say About Us",
      testimonialsLabel: "Testimonials",
    },
    fr: {
      title: "À Propos",
      subtitle: "DÉCOUVREZ NOTRE HISTOIRE",
      promoLabel: "Promotion",
      promoTitle: "Nous Vous Offrons Les Meilleurs Circuits Privés",
      promoDesc1: "Nous nous consacrons à créer des voyages privés sur mesure à travers le Maroc, reliant les voyageurs au patrimoine local. Nos itinéraires sont conçus pour garantir luxe, flexibilité et authenticité.",
      promoDesc2: "Des dunes dorées du Sahara aux ruelles historiques de Marrakech et Chefchaouen, nos guides certifiés et chauffeurs privés offrent une assistance d'élite.",
      viewPackages: "Voir les Circuits",
      wanderlustTitle: "Wanderlust",
      popularPlansTitle: "Nos Plans de Voyage Populaires",
      popularPlansLabel: "Tendances",
      popularPlansDesc: "Découvrez nos itinéraires les plus recommandés, conçus pour une immersion culturelle profonde et un confort premium.",
      vacations: "Vacances",
      honeymoon: "Lune de Miel",
      musicalEvents: "Événements Musicaux",
      intlPackagesTitle: "Nos Circuits Signatures",
      intlPackagesLabel: "Explorer Plus",
      testimonialsTitle: "Ce Que Disent Nos Clients De Nous",
      testimonialsLabel: "Témoignages",
    },
    es: {
      title: "Nosotros",
      subtitle: "DESCUBRE NUESTRA HISTORIA",
      promoLabel: "Promoción",
      promoTitle: "Le Ofrecemos Los Mejores Tours Privados",
      promoDesc1: "Nos dedicamos a crear viajes privados a medida en Marruecos que conectan a los viajeros con el patrimonio local. Nuestros itinerarios están diseñados para garantizar lujo, flexibilidad y autenticidad.",
      promoDesc2: "Desde las dunas doradas del Sahara hasta las calles históricas de Marrakech y Chefchaouen, nuestros guías certificados y conductores privados brindan asistencia de élite.",
      viewPackages: "Ver Paquetes",
      wanderlustTitle: "Wanderlust",
      popularPlansTitle: "Nuestros Planes de Viaje Populares",
      popularPlansLabel: "Tendencias",
      popularPlansDesc: "Explore nuestros itinerarios más recomendados diseñados para una profunda inmersión cultural y un confort premium.",
      vacations: "Vacaciones",
      honeymoon: "Luna de Miel",
      musicalEvents: "Eventos Musicales",
      intlPackagesTitle: "Nuestros Paquetes Signature",
      intlPackagesLabel: "Explorar Más",
      testimonialsTitle: "Lo Que Dicen Nuestros Clientes De Nosotros",
      testimonialsLabel: "Testimonios",
    }
  };

  const t = localTranslations[currentLocale] || localTranslations['en'];

  // Testimonials Mock Data
  const testimonials = [
    {
      quote: "Our private tour through Marrakech and the Sahara camp was absolutely flawless. The attention to detail, local historical knowledge, and luxurious Riad choices were superb. A truly timeless memory.",
      author: "Alexandra V. & Michael S.",
      role: "Luxury Travelers",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "Morocco Vibe crafted a bespoke anniversary itinerary that exceeded every expectation. From private airport transfers to an unforgettable dinner under the desert stars, everything felt effortless.",
      author: "David & Sarah K.",
      role: "Adventure Enthusiasts",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      quote: "The Sahara Dunes experience was mesmerizing. Our guide was warm, accommodating, and knew the perfect photo spots. The Mercedes V-Class transfer was comfortable and professional.",
      author: "Jean-Pierre L.",
      role: "Corporate Traveler",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop"
    }
  ];

  // Dynamic Asymmetric Grid Destination List mapped to local assets & highlights
  const destinationsList = [
    { id: 1, name: "Marrakech", price: 250, img: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=400" },
    { id: 2, name: "Casablanca", price: 240, img: "/WhatsApp Image 2026-06-18 at 20.34.37.jpeg" },
    { id: 3, name: "Chefchaouen", price: 320, img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400" },
    
    { id: 4, name: "Atlas Mountains", price: 340, img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400" },
    { id: 5, name: "Fes Medina", price: 280, img: "/WhatsApp Image 2026-06-18 at 20.34.38 (2).jpeg" },
    { id: 6, name: "Essaouira Coast", price: 480, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" },
    
    { id: 7, name: "Sahara Dunes", price: 340, img: "/WhatsApp Image 2026-06-18 at 20.34.38.jpeg" }, // Tall column
    
    { id: 8, name: "Tangier Port", price: 260, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400" },
    { id: 9, name: "Ouarzazate", price: 300, img: "/WhatsApp Image 2026-06-18 at 20.34.38 (1).jpeg" },
    { id: 10, name: "Aït Benhaddou", price: 340, img: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 overflow-x-hidden pt-0">
      
      {/* 1. THE HERO SECTION */}
      <section className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center bg-gray-950 px-6 pt-20 overflow-hidden">
        {/* Full-width landscape background wrapper */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" 
            alt="Tropical Beach Palm Trees"
            className="w-full h-full object-cover scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-white" />
        </div>

        {/* Cursive script overlay for center title */}
        <div className="relative z-10 text-center max-w-4xl -mt-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase font-extrabold tracking-[0.3em] text-white/90 mb-3 block"
          >
            {t.subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-9xl text-white font-normal leading-none drop-shadow-xl select-none"
            style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
          >
            {t.title}
          </motion.h1>
        </div>
      </section>

      {/* 2. EDITORIAL LAYOUT SECTIONS */}

      {/* Section A: Promotion Split Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block">{t.promoLabel}</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-gray-900 leading-tight">
              {t.promoTitle}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed">
              {t.promoDesc1}
            </p>
            <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed">
              {t.promoDesc2}
            </p>
            <div className="pt-4">
              <Link 
                href="/tours"
                className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg shadow-orange-500/20 transform hover:-translate-y-0.5"
              >
                {t.viewPackages}
              </Link>
            </div>
          </motion.div>

          {/* Right Circular Frame with Text Path overlay */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-gray-150 p-4 shadow-sm"
            >
              {/* Rotating circular text stamp */}
              <div className="absolute inset-0 w-full h-full">
                <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none z-10" style={{ animation: 'spin 22s linear infinite' }}>
                  <path id="circlePath" d="M 50, 50 m -39, 0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0" fill="none" />
                  <text className="text-[3.9px] uppercase font-bold tracking-[0.25em] fill-orange-500">
                    <textPath href="#circlePath">
                      • explore • travel • discover • adventure • luxury • morocco vibe • escape
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Masked circle image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl">
                <SafeImage 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop" 
                  alt="Mountain Turquoise Lake"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section B: Wanderlust Video Callout Card */}
      <section className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden">
        {/* Full-width cinematic horizontal banner */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop" 
            alt="Cinematic Landscape Travel Banner"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-black/45" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          {/* Script typography and centered play button */}
          <div className="relative flex flex-col items-center justify-center">
            <h2 
              className="text-7xl sm:text-8xl md:text-[10rem] text-white/95 leading-none drop-shadow-lg select-none relative z-10"
              style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
            >
              {t.wanderlustTitle}
            </h2>
            
            {/* Play Button Overlay */}
            <motion.button 
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              title="Play Video"
            >
              <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section C: Stats & Polaroids Layout */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Overlapping Polaroids */}
          <div className="lg:col-span-6 relative h-[380px] md:h-[450px] flex items-center justify-center">
            {/* Polaroid 1 (Left tilt) */}
            <motion.div 
              initial={{ opacity: 0, rotate: -15, x: -30 }}
              whileInView={{ opacity: 1, rotate: -6, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-4 top-4 bg-white p-3.5 pb-8 shadow-2xl border border-gray-150/70 max-w-[200px] md:max-w-[240px] transform hover:scale-105 hover:z-20 transition duration-300"
            >
              <div className="h-36 w-36 md:h-44 md:w-44 overflow-hidden bg-gray-100 mb-3">
                <SafeImage 
                  src="/WhatsApp Image 2026-06-18 at 20.34.38.jpeg" 
                  alt="Sahara Dunes"
                  className="object-cover w-full h-full"
                />
              </div>
              <p 
                className="text-xl md:text-2xl text-gray-700 text-center"
                style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
              >Sahara Dunes</p>
            </motion.div>

            {/* Polaroid 2 (Right tilt) */}
            <motion.div 
              initial={{ opacity: 0, rotate: 15, x: 30 }}
              whileInView={{ opacity: 1, rotate: 5, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="absolute right-4 bottom-4 bg-white p-3.5 pb-8 shadow-2xl border border-gray-150/70 max-w-[200px] md:max-w-[240px] transform hover:scale-105 hover:z-20 transition duration-300 z-10"
            >
              <div className="h-36 w-36 md:h-44 md:w-44 overflow-hidden bg-gray-100 mb-3">
                <SafeImage 
                  src="/WhatsApp Image 2026-06-18 at 20.34.38 (1).jpeg" 
                  alt="Marrakech Medina Riad"
                  className="object-cover w-full h-full"
                />
              </div>
              <p 
                className="text-xl md:text-2xl text-gray-700 text-center"
                style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
              >Marrakech Riad</p>
            </motion.div>
          </div>

          {/* Right Side: High-end statistical block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase block">{t.popularPlansLabel}</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 leading-tight">
              {t.popularPlansTitle}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed max-w-xl">
              {t.popularPlansDesc}
            </p>

            {/* Circular Progress Loaders */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <CircularProgress percentage={78} strokeColor="stroke-cyan-500" label={t.vacations} />
              <CircularProgress percentage={55} strokeColor="stroke-orange-500" label={t.honeymoon} />
              <CircularProgress percentage={30} strokeColor="stroke-purple-500" label={t.musicalEvents} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section D: Grid Gallery Blueprint */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2 block">{t.intlPackagesLabel}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 leading-tight">
            {t.intlPackagesTitle}
          </h2>
        </div>

        {/* Asymmetric multi-column image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Column 1 */}
          <div className="flex flex-col">
            <DestinationCard item={{ ...destinationsList[0], height: '220px' }} />
            <DestinationCard item={{ ...destinationsList[1], height: '180px' }} />
            <DestinationCard item={{ ...destinationsList[2], height: '180px' }} />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <DestinationCard item={{ ...destinationsList[3], height: '180px' }} />
            <DestinationCard item={{ ...destinationsList[4], height: '220px' }} />
            <DestinationCard item={{ ...destinationsList[5], height: '180px' }} />
          </div>

          {/* Column 3: Tall Vertical */}
          <div className="flex flex-col">
            <DestinationCard item={{ ...destinationsList[6], height: '620px' }} />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col">
            <DestinationCard item={{ ...destinationsList[7], height: '220px' }} />
            <DestinationCard item={{ ...destinationsList[8], height: '180px' }} />
            <DestinationCard item={{ ...destinationsList[9], height: '180px' }} />
          </div>

        </div>
      </section>

      {/* Section E: Testimonial Node Slider */}
      <section className="py-24 bg-gray-50 px-6 border-t border-gray-100 relative">
        {/* Floating background decorative assets */}
        <div className="absolute left-8 top-12 w-20 h-20 opacity-30 select-none hidden md:block">
          <SafeImage src="/placeholder.png" alt="Seashell Accent" className="object-contain w-full h-full scale-110" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3.5 block">{t.testimonialsLabel}</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-12">
            {t.testimonialsTitle}
          </h2>

          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl"
              >
                <span className="text-6xl text-orange-500/20 font-serif leading-none block mb-2">“</span>
                <p className="text-lg md:text-xl font-serif text-gray-700 italic leading-relaxed mb-8">
                  {testimonials[currentTestimonial].quote}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center justify-center gap-3.5">
                  <SafeImage 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="text-left">
                    <h5 className="font-sans text-sm font-bold text-gray-900">{testimonials[currentTestimonial].author}</h5>
                    <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider">
                      {testimonials[currentTestimonial].role} &bull; {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Nodes */}
          <div className="flex justify-center items-center gap-3 mt-10">
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-orange-50 hover:text-orange-500 transition-colors flex items-center justify-center text-gray-600 shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentTestimonial === i ? 'bg-orange-500 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-orange-50 hover:text-orange-500 transition-colors flex items-center justify-center text-gray-600 shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Cinematic Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-3xl overflow-hidden w-full max-w-4xl aspect-video relative shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition z-10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* YouTube video iframe */}
              <iframe 
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/gT1Ue6912pE?autoplay=1" 
                title="Cinematic Morocco"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


