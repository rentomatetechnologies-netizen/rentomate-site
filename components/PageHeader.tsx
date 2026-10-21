import React from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

/** Title band at the top of inner pages, with breadcrumbs. The navbar is sticky (in flow), so only a small top gap is needed. */
export const PageHeader: React.FC<{ eyebrow: string; title: React.ReactNode; description?: string; breadcrumbs: Crumb[]; justify?: boolean }> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  justify,
}) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-6 pb-10 sm:pb-12 lg:pt-10">
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbs} className="mb-5" />
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#051838] sm:text-5xl">{title}</h1>
      {description && <p className={`mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg ${justify ? "text-justify hyphens-auto" : ""}`}>{description}</p>}
    </div>
  </section>
);
