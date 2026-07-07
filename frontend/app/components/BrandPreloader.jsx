"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandPreloader() {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock scrolling on initial render
    document.body.style.overflow = "hidden";
    
    // Auto-dismiss after animation transitions settle (1.0 second total)
    const timer = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = "";
    }, 1000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  // Icon entry animation: slide up with micro-bounce/elastic feel
  const iconVariants = {
    hidden: { y: 70, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1], // elegant ease-out
      }
    }
  };

  // Typography entry animation: staggered reveal
  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.15
      }
    }
  };

  // Slogan entry animation
  const sloganVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 0.8,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.25
      }
    }
  };

  // Ivory curtain slide-up reveal animation using high-velocity Expo Out curve
  const curtainVariants = {
    show: { y: 0 },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Ultra-fast Expo Out
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isMounted && (
        <motion.div
          variants={curtainVariants}
          initial="show"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7] select-none pointer-events-none"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            
            {/* Brand Logo Icon */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="show"
              className="relative w-44 h-44 md:w-52 md:h-52 mb-6"
            >
              <img
                src="/assets/logo-icon.png"
                alt="Morocco Vibe Icon"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Brand Logo Text */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="show"
              className="overflow-hidden py-1"
            >
              <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-[0.3em] text-[#0F172A] uppercase">
                Morocco Vibe
              </h1>
            </motion.div>

            {/* Brand Slogan */}
            <motion.p
              variants={sloganVariants}
              initial="hidden"
              animate="show"
              className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] text-[#E07A5F] uppercase pt-2"
            >
              Journeys That Stay With You
            </motion.p>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
