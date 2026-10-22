// FAQ copy, shared by the FAQ section and the plans page (which also publishes it as FAQPage data).
import { PHONE_DISPLAY } from "@/lib/contact";
import { PLANS, inr } from "@/lib/site";

const planSummary = PLANS.map((plan) => `the ${plan.months}-month ${plan.name} plan at ${inr(plan.price)}/month (refundable deposit ${inr(plan.deposit)})`).join(" and ");

export type FaqSegment = { id: "trust" | "common" | "pricing"; label: string; faqs: [string, string][] };

export const FAQ_SEGMENTS: FaqSegment[] = [
  {
    id: "trust",
    label: "Trust",
    faqs: [
      ["Who is behind Rent O' Mate?", "Rent O' Mate is a registered rental service of Akvinz Water Purifiers, a water solutions company serving homes across Coimbatore."],
      ["Which purifier will I get?", "You get an Akvinz Ultron 8-stage RO purifier (RO + UV + UF + TDS with copper and essential minerals), available in Midnight Black and Pearl White."],
      ["Are the purifiers certified?", "Yes. Rent O' Mate provides ISI certified machines."],
      ["Who services the purifier?", "Our own trained technicians handle installation, servicing and filter swaps, free of cost while you rent."],
      ["How do I reach support?", `Call or WhatsApp our official number ${PHONE_DISPLAY}. Priority service support is included with every plan.`],
    ],
  },
  {
    id: "common",
    label: "Common Questions",
    faqs: [
      ["How does water purifier rental work?", "Choose a plan, WhatsApp us or fill in the booking form, pay the refundable deposit and first month's rent, and we install the purifier at your home."],
      ["How soon will it be installed?", "Installation is done at zero charges within 24 to 48 hours, based on your location."],
      ["Is maintenance included?", "Yes. Maintenance, service and eligible filter swaps are free for the duration of your plan."],
      ["Can tenants or PG residents rent a purifier?", "Yes. Renting is ideal for tenants, PGs and shared homes — there is nothing to buy or carry when you move."],
      ["Which areas do you serve?", "We currently serve homes across Coimbatore. Use the Check My Area option or WhatsApp us your locality to confirm."],
      ["Can I relocate the purifier?", "Yes. Relocation is supported subject to location feasibility; later moves may be chargeable as per plan terms."],
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Cancellation",
    faqs: [
      ["How much does it cost?", `We offer ${planSummary}.`],
      ["Is the security deposit refundable?", "Yes, the security deposit is 100% refundable as per the rental agreement. Any pending dues may be adjusted against it."],
      ["What is the 7-day risk-free trial?", "Use the purifier for 7 days. If you are not happy, cancel and we will uninstall it and refund your deposit, subject to conditions."],
      ["Can I cancel at any time?", "Yes, you can cancel at any point of time. Early-exit conditions in the rental agreement may apply."],
      ["Can I switch plans later?", "Plan changes are possible depending on your subscription. Contact support and we will help you."],
    ],
  },
];
