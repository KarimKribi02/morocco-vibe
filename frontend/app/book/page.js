"use client";

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft, Calendar, User, Mail, Compass, Users, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTour = searchParams.get('tour') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: selectedTour || 'Marrakech',
    departureDate: '',
    returnDate: '',
    guests: 2
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct structured WhatsApp message payload
    const textPayload = `Hello! New Booking Inquiry from Website:
Name: ${formData.name}
Email: ${formData.email}
Destination: ${formData.destination}
Travel Dates: From ${formData.departureDate || 'Not specified'} to ${formData.returnDate || 'Not specified'}
Guests: ${formData.guests} Private Travelers
Private Transport: Included (Premium Mercedes V-Class)
Concierge Support: 24/7 Dedicated Concierge Active`;

    const encodedMessage = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/212702811835?text=${encodedMessage}`;

    // Attempt to open in a new tab; fallback to current window location if blocked
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    setLoading(false);
    setSuccess(true);
    setFormData({
      name: '',
      email: '',
      destination: 'Marrakech',
      departureDate: '',
      returnDate: '',
      guests: 2
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      
      {/* Back button */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-orange-500 transition duration-300">
          <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back to home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: The Interactive Booking Configurator Form (7/12 span) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-white border border-slate-100 p-6 md:p-10 shadow-sm rounded-3xl"
        >
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Configure Your Itinerary</h3>
            <p className="text-xs md:text-sm text-slate-400 font-light">Specify your private journey details to unlock exclusive luxury itineraries.</p>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center bg-green-50/50 border border-green-100 rounded-2xl p-6"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">Reservation Draft Sent</h4>
              <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed max-w-sm mx-auto">
                Thank you. Your custom expedition parameters were packaged successfully. If the WhatsApp redirect did not launch, check your browser's popup blocker settings.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name & Travel Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-300" />
                    <input 
                      type="text" 
                      required 
                      placeholder="John Doe" 
                      className="w-full border border-slate-200 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 outline-none bg-slate-50/50 pl-11 pr-4 py-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Travel Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-300" />
                    <input 
                      type="email" 
                      required 
                      placeholder="example@domain.com" 
                      className="w-full border border-slate-200 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 outline-none bg-slate-50/50 pl-11 pr-4 py-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Destination Selector */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Destination Expedition *</label>
                <div className="relative">
                  <Compass className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-300 pointer-events-none" />
                  <select 
                    value={formData.destination} 
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    className="w-full border border-slate-200 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 outline-none bg-slate-50/50 pl-11 pr-4 py-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-850 appearance-none cursor-pointer"
                  >
                    <option value="Marrakech">Marrakech Expedition</option>
                    <option value="Merzouga Desert">Merzouga Desert Safari</option>
                    <option value="Fes">Imperial Fes Tour</option>
                    <option value="Custom Itinerary">Custom Bespoke Itinerary</option>
                  </select>
                  <div className="absolute right-4 top-4.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-400 w-0 h-0" />
                </div>
              </div>

              {/* Travel Date Range Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Departure Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-300 pointer-events-none" />
                    <input 
                      type="date" 
                      required
                      className="w-full border border-slate-200 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 outline-none bg-slate-50/50 pl-11 pr-4 py-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Return Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-300 pointer-events-none" />
                    <input 
                      type="date" 
                      required
                      className="w-full border border-slate-200 focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/60 outline-none bg-slate-50/50 pl-11 pr-4 py-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Guest Count Counter Widget */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Private Travelers *</label>
                <div className="flex items-center space-x-6 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl w-max">
                  <div className="flex items-center space-x-2 text-slate-500">
                    <Users className="w-5 h-5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Guests:</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                      className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer select-none font-bold"
                    >
                      -
                    </button>
                    <span className="font-serif text-lg font-bold text-slate-800 min-w-[20px] text-center">{formData.guests}</span>
                    <button 
                      type="button" 
                      onClick={() => setFormData(prev => ({ ...prev, guests: prev.guests + 1 }))}
                      className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-colors shadow-sm cursor-pointer select-none font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </form>
          )}
        </motion.div>

        {/* RIGHT COLUMN: Live Dynamic Summary Sticky Card (5/12 span) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
        >
          <div className="bg-slate-900 text-white p-8 shadow-sm rounded-3xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="border-b border-white/10 pb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase block mb-1">
                SUMMARY ESTIMATION
              </span>
              <h4 className="font-serif text-xl font-bold tracking-wide">Your Travel Blueprint</h4>
            </div>

            <div className="space-y-4">
              {/* Selected Itinerary */}
              <div className="flex justify-between items-start text-xs md:text-sm">
                <span className="text-slate-400">Selected Itinerary:</span>
                <span className="font-bold text-white text-right">{formData.destination}</span>
              </div>

              {/* Private Travelers */}
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-slate-400">Private Travelers:</span>
                <span className="font-bold text-white">{formData.guests} Guest(s)</span>
              </div>

              {/* Dates */}
              <div className="flex justify-between items-start text-xs md:text-sm">
                <span className="text-slate-400">Travel Window:</span>
                <span className="font-bold text-white text-right">
                  {formData.departureDate ? formData.departureDate : "Select Departure"} <br className="md:hidden" />
                  <span className="mx-1 text-orange-400">→</span> <br className="md:hidden" />
                  {formData.returnDate ? formData.returnDate : "Select Return"}
                </span>
              </div>

              {/* Transport */}
              <div className="flex justify-between items-start text-xs md:text-sm border-t border-white/5 pt-4">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>Private Transport:</span>
                </div>
                <span className="font-bold text-green-400 text-right">Included</span>
              </div>

              {/* Concierge */}
              <div className="flex justify-between items-start text-xs md:text-sm">
                <div className="flex items-center space-x-1.5 text-slate-400">
                  <HeartHandshake className="w-4 h-4 text-orange-400" />
                  <span>Concierge Support:</span>
                </div>
                <span className="font-bold text-green-400 text-right">Active (24/7)</span>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 rounded-xl cursor-pointer"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm & Secure Reservation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Luxury reassurance badge */}
          <div className="bg-[#FAF8F5] border border-slate-100 p-5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-0.5">Secure Reservation Inquiry</h5>
              <p className="text-[11px] text-slate-400 leading-normal">Your payment and credit details are never requested during checkout. Redirection connects you securely to our support line.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12 pb-24 font-sans text-slate-800 pt-28">
      {/* 1. HERO HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.35em] text-orange-500 uppercase block mb-3">
          CHOOSE YOUR EXPEDITION
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Book Your Private Moroccan Journey
        </h1>
      </div>

      <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading form parameters...</div>}>
        <BookingFormContent />
      </Suspense>
    </div>
  );
}