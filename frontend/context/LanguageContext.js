"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const dictionary = {
  en: {
    home: "Home",
    guidedTours: "Guided Tours",
    about: "About",
    contact: "Contact",
    bookNow: "Book Now",
    bookTour: "Book Tour",
    search: "Search Journeys",
    from: "From",
    perPerson: "Per Person",
    explore: "Explore",
    available: "Available / Flexible Booking",
    inquireNow: "Inquire Now / Book Tour",
    chatWhatsApp: "Chat on WhatsApp",
    curatedExpeditions: "Curated Expeditions & Private Journeys",
    subtitle: "Experience authentic Moroccan hospitality redesigned for the modern explorer.",
    noResults: "No Matching Journeys Found",
    resetSearch: "Reset Search Parameters",
  },
  fr: {
    home: "Accueil",
    guidedTours: "Circuits Guidés",
    about: "À Propos",
    contact: "Contact",
    bookNow: "Réserver",
    bookTour: "Réserver un Circuit",
    search: "Rechercher des Voyages",
    from: "À partir de",
    perPerson: "Par personne",
    explore: "Explorer",
    available: "Disponible / Réservation Flexible",
    inquireNow: "S'enquérir / Réserver",
    chatWhatsApp: "Discuter sur WhatsApp",
    curatedExpeditions: "Expéditions Curatées & Voyages Privés",
    subtitle: "Découvrez l'hospitalité marocaine authentique repensée pour l'explorateur moderne.",
    noResults: "Aucun Voyage Correspondant Trouvé",
    resetSearch: "Réinitialiser les Paramètres",
  },
  es: {
    home: "Inicio",
    guidedTours: "Tours Guiados",
    about: "Nosotros",
    contact: "Contacto",
    bookNow: "Reservar",
    bookTour: "Reservar Tour",
    search: "Buscar Viajes",
    from: "Desde",
    perPerson: "Por persona",
    explore: "Explorar",
    available: "Disponible / Reserva Flexible",
    inquireNow: "Preguntar / Reservar",
    chatWhatsApp: "Chatear por WhatsApp",
    curatedExpeditions: "Expediciones Curadas & Viajes Privados",
    subtitle: "Experimente la auténtica hospitalidad marroquí rediseñada para el explorador moderno.",
    noResults: "No se encontraron viajes coincidentes",
    resetSearch: "Restablecer Parámetros",
  }
};

export function LanguageProvider({ children }) {
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Optional client-side language preference retrieval from localStorage
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('app_locale');
      if (savedLocale && ['en', 'fr', 'es'].includes(savedLocale)) {
        setCurrentLocale(savedLocale);
      }
    }
  }, []);

  const changeLanguage = (newLocale) => {
    if (!['en', 'fr', 'es'].includes(newLocale)) return;
    setCurrentLocale(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_locale', newLocale);
    }
  };

  const t = (key) => {
    return dictionary[currentLocale]?.[key] || dictionary['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLocale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
