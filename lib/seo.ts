import type { Metadata } from "next";
import { BRAND, LOWEST_PRICE, inr } from "@/lib/site";

// Per-page metadata. Next.js replaces (not merges) the layout's openGraph and alternates when a page sets
// them, and pages that don't set them inherit the homepage's — so every page sets its own canonical and OG tags.

export const OPEN_GRAPH_DEFAULTS = { siteName: BRAND.name, locale: "en_IN" } as const;

// The search phrase goes first in the title, since Google can cut long titles short.
export const HOME_TITLE = `Water Purifier on Rent in Coimbatore from ${inr(LOWEST_PRICE)}/month | ${BRAND.name}`;
export const HOME_DESCRIPTION = `Rent an ISI certified RO water purifier in Coimbatore from ${inr(LOWEST_PRICE)}/month. Free installation, free service and filter replacements, 7-day free trial. ${BRAND.name}, RO on rent near you.`;

/** `title` is the page name; the layout's template adds " | Rent O' Mate" to <title>, and it's added here for og/twitter. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${BRAND.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website", title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
