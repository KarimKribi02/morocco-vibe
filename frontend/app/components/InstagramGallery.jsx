"use client";

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const galleryImages = [
  { id: 1, src: "/dest-merzouga.png", alt: "Sahara Desert Sunset" },
  { id: 2, src: "/dest-marrakech.png", alt: "Luxury Riad Pool" },
  { id: 3, src: "/dest-fes.png", alt: "Fes Medina Alley" },
  { id: 4, src: "/dest-chefchaouen.png", alt: "Chefchaouen Blue Street" },
  { id: 5, src: "/dest-atlas.png", alt: "Atlas Mountains Panorama" },
  { id: 6, src: "/dest-essaouira.png", alt: "Moroccan Cuisine & Tea" }
];

export default function InstagramGallery() {
  return (
    <section className="w-full bg-[#FAF8F5] py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        
        {/* Header */}
        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E86D5A] block">
            FOLLOW OUR JOURNEY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight">
            @MoroccoVibe
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            Daily Inspiration from Morocco
          </p>
        </div>

        {/* 6-Photo Grid (2x3 on mobile, 6 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {galleryImages.map((img) => (
            <a
              key={img.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <InstagramIcon className="w-6 h-6 stroke-[2]" />
              </div>
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-orange-500 via-[#E86D5A] to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-md shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>VIEW ON INSTAGRAM</span>
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
