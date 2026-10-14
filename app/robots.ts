import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public pages are open to every crawler. OAI-SearchBot (ChatGPT search) and ChatGPT-User (pages opened
// from ChatGPT) are listed explicitly so they are never caught by a future blanket rule.
const PRIVATE = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["OAI-SearchBot", "ChatGPT-User"], allow: "/", disallow: PRIVATE },
      { userAgent: "*", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
