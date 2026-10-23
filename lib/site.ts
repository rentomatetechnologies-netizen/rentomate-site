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
  /** Short name, e.g. "Ultron+". */
  shortName: string;
  name: string;
  storageLitres: number;
  tdsAdjustment: boolean;
  /** Filtration components in the order water passes through them; one per purification stage. */
  stages: string[];
  colours: PurifierColour[];
  /** Products page card: line under the name, the coloured strip under the photo (and its Tailwind gradient), and an optional badge. */
  tagline: string;
  strip: string;
  accent: string;
  badge?: string;
};

/** "Alkaline, copper & zinc enrichment" from a purifier's enrichment stages (null if it has none). */
export function enrichmentSummary({ stages }: Purifier): string | null {
  const minerals = stages.filter((stage) => stage.endsWith(" enrichment")).map((stage) => stage.replace(" enrichment", ""));
  if (minerals.length === 0) return null;
  const list = minerals.length === 1 ? minerals[0] : `${minerals.slice(0, -1).join(", ")} & ${minerals[minerals.length - 1]}`;
  return `${list.charAt(0).toUpperCase()}${list.slice(1).toLowerCase()} enrichment`;
}

const BLACK = { id: "black", colour: "Midnight Black", swatch: "#111827" } as const;
const WHITE = { id: "white", colour: "Pearl White", swatch: "#ffffff" } as const;

/**
 * Every purifier we rent, each in black and white. Used by the home page carousel ("Our Product Range")
 * and the Products page cards ("Find the Purifier that is Right for You"). Every model rents on the same PLANS.
 */
export const PURIFIERS: Purifier[] = [
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
    tagline: "Our most advanced 9-stage purifier",
    strip: "RO + UF + UV · Alkaline, Copper & Zinc",
    accent: "from-[#051838] to-[#0070F3]",
    badge: "Bestseller",
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
    tagline: "8-stage RO with pre- and post-carbon",
    strip: "RO + UF + UV · Copper Enriched",
    accent: "from-sky-500 to-blue-600",
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
    tagline: "Triple protection with zinc, copper & alkaline",
    strip: "RO + UV · Alkaline, Zinc & Copper",
    accent: "from-slate-700 to-slate-900",
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
    tagline: "Largest 10 L storage for bigger families",
    strip: "10 L Storage · RO + UV · Alkaline, Zinc & Copper",
    accent: "from-orange-500 to-amber-500",
    badge: "Big family pick",
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
  { label: "About", href: "/about-us" },
  { label: "RO on Rent", href: "/ro-on-rent" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Refer & Earn", href: "/refer-and-earn" },
];
