"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const localTranslations = {
  en: {
    alphaSubtitle: "EXCLUSIVE DESERT SAFARIS",
    alphaTitle: "Immersive Saharan Luxury Expeditions",
    alphaBody: "Venture into the heart of Merzouga with custom private encampments, curated camel treks at golden hour, and five-star traditional hospitality.",
    alphaButton: "Explore Desert Packages",

    betaSubtitle: "TAILORED OASES RETREATS",
    betaTitle: "Bespoke Premium Desert Encampments",
    betaBody: "Unwind under the desert stars with personalized high-end concierge services, refined traditional gastronomy, and private nomadic expeditions.",
    betaButton: "Discover Encampments"
  },
  fr: {
    alphaSubtitle: "SAFARIS SAHARIENS EXCLUSIFS",
    alphaTitle: "Expéditions Sahariennes Immersives de Luxe",
    alphaBody: "Aventurez-vous au cœur de Merzouga avec des campements privés sur mesure, des randonnées à chameau au coucher du soleil et une hospitalité traditionnelle cinq étoiles.",
    alphaButton: "Explorer les Forfaits Désert",

    betaSubtitle: "RETRAITES D'OASIS SUR MESURE",
    betaTitle: "Campements de Désert Haut de Gamme Personnalisés",
    betaBody: "Détendez-vous sous les étoiles du désert avec des services de conciergerie personnalisés haut de gamme, une gastronomie traditionnelle raffinée et des expéditions nomades privées.",
    betaButton: "Découvrir les Campements"
  },
  es: {
    alphaSubtitle: "SAFARIS EXCLUSIVOS EN EL DESIERTO",
    alphaTitle: "Expediciones Saharianas de Lujo Inmersivas",
    alphaBody: "Aventúrese en el corazón de Merzouga con campamentos privados personalizados, paseos en camello al atardecer y hospitalidad tradicional de cinco estrellas.",
    alphaButton: "Explorar Paquetes del Desierto",

    betaSubtitle: "RETIROS DE OASIS A MEDIDA",
    betaTitle: "Campamientos de Desierto Premium a Medida",
    betaBody: "Relájese bajo las estrellas del desierto con servicios de conserjería personalizados de alta gama, gastronomía tradicional refinada y expediciones nómadas privadas.",
    betaButton: "Descubrir Campamientos"
  }
};

export default function FeaturedExpedition({ className = '' }) {
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
    <>
      {/* SECTION ALPHA: Left Image, Right Text */}
      <section
        id="saharan-luxury-alpha"
        className={`w-full h-screen snap-start snap-always flex flex-col justify-center relative bg-[#FDFBF7] overflow-hidden ${className}`}
      >
        <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-12 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Column: Image wrapper (Full-bleed container wrapper) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageRevealVariants}
            className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-[450px] md:h-[600px] lg:h-[650px] relative shrink-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/assets/desert-luxury-1.png"
                alt="Saharan Luxury Expedition - Dunes of Merzouga"
                fill
                priority
                className="object-contain w-full h-full transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Column: HTML Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textRevealVariants}
            className="text-left flex flex-col justify-center space-y-4 md:space-y-6 max-w-xl"
          >
            <div className="space-y-2">
              <span className="text-orange-500 font-semibold uppercase tracking-widest text-xs md:text-sm block">
                {t('alphaSubtitle')}
              </span>
              <h2 className="font-serif text-slate-900 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t('alphaTitle')}
              </h2>
            </div>

            <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
              {t('alphaBody')}
            </p>

            <div>
              <Link
                href="/tours?category=desert"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
                id="btn-explore-desert-packages"
              >
                {t('alphaButton')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION BETA: Right Image, Left Text (Mirrored Layout Grid) */}
      <section
        id="saharan-luxury-beta"
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
              <span className="text-orange-500 font-semibold uppercase tracking-widest text-xs md:text-sm block">
                {t('betaSubtitle')}
              </span>
              <h2 className="font-serif text-slate-900 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t('betaTitle')}
              </h2>
            </div>

            <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed">
              {t('betaBody')}
            </p>

            <div>
              <Link
                href="/tours?category=desert"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-300 cursor-pointer"
                id="btn-discover-encampments"
              >
                {t('betaButton')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Image wrapper */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageRevealVariants}
            className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-[450px] md:h-[600px] lg:h-[650px] relative shrink-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/assets/desert-luxury-2.png"
                alt="Bespoke Premium Desert Encampments"
                fill
                priority
                className="object-contain w-full h-full transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
