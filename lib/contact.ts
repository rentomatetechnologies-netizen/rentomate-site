// Single source of truth for Rent O' Mate contact details.
export const PHONE_DIGITS = "918110016161";
export const PHONE_DISPLAY = "+91 81100 16161";
export const PHONE_HREF = `tel:+${PHONE_DIGITS}`;
export const SUPPORT_EMAIL = "rentomate@akvinz.com";
// Every email link on the site opens Gmail's compose page, since many visitors have no mail app set up for mailto: links.
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`;

// Office address shown on the contact page, footer and privacy policy, and in the LocalBusiness JSON-LD.
export const ADDRESS = {
  street: "No: B-3, Castle Park Apartments, Kamarajar Road, Ramanujanagar",
  locality: "Uppilipalayam",
  city: "Coimbatore",
  state: "Tamil Nadu",
  postalCode: "641015",
};
export const ADDRESS_LINES = [ADDRESS.street, `${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`];

// Office hours. Keep in sync with the Google Business Profile and JustDial listings.
export const OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:30",
  closes: "19:30",
  display: "Mon–Sat, 9:30 AM – 7:30 PM (Sunday closed)",
};

// Google Business Profile (the review link without "/review").
export const GOOGLE_BUSINESS_URL = "https://g.page/r/CfFtfu1PMz_-EBM";

export const SOCIAL_HANDLE = "rentomate.life";
export const INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_HANDLE}/`;
export const FACEBOOK_URL = `https://www.facebook.com/${SOCIAL_HANDLE}`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
