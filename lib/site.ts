// Single source of truth for Rent O' Mate plans, models and service areas.

import type { StaticImageData } from "next/image";
import metaNeoImage from "@/app/metaNeo.png";
import ultronPlusImage from "@/app/ultron.png";
import sparkImage from "@/app/spark.png";
import ultronImage from "@/app/ultronz.png";

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

export const PLAN_FEATURES = [
  "Multi-stage purification at ZERO machine cost",
  "Installation at zero charges, within 24–48 hrs",
  "Lifetime ZERO maintenance cost",
  "Free filter swaps when due",
  "Priority service support",
];

export type ProductModel = {
  id: string;
  name: string;
  colour: string;
  /** Any CSS background: a plain colour, or a gradient for two-tone bodies. */
  swatch: string;
  image: string;
};

export const MODELS: ProductModel[] = [
  { id: "black", name: "Akvinz Ultron", colour: "Midnight Black", swatch: "#111827", image: "/hero/purifier-transparent.png" },
  { id: "white", name: "Akvinz Ultron", colour: "Pearl White", swatch: "conic-gradient(from 270deg, #b4c3cf 0 25%, #ffffff 0)", image: "/hero/purifier-white.webp" },
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
