import type React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCover } from "@/components/BlogCover";
import { BlogTrialForm } from "@/components/blog/BlogTrialForm";
import { byNewest, getCategories, type BlogPostSummary } from "@/lib/blog";

const Widget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-[10px] bg-white p-5 shadow-[0_2px_18px_rgb(15_23_42/0.07)]">
    <h2 className="text-2xl font-extrabold tracking-tight text-[#051838]">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

/** Right-hand column on blog pages: free-trial form, categories and the latest posts. */
export const BlogSidebar: React.FC<{ posts: BlogPostSummary[]; currentSlug?: string; activeCategory?: string; showTrialForm?: boolean }> = ({
  posts,
  currentSlug,
  activeCategory,
  showTrialForm = true,
}) => {
  const categories = getCategories(posts);
  const latest = byNewest(posts)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 4);

  return (
    <aside className="space-y-8">
      {showTrialForm && <BlogTrialForm />}

      {categories.length > 0 && (
        <Widget title="Categories">
          <ul className="divide-y divide-slate-200 border-b border-slate-200">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  aria-current={category.slug === activeCategory ? "page" : undefined}
                  className={`flex items-center justify-between py-3.5 text-base transition hover:text-[#0084FF] ${category.slug === activeCategory ? "font-bold text-[#0084FF]" : "text-slate-700"}`}
                >
                  {category.name}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>
      )}

      {latest.length > 0 && (
        <Widget title="Latest Posts">
          <ul className="divide-y divide-slate-200">
            {latest.map((post) => (
              <li key={post.slug} className="py-5 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <BlogCover src={post.coverImage} alt={post.coverAlt} sizes="200px" className="aspect-square w-40 rounded-[6px]" />
                  <h3 className="mt-2 text-base font-semibold leading-snug text-[#051838] group-hover:text-[#0084FF]">{post.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">{post.excerpt}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#051838] group-hover:text-[#0084FF]">
                    Read More <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Widget>
      )}
    </aside>
  );
};
