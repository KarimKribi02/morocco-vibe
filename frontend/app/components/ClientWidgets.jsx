"use client";

import dynamic from "next/dynamic";

const BrandPreloader = dynamic(() => import("./BrandPreloader"), { ssr: false });
const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const MobileBottomNav = dynamic(() => import("./MobileBottomNav"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <BrandPreloader />
      <WhatsAppButton />
      <MobileBottomNav />
    </>
  );
}
