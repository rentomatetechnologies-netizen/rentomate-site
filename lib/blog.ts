// Blog articles are managed in the admin panel (rentomate-backend) and fetched from its API.
// Pages are cached and refreshed every few minutes, or instantly when the backend
// calls /api/revalidate after a post is saved.

export type BlogBlock =
  | { type: "paragraph" | "heading" | "quote"; text: string }
  | { type: "image"; url: string; alt: string; caption: string }
  | { type: "list"; items: string[] };

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
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    // Backend unreachable: render an empty blog rather than failing the whole build.
    console.error(`Blog API request failed for ${path}:`, error);
    return null;
  }
}

export const getPosts = async () => (await request<BlogPostSummary[]>("/posts")) ?? [];

export const getPost = (slug: string) => request<BlogPost>(`/posts/${encodeURIComponent(slug)}`);

// Uploaded images are served on this domain at /media/* (forwarded to the backend), so
// next/image can optimize them. Pasted external image URLs are shown as-is.
export const isOptimizableImage = (src: string) => src.startsWith("/media/");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
