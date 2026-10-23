import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import founderPhoto from "@/assets/images/team/ravi-baskar-profile.jpg";
import { pageMetadata } from "@/lib/seo";
import { PLANS_PAGE_PATH } from "@/lib/site";
import {
  BadgeIndianRupee,
  CheckCircle2,
  Eye,
  HeartHandshake,
  Home,
  MessagesSquare,
  Quote,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AvailableCities } from "@/components/AvailableCities";

const SEO_TITLE = "About RentOMate | Water Purifier Rentals in Coimbatore";
const SEO_DESCRIPTION =
  "Discover RentOMate in Coimbatore, founded on 20+ years of professional experience across consumer durables, sales, service and business development. Explore smarter water purifier rentals.";

// The SEO title already names the brand, so it skips the layout's " | Rent O' Mate" template.
const base = pageMetadata({ title: "About Us", description: SEO_DESCRIPTION, path: "/about-us" });
export const metadata: Metadata = {
  ...base,
  title: { absolute: SEO_TITLE },
  keywords: ["Water purifier rental in Coimbatore", "RentOMate", "water purifier on rent", "affordable appliance rentals in Coimbatore"],
  openGraph: { ...base.openGraph, title: SEO_TITLE },
  twitter: { ...base.twitter, title: SEO_TITLE },
};

const INTRO = [
  "At RentOMate, we believe that enjoying the benefits of essential household appliances should not always require a significant upfront investment. We help customers explore a smarter alternative to traditional ownership through convenient rental solutions designed around their everyday needs.",
  "We aim to make essential appliances more accessible while helping customers manage their household expenses and reduce the responsibilities associated with ownership.",
];

const STORY = [
  "RentOMate was built around a simple observation: owning an appliance involves more than its purchase price. Maintenance, servicing, repairs and replacement can add to the overall cost and effort of ownership.",
  "We believe there is another way.",
  "By offering appliance rental solutions, starting with water purifiers in Coimbatore, RentOMate aims to make everyday living simpler through accessible rental plans and customer-focused service support.",
  "Whether you are a family setting up a new home, a working professional, a tenant or someone who values flexibility, RentOMate offers an alternative worth considering.",
  "Our goal is to help customers access the appliances they need without necessarily committing to permanent ownership.",
];

const FOUNDER = [
  "RentOMate is founded on the professional experience and customer-focused vision of D. Ravi Baskar, who brings over 20 years of experience across consumer durables, sales and marketing, customer service, service operations, team leadership and business development.",
  "Throughout his professional journey, he has gained experience across multiple business functions, providing a broad perspective on customer expectations, operational requirements, service delivery and business growth.",
  "His experience has helped shape an important principle behind RentOMate: a successful appliance business should focus not only on the product but also on the overall customer experience.",
  "Understanding how products are marketed, delivered, serviced and supported has influenced the vision to create a rental model that places convenience, affordability and customer satisfaction at its centre.",
  "With RentOMate, D. Ravi Baskar aims to bring this customer-first perspective to the household appliance rental space, offering consumers an alternative to traditional ownership and encouraging a more flexible approach to modern living.",
  "His vision is to build a trusted rental brand that combines practical appliance solutions with transparent rental terms and dependable service support.",
];

const FOUNDER_EXPERTISE = [
  "Consumer durables",
  "Sales & marketing",
  "Customer service",
  "Service operations",
  "Team leadership",
  "Business development",
];

const OFFERINGS = [
  { icon: Wallet, title: "Affordable Rental Plans", desc: "Access essential appliances with manageable monthly payments and a lower initial financial commitment than outright purchase." },
  { icon: Home, title: "Convenience", desc: "Enjoy modern household appliances without necessarily taking on permanent ownership." },
  { icon: Wrench, title: "Service Support", desc: "Receive maintenance and service assistance according to the coverage and terms of your selected plan." },
  { icon: Users, title: "Customer-Focused Solutions", desc: "Find practical options that suit your household requirements and budget." },
  { icon: MessagesSquare, title: "Transparent Communication", desc: "Understand rental charges, service coverage and applicable conditions before subscribing." },
];

