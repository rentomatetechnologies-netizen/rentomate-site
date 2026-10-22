// Blog articles are managed in the admin panel (rentomate-backend) and fetched from its API.
// Pages are cached and refreshed every few minutes, or instantly when the backend
// calls /api/revalidate after a post is saved.

export type BlogBlock =
  | { type: "paragraph" | "heading" | "quote"; text: string }
  | { type: "image"; url: string; alt: string; caption: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "cta"; text: string; buttonLabel: string }
  | { type: "toc" };

export type BlogPostSummary = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  date: string; // ISO date
  readMinutes: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
};

export type BlogPost = BlogPostSummary & { blocks: BlogBlock[] };

const API_URL = `${(process.env.BACKEND_URL || "http://localhost:4000").replace(/\/$/, "")}/api/public`;
export const BLOG_REVALIDATE_SECONDS = 300;

async function request<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, { next: { revalidate: BLOG_REVALIDATE_SECONDS } });
    if (!response.ok) {
      if (response.status !== 404) {
        console.warn(`Blog API returned HTTP ${response.status} for ${path}. Showing fallback.`);
      }
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    // Backend unreachable: render an empty blog rather than failing the whole build.
    console.warn(`Blog API request failed for ${path}:`, (error as Error).message);
    return null;
  }
}

export const getPosts = async () => (await request<BlogPostSummary[]>("/posts")) ?? [];

export const getPost = (slug: string) => request<BlogPost>(`/posts/${encodeURIComponent(slug)}`);

// Uploaded images (/media/*) and local static images (/banners/*, /hero/*) are optimized by next/image.
export const isOptimizableImage = (src: string) => src.startsWith("/");

/** Titles may contain line breaks (Shift+Enter in the editor); use this where a single line is needed (meta tags, structured data). */
export const plainTitle = (title: string) => title.replace(/\s*\n\s*/g, " ");

/** Google shows ~160 characters of a meta description; cut long excerpts at a word boundary. */
export const metaDescription = (post: Pick<BlogPostSummary, "seoDescription" | "excerpt">, max = 160) => {
  const text = (post.seoDescription || post.excerpt).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,.;:–—-]+$/, "")}…`;
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/* ---------- template helpers ---------- */

export const POSTS_PER_PAGE = 10;

export const BLOG_DESCRIPTION =
  "Simple guides on RO purifiers, filters, water quality and healthy drinking habits from the Rent O' Mate team.";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const categorySlug = (name: string) => toSlug(name) || "general";
export const categoryHref = (name: string) => `/blog/category/${categorySlug(name)}`;

/** Category names with post counts, most-used first. */
export const getCategories = (posts: BlogPostSummary[]) => {
  const counts = new Map<string, number>();
  for (const post of posts) if (post.category) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, slug: categorySlug(name), count })).sort((a, b) => b.count - a.count);
};

/** A category (by URL slug) with all posts and that category's posts, or null if no post uses it. */
export async function getCategoryListing(slug: string) {
  const posts = await getPosts();
  const category = getCategories(posts).find((c) => c.slug === slug);
  return category ? { category, posts, inCategory: posts.filter((post) => categorySlug(post.category) === slug) } : null;
}

/** Newest first, regardless of the "featured" flag the API sorts by. */
export const byNewest = (posts: BlogPostSummary[]) =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

export const paginate = <T,>(items: T[], page: number) => ({
  items: items.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
  totalPages: Math.max(1, Math.ceil(items.length / POSTS_PER_PAGE)),
});

/** The "Heading" blocks of a post, with unique anchor ids for the table of contents. */
export const getHeadings = (blocks: BlogBlock[]) => {
  const used = new Map<string, number>();
  return blocks.flatMap((block, index) => {
    if (block.type !== "heading") return [];
    const base = toSlug(block.text) || "section";
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return [{ index, text: block.text, id: n ? `${base}-${n + 1}` : base }];
  });
};

/** Previous (older) and next (newer) posts, and up to 3 related posts from the same category. */
export const getNeighbours = (all: BlogPostSummary[], slug: string) => {
  const posts = byNewest(all);
  const i = posts.findIndex((post) => post.slug === slug);
  const current = posts[i];
  const others = posts.filter((post) => post.slug !== slug);
  const sameCategory = current?.category ? others.filter((post) => post.category === current.category) : [];
  const related = [...sameCategory, ...others.filter((post) => !sameCategory.includes(post))].slice(0, 3);
  return {
    previous: i >= 0 ? posts[i + 1] : undefined,
    next: i > 0 ? posts[i - 1] : undefined,
    related,
  };
};
