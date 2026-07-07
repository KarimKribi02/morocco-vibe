"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const localTranslations = {
  en: {
    subtitle: "EXCLUSIVE EXPEDITIONS",
    title: "Our Signature Curated Expeditions",
    buttonText: "Discover Itinerary",
    tours: [
      {
        id: "chefchaouen",
        title: "Chefchaouen Wonders",
        location: "Chefchaouen, Morocco",
        duration: "3 Days",
        description: "Wander through the dreamy blue-washed streets, uncovering centuries-old Andalusian history and vibrant artisan souks.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sahara",
        title: "Saharan Grand Dune Safari",
        location: "Merzouga Desert",
        duration: "4 Days",
        description: "Traverse the majestic golden dunes of Erg Chebbi on camelback and sleep under the stars in an elite luxury nomadic camp.",
        image: "/assets/desert-luxury-1.png"
      },
      {
        id: "imperial",
        title: "Imperial Heritage Trek",
        location: "Fes & Marrakech",
        duration: "5 Days",
        description: "Journey through Morocco's royal capitals, exploring intricate architectural geometry, vibrant palaces, and historic medinas.",
        image: "/assets/imperial-heritage.png"
      }
    ]
  },
  fr: {
    subtitle: "EXPÉDITIONS EXCLUSIVES",
    title: "Nos Expéditions Signatures",
    buttonText: "Découvrir l'Itinéraire",
    tours: [
      {
        id: "chefchaouen",
        title: "Les Merveilles de Chefchaouen",
        location: "Chefchaouen, Maroc",
        duration: "3 Jours",
        description: "Flânez dans les ruelles bleu rêve de la médina, découvrez l'histoire andalouse séculaire et les souks d'artisans dynamiques.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sahara",
        title: "Safari des Grandes Dunes du Sahara",
        location: "Désert de Merzouga",
        duration: "4 Jours",
        description: "Parcourez les majestueuses dunes dorées d'Erg Chebbi à dos de chameau et passez la nuit dans un camp nomade ultra-luxe.",
        image: "/assets/desert-luxury-1.png"
      },
      {
        id: "imperial",
        title: "Randonnée de l'Héritage Impérial",
        location: "Fès & Marrakech",
        duration: "5 Jours",
        description: "Voyagez à travers les capitales royales du Maroc, explorez la géométrie architecturale complexe et les palais historiques.",
        image: "/assets/imperial-heritage.png"
      }
    ]
  },
  es: {
    subtitle: "EXPEDICIONES EXCLUSIVAS",
    title: "Nuestras Expediciones Emblemáticas",
    buttonText: "Descubrir Itinerario",
    tours: [
      {
        id: "chefchaouen",
        title: "Maravillas de Chefchauen",
        location: "Chefchauen, Marruecos",
        duration: "3 Días",
        description: "Pasee por las calles de tonos azules de ensueño, descubriendo siglos de historia andalusí y vibrantes zocos artesanales.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "sahara",
        title: "Safari de la Gran Duna del Sahara",
        location: "Desierto de Merzouga",
        duration: "4 Días",
        description: "Recorra las majestuosas dunas doradas de Erg Chebbi a lomos de un camello y duerma bajo las estrellas en un campamento de lujo.",
        image: "/assets/desert-luxury-1.png"
      },
      {
        id: "imperial",
        title: "Ruta del Patrimonio Imperial",
        location: "Fez y Marrakech",
        duration: "5 Días",
        description: "Viaje a través de las capitales reales de Marruecos, explorando la intrincada geometría arquitectónica y palacios históricos.",
        image: "/assets/imperial-heritage.png"
      }
    ]
  }
};

export default function FeaturedTours({ className = '' }) {
  const { currentLocale } = useLanguage();
  const lang = localTranslations[currentLocale] || localTranslations['en'];

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Card slide-up animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="featured-tours-wrapper"
      className={`snap-start snap-always h-screen w-full flex flex-col justify-center bg-[#FDFBF7] py-12 md:py-16 px-6 md:px-12 relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[85vh] md:max-h-[80vh]">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10 space-y-2">
          <span className="px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F0715D] bg-[#F0715D]/10">
            {lang.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A1128] tracking-tight mt-3">
            {lang.title}
          </h2>
        </div>

        {/* 3-Column Premium Tour Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-grow items-stretch"
        >
          {lang.tours.map((tour) => (
            <motion.div
              key={tour.id}
              variants={cardVariants}
              className="bg-[#FCFAF6] border border-[#F4EFEB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group transform hover:-translate-y-1.5"
            >
              {/* Image Container with subtle zoom effect */}
              <div className="relative h-44 md:h-48 lg:h-52 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Floating duration badge */}
                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {tour.duration}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  {/* Metadata Icons (Duration, Location) */}
                  <div className="flex items-center space-x-4 text-[11px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F0715D]" />
                      {tour.location}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg md:text-xl text-[#0A1128] tracking-tight group-hover:text-[#F0715D] transition-colors duration-300">
                    {tour.title}
                  </h3>

                  <p className="text-slate-600 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                    {tour.description}
                  </p>
                </div>

                {/* Sleek Coral Gradient Action Button */}
                <div className="pt-2">
                  <Link
                    href={`/tours/${tour.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#F27A60] to-[#E05236] hover:from-[#E05236] hover:to-[#C84127] text-white py-3 px-5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#F0715D]/25"
                  >
                    {lang.buttonText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
