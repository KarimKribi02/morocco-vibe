"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const localTranslations = {
  en: {
    badge: "COMMON QUESTIONS",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our luxury Morocco expeditions and private services.",
    contactHelp: "Have more questions?",
    whatsappCTA: "Chat with Concierge",
    faqs: [
      {
        id: 1,
        number: "01",
        question: "What makes your private luxury tours distinct from standard itineraries?",
        answer: "Each expedition is fully bespoke, featuring dedicated local guides, private VIP vehicles (Mercedes V-Class), hand-picked five-star riads, and exclusive access to private palaces and desert camps."
      },
      {
        id: 2,
        number: "02",
        question: "Can I customize the itinerary in real-time during my journey?",
        answer: "Absolutely. While we build a detailed framework, your dedicated local concierge and private chauffeur can adapt daily activities dynamically based on your interests, energy, and pace."
      },
      {
        id: 3,
        number: "03",
        question: "What luxury comforts are provided in your Sahara Desert camps?",
        answer: "Our private oasis encampments feature king-sized beds, en-suite bathrooms with hot running water, gourmet dining, electricity, heating/cooling systems, and private stargazing decks."
      },
      {
        id: 4,
        number: "04",
        question: "How are dietary requirements managed during rural travel?",
        answer: "Whether in the high Atlas Mountains or deep Sahara dunes, our private chefs and selected dining riads cater to all dietary needs (vegan, gluten-free, halal, etc.) using fresh organic ingredients."
      },
      {
        id: 5,
        number: "05",
        question: "What is the optimal booking window for peak luxury travel seasons?",
        answer: "To secure top boutique riads and premier guides during Spring (March-May) or Autumn (September-November), we recommend reserving 4 to 6 months in advance."
      },
      {
        id: 6,
        number: "06",
        question: "Are your guides fluent in specific European languages?",
        answer: "Yes, our selected guides are university graduates fluent in English, French, Spanish, German, and Arabic. We match you with guides based on your language preferences."
      }
    ]
  },
  fr: {
    badge: "QUESTIONS FRÉQUENTES",
    title: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir sur nos expéditions de luxe au Maroc.",
    contactHelp: "Des questions supplémentaires ?",
    whatsappCTA: "Discuter avec le Concierge",
    faqs: [
      {
        id: 1,
        number: "01",
        question: "Qu'est-ce qui distingue vos circuits de luxe privés des itinéraires standards ?",
        answer: "Chaque expédition est entièrement sur mesure, avec des guides experts, des véhicules de luxe privés, des riads cinq étoiles sélectionnés, et des accès exclusifs."
      },
      {
        id: 2,
        number: "02",
        question: "Puis-je modifier l'itinéraire en temps réel pendant mon voyage ?",
        answer: "Absolument. Votre concierge local dédié et votre chauffeur privé adaptent les activités quotidiennes en temps réel selon vos envies."
      },
      {
        id: 3,
        number: "03",
        question: "Quels conforts de luxe sont fournis dans vos camps du désert du Sahara ?",
        answer: "Nos campements privés disposent de lits king-size, de salles de bain attenantes avec eau chaude, d'une cuisine gastronomique et de climatisation."
      },
      {
        id: 4,
        number: "04",
        question: "Comment les exigences alimentaires sont-elles gérées dans le désert ?",
        answer: "Nos chefs privés s'adaptent à tous les régimes en proposant une gastronomie raffinée à base d'ingrédients locaux biologiques."
      },
      {
        id: 5,
        number: "05",
        question: "Quel est le meilleur moment pour réserver pour les saisons de pointe ?",
        answer: "Nous vous conseillons de réserver entre 4 et 6 mois à l'avance pour garantir les meilleurs riads pendant le printemps et l'automne."
      },
      {
        id: 6,
        number: "06",
        question: "Vos guides parlent-ils couramment le français ?",
        answer: "Oui, nos guides universitaires parlent parfaitement français, anglais et espagnol selon vos préférences."
      }
    ]
  },
  es: {
    badge: "PREGUNTAS FRECUENTES",
    title: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesita saber sobre nuestras expediciones privadas por Marruecos.",
    contactHelp: "¿Tiene alguna duda?",
    whatsappCTA: "Contactar por WhatsApp",
    faqs: [
      {
        id: 1,
        number: "01",
        question: "¿Qué diferencia sus viajes de lujo privados de los itinerarios estándar?",
        answer: "Cada expedición es completamente a medida, con guías dedicados, transporte privado de lujo, riads de cinco estrellas y acceso exclusivo."
      },
      {
        id: 2,
        number: "02",
        question: "¿Puedo personalizar el itinerario en tiempo real durante el viaje?",
        answer: "Por supuesto. Su conserje local y conductor adaptan las actividades diarias sobre la marcha según sus preferencias."
      },
      {
        id: 3,
        number: "03",
        question: "¿Qué comodidades de lujo se ofrecen en los campamentos del Sahara?",
        answer: "Nuestros campamentos privados cuentan con camas king-size, baños privados con agua caliente, cenas gourmet y climatización."
      },
      {
        id: 4,
        number: "04",
        question: "¿Cómo se gestionan las restricciones alimentarias en el viaje?",
        answer: "Nuestros chefs privados adaptan sus menús a cualquier restricción servida con alimentos frescos orgánicos."
      },
      {
        id: 5,
        number: "05",
        question: "¿Con cuánta antelación se debe reservar para la temporada alta?",
        answer: "Sugerimos reservar con 4 a 6 meses de antelación para asegurar los riads más exclusivos."
      },
      {
        id: 6,
        number: "06",
        question: "¿Disponen de guías que dominen el español?",
        answer: "Sí, nuestros guías tienen formación universitaria y dominan el español, inglés y francés."
      }
    ]
  }
};

