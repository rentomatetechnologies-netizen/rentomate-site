// Single source of truth for Rent O' Mate plans, models and service areas.

import type { StaticImageData } from "next/image";
import metaNeoImage from "@/assets/images/products/metaNeoRoBlack.png";
import metaNeoWhiteImage from "@/assets/images/products/metaNeoRoWhite.png";
import ultronPlusImage from "@/assets/images/products/ultron+RoBlack.png";
import sparkImage from "@/assets/images/products/spark+roWhite.png";
import sparkBlackImage from "@/assets/images/products/spark+roBlack.png";
import ultronImage from "@/assets/images/products/ultron+RoWhite.png";

export const SITE_URL = "https://rentomate.life";

/** Rent O' Mate is the consumer brand; Akvinz Water Purifiers is the business that operates it. */
export const BRAND = {
  name: "Rent O' Mate",
  alternateNames: ["RentOMate", "Rent O Mate", "Rentomate"],
  operator: "Akvinz Water Purifiers",
};

export const CUSTOMER_FORM_URL = "https://app.akvinz.com/customerForm";

export type Plan = {
  months: 12 | 24;
  price: number;
  deposit: number;
  name: string;
  tagline: string;
  popular: boolean;
};

export const PLANS: Plan[] = [
  { months: 24, price: 449, deposit: 3999, name: "Smart Saver", tagline: "Most popular", popular: true },
  { months: 12, price: 699, deposit: 2999, name: "Easy Flexi", tagline: "Flexible commitment", popular: false },
];

export const LOWEST_PRICE = Math.min(...PLANS.map((plan) => plan.price));
// ₹449/month works out to roughly ₹15 a day.
export const PRICE_PER_DAY = Math.round(LOWEST_PRICE / 30);

/** The floating "happy customers" badge (bottom-left) starts at this count on this date (IST)... */
const HAPPY_CUSTOMERS_BASE = 1956;
const HAPPY_CUSTOMERS_SINCE = Date.UTC(2026, 9, 22);
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/** ...and grows by 0–5 each day. The step is derived from the day number, so every visitor sees the same count and it never goes down. */
const dailyStep = (day: number) => {
  let x = Math.imul(day + 1, 0x9e3779b1) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) % 6;
};

export function happyCustomers(now: Date = new Date()): number {
  const days = Math.floor((now.getTime() + IST_OFFSET_MS - HAPPY_CUSTOMERS_SINCE) / DAY_MS);
  let total = HAPPY_CUSTOMERS_BASE;
  for (let day = 1; day <= days; day++) total += dailyStep(day);
  return total;
}

export const PLAN_FEATURES = [
  "Multi-stage purification at ZERO machine cost",
  "Installation at zero charges, within 24–48 hrs",
  "Lifetime ZERO maintenance cost",
  "Free filter swaps when due",
  "Priority service support",
];

export type PurifierColour = {
  id: "black" | "white";
  colour: string;
  /** Any CSS background: a plain colour, or a gradient for two-tone bodies. */
  swatch: string;
  image: StaticImageData | string;
};

export type Purifier = {
  id: string;
  brand: string;
  /** Short name for the model switch, e.g. "Ultron+". */
  shortName: string;
  name: string;
  storageLitres: number;
  tdsAdjustment: boolean;
  /** Filtration components in the order water passes through them; one per purification stage. */
  stages: string[];
  colours: PurifierColour[];
};

const BLACK = { id: "black", colour: "Midnight Black", swatch: "#111827" } as const;
const WHITE = { id: "white", colour: "Pearl White", swatch: "#ffffff" } as const;

