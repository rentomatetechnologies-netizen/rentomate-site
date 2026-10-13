import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { BLOG_POSTS, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips on safe drinking water, RO purifiers, filters and renting vs buying, from the RentOMate team.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={<>Know your <span className="text-[#0084FF]">water</span></>}
        description="Simple guides on purifiers, filters and drinking water from the RentOMate team."
      />
      <section className="bg-white pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <p className="text-xs font-semibold text-slate-500">
                {formatDate(post.date)} · {post.readMinutes} min read
              </p>
              <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-sky-700">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600">
                Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
