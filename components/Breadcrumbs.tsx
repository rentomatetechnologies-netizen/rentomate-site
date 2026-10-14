import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href: string };

const SITE_URL = "https://rentomate.life";

/**
 * Home › … › current page. The last crumb is the current page (not a link).
 * Also emits schema.org BreadcrumbList data so search results can show the trail.
 */
export const Breadcrumbs: React.FC<{ items: Crumb[]; className?: string }> = ({ items, className = "" }) => {
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
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />}
              {isCurrent ? (
                <span aria-current="page" className="max-w-[16rem] truncate text-[#051838] sm:max-w-md">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="inline-flex items-center gap-1 text-slate-500 transition hover:text-[#0084FF]">
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
