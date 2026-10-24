import { Fragment } from "react";
import { formatDate } from "@/lib/admin/format";
import type { EditorBlock, EditorPost } from "@/lib/admin/posts";

function PreviewBlock({ block }: { block: EditorBlock }) {
  switch (block.type) {
    case "toc":
      return null; // drawn by PostPreview, which knows the headings
    case "heading":
      return block.text && <h3 className="pt-2 text-base font-extrabold text-navy">{block.text}</h3>;
    case "quote":
      return block.text && <blockquote className="rounded-r-lg border-l-4 border-brand bg-sky-50 px-3 py-2 font-semibold text-navy">{block.text}</blockquote>;
    case "list":
      return (
        block.items.some(Boolean) && (
          <ul className="list-disc space-y-1 pl-5 marker:text-brand">
            {block.items.filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
      );
    case "image":
      return (
        block.url && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.url} alt={block.alt} className="w-full rounded-lg" />
            {block.caption && <figcaption className="mt-1 text-center text-[11px] text-slate-500">{block.caption}</figcaption>}
          </figure>
        )
      );
    case "faq":
      return (
        block.items.some((item) => item.question) && (
          <div className="space-y-2">
            {block.items.filter((item) => item.question).map((item, i) => (
              <div key={i} className="rounded-lg border border-slate-200 p-2">
                <p className="font-bold text-navy">{i + 1}. {item.question}</p>
                {item.answer && <p className="mt-1 whitespace-pre-line">{item.answer}</p>}
              </div>
            ))}
          </div>
        )
      );
    case "callout":
      return (
        block.text && (
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
            {block.title && <p className="font-extrabold text-navy">{block.title}</p>}
            <p className="whitespace-pre-line">{block.text}</p>
          </div>
        )
      );
    case "table":
      return (
        block.rows.some((row) => row.some(Boolean)) && (
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full text-left text-[11px]">
              <tbody>
                {block.rows.filter((row) => row.some(Boolean)).map((row, r) => (
                  <tr key={r} className={r === 0 ? "bg-navy font-bold text-white" : "border-t border-slate-200"}>
                    {row.map((cell, i) => (
                      <td key={i} className="px-2 py-1 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      );
    case "cta":
      return null; // retired: every post now ends with a fixed call to action
    default:
      return block.text && <p className="whitespace-pre-line">{block.text}</p>;
  }
}

/** Live preview that mirrors the website's article template. */
export function PostPreview({ post }: { post: EditorPost }) {
  // Same placement as the website: at the "Table of contents" block, else before the first of 2+ headings.
  const headings = post.blocks.flatMap((block, index) => (block.type === "heading" && block.text.trim() ? [{ index, text: block.text.trim() }] : []));
  const placed = post.blocks.findIndex((block) => block.type === "toc");
  const tocAt = headings.length === 0 ? -1 : placed >= 0 ? placed : headings.length >= 2 ? headings[0].index : -1;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt={post.coverAlt} className="aspect-video w-full object-cover" />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100" />
      )}
      {post.coverImage && post.coverCaption && <p className="bg-slate-50 px-5 py-1.5 text-center text-[11px] text-slate-500">{post.coverCaption}</p>}
      <div className="p-5">
        {post.category && <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{post.category}</p>}
        <h2 className="mt-1 whitespace-pre-line text-xl font-extrabold leading-tight tracking-tight text-navy">{post.title || "Untitled post"}</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          {[post.publishedOn && formatDate(post.publishedOn), post.readMinutes && `${post.readMinutes} min read`, post.author].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-4 space-y-3 text-[13px] leading-6 text-slate-700">
          {post.blocks.map((block, i) => (
            <Fragment key={block.key}>
              {i === tocAt && (
                <div className="rounded-md border border-slate-200 bg-[#f9f9fe] px-3 py-2">
                  <p className="font-semibold text-slate-500">Table of Contents</p>
                  <ol className="mt-1 text-[12px] leading-5 text-navy">
                    {headings.map((h) => (
                      <li key={h.index}>- {h.text}</li>
                    ))}
                  </ol>
                </div>
              )}
              <PreviewBlock block={block} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
