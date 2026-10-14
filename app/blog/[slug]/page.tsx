import type { Metadata } from "next";
import { OPEN_GRAPH_DEFAULTS } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogCover } from "@/components/BlogCover";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RentNowButton } from "@/components/RentNowButton";
import { formatDate, getPost, getPosts, isOptimizableImage, type BlogBlock } from "@/lib/blog";

export const revalidate = 300;

export const generateStaticParams = async () => (await getPosts()).map((post) => ({ slug: post.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const description = post.seoDescription || post.excerpt;
  return {
    title: post.seoTitle || post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.seoTitle || post.title,
      description,
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt }] : undefined,
    },
  };
}

const Block: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-4 text-2xl font-extrabold tracking-tight text-[#051838]">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="rounded-r-[10px] border-l-4 border-[#0084FF] bg-sky-50 px-5 py-4 text-lg font-semibold leading-8 text-[#051838]">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-[#0084FF]">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="py-2">
          <Image
            src={block.url}
            alt={block.alt}
            width={1200}
            height={750}
            sizes="(min-width: 768px) 768px, 100vw"
            unoptimized={!isOptimizableImage(block.url)}
            className="h-auto w-full rounded-[10px]"
          />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-slate-500">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return <p>{block.text}</p>;
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="bg-white pt-6 pb-16 lg:pt-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
        {post.category && (
          <p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#0084FF]">{post.category}</p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[#051838] sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-xs font-semibold text-slate-500">
          {[formatDate(post.date), `${post.readMinutes} min read`, post.author].filter(Boolean).join(" · ")}
        </p>
      </div>

      {post.coverImage && (
        <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6">
          <BlogCover
            src={post.coverImage}
            alt={post.coverAlt}
            sizes="(min-width: 1024px) 1024px, 100vw"
            preload
            className="aspect-[16/9] rounded-[10px]"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-[10px] border border-sky-100 bg-sky-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-bold text-slate-900">Want pure water at home without buying a purifier?</p>
          <RentNowButton>Rent Now</RentNowButton>
        </div>
      </div>
    </article>
  );
}
