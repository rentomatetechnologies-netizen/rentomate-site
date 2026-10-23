import { PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";
import { FAQ_SEGMENTS } from "@/lib/faqs";
import { SEO_PAGES, seoPageHref } from "@/lib/seo-pages";
import { KEY_SPECS, NAV_LINKS, PLANS, PLANS_PAGE_PATH, PRICE_PER_DAY, PURIFIERS, SERVICE_LOCATIONS, SITE_URL, inr } from "@/lib/site";

// /llms.txt: a plain-text summary of Rent O' Mate for AI assistants and AI search.
// Built from the same data as the site, so plans, prices and cities never go out of date.
export function GET() {
  const link = (label: string, path: string, note = "") => `- [${label}](${SITE_URL}${path === "/" ? "" : path})${note ? `: ${note}` : ""}`;

  const body = `# Rent O' Mate

> Rent O' Mate rents RO water purifiers to homes in Tamil Nadu and Puducherry. Customers pay a monthly rent instead of buying the machine; installation, servicing and filter replacements are included. Rent O' Mate is a proprietary brand of Akvinz.

## Rental plans
${PLANS.map((plan) => `- ${plan.months}-month ${plan.name}: ${inr(plan.price)}/month (refundable security deposit ${inr(plan.deposit)})`).join("\n")}
- Free installation, usually within 24–48 hours
- Lifetime free maintenance and filter replacements while renting
- 7-day risk-free trial
- Full plans, prices and terms: ${SITE_URL}${PLANS_PAGE_PATH}

## Purifiers available on rent (Akvinz, ISI certified)
Every model rents on the same plans above.
${PURIFIERS.map((purifier) => `- ${purifier.brand} ${purifier.name}: ${purifier.tagline}. ${purifier.stages.length} stages (${purifier.stages.join(", ")}), ${purifier.storageLitres} L storage${purifier.tdsAdjustment ? ", TDS adjustment" : ""}. Colours: ${purifier.colours.map(({ colour }) => colour).join(", ")}.`).join("\n")}

## Why rent instead of buy
${KEY_SPECS.map((spec) => `- ${spec.title}: ${spec.desc}`).join("\n")}
- No upfront machine cost: about ${inr(PRICE_PER_DAY)} a day on the ${PLANS[0].name} plan
- Ideal for tenants, PGs and families who move: nothing to buy, carry or maintain

## Frequently asked questions
${FAQ_SEGMENTS.flatMap((segment) => segment.faqs).map(([question, answer]) => `Q: ${question}\nA: ${answer}`).join("\n\n")}

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
