import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { BLOG_DESCRIPTION, getPosts } from "@/lib/blog";
import { getBlogBanner } from "@/lib/blog-banner";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Tips on safe drinking water, RO purifiers, filters and renting vs buying, from the Rent O' Mate team.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, banner] = await Promise.all([getPosts(), getBlogBanner()]);
  return (
    <BlogListing
      allPosts={posts}
      posts={posts}
      banner={banner}
      page={1}
      basePath="/blog"
      title="Rent O' Mate Blogs"
      description={BLOG_DESCRIPTION}
      breadcrumbs={[{ label: "Blog", href: "/blog" }]}
    />
  );
}
