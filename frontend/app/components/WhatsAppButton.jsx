"use client";

import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Concentric Sonar Ripple Waves */}
      <span className="absolute w-14 h-14 bg-[#25D366]/20 rounded-full animate-ping pointer-events-none"></span>
      <span className="absolute w-12 h-12 bg-[#25D366]/30 rounded-full animate-ping pointer-events-none [animation-delay:0.3s]"></span>

      {/* Primary Floating Trigger */}
      <a 
        href="https://wa.me/212702811835?text=Hi!%20I%20am%20browsing%20your%20premium%20Morocco%20travel%20platform%20and%20would%20love%20to%20get%20more%20details%20on%20your%20luxury%20tours." 
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] hover:bg-[#20ba59] text-white w-12 h-12 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  );
}