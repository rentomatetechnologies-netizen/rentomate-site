// npm run indexnow: submits every URL in the live sitemap to IndexNow (Bing, and the search engines that share its
// submissions), so new and changed pages are recrawled within minutes. Run it after deploying site changes;
// blog posts are submitted automatically by rentomate-backend when they are published, edited or deleted.
import { readFileSync } from "node:fs";

const SITE_URL = (process.env.SITE_URL || "https://rentomate.life").replace(/\/$/, "");
// The site serves this file at /indexnow-key.txt, which proves to IndexNow that we own the site.
const key = readFileSync(new URL("../public/indexnow-key.txt", import.meta.url), "utf8").trim();

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) => {
  if (!res.ok) throw new Error(`Could not load ${SITE_URL}/sitemap.xml (${res.status})`);
  return res.text();
});
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());

const live = await fetch(`${SITE_URL}/indexnow-key.txt`).then((res) => (res.ok ? res.text() : ""));
if (live.trim() !== key) throw new Error(`${SITE_URL}/indexnow-key.txt is missing or different; deploy the website first.`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: `${SITE_URL}/indexnow-key.txt`, urlList }),
});
// 200 = accepted, 202 = accepted and the key is still being verified.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) process.exit(1);
