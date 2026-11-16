import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { RentalPlans } from "@/components/RentalPlans";
import { HowItWorks } from "@/components/HowItWorks";
import { FreeTrial } from "@/components/FreeTrial";
import { FaqSection } from "@/components/FaqSection";
import { RentNowButton } from "@/components/RentNowButton";
import { BRAND, LOWEST_PRICE, PLANS, PURIFIERS, SITE_URL } from "@/lib/site";

// The main page for "RO water purifier on rent in Coimbatore". The old Coimbatore landing pages redirect here
// (next.config.ts), and their copy lives in the intro below.

export const metadata: Metadata = pageMetadata({
  title: "RO Water Purifier on Rent",
  seoTitle: "RO Water Purifier on Rent in Coimbatore | RentOMate",
  description: `Rent an ISI certified 8-stage RO water purifier in Coimbatore from ₹${LOWEST_PRICE}/month. Free installation, free service and filter changes, 7-day free trial.`,
  path: "/ro-on-rent",
});

const featured = PURIFIERS[0];
const featuredImage = featured.colours[0].image;

// schema.org Service, not Product: this page sells the rental (every model, on every plan), not one purifier.
// Per-model Product data lives on /products. The image is this page's photo, which Google can use as a thumbnail.
const serviceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/ro-on-rent#service`,
  name: "RO water purifier on rent in Coimbatore",
  serviceType: "Water purifier rental",
  description: `Monthly rental of ISI certified Akvinz RO water purifiers in Coimbatore, with free installation, servicing and filter replacements included in the rent.`,
  url: `${SITE_URL}/ro-on-rent`,
  image: typeof featuredImage === "string" ? featuredImage : `${SITE_URL}${featuredImage.src}`,
  provider: { "@id": `${SITE_URL}/#business` },
  areaServed: { "@type": "City", name: "Coimbatore" },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `${plan.months}-month ${plan.name} rental plan`,
    url: `${SITE_URL}/ro-on-rent`,
    price: plan.price,
    priceCurrency: "INR",
    priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitCode: "MON", unitText: "MONTH" },
    businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
    availability: "https://schema.org/InStock",
  })),
};

const highlights = [
  "Zero machine and installation cost",
  "Installation in Coimbatore within 24–48 hours",
  "RO + UV + UF with TDS control",
  "Copper, minerals and pH-balanced alkaline water",
  "Service and filter changes included in the rent",
  "7-day risk-free trial",
];

export default function RoOnRentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }} />
      <PageHeader
        eyebrow="RO on Rent"
        breadcrumbs={[{ label: "RO on Rent", href: "/ro-on-rent" }]}
        title={<>RO water purifier on rent, <span className="text-[#0084FF]">from ₹{LOWEST_PRICE}/month</span></>}
        description="Zero machine cost, free installation, lifetime free maintenance and filter replacements at no cost. Pick a plan and we'll install within 24–48 hours."
      />

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="space-y-4 text-justify text-base leading-7 text-slate-600 lg:col-span-7">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#051838]">Water purifier rental in Coimbatore</h2>
            <p>
              {BRAND.name} is a water purifier rental service from {BRAND.operator}, based in Coimbatore. Instead of paying for a
              machine up front, you rent an ISI certified Akvinz RO purifier for a fixed monthly fee and we take care of everything else.
            </p>
            <p>
              Every purifier uses reverse osmosis together with UV and UF stages and TDS control, then adds copper and essential minerals
              back and balances the pH, so the water is both safe and pleasant to drink.
            </p>
            <p>
              Renting takes a few minutes. Pick the 24-month Smart Saver or the 12-month Easy Flexi plan, tell us where you live, and our
              team installs the purifier, usually within 24–48 hours. There is no machine cost and no installation charge. A refundable
              security deposit applies, and your monthly rent covers servicing and filter replacements for the whole plan, so there are no
              surprise repair or AMC bills.
            </p>
            <ul className="grid gap-3 pt-2 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-left text-sm font-semibold text-[#051838]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <RentNowButton>Rent Now</RentNowButton>
            </div>
          </div>
          <div className="rounded-[10px] border border-sky-100 bg-sky-50/60 p-6 lg:col-span-5">
            <Image
              src={featuredImage}
              alt={`${featured.brand} ${featured.name} on rent in Coimbatore`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mx-auto h-auto w-full max-w-sm"
              preload
            />
          </div>
        </div>
      </section>

      <RentalPlans />
      <HowItWorks />
      <FreeTrial />
      <FaqSection />
    </>
  );
}
