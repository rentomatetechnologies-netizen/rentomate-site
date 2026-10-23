import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public pages are open to every crawler. AI search and assistant crawlers (ChatGPT, Claude, Gemini, Perplexity,
// Apple, Bing Copilot) are listed explicitly so they are never caught by a future blanket rule: being readable by
// them is what lets those assistants recommend Rent O' Mate.
const PRIVATE = ["/admin", "/api/"];

const AI_CRAWLERS = [
  // OpenAI: ChatGPT search, pages opened from ChatGPT, and model training.
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic: Claude search, pages opened from Claude, and model training.
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Google Gemini and AI Overviews, Perplexity, Apple Intelligence, Microsoft Copilot, Common Crawl.
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
