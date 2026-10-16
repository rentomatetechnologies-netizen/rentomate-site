import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { RentNowButton } from "@/components/RentNowButton";
import { isOptimizableImage } from "@/lib/blog";
import type { BlogBanner as Banner } from "@/lib/blog-banner";
import { LOWEST_PRICE } from "@/lib/site";

const PERKS = ["FREE Maintenance", "FREE Installation", "FREE Filter Replacement"];

/** Wraps `children` in whatever the admin chose a click to do: open the lead form, go to a link, or nothing. */
const Clickable: React.FC<{ link: string; className: string; children: React.ReactNode }> = ({ link, className, children }) =>
  link === "lead" ? (
    <RentNowButton className={className}>{children}</RentNowButton>
  ) : link.startsWith("/") ? (
    <Link href={link} className={className}>
      {children}
    </Link>
  ) : link ? (
    <a href={link} target="_blank" rel="noopener sponsored" className={className}>
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  );

/** Built-in RentOMate promo, shown when the admin hasn't uploaded a banner image. */
const DefaultPromo: React.FC<{ link: string }> = ({ link }) => (
  <div className="grid overflow-hidden rounded-[6px] bg-[#0084FF] text-[#051838] sm:grid-cols-[0.9fr_1.25fr_0.85fr]">
    {/* Left: trial badge, price and purifiers */}
    <div className="relative flex flex-col bg-[#f59e0b] pt-5 sm:pt-6">
      <span className="self-start rounded-r-full bg-[#051838] py-2 pl-5 pr-6 text-white">
        <span className="block text-xl font-extrabold leading-none sm:text-2xl">7-Days</span>
        <span className="mt-1 block text-xs font-semibold">Risk-free trial</span>
      </span>
      <div className="mt-5 flex-1 rounded-tr-[90px] bg-[#051838] px-5 pb-0 pt-5 text-white">
        <p className="text-sm font-extrabold uppercase tracking-wide">Unlimited</p>
        <p className="text-xs text-sky-100">Pure water starting at</p>
        <p className="mt-1 font-extrabold leading-none">
          <span className="text-4xl">₹{LOWEST_PRICE}</span>
          <span className="text-sm font-semibold">*/month</span>
        </p>
        <div className="relative mt-3 flex h-28 items-end gap-1 sm:h-32">
          <Image src="/hero/purifier-transparent.png" alt="" width={140} height={140} className="h-full w-auto object-contain" />
          <Image src="/hero/purifier-white.webp" alt="" width={140} height={140} className="h-[85%] w-auto object-contain" />
        </div>
      </div>
    </div>

    {/* Middle: headline, perks and button */}
    <div className="flex flex-col items-center justify-center bg-[#f59e0b] px-5 py-6 text-center">
      <p className="text-2xl font-extrabold text-[#051838] sm:text-3xl">RentOMate</p>
      <p className="mt-1 text-lg font-bold leading-snug sm:text-xl">
        RO+UV+Copper Purifier for a Healthier &amp; Hydrated lifestyle
      </p>
      <ul className="mt-4 space-y-2 text-left">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 className="h-6 w-6 shrink-0 fill-emerald-500 text-white" aria-hidden /> {perk}
          </li>
        ))}
      </ul>
      <Clickable
        link={link || "lead"}
        className="mt-5 inline-block rounded-full border-2 border-white bg-[#051838] px-10 py-2 text-base font-bold uppercase text-white shadow-lg transition hover:bg-[#0084FF]"
      >
        Book Now
      </Clickable>
    </div>

    {/* Right: brand image */}
    <div className="relative hidden min-h-64 bg-gradient-to-b from-[#0084FF] to-[#051838] sm:block">
      <Image src="/rentomate-wordmark-white.png" alt="RentOMate" width={120} height={24} className="absolute right-4 top-4 z-10 h-5 w-auto" />
      <Image src="/hero/rentomate-hero.webp" alt="RentOMate purifiers on rent" fill sizes="280px" className="object-cover object-[30%_center]" />
    </div>
  </div>
);

/** The site-wide promo banner inside an article: the admin's uploaded image, or the built-in RentOMate promo. */
export const BlogBanner: React.FC<{ banner: Banner }> = ({ banner }) => (
  <aside aria-label="Advertisement" className="py-2">
    {banner.image ? (
      <Clickable link={banner.link} className="block w-full cursor-pointer overflow-hidden rounded-[6px] text-left transition hover:opacity-95 hover:shadow-lg">
        <Image
          src={banner.image}
          alt={banner.alt || "RentOMate water purifier on rent"}
          width={1600}
          height={830}
          sizes="(min-width: 1024px) 860px, 100vw"
          unoptimized={!isOptimizableImage(banner.image)}
          className="h-auto w-full"
        />
      </Clickable>
    ) : (
      <DefaultPromo link={banner.link} />
    )}
  </aside>
);