const REASONS = [
  "Reduced upfront expenditure compared with purchasing an appliance.",
  "Clearly defined monthly rental charges.",
  "Service support as specified in the selected plan.",
  "Greater flexibility for changing household needs.",
  "A customer-first approach informed by practical business and service experience.",
];

const VISION =
  "To build RentOMate into a trusted appliance rental brand originating in Coimbatore and expanding across Tamil Nadu and beyond, making smart, flexible and affordable living accessible to more households.";

const MISSION =
  "To simplify everyday living through convenient appliance rental solutions, transparent plans and customer-focused service, helping people make informed decisions about essential household products.";

const VALUES = [
  { icon: HeartHandshake, title: "Customer First", desc: "Understand customer needs and design solutions around everyday challenges." },
  { icon: ShieldCheck, title: "Trust and Transparency", desc: "Communicate rental terms, charges and service coverage clearly." },
  { icon: Sparkles, title: "Convenience", desc: "Make access to essential appliances simpler and more flexible." },
  { icon: BadgeIndianRupee, title: "Value for Money", desc: "Help customers explore alternatives to large upfront purchases." },
  { icon: RefreshCw, title: "Continuous Improvement", desc: "Apply learning from customer feedback and service experience to improve the rental journey." },
];

const COMMITMENT = [
  "At RentOMate, we believe trust is earned through clear communication, responsible service and consistent attention to customer needs.",
  "We aim to make every stage of the rental journey—from choosing a plan to requesting service—as straightforward as possible.",
  "Our commitment is to provide clear rental conditions and service support in accordance with the selected plan, helping customers make confident and informed decisions.",
];

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-[10px] bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 ring-1 ring-sky-200">
    {children}
  </span>
);

