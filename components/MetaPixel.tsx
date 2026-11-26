"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Meta (Facebook/Instagram) Pixel, for ad measurement. Rendered by <SiteShell>, so it never loads on /admin.
// Mentioned in the privacy policy; update that page if this is removed or changed.
export const META_PIXEL_ID = "1153544077256712";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const MetaPixel: React.FC = () => {
  const pathname = usePathname();
  const lastTracked = useRef(pathname);

  // The base code tracks the first page. Next.js changes pages without a full reload, so later pages are tracked here.
  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's no-JavaScript fallback; must be a plain <img> */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
};
