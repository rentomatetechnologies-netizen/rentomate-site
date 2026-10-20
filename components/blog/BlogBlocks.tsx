import type React from "react";
import { Fragment } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { RentNowButton } from "@/components/RentNowButton";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getHeadings, isOptimizableImage, type BlogBlock } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

// http(s):// or www. links, stopping before trailing punctuation such as "." or ")".
const URL_PATTERN = /((?:https?:\/\/|www\.)[^\s<]*[^\s<.,;:!?'")\]])/g;

/** Text with any URLs in it turned into links: rentomate.life links open in the same tab, others in a new one. */
const Linkified: React.FC<{ text: string }> = ({ text }) =>
  text.split(URL_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.startsWith("www.") ? `https://${part}` : part;
    const internal = href.startsWith(SITE_URL);
    return (
      <a
        key={i}
        href={internal ? href.slice(SITE_URL.length) || "/" : href}
        {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className="break-words font-semibold text-[#0084FF] underline underline-offset-2 hover:text-[#0070F3]"
      >
        {part}
      </a>
    );
  });

const Block: React.FC<{ block: BlogBlock; headingId?: string }> = ({ block, headingId }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 id={headingId} className="scroll-mt-28 pt-4 text-2xl font-extrabold leading-tight tracking-tight text-[#1f2937] sm:text-[2rem]">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="rounded-r-[10px] border-l-4 border-[#0084FF] bg-sky-50 px-5 py-4 text-lg font-semibold leading-8 text-[#051838]">
          <Linkified text={block.text} />
        </blockquote>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-[#0084FF]">
          {block.items.map((item, i) => (
            <li key={i}>
              <Linkified text={item} />
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="py-2">
          <Image
            src={block.url}
            alt={block.alt}
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 860px, 100vw"
            unoptimized={!isOptimizableImage(block.url)}
            className="h-auto w-full rounded-[6px]"
          />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-slate-500">{block.caption}</figcaption>}
        </figure>
      );
    case "faq":
      return (
        <div className="space-y-3">
          {block.items.map((item, i) => (
            <details key={i} className="group rounded-[10px] border border-slate-200 bg-white open:border-sky-300 open:bg-sky-50/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-bold text-[#1f2937] [&::-webkit-details-marker]:hidden">
                <span>
                  {i + 1}. {item.question}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="whitespace-pre-line px-4 pb-4">
                <Linkified text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      );
    case "cta":
      return (
        <div className="my-4 flex flex-col items-start gap-4 rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-extrabold leading-snug sm:text-2xl">{block.text}</p>
          <RentNowButton className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50">
            {block.buttonLabel || "Book Now"}
          </RentNowButton>
        </div>
      );
    case "toc":
      return null; // rendered by BlogBlocks, which knows the headings
    default:
      return (
        <p className="whitespace-pre-line">
          <Linkified text={block.text} />
        </p>
      );
  }
};

/**
 * Renders a post's content. The table of contents goes where the admin placed a "Table of contents" block;
 * without one, it is inserted automatically before the first heading when there are 2+ headings.
 */
export const BlogBlocks: React.FC<{ blocks: BlogBlock[] }> = ({ blocks }) => {
  const headings = getHeadings(blocks);
  const idByIndex = new Map(headings.map((h) => [h.index, h.id]));
  const placed = blocks.findIndex((block) => block.type === "toc");
  const tocAt = headings.length === 0 ? -1 : placed >= 0 ? placed : headings.length >= 2 ? headings[0].index : -1;
  const toc = headings.map(({ id, text }) => ({ id, text }));

  return (
    <div className="space-y-6 text-base leading-[1.85] text-slate-600 sm:text-[17px]">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {i === tocAt && <TableOfContents headings={toc} />}
          {block.type !== "toc" && <Block block={block} headingId={idByIndex.get(i)} />}
        </Fragment>
      ))}
    </div>
  );
};

/** schema.org FAQPage data built from the post's FAQ blocks, so Google can show the questions in results. */
export const faqStructuredData = (blocks: BlogBlock[]) => {
  const items = blocks.flatMap((block) => (block.type === "faq" ? block.items : []));
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
};
