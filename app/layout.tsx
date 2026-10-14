import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import { HOME_DESCRIPTION, HOME_TITLE, OPEN_GRAPH_DEFAULTS } from "@/lib/seo";
import { BRAND, PLANS, SERVICE_LOCATIONS, SITE_URL } from "@/lib/site";

// What search engines and AI search (e.g. ChatGPT) read about the business. RentOMate is the consumer brand
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
      logo: `${SITE_URL}/rentomate-wordmark-clean.png`,
      image: `${SITE_URL}/hero/rentomate-hero.webp`,
      description:
        "RentOMate rents ISI certified Akvinz RO water purifiers (8-stage RO + UV + UF with TDS control, copper and minerals, pH-balanced alkaline water) to homes, with free installation, servicing and filter replacements included in the monthly rent.",
      telephone: PHONE_DISPLAY,
      email: SUPPORT_EMAIL,
      priceRange: `₹${Math.min(...PLANS.map((plan) => plan.price))}–₹${Math.max(...PLANS.map((plan) => plan.price))} per month`,
      address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressRegion: "Tamil Nadu", addressCountry: "IN" },
      areaServed: SERVICE_LOCATIONS.map((city) => ({ "@type": "City", name: city })),
      parentOrganization: { "@type": "Organization", name: BRAND.operator },
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
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

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    "RO purifier rental",
    "Akvinz Ultron",
    "RentOMate",
  ],
  // Brand-wide defaults only. Canonical URLs, og:url and og:title are set per page (see lib/seo.ts).
  openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website" },
  twitter: { card: "summary_large_image" },
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
