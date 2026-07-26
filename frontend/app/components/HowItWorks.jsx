"use client";

import { useState } from 'react';
import { Compass, Sliders, MessageCircle, ShieldCheck, Plane, Heart } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Choose Tour",
    subtitle: "Explore & Select",
    desc: "Pick your favorite tour or experience from our curated luxury catalog.",
    icon: Compass
  },
  {
    number: "02",
    title: "Customize",
    subtitle: "Bespoke Details",
    desc: "Personalize dates, luxury riads and private activities for your group.",
    icon: Sliders
  },
  {
    number: "03",
    title: "Chat on WhatsApp",
    subtitle: "Instant Expert Concierge",
    desc: "Discuss details directly with our local travel experts on WhatsApp.",
    icon: MessageCircle
  },
  {
    number: "04",
    title: "Secure Payment",
    subtitle: "Guaranteed Booking",
    desc: "Safe & seamless booking process with flexible terms.",
    icon: ShieldCheck
  },
  {
    number: "05",
    title: "Arrival in Morocco",
    subtitle: "VIP Welcome",
    desc: "Private airport transfer & 24/7 dedicated host throughout your trip.",
    icon: Plane
  },
  {
    number: "06",
    title: "Enjoy Your Trip",
    subtitle: "Unforgettable Memories",
    desc: "Experience authentic luxury, desert sands and rich imperial heritage.",
    icon: Heart
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full bg-gradient-to-b from-[#FDFBF7] via-[#FAF7F2] to-[#FDFBF7] py-16 md:py-24 px-4 sm:px-8 lg:px-12 border-b border-amber-500/10 relative overflow-hidden">
      
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-12 relative z-10">
        
        {/* Left Header Block */}
        <div className="w-full lg:w-1/4 text-center lg:text-left shrink-0 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#E86D5A] text-[11px] font-extrabold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E86D5A] animate-pulse" />
            HOW IT WORKS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B132B] tracking-tight leading-tight">
            Your Journey in <br className="hidden lg:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-[#E86D5A] to-rose-600">
              6 Simple Steps
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-xs mx-auto lg:mx-0">
            From initial inspiration to your desert sunrise, we handle every detail with VIP care.
          </p>
        </div>

        {/* Right Horizontal Process Flow Block */}
        <div className="w-full lg:w-3/4 relative overflow-x-auto scroll-bar-none pb-6 lg:pb-0">
          <div className="flex items-start justify-between min-w-[820px] lg:min-w-0 relative px-2">
            
            {/* Connecting Animated Dashed Line */}
            <div className="absolute top-[32px] left-[50px] right-[50px] h-[2px] border-t-2 border-dashed border-[#E86D5A]/30 z-0" />

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;

              return (
                <div 
                  key={step.number} 
                  onMouseEnter={() => setActiveStep(index)}
                  className="flex flex-col items-center text-center relative z-10 w-32 sm:w-36 px-1 group cursor-pointer"
                >
                  {/* Step Number Tag Pill */}
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm scale-110' 
                      : 'bg-white text-gray-400 border border-gray-200 group-hover:text-[#E86D5A] group-hover:border-[#E86D5A]/30'
                  }`}>
                    {step.number}
                  </span>

                  {/* Circular Soft Amber Icon Container */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-500 flex items-center justify-center relative shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 ${
                    isActive 
                      ? 'bg-gradient-to-br from-orange-500 via-[#E86D5A] to-rose-500 text-white ring-4 ring-orange-500/20 scale-105' 
                      : 'bg-white border border-gray-150 text-[#E86D5A] group-hover:border-[#E86D5A] group-hover:bg-amber-500/10'
                  }`}>
                    <IconComponent className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'stroke-[2]' : 'stroke-[1.75]'
                    }`} />
                  </div>

                  {/* Step Info */}
                  <div className="w-full space-y-1 mt-3">
                    <h4 className={`font-serif font-bold text-xs sm:text-sm leading-tight transition-colors duration-300 ${
                      isActive ? 'text-orange-600' : 'text-gray-900 group-hover:text-[#E86D5A]'
                    }`}>
                      {step.title}
                    </h4>

                    <p className="text-[11px] text-gray-500 font-light leading-snug text-center line-clamp-2">
                      {step.desc}
                    </p>
                  </div>

                  {/* Connecting Diamond Node */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[30px] -right-[12px] z-20">
                      <div className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 ${
                        isActive || activeStep > index ? 'bg-orange-500 scale-125 shadow-sm' : 'bg-gray-300'
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
