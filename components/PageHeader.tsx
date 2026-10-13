import React from "react";

/** Title band at the top of inner pages; the top padding clears the fixed navbar. */
export const PageHeader: React.FC<{ eyebrow: string; title: React.ReactNode; description?: string }> = ({ eyebrow, title, description }) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-32 pb-10 sm:pt-40 sm:pb-12">
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#051838] sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
    </div>
  </section>
);
