"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MessageCircle, Info } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "HOME",
      href: "/",
      icon: Home,
      isExternal: false
    },
    {
      label: "TOURS",
      href: "/tours",
      icon: Compass,
      isExternal: false
    },
    {
      label: "WHATSAPP",
      href: "https://wa.me/212634332000?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20Morocco%20tour.",
      icon: MessageCircle,
      isExternal: true,
      highlight: true
    },
    {
      label: "ABOUT",
      href: "/about",
      icon: Info,
      isExternal: false
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = !item.isExternal && pathname === item.href;

        if (item.isExternal) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center space-y-1 py-1 px-3 text-[#25D366] active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shadow-sm">
                <IconComponent className="w-4 h-4 fill-current text-[#25D366]" />
              </div>
              <span className="text-[9px] font-extrabold tracking-wider uppercase">
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center space-y-1 py-1 px-3 transition-all duration-300 relative ${
              isActive ? 'text-[#E86D5A] font-bold' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.75]'}`} />
            <span className="text-[9px] font-extrabold tracking-wider uppercase">
              {item.label}
            </span>

            {/* Active Indicator Dot */}
            {isActive && (
              <span className="absolute bottom-0 w-1 h-1 rounded-full bg-[#E86D5A]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
