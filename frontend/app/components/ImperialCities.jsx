"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const localTranslations = {
  en: {
    subtitle: "CULTURAL HERITAGE",
    title: "Discover the Majestic Soul of Morocco's Imperial Cities",
    body: "Journey through centuries of history, rich architectural landmarks, and vibrant old medinas. From the historic ramparts of Fes to the lively pulses of Marrakech, explore curated premium heritage paths.",
    button: "View Heritage Packages"
  },
  fr: {
    subtitle: "PATRIMOINE CULTUREL",
    title: "Découvrez l'Âme Majestueuse des Villes Impériales du Maroc",
    body: "Voyagez à travers des siècles d'histoire, des monuments architecturaux riches et des médinas animées. Des remparts historiques de Fès aux pulsations vives de Marrakech, explorez des sentiers patrimoniaux de premier choix.",
    button: "Voir les Forfaits Patrimoine"
  },
  es: {
    subtitle: "PATRIMONIO CULTURAL",
    title: "Descubra el Alma Majestuosa de las Ciudades Imperiales de Marruecos",
    body: "Viaje a través de siglos de historia, ricos monumentos arquitectónicos y vibrantes medinas antiguas. Desde las murallas históricas de Fez hasta los ritmos animados de Marrakech, explore rutas de patrimonio de alta gama.",
    button: "Ver Paquetes de Patrimonio"
  }
};

export default function ImperialCities({ className = '' }) {
  const { currentLocale } = useLanguage();
  const t = (key) => localTranslations[currentLocale]?.[key] || localTranslations['en'][key];

  // Motion variants for text content reveal
  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Motion variants for image scale & fade
  const imageRevealVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="imperial-heritage-section"
      className={`w-full h-screen snap-start snap-always flex flex-col justify-center relative bg-[#FDFBF7] overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-12 flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Left Column: HTML Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textRevealVariants}
          className="text-left flex flex-col justify-center space-y-4 md:space-y-6 max-w-xl"
        >
          <div className="space-y-2">
            <span className="text-orange-500 uppercase tracking-widest text-xs block font-bold">
              {t('subtitle')}
            </span>
            <h2 className="font-serif font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl leading-tight">
              {t('title')}
            </h2>
          </div>

          <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
            {t('body')}
          </p>

          <div>
            <Link
              href="/tours?category=cities"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
              id="btn-view-heritage-packages"
            >
              {t('button')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Image wrapper (majestically inside its container wrapper) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageRevealVariants}
          className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-[450px] md:h-[600px] lg:h-[650px] relative shrink-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/assets/imperial-heritage.png"
              alt="Imperial Heritage of Morocco"
              fill
              priority
              className="object-contain w-full h-full transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
