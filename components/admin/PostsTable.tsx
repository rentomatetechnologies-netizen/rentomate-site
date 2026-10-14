"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Search, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { formatDate } from "@/lib/admin/format";
import { useToast } from "@/components/admin/Toast";

export type PostRow = {
  id: number;
  slug: string;
  title: string;
  category: string;
  coverImage: string;
  publishedOn: string;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
};

export function PostsTable({ posts, onChange }: { posts: PostRow[]; onChange: () => void }) {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const q = query.trim().toLowerCase();
  const shown = posts.filter(
    (post) => (!status || post.status === status) && (!q || `${post.title} ${post.slug} ${post.category}`.toLowerCase().includes(q)),
  );

  async function remove(post: PostRow) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    try {
      await apiFetch(`/admin/posts/${post.id}`, { method: "DELETE" });
      toast("Post deleted");
      onChange();
    } catch (error) {
      toast((error as Error).message, true);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="panel p-0">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts…" aria-label="Search posts" className="input pl-9" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="input w-auto">
          <option value="">All posts</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Drafts</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="px-4 py-12 text-center text-sm text-slate-500">
          {posts.length ? "No posts match your search." : "No posts yet. Create your first one!"}
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {shown.map((post) => (
            <li key={post.id} className="grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-3 px-4 py-3.5 sm:grid-cols-[96px_1fr_auto]">
              {post.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.coverImage} alt="" className="aspect-[16/10] w-full rounded-lg object-cover" />
              ) : (
                <span className="flex aspect-[16/10] w-full items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-slate-100 text-[10px] font-semibold text-slate-400">
                  No image
                </span>
              )}
              <div className="min-w-0">
                <Link href={`/admin/posts/${post.id}`} className="line-clamp-2 font-bold text-navy hover:text-brand">
                  {post.title}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className={`badge ${post.status === "PUBLISHED" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                  {post.featured && <span className="badge bg-sky-100 text-sky-700">Featured</span>}
                  <span>{formatDate(post.publishedOn)}</span>
                  {post.category && <span>· {post.category}</span>}
                </div>
              </div>
              <div className="col-span-2 flex gap-1.5 sm:col-span-1">
                {post.status === "PUBLISHED" && (
                  <a href={`/blog/${post.slug}`} target="_blank" className="btn btn-sm" title="View on website">
                    <ExternalLink className="h-3.5 w-3.5" /> View
                  </a>
                )}
                <Link href={`/admin/posts/${post.id}`} className="btn btn-sm">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <button onClick={() => remove(post)} disabled={deleting === post.id} className="btn btn-sm btn-danger">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
