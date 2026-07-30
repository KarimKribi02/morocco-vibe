"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Clock, Send, User, CheckCircle, 
  ShieldCheck, DollarSign, Headphones, ThumbsUp, Sparkles, 
  Tag, Award, MessageCircle, ExternalLink, ChevronRight, Edit3
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Custom SVG Social Icons
function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function GlobeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function ContactPage() {
  const { currentLocale } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const localTranslations = {
    en: {
      heroSub: "CONNECT WITH US",
      heroTitle1: "We're Here To",
      heroTitle2: "Plan Your Perfect Journey",
      heroDesc: "Have questions or need help planning your Morocco adventure? Our local experts are here to assist you every step of the way.",
      
      feat1: "Local Experts",
      feat1Sub: "100% Local",
      feat2: "Tailor Made",
      feat2Sub: "Just For You",
      feat3: "24/7 Support",
      feat3Sub: "We're Here",
      feat4: "Trusted",
      feat4Sub: "By Travelers",

      infoSub: "CONTACT INFORMATION",
      infoTitle1: "Let's Start Planning",
      infoTitle2: "Your Adventure",
      infoDesc: "Our travel specialists are ready to create a personalized itinerary that matches your dreams and preferences.",

      officeLabel: "MARRAKECH OFFICE",
      officeAddr: "12 Bd Mohamed VI, Hivernage",
      officeCity: "Marrakech 40000, Morocco",

      phoneLabel: "WHATSAPP / PHONE",
      phoneVal: "+212 634 33 20 00",
      phoneSub: "Available 24/7",

      emailLabel: "EMAIL ADDRESS",
      emailVal: "support@moroccovibetours.com",
      emailSub: "We reply within 24 hours",

      hoursLabel: "OFFICE HOURS",
      hoursVal: "Monday - Saturday: 9AM - 7PM",
      hoursClosed: "Sunday: Closed",

      formSub: "SEND US A MESSAGE",
      formTitle: "Tell Us About Your Trip",
      formDesc: "Fill out the form below and we'll get back to you with a personalized proposal.",

      nameLabel: "FULL NAME *",
      namePlace: "Your full name",
      emailFieldLabel: "EMAIL ADDRESS *",
      emailPlace: "Your email address",
      subjectLabel: "TRAVEL INTEREST / SUBJECT *",
      subjectPlace: "e.g. Custom tour, Desert trip, Group travel...",
      msgLabel: "YOUR MESSAGE *",
      msgPlace: "Tell us about your travel plans, preferred dates, budget, group size, destinations you want to visit...",
      sendBtn: "SEND MESSAGE",
      safeNote: "Your information is safe with us. We respect your privacy.",

      mapTitle: "Find Us Here",
      mapDesc: "Visit our office in the heart of Marrakech. We'd love to welcome you!",
      openMaps: "OPEN IN MAPS",

      card1Title: "TAILOR MADE TOURS",
      card1Desc: "Custom itineraries according to your preferences",
      card2Title: "BEST PRICE GUARANTEE",
      card2Desc: "We offer the best prices without hidden fees",
      card3Title: "24/7 CUSTOMER SUPPORT",
      card3Desc: "Our team is available anytime you need us",
      card4Title: "TRUSTED BY TRAVELERS",
      card4Desc: "Hundreds of happy travelers from around the world"
    },
    fr: {
      heroSub: "CONTACTEZ-NOUS",
      heroTitle1: "Nous Sommes Là Pour",
      heroTitle2: "Créer Votre Voyage Parfait",
      heroDesc: "Des questions ou besoin d'aide pour planifier votre aventure au Maroc? Nos experts locaux sont là pour vous accompagner.",
      
      feat1: "Experts Locaux",
      feat1Sub: "100% Local",
      feat2: "Sur Mesure",
      feat2Sub: "Pour Vous",
      feat3: "Support 24/7",
      feat3Sub: "Disponible",
      feat4: "De Confiance",
      feat4Sub: "Par les Voyageurs",

      infoSub: "INFORMATIONS DE CONTACT",
      infoTitle1: "Commençons À Planifier",
      infoTitle2: "Votre Aventure",
      infoDesc: "Nos spécialistes du voyage sont prêts à concevoir un itinéraire personnalisé adapté à vos envies.",

      officeLabel: "BUREAU MARRAKECH",
      officeAddr: "12 Bd Mohamed VI, Hivernage",
      officeCity: "Marrakech 40000, Maroc",

      phoneLabel: "WHATSAPP / TÉLÉPHONE",
      phoneVal: "+212 634 33 20 00",
      phoneSub: "Disponible 24/7",

      emailLabel: "ADRESSE EMAIL",
      emailVal: "support@moroccovibetours.com",
      emailSub: "Réponse sous 24 heures",

      hoursLabel: "HEURES D'OUVERTURE",
      hoursVal: "Lundi - Samedi: 9h - 19h",
      hoursClosed: "Dimanche: Fermé",

      formSub: "ENVOYEZ-NOUS UN MESSAGE",
      formTitle: "Parlez-nous De Votre Voyage",
      formDesc: "Remplissez le formulaire ci-dessous et nous vous répondrons avec une proposition sur mesure.",

      nameLabel: "NOM COMPLET *",
      namePlace: "Votre nom complet",
      emailFieldLabel: "ADRESSE EMAIL *",
      emailPlace: "Votre adresse email",
      subjectLabel: "SUJET / VOYAGE *",
      subjectPlace: "ex: Circuit privé, Désert, Voyage de groupe...",
      msgLabel: "VOTRE MESSAGE *",
      msgPlace: "Partagez vos dates, votre budget, la taille de votre groupe et vos envies de destinations...",
      sendBtn: "ENVOYER LE MESSAGE",
      safeNote: "Vos informations sont en sécurité. Nous respectons votre vie privée.",

      mapTitle: "Où Nous Trouver",
      mapDesc: "Visitez notre bureau au cœur de Marrakech. Nous serons ravis de vous accueillir!",
      openMaps: "OUVRIR DANS MAPS",

      card1Title: "CIRCUITS SUR MESURE",
      card1Desc: "Itinéraires personnalisés selon vos préférences",
      card2Title: "MEILLEUR PRIX GARANTI",
      card2Desc: "Nous offrons les meilleurs tarifs sans frais cachés",
      card3Title: "SUPPORT CLIENT 24/7",
      card3Desc: "Notre équipe est disponible à tout moment",
      card4Title: "CONFIANCE DES VOYAGEURS",
      card4Desc: "Des centaines de voyageurs satisfaits dans le monde"
    }
  };

  const t = localTranslations[currentLocale] || localTranslations['en'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // WhatsApp message payload
    const textPayload = `Hello Morocco Vibe! New Inquiry:
Full Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/212634332000?text=${encodedMessage}`;

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
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-gray-800 overflow-x-hidden selection:bg-amber-500 selection:text-white">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative min-h-[500px] md:min-h-[580px] w-full flex flex-col justify-between bg-gray-950 pt-28 md:pt-36 pb-0 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/ChatGPT Image Jul 30, 2026, 10_34_27 PM.png"
            alt="Moroccan Kasbah Sunset"
            className="w-full h-full object-cover object-top brightness-[0.9] contrast-[1.05]"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 w-full my-auto text-left text-white pt-8">
          <div className="max-w-2xl space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#E06D29] block"
            >
              {t.heroSub}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white font-bold leading-[1.15]"
            >
              {t.heroTitle1}
              <br />
              <span className="font-serif italic text-amber-500">
                {t.heroTitle2}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 font-light max-w-xl leading-relaxed pt-1"
            >
              {t.heroDesc}
            </motion.p>

            {/* Feature Badges Horizontal Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-6 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium text-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{t.feat1}</p>
                  <p className="text-[10px] text-gray-400 font-light">{t.feat1Sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{t.feat2}</p>
                  <p className="text-[10px] text-gray-400 font-light">{t.feat2Sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{t.feat3}</p>
                  <p className="text-[10px] text-gray-400 font-light">{t.feat3Sub}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-[#E06D29]/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#E06D29] shrink-0 shadow-sm">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white">{t.feat4}</p>
                  <p className="text-[10px] text-gray-400 font-light">{t.feat4Sub}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Deckled Torn Paper Edge Divider */}
        <div className="relative w-full overflow-hidden leading-none z-10 mt-12">
          <svg className="relative block w-full h-10 md:h-14 text-[#FAF8F5]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 L0,45 Q15,42 30,48 Q45,54 60,40 Q75,26 90,38 Q105,50 120,44 Q135,38 150,49 Q165,60 180,45 Q195,30 210,42 Q225,54 240,40 Q255,26 270,38 Q285,50 300,43 Q315,36 330,48 Q345,60 360,44 Q375,28 390,41 Q405,54 420,46 Q435,38 450,51 Q465,64 480,47 Q495,30 510,42 Q525,54 540,39 Q555,24 570,37 Q585,50 600,45 Q615,40 630,52 Q645,64 660,46 Q675,28 690,40 Q705,52 720,44 Q735,36 750,49 Q765,62 780,45 Q795,28 810,41 Q825,54 840,43 Q855,32 870,47 Q885,62 900,48 Q915,34 930,44 Q945,54 960,42 Q975,30 990,46 Q1035,36 1050,47 Q1065,58 1080,43 Q1095,28 1110,40 Q1125,52 1140,44 Q1155,36 1170,48 Q1185,60 1200,42 L1200,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* 2. MAIN HUB SECTION (2 COLUMNS) */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Contact Information Card (5/12) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-sm border border-gray-100/90 space-y-6 text-left"
          >
            <div>
              <span className="text-[#E06D29] text-[11px] font-extrabold tracking-[0.2em] uppercase block mb-2">
                {t.infoSub}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {t.infoTitle1}
                <br />
                <span className="font-serif italic text-[#E06D29]">
                  {t.infoTitle2}
                </span>
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed mt-3">
                {t.infoDesc}
              </p>
            </div>

            {/* Information Detail Cards */}
            <div className="space-y-4 pt-2">
              {/* Office Location */}
              <div className="flex items-start gap-4 p-3.5 hover:bg-amber-50/40 rounded-2xl transition duration-300">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">{t.officeLabel}</h4>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">{t.officeAddr}</p>
                  <p className="text-xs text-gray-500 font-light">{t.officeCity}</p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <a 
                href="https://wa.me/212634332000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-3.5 hover:bg-amber-50/40 rounded-2xl transition duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">{t.phoneLabel}</h4>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E06D29] transition-colors mt-0.5">{t.phoneVal}</p>
                  <p className="text-xs text-gray-500 font-light">{t.phoneSub}</p>
                </div>
              </a>

              {/* Email Address */}
              <a 
                href="mailto:support@moroccovibetours.com"
                className="flex items-start gap-4 p-3.5 hover:bg-amber-50/40 rounded-2xl transition duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#E06D29] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">{t.emailLabel}</h4>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#E06D29] transition-colors mt-0.5">{t.emailVal}</p>
                  <p className="text-xs text-gray-500 font-light">{t.emailSub}</p>
                </div>
              </a>

              {/* Office Hours */}
              <div className="flex items-start gap-4 p-3.5 hover:bg-amber-50/40 rounded-2xl transition duration-300">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#E06D29] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold">{t.hoursLabel}</h4>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">{t.hoursVal}</p>
                  <p className="text-xs text-gray-500 font-light">{t.hoursClosed}</p>
                </div>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-2.5">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full bg-amber-50 hover:bg-[#E06D29] text-[#E06D29] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Website"
              >
                <GlobeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Send Us a Message Form Card (7/12) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100/90 relative"
          >
            {/* Doodled Paper Airplane Graphic Top Right */}
            <div className="absolute top-8 right-8 w-16 h-12 text-[#E06D29]/40 hidden sm:block pointer-events-none select-none">
              <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
                <path d="M10,50 Q40,10 80,20" />
                <path d="M80,20 L70,12 M80,20 L75,32" strokeDasharray="none" strokeWidth="2.5" />
              </svg>
            </div>

            <div className="mb-6 text-left">
              <span className="text-[#E06D29] text-[11px] font-extrabold tracking-[0.2em] uppercase block mb-1">
                {t.formSub}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                {t.formTitle}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm font-light mt-1">
                {t.formDesc}
              </p>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-serif text-lg font-bold text-gray-900 mb-1">Message Prepared</h4>
                <p className="text-xs text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
                  Thank you! Your message details have been compiled and opened in WhatsApp.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1.5">
                      {t.nameLabel}
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                      <input 
                        type="text" 
                        required 
                        placeholder={t.namePlace} 
                        className="w-full border border-gray-200 focus:border-[#E06D29] focus:ring-1 focus:ring-[#E06D29] outline-none bg-gray-50/50 pl-10 pr-4 py-3 transition duration-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1.5">
                      {t.emailFieldLabel}
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                      <input 
                        type="email" 
                        required 
                        placeholder={t.emailPlace} 
                        className="w-full border border-gray-200 focus:border-[#E06D29] focus:ring-1 focus:ring-[#E06D29] outline-none bg-gray-50/50 pl-10 pr-4 py-3 transition duration-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Travel Interest / Subject */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1.5">
                    {t.subjectLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                    <input 
                      type="text" 
                      required
                      placeholder={t.subjectPlace} 
                      className="w-full border border-gray-200 focus:border-[#E06D29] focus:ring-1 focus:ring-[#E06D29] outline-none bg-gray-50/50 pl-10 pr-4 py-3 transition duration-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-extrabold mb-1.5">
                    {t.msgLabel}
                  </label>
                  <div className="relative flex">
                    <Edit3 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea 
                      rows="4" 
                      required 
                      placeholder={t.msgPlace} 
                      className="w-full border border-gray-200 focus:border-[#E06D29] focus:ring-1 focus:ring-[#E06D29] outline-none bg-gray-50/50 pl-10 pr-4 py-3 transition duration-300 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#F95738] via-[#EE4266] to-[#E03A5E] hover:from-[#e04526] hover:to-[#c82e50] text-white py-4 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{t.sendBtn}</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center font-light mt-3">
                  🔒 {t.safeNote}
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* 3. INTERACTIVE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[280px] sm:h-[320px] rounded-3xl overflow-hidden shadow-sm border border-gray-100"
        >
          {/* Embedded Google Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54350.2195043684!2d-8.046879899999999!3d31.6294723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d9611d6f5%3A0x2ca847e8031ab643!2sMarrakech%2040000%2C%20Morocco!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating White Information Card Overlay */}
          <div className="absolute top-6 left-6 max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-gray-100 text-left z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                <MapPin className="w-4 h-4 stroke-[2]" />
              </div>
              <h4 className="font-serif font-bold text-gray-900 text-base">{t.mapTitle}</h4>
            </div>
            
            <p className="text-xs text-gray-500 font-light leading-relaxed mb-3">
              {t.mapDesc}
            </p>

            <a 
              href="https://maps.google.com/?q=Marrakech,Morocco" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase text-[#E06D29] hover:text-orange-700 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-full transition-colors"
            >
              <span>{t.openMaps}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 4. BOTTOM FEATURES BAR (4 CARDS) */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100/90 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* Feature 1 */}
            <div className="flex items-start gap-4 p-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                <Tag className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">{t.card1Title}</h4>
                <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">{t.card1Desc}</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4 p-3 pt-6 sm:pt-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">{t.card2Title}</h4>
                <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">{t.card2Desc}</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4 p-3 pt-6 sm:pt-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                <Headphones className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">{t.card3Title}</h4>
                <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">{t.card3Desc}</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4 p-3 pt-6 sm:pt-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#E06D29] shrink-0">
                <ThumbsUp className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">{t.card4Title}</h4>
                <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">{t.card4Desc}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
