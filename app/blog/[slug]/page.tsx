import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { RentNowButton } from "@/components/RentNowButton";
import { BLOG_POSTS, formatDate, getPost } from "@/lib/blog";

export const generateStaticParams = () => BLOG_POSTS.map((post) => ({ slug: post.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="bg-white pt-32 pb-16 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <p className="mt-6 text-xs font-semibold text-slate-500">
          {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-[#051838] sm:text-4xl">{post.title}</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
