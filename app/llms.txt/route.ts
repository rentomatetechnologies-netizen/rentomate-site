import { PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import { SEO_PAGES, seoPageHref } from "@/lib/seo-pages";
import { KEY_SPECS, NAV_LINKS, PLANS, PLANS_PAGE_PATH, SERVICE_LOCATIONS, SITE_URL, inr } from "@/lib/site";

// /llms.txt: a plain-text summary of RentOMate for AI assistants and AI search.
// Built from the same data as the site, so plans, prices and cities never go out of date.
export function GET() {
  const link = (label: string, path: string, note = "") => `- [${label}](${SITE_URL}${path === "/" ? "" : path})${note ? `: ${note}` : ""}`;

  const body = `# RentOMate

> RentOMate rents RO water purifiers to homes in Tamil Nadu and Puducherry. Customers pay a monthly rent instead of buying the machine; installation, servicing and filter replacements are included. RentOMate is a registered service of Akvinz Water Purifiers.

## Rental plans
${PLANS.map((plan) => `- ${plan.months}-month ${plan.name}: ${inr(plan.price)}/month (refundable security deposit ${inr(plan.deposit)})`).join("\n")}
- Free installation, usually within 24–48 hours
- Lifetime free maintenance and filter replacements while renting
- 7-day risk-free trial
- Full plans, prices and terms: ${SITE_URL}${PLANS_PAGE_PATH}

## The purifier (Akvinz Ultron, ISI certified)
${KEY_SPECS.map((spec) => `- ${spec.title}: ${spec.desc}`).join("\n")}

## Cities served
${SERVICE_LOCATIONS.join(", ")}

## Contact
- Phone / WhatsApp: ${PHONE_DISPLAY}
- Email: ${SUPPORT_EMAIL}

## Main pages
${NAV_LINKS.map((page) => link(page.label, page.href)).join("\n")}

## Guides by need and area
${SEO_PAGES.map((page) => link(page.search, seoPageHref(page), page.metaDescription)).join("\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
