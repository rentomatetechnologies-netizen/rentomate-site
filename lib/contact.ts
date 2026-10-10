// Single source of truth for RentOMate contact details.
export const PHONE_DIGITS = "918110016161";
export const PHONE_DISPLAY = "+91 81100 16161";
export const PHONE_HREF = `tel:+${PHONE_DIGITS}`;
export const SUPPORT_EMAIL = "rentomate@akvins.com";

export const SOCIAL_HANDLE = "rentomate.life";
export const INSTAGRAM_URL = `https://www.instagram.com/${SOCIAL_HANDLE}/`;
export const FACEBOOK_URL = `https://www.facebook.com/${SOCIAL_HANDLE}`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
