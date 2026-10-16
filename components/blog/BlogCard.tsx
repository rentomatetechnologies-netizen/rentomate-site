import type React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BlogCover } from "@/components/BlogCover";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { formatDate, plainTitle, type BlogPostSummary } from "@/lib/blog";

/** Post card used on the blog listing and category pages. */
export const BlogCard: React.FC<{ post: BlogPostSummary; preload?: boolean }> = ({ post, preload }) => (
  <article className="group flex flex-col rounded-[10px] bg-white p-4 shadow-[0_2px_18px_rgb(15_23_42/0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgb(15_23_42/0.12)]">
    <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="block overflow-hidden rounded-[8px]">
      <BlogCover
        src={post.coverImage}
        alt={post.coverAlt}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        preload={preload}
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </Link>
    <div className="flex flex-1 flex-col pt-4">
      <h2 className="line-clamp-2 whitespace-pre-line text-lg font-extrabold leading-snug tracking-tight text-[#051838] sm:text-xl">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-[#0084FF]">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-sm text-slate-500">
        <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden />
        On {formatDate(post.date)}
        {post.author && (
          <>
            {" "}By <span className="font-bold text-slate-800">{post.author}</span>
          </>
        )}
      </p>
      {post.category && <CategoryBadge name={post.category} className="mt-3 self-start" />}
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-[#051838] transition hover:text-[#0084FF]"
        aria-label={`Read more: ${plainTitle(post.title)}`}
      >
        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </Link>
    </div>
  </article>
);
