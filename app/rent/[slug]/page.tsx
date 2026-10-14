import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { RentalPlans } from "@/components/RentalPlans";
import { HowItWorks } from "@/components/HowItWorks";
import { FreeTrial } from "@/components/FreeTrial";
import { FaqSection } from "@/components/FaqSection";
import { RentNowButton } from "@/components/RentNowButton";
import { SEO_PAGES, getSeoPage, seoPageHref } from "@/lib/seo-pages";

// Landing pages for the footer's Popular searches (content in lib/seo-pages.ts). Unknown slugs 404.
export const dynamicParams = false;

export const generateStaticParams = () => SEO_PAGES.map((page) => ({ slug: page.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: seoPageHref(page) },
    openGraph: { title: page.title, description: page.metaDescription, url: seoPageHref(page) },
  };
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        breadcrumbs={[
          { label: "RO on Rent", href: "/ro-on-rent" },
          { label: page.search, href: seoPageHref(page) },
        ]}
        title={<>{page.heading.lead} <span className="text-[#0084FF]">{page.heading.highlight}</span></>}
        description={page.description}
      />

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="space-y-4 text-justify text-base leading-7 text-slate-600 lg:col-span-7">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="pt-2">
              <RentNowButton>Rent Now</RentNowButton>
            </div>
          </div>
          <ul className="grid content-start gap-3 rounded-[10px] border border-sky-100 bg-sky-50/60 p-5 sm:p-6 lg:col-span-5">
            {page.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm font-semibold text-[#051838]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RentalPlans />
      <HowItWorks />
      <FreeTrial />
      <FaqSection />
    </>
  );
}
