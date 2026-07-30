"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, Briefcase, MapPin, Star, Award, 
  ShieldCheck, DollarSign, Compass, Headphones, Sparkles, 
  ArrowRight, MessageCircle, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Custom SVG Icons for LinkedIn and Instagram
function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// Safe Image Component with fallback
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

export default function AboutPage() {
  const { currentLocale } = useLanguage();

  const localTranslations = {
    en: {
      heroSub: "DISCOVER OUR STORY",
      heroTitleLine1: "Crafting Journeys,",
      heroTitleLine2: "Creating Memories",
      heroDesc: "We are a passionate team of local experts dedicated to sharing the real Morocco with the world. Authentic experiences, unforgettable memories, and exceptional service.",
      
      feature1: "100% Local Experts",
      feature2: "Best Price Guarantee",
      feature3: "Handpicked Experiences",
      feature4: "24/7 Customer Support",
      feature5: "Luxury & Comfort Travel",

      missionSub: "OUR MISSION",
      missionTitle: "Sharing the Real Morocco Through Authentic Experiences",
      missionDesc: "From the golden dunes of the Sahara to the blue streets of Chefchaouen, from ancient medinas to breathtaking landscapes, we create private tours and unique experiences that connect travelers with the heart and soul of Morocco.",
      viewPackages: "VIEW OUR PACKAGES",
      yearsExp: "YEARS OF EXPERIENCE",

      stat1Val: "12K+",
      stat1Label: "Happy Travelers",
      stat2Val: "150+",
      stat2Label: "Unique Tours",
      stat3Val: "30+",
      stat3Label: "Destinations",
      stat4Val: "4.9/5",
      stat4Label: "Customer Rating",
      stat5Val: "10+",
      stat5Label: "Years of Experience",

      teamSub: "MEET OUR TEAM",
      teamTitle: "The People Behind Your Journey",

      ctaTitle: "Ready to Start Your Journey?",
      ctaDesc: "Let our experts craft the perfect Moroccan experience for you.",
      bookWhatsapp: "BOOK ON WHATSAPP",
      contactUs: "CONTACT US"
    },
    fr: {
      heroSub: "DÉCOUVREZ NOTRE HISTOIRE",
      heroTitleLine1: "Créer des Voyages,",
      heroTitleLine2: "Créer des Souvenirs",
      heroDesc: "Nous sommes une équipe passionnée d'experts locaux dédiée à partager le vrai Maroc avec le monde. Des expériences authentiques, des souvenirs inoubliables et un service d'exception.",
      
      feature1: "100% Experts Locaux",
      feature2: "Meilleur Prix Garanti",
      feature3: "Expériences Sur Mesure",
      feature4: "Support client 24/7",
      feature5: "Voyage Luxe & Confort",

      missionSub: "NOTRE MISSION",
      missionTitle: "Partager le Vrai Maroc à Travers des Expériences Authentiques",
      missionDesc: "Des dunes dorées du Sahara aux ruelles bleues de Chefchaouen, des médinas ancestrales aux paysages époustouflants, nous créons des circuits privés et des expériences uniques qui connectent les voyageurs au cœur et à l'âme du Maroc.",
      viewPackages: "VOIR NOS CIRCUITS",
      yearsExp: "D'EXPÉRIENCE",

      stat1Val: "12K+",
      stat1Label: "Voyageurs Heureux",
      stat2Val: "150+",
      stat2Label: "Circuits Uniques",
      stat3Val: "30+",
      stat3Label: "Destinations",
      stat4Val: "4.9/5",
      stat4Label: "Avis Clients",
      stat5Val: "10+",
      stat5Label: "Années d'Expérience",

      teamSub: "RENCONTRER L'ÉQUIPE",
      teamTitle: "Les Personnes Derrière Votre Voyage",

      ctaTitle: "Prêt à Commencer Votre Voyage?",
      ctaDesc: "Laissez nos experts créer l'expérience marocaine parfaite pour vous.",
      bookWhatsapp: "RÉSERVER SUR WHATSAPP",
      contactUs: "CONTACTEZ-NOUS"
    },
    es: {
      heroSub: "DESCUBRE NUESTRA HISTORIA",
      heroTitleLine1: "Diseñando Viajes,",
      heroTitleLine2: "Creando Recuerdos",
      heroDesc: "Somos un equipo apasionado de expertos locales dedicados a compartir el verdadero Marruecos con el mundo. Experiencias auténticas, recuerdos inolvidables y un servicio excepcional.",
      
      feature1: "100% Expertos Locales",
      feature2: "Mejor Precio Garantizado",
      feature3: "Experiencias Exclusivas",
      feature4: "Soporte 24/7",
      feature5: "Viaje de Lujo y Confort",

      missionSub: "NUESTRA MISIÓN",
      missionTitle: "Compartir el Verdadero Marruecos a Través de Experiencias Auténticas",
      missionDesc: "Desde las dunas doradas del Sahara hasta las calles azules de Chefchaouen, desde medinas antiguas hasta paisajes impresionantes, creamos tours privados y experiencias únicas que conectan a los viajeros con el corazón y alma de Marruecos.",
      viewPackages: "VER NUESTROS PAQUETES",
      yearsExp: "AÑOS DE EXPERIENCIA",

      stat1Val: "12K+",
      stat1Label: "Viajeros Felices",
      stat2Val: "150+",
      stat2Label: "Tours Únicos",
      stat3Val: "30+",
      stat3Label: "Destinos",
      stat4Val: "4.9/5",
      stat4Label: "Valoración de Clientes",
      stat5Val: "10+",
      stat5Label: "Años de Experiencia",

      teamSub: "NUESTRO EQUIPO",
      teamTitle: "Las Personas Detrás de Tu Viaje",

      ctaTitle: "¿Listo para Empezar tu Viaje?",
      ctaDesc: "Deja que nuestros expertos diseñen la experiencia marroquí perfecta para ti.",
      bookWhatsapp: "RESERVAR POR WHATSAPP",
      contactUs: "CONTÁCTANOS"
    }
  };

  const t = localTranslations[currentLocale] || localTranslations['en'];

  // Team members list matching the design image
  const teamMembers = [
    {
      name: "Youssef El Amrani",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Salma El Fassi",
      role: "Travel Experience Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Hassan Ait Hamou",
      role: "Head Tour Guide",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Meryem Belaid",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Omar Belkacem",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Nadia Benali",
      role: "Marketing Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      linkedin: "#",
      instagram: "#"
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-gray-800 overflow-x-hidden selection:bg-amber-500 selection:text-white">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative min-h-[620px] md:min-h-[700px] w-full flex flex-col justify-between bg-gray-950 pt-28 md:pt-36 pb-0 overflow-hidden">
        {/* Background Image & Left-to-Right Dark Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="/ChatGPT Image Jul 30, 2026, 09_28_50 PM.png"
            fallback="/hero-bg.jpg" 
            alt="Moroccan Kasbah Sunset Coast"
            className="w-full h-full object-cover object-top brightness-[0.95] contrast-[1.05]"
          />
          {/* Subtle gradient mask: keeps left side readable while preserving the vibrant sunset Kasbah on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content Overlay (Left Aligned as in Mockup) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full my-auto text-left text-white pt-12">
          <div className="max-w-xl md:max-w-2xl space-y-5">
            <motion.span 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#E06D29] block"
            >
              {t.heroSub}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white font-bold leading-[1.15]"
            >
              {t.heroTitleLine1}
              <br />
              <span className="text-[#E06D29]">
                {t.heroTitleLine2}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed pt-2"
            >
              {t.heroDesc}
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
                <span className="text-xs font-semibold text-gray-200 leading-tight max-w-[85px] sm:max-w-none">{t.feature1}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <DollarSign className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200 leading-tight max-w-[85px] sm:max-w-none">{t.feature2}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Compass className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200 leading-tight max-w-[85px] sm:max-w-none">{t.feature3}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Headphones className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200 leading-tight max-w-[85px] sm:max-w-none">{t.feature4}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-gray-200 leading-tight max-w-[85px] sm:max-w-none">{t.feature5}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Torn Paper Edge Bottom SVG Divider (Rough Deckled Paper Tear) */}
        <div className="relative w-full overflow-hidden leading-none z-10 mt-12">
          <svg 
            className="relative block w-full h-10 md:h-14 text-[#FAF8F5]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,120 L0,45 Q15,42 30,48 Q45,54 60,40 Q75,26 90,38 Q105,50 120,44 Q135,38 150,49 Q165,60 180,45 Q195,30 210,42 Q225,54 240,40 Q255,26 270,38 Q285,50 300,43 Q315,36 330,48 Q345,60 360,44 Q375,28 390,41 Q405,54 420,46 Q435,38 450,51 Q465,64 480,47 Q495,30 510,42 Q525,54 540,39 Q555,24 570,37 Q585,50 600,45 Q615,40 630,52 Q645,64 660,46 Q675,28 690,40 Q705,52 720,44 Q735,36 750,49 Q765,62 780,45 Q795,28 810,41 Q825,54 840,43 Q855,32 870,47 Q885,62 900,48 Q915,34 930,44 Q945,54 960,42 Q975,30 990,46 Q1035,36 1050,47 Q1065,58 1080,43 Q1095,28 1110,40 Q1125,52 1140,44 Q1155,36 1170,48 Q1185,60 1200,42 L1200,120 Z" 
              fill="currentColor" 
            />
          </svg>
        </div>
      </section>

      {/* 2. OUR MISSION SECTION */}
      <section className="relative py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Palm tree background watermark on far left side */}
        <div className="absolute left-0 bottom-0 top-6 w-64 md:w-80 opacity-15 pointer-events-none select-none text-[#d4a87a]">
          <svg viewBox="0 0 200 300" fill="currentColor" className="w-full h-full">
            <path d="M100 280 C95 200 90 120 100 20 C70 40 40 70 20 110 C40 100 70 95 100 100 C60 120 30 160 10 210 C40 190 75 180 100 180 C80 200 60 230 45 270 C70 250 90 235 100 230 C105 235 125 250 150 270 C135 230 115 200 95 180 C120 180 155 190 185 210 C165 160 135 120 95 100 C125 95 155 100 175 110 C155 70 125 40 95 20" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <span className="text-[#E06D29] text-xs font-extrabold tracking-[0.25em] uppercase block">
              {t.missionSub}
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {t.missionTitle}
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
              {t.missionDesc}
            </p>

            <div className="pt-4">
              <Link 
                href="/tours"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F95738] via-[#EE4266] to-[#E03A5E] hover:from-[#e04526] hover:to-[#c82e50] text-white px-7 py-3.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl shadow-rose-500/25 transform hover:-translate-y-0.5"
              >
                <span>{t.viewPackages}</span>
                <ChevronRight className="w-4 h-4 text-white stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>

          {/* Right Image Grid Collage with Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Left Column Stacked (Top: Desert Camels, Bottom: Blue City) */}
              <div className="col-span-7 space-y-4">
                <div className="h-44 sm:h-52 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <SafeImage 
                    src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
                    alt="Sahara Desert Sunset Camels"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="h-52 sm:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                  <SafeImage 
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
                    alt="Chefchaouen Blue Streets"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Right Column (Kasbah Village Tall Image) */}
              <div className="col-span-5 h-[410px] sm:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                <SafeImage 
                  src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop"
                  alt="Aït Benhaddou Kasbah"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Overlapping White Circular Badge */}
            <div className="absolute top-1/2 left-[56%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 md:p-6 shadow-2xl border-4 border-[#FAF8F5] flex flex-col items-center justify-center text-center w-28 h-28 sm:w-32 sm:h-32 z-20">
              <span className="text-2xl sm:text-3xl font-extrabold font-serif text-[#E06D29] leading-none">
                10+
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-wider mt-1 leading-tight">
                {t.yearsExp}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. STATISTICS BAR */}
      <section className="px-6 max-w-7xl mx-auto py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-amber-900/5 border border-gray-100 p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/70">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-2">
              <Users className="w-7 h-7 text-[#E06D29] mb-2 stroke-[1.75]" />
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900 tracking-tight">{t.stat1Val}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{t.stat1Label}</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2">
              <Briefcase className="w-7 h-7 text-[#E06D29] mb-2 stroke-[1.75]" />
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900 tracking-tight">{t.stat2Val}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{t.stat2Label}</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2">
              <MapPin className="w-7 h-7 text-[#E06D29] mb-2 stroke-[1.75]" />
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900 tracking-tight">{t.stat3Val}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{t.stat3Label}</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2">
              <Star className="w-7 h-7 text-[#E06D29] mb-2 stroke-[1.75]" />
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900 tracking-tight">{t.stat4Val}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{t.stat4Label}</span>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center text-center p-2 pt-6 md:pt-2 col-span-2 md:col-span-1">
              <Award className="w-7 h-7 text-[#E06D29] mb-2 stroke-[1.75]" />
              <span className="text-2xl sm:text-3xl font-extrabold font-sans text-gray-900 tracking-tight">{t.stat5Val}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{t.stat5Label}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. MEET OUR TEAM SECTION */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto text-center">
        <span className="text-[#E06D29] text-xs font-extrabold tracking-[0.25em] uppercase block mb-2">
          {t.teamSub}
        </span>
        
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {t.teamTitle}
        </h2>

        {/* Decorative Squiggly Underline SVG */}
        <div className="flex justify-center my-4">
          <svg className="w-24 h-4 text-[#E06D29]" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M 0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" />
          </svg>
        </div>

        {/* Team Grid (6 Cards) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-4 border border-amber-100/60 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group"
            >
              {/* Member Portrait */}
              <div className="w-full h-56 rounded-xl overflow-hidden mb-4 bg-gray-100">
                <SafeImage 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <h3 className="font-serif font-bold text-gray-900 text-base group-hover:text-[#E06D29] transition-colors">
                {member.name}
              </h3>
              
              <p className="text-xs text-[#E06D29] font-medium mt-1 mb-4">
                {member.role}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2 mt-auto">
                <a 
                  href={member.linkedin} 
                  className="w-7 h-7 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors text-xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a 
                  href={member.instagram} 
                  className="w-7 h-7 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors text-xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM CALL TO ACTION BANNER */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[220px] flex items-center p-8 md:p-12">
          {/* Background image & overlay */}
          <div className="absolute inset-0 z-0">
            <SafeImage 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" 
              alt="Moroccan Landscape Balloon Sunset"
              className="w-full h-full object-cover brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left text-white max-w-xl">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                {t.ctaTitle}
              </h2>
              <p className="text-gray-300 text-sm md:text-base font-light mt-2">
                {t.ctaDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="https://wa.me/212600000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E06D29] to-[#E94E34] hover:from-[#c85c1b] hover:to-[#d03d24] text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.bookWhatsapp}</span>
              </a>

              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-sm"
              >
                <span>{t.contactUs}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
