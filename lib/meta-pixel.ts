// Meta (Facebook/Instagram) Pixel, for ad measurement. Mentioned in the privacy policy; update that page if this is removed.
export const META_PIXEL_ID = "1153544077256712";

/**
 * Meta's base code, placed in <head> by the root layout as Meta's setup instructions ask, so it's in the page source
 * Meta checks. It tracks the first page view and skips /admin. Later page views: components/MetaPixel.tsx.
 */
export const META_PIXEL_SCRIPT = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
if(location.pathname.indexOf('/admin')!==0){fbq('init','${META_PIXEL_ID}');fbq('track','PageView');}`;

/** Fallback for browsers with JavaScript off. */
export const META_PIXEL_NOSCRIPT_SRC = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
