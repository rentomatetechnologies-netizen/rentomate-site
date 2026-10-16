import type React from "react";
import Link from "next/link";
import { categoryHref } from "@/lib/blog";

export const CategoryBadge: React.FC<{ name: string; className?: string }> = ({ name, className = "" }) => (
  <Link
    href={categoryHref(name)}
    className={`inline-block rounded-[4px] bg-[#051838] px-2 py-1 text-xs font-semibold text-white transition hover:bg-[#0084FF] ${className}`}
  >
    {name}
  </Link>
);
