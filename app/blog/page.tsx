import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCover } from "@/components/BlogCover";
import { PageHeader } from "@/components/PageHeader";
import { formatDate, getPosts, type BlogPostSummary } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips on safe drinking water, RO purifiers, filters and renting vs buying, from the RentOMate team.",
};

const PostMeta: React.FC<{ post: BlogPostSummary }> = ({ post }) => (
  <p className="text-xs font-semibold text-slate-500">
    {formatDate(post.date)} · {post.readMinutes} min read
  </p>
);

const Category: React.FC<{ name: string }> = ({ name }) =>
  name ? <span className="text-xs font-bold uppercase tracking-wider text-[#0084FF]">{name}</span> : null;

export default async function BlogPage() {
  const posts = await getPosts();
  // The API lists featured posts first; the first one gets the large card.
  const [lead, ...rest] = posts;
  const featured = lead?.featured ? lead : undefined;
  const grid = featured ? rest : posts;

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
        title={<>Know your <span className="text-[#0084FF]">water</span></>}
        description="Simple guides on purifiers, filters and drinking water from the RentOMate team."
      />
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 && (
            <p className="rounded-[10px] border border-slate-200 p-10 text-center text-slate-500">New articles are on the way. Check back soon!</p>
          )}

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-8 grid overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm transition hover:border-sky-200 hover:shadow-md md:grid-cols-2"
            >
              <BlogCover
                src={featured.coverImage}
                alt={featured.coverAlt}
                sizes="(min-width: 768px) 50vw, 100vw"
                preload
                className="aspect-[16/10] md:aspect-auto md:min-h-80"
              />
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700">Featured</span>
                  <Category name={featured.category} />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-[#051838] group-hover:text-sky-700 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{featured.excerpt}</p>
                <div className="mt-5">
                  <PostMeta post={featured} />
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
              >
                <BlogCover
                  src={post.coverImage}
                  alt={post.coverAlt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <Category name={post.category} />
                  <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-sky-700">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <PostMeta post={post} />
                    <ArrowRight className="h-4 w-4 text-sky-600 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
