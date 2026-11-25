import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { ADDRESS, FACEBOOK_URL, GOOGLE_BUSINESS_URL, INSTAGRAM_URL, OPENING_HOURS, PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import { HOME_DESCRIPTION, HOME_TITLE, OPEN_GRAPH_DEFAULTS } from "@/lib/seo";
import { BRAND, PLANS, SITE_URL } from "@/lib/site";

// What search engines and AI search (e.g. ChatGPT) read about the business. Rentomate is the consumer brand
// (WebSite + LocalBusiness); Akvinz Water Purifiers is the business that operates it (parentOrganization).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      alternateName: BRAND.alternateNames,
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND.name,
      alternateName: BRAND.alternateNames,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/brand/rentomate-wordmark.png`,
      image: `${SITE_URL}/images/hero/rentomate-hero-branded.webp`,
      description:
        "Rentomate rents ISI certified Akvinz RO water purifiers (8-stage RO + UV + UF with TDS control, copper and minerals, pH-balanced alkaline water) to homes, with free installation, servicing and filter replacements included in the monthly rent.",
      telephone: PHONE_DISPLAY,
      email: SUPPORT_EMAIL,
      priceRange: `₹${Math.min(...PLANS.map((plan) => plan.price))}–₹${Math.max(...PLANS.map((plan) => plan.price))} per month`,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.postalCode,
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: OPENING_HOURS.days, opens: OPENING_HOURS.opens, closes: OPENING_HOURS.closes },
      ],
      // Only cities that are live. Add each city back here as it launches.
      // Areas with their own landing page (lib/seo-pages.ts). Add "geo" (GeoCoordinates) once the office's exact
      // latitude/longitude are copied from Google Maps; don't use approximate numbers.
      areaServed: [
        { "@type": "City", name: "Coimbatore" },
        ...["Peelamedu", "Saravanampatti", "Gandhipuram", "RS Puram"].map((name) => ({ "@type": "Place", name })),
      ],
      parentOrganization: { "@type": "Organization", name: BRAND.operator },
      // Add the JustDial listing once it goes live.
      sameAs: [GOOGLE_BUSINESS_URL, INSTAGRAM_URL, FACEBOOK_URL],
      makesOffer: PLANS.map((plan) => ({
        "@type": "Offer",
        name: `${plan.months}-month ${plan.name} water purifier rental plan`,
        price: plan.price,
        priceCurrency: "INR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitText: "MONTH" },
        itemOffered: { "@type": "Service", name: "RO water purifier on rent" },
      })),
    },
  ],
};

// Self-hosted (Latin subset, variable weight; OFL licence in app/fonts) rather than next/font/google: builds then
// never depend on Google Fonts, whose responses with `/l/font?kit=…&…` URLs break Turbopack's font loader.
const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  weight: "500 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND.name,
  title: {
    default: HOME_TITLE,
    template: `%s | ${BRAND.name}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "water purifier on rent in Coimbatore",
    "water purifier rental Coimbatore",
    "RO on rent Coimbatore",
    "RO water purifier on rent",
    "RO purifier on rent near me",
    "RO purifier rental",
    "Akvinz Ultron",
    "Rentomate",
  ],
  // Brand-wide defaults only. Canonical URLs, og:url and og:title are set per page (see lib/seo.ts).
  openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website" },
  twitter: { card: "summary_large_image" },
  // Domain ownership checks (Google Search Console, Meta/Facebook Business). Keep these permanently;
  // removing one un-verifies the site. Rendered server-side into <head> on every page.
  verification: {
    google: "dzBWU7Z34eqkDDXoT9NfKhlAYWra0vjN0VzdQ2BHL2I",
    other: { "facebook-domain-verification": "i7t977a2nik5i4fe9hg5oy3pm315zr" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
