// Post types used by the admin editor. Validation happens on the backend (src/validation/post.schema.ts).

export type Block =
  | { type: "paragraph" | "heading" | "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string; caption: string }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "cta"; text: string; buttonLabel: string }
  | { type: "toc" };

export type BlockType = Block["type"];

// Editor blocks carry a `key` so React can track them while reordering; the backend strips it.
export type EditorBlock = Block & { key: string };

export type PostStatus = "DRAFT" | "PUBLISHED";

export type EditorPost = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  publishedOn: string;
  readMinutes: string;
  status: PostStatus;
  featured: boolean;
  blocks: EditorBlock[];
  seoTitle: string;
  seoDescription: string;
};

/** A post as returned by GET /api/admin/posts/:id. */
export type AdminPost = Omit<EditorPost, "id" | "readMinutes" | "blocks"> & {
  id: number;
  readMinutes: number;
  blocks: Block[];
  updatedAt: string;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

export const newKey = () => Math.random().toString(36).slice(2, 10);

export const withKeys = (blocks: Block[]): EditorBlock[] => blocks.map((block) => ({ ...block, key: newKey() }) as EditorBlock);

export const toEditorPost = (post: AdminPost): EditorPost => ({ ...post, readMinutes: String(post.readMinutes), blocks: withKeys(post.blocks) });
