"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCover } from "@/components/BlogCover";
import { formatDate, type BlogPostSummary } from "@/lib/blog";

/** "Latest Posts" strip at the bottom of the blog listing: image cards scrolled with arrow buttons. */
export const LatestPostsCarousel: React.FC<{ posts: BlogPostSummary[] }> = ({ posts }) => {
  const track = useRef<HTMLDivElement>(null);
  if (posts.length === 0) return null;

  const scroll = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-[0_2px_18px_rgb(15_23_42/0.07)] sm:p-8">
      <div className="flex items-end justify-between border-b-2 border-[#051838]">
        <h2 className="rounded-t-[4px] bg-[#051838] px-4 py-2 text-lg font-extrabold uppercase tracking-tight text-white">Latest Posts</h2>
        <div className="mb-1 flex gap-1">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous posts" className="rounded-[4px] bg-[#051838] p-2 text-white transition hover:bg-[#0084FF]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next posts" className="rounded-[4px] bg-[#051838] p-2 text-white transition hover:bg-[#0084FF]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={track} className="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-[6px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <BlogCover src={post.coverImage} alt={post.coverAlt} sizes="(min-width: 1024px) 400px, 85vw" className="aspect-[16/10] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#051838]/90 via-[#051838]/40 to-transparent p-5 text-white">
              {post.category && <span className="self-start rounded-[4px] bg-[#051838] px-2 py-1 text-xs font-semibold">{post.category}</span>}
              <p className="mt-3 text-sm">On {formatDate(post.date)}</p>
              <h3 className="mt-2 line-clamp-1 text-lg font-extrabold">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
