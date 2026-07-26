"use client";

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    rating: 5,
    quote: "Our private tour across Morocco was absolutely incredible. Every detail was perfectly planned. Highly recommended!",
    author: "Emma Johnson",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    rating: 5,
    quote: "The Sahara experience was the highlight of our trip! Luxury camp, amazing food and the best guides.",
    author: "Marco Rossi",
    country: "Italy",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    rating: 5,
    quote: "From the imperial cities to Chefchaouen, every moment was magical. We will definitely come back.",
    author: "Sophie Martin",
    country: "France",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    rating: 5,
    quote: "An extraordinary journey through Marrakech and the Atlas Mountains. VIP private transport and world-class riads.",
    author: "David Miller",
    country: "United States",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

export default function GuestReviews({ className = '' }) {
  const [startIndex, setStartIndex] = useState(0);

  const nextReviews = () => {
    setStartIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReviews = () => {
    setStartIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // Get 3 visible reviews dynamically
  const visibleReviews = [
    reviewsData[startIndex % reviewsData.length],
    reviewsData[(startIndex + 1) % reviewsData.length],
    reviewsData[(startIndex + 2) % reviewsData.length]
  ];

  return (
    <section className={`w-full bg-[#FAF8F5] py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-gray-100/80 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
        
        {/* 1. LEFT COLUMN: Header */}
        <div className="w-full lg:w-1/4 text-center lg:text-left shrink-0">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E86D5A] mb-2 block">
            TRAVELER STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight leading-tight mb-3">
            What Our <br className="hidden lg:inline" />
            Travelers Say
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Real experiences from our happy travelers.
          </p>
        </div>

        {/* 2. CENTER COLUMN: 3 Cards Slider flanked by Arrow Controls */}
        <div className="w-full lg:w-3/5 relative flex flex-col items-center">
          
          <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
            
            {/* Left Arrow Button */}
            <button
              onClick={prevReviews}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-150 text-gray-700 hover:text-[#E86D5A] hover:shadow-lg flex items-center justify-center transition cursor-pointer shrink-0 z-10"
              aria-label="Previous Reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 3 Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              {visibleReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3 text-left">
                    {/* 5 Orange Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E86D5A] text-[#E86D5A]" />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-4">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author Avatar & Info */}
                  <div className="flex items-center space-x-3 pt-2 border-t border-gray-50">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                    <div className="text-left leading-tight">
                      <h4 className="font-bold text-xs text-gray-900">
                        {review.author}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-light mt-0.5">
                        {review.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={nextReviews}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-gray-150 text-gray-700 hover:text-[#E86D5A] hover:shadow-lg flex items-center justify-center transition cursor-pointer shrink-0 z-10"
              aria-label="Next Reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {reviewsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === startIndex % reviewsData.length 
                    ? 'w-6 bg-[#E86D5A]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* 3. RIGHT COLUMN: Google & Tripadvisor Rating Badges */}
        <div className="w-full lg:w-1/6 flex flex-row lg:flex-col items-center justify-center lg:items-start gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-200/60 lg:pl-6 shrink-0">
          
          {/* Google Ratings */}
          <div className="text-center lg:text-left space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-0.5 font-bold text-base leading-none">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-1 text-xs font-bold text-gray-900">
              <span>4.9</span>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#E86D5A] text-[#E86D5A]" />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-light">Based on 1,200+ reviews</p>
          </div>

          {/* Tripadvisor Ratings */}
          <div className="text-center lg:text-left space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 font-bold text-xs text-emerald-800 leading-none">
              <div className="w-4 h-4 rounded-full bg-[#00AA6C] flex items-center justify-center text-white text-[8px] font-extrabold">
                oo
              </div>
              <span className="font-extrabold text-gray-900 tracking-tight text-xs sm:text-sm">Tripadvisor</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-1 text-xs font-bold text-gray-900">
              <span>5.0</span>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#E86D5A] text-[#E86D5A]" />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-light">Based on 800+ reviews</p>
          </div>

        </div>

      </div>
    </section>
  );
}
