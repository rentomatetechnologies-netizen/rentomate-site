import React from "react";
import { PageHeader } from "@/components/PageHeader";

export type LegalSection = { heading: string; body: React.ReactNode };

/** Shared layout for the Privacy Policy and Terms of Use: header, "last updated" date and numbered sections. */
const bodyClass =
  "space-y-3 text-justify text-[15px] leading-7 text-slate-600 hyphens-auto [&_a]:font-semibold [&_a]:text-[#0084FF] [&_a:hover]:underline [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5";

export const LegalPage: React.FC<{
  title: string;
  path: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  /** Optional unnumbered text shown before section 1. */
  preamble?: React.ReactNode;
}> = ({ title, path, intro, updated, sections, preamble }) => (
  <>
    <PageHeader eyebrow="Legal" breadcrumbs={[{ label: title, href: path }]} title={title} description={intro} />

    <section className="bg-white pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">Last updated: {updated}</p>
        <div className="mt-6 space-y-8 rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {preamble && <div className={bodyClass}>{preamble}</div>}
          {sections.map((section, index) => (
            <div key={section.heading}>
              <h2 className="text-xl font-extrabold tracking-tight text-[#051838]">
                {index + 1}. {section.heading}
              </h2>
              <div className={`mt-3 ${bodyClass}`}>
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);
