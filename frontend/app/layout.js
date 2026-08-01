import "./globals.css";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Navbar from "./components/Navbar";
import FooterWrapper from "./components/FooterWrapper";
import ClientWidgets from "./components/ClientWidgets";
import { CurrencyProvider } from "../context/CurrencyContext";
import { LanguageProvider } from "../context/LanguageContext";

// Font Optimizations with display swap to prevent CLS and FOIT
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moroccovibe.com';

export const viewport = {
  themeColor: '#FF5B35',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Morocco Vibe | Luxury Morocco Travel Agency & Saharan Expeditions",
    template: "%s | Morocco Vibe Travel"
  },
  description: "Bespoke Morocco travel agency specializing in private Sahara desert tours, imperial city heritage trips, Atlas Mountain treks, and luxury custom itineraries.",
  keywords: [
    "Morocco travel agency",
    "Marrakesh desert tours",
    "Sahara desert expedition",
    "Luxury Morocco trips",
    "Private Morocco tour driver",
    "Fes medina guided tour",
    "Chefchaouen blue city tour",
    "Bespoke Morocco itineraries"
  ],
  authors: [{ name: "Morocco Vibe Travel Experts", url: baseUrl }],
  creator: "Morocco Vibe",
  publisher: "Morocco Vibe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Morocco Vibe | Premium Custom Travel & Saharan Luxury Expeditions",
    description: "Discover authentic luxury Moroccan travel with private drivers, 5-star desert encampments, and bespoke cultural itineraries.",
    url: baseUrl,
    siteName: "Morocco Vibe",
    images: [
      {
        url: '/assets/desert-luxury-1.png',
        width: 1200,
        height: 630,
        alt: "Morocco Vibe Sahara Luxury Encampment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Vibe | Luxury Morocco Travel Agency",
    description: "Handpicked private tours across Morocco: Sahara safaris, imperial cities, and custom expeditions.",
    images: ['/assets/desert-luxury-1.png'],
  },
  icons: { 
    icon: '/assets/logo-full.png', 
    shortcut: '/assets/logo-full.png',
    apple: '/assets/logo-full.png' 
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`} suppressHydrationWarning>
      <body className="bg-luxuryBg text-luxuryDark font-sans antialiased min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        <ClientWidgets />
        <LanguageProvider>
          <CurrencyProvider>
            <div>
              <Navbar />
              <main>{children}</main>
            </div>
            <FooterWrapper />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}