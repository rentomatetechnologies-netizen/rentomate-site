"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, Loader2, Save, Trash2, X } from "lucide-react";
import { apiFetch, useApi } from "@/lib/admin/api";
import { newKey, slugify, tableToText, textToTable, type BlockType, type EditorBlock, type EditorPost } from "@/lib/admin/posts";
import { ImageField } from "@/components/admin/ImageField";
import { PostPreview } from "@/components/admin/PostPreview";
import { useToast } from "@/components/admin/Toast";

const MAX_EXCERPT_WORDS = 1000;

const BLOCK_LABELS: Record<BlockType, string> = {
  paragraph: "Paragraph",
  heading: "Heading",
  quote: "Quote",
  list: "Bullet list",
  image: "Image",
  faq: "FAQ",
  callout: "Answer / summary box",
  table: "Table",
  cta: "Call to action",
  toc: "Table of contents",
};

// "cta" blocks are retired (posts get a fixed call to action), so they can't be added any more.
const newBlock = (type: Exclude<BlockType, "cta">): EditorBlock => {
  const key = newKey();
  if (type === "toc") return { type, key };
  if (type === "image") return { type, url: "", alt: "", caption: "", key };
  if (type === "list") return { type, items: [], key };
  if (type === "faq") return { type, items: [{ question: "", answer: "" }], key };
  if (type === "callout") return { type, title: "Direct answer", text: "", key };
  if (type === "table") return { type, rows: [], key };
  return { type, text: "", key };
};

type FaqItems = Extract<EditorBlock, { type: "faq" }>["items"];

/** Question/answer pairs for an FAQ block. */
function FaqFields({ items, onChange }: { items: FaqItems; onChange: (items: FaqItems) => void }) {
  const set = (i: number, patch: Partial<FaqItems[number]>) => onChange(items.map((item, j) => (j === i ? { ...item, ...patch } : item)));
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="space-y-2 rounded-lg bg-slate-50 p-2">
          <div className="flex gap-2">
            <input className="input font-semibold" placeholder={`Question ${i + 1}`} maxLength={300} value={item.question} onChange={(e) => set(i, { question: e.target.value })} />
            <button type="button" className="btn btn-sm btn-danger px-2" title="Remove question" onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <textarea className="input" rows={3} placeholder="Answer" maxLength={2000} value={item.answer} onChange={(e) => set(i, { answer: e.target.value })} />
        </div>
      ))}
      <button type="button" className="btn btn-sm" disabled={items.length >= 30} onClick={() => onChange([...items, { question: "", answer: "" }])}>
        + Question
      </button>
    </div>
  );
}

/** "54/60" counter that turns amber once Google would likely cut the text short. */
const CharCount = ({ length, ideal }: { length: number; ideal: number }) => (
  <span className={length > ideal ? "font-semibold text-amber-600" : ""}>
    {length}/{ideal}
  </span>
);

// Small words a keyword match can skip, so "cost in Coimbatore" also ticks for "Coimbatore cost".
const STOP_WORDS = new Set(["a", "an", "and", "at", "by", "for", "in", "of", "on", "or", "the", "to", "vs", "with"]);

/** Lowercase words with a trailing plural "s" dropped, so "costs" matches "cost". */
const toWords = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word) => (word.length > 3 ? word.replace(/s$/, "") : word));

/** True when every meaningful word of the keyword appears somewhere in the text. */
const containsKeyword = (text: string, keyword: string) => {
  const all = toWords(keyword);
  const needed = all.filter((word) => !STOP_WORDS.has(word));
  const found = new Set(toWords(text));
  return (needed.length ? needed : all).every((word) => found.has(word));
};

const blockText = (block: EditorBlock): string => {
  if (block.type === "list") return block.items.join(" ");
  if (block.type === "faq") return block.items.map((item) => `${item.question} ${item.answer}`).join(" ");
  if (block.type === "table") return block.rows.flat().join(" ");
  if (block.type === "image") return `${block.alt} ${block.caption}`;
  if (block.type === "callout") return `${block.title} ${block.text}`;
  return "text" in block ? block.text : "";
};

