import type React from "react";
import type { Metadata } from "next";
import { OPEN_GRAPH_DEFAULTS } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarCheck, CalendarDays, Clock } from "lucide-react";
import { BlogCover } from "@/components/BlogCover";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { BlogBlocks, faqStructuredData } from "@/components/blog/BlogBlocks";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BlogTrialForm } from "@/components/blog/BlogTrialForm";
import { IndexDrawer, TableOfContents } from "@/components/blog/TableOfContents";
import { BRAND, CUSTOMER_FORM_URL, LOWEST_PRICE, SITE_URL } from "@/lib/site";
import { getBlogBanner } from "@/lib/blog-banner";
import { categoryHref, formatDate, getHeadings, getNeighbours, getPost, getPosts, metaDescription, plainTitle, postKeywords, type BlogPostSummary } from "@/lib/blog";

export const revalidate = 300;

export const generateStaticParams = async () => (await getPosts()).map((post) => ({ slug: post.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const description = metaDescription(post);
  const title = post.seoTitle || plainTitle(post.title);
  const keywords = postKeywords(post);
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      type: "article",
      url: `/blog/${post.slug}`,
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      section: post.category || undefined,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined,
    },
  };
}

const card = "rounded-[10px] bg-white shadow-[0_2px_18px_rgb(15_23_42/0.07)]";

const NeighbourLink: React.FC<{ post: BlogPostSummary; direction: "previous" | "next" }> = ({ post, direction }) => (
  <Link
    href={`/blog/${post.slug}`}
    className={`group flex items-center gap-4 rounded-[6px] border border-slate-200 p-5 transition hover:border-sky-300 ${direction === "next" ? "flex-row-reverse text-right sm:col-start-2" : ""}`}
  >
    {direction === "previous" ? (
      <ArrowLeft className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-[#0084FF]" aria-hidden />
    ) : (
      <ArrowRight className="h-5 w-5 shrink-0 text-slate-500 group-hover:text-[#0084FF]" aria-hidden />
    )}
    <span>
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">{direction === "previous" ? "Previous post" : "Next post"}</span>
      <span className="mt-1 block font-bold leading-snug text-[#051838] group-hover:text-[#0084FF]">{post.title}</span>
    </span>
  </Link>
);

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, posts, banner] = await Promise.all([getPost(slug), getPosts(), getBlogBanner()]);
  if (!post) notFound();

  const headings = getHeadings(post.blocks).map(({ id, text }) => ({ id, text }));
  const { previous, next, related } = getNeighbours(posts, post.slug);
  const crumbs = [
    { label: "Blog", href: "/blog" },
    ...(post.category ? [{ label: post.category, href: categoryHref(post.category) }] : []),
    { label: plainTitle(post.title), href: `/blog/${post.slug}` },
  ];
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: plainTitle(post.title),
    description: metaDescription(post, 300),
    image: post.coverImage ? new URL(post.coverImage, SITE_URL).toString() : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: { "@type": post.author ? "Person" : "Organization", name: post.author || BRAND.name },
    publisher: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: postKeywords(post).join(", ") || undefined,
  };
  const faqData = faqStructuredData(post.blocks);

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} />
      {faqData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />}
      {headings.length >= 2 && <IndexDrawer headings={headings} />}

      {/* Hero: cover image with the title on top */}
      <header className="relative -mt-[76px] flex min-h-[420px] items-center overflow-hidden bg-[#051838] pt-[76px] sm:min-h-[520px]">
        <BlogCover src={post.coverImage} alt={post.coverAlt} sizes="100vw" preload className="!absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#051838]/70 via-[#051838]/55 to-[#051838]/75" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight whitespace-pre-line text-white drop-shadow sm:text-5xl sm:leading-[1.2]">{post.title}</h1>
          <Breadcrumbs items={crumbs} light className="mt-6 flex justify-center" />
        </div>
        {post.coverImage && post.coverCaption && (
          <p className="absolute inset-x-0 bottom-0 px-4 pb-3 text-center text-xs text-white/80 sm:text-sm">{post.coverCaption}</p>
        )}
      </header>

      <div className="bg-white py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8">
          <div className="flex min-w-0 flex-col gap-6">
            {headings.length > 0 && <TableOfContents headings={headings} className={`${card} flex-1 !border-0 p-5 sm:p-6`} />}
            {banner && <BlogBanner banner={banner} />}
          </div>
          {/* The wrapper spans the row, so the form sticks while scrolling until the poster ends. */}
          <div>
            <BlogTrialForm className="lg:sticky lg:top-28" />
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8">
          <div className="min-w-0 space-y-8">
            <article id="article-body" className={`${card} p-5 sm:p-8`}>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-slate-100 px-3 py-2">
                  <Clock className="h-4 w-4" aria-hidden /> Reading time {post.readMinutes} min{post.readMinutes === 1 ? "" : "s"}
                </span>
                {post.category && <CategoryBadge name={post.category} />}
              </div>
              <div className="mt-6">
                <BlogBlocks blocks={post.blocks} showToc={false} />
              </div>
              {/* Fixed call to action on every post, not configurable from the admin. */}
              <div className="mt-10 flex flex-col items-center gap-4 rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-6 text-center text-white shadow-lg sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <p className="text-xl font-extrabold tracking-tight sm:text-2xl">Try Rent O&apos; Mate free for 7 days</p>
                  <p className="mt-1 text-sm text-sky-100">
                    Starts from ₹{LOWEST_PRICE}/month – Get pure RO water at home, with free installation and zero maintenance worries.
                  </p>
                </div>
                <a
                  href={CUSTOMER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden /> Book Free Trial
                </a>
              </div>
              <p className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-slate-200 pt-5 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.author && (
                  <>
                    {" "}by <span className="font-bold text-slate-800">{post.author}</span>
                  </>
                )}
              </p>
            </article>

            {(previous || next) && (
              <nav aria-label="More posts" className={`${card} grid gap-4 p-5 sm:grid-cols-2`}>
                {previous && <NeighbourLink post={previous} direction="previous" />}
                {next && <NeighbourLink post={next} direction="next" />}
              </nav>
            )}

            {related.length > 0 && (
              <section className={`${card} p-5 sm:p-6`}>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1f2937]">Related Posts</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {related.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group overflow-hidden rounded-[6px] bg-white shadow-[0_2px_12px_rgb(15_23_42/0.08)] transition hover:-translate-y-0.5">
                      <BlogCover src={item.coverImage} alt={item.coverAlt} sizes="(min-width: 640px) 280px, 100vw" className="aspect-[3/2]" />
                      <div className="p-4">
                        <p className="flex items-center gap-1.5 text-sm text-slate-500">
                          <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden /> {formatDate(item.date)}
                        </p>
                        {item.category && <span className="mt-3 inline-block rounded-[4px] bg-[#051838] px-2 py-1 text-xs font-semibold text-white">{item.category}</span>}
                        <h3 className="mt-3 line-clamp-2 font-bold leading-snug text-[#1f2937] group-hover:text-[#0084FF]">{item.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <BlogSidebar posts={posts} currentSlug={post.slug} showTrialForm={false} />
        </div>
      </div>
    </>
  );
}
