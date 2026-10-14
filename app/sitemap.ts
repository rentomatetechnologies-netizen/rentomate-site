import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SEO_PAGES, seoPageHref } from "@/lib/seo-pages";
import { NAV_LINKS, PLANS_PAGE_PATH, SITE_URL } from "@/lib/site";

// Every public page: the main pages, the Popular-search landing pages and published blog posts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  return [
    ...NAV_LINKS.map((link) => ({
      url: url(link.href),
      changeFrequency: "weekly" as const,
      priority: link.href === "/" ? 1 : link.href === "/ro-on-rent" ? 0.9 : 0.7,
    })),
    { url: url(PLANS_PAGE_PATH), changeFrequency: "monthly" as const, priority: 0.9 },
    ...SEO_PAGES.map((page) => ({ url: url(seoPageHref(page)), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