/** Splits the comma-separated secondary keywords. */
const splitKeywords = (value: string) =>
  value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

// Strips a pasted "Primary Keyword:" style label and stray punctuation at the ends.
const cleanKeyword = (value: string) => value.replace(/^\s*(?:(?:primary|secondary)\s+)?key\s?words?\s*:\s*/i, "").replace(/^[\s•*-]+|[\s.,;]+$/g, "");
const cleanKeywords = (value: string) => splitKeywords(cleanKeyword(value).replace(/[;\n]+/g, ",")).map(cleanKeyword).filter(Boolean).join(", ");

const Check = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <li className={ok ? "text-emerald-700" : "text-amber-600"}>
    {ok ? "✓" : "✗"} {children}
  </li>
);

/** Quick on-page checks for the primary and secondary keywords. */
function KeywordChecks({ post }: { post: EditorPost }) {
  const keyword = post.focusKeyword.trim();
  const body = post.blocks.map(blockText).join(" ");
  const secondary = splitKeywords(post.keywords);
  const checks = [
    ["Meta title (or post title)", containsKeyword(post.seoTitle || post.title, keyword)],
    ["Meta description (or excerpt)", containsKeyword(post.seoDescription || post.excerpt, keyword)],
    ["URL slug", containsKeyword(post.slug, keyword)],
    ["Article content", containsKeyword(body, keyword)],
  ] as const;
  return (
    <div className="space-y-3 rounded-lg bg-slate-50 p-3 text-xs">
      {keyword && (
        <ul className="space-y-1">
          {checks.map(([label, ok]) => (
            <Check key={label} ok={ok}>
              Primary keyword in {label.toLowerCase()}
            </Check>
          ))}
        </ul>
      )}
      {secondary.length > 0 && (
        <div>
          <p className="mb-1 font-semibold text-slate-600">Secondary keywords in article content</p>
          <ul className="space-y-1">
            {secondary.map((item) => (
              <Check key={item} ok={containsKeyword(body, item)}>
                {item}
              </Check>
            ))}
          </ul>
        </div>
      )}
      <p className="text-slate-400">A tick means every main word of the keyword appears; small words like &ldquo;in&rdquo; or &ldquo;the&rdquo; are skipped.</p>
    </div>
  );
}

