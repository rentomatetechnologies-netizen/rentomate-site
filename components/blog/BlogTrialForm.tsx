"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { submitLead, type Lead } from "@/lib/lead";
import { LOWEST_PRICE } from "@/lib/site";

const empty: Lead = { name: "", phone: "", pincode: "", referralCode: "" };

const inputClass =
  "w-full rounded-full border border-white bg-white px-5 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0084FF]";

const PERKS = ["Installation within 48 hrs", "Lifetime FREE maintenance", `Plans starting ₹${LOWEST_PRICE}/month`];

/** "7-Day Risk-Free Trial" lead form shown in the blog sidebar. */
export const BlogTrialForm: React.FC = () => {
  const [form, setForm] = useState<Lead>(empty);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (field: keyof Lead) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const phone = form.phone.replace(/\D/g, "").slice(-10);
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!/^\d{6}$/.test(form.pincode.trim())) return setError("Please enter a valid 6-digit pincode.");

    setError("");
    setSubmitting(true);
    try {
      await submitLead({ ...form, name: form.name.trim(), phone, pincode: form.pincode.trim(), referralCode: form.referralCode.trim() });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="free-trial" className="scroll-mt-28 rounded-[10px] bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 p-6 shadow-[0_2px_18px_rgb(15_23_42/0.07)]">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0067c7]">Get 7 Days Risk-Free Trial</h2>
      <p className="mt-3 text-center text-base text-slate-700">
        Pay only rentals. <strong className="text-[#051838]">ZERO</strong> machine cost
      </p>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-600">
        <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden /> Trusted by families across Tamil Nadu
      </p>

      {done ? (
        <div className="mt-6 rounded-[10px] bg-white p-5 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" aria-hidden />
          <p className="mt-2 font-bold text-[#051838]">Thank you!</p>
          <p className="mt-1 text-sm text-slate-600">Our team will call you back shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-3">
          <input className={inputClass} placeholder="Enter your name *" aria-label="Name" autoComplete="name" value={form.name} onChange={update("name")} />
          <input className={inputClass} placeholder="Enter your phone number *" aria-label="Phone number" type="tel" inputMode="numeric" autoComplete="tel" value={form.phone} onChange={update("phone")} />
          <input className={inputClass} placeholder="Pincode *" aria-label="Pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" value={form.pincode} onChange={update("pincode")} />
          <input className={inputClass} placeholder="Referral code" aria-label="Referral code" value={form.referralCode} onChange={update("referralCode")} />
          {error && <p role="alert" className="px-2 text-sm font-semibold text-red-600">{error}</p>}
          <ul className="space-y-2.5 py-2">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#0084FF] text-white" aria-hidden /> {perk}
              </li>
            ))}
          </ul>
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#051838] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#0084FF] disabled:opacity-70"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} Request a Call Back
          </button>
        </form>
      )}
    </section>
  );
};
