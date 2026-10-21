import type React from "react";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { LatestPostsCarousel } from "@/components/blog/LatestPostsCarousel";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { BlogTrialForm } from "@/components/blog/BlogTrialForm";
import type { BlogBanner as Banner } from "@/lib/blog-banner";
import { byNewest, paginate, type BlogPostSummary } from "@/lib/blog";

type Props = {
  /** Every published post (for the sidebar and carousel). */
  allPosts: BlogPostSummary[];
  /** The posts this listing pages through: all of them, or one category's. */
  posts: BlogPostSummary[];
  page: number;
  basePath: string;
  title: React.ReactNode;
  description: string;
  breadcrumbs: Crumb[];
  activeCategory?: string;
  banner?: Banner | null;
};

/** Shared template for /blog, its numbered pages and the category pages. */
export const BlogListing: React.FC<Props> = ({ allPosts, posts, page, basePath, title, description, breadcrumbs, activeCategory, banner }) => {
  // The newest post is always featured at the top, so the paged grid below skips it.
  const [latest, ...rest] = byNewest(posts);
  const { items, totalPages } = paginate(rest, page);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-100 via-sky-50 to-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-10">
          <div className="relative mx-auto hidden h-72 w-full max-w-sm md:block">
            <Image src="/hero/purifier-transparent.png" alt="" fill sizes="384px" preload className="object-contain drop-shadow-[0_25px_35px_rgb(14_116_204/0.35)]" />
          </div>
          <div className="text-center md:text-left">
            <Breadcrumbs items={breadcrumbs} className="mb-4 flex justify-center md:justify-start" />
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0067c7] sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg md:mx-0">{description}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8">
          <div className="flex flex-col gap-6">
            {latest && <BlogCard post={latest} preload horizontal />}
            {banner && <BlogBanner banner={banner} />}
          </div>
          {/* The wrapper spans the row, so the form sticks while scrolling until the poster ends. */}
          <div>
            <BlogTrialForm className="lg:sticky lg:top-28" />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8">
          <div>
            {items.length === 0 ? (
              <p className="rounded-[10px] border border-slate-200 p-10 text-center text-slate-500">New articles are on the way. Check back soon!</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {items.map((post, i) => (
                  <BlogCard key={post.slug} post={post} preload={page === 1 && i < 2} />
                ))}
              </div>
            )}
            <BlogPagination current={page} total={totalPages} basePath={basePath} />
          </div>
          <BlogSidebar posts={allPosts} activeCategory={activeCategory} showTrialForm={false} />
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <LatestPostsCarousel posts={byNewest(allPosts).slice(0, 9)} />
        </div>
      </section>
    </>
  );
};
