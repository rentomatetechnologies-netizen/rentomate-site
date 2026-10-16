import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export type Crumb = { label: string; href: string };

/**
 * Home › … › current page. The last crumb is the current page (not a link).
 * Also emits schema.org BreadcrumbList data so search results can show the trail.
 * `light` is for use on dark backgrounds such as image heroes.
 */
export const Breadcrumbs: React.FC<{ items: Crumb[]; className?: string; light?: boolean }> = ({ items, className = "", light = false }) => {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-semibold">
        {trail.map((crumb, index) => {
          const isCurrent = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
              {index > 0 && <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${light ? "text-white/70" : "text-slate-400"}`} aria-hidden />}
              {isCurrent ? (
                <span aria-current="page" className={`max-w-[16rem] truncate sm:max-w-md ${light ? "text-white" : "text-[#051838]"}`}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={`inline-flex items-center gap-1 transition ${light ? "text-white/85 hover:text-white" : "text-slate-500 hover:text-[#0084FF]"}`}>
                  {index === 0 && <Home className="h-3.5 w-3.5" aria-hidden />}
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
