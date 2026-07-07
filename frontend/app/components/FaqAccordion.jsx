"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const localTranslations = {
  en: {
    badge: "COMMON QUESTIONS",
    title: "Frequently Answered Inquiries",
    faqs: [
      {
        id: 1,
        question: "What makes your private luxury tours distinct from standard itineraries?",
        answer: "Each expedition is fully bespoke, featuring dedicated scholar guides, private luxury vehicles, hand-picked five-star riads, and exclusive experiences such as private palace openings or remote oasis banquets."
      },
      {
        id: 2,
        question: "Can I customize the itinerary in real-time during my journey?",
        answer: "Absolutely. While we construct a detailed framework, your dedicated local concierge and private chauffeur can adapt daily activities dynamically based on your interest, energy levels, or regional discoveries."
      },
      {
        id: 3,
        question: "What luxury comforts are provided in your Sahara Desert camps?",
        answer: "Our private oasis encampments feature king-sized beds, en-suite bathrooms with hot running water, gourmet dining, electricity, heating/cooling systems, and complete stargazing decks with astronomers."
      },
      {
        id: 4,
        question: "How are dietary requirements managed during rural travel?",
        answer: "Whether in the high Atlas Mountains or deep dunes, our private chefs and selected dining riads cater to all dietary needs. We curate premium gastronomy with local organic ingredients."
      },
      {
        id: 5,
        question: "What is the optimal booking window for peak luxury travel seasons?",
        answer: "To secure the most exclusive boutique riads, premier guides, and elite desert tents during Spring (March-May) or Autumn (September-November), we recommend booking six to nine months in advance."
      },
      {
        id: 6,
        question: "Are your guides fluent in specific European languages?",
        answer: "Yes, our selected guides are university graduates fluent in English, French, Spanish, German, and Arabic. We match you with guides based on your linguistic and historical expertise preferences."
      }
    ]
  },
  fr: {
    badge: "QUESTIONS FRÉQUENTES",
    title: "Inquiries Fréquemment Résolues",
    faqs: [
      {
        id: 1,
        question: "Qu'est-ce qui distingue vos circuits de luxe privés des itinéraires standards ?",
        answer: "Chaque expédition est entièrement sur mesure, avec des guides experts, des véhicules de luxe privés, des riads cinq étoiles sélectionnés, et des accès exclusifs à des monuments fermés au public."
      },
      {
        id: 2,
        question: "Puis-je modifier l'itinéraire en temps réel pendant mon voyage ?",
        answer: "Absolument. Bien que nous établissions un programme précis, votre concierge local dédié et votre chauffeur privé peuvent adapter les activités quotidiennes en temps réel selon vos envies."
      },
      {
        id: 3,
        question: "Quels conforts de luxe sont fournis dans vos camps du désert du Sahara ?",
        answer: "Nos campements privés disposent de lits king-size, de salles de bain attenantes avec eau chaude, d'une cuisine gastronomique, d'électricité, de climatisation et de terrasses privées pour observer les étoiles."
      },
      {
        id: 4,
        question: "Comment les exigences alimentaires sont-elles gérées dans le désert ?",
        answer: "Que ce soit dans les montagnes de l'Atlas ou dans les dunes du désert, nos chefs privés s'adaptent à tous les régimes en proposant une gastronomie raffinée à base d'ingrédients locaux biologiques."
      },
      {
        id: 5,
        question: "Quel est le meilleur moment pour réserver pour les saisons de pointe ?",
        answer: "Pour garantir les meilleurs riads et guides pendant le printemps (mars-mai) et l'automne (septembre-novembre), nous vous conseillons de réserver entre six et neuf mois à l'avance."
      },
      {
        id: 6,
        question: "Vos guides parlent-ils couramment le français ?",
        answer: "Oui, nos guides universitaires parlent parfaitement français, anglais et espagnol. Nous adaptons le guide à vos préférences linguistiques et thématiques."
      }
    ]
  },
  es: {
    badge: "PREGUNTAS FRECUENTES",
    title: "Preguntas Frecuentes Respondidas",
    faqs: [
      {
        id: 1,
        question: "¿Qué diferencia sus viajes de lujo privados de los itinerarios estándar?",
        answer: "Cada expedición es completamente a medida, con guías académicos dedicados, transporte privado de lujo, riads de cinco estrellas seleccionados y acceso exclusivo a palacios o zonas restringidas."
      },
      {
        id: 2,
        question: "¿Puedo personalizar el itinerario en tiempo real durante el viaje?",
        answer: "Por supuesto. Ofrecemos un marco de viaje detallado, pero su conserje local y conductor privado pueden adaptar las actividades diarias sobre la marcha según sus preferencias."
      },
      {
        id: 3,
        question: "¿Qué comodidades de lujo se ofrecen en los campamentos del Sahara?",
        answer: "Nuestros campamentos de oasis privados cuentan con camas king-size, baños privados con agua caliente, cenas gourmet, electricidad, sistemas de calefacción/refrigeración y decks de observación."
      },
      {
        id: 4,
        question: "¿Cómo se gestionan las restricciones alimentarias en el viaje?",
        answer: "Tanto en el Atlas como en el desierto, nuestros chefs privados y riads adaptan sus menús a cualquier restricción, sirviendo gastronomía premium con ingredientes locales de alta calidad."
      },
      {
        id: 5,
        question: "¿Con cuánta antelación se debe reservar para la temporada alta?",
        answer: "Para asegurar los riads más exclusivos y guías de primer nivel durante primavera (marzo-mayo) u otoño (septiembre-noviembre), sugerimos reservar con seis a nueve meses de antelación."
      },
      {
        id: 6,
        question: "¿Disponen de guías que dominen el español?",
        answer: "Sí, nuestros guías tienen formación universitaria y dominan el español, inglés y francés. Los asignamos de acuerdo a su idioma e intereses históricos preferidos."
      }
    ]
  }
};