/** The purifiers on the home page ("Our Product Range"), each in black and white. */
export const FEATURED_PURIFIERS: Purifier[] = [
  {
    id: "ultron-plus",
    brand: "Akvinz",
    shortName: "Ultron+",
    name: "Ultron+ RO Water Purifier",
    storageLitres: 8,
    tdsAdjustment: true,
    stages: [
      "Spun filter",
      "Sediment filter",
      "Pre-carbon filter",
      "RO membrane",
      "Ultrafiltration (UF)",
      "In-tank UV",
      "Alkaline enrichment",
      "Copper enrichment",
      "Zinc enrichment",
    ],
    colours: [
      { ...BLACK, image: ultronPlusImage },
      { ...WHITE, image: ultronImage },
    ],
  },
  {
    // Same body (and photos) as the Ultron+.
    id: "ultron",
    brand: "Akvinz",
    shortName: "Ultron",
    name: "Ultron RO Water Purifier",
    storageLitres: 8,
    tdsAdjustment: true,
    stages: [
      "Spun filter",
      "Sediment filter",
      "Pre-carbon filter",
      "RO membrane",
      "Ultrafiltration (UF)",
      "Post-carbon filter",
      "In-tank UV",
      "Copper enrichment",
    ],
    colours: [
      { ...BLACK, image: ultronPlusImage },
      { ...WHITE, image: ultronImage },
    ],
  },
  {
    id: "metaneo",
    brand: "Akvinz",
    shortName: "Metaneo",
    name: "Metaneo RO Water Purifier",
    storageLitres: 8,
    tdsAdjustment: true,
    stages: [
      "Spun filter",
      "Sediment filter",
      "RO membrane",
      "Activated carbon",
      "UV treatment",
      "Alkaline enrichment",
      "Zinc enrichment",
      "Copper enrichment",
    ],
    colours: [
      { ...BLACK, image: metaNeoImage },
      { ...WHITE, image: metaNeoWhiteImage },
    ],
  },
  {
    id: "spark",
    brand: "Akvinz",
    shortName: "Spark",
    name: "Spark RO Water Purifier",
    storageLitres: 10,
    tdsAdjustment: true,
    stages: [
      "Spun filter",
      "Sediment filter",
      "RO membrane",
      "Activated carbon",
      "UV treatment",
      "Alkaline enrichment",
      "Zinc enrichment",
      "Copper enrichment",
    ],
    colours: [
      { ...BLACK, image: sparkBlackImage },
      { ...WHITE, image: sparkImage },
    ],
  },
];

export type CatalogProduct = {
  id: string;
  name: string;
  /** Short line under the name, e.g. who it suits. */
  tagline: string;
  capacityLitres: number;
  /** Line on the coloured strip under the photo. */
  strip: string;
  /** Tailwind gradient classes for that strip. */
  accent: string;
  /** Leave unset until there's a photo; a placeholder shows instead. */
  image?: StaticImageData | string;
  badge?: string;
  features: string[];
};

/** The purifier range on the Products page. Every model rents on the same plans (see PLANS). */
export const PRODUCTS: CatalogProduct[] = [
  {
    id: "metaneo",
    name: "Metaneo RO Water Purifier",
    tagline: "Bold dark finish for modern kitchens",
    capacityLitres: 8,
    strip: "RO Purifier with Essential Minerals",
    accent: "from-slate-700 to-slate-900",
    image: metaNeoImage,
    features: ["Storage Tank of 8L Capacity", "Multi-stage RO purification", "Free installation & maintenance"],
  },
  {
    id: "ultron-plus",
    name: "ULTRON+ RO Water Purifier",
    tagline: "Premium black edition of the Ultron",
    capacityLitres: 8,
    strip: "RO + UV + UF + Copper Enriched",
    accent: "from-[#051838] to-[#0070F3]",
    image: ultronPlusImage,
    badge: "Bestseller",
    features: ["Storage Tank of 8L Capacity", "8-stage purification with copper", "Free installation & maintenance"],
  },
  {
    id: "spark",
    name: "Spark RO Water Purifier",
    tagline: "Largest storage for bigger families",
    capacityLitres: 10,
    strip: "10L Storage for Larger Homes",
    accent: "from-orange-500 to-amber-500",
    image: sparkImage,
    badge: "Big family pick",
    features: ["Storage Tank of 10L Capacity", "Multi-stage RO purification", "Free installation & maintenance"],
  },
  {
    id: "ultron",
    name: "ULTRON Water Purifier",
    tagline: "Clean white finish for bright kitchens",
    capacityLitres: 8,
    strip: "RO + UV + UF + Copper Enriched",
    accent: "from-sky-500 to-blue-600",
    image: ultronImage,
    features: ["Storage Tank of 8L Capacity", "8-stage purification with copper", "Free installation & maintenance"],
  },
];

