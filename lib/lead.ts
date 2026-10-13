import { whatsappLink } from "@/lib/contact";

export type Lead = {
  name: string;
  phone: string;
  pincode: string;
  referralCode: string;
};

export type SavedLead = Lead & { customerCode: string; createdAt: string };

const STORAGE_KEY = "rentomate_lead";

// Set NEXT_PUBLIC_LEAD_ENDPOINT to a URL that accepts a JSON POST to store leads server-side.
// Without it, the lead is handed over through WhatsApp so it still reaches the team.
const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

export const getSavedLead = (): SavedLead | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedLead) : null;
  } catch {
    return null;
  }
};

const saveLead = (lead: SavedLead) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // Storage blocked (private mode etc.) – the popup will simply show again next visit.
  }
};

// e.g. ROM-6161-K7Q: last 4 phone digits plus a short random suffix.
const createCustomerCode = (phone: string) => {
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `ROM-${phone.slice(-4)}-${suffix}`;
};

export async function submitLead(lead: Lead): Promise<SavedLead> {
  const saved: SavedLead = { ...lead, customerCode: createCustomerCode(lead.phone), createdAt: new Date().toISOString() };

  if (LEAD_ENDPOINT) {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saved),
    });
    if (!response.ok) throw new Error(`Lead submission failed (${response.status})`);
  } else {
    const message = [
      "Hi RentOMate! I'd like a water purifier on rent.",
      `Name: ${saved.name}`,
      `Phone: ${saved.phone}`,
      `Pincode: ${saved.pincode}`,
      saved.referralCode && `Referral code: ${saved.referralCode}`,
      `Customer code: ${saved.customerCode}`,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  saveLead(saved);
  return saved;
}
