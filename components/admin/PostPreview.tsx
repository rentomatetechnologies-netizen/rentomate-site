import { formatDate } from "@/lib/admin/format";
import type { EditorPost } from "@/lib/admin/posts";

/** Live preview that mirrors the website's article template. */
export function PostPreview({ post }: { post: EditorPost }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt={post.coverAlt} className="aspect-video w-full object-cover" />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100" />
      )}
      <div className="p-5">
        {post.category && <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{post.category}</p>}
        <h2 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-navy">{post.title || "Untitled post"}</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          {[post.publishedOn && formatDate(post.publishedOn), post.readMinutes && `${post.readMinutes} min read`, post.author].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-4 space-y-3 text-[13px] leading-6 text-slate-700">
          {post.blocks.map((block) => {
            switch (block.type) {
              case "heading":
                return block.text && <h3 key={block.key} className="pt-2 text-base font-extrabold text-navy">{block.text}</h3>;
              case "quote":
                return (
                  block.text && (
                    <blockquote key={block.key} className="rounded-r-lg border-l-4 border-brand bg-sky-50 px-3 py-2 font-semibold text-navy">
                      {block.text}
                    </blockquote>
                  )
                );
              case "list":
                return (
                  block.items.some(Boolean) && (
                    <ul key={block.key} className="list-disc space-y-1 pl-5 marker:text-brand">
                      {block.items.filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )
                );
              case "image":
                return (
                  block.url && (
                    <figure key={block.key}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={block.url} alt={block.alt} className="w-full rounded-lg" />
                      {block.caption && <figcaption className="mt-1 text-center text-[11px] text-slate-500">{block.caption}</figcaption>}
                    </figure>
                  )
                );
              default:
                return block.text && <p key={block.key}>{block.text}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
