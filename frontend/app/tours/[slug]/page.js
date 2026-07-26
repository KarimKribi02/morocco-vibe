"use client";

import { useEffect, useState, use, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, User, ChevronDown, Check, X as CloseIcon, 
  Map, MessageSquare, Info, Calendar, MapPin, Image as ImageIcon, 
  Star, Send, ShieldAlert, Award, Play
} from 'lucide-react';
import { fetchFromStrapi, getStrapiMedia } from '../../../lib/strapi';
import { useCurrency } from '../../../context/CurrencyContext';
import { useLanguage } from '../../../context/LanguageContext';

// Safe Stateful Image Component
function SafeImage({ src, fallback = '/placeholder.png', alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <img 
      src={imgSrc || fallback} 
      alt={alt || "Tour Detail Image"} 
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

export default function TourDetailPage({ params: paramsPromise }) {
  const { formatPrice } = useCurrency();
  const { currentLocale } = useLanguage();
  const params = use(paramsPromise);
  const { slug } = params;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openDayIndex, setOpenDayIndex] = useState(0);

  // Booking Card States
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    phone: '',
    date: '',
    tickets: '1',
    message: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Lightbox States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Navigation tab bar ref handlers for scroll interaction
  const infoRef = useRef(null);
  const itineraryRef = useRef(null);
  const locationRef = useRef(null);
  const galleryRef = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      const offset = 100;
      const elementPosition = elementRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    async function getTourDetails() {
      try {
        setLoading(true);
        let response = await fetchFromStrapi('tours', `?locale=${currentLocale}&filters[slug][$eq]=${slug}&populate=*`);
        
        let foundTour = null;
        if (response && response.data && response.data.length > 0) {
          foundTour = response.data[0];
        } else if (currentLocale !== 'en') {
          // Fallback pattern to English if localized details are missing
          const fallbackRes = await fetchFromStrapi('tours', `?locale=en&filters[slug][$eq]=${slug}&populate=*`);
          if (fallbackRes && fallbackRes.data && fallbackRes.data.length > 0) {
            foundTour = fallbackRes.data[0];
          }
        }

        // Apply local hardcoded fallback if Strapi returned nothing or is offline
        if (!foundTour) {
          const localList = fallbackLocalTours[currentLocale] || fallbackLocalTours['en'];
          foundTour = localList.find(t => t.slug === slug) || null;
        }

        if (foundTour) {
          setTour(foundTour);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load tour details, falling back to local itineraries:", err);
        const localList = fallbackLocalTours[currentLocale] || fallbackLocalTours['en'];
        const foundTour = localList.find(t => t.slug === slug) || null;
        if (foundTour) {
          setTour(foundTour);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    getTourDetails();
  }, [slug, currentLocale]);

  // Construct All Images Gallery strictly
  const galleryImages = useMemo(() => {
    if (!tour) return [];
    if (tour.gallery && Array.isArray(tour.gallery) && tour.gallery.length > 0) {
      return tour.gallery
        .map(img => img?.url ? getStrapiMedia(img.url) : null)
        .filter(url => url !== null);
    }
    // Fallback if empty to avoid rendering an empty grid
    return [
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=600",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=600"
    ];
  }, [tour]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-400 font-sans">
        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent animate-spin mb-4 rounded-full"></div>
        <p className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-gray-500">Loading Itinerary Blueprint...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 font-sans px-6 text-center">
        <span className="text-4xl mb-4">🐪</span>
        <h2 className="font-serif text-2xl font-bold mb-3">Destination Archive Delay</h2>
        <p className="text-xs text-gray-400 mb-8 max-w-sm font-light leading-relaxed">
          The private route planner is unable to sync details at this moment. Please return to the directory.
        </p>
        <Link href="/tours" className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow">
          Explore All Journeys
        </Link>
      </div>
    );
  }

  const mainImageUrl = tour.mainImage?.url ? getStrapiMedia(tour.mainImage.url) : '/placeholder.png';
  const safeItinerary = Array.isArray(tour.itinerary) ? tour.itinerary.filter(day => day !== null) : [];

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert("Please fill in Name, Email, and Phone fields.");
      return;
    }
    const messageText = `Hi Morocco Vibe! I would like to book "${tour.title}". Here are my details:
- Name: ${bookingForm.name}
- Email: ${bookingForm.email}
- Phone: ${bookingForm.phone}
- Date: ${bookingForm.date}
- Tickets: ${bookingForm.tickets}
- Note: ${bookingForm.message}`;

    const whatsappUrl = `https://wa.me/212634332000?text=${encodeURIComponent(messageText)}`;
    const newWindow = window.open(whatsappUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-28 font-sans text-gray-800 pt-0">
      
      {/* 1. HERO BRAND BANNER ("Explore Landscapes") */}
      <section className="relative h-[55vh] md:h-[65vh] w-full flex items-center justify-center bg-gray-900 px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={mainImageUrl} 
            alt={tour.title} 
            className="w-full h-full object-cover scale-105 opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[#FDFBF7]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl -mt-6">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.3em] text-white/90 mb-3 block">
            EXPLORE
          </span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-[9rem] text-white font-normal leading-none drop-shadow-2xl select-none"
            style={{ fontFamily: "'Alex Brush', 'Brush Script MT', cursive" }}
          >
            Landscapes
          </motion.h1>
        </div>
      </section>

      {/* 2. HORIZONTAL SECTION NAVIGATION TAB BAR */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-6">
        <div className="bg-white border border-gray-150/70 p-4 md:p-6 shadow-xl rounded-2xl flex justify-center gap-4 md:gap-12 flex-wrap">
          
          <button 
            onClick={() => scrollToSection(infoRef)}
            className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition cursor-pointer"
          >
            <Info className="w-4 h-4 text-orange-500" />
            <span>Information</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => scrollToSection(itineraryRef)}
            className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>Tour Plan</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => scrollToSection(locationRef)}
            className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition cursor-pointer"
          >
            <Map className="w-4 h-4 text-orange-500" />
            <span>Location</span>
          </button>

          <div className="w-[1px] h-6 bg-gray-100 hidden md:block" />

          <button 
            onClick={() => scrollToSection(galleryRef)}
            className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-orange-500 transition cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-orange-500" />
            <span>Gallery</span>
          </button>

        </div>
      </section>

      {/* 3. SPLIT MAIN GRID SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto" ref={infoRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT MAIN INFORMATION FIELD (2/3 width) */}
          <div className="lg:col-span-8 space-y-12 text-left">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {tour.title}
                </h1>
                <div className="text-xl md:text-2xl font-extrabold text-orange-500 font-sans">
                  {formatPrice(tour.price)} <span className="text-xs text-gray-400 font-normal">/ Per Couple</span>
                </div>
              </div>

              {/* Gold Stars Rating */}
              <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <span className="text-gray-400 font-light">(2.8k reviews)</span>
              </div>
            </div>

            {/* Overview Text Block */}
            <div className="space-y-4 text-gray-500 text-xs md:text-sm font-light leading-relaxed">
              {tour.overview && Array.isArray(tour.overview) ? (
                tour.overview.map((block, idx) => (
                  <p key={idx}>{block.children?.map(c => c.text).join(' ')}</p>
                ))
              ) : (
                <p>{tour.overview || "Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo."}</p>
              )}
            </div>

            {/* Inclusions and Exclusions side-by-side */}
            <div className="border-t border-gray-150 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Not Included (whatsNotIncluded) */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-orange-500 uppercase tracking-wider text-xs md:text-sm">Not Included</h4>
                  <ul className="space-y-3">
                    {tour.whatsNotIncluded && tour.whatsNotIncluded.length > 0 ? (
                      tour.whatsNotIncluded.map((exc) => (
                        <li key={exc.id} className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-500">
                            ✕
                          </div>
                          <span>{exc.text}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-red-500">✕</div>
                          <span>Gallery Ticket</span>
                        </li>
                        <li className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-red-500">✕</div>
                          <span>Lunch</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Included (whatsIncluded) */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-orange-500 uppercase tracking-wider text-xs md:text-sm">Included</h4>
                  <ul className="space-y-3">
                    {tour.whatsIncluded && tour.whatsIncluded.length > 0 ? (
                      tour.whatsIncluded.map((inc) => (
                        <li key={inc.id} className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600">
                            ✓
                          </div>
                          <span>{inc.text}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-green-600">✓</div>
                          <span>5 Star Accommodations</span>
                        </li>
                        <li className="flex items-center gap-2.5 text-xs text-gray-500">
                          <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-green-600">✓</div>
                          <span>Airport Transfer</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

              </div>
            </div>

            {/* Tour Plan Day-by-Day Accordions */}
            {safeItinerary.length > 0 && (
              <div className="border-t border-gray-150 pt-10 scroll-mt-24" ref={itineraryRef}>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Tour Plan</h3>
                <div className="space-y-4">
                  {safeItinerary.map((day, idx) => {
                    const isOpen = openDayIndex === idx;
                    return (
                      <div 
                        key={day.id}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                          isOpen ? 'border-orange-500 bg-gray-50/10' : 'border-gray-150 bg-white'
                        }`}
                      >
                        <div 
                          onClick={() => setOpenDayIndex(isOpen ? -1 : idx)}
                          className="p-5 flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg ${
                              isOpen ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'
                            }`}>
                              {day.dayLabel || `Day ${idx + 1}`}
                            </span>
                            <h5 className="font-bold text-xs md:text-sm text-gray-900">{day.dayTitle}</h5>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-orange-500' : ''
                          }`} />
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-gray-100 bg-white"
                            >
                              <div className="p-5 text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                                {Array.isArray(day.dayContent) ? (
                                  day.dayContent.map((block, bIdx) => (
                                    <p key={bIdx} className="mb-2">{block.children?.map(c => c.text).join(' ')}</p>
                                  ))
                                ) : (
                                  <p>{day.dayContent || "Itinerary activities detailed upon consultation."}</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Map Blueprint Section */}
            {tour.mapImage?.url && (
              <div className="border-t border-gray-150 pt-10 scroll-mt-24" ref={locationRef}>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-xs text-gray-400 mb-6 font-light">
                  Visual routing paths designed for comfort, luxury, and cultural immersion.
                </p>
                <div className="relative w-full h-[400px] bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm group">
                  <SafeImage 
                    src={getStrapiMedia(tour.mapImage.url)} 
                    alt="Tour Route Map" 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
              </div>
            )}

          </div>

          {/* RIGHT STICKY BOOKING CONCIERGE CARD (1/3 width) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-white border border-gray-150/70 p-6 md:p-8 rounded-3xl shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Book This Tour</h3>
              <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                Ex optio sequi et quos praesentium in nostrum labore nam rerum iusto aut magni nesciunt? Quo quidem neque iste expedita est dolo.
              </p>

              {/* Status Alert */}
              <AnimatePresence>
                {bookingSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border border-green-200 text-green-800 text-[11px] font-medium p-3 rounded-xl mb-4 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Selected Dates Available! Proceed with Book Now.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleBookNow} className="space-y-4">
                <input 
                  type="text" 
                  required
                  placeholder="Name" 
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                />

                <input 
                  type="email" 
                  required
                  placeholder="Email" 
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                />

                <input 
                  type="email" 
                  required
                  placeholder="Confirm Email" 
                  value={bookingForm.confirmEmail}
                  onChange={(e) => setBookingForm({...bookingForm, confirmEmail: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                />

                <input 
                  type="text" 
                  required
                  placeholder="Phone" 
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                />

                <input 
                  type="date" 
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors text-gray-400"
                />

                <input 
                  type="number" 
                  min="1" 
                  placeholder="Number of ticket" 
                  value={bookingForm.tickets}
                  onChange={(e) => setBookingForm({...bookingForm, tickets: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors"
                />

                <textarea 
                  rows="3" 
                  placeholder="Message" 
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500 transition-colors resize-none"
                />

                {/* Dual-Action Buttons */}
                <div className="pt-2 space-y-3">
                  <button 
                    type="button"
                    onClick={handleCheckAvailability}
                    className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow cursor-pointer text-center"
                  >
                    Check Availability
                  </button>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg shadow-orange-500/10 cursor-pointer text-center"
                  >
                    Book Now
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 4. LOOKBOOK GALLERY DISPLAY GRID ("From our gallery") */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-100 scroll-mt-24" ref={galleryRef}>
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-2">From our gallery</h2>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed max-w-xl">
              Visual snapshots from our curated private itineraries and premium expeditions.
            </p>
          </div>

          {/* 4-Column Gallery Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 8).map((imgUrl, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }}
                onClick={() => { setLightboxIndex(index); setIsLightboxOpen(true); }}
                className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm cursor-pointer relative group"
              >
                <SafeImage 
                  src={imgUrl} 
                  alt={`Gallery asset ${index + 1}`}
                  className="w-full h-full object-cover group-hover:brightness-95 transition"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FULLSCREEN INTERACTIVE LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition bg-white/5 hover:bg-white/10 p-3 rounded-full cursor-pointer"
              onClick={() => setIsLightboxOpen(false)}
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {/* Slider Content */}
            <div className="relative max-w-5xl w-full max-h-[75vh] px-4 flex items-center justify-center">
              
              {galleryImages.length > 1 && (
                <button 
                  className="absolute left-6 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition active:scale-95 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length); }}
                >
                  ‹
                </button>
              )}

              <img 
                src={galleryImages[lightboxIndex]} 
                alt={`Lightbox image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
              />

              {galleryImages.length > 1 && (
                <button 
                  className="absolute right-6 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition active:scale-95 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % galleryImages.length); }}
                >
                  ›
                </button>
              )}

            </div>

            {/* Counter */}
            <div className="mt-6 text-white/40 text-[10px] font-bold tracking-widest uppercase">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}