export const KEY_SPECS = [
  { title: "8-Stage Purification", desc: "RO + UV + UF + TDS control" },
  { title: "Copper & Minerals", desc: "Copper enriched, essential minerals retained" },
  { title: "pH Balanced Alkaline", desc: "Fresh, great-tasting water" },
  { title: "8 L Storage", desc: "Food-grade storage tank" },
  { title: "ISI Certified", desc: "Certified quality machines" },
];

export type City = { name: string; live: boolean; areas: string[] };

export const CITIES: City[] = [
  {
    name: "Coimbatore",
    live: true,
    areas: [
      "RS Puram", "Gandhipuram", "Peelamedu", "Saravanampatti", "Saibaba Colony", "Singanallur",
      "Ramanathapuram", "Vadavalli", "Kovaipudur", "Thudiyalur", "Hopes College", "Ganapathy",
      "Kalapatti", "Sundarapuram", "Ukkadam", "Race Course", "Town Hall", "Podanur",
      "Kuniyamuthur", "Perur", "Chitra / Airport Area",
    ],
  },
];

export const DEFAULT_CITY = CITIES[0].name;

/** Cities Rent O' Mate serves: the header location picker and the "Where We Serve" section. */
export const SERVICE_LOCATIONS = [
  "Coimbatore",
  "Tiruppur",
  "Erode",
  "Salem",
  "Pollachi",
  "Hosur",
  "Karur",
  "Trichy",
  "Madurai",
  "Karaikudi",
  "Ooty",
  "Tirunelveli",
  "Puducherry",
  "Chengalpattu",
];

/** Other names and spellings people type for the cities above. */
const CITY_ALIASES: Record<string, string> = {
  kovai: "Coimbatore",
  cbe: "Coimbatore",
  tirupur: "Tiruppur",
  thiruppur: "Tiruppur",
  tiruchirappalli: "Trichy",
  tiruchirapalli: "Trichy",
  tiruchi: "Trichy",
  trichirappalli: "Trichy",
  pondicherry: "Puducherry",
  pondy: "Puducherry",
  udhagamandalam: "Ooty",
  udhagai: "Ooty",
  ootacamund: "Ooty",
  nellai: "Tirunelveli",
  thirunelveli: "Tirunelveli",
  chengalpet: "Chengalpattu",
  madura: "Madurai",
};

const normalizePlace = (value: string) => value.toLowerCase().replace(/[^a-z]/g, "");

// Coimbatore and Tiruppur pincodes (641xxx); both are served.
const SERVED_PINCODE_PREFIXES = ["641"];

/**
 * The served city a visitor means, from what they typed in the "Don't see your city?" form: a city above, one of its
 * other names, a Coimbatore area, or a served pincode. Returns null when we don't serve them yet.
 */
export function findServedCity(city: string, pincode = ""): string | null {
  const typed = normalizePlace(city);
  if (typed) {
    const direct = SERVICE_LOCATIONS.find((name) => normalizePlace(name) === typed);
    if (direct) return direct;
    if (CITY_ALIASES[typed]) return CITY_ALIASES[typed];
    const byArea = CITIES.find((entry) => entry.areas.some((area) => normalizePlace(area) === typed));
    if (byArea) return byArea.name;
  }
  return SERVED_PINCODE_PREFIXES.some((prefix) => pincode.trim().startsWith(prefix)) ? DEFAULT_CITY : null;
}

/** The plans section on the home page. The old /water-purifier-rental-coimbatore page redirects to the home page (next.config.ts). */
export const PLANS_PAGE_PATH = "/#plans";

export const inr =(value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

/** Footer bottom-bar links; also listed in the sitemaps. */
export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Sitemap", href: "/site-map" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "RO on Rent", href: "/ro-on-rent" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Refer & Earn", href: "/refer-and-earn" },
];
