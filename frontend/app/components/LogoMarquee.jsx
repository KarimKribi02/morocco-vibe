"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoMarquee() {
  const partners = [
    { 
      name: "Viator", 
      src: "/assets/viator7787.jpg",
      style: "h-10 sm:h-12 w-auto object-contain scale-125"
    },
    { 
      name: "Travefy", 
      src: "/assets/images (5).png",
      style: "h-10 sm:h-12 w-auto object-contain scale-110"
    },
    { 
      name: "Tourhub", 
      src: "/assets/images (4).png",
      style: "h-8 sm:h-10 w-auto object-contain"
    },
    { 
      name: "Tripadvisor", 
      src: "/assets/images (3).png",
      style: "h-12 sm:h-16 w-auto object-contain scale-150"
    },
    { 
      name: "Tourradar", 
      src: "/assets/images (2).png",
      style: "h-12 sm:h-16 w-auto object-contain scale-150"
    }
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="w-full bg-transparent py-6 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
        
        {/* Minimalist Header */}
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E86D5A]">
          OUR TRUSTED TRAVEL PARTNERS
        </p>

        {/* Clean Marquee Track */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Gradient Fades */}
          <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent pointer-events-none z-10" />

          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 22,
              ease: "linear",
              repeat: Infinity
            }}
            className="flex whitespace-nowrap w-max items-center gap-12 sm:gap-20 py-2"
          >
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={idx}
                className="h-14 sm:h-16 flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-all duration-300 cursor-pointer mix-blend-darken"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={160}
                  height={50}
                  className={`${partner.style} mix-blend-darken filter brightness-95 contrast-110`}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
