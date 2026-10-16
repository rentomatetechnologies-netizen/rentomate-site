import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { BLOG_DESCRIPTION, getPosts } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Tips on safe drinking water, RO purifiers, filters and renting vs buying, from the RentOMate team.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <BlogListing
      allPosts={posts}
      posts={posts}
      page={1}
      basePath="/blog"
      title="RentOMate Blogs"
      description={BLOG_DESCRIPTION}
      breadcrumbs={[{ label: "Blog", href: "/blog" }]}
    />
  );
}
