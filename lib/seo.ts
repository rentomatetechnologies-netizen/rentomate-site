import type { Metadata } from "next";
import { BRAND } from "@/lib/site";

// Per-page metadata. Next.js replaces (not merges) the layout's openGraph and alternates when a page sets
// them, and pages that don't set them inherit the homepage's — so every page sets its own canonical and OG tags.

export const OPEN_GRAPH_DEFAULTS = { siteName: BRAND.name, locale: "en_IN" } as const;

export const HOME_TITLE = `${BRAND.name} | Water Purifier Rental in Coimbatore`;
export const HOME_DESCRIPTION =
  "RentOMate is a water purifier rental service in Coimbatore. Rent an ISI certified RO purifier on a 12 or 24-month plan, with free installation, servicing and filter replacements included.";

/** `title` is the page name; the layout's template adds " | RentOMate" to <title>, and it's added here for og/twitter. */
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
