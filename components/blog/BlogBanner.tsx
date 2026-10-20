import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { RentNowButton } from "@/components/RentNowButton";
import { isOptimizableImage } from "@/lib/blog";
import {
  type BlogBanner as Banner,
  DEFAULT_BLOG_BANNER_IMAGE,
  DEFAULT_BLOG_BANNER_ALT,
} from "@/lib/blog-banner";

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

/**
 * Site-wide 7-day trial promo banner shown on the blog pages and inside blog articles:
 * Displays the custom banner uploaded to the database, or the fixed 7-day trial template if no image was uploaded.
 */
export const BlogBanner: React.FC<{ banner: Banner; className?: string }> = ({ banner, className = "" }) => {
  if (!banner.enabled) return null;

  const imageSrc = banner.image?.trim() || DEFAULT_BLOG_BANNER_IMAGE;
  const altText = banner.alt?.trim() || DEFAULT_BLOG_BANNER_ALT;

  return (
    <aside aria-label="7 Days Risk-Free Trial Promo" className={`py-2 ${className}`}>
      <Clickable
        link={banner.link || "lead"}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-[10px] text-left shadow-[0_2px_18px_rgb(15_23_42/0.07)] transition duration-200 hover:shadow-xl hover:opacity-95"
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={1600}
          height={900}
          sizes="(min-width: 1280px) 860px, (min-width: 1024px) 700px, 100vw"
          unoptimized={!isOptimizableImage(imageSrc)}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </Clickable>
    </aside>
  );
};
