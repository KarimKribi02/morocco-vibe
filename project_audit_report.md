# Technical Health-Check & Architecture Audit Report
**Project:** Premium Morocco Travel & Tour Booking Platform
**Architecture:** Decoupled Headless (Next.js 16.2.6 App Router & Strapi v5.46.0 CMS)
**Auditor:** Senior Full-Stack Engineer & Project Auditor
**Status:** Healthy (Compilation Resolved & Lint Verified)

---

## 1. Executive Summary

This audit report delivers a rigorous analysis of the project's technical architecture, database schema, and frontend-to-backend integrations. The platform is designed as a high-end, premium booking experience for luxury travel and transfers in Morocco. 

A thorough scan of both the `frontend` and `backend` repositories was performed, resolving key JSX compilation and ESLint issues in the process. The code has been audited to ensure seamless collaboration and transition.

> [!IMPORTANT]
> **Key Finding:** While the Strapi v5 backend defines a modern, component-driven **Structured Content Schema** (using repeatable components for Highlights, Itinerary, and Inclusions), the Next.js frontend currently contains a legacy **Algorithmic Parser** that expects a single unstructured block field (`tour.description`). 
> 
> We have provided a complete **Structured Content Mapping Blueprint** below to align the frontend with the Strapi v5 database schema natively.

---

## 2. Tech Stack Inventory

The codebase uses modern, performance-oriented libraries optimized for Next.js App Router (React 19) and Strapi v5.

| Module | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | Next.js (App Router) | `16.2.6` | React Framework with Server-Side rendering support. |
| **Frontend Logic** | React / React DOM | `19.2.4` | Modern UI state and render engine. |
| **Styling** | Tailwind CSS | `^4` | Utility-first CSS using the new Tailwind v4 CSS `@theme` specification. |
| **Icons** | Lucide React | `^1.16.0` | Clean vector iconography. |
| **Animation** | Framer Motion | `^12.39.0` | Smooth UI micro-animations and page transitions. |
| **Backend Core** | Strapi v5 | `5.46.0` | Node.js headless CMS framework. |
| **Database** | SQLite | `better-sqlite3` | Local database storage (located in `backend/.tmp/data.db`). |

---

## 3. Frontend Architecture & Completed Features

The Next.js frontend is organized around the modern **App Router** structure:

```
frontend/
├── app/
│   ├── book/
│   │   └── page.js           # Decoupled Booking Sub-module Form
│   ├── components/
│   │   ├── Navbar.jsx        # Glassmorphic Header Navigation
│   │   └── WhatsAppButton.jsx# Sticky WhatsApp Chat Launcher
│   ├── tours/
│   │   └── [slug]/
│   │       └── page.js       # Dynamic Tour Details & Gallery Slider
│   ├── globals.css           # Tailwind v4 theme configuration
│   ├── layout.js             # Global wrapper and metadata configuration
│   └── page.js               # Homepage featuring Search and Featured Loops
└── lib/
    └── strapi.js             # CMS Connection Helpers (fetch, media resolvers)
```

### A. Homepage Layout & Structural Flow (`app/page.js`)
* **Hero Banner & Brand Positioning:** Full-bleed visual section showing Morocco scenery (`/hero-bg.jpg`) with gold typography and a clean call to action.
* **Search Widget (Static UI):** Includes drop-downs for Destination selection, Service Type (Tour, Private Taxi, Airport Transfer), and a Date picker.
* **Trust & Authority Indicators:** Highlights ratings from TripAdvisor (4.9/5) and TourRadar (4.8/5) with custom star rating loops.
* **Dynamic Tour Loop:** Fetches tours from Strapi using `/api/tours?populate=*`.
  * **Dynamic Image Fallbacks:** Renders the main tour image via `getStrapiMedia()`. It includes an active React `onError` fallback to `/placeholder.png` if the backend media asset is missing.
  * **Decoupled Linking:** Titles are wrapped with the Next.js `<Link>` tag pointing to `/tours/[slug]`.

