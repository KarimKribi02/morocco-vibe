import "./globals.css";
import Navbar from "./components/Navbar";
import FooterWrapper from "./components/FooterWrapper";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileBottomNav from "./components/MobileBottomNav";
import BrandPreloader from "./components/BrandPreloader";
import { CurrencyProvider } from "../context/CurrencyContext";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata = {
  title: "Morocco Vibe | Premium Custom Travel & Saharan Luxury Expeditions",
  description: "Experience the ultimate bespoke journeys, curated luxury desert safaris, and exclusive private itineraries in Morocco.",
  icons: { icon: '/assets/logo-icon.png', apple: '/assets/logo-icon.png' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-luxuryBg text-luxuryDark antialiased min-h-screen flex flex-col justify-between" suppressHydrationWarning>
        <BrandPreloader />
        <LanguageProvider>
          <CurrencyProvider>
            <div>
              <Navbar />
              <main>{children}</main>
            </div>
            <FooterWrapper />
            <WhatsAppButton />
            <MobileBottomNav />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}