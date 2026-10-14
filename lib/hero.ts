// Homepage hero content, managed in the admin panel (Homepage hero page) and fetched from rentomate-backend.
// Slides without an image are skipped; with none uploaded the hero shows DEFAULT_SLIDE.

export type HeroSlide = { image: string; alt: string };

export type HeroContent = {
  /** Carousel images on the right of the hero. */
  slides: HeroSlide[];
};

export const HERO_SLIDE_COUNT = 3;

/** Alt text used when the admin leaves a slide's description blank. */
export const DEFAULT_SLIDE_ALT = "RentOMate ambassador with Akvinz RO water purifiers in black and white, available on rent";

/** Shown when no carousel images are uploaded. */
export const DEFAULT_SLIDE: HeroSlide = { image: "/hero/rentomate-hero.webp", alt: DEFAULT_SLIDE_ALT };

export const DEFAULT_HERO: HeroContent = {
  slides: Array.from({ length: HERO_SLIDE_COUNT }, () => ({ image: "", alt: "" })),
};

const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");
const HERO_REVALIDATE_SECONDS = 300;

/** Always HERO_SLIDE_COUNT slides, with blank descriptions filled in. */
export function withHeroDefaults(saved?: Partial<HeroContent> | null): HeroContent {
  return {
    slides: DEFAULT_HERO.slides.map((_, index) => {
      const slide = saved?.slides?.[index];
      return { image: slide?.image?.trim() ?? "", alt: slide?.alt?.trim() || DEFAULT_SLIDE_ALT };
    }),
  };
}

/** Server-side: the saved hero, cached for a few minutes (refreshed instantly via /api/revalidate). */
export async function getHero(): Promise<HeroContent> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/public/hero`, { next: { revalidate: HERO_REVALIDATE_SECONDS } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return withHeroDefaults((await response.json()) as Partial<HeroContent>);
  } catch (error) {
    // Backend unreachable: show the built-in hero image rather than failing the homepage.
    console.error("Hero API request failed:", error);
    return DEFAULT_HERO;
  }
}
