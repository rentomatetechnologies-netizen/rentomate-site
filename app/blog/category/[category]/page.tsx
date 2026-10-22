import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { getCategories, getCategoryListing, getPosts } from "@/lib/blog";
import { getBlogBanner } from "@/lib/blog-banner";

export const revalidate = 300;

type Params = { params: Promise<{ category: string }> };

export const generateStaticParams = async () => getCategories(await getPosts()).map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const found = await getCategoryListing((await params).category);
  if (!found) return {};
  const { name, slug } = found.category;
  return pageMetadata({
    title: `${name} Articles`,
    description: `Read Rent O' Mate's articles on ${name.toLowerCase()}: guides on purifiers, water quality and healthy drinking water.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: Params) {
  const [found, banner] = await Promise.all([
    getCategoryListing((await params).category),
    getBlogBanner(),
  ]);
  if (!found) notFound();
  const { category, posts, inCategory } = found;

  return (
    <BlogListing
      allPosts={posts}
      posts={inCategory}
      banner={banner}
      page={1}
      basePath={`/blog/category/${category.slug}`}
      title={category.name}
      description={`All our articles on ${category.name.toLowerCase()}, from the Rent O' Mate team.`}
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: category.name, href: `/blog/category/${category.slug}` },
      ]}
      activeCategory={category.slug}
    />
  );
}
