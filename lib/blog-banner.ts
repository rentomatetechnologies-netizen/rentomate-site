// Promo banner shown inside every blog article, managed in the admin panel (Blog banner page).

export type BlogBanner = {
  enabled: boolean;
  image: string;
  alt: string;
  /** "" = not clickable, "lead" = opens the Rent Now form, otherwise a site path or http(s) URL. */
  link: string;
  /** The banner goes after this many paragraphs of the article. */
  afterParagraph: number;
};

/** With no image uploaded, the built-in RentOMate promo is shown. */
export const DEFAULT_BLOG_BANNER: BlogBanner = { enabled: true, image: "", alt: "", link: "lead", afterParagraph: 2 };

const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

/** Server-side: the saved banner, or null when it's switched off. Cached like the blog. */
export async function getBlogBanner(): Promise<BlogBanner | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/public/blog-banner`, { next: { revalidate: 300 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const banner = { ...DEFAULT_BLOG_BANNER, ...((await response.json()) as Partial<BlogBanner>) };
    return banner.enabled ? banner : null;
  } catch (error) {
    // Backend unreachable: still show the built-in promo.
    console.warn("Blog banner request failed:", (error as Error).message);
    return DEFAULT_BLOG_BANNER;
  }
}
