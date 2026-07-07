"use client";

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, ArrowUpDown, TrendingUp, TrendingDown, 
  MapPin, Clock, Search, Navigation, Heart, Star, 
  ChevronLeft, ChevronRight, SlidersHorizontal, RefreshCw
} from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../lib/strapi';
import Link from 'next/link';
import { useCurrency } from '../../context/CurrencyContext';
import { useLanguage } from '../../context/LanguageContext';

// Safe Stateful Image Component with fallback handling
function SafeImage({ src, fallback = '/placeholder.png', alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <img 
      src={imgSrc || fallback} 
      alt={alt || "Travel Image"} 
      className={className}
      onError={() => setImgSrc(fallback)} 
      {...props} 
    />
  );
}

const fallbackLocalTours = {
  en: [
    {
      id: 991,
      slug: "sahara-luxury-nomad-expedition",
      title: "Sahara Luxury Nomad Expedition",
      excerpt: "Experience a premium nomad journey across the golden dunes of Merzouga. Five-star private encampments, camel treks, and dedicated guide services included.",
      overview: "Experience a premium nomad journey across the golden dunes of Merzouga. Five-star private encampments, camel treks, and dedicated guide services included. Complete VIP private transport in our premium Mercedes V-Class and 24/7 concierge hosting are active throughout your stay.",
      price: 1200,
      salePrice: 990,
      rating: "5.0",
      destination: "Sahara Desert",
      featured: true,
      startDate: "Flexible",
      departure: "Marrakech Menara Airport / Hotel Lobby",
      departureTime: "08:00 AM",
      returnTime: "07:00 PM",
      dressCode: "Comfortable desert wear, loose linen, sunglasses",
      whatsIncluded: [
        { id: 1, text: "Private VIP Mercedes V-Class Transport" },
        { id: 2, text: "5-Star Luxury Nomad Camp Lodging" },
        { id: 3, text: "24/7 Dedicated Local Concierge Host" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "International Flights" },
        { id: 2, text: "Personal Shopping & Souvenirs" }
      ],
      itinerary: [
        { id: 1, day: "Day 1", title: "Arrival & Medina Welcome", description: "Arrive in Marrakech. Private transfer to your luxury medina riad, followed by an evening tea orientation." },
        { id: 2, day: "Day 2", title: "Merzouga Camel Safari & Sunset", description: "Journey past the Atlas mountains to Merzouga. Embark on a private camel trek to your 5-star oasis camp." },
        { id: 3, day: "Day 3", title: "Sunrise Dunes & Departure", description: "Enjoy a traditional nomad breakfast under the desert sunrise before a scenic private return transit." }
      ],
      mainImage: { url: "/assets/desert-luxury-1.png" },
      gallery: []
    },
    {
      id: 992,
      slug: "imperial-cities-medina-heritage",
      title: "Imperial Cities & Medina Heritage",
      excerpt: "Explore the historical ramparts and vibrant alleys of Fès and Marrakech. Handpicked luxury riads and expert cultural local guides.",
      overview: "Explore the historical ramparts and vibrant alleys of Fès and Marrakech. Handpicked luxury riads and expert cultural local guides. Experience centuries of rich cultural history and royal architectural masterworks.",
      price: 850,
      salePrice: null,
      rating: "4.9",
      destination: "Marrakech & Fes",
      featured: false,
      startDate: "Flexible",
      departure: "Marrakech or Fes Airport / Hotel Lobby",
      departureTime: "08:30 AM",
      returnTime: "06:00 PM",
      dressCode: "Modest casual clothing, walking shoes",
      whatsIncluded: [
        { id: 1, text: "Bespoke Cultural Walking Guides" },
        { id: 2, text: "Luxury Historic Riad Accommodations" },
        { id: 3, text: "All Monument Entry Tickets" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Personal Dinners & Alcohols" }
      ],
      itinerary: [
        { id: 1, day: "Day 1", title: "Marrakech Medina Wonders", description: "Guided exploration of Bahia Palace, Saadian Tombs, and the bustling Jemaa el-Fnaa square." },
        { id: 2, day: "Day 2", title: "Imperial Fes Alleys", description: "Transit to Fes. Walk through the tanneries, Al-Qarawiyyin mosque, and historical city gates." }
      ],
      mainImage: { url: "/assets/imperial-heritage.png" },
      gallery: []
    },
    {
      id: 993,
      slug: "bespoke-atlas-mountains-desert-oasis",
      title: "Bespoke Atlas Mountains & Desert Oasis",
      excerpt: "A premium combination of high Atlas trekking and deep desert wellness retreats. Features five-star transport and private concierge.",
      overview: "A premium combination of high Atlas trekking and deep desert wellness retreats. Features five-star transport and private concierge. Perfectly blends physical revitalization with absolute desert peace.",
      price: 1450,
      salePrice: 1290,
      rating: "4.8",
      destination: "Atlas Mountains",
      featured: true,
      startDate: "Flexible",
      departure: "Marrakech Hotel Lobby",
      departureTime: "07:30 AM",
      returnTime: "08:00 PM",
      dressCode: "Sporty trekking layers, hiking boots, warm jacket",
      whatsIncluded: [
        { id: 1, text: "Private Mountain Guide & Mules" },
        { id: 2, text: "Luxury Eco-Lodge Wellness Retreat" },
        { id: 3, text: "Organic Traditional Gastronomy" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Mountain Equipment Rentals" }
      ],
      itinerary: [
        { id: 1, day: "Day 1", title: "Atlas Peaks Trekking", description: "Ascend past scenic Berber villages in Ourika valley, with private local lunch host." },
        { id: 2, day: "Day 2", title: "Desert Oasis Wellness", description: "Settle into your premium oasis eco-resort for private Hammam and wellness therapy under the stars." }
      ],
      mainImage: { url: "/assets/desert-luxury-2.png" },
      gallery: []
    }
  ],
  fr: [
    {
      id: 991,
      slug: "sahara-luxury-nomad-expedition",
      title: "Expédition Nomade de Luxe au Sahara",
      excerpt: "Vivez un voyage nomade haut de gamme à travers les dunes dorées de Merzouga. Campements privés cinq étoiles, randonnées à chameau et guides dédiés inclus.",
      overview: "Vivez un voyage nomade haut de gamme à travers les dunes dorées de Merzouga. Campements privés cinq étoiles, randonnées à chameau et guides dédiés inclus. Transport VIP complet dans notre Mercedes Classe V et assistance conciergerie 24/7 active.",
      price: 1200,
      salePrice: 990,
      rating: "5.0",
      destination: "Désert du Sahara",
      featured: true,
      startDate: "Flexible",
      departure: "Aéroport de Marrakech Ménara / Lobby de l'hôtel",
      departureTime: "08:00",
      returnTime: "19:00",
      dressCode: "Tenue de désert confortable, lin léger, lunettes de soleil",
      whatsIncluded: [
        { id: 1, text: "Transport Privé VIP Mercedes Classe V" },
        { id: 2, text: "Logement en Camp Nomade de Luxe 5 Étoiles" },
        { id: 3, text: "Hôte Conciergerie Locale Dédié 24h/24" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Vols Internationaux" },
        { id: 2, text: "Achats Personnels & Souvenirs" }
      ],
      itinerary: [
        { id: 1, day: "Jour 1", title: "Arrivée & Accueil à la Médina", description: "Arrivée à Marrakech. Transfert privé vers votre riad de luxe de la médina, suivi d'une orientation autour d'un thé." },
        { id: 2, day: "Jour 2", title: "Safari à Chameau à Merzouga", description: "Voyage à travers les montagnes de l'Atlas vers Merzouga. Randonnée privée à chameau vers votre campement d'oasis 5 étoiles." },
        { id: 3, day: "Jour 3", title: "Aurore sur les Dunes & Retour", description: "Savourez un petit-déjeuner traditionnel nomade sous le lever du soleil du désert avant votre transfert de retour." }
      ],
      mainImage: { url: "/assets/desert-luxury-1.png" },
      gallery: []
    },
    {
      id: 992,
      slug: "imperial-cities-medina-heritage",
      title: "Villes Impériales & Patrimoine de la Médina",
      excerpt: "Explorez les remparts historiques et les ruelles animées de Fès et Marrakech. Riads de luxe sélectionnés et guides locaux experts.",
      overview: "Explorez les remparts historiques et les ruelles animées de Fès et Marrakech. Riads de luxe sélectionnés et guides locaux experts. Découvrez des siècles d'histoire culturelle riche et de chefs-d'œuvre architecturaux royaux.",
      price: 850,
      salePrice: null,
      rating: "4.9",
      destination: "Marrakech et Fès",
      featured: false,
      startDate: "Flexible",
      departure: "Aéroport de Marrakech ou Fès / Lobby de l'hôtel",
      departureTime: "08:30",
      returnTime: "18:00",
      dressCode: "Vêtements de ville modestes et confortables, chaussures de marche",
      whatsIncluded: [
        { id: 1, text: "Guides de Marche Culturels Sur Mesure" },
        { id: 2, text: "Hébergements en Riad Historique de Luxe" },
        { id: 3, text: "Tous les Billets d'Entrée aux Monuments" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Dîners Personnels & Alcools" }
      ],
      itinerary: [
        { id: 1, day: "Jour 1", title: "Merveilles de la Médina de Marrakech", description: "Exploration guidée du Palais de la Bahia, des Tombeaux Saadiens et de la place animée Jemaa el-Fnaa." },
        { id: 2, day: "Jour 2", title: "Ruelles Impériales de Fès", description: "Transit vers Fès. Promenade dans les tanneries, la mosquée Al-Qarawiyyin et les portes historiques de la ville." }
      ],
      mainImage: { url: "/assets/imperial-heritage.png" },
      gallery: []
    },
    {
      id: 993,
      slug: "bespoke-atlas-mountains-desert-oasis",
      title: "Montagnes de l'Atlas & Oasis du Désert Sur Mesure",
      excerpt: "Une combinaison unique de randonnées dans le Haut Atlas et de retraites de bien-être dans le désert. Transport VIP et conciergerie privée.",
      overview: "Une combinaison unique de randonnées dans le Haut Atlas et de retraites de bien-être dans le désert. Transport VIP et conciergerie privée. Allie harmonieusement la revitalisation physique à la paix absolue du désert.",
      price: 1450,
      salePrice: 1290,
      rating: "4.8",
      destination: "Montagnes de l'Atlas",
      featured: true,
      startDate: "Flexible",
      departure: "Lobby de l'hôtel à Marrakech",
      departureTime: "07:30",
      returnTime: "20:00",
      dressCode: "Couches de trekking de sport, bottes de randonnée, veste chaude",
      whatsIncluded: [
        { id: 1, text: "Guide de Montagne Privé & Mulets" },
        { id: 2, text: "Retraite de Bien-Être en Éco-Lodge de Luxe" },
        { id: 3, text: "Gastronomie Traditionnelle Biologique" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Location d'Équipement de Montagne" }
      ],
      itinerary: [
        { id: 1, day: "Jour 1", title: "Randonnée dans l'Atlas", description: "Ascension à travers de pittoresques villages berbères dans la vallée de l'Ourika, avec déjeuner bio local chez l'habitant." },
        { id: 2, day: "Jour 2", title: "Bien-Être Oasis du Désert", description: "Installation dans votre éco-resort de bien-être pour un hammam privé et des thérapies sous les étoiles." }
      ],
      mainImage: { url: "/assets/desert-luxury-2.png" },
      gallery: []
    }
  ],
  es: [
    {
      id: 991,
      slug: "sahara-luxury-nomad-expedition",
      title: "Expedición Nómada de Lujo en el Sahara",
      excerpt: "Viva un viaje nómada de primer nivel a través de las dunas doradas de Merzouga. Campamientos de cinco estrellas, paseos en camello y guías dedicados.",
      overview: "Viva un viaje nómada de primer nivel a través de las dunas doradas de Merzouga. Campamientos de cinco estrellas, paseos en camello y guías dedicados. Transporte VIP en Mercedes Clase V y concierge 24/7 activo.",
      price: 1200,
      salePrice: 990,
      rating: "5.0",
      destination: "Desierto del Sahara",
      featured: true,
      startDate: "Flexible",
      departure: "Aeropuerto de Marrakech Menara / Lobby del hotel",
      departureTime: "08:00",
      returnTime: "19:00",
      dressCode: "Ropa de desierto cómoda, lino ligero, gafas de sol",
      whatsIncluded: [
        { id: 1, text: "Transporte Privado VIP Mercedes Clase V" },
        { id: 2, text: "Hospedaje en Campamento de Lujo de 5 Estrellas" },
        { id: 3, text: "Servicio de Conserjería Local Dedicado las 24 Horas" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Vuelos Internacionales" },
        { id: 2, text: "Compras Personales & Recuerdos" }
      ],
      itinerary: [
        { id: 1, day: "Día 1", title: "Llegada y Bienvenida en la Medina", description: "Llegada a Marrakech. Traslado privado a su riad de lujo en la medina, con orientación de bienvenida." },
        { id: 2, day: "Día 2", title: "Paseo en Camello en Merzouga", description: "Viaje a través del Atlas a Merzouga. Paseo privado en camello al atardecer hasta su campamento de 5 estrellas." },
        { id: 3, day: "Día 3", title: "Amanecer en las Dunas y Salida", description: "Disfrute de un desayuno tradicional nómada bajo el amanecer antes de su cómodo traslado privado de regreso." }
      ],
      mainImage: { url: "/assets/desert-luxury-1.png" },
      gallery: []
    },
    {
      id: 992,
      slug: "imperial-cities-medina-heritage",
      title: "Ciudades Imperiales y Patrimonio de la Medina",
      excerpt: "Explore las murallas históricas y los vibrantes callejones de Fez y Marrakech. Riads de lujo seleccionados y guías locales expertos.",
      overview: "Explore las murallas históricas y los vibrantes callejones de Fez y Marrakech. Riads de lujo seleccionados y guías locales expertos. Experimente siglos de rica historia y obras maestras arquitectónicas reales.",
      price: 850,
      salePrice: null,
      rating: "4.9",
      destination: "Marrakech y Fez",
      featured: false,
      startDate: "Flexible",
      departure: "Aeropuerto de Marrakech o Fez / Lobby del hotel",
      departureTime: "08:30",
      returnTime: "18:00",
      dressCode: "Ropa urbana cómoda y modesta, calzado para caminar",
      whatsIncluded: [
        { id: 1, text: "Guías de Caminata Cultural a Medida" },
        { id: 2, text: "Alojamientos en Riads Históricos de Lujo" },
        { id: 3, text: "Todas las Entradas a Monumentos" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Cenas Personales & Bebidas Alcohólicas" }
      ],
      itinerary: [
        { id: 1, day: "Día 1", title: "Maravillas de la Medina de Marrakech", description: "Visita guiada al Palacio de la Bahía, Tumbas Saadíes y la concurrida plaza de Jemaa el-Fnaa." },
        { id: 2, day: "Día 2", title: "Callejones de Fez Imperial", description: "Tránsito a Fez. Paseo por las curtidurías, la mezquita Al-Qarawiyyin y las puertas históricas." }
      ],
      mainImage: { url: "/assets/imperial-heritage.png" },
      gallery: []
    },
    {
      id: 993,
      slug: "bespoke-atlas-mountains-desert-oasis",
      title: "Montañas del Atlas y Oasis del Desierto a Medida",
      excerpt: "Una combinación premium de senderismo por el Alto Atlas y retiros de bienestar en el desierto. Transporte VIP y servicio de conserjería privado.",
      overview: "Una combinación premium de senderismo por el Alto Atlas y retiros de bienestar en el desierto. Transporte VIP y servicio de conserjería privado. Combina el revigorizamiento físico con la paz absoluta del desierto.",
      price: 1450,
      salePrice: 1290,
      rating: "4.8",
      destination: "Montañas del Atlas",
      featured: true,
      startDate: "Flexible",
      departure: "Lobby del hotel en Marrakech",
      departureTime: "07:30",
      returnTime: "20:00",
      dressCode: "Capas de trekking deportivo, botas de senderismo, chaqueta de abrigo",
      whatsIncluded: [
        { id: 1, text: "Guía de Montaña Privado & Mulas" },
        { id: 2, text: "Retiro de Bienestar en Eco-Lodge de Lujo" },
        { id: 3, text: "Gastronomía Orgánica Tradicional" }
      ],
      whatsNotIncluded: [
        { id: 1, text: "Alquiler de Equipos de Montaña" }
      ],
      itinerary: [
        { id: 1, day: "Día 1", title: "Senderismo en el Atlas", description: "Ascenso por pintorescos pueblos bereberes en el valle de Ourika, con almuerzo orgánico local." },
        { id: 2, day: "Día 2", title: "Bienestar en el Oasis del Desierto", description: "Instalación en su eco-resort para un hammam privado y terapia bajo las estrellas." }
      ],
      mainImage: { url: "/assets/desert-luxury-2.png" },
      gallery: []
    }
  ]
};

export default function ToursDirectoryPage() {
  const { formatPrice } = useCurrency();
  const { currentLocale } = useLanguage();

  // Strapi dynamic states
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Sorting Option: 'date' (initial), 'price-low', 'price-high', 'name'
  const [sortBy, setSortBy] = useState('date');

  // Sidebar Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [whereTo, setWhereTo] = useState('');
  const [priceRange, setPriceRange] = useState(3600);
  const [datePlaceholder, setDatePlaceholder] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Localized Labels
  const translations = {
    en: {
      searchTour: "SEARCH TOUR",
      travelWithUs: "Travel With Us",
      dateTab: "Date",
      priceLowTab: "Price Low To High",
      priceHighTab: "Price High To Low",
      nameTab: "Name (A-Z)",
      planYourTrip: "Plan Your Trip",
      planDesc: "Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.",
      searchPlaceholder: "Search Tour",
      whereToPlaceholder: "Where To?",
      filterByPrice: "Filter By Price",
      priceLabel: "Price:",
      bookNow: "Book Now",
      paginationPrev: "Prev",
      paginationNext: "Next",
      noTours: "No Journeys found matching your filters.",
      minPeople: "100+ People",
      featuredBadge: "Bestseller"
    },
    fr: {
      searchTour: "RECHERCHE",
      travelWithUs: "Voyagez Avec Nous",
      dateTab: "Date",
      priceLowTab: "Prix Croissant",
      priceHighTab: "Prix Décroissant",
      nameTab: "Nom (A-Z)",
      planYourTrip: "Planifier Votre Voyage",
      planDesc: "Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.",
      searchPlaceholder: "Rechercher un circuit",
      whereToPlaceholder: "Destination?",
      filterByPrice: "Filtrer Par Prix",
      priceLabel: "Prix:",
      bookNow: "Réserver",
      paginationPrev: "Précédent",
      paginationNext: "Suivant",
      noTours: "Aucun voyage ne correspond à vos filtres.",
      minPeople: "100+ Personnes",
      featuredBadge: "Bestseller"
    },
    es: {
      searchTour: "BUSCAR TOUR",
      travelWithUs: "Viaja Con Nosotros",
      dateTab: "Fecha",
      priceLowTab: "Precio Bajo a Alto",
      priceHighTab: "Precio Alto a Bajo",
      nameTab: "Nombre (A-Z)",
      planYourTrip: "Planifica Tu Viaje",
      planDesc: "Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.",
      searchPlaceholder: "Buscar Tour",
      whereToPlaceholder: "¿A dónde?",
      filterByPrice: "Filtrar Por Precio",
      priceLabel: "Precio:",
      bookNow: "Reservar",
      paginationPrev: "Anterior",
      paginationNext: "Siguiente",
      noTours: "No se encontraron tours con los filtros actuales.",
      minPeople: "100+ Personas",
      featuredBadge: "Bestseller"
    }
  };

  const t = translations[currentLocale] || translations['en'];

  // Fetch data dynamically from Strapi backend with locale settings
  useEffect(() => {
    async function loadTours() {
      try {
        setLoading(true);
        let response = await fetchFromStrapi("tours", `?locale=${currentLocale}&populate=*`);
        let totalTours = response?.data || [];

        // Fallback pattern to English if localized endpoint is empty
        if (totalTours.length === 0 && currentLocale !== 'en') {
          const fallbackRes = await fetchFromStrapi("tours", "?locale=en&populate=*");
          totalTours = fallbackRes?.data || [];
        }

        // Apply local hardcoded fallback if Strapi returned nothing or is offline
        if (totalTours.length === 0) {
          totalTours = fallbackLocalTours[currentLocale] || fallbackLocalTours['en'];
        }

        setTours(totalTours);
      } catch (err) {
        console.error("Failed to load directory tours, falling back to local itineraries:", err);
        setTours(fallbackLocalTours[currentLocale] || fallbackLocalTours['en']);
      } finally {
        setLoading(false);
      }
    }
    loadTours();
  }, [currentLocale]);

  // Combined client-side Filtering & Sorting logic
  const filteredAndSortedTours = useMemo(() => {
    return tours
      .filter((tour) => {
        const price = tour.salePrice || tour.price || 0;

        // 1. Text Search matching title or destination details
        if (searchTerm && !tour.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }

        // 2. Where To matching
        if (whereTo && !tour.destination?.toLowerCase().includes(whereTo.toLowerCase()) && 
            !tour.title?.toLowerCase().includes(whereTo.toLowerCase())) {
          return false;
        }

        // 3. Price limit check ($12 - $3600 range slider)
        if (price > priceRange) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice || a.price || 0;
        const priceB = b.salePrice || b.price || 0;

        if (sortBy === 'price-low') {
          return priceA - priceB;
        }
        if (sortBy === 'price-high') {
          return priceB - priceA;
        }
        if (sortBy === 'name') {
          return (a.title || '').localeCompare(b.title || '');
        }
        // Default sort by Date / ID
        return b.id - a.id;
      });
  }, [tours, searchTerm, whereTo, priceRange, sortBy]);

  // Pagination calculation
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTours.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTours, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTours.length / itemsPerPage);

  const handleResetFilters = () => {
    setSearchTerm('');
    setWhereTo('');
    setPriceRange(3600);
    setSortBy('date');
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans text-gray-800 pb-24 selection:bg-orange-500/10 selection:text-orange-500 pt-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[55vh] md:h-[65vh] w-full flex items-center justify-center bg-gray-950 px-6 pt-20 overflow-hidden">
        {/* Full-width scenic landscape backdrop */}
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src="https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1600&auto=format&fit=crop" 
            alt="Moroccan Architecture Courtyard"
            className="w-full h-full object-cover scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-[#FDFBF7]" />
        </div>

        {/* Cursive display title overlay */}
        <div className="relative z-10 text-center max-w-4xl -mt-6">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-white/95 mb-3 block">
            {t.searchTour}
          </span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-9xl text-white font-normal leading-none drop-shadow-xl"
            style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
          >
            {t.travelWithUs}
          </motion.h1>
        </div>
      </section>

      {/* 2. HORIZONTAL SORTING TOOLBAR */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-6">
        <div className="bg-white border border-gray-150/70 p-4 md:p-6 shadow-xl rounded-2xl flex flex-wrap items-center justify-center gap-4 md:gap-8">
          
          <button 
            onClick={() => setSortBy('date')}
            className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl transition cursor-pointer ${
              sortBy === 'date' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t.dateTab}</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => setSortBy('price-low')}
            className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl transition cursor-pointer ${
              sortBy === 'price-low' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{t.priceLowTab}</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => setSortBy('price-high')}
            className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl transition cursor-pointer ${
              sortBy === 'price-high' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>{t.priceHighTab}</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => setSortBy('name')}
            className={`flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-xl transition cursor-pointer ${
              sortBy === 'name' ? 'bg-orange-500/10 text-orange-500' : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.nameTab}</span>
          </button>

        </div>
      </section>

      {/* 3. TWO-COLUMN GRID (Sidebar + Content) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">
          
          {/* LEFT CONTENT AREA: 2-3 Column Product Grid (3/4 width) */}
          <div className="lg:col-span-3 space-y-12">
            
            {loading ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-3xl p-5 animate-pulse space-y-4">
                    <div className="bg-gray-200 h-56 rounded-2xl w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error Area */
              <div className="text-center py-16 bg-red-50/50 border border-red-100 p-8 rounded-3xl max-w-lg mx-auto">
                <span className="text-3xl mb-3 block">⚠️</span>
                <h3 className="font-serif text-lg text-gray-900 mb-1">Itinerary Connection Delay</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                  We are experiencing a brief backend sync lag. Please reload the page or reach our live driver service.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full"
                >
                  Retry Connection
                </button>
              </div>
            ) : filteredAndSortedTours.length === 0 ? (
              /* No matching results state */
              <div className="text-center py-16 bg-gray-50 border border-gray-100 p-8 rounded-3xl max-w-lg mx-auto">
                <span className="text-3xl mb-3 block">🐪</span>
                <h3 className="font-serif text-lg text-gray-900 mb-1">No Tours Match Your Settings</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                  Adjust your search terms, destination selector, or increase your budget threshold.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Staggered Shuffling Grid */
              <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedTours.map((tour) => {
                    const imageUrl = getStrapiMedia(tour.mainImage?.url) || '/placeholder.png';
                    const displayPrice = tour.salePrice || tour.price || 0;

                    return (
                      <motion.div
                        layout
                        key={tour.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white border border-gray-150/70 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                      >
                        <div>
                          {/* Image frame header with dual overlays */}
                          <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                            {tour.featured && (
                              <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[9px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full z-10 shadow">
                                {t.featuredBadge}
                              </span>
                            )}

                            {/* Dual overlay labels (Date, Min People Capacity) */}
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10">
                              <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 font-bold">
                                <Calendar className="w-3 h-3 text-orange-400" />
                                <span>{tour.startDate || "Flexible"}</span>
                              </span>

                              <span className="bg-black/60 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 font-bold">
                                <Navigation className="w-3 h-3 text-orange-400" />
                                <span>{t.minPeople}</span>
                              </span>
                            </div>

                            <SafeImage 
                              src={imageUrl} 
                              alt={tour.title || "Tour image"}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                            />
                          </div>

                          {/* Content Areas */}
                          <div className="p-6">
                            {/* Rating Star layout */}
                            <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold mb-2">
                              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                              <span>{tour.rating || "5.0"}</span>
                            </div>

                            <Link href={`/tours/${tour.slug || ''}`}>
                              <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-500 transition cursor-pointer min-h-[3rem]">
                                {tour.title}
                              </h3>
                            </Link>

                            <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2 mb-4">
                              {tour.excerpt || "Discover the magic of Moroccan landscape under traditional lodging, VIP transportation guides, and flexible bookings."}
                            </p>
                          </div>
                        </div>

                        {/* Price metrics and CTA */}
                        <div className="p-6 pt-0 border-t border-gray-55/70">
                          <div className="pt-4 flex items-center justify-between">
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-bold mb-0.5">Price</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-base font-extrabold text-gray-900">
                                  {formatPrice(displayPrice)}
                                </span>
                                {tour.salePrice && (
                                  <span className="line-through text-gray-400 text-[10px]">
                                    {formatPrice(tour.price)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Link 
                              href={`/tours/${tour.slug || ''}`}
                              className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-[10px] font-bold tracking-widest uppercase px-5 py-3 rounded-full transition-all duration-300 shadow hover:shadow-lg shadow-orange-500/10 transform hover:-translate-y-0.5"
                            >
                              {t.bookNow}
                            </Link>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2.5 pt-8 border-t border-gray-100">
                <button 
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-gray-150 bg-white hover:bg-orange-50 hover:text-orange-500 transition flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-extrabold text-xs transition cursor-pointer ${
                        currentPage === pageNum 
                          ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow shadow-orange-500/10'
                          : 'border border-gray-150 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-150 bg-white hover:bg-orange-50 hover:text-orange-500 transition flex items-center justify-center text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR FILTER CONCIERGE (1/4 width) */}
          <div className="lg:col-span-1 space-y-10 sticky top-28 z-30 self-start h-fit transition-all duration-300">
            
            {/* Plan Your Trip Widget */}
            <div className="bg-gray-50 border border-gray-150/70 p-6 md:p-8 rounded-3xl shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t.planYourTrip}</h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                {t.planDesc}
              </p>

              <div className="space-y-4">
                {/* Search Tour Input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Where To Input */}
                <div className="relative">
                  <MapPin className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={whereTo}
                    onChange={(e) => { setWhereTo(e.target.value); setCurrentPage(1); }}
                    placeholder={t.whereToPlaceholder}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Date Input Box Placeholder */}
                <div className="relative">
                  <Calendar className="w-4 h-4 text-orange-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={datePlaceholder}
                    onChange={(e) => setDatePlaceholder(e.target.value)}
                    placeholder="Flexible Date"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Price Slider Range Component */}
                <div className="pt-6 border-t border-gray-200/60">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-900 mb-3">
                    <span>{t.filterByPrice}</span>
                    <span className="text-orange-500 font-extrabold">{formatPrice(priceRange)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="12" 
                    max="3600" 
                    value={priceRange}
                    onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">
                    <span>{t.priceLabel} $12</span>
                    <span>$3600</span>
                  </div>
                </div>

                {/* Reset Filters CTA */}
                <button 
                  onClick={handleResetFilters}
                  className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow shadow-orange-500/10 cursor-pointer text-center"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Overlapping travel assets graphic composition (Flight and bags mockup style) */}
            <div className="relative pt-6 overflow-hidden hidden lg:block select-none">
              <div className="relative flex flex-col items-center">
                <SafeImage 
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=400" 
                  alt="Overlapping suitcase mockup" 
                  className="w-[85%] rounded-3xl shadow-xl transform rotate-3 hover:rotate-0 transition duration-500"
                />
                {/* Overlay flight accent */}
                <div className="absolute -top-4 -right-2 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 border border-gray-100 flex items-center gap-3 animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    ✈️
                  </div>
                  <div>
                    <h5 className="text-[10px] font-extrabold text-gray-900 uppercase">Sahara Direct</h5>
                    <p className="text-[9px] text-gray-400">Next flight in 2h</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
