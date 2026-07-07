"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-6 text-center z-10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,113,93,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl mx-auto space-y-8"
      >
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#F0715D] bg-[#F0715D]/10 px-4 py-1.5 rounded-full">
          Error 404
        </span>

        <h1 className="font-serif font-bold text-4xl md:text-6xl text-[#0A1128] tracking-tight leading-tight">
          Lost in the Atlas Mountains?
        </h1>

        <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed max-w-md mx-auto">
          The path you seek has vanished like desert mirages. Let us guide you back to our curated journeys.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#F27A60] to-[#E05236] hover:from-[#E05236] hover:to-[#C84127] text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#F0715D]/25"
          >
            Return to Exploration
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
