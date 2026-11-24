import type { Metadata } from "next";
import { BRAND, LOWEST_PRICE, inr } from "@/lib/site";

// Per-page metadata. Next.js replaces (not merges) the layout's openGraph and alternates when a page sets
// them, and pages that don't set them inherit the homepage's — so every page sets its own canonical and OG tags.

/** `images` is the link preview (WhatsApp, Facebook, X) for any page that doesn't set its own. */
export const OPEN_GRAPH_DEFAULTS = {
  siteName: BRAND.name,
  locale: "en_IN",
  images: { url: "/images/hero/rentomate-hero-branded.webp", width: 1536, height: 1024, alt: `${BRAND.name} RO water purifier on rent` },
} as const;

// The search phrase goes first in the title, since Google can cut long titles short.
export const HOME_TITLE = `${BRAND.name} – Water Purifier on Rent in Coimbatore from ${inr(LOWEST_PRICE)}/month`;
export const HOME_DESCRIPTION = `${BRAND.name} rents ISI certified RO water purifiers in Coimbatore from ${inr(LOWEST_PRICE)}/month. Free installation, free service and filter replacements, 7-day free trial.`;

/** True when a title already names the brand, in the current spelling or an old one (see BRAND.alternateNames). */
export const namesBrand = (title: string) => /rent\s*o['’]?\s*mate/i.test(title);

/**
 * `title` is the page name; the layout's template adds " | Rentomate" to <title>, and it's added here for og/twitter.
 * Pass `seoTitle` for a title that already names the brand; it's used as is, skipping the template.
 */
export function pageMetadata({ title, seoTitle, description, path }: { title: string; seoTitle?: string; description: string; path: string }): Metadata {
  const fullTitle = seoTitle ?? `${title} | ${BRAND.name}`;
  return {
    title: seoTitle ? { absolute: seoTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website", title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
