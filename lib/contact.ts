// Single source of truth for Rent O' Mate contact details.
export const PHONE_DIGITS = "918110016161";
export const PHONE_DISPLAY = "+91 81100 16161";
export const PHONE_HREF = `tel:+${PHONE_DIGITS}`;
export const SUPPORT_EMAIL = "rentomate@akvinz.com";
// Fallback for visitors with no mail app set up to open mailto: links.
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}`;

// Office address shown on the contact page, footer and privacy policy.
export const ADDRESS = {
  street: "No: B-3, Castle Park Apartments, Kamarajar Road, Ramanujanagar, Upplipalayam",
  city: "Coimbatore",
  state: "Tamil Nadu",
};
export const ADDRESS_LINES = [ADDRESS.street, `${ADDRESS.city}, ${ADDRESS.state}`];

export const SOCIAL_HANDLE = "rentomate.life";
export const INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_HANDLE}/`;
export const FACEBOOK_URL = `https://www.facebook.com/${SOCIAL_HANDLE}`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
