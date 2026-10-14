// Single source of truth for RentOMate plans, models and service areas.

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
  swatch: string;
  image: string;
};

export const MODELS: ProductModel[] = [
  { id: "black", name: "Akvinz Ultron", colour: "Midnight Black", swatch: "#111827", image: "/hero/purifier-transparent.png" },
  { id: "white", name: "Akvinz Ultron", colour: "Pearl White", swatch: "#f1f5f9", image: "/hero/purifier-white.webp" },
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

/** Cities RentOMate serves: the header location picker and the "Where We Serve" section. */
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

export const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "RO on Rent", href: "/ro-on-rent" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Refer & Earn", href: "/refer-and-earn" },
];
