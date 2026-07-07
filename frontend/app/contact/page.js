"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Construct structured WhatsApp message payload
    const textPayload = `Hello! New Luxury Inquiry from Website:
Name: ${formData.name}
Email: ${formData.email}
Travel Interest/Subject: ${formData.subject}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/212702811835?text=${encodedMessage}`;

    // Attempt to open in a new tab; fallback to current window location if blocked
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    setLoading(false);
    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="bg-[#FCFBF8] min-h-screen text-slate-800 pb-24 relative selection:bg-orange-100 selection:text-orange-800 pt-20">
      {/* Import elegant cursive font */}
      <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />

      {/* 1. HERO HEADER */}
      <section className="relative h-[40vh] md:h-[45vh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/contact-hero.jpg" 
            alt="Marrakech Luxury Interior"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2070";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-[#FCFBF8]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.35em] text-orange-500 uppercase block mb-3"
          >
            CONNECT WITH OUR CONCIERGE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontFamily: "'Italianno', cursive" }}
            className="text-7xl md:text-9xl text-white tracking-wide mb-2 lowercase font-light leading-none"
          >
            get in touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-200 text-xs md:text-sm font-light max-w-lg mx-auto leading-relaxed"
          >
            Reach out to our private travel concierges to design your custom luxury itinerary in Morocco.
          </motion.p>
        </div>
      </section>

      {/* 2. GRID HUB SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: CONNECTION DETAILS (5/12 span) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white border border-slate-100 p-8 shadow-sm rounded-3xl space-y-6">
              <div>
                <span className="text-orange-500 text-xs tracking-widest uppercase font-semibold mb-2 block">
                  CONTACT DETAILS
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-bold mb-4 leading-tight">
                  Start Your Journey <br />
                  <span className="italic text-orange-500 font-light">with us</span>
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                  Whether you have a specific itinerary in mind or need inspiration to get started, our Marrakech-based expert team is here to guide you.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                {/* Office Address */}
                <div className="flex items-start space-x-4 p-3 hover:bg-slate-50/50 rounded-xl transition duration-300">
                  <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Marrakech Office</h4>
                    <p className="text-sm font-bold text-slate-800">12 Bd Mohamed VI, Hivernage</p>
                    <p className="text-xs text-slate-500 font-light mt-0.5">Marrakech 40000, Morocco</p>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <a 
                  href="https://wa.me/212702811835" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-xl transition duration-300 group cursor-pointer"
                >
                  <div className="p-3 bg-green-50 text-green-500 rounded-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Direct Concierge Hotline</h4>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-orange-500 transition">+212 702 811 835</p>
                    <p className="text-xs text-slate-500 font-light mt-0.5">Available for WhatsApp calls & messaging</p>
                  </div>
                </a>

                {/* Email Address */}
                <div className="flex items-start space-x-4 p-3 hover:bg-slate-50/50 rounded-xl transition duration-300">
                  <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-0.5">Official Communication</h4>
                    <p className="text-sm font-bold text-slate-800">support@moroccovibetours.com</p>
                    <p className="text-xs text-slate-500 font-light mt-0.5">Proposal requests & group booking inquiries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded interactive map node mockup */}
            <div className="w-full h-64 rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54350.2195043684!2d-8.046879899999999!3d31.6294723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d9611d6f5%3A0x2ca847e8031ab643!2sMarrakech%2040000%2C%20Morocco!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: ELEGANT CONTACT FORM (7/12 span) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 bg-white border border-slate-100 p-8 md:p-12 shadow-sm rounded-3xl self-start"
          >
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
              <p className="text-xs md:text-sm text-slate-400 font-light">Tell our team about your travel desires and custom preferences.</p>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center bg-green-50/50 border border-green-100 rounded-2xl p-6"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">Inquiry Pre-filled</h4>
                <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed max-w-sm mx-auto">
                  Thank you. Your message details were compiled. If the WhatsApp redirection tab did not open, please verify your browser popup blockers.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Full Name *</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="text" 
                      required 
                      placeholder="Your name" 
                      className="border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-slate-50/50 p-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Email Address *</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01 }}
                      type="email" 
                      required 
                      placeholder="Your email address" 
                      className="border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-slate-50/50 p-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Travel Interest / Subject *</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" 
                    required
                    placeholder="e.g. Booking inquiry, custom trip planning" 
                    className="border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-slate-50/50 p-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1.5">Your Message *</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    rows="5" 
                    required 
                    placeholder="Provide details about your preferred travel dates, budget, group size, or destinations you want to visit..." 
                    className="border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-slate-50/50 p-3.5 transition-all duration-300 rounded-xl font-normal text-sm text-slate-800 placeholder-slate-400 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></motion.textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 rounded-xl cursor-pointer"
                >
                  {loading ? (
                    <span>Redirecting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
