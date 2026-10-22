import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { BLOG_DESCRIPTION, getPosts, paginate } from "@/lib/blog";
import { getBlogBanner } from "@/lib/blog-banner";

export const revalidate = 300;

type Params = { params: Promise<{ page: string }> };

export const generateStaticParams = async () => {
  const { totalPages } = paginate(await getPosts(), 1);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({ title: `Blog – Page ${page}`, description: BLOG_DESCRIPTION, path: `/blog/page/${page}` });
}

export default async function BlogPageN({ params }: Params) {
  const page = Number((await params).page);
  if (page === 1) permanentRedirect("/blog");
  const [posts, banner] = await Promise.all([getPosts(), getBlogBanner()]);
  if (!Number.isInteger(page) || page < 1 || page > paginate(posts, 1).totalPages) notFound();

  return (
    <BlogListing
      allPosts={posts}
      posts={posts}
      banner={banner}
      page={page}
      basePath="/blog"
      title="Rent O' Mate Blogs"
      description={BLOG_DESCRIPTION}
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: `Page ${page}`, href: `/blog/page/${page}` },
      ]}
    />
  );
}