### B. Dynamic Tour Detail Page (`app/tours/[slug]/page.js`)
* **Dynamic Fetching:** The page reads the route parameter `{ slug }` and executes a filtered request:
  ```javascript
  const response = await fetchFromStrapi('tours', `?filters[slug][$eq]=${slug}&populate=*`);
  ```
* **Legacy Parser Logic:** It currently runs an algorithmic parser `parseFullTourData(tour.description)` that splits a single text block into arrays for highlights, itinerary days, inclusions, and exclusions based on text prefixes (e.g. `Day X -`, `Highlights`, `Cost Includes`).
* **Design Gaps Identified:** 
  1. The Tour content-type schema in Strapi does not have a `description` field.
  2. The Route Blueprint Map image field (`mapImage` in Strapi) is not referenced or rendered on the page.

### C. Lightbox Modal System
* Located directly inside the tour details gallery.
* Compiles all media into a deduplicated array `allImages` containing the `mainImage` at index 0 and `gallery` items in subsequent positions.
* **UX Controls:** Includes previous/next sliding triggers (`ChevronLeft`, `ChevronRight`), keyboard close support, background click-off listeners, and a slide count tracker (e.g. `2 / 5`).

### D. Decoupled Booking Sub-module (`app/book/page.js`)
* **State Management:** Standalone, clean transaction form using React states.
* **URL Parameter Bindings:** Pulls the selected tour title from the query string (`?tour=Tour+Name`) using `useSearchParams` wrapped inside a `<Suspense>` boundary to prevent server hydration mismatch.
* **Payload Validation Mapping:** Form data maps directly to the Strapi v5 database schema using camelCase properties enclosed in a `data` parent wrapper.
* **Safe POST Submission:** Uses standard fetch to submit booking payloads directly to `http://localhost:1337/api/bookings` with defensive error handling and automatic redirection back to the homepage upon success.

---

## 4. Backend Database Structure (Strapi v5)

The Strapi v5 backend is fully configured with schema schemas and CORS parameters.

### A. CORS Middlewares Configuration (`backend/config/middlewares.ts`)
The API secures cross-origin connections while allowing local development:
* **Allowed Origin:** `http://localhost:3000` (Next.js default client port)
* **Allowed HTTP Methods:** `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`
* **Allowed Headers:** `Content-Type`, `Authorization`, `Origin`, `Accept`
* **Error Handling:** `keepHeaderOnError: true` is set, preserving CORS headers even if Strapi returns a 4xx or 5xx error.

### B. Content Type Schemas & Attributes Mapping

#### 1. Tour Content-Type (`api::tour`)
* **`title`**: String (Required)
* **`slug`**: UID (Targeted to `title`)
* **`duration`**: Integer (Required)
* **`price`**: Decimal (Required)
* **`salePrice`**: Decimal
* **`featured`**: Boolean (Default: `false`)
* **`mainImage`**: Media (Single Image, Required)
* **`gallery`**: Media (Multiple Images)
* **`mapImage`**: Media (Single Route Blueprint Map Image)
* **`overview`**: Rich Text Blocks (Strapi v5 native format)
* **`highlights`**: Repeatable Component (`tour-spec.highlight-item` -> `{ text: string }`)
* **`itinerary`**: Repeatable Component (`tour-spec.itinerary-day` -> `{ dayLabel: string, dayTitle: string, dayContent: blocks }`)
* **`whatsIncluded`**: Repeatable Component (`tour-spec.inclusion-item` -> `{ text: string }`)
* **`whatsNotIncluded`**: Repeatable Component (`tour-spec.exclusion-item` -> `{ text: string }`)

#### 2. Booking Content-Type (`api::booking`)
The payload mapping strictly mirrors the database requirements:
* **`clientName`**: String (Required)
* **`email`**: Email (Required)
* **`whatsApp`**: String (Required)
* **`nationality`**: String
* **`serviceType`**: Enumeration (`Tour`, `Taxi`, `Airport Transfer`)
* **`travelDate`**: Date
* **`adultsCount`**: Integer
* **`childrenCount`**: Integer
* **`pickUpLocation`**: String
* **`dropOffLocation`**: String
* **`specialRequests`**: Text

