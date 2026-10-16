import type React from "react";
import Link from "next/link";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

/** 1 … 4 5 6 … 20, always showing the first, last and neighbouring pages. */
const pageList = (current: number, total: number): (number | "gap")[] => {
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((page, i) => (i > 0 && page - sorted[i - 1] > 1 ? ["gap" as const, page] : [page]));
};

const box = "flex h-10 min-w-10 items-center justify-center rounded-[6px] border px-3 text-sm font-semibold transition";

/** Numbered pagination. `basePath` is the first page (e.g. /blog); later pages live at `${basePath}/page/N`. */
export const BlogPagination: React.FC<{ current: number; total: number; basePath: string }> = ({ current, total, basePath }) => {
  if (total <= 1) return null;
  const href = (page: number) => (page === 1 ? basePath : `${basePath}/page/${page}`);

  return (
    <nav aria-label="Blog pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} className={`${box} gap-1 border-[#0084FF] text-[#0084FF] hover:bg-sky-50`}>
          <ChevronsLeft className="h-4 w-4" aria-hidden /> Prev
        </Link>
      )}
      {pageList(current, total).map((page, i) =>
        page === "gap" ? (
          <span key={`gap-${i}`} className={`${box} border-slate-200 text-slate-400`} aria-hidden>
            …
          </span>
        ) : page === current ? (
          <span key={page} aria-current="page" className={`${box} border-[#051838] bg-[#051838] text-white`}>
            {page}
          </span>
        ) : (
          <Link key={page} href={href(page)} className={`${box} border-[#0084FF] text-[#0084FF] hover:bg-sky-50`}>
            {page}
          </Link>
        ),
      )}
      {current < total && (
        <Link href={href(current + 1)} className={`${box} gap-1 border-[#0084FF] text-[#0084FF] hover:bg-sky-50`}>
          Next <ChevronsRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </nav>
  );
};