export default function FaqAccordion({ className = '' }) {
  const { currentLocale } = useLanguage();
  const lang = localTranslations[currentLocale] || localTranslations['en'];
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Divide the FAQs array into two columns (odd items in left, even in right)
  const leftColFaqs = lang.faqs.filter((_, idx) => idx % 2 === 0);
  const rightColFaqs = lang.faqs.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      id="faq-accordion-section"
      className={`snap-start snap-always h-screen w-full flex flex-col justify-center bg-[#FDFBF7] py-12 md:py-16 px-6 md:px-12 relative overflow-hidden ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full max-h-[85vh] md:max-h-[80vh] relative z-10">

        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10 space-y-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#F0715D] block">
            {lang.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A1128] tracking-tight mt-3">
            {lang.title}
          </h2>
        </div>

        {/* Two-Column Grid displaying Travel Accordion Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 items-start flex-grow overflow-y-auto pr-1">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            {leftColFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border-b transition-colors duration-500 py-3 md:py-4 ${isOpen ? 'border-[#F0715D]' : 'border-slate-200/50'
                    } bg-transparent`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group py-2 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-serif text-sm md:text-base font-semibold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#F0715D]' : 'text-[#0A1128] group-hover:text-[#F0715D]'
                      }`}>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#F0715D] transition-transform duration-300 rotate-180" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#F0715D] transition-transform duration-300" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-4 text-xs md:text-sm text-slate-600 font-light leading-relaxed">
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
          <div className="flex flex-col space-y-4">
            {rightColFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border-b transition-colors duration-500 py-3 md:py-4 ${isOpen ? 'border-[#F0715D]' : 'border-slate-200/50'
                    } bg-transparent`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group py-2 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-serif text-sm md:text-base font-semibold tracking-tight transition-colors duration-300 ${isOpen ? 'text-[#F0715D]' : 'text-[#0A1128] group-hover:text-[#F0715D]'
                      }`}>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#F0715D] transition-transform duration-300 rotate-180" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 group-hover:text-[#F0715D] transition-transform duration-300" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-4 text-xs md:text-sm text-slate-600 font-light leading-relaxed">
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

      </div>
    </section>
  );
}