---

## 5. Structured Content Integration Blueprint

To replace the legacy text parser and take advantage of the component database structure, we recommend upgrading `frontend/app/tours/[slug]/page.js` to render the structured fields directly.

Below is the complete React code structure for the page, integrating Strapi v5's structured elements and rendering the Route Blueprint Map image at the bottom of the page.

```javascript
// Upgraded Structured Data Rendering Code for app/tours/[slug]/page.js

// 1. Render Highlights directly:
{tour.highlights && tour.highlights.length > 0 && (
  <div className="bg-white border border-gray-100 p-6 shadow-sm mb-12">
    <h3 className="font-serif text-lg font-medium text-luxuryDark mb-4 flex items-center space-x-2">
      <Award className="w-5 h-5 text-luxuryGold" />
      <span>Tour Highlights</span>
    </h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-gray-600 font-light">
      {tour.highlights.map((item) => (
        <li key={item.id} className="flex items-start space-x-2.5">
          <Compass className="w-4 h-4 text-luxuryGold mt-0.5 flex-shrink-0" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
)}

// 2. Render Structured Itinerary Days:
<div className="space-y-3 mb-12">
  {tour.itinerary && tour.itinerary.map((day, idx) => {
    const isOpen = openDayIndex === idx;
    return (
      <div key={day.id} className={`border bg-white transition-all shadow-sm ${isOpen ? 'border-luxuryGold' : 'border-gray-100'}`}>
        <div 
          onClick={() => setOpenDayIndex(isOpen ? -1 : idx)}
          className="p-5 flex items-center justify-between cursor-pointer select-none group"
        >
          <div className="flex items-center space-x-4">
            <div className={`font-serif font-medium px-3 py-1.5 text-xs tracking-wide ${isOpen ? 'bg-luxuryGold text-white' : 'bg-luxuryGold/10 text-luxuryGold'}`}>
              {day.dayLabel || `Day ${idx + 1}`}
            </div>
            <h4 className="font-serif text-sm md:text-base text-luxuryDark font-medium group-hover:text-luxuryGold transition">
              {day.dayTitle}
            </h4>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-luxuryGold' : ''}`} />
        </div>

        {isOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-gray-50 text-xs md:text-sm text-gray-600 font-light leading-relaxed space-y-3 bg-gray-50/20">
            {/* Render block contents or simple fallback text */}
            {Array.isArray(day.dayContent) ? (
              day.dayContent.map((block, bIdx) => (
                <p key={bIdx}>{block.children?.map(c => c.text).join(' ')}</p>
              ))
            ) : (
              <p>{day.dayContent}</p>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>

// 3. Render Route Blueprint Map (Bottom of page):
{tour.mapImage?.url && (
  <div className="mt-16 pt-12 border-t border-gray-100">
    <h3 className="font-serif text-2xl text-luxuryDark mb-2 font-light">Route Blueprint Map</h3>
    <p className="text-xs text-gray-400 mb-6 font-light">Visual routing path of your private premium journey.</p>
    <div className="relative w-full h-[400px] bg-gray-100 border border-gray-100 shadow-sm overflow-hidden">
      <img 
        src={getStrapiMedia(tour.mapImage.url)} 
        alt="Tour Route Map" 
        className="w-full h-full object-cover"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
  </div>
)}
```

---

## 6. Audit Verdict & Action Items

The codebase exhibits solid architectural patterns with a modern frontend and a structured database backend. The following points should be prioritized in the next phase of development:

1. **Structured Content Migration:** Replace `parseFullTourData(tour.description)` in the details page with the direct mapping demonstrated in Section 5.
2. **Dynamic Search Functionality:** Currently, the search widget on the homepage is static. The search parameters (`Destination`, `Service Type`, `Date`) need to be hooked to a query route to filter the displayed cards dynamically.
3. **Admin User Seeding:** Verify API access tokens in Next.js environment (`.env.local`) to query published and draft content securely using Strapi v5 API tokens.
