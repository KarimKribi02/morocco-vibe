"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();
  const router = useRouter();

  // Detect locale from pathname (e.g. /fr/about -> fr)
  const pathSegments = pathname ? pathname.split('/') : [];
  const initialLocale = ['en', 'fr', 'es'].includes(pathSegments[1]) ? pathSegments[1] : 'en';

  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  // Sync state whenever path changes
  useEffect(() => {
    const segments = pathname ? pathname.split('/') : [];
    const active = ['en', 'fr', 'es'].includes(segments[1]) ? segments[1] : 'en';
    setCurrentLocale(active);
  }, [pathname]);

  const changeLanguage = (newLocale) => {
    if (!['en', 'fr', 'es'].includes(newLocale)) return;

    const segments = pathname ? pathname.split('/') : [];
    let newPathname = '';

    if (['en', 'fr', 'es'].includes(segments[1])) {
      segments[1] = newLocale;
      newPathname = segments.join('/');
    } else {
      newPathname = `/${newLocale}${pathname}`;
    }

    setCurrentLocale(newLocale);
    router.push(newPathname || '/');
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