const Paragraphs = ({ items }: { items: string[] }) => (
  <div className="space-y-4 text-justify text-base leading-8 text-slate-700">
    {items.map((text) => (
      <p key={text}>{text}</p>
    ))}
  </div>
);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About RentOMate"
        breadcrumbs={[{ label: "About", href: "/about-us" }]}
        title={<>Own less. <span className="text-[#0084FF]">Live smart.</span></>}
        description="Welcome to RentOMate, a smart appliance rental initiative based in Coimbatore, Tamil Nadu, created to make modern living more convenient, flexible and affordable."
      />

      {/* Intro + philosophy */}
      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[3fr_2fr] lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#051838] sm:text-3xl">
              A Smarter Way to <span className="text-[#0084FF]">Live, Rent and Save</span>
            </h2>
            <div className="mt-4">
              <Paragraphs items={INTRO} />
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-7 text-white shadow-lg sm:p-9">
            <Quote className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 text-white/[0.06]" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Our philosophy is simple</p>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Own Less. <span className="text-sky-300">Live Smart.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-slate-50 py-12 lg:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              Ownership costs <span className="text-[#0084FF]">more than the price tag</span>
            </h2>
          </div>
          <Paragraphs items={STORY} />
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Eyebrow>Our Founder</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              D. Ravi <span className="text-[#0084FF]">Baskar</span>
            </h2>
            <p className="mt-2 text-base font-semibold text-slate-600">Driven by Experience. Guided by Customer Needs.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <aside className="h-fit rounded-[10px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white p-7 shadow-sm">
              {/* Full photo, uncropped, so the RentOMate logo on the t-shirt stays visible. */}
              <div className="text-center">
                <Image
                  src={founderPhoto}
                  alt="D. Ravi Baskar, founder of RentOMate"
                  sizes="(min-width: 1024px) 380px, 384px"
                  placeholder="blur"
                  className="mx-auto h-auto w-full max-w-sm rounded-[10px] shadow-md ring-4 ring-white lg:max-w-none"
                />
                <p className="mt-4 text-lg font-extrabold text-[#051838]">D. Ravi Baskar</p>
                <p className="text-sm font-semibold text-sky-700">Founder, RentOMate</p>
              </div>
              <p className="mt-5 border-t border-slate-200 pt-5 text-5xl font-extrabold text-[#051838]">
                20<span className="text-[#0084FF]">+</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">years of professional experience</p>
              <ul className="mt-6 space-y-2 border-t border-slate-200 pt-6">
                {FOUNDER_EXPERTISE.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#0084FF] text-white" aria-hidden /> {area}
                  </li>
                ))}
              </ul>
            </aside>
            <Paragraphs items={FOUNDER} />
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-slate-50 py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <Eyebrow>What We Do</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              Water purifier rental <span className="text-[#0084FF]">in Coimbatore</span>
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Our initial focus is on water purifier rentals in Coimbatore, Tamil Nadu, helping households explore a convenient alternative to
              purchasing a purifier outright. RentOMate aims to make the rental experience straightforward through:
            </p>
          </div>
          {/* Five cards: 3 + 2 on desktop and 2 + 2 + 1 on tablet, with the short last row centred. */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {OFFERINGS.map(({ icon: Icon, title, desc }, index) => (
              <div
                key={title}
                className={`rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md lg:col-span-2 ${
                  index === 3 ? "lg:col-start-2" : ""
                } ${index === OFFERINGS.length - 1 ? "sm:col-span-2 sm:w-[calc(50%-0.625rem)] sm:justify-self-center lg:w-full" : ""}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            As the brand develops, our broader vision is to explore additional rental solutions that support the changing needs of modern households.
          </p>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Eyebrow>Why Choose RentOMate?</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              More than <span className="text-[#0084FF]">an appliance</span>
            </h2>
            <p className="mt-4 text-justify text-base leading-8 text-slate-700">
              We understand that customers want more than an appliance. They want convenience, value for money and support they can rely on.
            </p>
            <p className="mt-4 text-justify text-base leading-8 text-slate-700">
              Our aim is to make appliance rentals an accessible and worthwhile option for households in Coimbatore.
            </p>
          </div>
          <div className="rounded-[10px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">RentOMate aims to provide a better rental experience through</p>
            <ul className="mt-4 space-y-3">
              {REASONS.map((reason) => (
                <li key={reason} className="flex gap-2 text-base font-medium text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#0084FF] text-white" aria-hidden /> {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="bg-white pb-12 lg:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              Our <span className="text-[#0084FF]">Vision &amp; Mission</span>
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative flex flex-col overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] p-7 text-white shadow-lg sm:p-9">
              <Quote className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 text-white/[0.06]" aria-hidden />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sky-300 ring-1 ring-white/20">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Our Vision</h3>
              <p className="mt-3 text-justify text-lg font-semibold leading-relaxed sm:text-xl">{VISION}</p>
            </div>

            <div className="rounded-[10px] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-white p-7 shadow-sm sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <Target className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-sky-700">Our Mission</h3>
              <p className="mt-3 text-justify text-lg font-semibold leading-relaxed text-slate-800 sm:text-xl">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Eyebrow>Our Values</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              What we <span className="text-[#0084FF]">stand for</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-[10px] border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & quality */}
      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <Eyebrow>Trust &amp; Quality</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#051838] sm:text-4xl">
              Our Commitment to <span className="text-[#0084FF]">Trust and Quality</span>
            </h2>
          </div>
          <Paragraphs items={COMMITMENT} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white pb-12 lg:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#051838] via-[#0a2a5c] to-[#0070F3] px-6 py-10 text-center text-white sm:px-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Rent Smart. Live Better.</h2>
              <p className="mt-4 text-base leading-7 text-sky-100">
                You do not have to own everything to enjoy a comfortable lifestyle. With RentOMate, discover a more flexible way to access essential
                household appliances, supported by a customer-first philosophy and a vision for smarter living.
              </p>
              <p className="mt-4 text-lg font-extrabold">
                RentOMate – Own Less. <span className="text-sky-300">Live Smart.</span>
              </p>
              <p className="mt-1 text-sm text-sky-200">Based in Coimbatore, Tamil Nadu.</p>
              <p className="mt-6 text-base font-semibold">Ready to make the smarter choice?</p>
              <p className="mt-1 text-sm text-sky-100">Explore our water purifier rental plans or contact our team to find a solution that suits your home.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href={PLANS_PAGE_PATH} className="rounded-[10px] bg-white px-7 py-3 text-sm font-bold text-[#051838] shadow-lg transition hover:bg-sky-50">
                  View Rental Plans
                </Link>
                <Link href="/contact" className="rounded-[10px] border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AvailableCities />
    </>
  );
}
