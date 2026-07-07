"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const localTranslations = {
  en: {
    badge: "VOICES OF EXPLORERS",
    title: "Stories from Our Luxury Seekers",
    linkText: "Read All Staging Reviews",
    reviews: [
      {
        id: 1,
        author: "Lady Evelyn Sterling",
        role: "Connoisseur of Art & Travel",
        location: "London, UK",
        rating: 5,
        excerpt: "Our private expedition through the Sahara was nothing short of cinematic. The attention to detail, from the hand-woven Berber rugs in our luxury desert encampment to the culinary precision of our private chef, redefined our expectations of luxury travel.",
        date: "September 2025"
      },
      {
        id: 2,
        author: "Marc-Antoine Dubois",
        role: "Architectural Historian",
        location: "Paris, France",
        rating: 5,
        excerpt: "The Imperial Cities trek was curated with absolute intellectual and aesthetic rigor. Wandering the labyrinthine paths of Fes with a scholar guide, followed by evenings in riads that felt like private palaces, was an unforgettable experience.",
        date: "October 2025"
      },
      {
        id: 3,
        author: "Dr. Aria Vance",
        role: "Culture & Heritage Archivist",
        location: "Boston, USA",
        rating: 5,
        excerpt: "Chefchaouen's indigo walls were magical, but what truly elevated our journey was the seamless logistics and exclusive access. Morocco Vibe provided a window into the soul of the country while maintaining a cocoon of luxury.",
        date: "November 2025"
      }
    ]
  },
  fr: {
    badge: "VOIX DES EXPLORATEURS",
    title: "Témoignages de Nos Voyageurs de Luxe",
    linkText: "Lire Tous les Avis de Staging",
    reviews: [
      {
        id: 1,
        author: "Lady Evelyn Sterling",
        role: "Amatrice d'Art et de Voyage",
        location: "Londres, Royaume-Uni",
        rating: 5,
        excerpt: "Notre expédition privée dans le Sahara était digne d'un film. L'attention portée aux détails, des tapis berbères tissés main dans notre campement de luxe à la précision culinaire de notre chef privé, a redéfini nos attentes.",
        date: "Septembre 2025"
      },
      {
        id: 2,
        author: "Marc-Antoine Dubois",
        role: "Historien de l'Architecture",
        location: "Paris, France",
        rating: 5,
        excerpt: "Le voyage des villes impériales a été organisé avec une rigueur intellectuelle et esthétique absolue. Flâner dans les ruelles de Fès avec un guide universitaire, puis passer les soirées dans des riads privatifs, fut inoubliable.",
        date: "Octobre 2025"
      },
      {
        id: 3,
        author: "Dr. Aria Vance",
        role: "Archiviste du Patrimoine Culturel",
        location: "Boston, États-Unis",
        rating: 5,
        excerpt: "Les murs indigo de Chefchaouen étaient magiques, mais ce qui a vraiment sublimé notre voyage, c'est la logistique fluide et l'accès exclusif. Morocco Vibe offre une fenêtre sur l'âme du pays dans un cocon de luxe.",
        date: "Novembre 2025"
      }
    ]
  },
  es: {
    badge: "VOCES DE EXPLORADORES",
    title: "Historias de Nuestros Buscadores de Lujo",
    linkText: "Leer Todas las Reseñas de Staging",
    reviews: [
      {
        id: 1,
        author: "Lady Evelyn Sterling",
        role: "Conocedora de Arte y Viajes",
        location: "Londres, Reino Unido",
        rating: 5,
        excerpt: "Nuestra expedición privada por el Sahara fue casi cinematográfica. La atención al detalle, desde las alfombras bereberes tejidas a mano en nuestro campamento de lujo hasta la precisión culinaria de nuestro chef privado, superó todo.",
        date: "Septiembre 2025"
      },
      {
        id: 2,
        author: "Marc-Antoine Dubois",
        role: "Historiador de Arquitectura",
        location: "París, Francia",
        rating: 5,
        excerpt: "La ruta de las Ciudades Imperiales fue diseñada con un rigor intelectual y estético absoluto. Recorrer los laberintos de Fez con un guía académico y descansar en riads que parecían palacios privados fue una experiencia inolvidable.",
        date: "Octubre 2025"
      },
      {
        id: 3,
        author: "Dr. Aria Vance",
        role: "Archivista de Cultura y Patrimonio",
        location: "Boston, EE.UU.",
        rating: 5,
        excerpt: "Las paredes índigo de Chefchauen eran mágicas, pero lo que realmente elevó nuestro viaje fue la logística fluida y el acceso exclusivo. Morocco Vibe abrió una ventana al alma del país manteniendo un capullo de puro lujo.",
        date: "Noviembre 2025"
      }
    ]
  }
};

