import type React from "react";
import { Fragment } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getHeadings, htmlLinksToMarkdown, isOptimizableImage, stripLinks, type BlogBlock } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

// [anchor text](url) links, where url is http(s)://… or a site path like /blog/…
const MARKDOWN_LINK = /\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]*)\)/g;
// Bare http(s):// or www. links, stopping before trailing punctuation such as "." or ")".
const URL_PATTERN = /((?:https?:\/\/|www\.)[^\s<]*[^\s<.,;:!?'")\]])/g;

const TextLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const full = href.startsWith("www.") ? `https://${href}` : href;
  // rentomate.life links and site paths open in the same tab, others in a new one.
  const internal = full.startsWith("/") || full.startsWith(SITE_URL);
  return (
    <a
      href={full.startsWith(SITE_URL) ? full.slice(SITE_URL.length) || "/" : full}
      {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="break-words font-semibold text-[#0084FF] underline underline-offset-2 hover:text-[#0070F3]"
    >
      {children}
    </a>
  );
};

/** Text with [anchor text](url) links, <a href> links and bare URLs turned into links. */
const Linkified: React.FC<{ text: string }> = ({ text: raw }) => {
  const text = htmlLinksToMarkdown(raw);
  const parts: React.ReactNode[] = [];
  let last = 0;
  const plain = (value: string) =>
    value.split(URL_PATTERN).forEach((part, i) => parts.push(i % 2 ? <TextLink key={parts.length} href={part}>{part}</TextLink> : part));
  for (const match of text.matchAll(MARKDOWN_LINK)) {
    plain(text.slice(last, match.index));
    parts.push(
      <TextLink key={parts.length} href={match[2]}>
        {match[1]}
      </TextLink>,
    );
    last = match.index + match[0].length;
  }
  plain(text.slice(last));
  return parts;
};

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
    case "callout":
      return (
        <aside className="rounded-[10px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 sm:p-6">
          {block.title && <p className="text-lg font-extrabold tracking-tight text-[#051838]">{block.title}</p>}
          <p className={`whitespace-pre-line text-slate-700 ${block.title ? "mt-2" : ""}`}>
            <Linkified text={block.text} />
          </p>
        </aside>
      );
    case "table": {
      const [header, ...rows] = block.rows;
      if (!header) return null;
      const columns = Math.max(...block.rows.map((row) => row.length));
      const cells = (row: string[]) => Array.from({ length: columns }, (_, i) => row[i] ?? "");
      return (
        <div className="overflow-x-auto rounded-[10px] border border-slate-200">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-[15px]">
            <thead className="bg-[#051838] text-white">
              <tr>
                {cells(header).map((cell, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-bold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-slate-200 even:bg-slate-50">
                  {cells(row).map((cell, i) => (
                    <td key={i} className={`px-4 py-3 align-top leading-6 ${i === 0 ? "font-semibold text-slate-800" : ""}`}>
                      <Linkified text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "cta":
      return null; // retired: the post page shows a fixed call to action instead
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
 * Pass `showToc={false}` when the page renders the table of contents elsewhere.
 */
export const BlogBlocks: React.FC<{ blocks: BlogBlock[]; showToc?: boolean }> = ({ blocks, showToc = true }) => {
  const headings = getHeadings(blocks);
  const idByIndex = new Map(headings.map((h) => [h.index, h.id]));
  const placed = blocks.findIndex((block) => block.type === "toc");
  const tocAt = !showToc || headings.length === 0 ? -1 : placed >= 0 ? placed : headings.length >= 2 ? headings[0].index : -1;
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
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: stripLinks(item.answer) } })),
  };
};
