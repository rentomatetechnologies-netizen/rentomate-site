import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import { PLANS, SERVICE_LOCATIONS, SITE_URL } from "@/lib/site";

// What search engines and AI search (e.g. ChatGPT) read about the business: contact details,
// the cities served and the rental plans with prices.
const businessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "RentOMate",
  url: SITE_URL,
  logo: `${SITE_URL}/rentomate-wordmark-clean.png`,
  image: `${SITE_URL}/hero/rentomate-hero.webp`,
  description:
    "RentOMate rents ISI certified Akvinz RO water purifiers (8-stage RO + UV + UF with TDS control, copper and minerals, pH-balanced alkaline water) to homes, with free installation, servicing and filter replacements included in the monthly rent.",
  telephone: PHONE_DISPLAY,
  email: SUPPORT_EMAIL,
  priceRange: `₹${Math.min(...PLANS.map((plan) => plan.price))}–₹${Math.max(...PLANS.map((plan) => plan.price))} per month`,
  address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  areaServed: SERVICE_LOCATIONS.map((city) => ({ "@type": "City", name: city })),
  parentOrganization: { "@type": "Organization", name: "Akvinz Water Purifiers" },
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
  makesOffer: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `${plan.months}-month ${plan.name} water purifier rental plan`,
    price: plan.price,
    priceCurrency: "INR",
    priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitText: "MONTH" },
    itemOffered: { "@type": "Service", name: "RO water purifier on rent" },
  })),
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Water Purifier on Rent in Coimbatore | RentOMate",
    template: "%s | RentOMate",
  },
  description:
    "Rent an Akvinz RO+UV water purifier in Coimbatore with RentOMate. Choose flexible 12 or 24-month rental plans with installation and service support.",
  keywords: [
    "water purifier on rent in Coimbatore",
    "RO purifier rental",
    "Akvinz Ultron",
    "RentOMate",
  ],
  alternates: {
    canonical: "/",
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
            __html: JSON.stringify(businessData),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
