import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";
import { getCategories, getCategoryListing, getPosts, paginate } from "@/lib/blog";

export const revalidate = 300;

type Params = { params: Promise<{ category: string; page: string }> };

export const generateStaticParams = async () => {
  const posts = await getPosts();
  return getCategories(posts).flatMap(({ slug, count }) => {
    const { totalPages } = paginate(Array.from({ length: count }), 1);
    return Array.from({ length: totalPages - 1 }, (_, i) => ({ category: slug, page: String(i + 2) }));
  });
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, page } = await params;
  const found = await getCategoryListing(category);
  if (!found) return {};
  const { name, slug } = found.category;
  return pageMetadata({
    title: `${name} Articles – Page ${page}`,
    description: `Read RentOMate's articles on ${name.toLowerCase()}: guides on purifiers, water quality and healthy drinking water.`,
    path: `/blog/category/${slug}/page/${page}`,
  });
}

export default async function CategoryPageN({ params }: Params) {
  const { category: slug, page: rawPage } = await params;
  const page = Number(rawPage);
  if (page === 1) permanentRedirect(`/blog/category/${slug}`);
  const found = await getCategoryListing(slug);
  if (!found || !Number.isInteger(page) || page < 1 || page > paginate(found.inCategory, 1).totalPages) notFound();
  const { category, posts, inCategory } = found;
  const basePath = `/blog/category/${category.slug}`;

  return (
    <BlogListing
      allPosts={posts}
      posts={inCategory}
      page={page}
      basePath={basePath}
      title={category.name}
      description={`All our articles on ${category.name.toLowerCase()}, from the RentOMate team.`}
      breadcrumbs={[
        { label: "Blog", href: "/blog" },
        { label: category.name, href: basePath },
        { label: `Page ${page}`, href: `${basePath}/page/${page}` },
      ]}
      activeCategory={category.slug}
    />
  );
}
