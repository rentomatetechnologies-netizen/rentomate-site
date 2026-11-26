"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Next.js changes pages without a full reload, so pages after the first are tracked here. Rendered by <SiteShell> (not on /admin). */
export const MetaPixelPageViews: React.FC = () => {
  const pathname = usePathname();
  const lastTracked = useRef(pathname);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
};
