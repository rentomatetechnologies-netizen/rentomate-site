import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { categoryHref, getCategories, getPosts, plainTitle } from "@/lib/blog";
import { SEO_PAGES, seoPageHref } from "@/lib/seo-pages";
import { LEGAL_LINKS, NAV_LINKS, PLANS_PAGE_PATH } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Sitemap",
  description: "Every page on the RentOMate website in one place: rental plans, products, guides and blog articles.",
  path: "/site-map",
});

type Group = { title: string; links: { label: string; href: string }[] };

export default async function SiteMapPage() {
  const posts = await getPosts();

  const groups: Group[] = [
    { title: "Main pages", links: [...NAV_LINKS, { label: "Rental Plans & Pricing", href: PLANS_PAGE_PATH }] },
    { title: "Popular searches", links: SEO_PAGES.map((page) => ({ label: page.search, href: seoPageHref(page) })) },
    { title: "Blog categories", links: getCategories(posts).map((category) => ({ label: category.name, href: categoryHref(category.name) })) },
    { title: "Blog articles", links: posts.map((post) => ({ label: plainTitle(post.title), href: `/blog/${post.slug}` })) },
    { title: "Legal", links: LEGAL_LINKS },
  ].filter((group) => group.links.length > 0);

  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        breadcrumbs={[{ label: "Sitemap", href: "/site-map" }]}
        title={<>Find your way <span className="text-[#0084FF]">around</span></>}
        description="Every page on the RentOMate website in one place."
      />

      <section className="bg-white pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-[#051838]">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-slate-600 transition-colors hover:text-[#0084FF] hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>
    </>
  );
}
