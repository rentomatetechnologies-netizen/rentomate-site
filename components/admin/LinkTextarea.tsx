"use client";

import { useRef } from "react";
import { Link2 } from "lucide-react";
import { htmlLinksToMarkdown } from "@/lib/blog";

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};

const BLOCK_TAGS = new Set(["P", "DIV", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "TR"]);

/** "www.x.com" or "x.com/page" → "https://…"; site paths and full URLs stay as they are. */
const normalizeUrl = (value: string) => {
  const url = value.trim();
  if (!url || url.startsWith("/") || /^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

/** Text of copied HTML (Word, Google Docs, web pages) with its links kept as [anchor](url). */
function htmlToLinkedText(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? "").replace(/\s+/g, " ");
    if (!(node instanceof HTMLElement)) return "";
    if (node.tagName === "BR") return "\n";
    if (node.tagName === "STYLE" || node.tagName === "SCRIPT") return "";
    const inner = [...node.childNodes].map(walk).join("");
    const href = node.tagName === "A" ? node.getAttribute("href")?.trim() : "";
    if (href && /^(https?:\/\/|\/)/i.test(href) && inner.trim()) return `[${inner.trim()}](${href})`;
    return BLOCK_TAGS.has(node.tagName) ? `${inner.trim()}\n` : inner;
  };
  return walk(doc.body).replace(/\n{3,}/g, "\n\n").trim();
}

/** A textarea for post text with a Link button, which also keeps links when text is pasted from Word or Google Docs. */
export function LinkTextarea({ value, onChange, className, ...props }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Replaces the selection with `text`, then selects [from, to] inside the inserted text.
  const insert = (text: string, select?: [number, number]) => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    onChange(value.slice(0, start) + text + value.slice(el.selectionEnd));
    requestAnimationFrame(() => {
      el.focus();
      const [from, to] = select ?? [text.length, text.length];
      el.setSelectionRange(start + from, start + to);
    });
  };

  const addLink = () => {
    const el = ref.current;
    if (!el) return;
    const selected = value.slice(el.selectionStart, el.selectionEnd).trim();
    const url = normalizeUrl(prompt(selected ? `Link "${selected}" to which URL?` : "Link URL (e.g. https://example.com or /ro-on-rent)") ?? "");
    if (!url) return;
    const label = selected || "link text";
    // With nothing selected, "link text" is left selected so it can be typed over.
    insert(`[${label}](${url})`, selected ? undefined : [1, 1 + label.length]);
  };

  const paste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const html = e.clipboardData.getData("text/html");
    const plain = e.clipboardData.getData("text/plain");
    const text = html && /<a\s[^>]*href/i.test(html) ? htmlToLinkedText(html) : /<a\s[^>]*href/i.test(plain) ? htmlLinksToMarkdown(plain) : null;
    if (text === null) return;
    e.preventDefault();
    insert(text);
  };

  return (
    <div className="relative">
      <textarea ref={ref} className={`${className ?? ""} pr-20`} value={value} onChange={(e) => onChange(e.target.value)} onPaste={paste} {...props} />
      <button
        type="button"
        className="btn btn-sm absolute right-2 top-2 gap-1 px-2 py-1 text-xs"
        title="Select words, then click to turn them into a link"
        onMouseDown={(e) => e.preventDefault()}
        onClick={addLink}
      >
        <Link2 className="h-3.5 w-3.5" /> Link
      </button>
    </div>
  );
}
