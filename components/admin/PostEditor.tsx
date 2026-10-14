"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, Loader2, Save, Trash2, X } from "lucide-react";
import { apiFetch } from "@/lib/admin/api";
import { newKey, slugify, type BlockType, type EditorBlock, type EditorPost } from "@/lib/admin/posts";
import { ImageField } from "@/components/admin/ImageField";
import { PostPreview } from "@/components/admin/PostPreview";
import { useToast } from "@/components/admin/Toast";

const BLOCK_LABELS: Record<BlockType, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  quote: "Quote",
  list: "Bullet list",
  image: "Image",
};

const newBlock = (type: BlockType): EditorBlock => {
  const key = newKey();
  if (type === "image") return { type, url: "", alt: "", caption: "", key };
  if (type === "list") return { type, items: [], key };
  return { type, text: "", key };
};

export function PostEditor({ initial }: { initial: EditorPost }) {
  const router = useRouter();
  const toast = useToast();
  const [post, setPost] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  // A new post's slug follows the title until the slug is edited by hand.
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const isNew = !initial.id;
  // What the website currently shows, for the "View" link.
  const [live, setLive] = useState({ status: initial.status, slug: initial.slug });

  const update = (patch: Partial<EditorPost>) => {
    setPost((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const updateBlock = (key: string, patch: Partial<EditorBlock>) =>
    update({ blocks: post.blocks.map((block) => (block.key === key ? ({ ...block, ...patch } as EditorBlock) : block)) });

  const moveBlock = (index: number, delta: number) => {
    const blocks = [...post.blocks];
    [blocks[index], blocks[index + delta]] = [blocks[index + delta], blocks[index]];
    update({ blocks });
  };

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const saved = await apiFetch<{ id: number; slug: string; status: string }>(isNew ? "/admin/posts" : `/admin/posts/${initial.id}`, {
        method: isNew ? "POST" : "PUT",
        body: post,
      });
      setDirty(false);
      toast(saved.status === "PUBLISHED" ? "Saved – live on the website" : "Saved as draft");
      if (isNew) {
        router.replace(`/admin/posts/${saved.id}`);
      } else {
        setPost((current) => ({ ...current, slug: saved.slug }));
        setLive({ status: saved.status as EditorPost["status"], slug: saved.slug });
      }
    } catch (error) {
      toast((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }, [initial.id, isNew, post, router, toast]);

  async function deletePost() {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await apiFetch(`/admin/posts/${initial.id}`, { method: "DELETE" });
      setDirty(false);
      toast("Post deleted");
      router.replace("/admin/posts");
    } catch (error) {
      toast((error as Error).message, true);
    }
  }

  // Warn before closing the tab with unsaved changes; Ctrl/Cmd+S saves.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    const keydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      window.removeEventListener("keydown", keydown);
    };
  }, [dirty]);

  const field = (label: string, id: string, input: React.ReactNode, hint?: string) => (
    <div>
      <label htmlFor={id} className="label">
        {label} {hint && <span className="font-normal text-slate-400">{hint}</span>}
      </label>
      {input}
    </div>
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/posts" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy">{isNew ? "New post" : "Edit post"}</h1>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <section className="panel">
            <input
              className="input text-lg font-bold sm:text-xl"
              placeholder="Post title"
              aria-label="Title"
              maxLength={200}
              value={post.title}
              onChange={(e) => update({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })}
            />
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <span className="shrink-0">rentomate.life/blog/</span>
              <input
                className="input px-2 py-1 text-xs"
                aria-label="URL slug"
                value={post.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update({ slug: e.target.value });
                }}
                onBlur={() => setPost((current) => ({ ...current, slug: slugify(current.slug) }))}
              />
            </div>
          </section>

          <section className="panel">
            <h2 className="panel-title">Cover image</h2>
            <ImageField value={post.coverImage} label="Upload cover image" onChange={(coverImage) => update({ coverImage })} />
            <div className="mt-3">
              {field(
                "Image alt text",
                "cover-alt",
                <input id="cover-alt" className="input" maxLength={200} placeholder="Describe the image for screen readers & SEO" value={post.coverAlt} onChange={(e) => update({ coverAlt: e.target.value })} />,
              )}
            </div>
          </section>

          <section className="panel space-y-4">
            <h2 className="panel-title mb-0">Summary</h2>
            {field(
              "Excerpt",
              "excerpt",
              <textarea id="excerpt" className="input min-h-20" rows={3} maxLength={400} placeholder="Short summary shown on the blog list and in Google results" value={post.excerpt} onChange={(e) => update({ excerpt: e.target.value })} />,
              `${post.excerpt.length}/400`,
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("Category", "category", <input id="category" className="input" maxLength={60} value={post.category} onChange={(e) => update({ category: e.target.value })} />)}
              {field("Author", "author", <input id="author" className="input" maxLength={80} value={post.author} onChange={(e) => update({ author: e.target.value })} />)}
              {field("Publish date", "date", <input id="date" type="date" className="input" value={post.publishedOn} onChange={(e) => update({ publishedOn: e.target.value })} />)}
              {field(
                "Read time (minutes)",
                "read",
                <input id="read" type="number" min={1} max={120} className="input" placeholder="Auto" value={post.readMinutes} onChange={(e) => update({ readMinutes: e.target.value })} />,
                "blank = auto",
              )}
            </div>
          </section>

          <section className="panel">
            <h2 className="panel-title">Content</h2>
            <div className="space-y-3">
              {post.blocks.map((block, index) => (
                <div key={block.key} className="rounded-xl border border-slate-200 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand">{BLOCK_LABELS[block.type]}</span>
                    <div className="flex gap-1">
                      <button type="button" className="btn btn-sm px-2" title="Move up" disabled={index === 0} onClick={() => moveBlock(index, -1)}>
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" className="btn btn-sm px-2" title="Move down" disabled={index === post.blocks.length - 1} onClick={() => moveBlock(index, 1)}>
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" className="btn btn-sm btn-danger px-2" title="Remove block" onClick={() => update({ blocks: post.blocks.filter((b) => b.key !== block.key) })}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {block.type === "image" ? (
                    <>
                      <ImageField value={block.url} onChange={(url) => updateBlock(block.key, { url })} />
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input className="input" placeholder="Alt text" maxLength={200} value={block.alt} onChange={(e) => updateBlock(block.key, { alt: e.target.value })} />
                        <input className="input" placeholder="Caption (optional)" maxLength={300} value={block.caption} onChange={(e) => updateBlock(block.key, { caption: e.target.value })} />
                      </div>
                    </>
                  ) : block.type === "list" ? (
                    <textarea
                      className="input"
                      rows={4}
                      placeholder="One item per line"
                      value={block.items.join("\n")}
                      onChange={(e) => updateBlock(block.key, { items: e.target.value.split("\n") })}
                    />
                  ) : (
                    <textarea
                      className={`input ${block.type === "heading" ? "min-h-0 text-base font-bold" : "min-h-20"}`}
                      rows={block.type === "heading" ? 1 : block.type === "quote" ? 2 : 4}
                      placeholder={block.type === "heading" ? "Section heading" : block.type === "quote" ? "Highlighted quote or tip" : "Write a paragraph…"}
                      value={block.text}
                      onChange={(e) => updateBlock(block.key, { text: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
                <button key={type} type="button" className="btn btn-sm" onClick={() => update({ blocks: [...post.blocks, newBlock(type)] })}>
                  + {BLOCK_LABELS[type]}
                </button>
              ))}
            </div>
          </section>

          <section className="panel space-y-4">
            <h2 className="panel-title mb-0">
              SEO <span className="text-xs font-normal text-slate-400">(optional)</span>
            </h2>
            {field("Meta title", "seo-title", <input id="seo-title" className="input" maxLength={200} placeholder="Defaults to the post title" value={post.seoTitle} onChange={(e) => update({ seoTitle: e.target.value })} />)}
            {field(
              "Meta description",
              "seo-desc",
              <textarea id="seo-desc" className="input" rows={2} maxLength={400} placeholder="Defaults to the excerpt" value={post.seoDescription} onChange={(e) => update({ seoDescription: e.target.value })} />,
              `${post.seoDescription.length}/400`,
            )}
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-6">
          <section className="panel space-y-4">
            <h2 className="panel-title mb-0">Publish</h2>
            {field(
              "Status",
              "status",
              <select id="status" className="input" value={post.status} onChange={(e) => update({ status: e.target.value as EditorPost["status"] })}>
                <option value="DRAFT">Draft – hidden from website</option>
                <option value="PUBLISHED">Published – live on website</option>
              </select>,
            )}
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <input type="checkbox" className="h-4 w-4 accent-brand" checked={post.featured} onChange={(e) => update({ featured: e.target.checked })} />
              Feature at the top of the blog
            </label>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isNew ? "Create post" : "Save changes"}
              </button>
              {!isNew && live.status === "PUBLISHED" && (
                <a href={`/blog/${live.slug}`} target="_blank" className="btn">
                  <ExternalLink className="h-4 w-4" /> View
                </a>
              )}
              {!isNew && (
                <button type="button" className="btn btn-danger" onClick={deletePost}>
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              )}
            </div>
            <p className={`text-xs ${dirty ? "text-amber-600" : "text-slate-400"}`}>{dirty ? "Unsaved changes" : "All changes saved"} · Ctrl+S to save</p>
          </section>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Live preview</p>
            <PostPreview post={post} />
          </div>
        </aside>
      </div>
    </>
  );
}
