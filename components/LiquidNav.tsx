"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { NAV_LINKS } from "@/lib/site";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

// The lens moves like a drop of water: its leading edge springs ahead, the trailing edge lags behind
// and catches up with a little wobble, so the drop stretches into a "string" and snaps back together.
const LEADING_EDGE = { type: "spring", stiffness: 150, damping: 19, mass: 1 } as const;
const TRAILING_EDGE = { type: "spring", stiffness: 60, damping: 11, mass: 1.1, delay: 0.06 } as const;
// How far the lens reaches past the link on each side (px).
const LENS_OVERHANG = 0;

/**
 * Desktop page links with a clear "water drop" lens that marks the current page.
 * Clicking another link makes the drop flow over to it.
 */
export function LiquidNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  // The link just clicked: the lens moves there at once, before the new page has loaded.
  const [clicked, setClicked] = useState<string | null>(null);
  // Once the route has changed, the current page takes over from the clicked link.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setClicked(null);
  }

  const activeHref = NAV_LINKS.find((link) => isActive(pathname, link.href))?.href ?? null;
  const lensHref = clicked ?? activeHref;

  // Lens geometry as motion values (animated outside React renders).
  const left = useMotionValue(0);
  const right = useMotionValue(0);
  const restWidth = useMotionValue(0);
  const opacity = useMotionValue(0);
  const width = useTransform(() => right.get() - left.get());
  // The more the drop stretches, the thinner it gets – like water pulled into a string.
  const scaleY = useTransform(() => {
    const rest = restWidth.get() || 1;
    const stretch = Math.max(0, (right.get() - left.get()) / rest - 1);
    return Math.max(0.7, 1 - stretch * 0.32);
  });
  const placed = useRef(false);

  useLayoutEffect(() => {
    const measure = () => {
      const link = lensHref ? linkRefs.current.get(lensHref) : undefined;
      if (!link || link.offsetWidth === 0) return null;
      return { l: link.offsetLeft - LENS_OVERHANG, r: link.offsetLeft + link.offsetWidth + LENS_OVERHANG };
    };

    const target = measure();
    if (!target) {
      opacity.set(0);
      placed.current = false;
      return;
    }
    restWidth.set(target.r - target.l);
    opacity.set(1);

    // First placement (or reduced motion): no travel animation.
    if (!placed.current || reduceMotion) {
      left.jump(target.l);
      right.jump(target.r);
      placed.current = true;
    } else {
      const movingRight = target.l > left.get();
      const leftAnim = animate(left, target.l, movingRight ? TRAILING_EDGE : LEADING_EDGE);
      const rightAnim = animate(right, target.r, movingRight ? LEADING_EDGE : TRAILING_EDGE);
      return () => {
        leftAnim.stop();
        rightAnim.stop();
      };
    }

    // Keep the lens on its link if the layout changes size.
    const onResize = () => {
      const next = measure();
      if (!next) return;
      restWidth.set(next.r - next.l);
      left.jump(next.l);
      right.jump(next.r);
    };
    window.addEventListener("resize", onResize);
    // Link widths change once the web font has loaded.
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lensHref, reduceMotion, left, right, restWidth, opacity]);

  return (
    <nav aria-label="Main" className="relative hidden items-center gap-0.5 lg:flex">
      <motion.span
        aria-hidden
        className="liquid-lens absolute -bottom-0.5 -top-0.5 left-0 rounded-full"
        style={{ x: left, width, scaleY, opacity }}
      />
      {NAV_LINKS.map((link) => {
        const underLens = link.href === lensHref;
        return (
          <Link
            key={link.href}
            ref={(el) => {
              if (el) linkRefs.current.set(link.href, el);
              else linkRefs.current.delete(link.href);
            }}
            href={link.href}
            aria-current={link.href === activeHref ? "page" : undefined}
            onClick={() => setClicked(link.href)}
            className="group relative z-10 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
          >
            {/* The drop "magnifies" the label under it. */}
            <motion.span
              className="inline-block"
              animate={{ scale: underLens ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 14 }}
            >
              <span
                className={`transition-colors duration-300 ${
                  underLens ? "text-[#051838]" : "text-[#243650]/80 group-hover:text-[#051838]"
                }`}
              >
                {link.label}
              </span>
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );
}