/** A short how-to line under a form field. */
const Help = ({ children }: { children: React.ReactNode }) => <p className="mt-1 text-xs text-slate-400">{children}</p>;

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
  // Existing categories, suggested in the Category field so posts share the same names (and category pages).
  const { data: allPosts } = useApi<{ category: string }[]>("/admin/posts");
  const categories = [...new Set((allPosts ?? []).map((p) => p.category).filter(Boolean))].sort();
  const headings = post.blocks.flatMap((block) => (block.type === "heading" && block.text.trim() ? [block.text.trim()] : []));
  const hasToc = post.blocks.some((block) => block.type === "toc");
  const excerptWords = post.excerpt.split(/\s+/).filter(Boolean).length;

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

  const field = (label: string, id: string, input: React.ReactNode, hint?: React.ReactNode) => (
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
            {/* Shift+Enter adds a line break to the title (shown on the article heading and blog cards); Enter alone does nothing. */}
            <textarea
              className="input min-h-0 resize-none text-lg font-bold [field-sizing:content] sm:text-xl"
              rows={1}
              placeholder="Post title"
              aria-label="Title"
              maxLength={200}
              value={post.title}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) e.preventDefault();
              }}
              onChange={(e) => update({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })}
            />
            <p className="mt-1 text-[11px] text-slate-400">Shift+Enter for a line break</p>
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
            <div className="mt-3">
              {field(
                "Caption",
                "cover-caption",
                <input
                  id="cover-caption"
                  className="input"
                  maxLength={300}
                  placeholder="Shown under the cover image on the article"
                  value={post.coverCaption}
                  onChange={(e) => update({ coverCaption: e.target.value })}
                />,
                "(optional)",
              )}
            </div>
          </section>

          <section className="panel space-y-4">
            <h2 className="panel-title mb-0">Summary</h2>
            {field(
              "Excerpt",
              "excerpt",
              <textarea
                id="excerpt"
                className={`input min-h-40 [field-sizing:content] ${excerptWords > MAX_EXCERPT_WORDS ? "border-red-400" : ""}`}
                rows={6}
                maxLength={10000}
                placeholder="Summary shown on the blog list (first 2 lines) and, unless a meta description is set, in Google results"
                value={post.excerpt}
                onChange={(e) => update({ excerpt: e.target.value })}
              />,
              <span className={excerptWords > MAX_EXCERPT_WORDS ? "font-semibold text-red-600" : ""}>
                {excerptWords}/{MAX_EXCERPT_WORDS} words
              </span>,
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Category",
                "category",
                <>
                  <input id="category" list="category-options" className="input" maxLength={60} placeholder="e.g. Water Purifier" value={post.category} onChange={(e) => update({ category: e.target.value })} />
                  <datalist id="category-options">
                    {categories.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                </>,
                "pick or type new",
              )}
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
                  ) : block.type === "faq" ? (
                    <FaqFields items={block.items} onChange={(items) => updateBlock(block.key, { items })} />
                  ) : block.type === "callout" ? (
                    <div className="space-y-2">
                      <input
                        className="input font-semibold"
                        maxLength={100}
                        placeholder="Box title, e.g. Direct answer, Summary, Key takeaway"
                        value={block.title}
                        onChange={(e) => updateBlock(block.key, { title: e.target.value })}
                      />
                      <textarea
                        className="input min-h-20"
                        rows={4}
                        maxLength={3000}
                        placeholder="A short, direct answer to the post's main question (Google and AI assistants often quote this)"
                        value={block.text}
                        onChange={(e) => updateBlock(block.key, { text: e.target.value })}
                      />
                    </div>
                  ) : block.type === "table" ? (
                    <>
                      <textarea
                        className="input min-h-28 font-mono text-xs"
                        rows={6}
                        placeholder={"Component | Cost | Notes\nSediment filter | ₹150–₹400 | Periodic replacement\nRO membrane | ₹1,200–₹3,500 | Depends on water"}
                        value={tableToText(block.rows)}
                        onChange={(e) => updateBlock(block.key, { rows: textToTable(e.target.value) })}
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        One row per line, cells separated by <code>|</code>. The first row is the header. You can paste a table from Word, Excel or
                        Google Docs.
                      </p>
                    </>
                  ) : block.type === "cta" ? (
                    <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                      This block is no longer shown — every post now ends with a fixed &ldquo;Book Free Trial&rdquo; call to action. You can remove it.
                    </p>
                  ) : block.type === "toc" ? (
                    <div className="rounded-lg bg-slate-50 p-3 text-sm">
                      {headings.length ? (
                        <ol className="space-y-0.5 text-slate-700">
                          {headings.map((text, i) => (
                            <li key={i}>- {text}</li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-amber-600">Add &ldquo;Heading&rdquo; blocks — each one becomes a link in this table of contents.</p>
                      )}
                      <p className="mt-2 text-xs text-slate-400">Built automatically from the post&apos;s headings.</p>
                    </div>
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
                      onChange={(e) =>
                        // Headings get their jump-link ids automatically, so drop pasted "{#section-id}" markers.
                        updateBlock(block.key, { text: block.type === "heading" ? e.target.value.replace(/\s*\{#[^}]*\}/g, "") : e.target.value })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(BLOCK_LABELS) as BlockType[]).filter((type): type is Exclude<BlockType, "cta"> => type !== "cta").map((type) => (
                <button
                  key={type}
                  type="button"
                  className="btn btn-sm"
                  disabled={type === "toc" && hasToc}
                  title={type === "toc" && hasToc ? "This post already has a table of contents" : undefined}
                  onClick={() => update({ blocks: [...post.blocks, newBlock(type)] })}
                >
                  + {BLOCK_LABELS[type]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Links: write <code>[anchor text](https://example.com)</code> or <code>[anchor text](/blog/another-post)</code> in any text. Plain URLs
              also become links.
            </p>
            {!hasToc && headings.length >= 2 && (
              <p className="mt-2 text-xs text-slate-400">
                A table of contents is added automatically before the first heading. Add a &ldquo;Table of contents&rdquo; block to place it yourself.
              </p>
            )}
          </section>

          <section className="panel space-y-4">
            <h2 className="panel-title mb-0">
              SEO <span className="text-xs font-normal text-slate-400">(optional)</span>
            </h2>
            <p className="text-xs text-slate-500">These fields are for Google only. They are not shown on the article page.</p>
            {field(
              "Meta title",
              "seo-title",
              <>
                <input id="seo-title" className="input" maxLength={200} placeholder="Defaults to the post title" value={post.seoTitle} onChange={(e) => update({ seoTitle: e.target.value })} />
                <Help>The &ldquo;SEO title&rdquo; shown in Google. Put the primary keyword near the start; keep it under 60 characters.</Help>
              </>,
              <CharCount length={post.seoTitle.length} ideal={60} />,
            )}
            {field(
              "Meta description",
              "seo-desc",
              <>
                <textarea id="seo-desc" className="input" rows={2} maxLength={400} placeholder="Defaults to the excerpt" value={post.seoDescription} onChange={(e) => update({ seoDescription: e.target.value })} />
                <Help>The grey text under the title in Google. Use the primary keyword once in a natural sentence; aim for 140–160 characters.</Help>
              </>,
              <CharCount length={post.seoDescription.length} ideal={160} />,
            )}
            {field(
              "Primary keyword",
              "seo-focus",
              <>
                <input
                  id="seo-focus"
                  className="input"
                  maxLength={120}
                  placeholder="e.g. water purifier maintenance cost in Coimbatore"
                  value={post.focusKeyword}
                  onChange={(e) => update({ focusKeyword: e.target.value })}
                  onBlur={() => setPost((current) => ({ ...current, focusKeyword: cleanKeyword(current.focusKeyword) }))}
                />
                <Help>The one phrase this post should rank for — the phrase only, no &ldquo;Primary Keyword:&rdquo; label. Use it in the meta title, meta description, URL slug and article text.</Help>
              </>,
            )}
            {field(
              "Secondary keywords",
              "seo-keywords",
              <>
                <textarea
                  id="seo-keywords"
                  className="input"
                  rows={3}
                  maxLength={1000}
                  placeholder="Comma-separated, e.g. lifetime free service water purifier, water purifier on rent in Coimbatore"
                  value={post.keywords}
                  onChange={(e) => update({ keywords: e.target.value })}
                  onBlur={() => setPost((current) => ({ ...current, keywords: cleanKeywords(current.keywords) }))}
                />
                <Help>Related phrases, separated by commas. Long-tail and question keywords go here too. Use each one at least once in the article.</Help>
              </>,
              "comma-separated",
            )}
            {(post.focusKeyword.trim() || post.keywords.trim()) && <KeywordChecks post={post} />}
            <Help>
              <strong>Direct answer:</strong> add an &ldquo;Answer / summary box&rdquo; block near the top of the article. <strong>Search intent</strong> is a
              writer&apos;s note — it has no field. <strong>Jump links</strong> like <code>{"{#section-id}"}</code> aren&apos;t needed: headings get them
              automatically.
            </Help>
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
