// Landing pages for the footer's "Popular searches". Each search phrase gets its own page at /rent/<slug>
// with its own title, description and copy; the plans, how-it-works and FAQ sections are shared.

import { LOWEST_PRICE, PRICE_PER_DAY } from "@/lib/site";

export type SeoPage = {
  slug: string;
  /** The phrase shown in the footer's Popular searches. */
  search: string;
  /** <title> and meta description. */
  title: string;
  metaDescription: string;
  eyebrow: string;
  /** Page heading; `highlight` is shown in brand blue after `lead`. */
  heading: { lead: string; highlight: string };
  description: string;
  intro: string[];
  highlights: string[];
};

const price = `₹${LOWEST_PRICE}/month`;

const areaPage = (area: string, slug: string): SeoPage => ({
  slug,
  search: `Water purifier on rent in ${area}`,
  title: `Water Purifier on Rent in ${area}, Coimbatore`,
  metaDescription: `Rent an RO water purifier in ${area}, Coimbatore from ${price}. Free installation, free filter changes and free service, with installation in 24–48 hours.`,
  eyebrow: `${area}, Coimbatore`,
  heading: { lead: "Water purifier on rent in", highlight: area },
  description: `Pure, 8-stage purified drinking water for homes in ${area} — no machine to buy, nothing to maintain. Plans start at ${price}.`,
  intro: [
    `RentOMate installs Akvinz RO water purifiers in homes across ${area} and the rest of Coimbatore. You pay a small monthly rent instead of buying the machine, and installation, servicing and filter replacements are included for as long as you rent.`,
    `Our team is based in Coimbatore, so installation in ${area} is usually done within 24–48 hours of booking, and service visits are quick when you need them.`,
  ],
  highlights: [
    `Installation in ${area} within 24–48 hours`,
    "8-stage RO + UV + UF purification with TDS control",
    "Free filter changes and service while you rent",
    "7-day risk-free trial",
  ],
});

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "water-purifier-on-rent-coimbatore",
    search: "Water purifier on rent in Coimbatore",
    title: "Water Purifier on Rent in Coimbatore",
    metaDescription: `Rent an RO water purifier in Coimbatore from ${price}. Zero machine cost, free installation, lifetime free service and filter changes.`,
    eyebrow: "Coimbatore",
    heading: { lead: "Water purifier on rent in", highlight: "Coimbatore" },
    description: `Get an ISI certified Akvinz RO purifier at home for a small monthly rent — from ${price}, with installation, service and filters included.`,
    intro: [
      "RentOMate is a water purifier rental service from Akvinz Water Purifiers, based in Coimbatore. Instead of paying for a machine up front, you rent one for a fixed monthly fee and we take care of everything else.",
      "Installation is free and usually done within 24–48 hours. Servicing and filter replacements are included for as long as you rent, so there are no surprise repair or AMC bills.",
    ],
    highlights: ["Zero machine and installation cost", "Lifetime free maintenance and filter changes", "ISI certified Akvinz purifiers", "7-day risk-free trial"],
  },
  {
    slug: "ro-water-purifier-rental-coimbatore",
    search: "RO water purifier rental Coimbatore",
    title: "RO Water Purifier Rental in Coimbatore",
    metaDescription: `RO water purifier rental in Coimbatore from ${price}: 8-stage RO + UV + UF purification with copper, minerals and pH-balanced water.`,
    eyebrow: "RO purifier rental",
    heading: { lead: "RO water purifier rental in", highlight: "Coimbatore" },
    description: "Rent a purifier with 8-stage RO + UV + UF purification and TDS control — the same technology you would buy, without the purchase price.",
    intro: [
      "Every RentOMate purifier uses reverse osmosis together with UV and UF stages and TDS control, then adds copper and essential minerals back and balances the pH, so the water is both safe and pleasant to drink.",
      `Renting gives you that technology from ${price}. We install it, service it and replace the filters when they are due, so the purifier keeps performing the way it did on day one.`,
    ],
    highlights: ["RO + UV + UF with TDS control", "Copper and essential minerals retained", "pH-balanced alkaline water", "8 L food-grade storage tank"],
  },
  {
    slug: "rent-ro-purifier-coimbatore",
    search: "Rent RO purifier in Coimbatore",
    title: "Rent an RO Purifier in Coimbatore",
    metaDescription: `Rent an RO purifier in Coimbatore in a few simple steps. Choose a 12 or 24-month plan from ${price}; we install within 24–48 hours.`,
    eyebrow: "How to rent",
    heading: { lead: "Rent an RO purifier in", highlight: "Coimbatore" },
    description: "Choose a plan, share your address and we install the purifier at your home — usually within 24–48 hours.",
    intro: [
      "Renting with RentOMate takes a few minutes. Pick the 24-month Smart Saver or the 12-month Easy Flexi plan, tell us where you live, and our team schedules the installation.",
      "There is no machine cost and no installation charge. A refundable security deposit applies, and your monthly rent covers servicing and filter replacements for the whole plan.",
    ],
    highlights: ["Choose a 12 or 24-month plan", "Free installation within 24–48 hours", "Refundable security deposit", "Service and filters included in the rent"],
  },
  {
    slug: "ro-on-rent-near-me",
    search: "RO on rent near me",
    title: "RO on Rent Near Me",
    metaDescription: `Looking for RO on rent near you? RentOMate rents RO water purifiers from ${price} with free installation and a local service team.`,
    eyebrow: "Near you",
    heading: { lead: "RO on rent", highlight: "near you" },
    description: "A local team that installs, services and supports your purifier — with plans from " + price + ".",
    intro: [
      "RentOMate has its team on the ground, so installation and service visits are quick. Check your area to confirm we cover your address, then book and we will schedule the installation.",
      "Your rent covers servicing and filter changes, so when you need help you contact us — there is no separate AMC to buy and no technician to find.",
    ],
    highlights: ["Local installation and service team", "Installation within 24–48 hours", "No separate AMC to buy", "Check availability for your address"],
  },
  {
    slug: "water-purifier-rental-for-tenants",
    search: "Water purifier rental for tenants",
    title: "Water Purifier Rental for Tenants",
    metaDescription: `A water purifier on rent is ideal for tenants: no machine to buy, relocation support when you move, and plans from ${price}.`,
    eyebrow: "For tenants",
    heading: { lead: "Water purifier rental for", highlight: "tenants" },
    description: "Safe drinking water in a rented home, without buying a machine you will have to carry to your next house.",
    intro: [
      "When you live in a rented home, buying a purifier means paying for a machine, then paying again to uninstall and reinstall it every time you move. Renting avoids both.",
      "RentOMate includes relocation support with your plan, along with servicing and filter changes, so the purifier moves with you and keeps working without extra costs.",
    ],
    highlights: ["No machine to buy", "Relocation support when you move", "Choose a 12-month plan for flexibility", "Service and filters included"],
  },
  {
    slug: "monthly-rental-water-purifier",
    search: "Monthly rental water purifier",
    title: "Monthly Rental Water Purifier",
    metaDescription: `Rent a water purifier for a fixed monthly fee from ${price}. One predictable payment covers the machine, service and filters.`,
    eyebrow: "Monthly plans",
    heading: { lead: "Water purifier for a", highlight: "monthly rent" },
    description: `One fixed monthly payment — from ${price} — covers the purifier, its servicing and its filters.`,
    intro: [
      "Owning a purifier means a large purchase up front followed by filter changes, service visits and the occasional repair. A monthly rental turns all of that into a single, predictable fee.",
      "Choose the 24-month Smart Saver for the lowest monthly price, or the 12-month Easy Flexi plan for a shorter commitment.",
    ],
    highlights: [`24-month Smart Saver from ${price}`, "12-month Easy Flexi plan", "No repair or AMC bills", `Works out to about ₹${PRICE_PER_DAY} a day`],
  },
  {
    slug: "copper-ro-purifier-on-rent",
    search: "Copper RO purifier on rent",
    title: "Copper RO Purifier on Rent",
    metaDescription: `Rent a copper-enriched RO water purifier from ${price}: 8-stage purification with copper and essential minerals retained.`,
    eyebrow: "Copper enriched",
    heading: { lead: "Copper RO purifier", highlight: "on rent" },
    description: "RO purification with copper enrichment and essential minerals retained, for water that is safe and tastes fresh.",
    intro: [
      "Reverse osmosis removes impurities very effectively, but it can also strip out minerals. RentOMate purifiers add copper and retain essential minerals after purification, so the water you drink is not flat or empty.",
      `You get this copper-enriched purifier on rent from ${price}, with installation, servicing and filter changes included.`,
    ],
    highlights: ["Copper enrichment", "Essential minerals retained", "8-stage RO + UV + UF purification", "Free filter changes while you rent"],
  },
  {
    slug: "alkaline-water-purifier-on-rent",
    search: "Alkaline water purifier on rent",
    title: "Alkaline Water Purifier on Rent",
    metaDescription: `Rent an alkaline water purifier from ${price}: pH-balanced, mineral-rich drinking water with 8-stage RO purification.`,
    eyebrow: "pH balanced",
    heading: { lead: "Alkaline water purifier", highlight: "on rent" },
    description: "pH-balanced alkaline drinking water from an 8-stage RO purifier — without buying the machine.",
    intro: [
      "RentOMate purifiers balance the pH of the water after purification, giving you fresh, alkaline drinking water for your family every day.",
      `Along with pH balancing, each purifier adds copper and retains essential minerals. Plans start at ${price} and include installation, servicing and filters.`,
    ],
    highlights: ["pH-balanced alkaline water", "Copper and minerals retained", "8-stage RO + UV + UF purification", "ISI certified machine"],
  },
  areaPage("Saravanampatti", "water-purifier-on-rent-saravanampatti"),
  areaPage("Peelamedu", "water-purifier-on-rent-peelamedu"),
  areaPage("RS Puram", "water-purifier-on-rent-rs-puram"),
  areaPage("Gandhipuram", "water-purifier-on-rent-gandhipuram"),
];

export const seoPageHref = (page: SeoPage) => `/rent/${page.slug}`;

export const getSeoPage = (slug: string) => SEO_PAGES.find((page) => page.slug === slug);