export default function GuestReviews({ className = '' }) {
  const { currentLocale } = useLanguage();
  const lang = localTranslations[currentLocale] || localTranslations['en'];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % lang.reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + lang.reviews.length) % lang.reviews.length);
  };

  return (
    <section
      id="guest-reviews-section"
      className={`snap-start snap-always h-screen w-full flex flex-col justify-center bg-[#FDFBF7] py-12 md:py-16 px-6 md:px-12 relative overflow-hidden ${className}`}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200/20 font-serif text-[18vw] select-none pointer-events-none z-0">
        Morocco
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full max-h-[85vh] md:max-h-[80vh] relative z-10">

        {/* Header Layout */}
        <div className="text-center mb-6 md:mb-10 space-y-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F0715D] block">
            {lang.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A1128] tracking-tight mt-3">
            {lang.title}
          </h2>
        </div>

        {/* Testimonial Display Area */}
        <div className="flex-grow flex items-center justify-center relative my-6">

          {/* Left/Right Navigation controls for desktop slider */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
            <button
              onClick={prevReview}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white/95 shadow-sm hover:shadow-md text-[#0A1128] hover:text-[#F0715D] flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer translate-x-[-10px] md:translate-x-[-24px]"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white/95 shadow-sm hover:shadow-md text-[#0A1128] hover:text-[#F0715D] flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer translate-x-[10px] md:translate-x-[24px]"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Floating Card Modules (Mobile/Tablet single slider, Desktop beautifully spaced overlapping slider/stack) */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
            <AnimatePresence mode="wait">
              {/* Render the 3 card modules. We highlight the active one and float it higher */}
              {lang.reviews.map((review, index) => {
                const isActive = index === activeIndex;
                const offset = (index - activeIndex + lang.reviews.length) % lang.reviews.length;

                // On mobile, only show the active one. On desktop, show all three but style the active one specifically.
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: isActive ? -12 : 0,
                      scale: isActive ? 1.03 : 0.98,
                      zIndex: isActive ? 10 : 1
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white/80 backdrop-blur-md border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm transition-shadow duration-500 hover:shadow-xl relative overflow-hidden group ${isActive
                        ? 'border-[#F0715D]/40 shadow-md bg-white'
                        : 'border-[#F4EFEB] opacity-80 md:opacity-90'
                      } ${
                      // Responsive visibility: show all on desktop, but hide inactive on mobile
                      !isActive ? 'hidden md:flex' : 'flex'
                      }`}
                  >
                    {/* Decorative quote mark */}
                    <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-100 group-hover:text-[#F0715D]/10 transition-colors duration-500 pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      {/* Clean minimal teal star array format */}
                      <div className="flex items-center space-x-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-teal-600 text-teal-600" />
                        ))}
                      </div>

                      {/* Editorial Text Excerpt */}
                      <p className="text-slate-700 italic font-light text-sm md:text-base leading-relaxed">
                        "{review.excerpt}"
                      </p>
                    </div>

                    {/* Reviewer Metadata */}
                    <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm md:text-base text-[#0A1128]">
                          {review.author}
                        </h4>
                        <p className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                          {review.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-[#F0715D] tracking-wider uppercase block">
                          {review.location}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Link Navigation dots & Action Link */}
        <div className="text-center mt-4 space-y-4">
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {lang.reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? 'w-6 bg-[#F0715D]' : 'bg-slate-300'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Central action link */}
          <div className="pt-2">
            <Link
              href="/about#reviews"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A1128] hover:text-[#F0715D] transition-colors duration-300 group cursor-pointer relative py-1"
            >
              <span>{lang.linkText}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#0A1128] group-hover:bg-[#F0715D] scale-x-50 group-hover:scale-x-100 origin-center transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
