"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoMarquee() {
  const partners = [
    { 
      name: "Viator", 
      src: "/assets/viator7787.jpg", 
      extraClass: "scale-135 md:scale-150 w-28" 
    },
    { 
      name: "Travefy", 
      src: "/assets/images (5).png", 
      extraClass: "max-h-10 md:max-h-11 w-36" 
    },
    { 
      name: "Tourhub", 
      src: "/assets/images (4).png", 
      extraClass: "max-h-10 md:max-h-11 w-36" 
    },
    { 
      name: "Tripadvisor", 
      src: "/assets/images (3).png", 
      extraClass: "scale-135 md:scale-150 w-32" 
    },
    { 
      name: "Tourradar", 
      src: "/assets/images (2).png", 
      extraClass: "scale-135 md:scale-150 w-32" 
    }
  ];

  // Duplicate array to ensure seamless infinite looping with zero gaps
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden relative border-y border-gray-100 z-10 w-full">
      {/* UNIFIED EDITORIAL SECTION TYPOGRAPHY */}
      <div className="max-w-4xl mx-auto px-6 mb-12 md:mb-16 text-center">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-orange-500 mb-2 block">
          DISCOVER OUR PARTNERS
        </span>
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
          We proudly collaborate with leading OTAs to offer seamless bookings and exceptional travel experiences.
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div className="absolute top-0 left-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

        {/* Infinite Track Container */}
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity
          }}
          className="flex whitespace-nowrap w-max items-center py-2"
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="w-48 h-20 flex justify-center items-center px-4 mx-6 shrink-0 relative bg-white mix-blend-darken cursor-pointer select-none"
            >
              <Image 
                src={partner.src}
                alt={partner.name}
                width={192}
                height={80}
                className={`max-h-12 max-w-full w-auto h-auto object-contain layout-fix filter brightness-100 contrast-125 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 ${partner.extraClass}`}
                priority={idx < 5}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
