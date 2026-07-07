"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CreditCard, MessageSquare, Award } from "lucide-react";

// Sub-component for dynamic description card with Framer Motion entry
const StepTextCard = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center max-w-md text-center px-4"
    >
      <h4 className="text-[#E07A5F] text-xs font-bold tracking-[0.25em] uppercase mb-2">
        {title}
      </h4>
      <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
};

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      title: "Explore",
      desc: "Browse and filter our live curated tours based on destination, budget, or preferred duration.",
      angle: -45
    },
    {
      id: "02",
      title: "Book",
      desc: "Select your journey parameters and compile your inquiry details securely inside our dynamic form interface.",
      angle: -15
    },
    {
      id: "03",
      title: "Concierge",
      desc: "Your automated payload directly hooks into our instant WhatsApp booking concierge for high-intent customization.",
      angle: 15
    },
    {
      id: "04",
      title: "Experience",
      desc: "Finalize your custom itinerary details and embark on an elite, private Moroccan travel expedition.",
      angle: 45
    }
  ];

  // Top converging source icons
  const topSources = [
    { label: "Web Search", icon: Search, x: 50 },
    { label: "Checkout Form", icon: CreditCard, x: 183 },
    { label: "WhatsApp API", icon: MessageSquare, x: 316 },
    { label: "Expedition", icon: Award, x: 450 }
  ];

  // Core auto-advance logic with seamless cleanup and manual-click restart
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [activeStep]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  // Rotation formula: rotate parent container to bring the active node to the absolute 12 o'clock position (0 degrees)
  const parentRotation = -steps[activeStep].angle;

  // Polar layout configurations for wheel badges
  // Wheel size: 600px -> radius 280px to position nodes along the outer rim
  const R = 280;
  const wheelCenterX = 300;
  const wheelCenterY = 300;

  return (
    <section className="bg-[#FDFBF7] text-[#0F172A] py-24 relative overflow-hidden border-b border-slate-100 select-none">
      
      {/* Decorative luxury mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,122,95,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center relative z-10">
        
        {/* Section Heading */}
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#E07A5F] uppercase block mb-2">
          Expedition Architecture
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-extrabold tracking-wider uppercase mb-16 text-[#0F172A]">
          How It Works
        </h2>

        {/* 1. TOP SECTION: CONVERGING SVG BRANCHING THREADS */}
        <div className="relative w-[500px] h-[140px] mb-8">
          {/* Top Sources Row */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-2 z-20">
            {topSources.map((src, idx) => {
              const Icon = src.icon;
              const isActive = idx === activeStep;
              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center cursor-pointer transition-all duration-300 w-20"
                >
                  <span className={`text-[8px] md:text-[9px] font-bold tracking-widest uppercase mb-2 ${
                    isActive ? "text-[#E07A5F]" : "text-slate-400"
                  }`}>
                    {src.label}
                  </span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-rose-500 border-transparent text-white shadow-lg shadow-orange-500/25 scale-110"
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SVG Canvas Overlay */}
          <svg viewBox="0 0 500 140" className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="neonFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#E07A5F" />
              </linearGradient>
            </defs>

            {/* Static background paths (gray) */}
            {topSources.map((src, idx) => (
              <path
                key={`bg-path-${idx}`}
                d={`M ${src.x},50 C ${src.x},100 250,90 250,130`}
                stroke="#E2E8F0"
                strokeWidth="1.5"
                fill="none"
              />
            ))}

            {/* Dynamic animated neon flow path for the active step */}
            <motion.path
              key={`active-flow-${activeStep}`}
              d={`M ${topSources[activeStep].x},50 C ${topSources[activeStep].x},100 250,90 250,130`}
              stroke="url(#neonFlowGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="250"
              initial={{ strokeDashoffset: 250 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Convergence Node Ring */}
            <motion.circle
              cx="250"
              cy="130"
              r="4"
              fill="#E07A5F"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* 2. MIDDLE SECTION: TEXT MODULE DISPLAY */}
        <div className="h-[90px] mb-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <StepTextCard
              key={activeStep}
              title={steps[activeStep].title}
              desc={steps[activeStep].desc}
            />
          </AnimatePresence>
        </div>

        {/* 3. BOTTOM SECTION: THE GEOMETRIC ROTATING POLAR WHEEL */}
        <div className="relative w-[600px] h-[220px] overflow-hidden flex justify-center">
          {/* Main wheel container - Absolute positioning is used for all child layers to avoid flex stacking bugs */}
          <motion.div
            animate={{ rotate: parentRotation }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
            className="w-[600px] h-[600px] rounded-full border border-slate-200/60 absolute top-0 bg-white"
            style={{ transformOrigin: "center center" }}
          >
            {/* Concentric inner rings */}
            <div className="absolute inset-[10px] rounded-full border border-dashed border-slate-200/40 pointer-events-none" />
            <div className="absolute inset-[40px] rounded-full border border-slate-200 bg-[#FDFBF7]/40 shadow-inner overflow-hidden pointer-events-none">
              {/* Radial gradient decoration inside the wheel */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,122,95,0.03),transparent_70%)]" />
            </div>

            {/* Mathematically positioned step nodes */}
            {steps.map((step, idx) => {
              // Convert polar angle to Cartesian coordinates
              const angleRad = (step.angle * Math.PI) / 180;
              const x = wheelCenterX + R * Math.sin(angleRad);
              const y = wheelCenterY - R * Math.cos(angleRad);
              const isActive = idx === activeStep;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className="absolute cursor-pointer z-30"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <motion.div
                    animate={{ rotate: -parentRotation }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 select-none ${
                      isActive
                        ? "bg-[#E07A5F] text-white border-2 border-[#E07A5F] scale-110 shadow-lg shadow-orange-500/25"
                        : "bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600"
                    }`}
                  >
                    {step.id}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Top indicator triangular pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#E07A5F] z-20" />
        </div>

      </div>
    </section>
  );
}