export default function FaqAccordion({ className = '' }) {
  const { currentLocale } = useLanguage();
  const lang = localTranslations[currentLocale] || localTranslations['en'];
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const leftColFaqs = lang.faqs.filter((_, idx) => idx % 2 === 0);
  const rightColFaqs = lang.faqs.filter((_, idx) => idx % 2 !== 0);

  return (
    <section 
      id="faq-accordion-section"
      className={`w-full bg-[#FAF8F5] py-16 md:py-24 px-4 sm:px-8 lg:px-12 border-b border-gray-100/80 relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#E86D5A] text-[11px] font-extrabold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            {lang.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B132B] tracking-tight">
            {lang.title}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            {lang.subtitle}
          </p>
        </div>

        {/* Two-Column Modern FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Left Column */}
          <div className="space-y-4">
            {leftColFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-[#E86D5A]/40 shadow-md ring-2 ring-[#E86D5A]/10' 
                      : 'border-gray-150/80 shadow-sm hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 flex items-start justify-between text-left focus:outline-none cursor-pointer gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md transition-colors mt-0.5 ${
                        isOpen ? 'bg-[#E86D5A] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {faq.number}
                      </span>
                      <h3 className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${
                        isOpen ? 'text-[#E86D5A]' : 'text-[#0B132B]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[#E86D5A] text-white rotate-180' : 'bg-amber-500/10 text-[#E86D5A]'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-4 ml-10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-[#E86D5A]/40 shadow-md ring-2 ring-[#E86D5A]/10' 
                      : 'border-gray-150/80 shadow-sm hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 flex items-start justify-between text-left focus:outline-none cursor-pointer gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md transition-colors mt-0.5 ${
                        isOpen ? 'bg-[#E86D5A] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {faq.number}
                      </span>
                      <h3 className={`font-serif text-base sm:text-lg font-bold leading-snug transition-colors ${
                        isOpen ? 'text-[#E86D5A]' : 'text-[#0B132B]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[#E86D5A] text-white rotate-180' : 'bg-amber-500/10 text-[#E86D5A]'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-4 ml-10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="text-center pt-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-gray-150 shadow-sm">
            <span className="text-xs font-medium text-gray-600">
              {lang.contactHelp}
            </span>
            <a
              href="https://wa.me/212634332000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4 py-2 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{lang.whatsappCTA}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
